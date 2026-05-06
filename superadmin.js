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
function showToast(msg, color){
  // Remove any existing dynamic toasts
  document.querySelectorAll('.dynamic-toast').forEach(t=>t.remove());
  const isError = color === 'red' || color === true;
  const borderColor = isError ? '#CC0000' : '#00CC00';
  const bgColor = isError ? '#4a1a1a' : '#1a4a1a';
  const toast = document.createElement('div');
  toast.className = 'dynamic-toast';
  toast.style.cssText = `position:fixed;top:20px;right:20px;z-index:99999;background:${bgColor};color:white;padding:14px 20px;border-radius:10px;border:1px solid ${borderColor};font-weight:600;font-size:14px;font-family:'Inter',sans-serif;transform:translateY(-20px);opacity:0;transition:all .3s`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(()=>{toast.style.transform='translateY(0)';toast.style.opacity='1';});
  setTimeout(()=>{toast.style.opacity='0';toast.style.transform='translateY(-20px)';setTimeout(()=>toast.remove(),300);},3000);
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
  await updateDashboardStats();
  renderRecentActivity();
  await renderActiveProjects();
  renderServicesOverview();
  renderClients();
  await renderInstaProjects();
  renderARProjects();
  renderWebProjects();
  renderSubscriptions();
  seedVipCafe();
}

// ========== DASHBOARD STATS ==========
async function updateDashboardStats(){
  const { count: totalClients } = await supabaseClient.from('clients').select('*', {count:'exact'});
  const { count: activeSubs } = await supabaseClient.from('subscriptions').select('*', {count:'exact'}).eq('status','paid');
  const { data: revenue } = await supabaseClient.from('subscriptions').select('amount').eq('status','paid');
  const totalRev = revenue?.reduce((sum, r) => sum + (r.amount || 0), 0) || 0;
  const { count: instaProjects } = await supabaseClient.from('instagram_projects').select('*', {count:'exact'});
  const { count: arProjects } = await supabaseClient.from('projects').select('*', {count:'exact'}).eq('service_type', 'ar_menu');

  const el = (id) => document.getElementById(id);
  if(el('s-total')) el('s-total').textContent = totalClients || 0;
  if(el('s-total-sub') && allClients.length > 0) el('s-total-sub').textContent = allClients.map(c=>c.name).slice(0,3).join(', ');
  if(el('s-active')) el('s-active').textContent = activeSubs || 0;
  if(el('s-revenue')) el('s-revenue').textContent = '₹' + totalRev.toLocaleString();
  if(el('s-insta')) el('s-insta').textContent = instaProjects || 0;
  if(el('s-ar')) el('s-ar').textContent = arProjects || 0;

  const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newSignups = allClients.filter(c => c.created_at && new Date(c.created_at) >= oneWeekAgo).length;
  if(el('s-signups')) el('s-signups').textContent = newSignups;
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
async function renderActiveProjects(){
  const { data: projects, error } = await supabaseClient
    .from('projects')
    .select('*, clients(name)')
    .order('created_at', { ascending: false });
  if(error) { console.error(error); return; }

  const tb = document.getElementById('active-projects-table');
  if(!tb) return;
  tb.innerHTML = '';
  
  const active = projects ? projects.filter(p => p.status !== 'completed') : [];
  if(active.length === 0){
    tb.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#888">No active projects</td></tr>';
    return;
  }
  
  tb.innerHTML = active.map(p => {
    const clientName = p.clients?.name || 'Unknown';
    const statusBadge = getBadge(p.status);
    const date = p.start_date ? new Date(p.start_date).toLocaleDateString('en-IN',{month:'short',year:'numeric'}) : (p.created_at ? new Date(p.created_at).toLocaleDateString('en-IN',{month:'short',year:'numeric'}) : '—');
    const fee = p.monthly_fee ? '₹'+Number(p.monthly_fee).toLocaleString() : '—';
    const notesEsc = (p.notes||'').replace(/'/g,"\\'")
    return `<tr>
      <td><strong>${clientName}</strong></td>
      <td>${p.service_type||'—'}</td>
      <td>${statusBadge}</td>
      <td>${date}</td>
      <td>${fee}</td>
      <td><div class="btn-row">
        <button class="btn btn-outline btn-sm" onclick="viewProject('${p.id}')">View</button>
        <button class="btn btn-outline btn-sm" onclick="editProject('${p.id}','${p.service_type||''}','${p.package||'standard'}',${p.monthly_fee||0},'${p.status||''}','${notesEsc}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProject('${p.id}')">Delete</button>
      </div></td>
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
        <button class="btn btn-outline btn-sm" onclick="viewClient('${c.id}')">View</button>
        <button class="btn btn-outline btn-sm" onclick="editClient('${c.id}')">Edit</button>
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

// ========== VIEW/EDIT PROJECT ==========
async function viewProject(id){
  const { data: p, error } = await supabaseClient.from('projects').select('*, clients(name)').eq('id', id).single();
  if(error||!p){ showToast('❌ Error loading project','red'); return; }
  const modal = document.createElement('div');
  modal.id = 'view-project-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center';
  modal.onclick = (e)=>{if(e.target===modal)modal.remove();};
  const startDate = p.start_date ? new Date(p.start_date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '—';
  modal.innerHTML = `<div style="background:#111;border:1px solid #CC0000;border-radius:12px;padding:30px;width:450px;max-width:90%">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="color:#CC0000;margin:0">📂 Project Details</h3><button onclick="this.closest('[id=view-project-modal]').remove()" style="background:#333;border:none;color:white;padding:6px 12px;border-radius:6px;cursor:pointer">✕</button></div>
    <div style="display:grid;gap:10px;color:#ccc">
      <div><strong style="color:#CC0000">Client:</strong> ${p.clients?.name||'—'}</div>
      <div><strong style="color:#CC0000">Service:</strong> ${p.service_type||'—'}</div>
      <div><strong style="color:#CC0000">Package:</strong> ${p.package||'—'}</div>
      <div><strong style="color:#CC0000">Fee:</strong> ₹${(p.monthly_fee||0).toLocaleString()}</div>
      <div><strong style="color:#CC0000">Status:</strong> ${p.status||'—'}</div>
      <div><strong style="color:#CC0000">Start Date:</strong> ${startDate}</div>
      <div><strong style="color:#CC0000">Notes:</strong> ${p.notes||'—'}</div>
    </div></div>`;
  document.body.appendChild(modal);
}

function editProject(id, service, pkg, fee, status, notes){
  document.getElementById('edit-project-modal')?.remove();
  const modal = document.createElement('div');
  modal.id = 'edit-project-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center';
  modal.onclick = (e)=>{if(e.target===modal)modal.remove();};
  const inp = 'width:100%;padding:10px;background:#222;color:white;border:1px solid #CC0000;border-radius:8px;margin-bottom:12px;font-family:Inter,sans-serif';
  modal.innerHTML = `<div style="background:#111;border:1px solid #CC0000;border-radius:12px;padding:30px;width:450px;max-width:90%;max-height:90vh;overflow-y:auto">
    <h3 style="color:#CC0000;margin-bottom:20px">✏️ Edit Project</h3>
    <label style="color:white;font-size:13px;font-weight:600">Service Type</label>
    <select id="ep-service" style="${inp}"><option value="instagram" ${service==='instagram'?'selected':''}>Instagram</option><option value="ar_menu" ${service==='ar_menu'?'selected':''}>AR Menu</option><option value="website" ${service==='website'?'selected':''}>Website</option><option value="bundle" ${service==='bundle'?'selected':''}>Bundle</option></select>
    <label style="color:white;font-size:13px;font-weight:600">Package</label>
    <select id="ep-package" style="${inp}"><option value="basic" ${pkg==='basic'?'selected':''}>Basic</option><option value="standard" ${pkg==='standard'?'selected':''}>Standard</option><option value="premium" ${pkg==='premium'?'selected':''}>Premium</option></select>
    <label style="color:white;font-size:13px;font-weight:600">Monthly Fee (₹)</label>
    <input id="ep-fee" type="number" value="${fee}" style="${inp}"/>
    <label style="color:white;font-size:13px;font-weight:600">Status</label>
    <select id="ep-status" style="${inp}"><option value="in_progress" ${status==='in_progress'?'selected':''}>In Progress</option><option value="active" ${status==='active'?'selected':''}>Active</option><option value="completed" ${status==='completed'?'selected':''}>Completed</option><option value="paused" ${status==='paused'?'selected':''}>Paused</option></select>
    <label style="color:white;font-size:13px;font-weight:600">Notes</label>
    <textarea id="ep-notes" style="${inp}height:80px;resize:vertical">${notes||''}</textarea>
    <div style="display:flex;gap:10px;margin-top:8px">
      <button onclick="saveProject('${id}')" style="flex:1;padding:12px;background:#CC0000;color:white;border:none;border-radius:8px;font-weight:700;cursor:pointer">💾 Save Changes</button>
      <button onclick="document.getElementById('edit-project-modal').remove()" style="flex:1;padding:12px;background:#333;color:white;border:none;border-radius:8px;cursor:pointer">Cancel</button>
    </div></div>`;
  document.body.appendChild(modal);
}

async function saveProject(id){
  const { error } = await supabaseClient.from('projects').update({
    service_type: document.getElementById('ep-service').value,
    package: document.getElementById('ep-package').value,
    monthly_fee: parseFloat(document.getElementById('ep-fee').value) || 0,
    status: document.getElementById('ep-status').value,
    notes: document.getElementById('ep-notes').value.trim() || null
  }).eq('id', id);
  if(error){ showToast('❌ Error saving — '+error.message,'red'); return; }
  showToast('✅ Project updated successfully!','green');
  document.getElementById('edit-project-modal')?.remove();
  await loadAllData();
}

async function deleteProject(id){
  if(!confirm('Delete this project? This cannot be undone.')) return;
  await supabaseClient.from('instagram_projects').delete().eq('project_id', id);
  await supabaseClient.from('subscriptions').delete().eq('project_id', id);
  const { error } = await supabaseClient.from('projects').delete().eq('id', id);
  if(error){ showToast('❌ Error deleting project','red'); return; }
  showToast('✅ Project deleted!','green');
  await loadAllData();
}

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
async function renderInstaProjects(){
  const { data, error } = await supabaseClient
    .from('instagram_projects')
    .select('*, clients(name), projects(monthly_fee, status, package, id)')
    .order('created_at', { ascending: false });
  if(error) { console.error(error); return; }
  
  const tb = document.getElementById('insta-table');
  if(!tb) return;
  tb.innerHTML = '';
  if(!data || data.length === 0) {
    tb.innerHTML = '<tr><td colspan="8" style="color:#888;text-align:center;padding:20px">No Instagram projects yet</td></tr>';
    return;
  }
  tb.innerHTML = data.map(p => {
    const clientName = p.clients?.name || 'Unknown';
    const pkg = p.projects?.package || 'standard';
    const statusBadge = getBadge(p.projects?.status || p.status || 'in_progress');
    const fee = p.projects?.monthly_fee ? '₹'+Number(p.projects.monthly_fee).toLocaleString() : '—';
    const nextDue = p.next_post_due ? new Date(p.next_post_due).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : '—';
    return `<tr>
      <td><strong>${clientName}</strong></td>
      <td><span class="badge badge-${pkg.toLowerCase()}">${pkg}</span></td>
      <td>${p.posts_per_month||0} posts</td>
      <td>${p.reels_per_month||0} reels</td>
      <td>${statusBadge}</td>
      <td>${fee}</td>
      <td>${nextDue}</td>
      <td><div class="btn-row">
        <button class="btn btn-outline btn-sm" onclick="viewInsta('${p.id}')">View</button>
        <button class="btn btn-outline btn-sm" onclick="editInstaProject('${p.id}','${p.projects?.id || p.project_id || ''}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteInstaProject('${p.id}','${p.projects?.id || p.project_id || ''}')">Delete</button>
      </div></td>
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
  const updateData = { status: newStatus };
  if(newStatus === 'paid') updateData.paid_date = new Date().toISOString();
  const { error } = await supabaseClient.from('subscriptions').update(updateData).eq('id', id);
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

// ========== VIEW CLIENT ==========
async function viewClient(id){
  document.getElementById('view-project-modal')?.remove();
  const { data, error } = await supabaseClient.from('clients').select('*').eq('id', id).single();
  if(error||!data){ showToast('❌ Error loading client','red'); return; }
  const modal = document.createElement('div');
  modal.id = 'view-project-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center';
  modal.onclick = (e)=>{if(e.target===modal)modal.remove();};
  const date = data.created_at ? new Date(data.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '—';
  modal.innerHTML = `<div style="background:#111;border:1px solid #CC0000;border-radius:12px;padding:30px;width:450px;max-width:90%">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="color:#CC0000;margin:0">👤 Client Details</h3><button onclick="this.closest('[id=view-project-modal]').remove()" style="background:#333;border:none;color:white;padding:6px 12px;border-radius:6px;cursor:pointer">✕</button></div>
    <div style="display:grid;gap:10px;color:#ccc">
      <div><strong style="color:#CC0000">Name:</strong> ${data.name||'—'}</div>
      <div><strong style="color:#CC0000">Owner:</strong> ${data.owner_name||'—'}</div>
      <div><strong style="color:#CC0000">Phone:</strong> ${data.phone||'—'}</div>
      <div><strong style="color:#CC0000">Email:</strong> ${data.email||'—'}</div>
      <div><strong style="color:#CC0000">City:</strong> ${data.city||'—'}</div>
      <div><strong style="color:#CC0000">Business Type:</strong> ${data.business_type||'—'}</div>
      <div><strong style="color:#CC0000">Service:</strong> ${data.service_type||'—'}</div>
      <div><strong style="color:#CC0000">Status:</strong> ${getBadge(data.status)}</div>
      <div><strong style="color:#CC0000">Joined:</strong> ${date}</div>
    </div></div>`;
  document.body.appendChild(modal);
}

// ========== EDIT CLIENT ==========
async function editClient(id){
  document.getElementById('edit-client-modal')?.remove();
  const { data: c, error } = await supabaseClient.from('clients').select('*').eq('id', id).single();
  if(error||!c){ showToast('❌ Error loading client','red'); return; }
  const modal = document.createElement('div');
  modal.id = 'edit-client-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center';
  modal.onclick = (e)=>{if(e.target===modal)modal.remove();};
  const inp = 'width:100%;padding:10px;background:#222;color:white;border:1px solid #CC0000;border-radius:8px;margin-bottom:12px;font-family:Inter,sans-serif';
  const sel = (field, val, opts) => opts.map(o=>`<option value="${o}" ${val===o?'selected':''}>${o.charAt(0).toUpperCase()+o.slice(1)}</option>`).join('');
  modal.innerHTML = `<div style="background:#111;border:1px solid #CC0000;border-radius:12px;padding:30px;width:450px;max-width:90%;max-height:90vh;overflow-y:auto">
    <h3 style="color:#CC0000;margin-bottom:20px">✏️ Edit Client</h3>
    <label style="color:white;font-size:13px;font-weight:600">Client Name</label>
    <input id="ec-name" value="${c.name||''}" style="${inp}"/>
    <label style="color:white;font-size:13px;font-weight:600">Owner Name</label>
    <input id="ec-owner" value="${c.owner_name||''}" style="${inp}"/>
    <label style="color:white;font-size:13px;font-weight:600">Phone</label>
    <input id="ec-phone" value="${c.phone||''}" style="${inp}"/>
    <label style="color:white;font-size:13px;font-weight:600">Email</label>
    <input id="ec-email" value="${c.email||''}" style="${inp}"/>
    <label style="color:white;font-size:13px;font-weight:600">City</label>
    <input id="ec-city" value="${c.city||''}" style="${inp}"/>
    <label style="color:white;font-size:13px;font-weight:600">Business Type</label>
    <select id="ec-type" style="${inp}">${sel('type',c.business_type||'other',['cafe','restaurant','shop','other'])}</select>
    <label style="color:white;font-size:13px;font-weight:600">Status</label>
    <select id="ec-status" style="${inp}">${sel('status',c.status||'active',['active','pending','inactive'])}</select>
    <div style="display:flex;gap:10px;margin-top:8px">
      <button onclick="saveClient('${id}')" style="flex:1;padding:12px;background:#CC0000;color:white;border:none;border-radius:8px;font-weight:700;cursor:pointer">💾 Save Changes</button>
      <button onclick="document.getElementById('edit-client-modal').remove()" style="flex:1;padding:12px;background:#333;color:white;border:none;border-radius:8px;cursor:pointer">Cancel</button>
    </div></div>`;
  document.body.appendChild(modal);
}
async function saveClient(id){
  const { error } = await supabaseClient.from('clients').update({
    name: document.getElementById('ec-name').value.trim(),
    owner_name: document.getElementById('ec-owner').value.trim() || null,
    phone: document.getElementById('ec-phone').value.trim() || null,
    email: document.getElementById('ec-email').value.trim() || null,
    city: document.getElementById('ec-city').value.trim() || null,
    business_type: document.getElementById('ec-type').value,
    status: document.getElementById('ec-status').value
  }).eq('id', id);
  if(error){ showToast('❌ Error — '+error.message,'red'); return; }
  showToast('✅ Client updated!','green');
  document.getElementById('edit-client-modal')?.remove();
  await loadAllData();
}
// Keep old function name working
async function saveEditClient(){ /* handled by saveClient now */ }

// ========== VIEW INSTAGRAM PROJECT ==========
async function viewInsta(id){
  const modal = document.getElementById('modal-view-insta');
  const content = document.getElementById('view-insta-content');
  content.innerHTML = '<p style="color:var(--red)">Loading...</p>';
  modal.classList.add('show');
  const { data, error } = await supabaseClient.from('instagram_projects').select('*, clients(name, phone, city)').eq('id', id).single();
  if(error||!data){ content.innerHTML = '<p style="color:#f00">❌ Error loading project</p>'; return; }
  const startDate = data.start_date ? new Date(data.start_date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '—';
  content.innerHTML = `
    <div style="display:grid;gap:12px">
      <div><strong style="color:var(--red)">Client:</strong> ${data.clients?.name||'—'}</div>
      <div><strong style="color:var(--red)">Instagram Handle:</strong> ${data.instagram_handle||'—'}</div>
      <div><strong style="color:var(--red)">Package:</strong> <span class="badge badge-${(data.package||'standard').toLowerCase()}">${data.package||'Standard'}</span></div>
      <div><strong style="color:var(--red)">Posts/Month:</strong> ${data.posts_per_month||0}</div>
      <div><strong style="color:var(--red)">Reels/Month:</strong> ${data.reels_per_month||0}</div>
      <div><strong style="color:var(--red)">Monthly Fee:</strong> ₹${(data.monthly_fee||0).toLocaleString()}</div>
      <div><strong style="color:var(--red)">Status:</strong> ${getBadge(data.status)}</div>
      <div><strong style="color:var(--red)">Start Date:</strong> ${startDate}</div>
      <div><strong style="color:var(--red)">Notes:</strong> ${data.notes||'—'}</div>
      <div><strong style="color:var(--red)">Login Username:</strong> ${data.login_username||'—'}</div>
    </div>`;
}

// ========== EDIT INSTAGRAM PROJECT ==========
async function editInstaProject(instaId, projectId) {
  const { data: ip } = await supabaseClient.from('instagram_projects').select('*, projects(monthly_fee, status, package)').eq('id', instaId).single();
  const modal = document.createElement('div');
  modal.id = 'edit-insta-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;overflow-y:auto';
  modal.innerHTML = `
    <div style="background:#111;border:1px solid #CC0000;border-radius:12px;padding:30px;width:480px;max-width:95%;margin:20px;max-height:90vh;overflow-y:auto">
      <h3 style="color:#CC0000;margin-bottom:20px">✏️ Edit Instagram Project</h3>
      <label style="color:#aaa;font-size:12px">PACKAGE</label>
      <select id="ei-package" style="width:100%;padding:10px;background:#222;color:white;border:1px solid #CC0000;border-radius:8px;margin-bottom:12px;margin-top:4px">
        <option value="basic" ${ip?.projects?.package==='basic'?'selected':''}>Basic — ₹3,000</option>
        <option value="standard" ${ip?.projects?.package==='standard'?'selected':''}>Standard — ₹5,000</option>
        <option value="premium" ${ip?.projects?.package==='premium'?'selected':''}>Premium — ₹8,000</option>
      </select>
      <label style="color:#aaa;font-size:12px">MONTHLY FEE (₹)</label>
      <input id="ei-fee" type="number" value="${ip?.projects?.monthly_fee||5000}" style="width:100%;padding:10px;background:#222;color:white;border:1px solid #CC0000;border-radius:8px;margin-bottom:12px;margin-top:4px"/>
      <label style="color:#aaa;font-size:12px">POSTS PER MONTH</label>
      <input id="ei-posts" type="number" value="${ip?.posts_per_month||20}" style="width:100%;padding:10px;background:#222;color:white;border:1px solid #CC0000;border-radius:8px;margin-bottom:12px;margin-top:4px"/>
      <label style="color:#aaa;font-size:12px">REELS PER MONTH</label>
      <input id="ei-reels" type="number" value="${ip?.reels_per_month||4}" style="width:100%;padding:10px;background:#222;color:white;border:1px solid #CC0000;border-radius:8px;margin-bottom:12px;margin-top:4px"/>
      <label style="color:#aaa;font-size:12px">INSTAGRAM HANDLE</label>
      <input id="ei-handle" value="${ip?.instagram_handle||''}" placeholder="@username" style="width:100%;padding:10px;background:#222;color:white;border:1px solid #CC0000;border-radius:8px;margin-bottom:12px;margin-top:4px"/>
      <label style="color:#aaa;font-size:12px">STATUS</label>
      <select id="ei-status" style="width:100%;padding:10px;background:#222;color:white;border:1px solid #CC0000;border-radius:8px;margin-bottom:12px;margin-top:4px">
        <option value="in_progress" ${ip?.projects?.status==='in_progress'?'selected':''}>In Progress</option>
        <option value="active" ${ip?.projects?.status==='active'?'selected':''}>Active</option>
        <option value="completed" ${ip?.projects?.status==='completed'?'selected':''}>Completed</option>
        <option value="paused" ${ip?.projects?.status==='paused'?'selected':''}>Paused</option>
      </select>
      <label style="color:#aaa;font-size:12px">NEXT POST DUE</label>
      <input id="ei-nextpost" type="date" value="${ip?.next_post_due||''}" style="width:100%;padding:10px;background:#222;color:white;border:1px solid #CC0000;border-radius:8px;margin-bottom:12px;margin-top:4px"/>
      <label style="color:#aaa;font-size:12px">NOTES</label>
      <textarea id="ei-notes" style="width:100%;padding:10px;background:#222;color:white;border:1px solid #CC0000;border-radius:8px;margin-bottom:20px;margin-top:4px;height:80px">${ip?.notes||''}</textarea>
      <div style="display:flex;gap:10px">
        <button onclick="saveInstaProject('${instaId}','${projectId}')" style="flex:1;padding:12px;background:#CC0000;color:white;border:none;border-radius:8px;font-weight:700;cursor:pointer">💾 Save Changes</button>
        <button onclick="document.getElementById('edit-insta-modal').remove()" style="flex:1;padding:12px;background:#333;color:white;border:none;border-radius:8px;cursor:pointer">Cancel</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

async function saveInstaProject(instaId, projectId) {
  const pkg = document.getElementById('ei-package').value;
  const fee = parseFloat(document.getElementById('ei-fee').value);
  const posts = parseInt(document.getElementById('ei-posts').value);
  const reels = parseInt(document.getElementById('ei-reels').value);
  const handle = document.getElementById('ei-handle').value;
  const status = document.getElementById('ei-status').value;
  const nextPost = document.getElementById('ei-nextpost').value;
  const notes = document.getElementById('ei-notes').value;

  await supabaseClient.from('instagram_projects').update({
    posts_per_month: posts,
    reels_per_month: reels,
    instagram_handle: handle,
    next_post_due: nextPost || null,
    notes: notes
  }).eq('id', instaId);

  if (projectId) {
    await supabaseClient.from('projects').update({
      package: pkg,
      monthly_fee: fee,
      status: status
    }).eq('id', projectId);
  }

  showToast('✅ Instagram project updated!', 'green');
  document.getElementById('edit-insta-modal')?.remove();
  await loadAllData();
}

async function deleteInstaProject(instaId, projectId) {
  if(!confirm('Delete this Instagram project?')) return;
  await supabaseClient.from('instagram_projects').delete().eq('id', instaId);
  if (projectId) {
    await supabaseClient.from('subscriptions').delete().eq('project_id', projectId);
    await supabaseClient.from('projects').delete().eq('id', projectId);
  }
  showToast('✅ Deleted!', 'green');
  await loadAllData();
}

// Keep old function names around if called from elsewhere
async function editInsta(id) { editInstaProject(id, null); }
async function saveEditInsta() { }

// ========== NEW INSTAGRAM PROJECT ==========
function openNewInstaModal(){
  const sel = document.getElementById('ni-client');
  sel.innerHTML = allClients.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  if(allClients.length === 0) sel.innerHTML = '<option value="">No clients — add one first</option>';
  document.getElementById('ni-start').value = new Date().toISOString().slice(0,10);
  document.getElementById('modal-new-insta').classList.add('show');
}
async function saveNewInstaProject(){
  const clientId = document.getElementById('ni-client').value;
  if(!clientId){ showToast('❌ Please select a client', true); return; }
  const handle = document.getElementById('ni-handle').value.trim();
  const pkg = document.getElementById('ni-package').value;
  const posts = parseInt(document.getElementById('ni-posts').value) || 0;
  const reels = parseInt(document.getElementById('ni-reels').value) || 0;
  const fee = parseInt(document.getElementById('ni-fee').value) || 0;
  const startDate = document.getElementById('ni-start').value;
  const loginUser = document.getElementById('ni-login-user').value.trim();
  const loginPass = document.getElementById('ni-login-pass').value.trim();
  const notes = document.getElementById('ni-notes').value.trim();

  // Insert into projects table
  const { data: project, error: e1 } = await supabaseClient.from('projects').insert({
    client_id: clientId, service_type: 'instagram', package: pkg,
    monthly_fee: fee, status: 'in_progress', start_date: startDate
  }).select().single();
  if(e1){ showToast('❌ Error creating project — ' + e1.message, true); return; }

  // Insert into instagram_projects table
  const { error: e2 } = await supabaseClient.from('instagram_projects').insert({
    project_id: project?.id || null, client_id: clientId, instagram_handle: handle,
    posts_per_month: posts, reels_per_month: reels, monthly_fee: fee,
    package: pkg, status: 'in_progress', start_date: startDate,
    login_username: loginUser || null, login_password: loginPass || null,
    notes: notes || null
  });
  if(e2){ showToast('❌ Error creating Instagram project — ' + e2.message, true); return; }

  document.getElementById('modal-new-insta').classList.remove('show');
  ['ni-handle','ni-login-user','ni-login-pass','ni-notes'].forEach(id => document.getElementById(id).value='');
  showToast('✅ Instagram project created!');
  await loadAllData();
}

// ========== SEED VIP CAFE ==========
async function seedVipCafe(){
  try {
    const { data: vipClient } = await supabaseClient.from('clients').select('id').eq('name', 'VIP Cafe').single();
    if(vipClient){
      const { data: existing } = await supabaseClient.from('instagram_projects').select('id').eq('client_id', vipClient.id).single();
      if(!existing){
        await supabaseClient.from('projects').insert({
          client_id: vipClient.id, service_type: 'instagram', package: 'standard',
          monthly_fee: 5000, status: 'in_progress', start_date: '2026-05-08'
        });
        await supabaseClient.from('instagram_projects').insert({
          client_id: vipClient.id, instagram_handle: '@vipcafe', package: 'standard',
          posts_per_month: 20, reels_per_month: 4, monthly_fee: 5000,
          status: 'in_progress', start_date: '2026-05-08'
        });
        console.log('VIP Cafe seeded into instagram_projects');
      }
    }
  } catch(e){ console.log('Seed check:', e.message); }
}

// ========== INIT ==========
loadSettings();
checkSession();
