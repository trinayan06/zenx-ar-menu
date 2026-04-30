// ========== SUPABASE INIT ==========
const { createClient } = supabase;
const supabaseClient = createClient(
  'https://qjykkdmujwlkpcdyzeqa.supabase.co',
  'sb_publishable_rUybvqyug25z0OIXaCs25Q_cTmKdC8h'
);

// ========== GLOBAL STATE ==========
let allRestaurants = [];
const MONTHLY_FEE = 1200;

// ========== PASSWORD ==========
const CORRECT_PWD = 'zenx2026';
function checkPwd(){
  const v = document.getElementById('pwd-input').value;
  if(v === (localStorage.getItem('zenx_pwd') || CORRECT_PWD)){
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app').classList.add('visible');
    document.getElementById('pwd-error').style.display='none';
    loadAllData();
  } else {
    document.getElementById('pwd-error').style.display='block';
    document.getElementById('pwd-input').style.borderColor='#ff0000';
  }
}
function logout(){
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('app').classList.remove('visible');
  document.getElementById('pwd-input').value='';
  document.querySelector('.sidebar').classList.remove('open');
}

// ========== PAGE SWITCHING ==========
function switchPage(id, navEl){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(navEl) navEl.classList.add('active');
  document.querySelector('.sidebar').classList.remove('open');
  if(id==='analytics') renderCharts();
}

// ========== TOAST ==========
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

// ========== LOAD ALL DATA FROM SUPABASE ==========
async function loadAllData(){
  try {
    const { data, error } = await supabaseClient
      .from('restaurants')
      .select('*')
      .order('created_at', { ascending: false });

    if(error){
      console.error('Supabase fetch error:', error);
      showToast('Error loading data');
      allRestaurants = [];
    } else {
      allRestaurants = data || [];
    }
  } catch(err){
    console.error('Connection error:', err);
    allRestaurants = [];
  }
  renderRestaurants();
  renderSubscriptions();
  updateDashboardStats();
  renderRecentActivity();
}

// ========== RENDER RESTAURANTS TABLE ==========
function renderRestaurants(filter=''){
  const tb = document.getElementById('rest-table');
  const data = allRestaurants.filter(r => {
    if(!filter) return true;
    const f = filter.toLowerCase();
    return (r.name||'').toLowerCase().includes(f) ||
           (r.owner_name||'').toLowerCase().includes(f) ||
           (r.city||'').toLowerCase().includes(f);
  });

  if(data.length === 0){
    tb.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:#888;">No restaurants found</td></tr>';
    return;
  }

  tb.innerHTML = data.map(r => {
    const status = r.status || 'pending';
    const isActive = status === 'active' || status === 'approved';
    const date = r.created_at ? new Date(r.created_at).toISOString().slice(0,10) : '—';
    return `<tr>
      <td><strong>${r.name||'—'}</strong></td>
      <td>${r.owner_name||'—'}</td>
      <td>${r.phone||'—'}</td>
      <td>${r.city||'—'}</td>
      <td><span class="badge badge-${isActive?'active':'pending'}">${status}</span></td>
      <td>${date}</td>
      <td><div class="btn-row">
        <button class="btn btn-outline btn-sm" onclick="toggleRestaurantStatus('${r.id}','${status}')">${isActive?'Deactivate':'Approve'}</button>
        <button class="btn btn-danger btn-sm" onclick="deleteRestaurant('${r.id}')">Delete</button>
      </div></td>
    </tr>`;
  }).join('');
}

function filterRestaurants(v){ renderRestaurants(v); }

async function toggleRestaurantStatus(id, currentStatus){
  const newStatus = (currentStatus === 'active' || currentStatus === 'approved') ? 'pending' : 'active';
  const { error } = await supabaseClient.from('restaurants').update({ status: newStatus }).eq('id', id);
  if(error){ showToast('Error updating status'); console.error(error); return; }
  showToast('Status updated to ' + newStatus);
  await loadAllData();
}

async function deleteRestaurant(id){
  if(!confirm('Delete this restaurant?')) return;
  const { error } = await supabaseClient.from('restaurants').delete().eq('id', id);
  if(error){ showToast('Error deleting'); console.error(error); return; }
  showToast('Restaurant deleted');
  await loadAllData();
}

// ========== ADD RESTAURANT ==========
function openModal(){ document.getElementById('modal-add').classList.add('show'); }
function closeModal(){ document.getElementById('modal-add').classList.remove('show'); }

async function addRestaurant(){
  const n = document.getElementById('m-name').value.trim();
  const o = document.getElementById('m-owner').value.trim();
  const p = document.getElementById('m-phone').value.trim();
  const e = document.getElementById('m-email').value.trim();
  const c = document.getElementById('m-city').value.trim();
  if(!n||!o||!p){ showToast('Please fill required fields'); return; }

  const { error } = await supabaseClient.from('restaurants').insert([{
    name: n, owner_name: o, phone: p, city: c, status: 'active'
  }]);
  if(error){ showToast('Error adding restaurant'); console.error(error); return; }

  closeModal();
  ['m-name','m-owner','m-phone','m-email','m-city'].forEach(id => document.getElementById(id).value='');
  showToast(n + ' added successfully!');
  await loadAllData();
}

// ========== SUBSCRIPTIONS (flat ₹1200/mo) ==========
function renderSubscriptions(){
  const tb = document.getElementById('sub-table');
  let totalRev = 0;

  if(allRestaurants.length === 0){
    tb.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#888;">No subscriptions yet</td></tr>';
    document.getElementById('sub-revenue').textContent = '₹0';
    return;
  }

  tb.innerHTML = allRestaurants.map(r => {
    const status = r.status || 'pending';
    const isActive = status === 'active' || status === 'approved';
    const payStatus = isActive ? 'Paid' : 'Pending';
    if(isActive) totalRev += MONTHLY_FEE;
    const date = r.created_at ? new Date(r.created_at).toISOString().slice(0,10) : '—';
    const next = r.created_at ? (() => { const d = new Date(r.created_at); d.setMonth(d.getMonth()+1); return d.toISOString().slice(0,10); })() : '—';

    return `<tr>
      <td><strong>${r.name||'—'}</strong></td>
      <td>₹${MONTHLY_FEE.toLocaleString()}</td>
      <td>${date}</td>
      <td>${next}</td>
      <td><span class="badge badge-${payStatus.toLowerCase()}">${payStatus}</span></td>
      <td><button class="btn btn-sm ${isActive?'btn-outline':'btn-red'}" onclick="toggleRestaurantStatus('${r.id}','${status}')">${isActive?'✓ Paid':'Mark Paid'}</button></td>
    </tr>`;
  }).join('');

  document.getElementById('sub-revenue').textContent = '₹' + totalRev.toLocaleString();
}

// ========== DASHBOARD STATS ==========
function updateDashboardStats(){
  const total = allRestaurants.length;
  const active = allRestaurants.filter(r => r.status === 'active' || r.status === 'approved').length;
  const rev = active * MONTHLY_FEE;

  const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newSignups = allRestaurants.filter(r => r.created_at && new Date(r.created_at) >= oneWeekAgo).length;

  document.getElementById('s-total').textContent = total;
  document.getElementById('s-active').textContent = active;
  document.getElementById('s-revenue').textContent = '₹' + rev.toLocaleString();
  document.getElementById('s-signups').textContent = newSignups;
}

// ========== RECENT ACTIVITY ==========
function renderRecentActivity(){
  const panel = document.getElementById('activity-feed');
  if(!panel) return;
  if(allRestaurants.length === 0){
    panel.innerHTML = '<div class="activity-item"><span class="activity-dot"></span>No activity yet — waiting for signups!</div>';
    return;
  }
  const recent = allRestaurants.slice(0, 5);
  panel.innerHTML = recent.map(r => {
    const date = r.created_at ? new Date(r.created_at).toLocaleDateString() : '';
    return `<div class="activity-item"><span class="activity-dot"></span><strong>${r.name||'Unknown'}</strong> joined <span style="color:#666;margin-left:auto;font-size:12px">${date}</span></div>`;
  }).join('');
}

// ========== ANALYTICS CHARTS ==========
function renderCharts(){
  // City chart from real data
  const cityCount = {};
  allRestaurants.forEach(r => { const c = r.city || 'Unknown'; cityCount[c] = (cityCount[c]||0) + 1; });
  const cityData = Object.entries(cityCount).map(([l,v]) => ({l,v})).sort((a,b) => b.v - a.v).slice(0,6);
  const cityMax = Math.max(...cityData.map(d=>d.v), 1);
  renderBarChart('city-chart', cityData, cityMax);

  // Revenue chart (active vs pending)
  const active = allRestaurants.filter(r => r.status === 'active' || r.status === 'approved').length;
  const pending = allRestaurants.length - active;
  const revData = [
    {l: 'Active (₹' + (active*MONTHLY_FEE).toLocaleString() + ')', v: active},
    {l: 'Pending', v: pending}
  ].filter(d => d.v > 0);
  const revMax = Math.max(...revData.map(d=>d.v), 1);
  renderBarChart('plan-chart', revData, revMax);

  // Status chart
  const statusCount = {};
  allRestaurants.forEach(r => { const s = r.status || 'pending'; statusCount[s] = (statusCount[s]||0) + 1; });
  const statusData = Object.entries(statusCount).map(([l,v]) => ({l:l.charAt(0).toUpperCase()+l.slice(1),v}));
  const statusMax = Math.max(...statusData.map(d=>d.v), 1);
  renderBarChart('scan-chart', statusData, statusMax);

  // Signups by day of week
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const dayCounts = new Array(7).fill(0);
  allRestaurants.forEach(r => {
    if(r.created_at){ const d = new Date(r.created_at).getDay(); dayCounts[d]++; }
  });
  const dayData = days.map((l,i) => ({l, v: dayCounts[i]}));
  const dayMax = Math.max(...dayCounts, 1);
  renderBarChart('dish-chart', dayData, dayMax);
}

function renderBarChart(containerId, data, maxVal){
  const c = document.getElementById(containerId);
  if(!c) return;
  if(data.length === 0){
    c.innerHTML = '<div style="color:#888;text-align:center;padding:40px">No data yet</div>';
    return;
  }
  c.innerHTML = data.map(d => {
    const h = Math.max((d.v/maxVal)*160, 8);
    return `<div class="chart-bar-wrap"><div class="chart-bar" style="height:${h}px"><span class="tip">${d.v}</span></div><span class="chart-label">${d.l}</span></div>`;
  }).join('');
}

// ========== SETTINGS ==========
function saveSettings(){
  localStorage.setItem('zenx_platform_name', document.getElementById('set-name').value);
  localStorage.setItem('zenx_pwd', document.getElementById('set-pwd').value);
  localStorage.setItem('zenx_ig', document.getElementById('set-ig').value);
  localStorage.setItem('zenx_email', document.getElementById('set-email').value);
  showToast('Settings saved successfully!');
}
function loadSettings(){
  const n=localStorage.getItem('zenx_platform_name'); if(n) document.getElementById('set-name').value=n;
  const p=localStorage.getItem('zenx_pwd'); if(p) document.getElementById('set-pwd').value=p;
  const ig=localStorage.getItem('zenx_ig'); if(ig) document.getElementById('set-ig').value=ig;
  const em=localStorage.getItem('zenx_email'); if(em) document.getElementById('set-email').value=em;
}

// ========== INIT ==========
loadSettings();
