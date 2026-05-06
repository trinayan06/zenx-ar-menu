// ========== SUPABASE INIT ==========
const { createClient } = supabase;
const supabaseClient = createClient(
  'https://qjykkdmujwlkpcdyzeqa.supabase.co',
  'sb_publishable_rUybvqyug25z0OIXaCs25Q_cTmKdC8h'
);

// ========== GLOBAL STATE ==========
let allClients = [];
let allProjects = [];
let allInstaProjects = [];
let allSubscriptions = [];

// ========== AUTHENTICATION ==========
async function checkPwd(){
  const email = document.getElementById('email-input').value.trim();
  const password = document.getElementById('pwd-input').value;
  if(!email || !password){
    document.getElementById('pwd-error').textContent = '⛔ Please enter both email and password';
    document.getElementById('pwd-error').style.display = 'block';
    return;
  }
  const btn = document.querySelector('#login-screen button');
  btn.disabled = true; btn.textContent = '🔄 Signing in...';
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  btn.disabled = false; btn.textContent = '🔐 Unlock Dashboard';
  if(error){
    document.getElementById('pwd-error').textContent = '⛔ Access Denied — ' + error.message;
    document.getElementById('pwd-error').style.display = 'block';
    return;
  }
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.add('visible');
  document.getElementById('pwd-error').style.display = 'none';
  loadAllData();
}

async function logout(){
  await supabaseClient.auth.signOut();
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('app').classList.remove('visible');
  document.getElementById('pwd-input').value = '';
  document.getElementById('email-input').value = '';
  document.querySelector('.sidebar').classList.remove('open');
}

// ========== SESSION ==========
async function checkSession(){
  const { data: { session } } = await supabaseClient.auth.getSession();
  if(session){
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app').classList.add('visible');
    loadAllData();
  } else {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('app').classList.remove('visible');
  }
}
supabaseClient.auth.onAuthStateChange((event) => {
  if(event === 'SIGNED_OUT'){
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('app').classList.remove('visible');
  }
});

// ========== PAGE SWITCHING ==========
function switchPage(id, navEl){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const page = document.getElementById('page-'+id);
  if(page) page.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(navEl) navEl.classList.add('active');
  document.querySelector('.sidebar').classList.remove('open');
  if(id==='analytics') renderCharts();
}

// ========== TOAST ==========
function showToast(msg, isError=false){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.borderColor = isError ? '#ff0000' : '#00cc00';
  t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 3000);
}

// ========== LOAD ALL DATA ==========
async function loadAllData(){
  try {
    // Load clients
    const { data: clients, error: e1 } = await supabaseClient
      .from('clients').select('*').order('created_at', { ascending: false });
    if(e1) console.error('clients error:', e1);
    allClients = clients || [];

    // Load projects
    const { data: projects, error: e2 } = await supabaseClient
      .from('projects').select('*, clients(name)').order('created_at', { ascending: false });
    if(e2) console.error('projects error:', e2);
    allProjects = projects || [];

    // Load instagram projects
    const { data: insta, error: e3 } = await supabaseClient
      .from('instagram_projects').select('*, clients(name)').order('created_at', { ascending: false });
    if(e3) console.error('instagram_projects error:', e3);
    allInstaProjects = insta || [];

    // Load subscriptions
    const { data: subs, error: e4 } = await supabaseClient
      .from('subscriptions').select('*, clients(name)').order('created_at', { ascending: false });
    if(e4) console.error('subscriptions error:', e4);
    allSubscriptions = subs || [];

  } catch(err){
    console.error('Load error:', err);
  }

  // Render all sections
  updateDashboardStats();
  renderRecentActivity();
  renderActiveProjects();
  renderServicesOverview();
  renderClients();
  renderInstaProjects();
  renderARProjects();
  renderWebProjects();
  renderSubscriptions();
}

// ========== DASHBOARD STATS ==========
function updateDashboardStats(){
  const el = (id) => document.getElementById(id);

  // Total clients
  el('s-total').textContent = allClients.length;
  if(allClients.length > 0){
    el('s-total-sub').textContent = allClients.map(c=>c.name).slice(0,3).join(', ');
  }

  // Active subscriptions
  const activeSubs = allSubscriptions.filter(s => s.status === 'paid' || s.status === 'active');
  el('s-active').textContent = activeSubs.length;

  // Monthly revenue
  const totalRev = allSubscriptions
    .filter(s => s.status === 'paid' || s.status === 'active')
    .reduce((sum, s) => sum + (s.amount || 0), 0);
  el('s-revenue').textContent = '₹' + totalRev.toLocaleString();

  // Instagram projects
  el('s-insta').textContent = allInstaProjects.length;

  // AR Menu projects
  const arCount = allProjects.filter(p => p.service_type === 'ar_menu').length;
  el('s-ar').textContent = arCount;

  // New signups this week
  const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newSignups = allClients.filter(c => c.created_at && new Date(c.created_at) >= oneWeekAgo).length;
  el('s-signups').textContent = newSignups;
}

// ========== RECENT ACTIVITY ==========
function renderRecentActivity(){
  const panel = document.getElementById('activity-feed');
  if(!panel) return;
  if(allClients.length === 0 && allProjects.length === 0){
    panel.innerHTML = '<div class="activity-item"><span class="activity-dot"></span>No activity yet — waiting for signups!</div>';
    return;
  }
  // Combine clients and projects for activity
  const items = [];
  allClients.slice(0,3).forEach(c => {
    const date = c.created_at ? new Date(c.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '';
    items.push(`<div class="activity-item"><span class="activity-dot"></span>🏪 <strong>${c.name||'Unknown'}</strong> joined as a client <span style="color:#666;margin-left:auto;font-size:12px">${date}</span></div>`);
  });
  allProjects.slice(0,2).forEach(p => {
    const clientName = p.clients?.name || 'Unknown';
    const date = p.created_at ? new Date(p.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '';
    items.push(`<div class="activity-item"><span class="activity-dot"></span>📌 <strong>${clientName}</strong> — ${p.service_type||'Project'} ${p.status||''} <span style="color:#666;margin-left:auto;font-size:12px">${date}</span></div>`);
  });
  if(items.length === 0){
    items.push('<div class="activity-item"><span class="activity-dot"></span>No recent activity</div>');
  }
  panel.innerHTML = items.join('');
}

// ========== ACTIVE PROJECTS TABLE ==========
function renderActiveProjects(){
  const tb = document.getElementById('active-projects-table');
  if(!tb) return;
  const active = allProjects.filter(p => p.status !== 'completed');
  if(active.length === 0){
    tb.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#888">No active projects</td></tr>';
    return;
  }
  tb.innerHTML = active.map(p => {
    const clientName = p.clients?.name || 'Unknown';
    const statusBadge = getBadge(p.status);
    const date = p.created_at ? new Date(p.created_at).toLocaleDateString('en-IN',{month:'short',year:'numeric'}) : '—';
    const fee = p.monthly_fee ? '₹'+Number(p.monthly_fee).toLocaleString() : '—';
    return `<tr>
      <td><strong>${clientName}</strong></td>
      <td>${p.service_type||'—'}</td>
      <td>${statusBadge}</td>
      <td>${date}</td>
      <td>${fee}</td>
      <td><div class="btn-row"><button class="btn btn-outline btn-sm" onclick="viewProject('${p.id}')">View</button></div></td>
    </tr>`;
  }).join('');
}

// ========== SERVICES OVERVIEW ==========
function renderServicesOverview(){
  const instaCount = allInstaProjects.length;
  const instaRev = allProjects.filter(p=>p.service_type==='instagram').reduce((s,p)=>s+(p.monthly_fee||0),0);
  const arCount = allProjects.filter(p=>p.service_type==='ar_menu').length;
  const arRev = allProjects.filter(p=>p.service_type==='ar_menu').reduce((s,p)=>s+(p.monthly_fee||0),0);
  const webCount = allProjects.filter(p=>p.service_type==='website').length;
  const webRev = allProjects.filter(p=>p.service_type==='website').reduce((s,p)=>s+(p.monthly_fee||0),0);
  const growthCount = allProjects.filter(p=>p.service_type==='digital_growth').length;
  const growthRev = allProjects.filter(p=>p.service_type==='digital_growth').reduce((s,p)=>s+(p.monthly_fee||0),0);

  const el = (id) => document.getElementById(id);
  el('svc-insta-stat').textContent = instaCount + ' active';
  el('svc-insta-rev').textContent = '₹' + instaRev.toLocaleString() + '/mo';
  el('svc-ar-stat').textContent = arCount + ' active';
  el('svc-ar-rev').textContent = '₹' + arRev.toLocaleString() + '/mo';
  el('svc-web-stat').textContent = webCount + ' active';
  el('svc-web-rev').textContent = '₹' + webRev.toLocaleString() + '/mo';
  el('svc-growth-stat').textContent = growthCount + ' active';
  el('svc-growth-rev').textContent = '₹' + growthRev.toLocaleString() + '/mo';
}

// ========== CLIENTS TABLE ==========
function renderClients(filter=''){
  const tb = document.getElementById('rest-table');
  if(!tb) return;
  const data = allClients.filter(c => {
    if(!filter) return true;
    const f = filter.toLowerCase();
    return (c.name||'').toLowerCase().includes(f) ||
           (c.owner_name||'').toLowerCase().includes(f) ||
           (c.city||'').toLowerCase().includes(f);
  });
  if(data.length === 0){
    tb.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:#888">No clients found</td></tr>';
    return;
  }
  tb.innerHTML = data.map(c => {
    const status = c.status || 'active';
    const date = c.created_at ? new Date(c.created_at).toLocaleDateString('en-IN',{month:'short',year:'numeric'}) : '—';
    return `<tr>
      <td><strong>${c.name||'—'}</strong></td>
      <td>${c.business_type||'—'}</td>
      <td>${c.service_type||'—'}</td>
      <td>${c.owner_name||'—'}</td>
      <td>${c.phone||'—'}</td>
      <td>${c.city||'—'}</td>
      <td>${getBadge(status)}</td>
      <td>${date}</td>
      <td><div class="btn-row">
        <button class="btn btn-outline btn-sm" onclick="toggleClientStatus('${c.id}','${status}')">${status==='active'?'Deactivate':'Activate'}</button>
        <button class="btn btn-danger btn-sm" onclick="deleteClient('${c.id}')">Delete</button>
      </div></td>
    </tr>`;
  }).join('');
}

function filterRestaurants(v){ renderClients(v); }

// ========== CLIENT CRUD ==========
async function toggleClientStatus(id, currentStatus){
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
  const { error } = await supabaseClient.from('clients').update({ status: newStatus }).eq('id', id);
  if(error){ showToast('❌ Error updating status', true); return; }
  showToast('✅ Status updated to ' + newStatus);
  await loadAllData();
}

async function deleteClient(id){
  if(!confirm('Delete this client? This cannot be undone.')) return;
  const { error } = await supabaseClient.from('clients').delete().eq('id', id);
  if(error){ showToast('❌ Error deleting client', true); return; }
  showToast('✅ Client deleted successfully');
  await loadAllData();
}

function viewProject(id){ showToast('📋 Project ID: ' + id); }

// ========== ADD CLIENT ==========
function openModal(){ document.getElementById('modal-add').classList.add('show'); }
function closeModal(){ document.getElementById('modal-add').classList.remove('show'); }

async function addRestaurant(){
  const n = document.getElementById('m-name').value.trim();
  const o = document.getElementById('m-owner').value.trim();
  const p = document.getElementById('m-phone').value.trim();
  const e = document.getElementById('m-email').value.trim();
  const c = document.getElementById('m-city').value.trim();
  const t = document.getElementById('m-type').value;
  const s = document.getElementById('m-service').value;
  const f = document.getElementById('m-fee').value;
  if(!n){ showToast('❌ Please enter client name', true); return; }

  const { error } = await supabaseClient.from('clients').insert([{
    name: n,
    owner_name: o || null,
    phone: p || null,
    email: e || null,
    city: c || null,
    business_type: t,
    service_type: s,
    status: 'active'
  }]);
  if(error){ showToast('❌ Error adding client — ' + error.message, true); console.error(error); return; }

  closeModal();
  ['m-name','m-owner','m-phone','m-email','m-city'].forEach(id => document.getElementById(id).value='');
  showToast('✅ ' + n + ' added successfully!');
  await loadAllData();
}

// ========== INSTAGRAM PROJECTS ==========
function renderInstaProjects(){
  const tb = document.getElementById('insta-table');
  if(!tb) return;
  if(allInstaProjects.length === 0){
    tb.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:#888">No Instagram projects yet</td></tr>';
    return;
  }
  tb.innerHTML = allInstaProjects.map(p => {
    const clientName = p.clients?.name || 'Unknown';
    const pkg = p.package || 'Standard';
    const statusBadge = getBadge(p.status);
    const fee = p.monthly_fee ? '₹'+Number(p.monthly_fee).toLocaleString() : '—';
    const nextDue = p.next_post_due ? new Date(p.next_post_due).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : '—';
    return `<tr>
      <td><strong>${clientName}</strong></td>
      <td><span class="badge badge-${pkg.toLowerCase()}">${pkg}</span></td>
      <td>${p.posts_per_month||0} posts</td>
      <td>${p.reels_per_month||0} reels</td>
      <td>${statusBadge}</td>
      <td>${fee}</td>
      <td>${nextDue}</td>
    </tr>`;
  }).join('');
}

// ========== AR MENU PROJECTS ==========
function renderARProjects(){
  const tb = document.getElementById('ar-table');
  if(!tb) return;
  const arProjects = allProjects.filter(p => p.service_type === 'ar_menu');
  if(arProjects.length === 0){
    tb.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#888">No AR Menu projects yet</td></tr>';
    return;
  }
  tb.innerHTML = arProjects.map(p => {
    const clientName = p.clients?.name || 'Unknown';
    const fee = p.monthly_fee ? '₹'+Number(p.monthly_fee).toLocaleString() : '—';
    return `<tr>
      <td><strong>${clientName}</strong></td>
      <td><span class="badge badge-standard">${p.package||'Standard'}</span></td>
      <td>${p.model_count||0}</td>
      <td>${getBadge(p.status)}</td>
      <td>${fee}</td>
      <td><button class="btn btn-outline btn-sm" onclick="viewProject('${p.id}')">View</button></td>
    </tr>`;
  }).join('');
}

// ========== WEBSITE PROJECTS ==========
function renderWebProjects(){
  const tb = document.getElementById('web-table');
  if(!tb) return;
  const webProjects = allProjects.filter(p => p.service_type === 'website');
  if(webProjects.length === 0){
    tb.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#888">No website projects yet</td></tr>';
    return;
  }
  tb.innerHTML = webProjects.map(p => {
    const clientName = p.clients?.name || 'Unknown';
    const fee = p.monthly_fee ? '₹'+Number(p.monthly_fee).toLocaleString() : '—';
    return `<tr>
      <td><strong>${clientName}</strong></td>
      <td>${p.website_type||'Landing Page'}</td>
      <td>${p.tech_stack||'HTML/CSS/JS'}</td>
      <td>${getBadge(p.status)}</td>
      <td>${fee}</td>
      <td><button class="btn btn-outline btn-sm" onclick="viewProject('${p.id}')">View</button></td>
    </tr>`;
  }).join('');
}

// ========== SUBSCRIPTIONS ==========
function renderSubscriptions(){
  const tb = document.getElementById('sub-table');
  if(!tb) return;
  if(allSubscriptions.length === 0){
    tb.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:#888">No subscriptions yet</td></tr>';
    document.getElementById('sub-revenue').textContent = '₹0';
    return;
  }
  let totalRev = 0;
  tb.innerHTML = allSubscriptions.map(s => {
    const clientName = s.clients?.name || 'Unknown';
    const isPaid = s.status === 'paid' || s.status === 'active';
    if(isPaid) totalRev += (s.amount || 0);
    const startDate = s.start_date ? new Date(s.start_date).toLocaleDateString('en-IN',{month:'short',year:'numeric'}) : '—';
    const dueDate = s.due_date ? new Date(s.due_date).toLocaleDateString('en-IN',{month:'short',year:'numeric'}) : '—';
    return `<tr>
      <td><strong>${clientName}</strong></td>
      <td>${s.service_type||'—'}</td>
      <td>₹${(s.amount||0).toLocaleString()}</td>
      <td>${startDate}</td>
      <td>${dueDate}</td>
      <td><span class="badge badge-${isPaid?'paid':'pending'}">${isPaid?'Paid':'Pending'}</span></td>
      <td><button class="btn btn-sm ${isPaid?'btn-outline':'btn-red'}" onclick="toggleSubStatus('${s.id}','${s.status}')">${isPaid?'✓ Paid':'Mark Paid'}</button></td>
    </tr>`;
  }).join('');
  document.getElementById('sub-revenue').textContent = '₹' + totalRev.toLocaleString();
}

async function toggleSubStatus(id, currentStatus){
  const newStatus = (currentStatus === 'paid' || currentStatus === 'active') ? 'pending' : 'paid';
  const { error } = await supabaseClient.from('subscriptions').update({ status: newStatus }).eq('id', id);
  if(error){ showToast('❌ Error updating subscription', true); return; }
  showToast('✅ Subscription updated to ' + newStatus);
  await loadAllData();
}

// ========== BADGE HELPER ==========
function getBadge(status){
  if(!status) return '<span class="badge badge-pending">Unknown</span>';
  const s = status.toLowerCase();
  if(s === 'active' || s === 'approved') return `<span class="badge badge-active">${status}</span>`;
  if(s === 'paid') return '<span class="badge badge-paid">Paid</span>';
  if(s === 'in_progress' || s === 'in progress') return '<span class="badge badge-progress">🟡 In Progress</span>';
  if(s === 'completed') return '<span class="badge badge-active">✅ Completed</span>';
  if(s === 'inactive') return '<span class="badge badge-inactive">Inactive</span>';
  return `<span class="badge badge-pending">${status}</span>`;
}

// ========== ANALYTICS CHARTS ==========
function renderCharts(){
  // Projects by service type
  const svcCount = {};
  allProjects.forEach(p => { const s = p.service_type || 'Other'; svcCount[s] = (svcCount[s]||0) + 1; });
  const svcData = Object.entries(svcCount).map(([l,v]) => ({l,v})).sort((a,b) => b.v - a.v);
  renderBarChart('scan-chart', svcData, Math.max(...svcData.map(d=>d.v), 1));

  // Client signups by day
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const dayCounts = new Array(7).fill(0);
  allClients.forEach(c => { if(c.created_at){ dayCounts[new Date(c.created_at).getDay()]++; } });
  renderBarChart('dish-chart', days.map((l,i) => ({l, v: dayCounts[i]})), Math.max(...dayCounts, 1));

  // Revenue by service
  const revByService = {};
  allProjects.forEach(p => { const s = p.service_type || 'Other'; revByService[s] = (revByService[s]||0) + (p.monthly_fee||0); });
  const revData = Object.entries(revByService).map(([l,v]) => ({l: l+' (₹'+v.toLocaleString()+')', v}));
  renderBarChart('plan-chart', revData, Math.max(...revData.map(d=>d.v), 1));

  // Top cities
  const cityCount = {};
  allClients.forEach(c => { const city = c.city || 'Unknown'; cityCount[city] = (cityCount[city]||0) + 1; });
  const cityData = Object.entries(cityCount).map(([l,v]) => ({l,v})).sort((a,b) => b.v - a.v).slice(0,6);
  renderBarChart('city-chart', cityData, Math.max(...cityData.map(d=>d.v), 1));
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
  localStorage.setItem('zenx_ig', document.getElementById('set-ig').value);
  localStorage.setItem('zenx_email', document.getElementById('set-email').value);
  showToast('✅ Settings saved successfully!');
}
function loadSettings(){
  const n=localStorage.getItem('zenx_platform_name'); if(n) document.getElementById('set-name').value=n;
  const ig=localStorage.getItem('zenx_ig'); if(ig) document.getElementById('set-ig').value=ig;
  const em=localStorage.getItem('zenx_email'); if(em) document.getElementById('set-email').value=em;
}

// ========== INIT ==========
loadSettings();
checkSession();
