import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Camera, Cuboid, Monitor, 
  CreditCard, BarChart3, Settings, LogOut, Search, Plus, 
  Edit2, Trash2, ShieldAlert, Menu, Lock, X
} from 'lucide-react';

const supabase = createClient(
  'https://qjykkdmujwlkpcdyzeqa.supabase.co',
  'sb_publishable_rUybvqyug25z0OIXaCs25Q_cTmKdC8h'
);

const SuperAdminDashboard = () => {
  const [session, setSession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Global State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allClients, setAllClients] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [allInstaProjects, setAllInstaProjects] = useState([]);
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const showToast = (msg, type = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
  };

  // Modal State
  const [modalType, setModalType] = useState(null); // 'client' | 'project' | 'instagram' | 'subscription'
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) loadAllData();
    });
    return () => authListener?.subscription?.unsubscribe();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    if (session) loadAllData();
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoggingIn(false);
    if (error) setLoginError('⛔ Access Denied — ' + error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const loadAllData = async () => {
    try {
      const [clientsRes, projectsRes, instaRes, subsRes] = await Promise.all([
        supabase.from('clients').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*, clients(name)').order('created_at', { ascending: false }),
        supabase.from('instagram_projects').select('*, clients(name), projects(monthly_fee, status, package, id)').order('created_at', { ascending: false }),
        supabase.from('subscriptions').select('*, clients(name)').order('created_at', { ascending: false })
      ]);
      if (clientsRes.data) setAllClients(clientsRes.data);
      if (projectsRes.data) setAllProjects(projectsRes.data);
      if (instaRes.data) setAllInstaProjects(instaRes.data);
      if (subsRes.data) setAllSubscriptions(subsRes.data);
    } catch (err) {
      console.error('Error loading data:', err);
      showToast('Failed to load data', 'error');
    }
  };

  const getBadgeColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'active' || s === 'completed' || s === 'paid') return 'bg-white/10 text-white border-white/20';
    if (s === 'in_progress' || s === 'pending') return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    if (s === 'inactive' || s === 'paused') return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    return 'bg-white/10 text-white border-white/20';
  };

  // Modal Open Handlers
  const handleOpenClientModal = (mode, client = null) => {
    setModalMode(mode);
    if (mode === 'add') {
      setFormData({
        name: '',
        owner_name: '',
        phone: '',
        email: '',
        city: '',
        business_type: 'other',
        status: 'active'
      });
    } else if (client) {
      setFormData({
        id: client.id,
        name: client.name || '',
        owner_name: client.owner_name || '',
        phone: client.phone || '',
        email: client.email || '',
        city: client.city || '',
        business_type: client.business_type || 'other',
        status: client.status || 'active'
      });
    }
    setModalType('client');
  };

  const handleOpenProjectModal = (mode, serviceType, project = null) => {
    setModalMode(mode);
    if (mode === 'add') {
      setFormData({
        client_id: allClients[0]?.id || '',
        service_type: serviceType,
        package: 'standard',
        monthly_fee: 0,
        status: 'in_progress',
        start_date: new Date().toISOString().slice(0, 10),
        notes: '',
        tech_stack: 'HTML/CSS/JS',
        website_type: 'Landing Page',
        model_count: 5
      });
    } else if (project) {
      setFormData({
        id: project.id,
        client_id: project.client_id || '',
        service_type: project.service_type || serviceType,
        package: project.package || 'standard',
        monthly_fee: project.monthly_fee || 0,
        status: project.status || 'in_progress',
        start_date: project.start_date ? project.start_date.slice(0, 10) : '',
        notes: project.notes || '',
        tech_stack: project.tech_stack || 'HTML/CSS/JS',
        website_type: project.website_type || 'Landing Page',
        model_count: project.model_count || 5
      });
    }
    setModalType('project');
  };

  const handleOpenInstaModal = (mode, ip = null) => {
    setModalMode(mode);
    if (mode === 'add') {
      setFormData({
        client_id: allClients[0]?.id || '',
        instagram_handle: '',
        package: 'standard',
        posts_per_month: 20,
        reels_per_month: 4,
        monthly_fee: 5000,
        status: 'in_progress',
        start_date: new Date().toISOString().slice(0, 10),
        next_post_due: '',
        login_username: '',
        login_password: '',
        notes: ''
      });
    } else if (ip) {
      setFormData({
        id: ip.id,
        project_id: ip.project_id || ip.projects?.id || '',
        client_id: ip.client_id || '',
        instagram_handle: ip.instagram_handle || '',
        package: ip.projects?.package || ip.package || 'standard',
        posts_per_month: ip.posts_per_month || 20,
        reels_per_month: ip.reels_per_month || 4,
        monthly_fee: ip.projects?.monthly_fee || ip.monthly_fee || 5000,
        status: ip.projects?.status || ip.status || 'in_progress',
        start_date: ip.start_date ? ip.start_date.slice(0, 10) : '',
        next_post_due: ip.next_post_due ? ip.next_post_due.slice(0, 10) : '',
        login_username: ip.login_username || '',
        login_password: ip.login_password || '',
        notes: ip.notes || ip.content_notes || ''
      });
    }
    setModalType('instagram');
  };

  const handleOpenSubModal = (mode, s = null) => {
    setModalMode(mode);
    if (mode === 'add') {
      setFormData({
        client_id: allClients[0]?.id || '',
        project_id: '',
        service_type: 'instagram',
        amount: 0,
        status: 'pending',
        start_date: new Date().toISOString().slice(0, 10),
        due_date: ''
      });
    } else if (s) {
      setFormData({
        id: s.id,
        client_id: s.client_id || '',
        project_id: s.project_id || '',
        service_type: s.service_type || 'instagram',
        amount: s.amount || 0,
        status: s.status || 'pending',
        start_date: s.start_date ? s.start_date.slice(0, 10) : '',
        due_date: s.due_date ? s.due_date.slice(0, 10) : ''
      });
    }
    setModalType('subscription');
  };

  // CRUD Delete Operations
  const handleDeleteClient = async (id) => {
    if(!window.confirm('Delete this client? This cannot be undone.')) return;
    const { error } = await supabase.from('clients').delete().eq('id', id);
    if(error){ showToast('Error deleting client', 'error'); return; }
    showToast('Client deleted successfully');
    loadAllData();
  };

  const handleDeleteProject = async (id) => {
    if(!window.confirm('Delete this project? This will delete associated subscriptions and Instagram project data.')) return;
    await supabase.from('instagram_projects').delete().eq('project_id', id);
    await supabase.from('subscriptions').delete().eq('project_id', id);
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if(error){ showToast('Error deleting project', 'error'); return; }
    showToast('Project deleted successfully');
    loadAllData();
  };

  const handleDeleteInsta = async (instaId, projectId) => {
    if(!window.confirm('Delete this Instagram project?')) return;
    await supabase.from('instagram_projects').delete().eq('id', instaId);
    if (projectId) {
      await supabase.from('subscriptions').delete().eq('project_id', projectId);
      await supabase.from('projects').delete().eq('id', projectId);
    }
    showToast('Instagram project deleted successfully');
    loadAllData();
  };

  const handleDeleteSub = async (id) => {
    if(!window.confirm('Delete this subscription? This cannot be undone.')) return;
    const { error } = await supabase.from('subscriptions').delete().eq('id', id);
    if(error){ showToast('Error deleting subscription', 'error'); return; }
    showToast('Subscription deleted successfully');
    loadAllData();
  };

  const handleToggleClientStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const { error } = await supabase.from('clients').update({ status: newStatus }).eq('id', id);
    if(error){ showToast('Error updating status', 'error'); return; }
    showToast(`Status updated to ${newStatus}`);
    loadAllData();
  };

  // CRUD Form Submission Handling
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalType === 'client') {
        if (modalMode === 'add') {
          const { error } = await supabase.from('clients').insert([{
            name: formData.name,
            owner_name: formData.owner_name || null,
            phone: formData.phone || null,
            email: formData.email || null,
            city: formData.city || null,
            business_type: formData.business_type,
            status: formData.status
          }]);
          if (error) throw error;
          showToast('Client added successfully');
        } else {
          const { error } = await supabase.from('clients').update({
            name: formData.name,
            owner_name: formData.owner_name || null,
            phone: formData.phone || null,
            email: formData.email || null,
            city: formData.city || null,
            business_type: formData.business_type,
            status: formData.status
          }).eq('id', formData.id);
          if (error) throw error;
          showToast('Client updated successfully');
        }
      } else if (modalType === 'project') {
        if (modalMode === 'add') {
          const { error } = await supabase.from('projects').insert([{
            client_id: formData.client_id,
            service_type: formData.service_type,
            package: formData.package,
            monthly_fee: parseFloat(formData.monthly_fee) || 0,
            status: formData.status,
            start_date: formData.start_date || null,
            notes: formData.notes || null,
            tech_stack: formData.service_type === 'website' ? formData.tech_stack : null,
            website_type: formData.service_type === 'website' ? formData.website_type : null,
            model_count: formData.service_type === 'ar_menu' ? parseInt(formData.model_count) || null : null
          }]);
          if (error) throw error;
          showToast('Project added successfully');
        } else {
          const { error } = await supabase.from('projects').update({
            client_id: formData.client_id,
            service_type: formData.service_type,
            package: formData.package,
            monthly_fee: parseFloat(formData.monthly_fee) || 0,
            status: formData.status,
            start_date: formData.start_date || null,
            notes: formData.notes || null,
            tech_stack: formData.service_type === 'website' ? formData.tech_stack : null,
            website_type: formData.service_type === 'website' ? formData.website_type : null,
            model_count: formData.service_type === 'ar_menu' ? parseInt(formData.model_count) || null : null
          }).eq('id', formData.id);
          if (error) throw error;
          showToast('Project updated successfully');
        }
      } else if (modalType === 'instagram') {
        if (modalMode === 'add') {
          // Insert into projects table first
          const { data: project, error: e1 } = await supabase.from('projects').insert([{
            client_id: formData.client_id,
            service_type: 'instagram',
            package: formData.package,
            monthly_fee: parseFloat(formData.monthly_fee) || 0,
            status: formData.status,
            start_date: formData.start_date || null
          }]).select().single();
          if (e1) throw e1;

          // Insert into instagram_projects table
          const { error: e2 } = await supabase.from('instagram_projects').insert([{
            project_id: project.id,
            client_id: formData.client_id,
            instagram_handle: formData.instagram_handle,
            posts_per_month: parseInt(formData.posts_per_month) || 0,
            reels_per_month: parseInt(formData.reels_per_month) || 0,
            next_post_due: formData.next_post_due || null,
            login_username: formData.login_username || null,
            login_password: formData.login_password || null,
            content_notes: formData.notes || null
          }]);
          if (e2) {
            // Clean up project record if instagram_project fails
            await supabase.from('projects').delete().eq('id', project.id);
            throw e2;
          }
          showToast('Instagram project added successfully');
        } else {
          // Update instagram_projects
          const { error: e1 } = await supabase.from('instagram_projects').update({
            instagram_handle: formData.instagram_handle,
            posts_per_month: parseInt(formData.posts_per_month) || 0,
            reels_per_month: parseInt(formData.reels_per_month) || 0,
            next_post_due: formData.next_post_due || null,
            login_username: formData.login_username || null,
            login_password: formData.login_password || null,
            content_notes: formData.notes || null
          }).eq('id', formData.id);
          if (e1) throw e1;

          // Update projects
          if (formData.project_id) {
            const { error: e2 } = await supabase.from('projects').update({
              package: formData.package,
              monthly_fee: parseFloat(formData.monthly_fee) || 0,
              status: formData.status,
              start_date: formData.start_date || null
            }).eq('id', formData.project_id);
            if (e2) throw e2;
          }
          showToast('Instagram project updated successfully');
        }
      } else if (modalType === 'subscription') {
        if (modalMode === 'add') {
          const { error } = await supabase.from('subscriptions').insert([{
            client_id: formData.client_id,
            project_id: formData.project_id || null,
            service_type: formData.service_type,
            amount: parseFloat(formData.amount) || 0,
            status: formData.status,
            start_date: formData.start_date || null,
            due_date: formData.due_date || null
          }]);
          if (error) throw error;
          showToast('Subscription added successfully');
        } else {
          const { error } = await supabase.from('subscriptions').update({
            client_id: formData.client_id,
            project_id: formData.project_id || null,
            service_type: formData.service_type,
            amount: parseFloat(formData.amount) || 0,
            status: formData.status,
            start_date: formData.start_date || null,
            due_date: formData.due_date || null
          }).eq('id', formData.id);
          if (error) throw error;
          showToast('Subscription updated successfully');
        }
      }
      setModalType(null);
      loadAllData();
    } catch (err) {
      console.error('Error submitting form:', err);
      showToast(err.message || 'Error saving changes', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#000000] flex items-center justify-center"><div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div></div>;

  if (!session) {
    return (
      <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-4 relative overflow-hidden font-dm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20"><ShieldAlert className="w-8 h-8 text-white" /></div>
            <h1 className="text-3xl font-bebas tracking-wider text-white">SYSTEM ACCESS</h1>
            <p className="text-gray-400 text-sm mt-2">Authorized Personnel Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/50 transition-all placeholder:text-gray-600" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/50 transition-all placeholder:text-gray-600" required />
            {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
            <button type="submit" disabled={isLoggingIn} className="w-full bg-white text-black hover:bg-gray-200 font-medium rounded-full py-4 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoggingIn ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"/> : <><Lock className="w-5 h-5"/> INITIALIZE_</>}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'clients', icon: Users, label: 'Clients' },
    { id: 'instagram', icon: Camera, label: 'Instagram' },
    { id: 'armenu', icon: Cuboid, label: 'AR Menu' },
    { id: 'websites', icon: Monitor, label: 'Websites' },
    { id: 'subscriptions', icon: CreditCard, label: 'Subscriptions' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const totalRevenue = allSubscriptions.filter(s => s.status === 'paid' || s.status === 'active').reduce((sum, s) => sum + (s.amount || 0), 0);
  const activeProjectsCount = allProjects.filter(p => p.status !== 'completed').length;

  return (
    <div className="min-h-screen bg-[#000000] text-white font-dm selection:bg-white/30">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] mix-blend-screen transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0b0b0b]/90 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
        <div className="h-20 flex items-center px-8 border-b border-white/5"><span className="font-bebas text-3xl tracking-widest text-white">ZEN_X</span></div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${isActive ? 'bg-white/10 text-white border border-white/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all"><LogOut className="w-5 h-5" /><span className="font-medium text-sm tracking-wide">Disconnect</span></button>
        </div>
      </aside>

      <main className="lg:ml-72 relative z-10 min-h-screen flex flex-col">
        <header className="h-20 bg-[#0b0b0b]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
            <h2 className="text-xl font-medium capitalize tracking-wide text-gray-200">{activeTab.replace('-', ' ')}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white font-bold">TX</div>
          </div>
        </header>

        <div className="p-6 lg:p-10 flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Total MRR', value: `₹${totalRevenue.toLocaleString()}` },
                      { label: 'Active Projects', value: activeProjectsCount },
                      { label: 'Total Clients', value: allClients.length },
                      { label: 'New Signups', value: '+3 This Week' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:border-white/30 transition-colors group">
                        <p className="text-gray-400 text-xs font-medium tracking-wider uppercase mb-2">{stat.label}</p>
                        <h3 className="text-3xl font-bebas tracking-wider text-white group-hover:scale-105 transition-transform origin-left">{stat.value}</h3>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6">
                    <h3 className="font-medium text-lg mb-6">Active Projects Overview</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead><tr className="border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider"><th className="pb-3 font-medium">Client</th><th className="pb-3 font-medium">Service</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Fee</th></tr></thead>
                        <tbody>
                          {allProjects.filter(p => p.status !== 'completed').slice(0, 5).map((p, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                              <td className="py-4 text-sm font-medium">{p.clients?.name || 'Unknown'}</td>
                              <td className="py-4 text-sm text-gray-400 capitalize">{(p.service_type || '').replace('_', ' ')}</td>
                              <td className="py-4"><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${getBadgeColor(p.status)}`}>{p.status}</span></td>
                              <td className="py-4 text-sm font-medium">₹{(p.monthly_fee || 0).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'clients' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <input type="text" placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full sm:w-96 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-white/50 text-white" />
                    <button onClick={() => handleOpenClientModal('add')} className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center justify-center gap-2 text-sm"><Plus className="w-4 h-4"/> Add Client</button>
                  </div>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead><tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider"><th className="p-4 font-medium">Client Info</th><th className="p-4 font-medium">Type</th><th className="p-4 font-medium">Contact</th><th className="p-4 font-medium">Status</th><th className="p-4 font-medium text-right">Actions</th></tr></thead>
                        <tbody>
                          {allClients.filter(c => c.name?.toLowerCase().includes(searchQuery.toLowerCase())).map((c, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                              <td className="p-4"><div className="font-medium">{c.name}</div><div className="text-xs text-gray-500 mt-0.5">{c.city || 'No City'}</div></td>
                              <td className="p-4 text-sm text-gray-400 capitalize">{c.business_type}</td>
                              <td className="p-4"><div className="text-sm">{c.phone || '—'}</div><div className="text-xs text-gray-500 mt-0.5">{c.email || '—'}</div></td>
                              <td className="p-4"><span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${getBadgeColor(c.status)}`}>{c.status}</span></td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => handleToggleClientStatus(c.id, c.status)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors" title="Toggle Status (Active/Inactive)"><Edit2 className="w-4 h-4" style={{opacity: 0.5}} /></button>
                                  <button onClick={() => handleOpenClientModal('edit', c)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors" title="Edit Client"><Edit2 className="w-4 h-4"/></button>
                                  <button onClick={() => handleDeleteClient(c.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors" title="Delete Client"><Trash2 className="w-4 h-4"/></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'instagram' && (
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-medium">Instagram Projects</h3>
                    <button onClick={() => handleOpenInstaModal('add')} className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4"/> New Insta Project</button>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                          <th className="p-4">Client</th>
                          <th className="p-4">Package</th>
                          <th className="p-4">Posts/Reels</th>
                          <th className="p-4">Fee</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allInstaProjects.map((p, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                            <td className="p-4 font-medium">{p.clients?.name}</td>
                            <td className="p-4 text-gray-400 capitalize">{p.projects?.package || p.package || 'Standard'}</td>
                            <td className="p-4 text-sm">{p.posts_per_month} / {p.reels_per_month}</td>
                            <td className="p-4">₹{(p.projects?.monthly_fee || p.monthly_fee || 0).toLocaleString()}</td>
                            <td className="p-4"><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${getBadgeColor(p.projects?.status || p.status)}`}>{p.projects?.status || p.status}</span></td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleOpenInstaModal('edit', p)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors" title="Edit Instagram Project"><Edit2 className="w-4 h-4"/></button>
                                <button onClick={() => handleDeleteInsta(p.id, p.projects?.id || p.project_id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors" title="Delete Instagram Project"><Trash2 className="w-4 h-4"/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'armenu' && (
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-medium">AR Menu Projects</h3>
                    <button onClick={() => handleOpenProjectModal('add', 'ar_menu')} className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4"/> New AR Project</button>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                          <th className="p-4">Client</th>
                          <th className="p-4">Package</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Fee</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allProjects.filter(p=>p.service_type==='ar_menu').map((p, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                            <td className="p-4 font-medium">{p.clients?.name}</td>
                            <td className="p-4 text-gray-400 capitalize">{p.package || 'Standard'}</td>
                            <td className="p-4"><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${getBadgeColor(p.status)}`}>{p.status}</span></td>
                            <td className="p-4">₹{(p.monthly_fee || 0).toLocaleString()}</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleOpenProjectModal('edit', 'ar_menu', p)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors" title="Edit AR Project"><Edit2 className="w-4 h-4"/></button>
                                <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors" title="Delete AR Project"><Trash2 className="w-4 h-4"/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'websites' && (
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-medium">Website Projects</h3>
                    <button onClick={() => handleOpenProjectModal('add', 'website')} className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4"/> New Website</button>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                          <th className="p-4">Client</th>
                          <th className="p-4">Tech Stack</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Fee</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allProjects.filter(p=>p.service_type==='website').map((p, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                            <td className="p-4 font-medium">{p.clients?.name}</td>
                            <td className="p-4 text-gray-400 capitalize">{p.tech_stack || 'React'}</td>
                            <td className="p-4"><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${getBadgeColor(p.status)}`}>{p.status}</span></td>
                            <td className="p-4">₹{(p.monthly_fee || 0).toLocaleString()}</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleOpenProjectModal('edit', 'website', p)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors" title="Edit Website Project"><Edit2 className="w-4 h-4"/></button>
                                <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors" title="Delete Website Project"><Trash2 className="w-4 h-4"/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'subscriptions' && (
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-medium">Subscriptions</h3>
                    <button onClick={() => handleOpenSubModal('add')} className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4"/> New Subscription</button>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                          <th className="p-4">Client</th>
                          <th className="p-4">Service</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allSubscriptions.map((s, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                            <td className="p-4 font-medium">{s.clients?.name}</td>
                            <td className="p-4 text-gray-400 capitalize">{(s.service_type||'').replace('_',' ')}</td>
                            <td className="p-4">₹{(s.amount||0).toLocaleString()}</td>
                            <td className="p-4"><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${getBadgeColor(s.status)}`}>{s.status}</span></td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleOpenSubModal('edit', s)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors" title="Edit Subscription"><Edit2 className="w-4 h-4"/></button>
                                <button onClick={() => handleDeleteSub(s.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors" title="Delete Subscription"><Trash2 className="w-4 h-4"/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (() => {
                const svcCount = {};
                allProjects.forEach(p => { const s = p.service_type || 'Other'; svcCount[s] = (svcCount[s]||0) + 1; });
                const svcData = Object.entries(svcCount).map(([l,v]) => ({l: l.replace('_',' '), v})).sort((a,b) => b.v - a.v);
                const maxSvc = Math.max(...svcData.map(d=>d.v), 1);

                const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
                const dayCounts = new Array(7).fill(0);
                allClients.forEach(c => { if(c.created_at){ dayCounts[new Date(c.created_at).getDay()]++; } });
                const maxDay = Math.max(...dayCounts, 1);

                const revByService = {};
                allProjects.forEach(p => { const s = p.service_type || 'Other'; revByService[s] = (revByService[s]||0) + (p.monthly_fee||0); });
                const revData = Object.entries(revByService).map(([l,v]) => ({l: l.replace('_',' '), v})).sort((a,b) => b.v - a.v);
                const maxRev = Math.max(...revData.map(d=>d.v), 1);

                const cityCount = {};
                allClients.forEach(c => { const city = c.city || 'Unknown'; cityCount[city] = (cityCount[city]||0) + 1; });
                const cityData = Object.entries(cityCount).map(([l,v]) => ({l,v})).sort((a,b) => b.v - a.v).slice(0,6);
                const maxCity = Math.max(...cityData.map(d=>d.v), 1);

                const renderChart = (data, max, colorFrom, colorTo) => (
                  <div className="flex items-end gap-3 h-48 py-4">
                    {data.length === 0 ? <div className="w-full text-center text-gray-500">No data</div> : data.map((d, i) => {
                      const h = Math.max((d.v/max)*160, 8);
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                          <div className="w-full rounded-t-md transition-all duration-500 relative" style={{ height: `${h}px`, background: `linear-gradient(to top, ${colorFrom}, ${colorTo})` }}>
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{d.v > 1000 ? `₹${d.v}` : d.v}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium truncate w-full text-center capitalize">{d.l}</span>
                        </div>
                      );
                    })}
                  </div>
                );

                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Projects by Service</h4>
                        {renderChart(svcData, maxSvc, '#3b82f6', '#60a5fa')}
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Client Signups by Day</h4>
                        {renderChart(days.map((l,i)=>({l,v:dayCounts[i]})), maxDay, '#10b981', '#34d399')}
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Revenue by Service</h4>
                        {renderChart(revData, maxRev, '#8b5cf6', '#a78bfa')}
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Top Cities</h4>
                        {renderChart(cityData, maxCity, '#f59e0b', '#fbbf24')}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h4 className="text-lg font-medium mb-6 text-white flex items-center gap-2">👑 Executive Founders</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { emoji: '👑', name: 'Trinayan Mahanta', role: 'CEO' },
                        { emoji: '💡', name: 'Snehangshu Das', role: 'Tech Lead' },
                        { emoji: '✨', name: 'Mannat Sahu', role: 'Design Lead' },
                        { emoji: '🚀', name: 'Aditya Pargyan', role: 'Marketing Lead' }
                      ].map((f, i) => (
                        <div key={i} className="bg-black/40 border border-white/10 rounded-xl p-6 text-center hover:border-white/30 transition-colors">
                          <div className="text-4xl mb-4">{f.emoji}</div>
                          <h5 className="font-bold text-gray-200">{f.name}</h5>
                          <p className="text-xs text-gray-500 mt-1">{f.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h4 className="text-lg font-medium mb-6 text-white flex items-center gap-2">⚙️ General Configuration</h4>
                    <div className="space-y-6 max-w-2xl">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Platform Name</label>
                        <input type="text" defaultValue="ZEN_X Digital Solutions" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Tagline</label>
                        <input type="text" defaultValue="Instagram · AR Menu · Websites · Digital Growth" readOnly className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Instagram Link</label>
                          <input type="text" defaultValue="https://www.instagram.com/zen_x_2026" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Support Email</label>
                          <input type="text" defaultValue="support@zenx.in" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50" />
                        </div>
                      </div>
                      <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full text-sm font-bold transition-all mt-4" onClick={() => showToast('Settings Saved Successfully!')}>💾 Save Settings</button>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto text-left"
            >
              <button 
                type="button"
                onClick={() => setModalType(null)} 
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bebas tracking-wide text-white mb-6">
                {modalMode === 'add' ? 'ADD' : 'EDIT'} {modalType.toUpperCase()}
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                {modalType === 'client' && (
                  <>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Client Name *</label>
                      <input 
                        type="text" 
                        value={formData.name || ''} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        required 
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Owner Name</label>
                      <input 
                        type="text" 
                        value={formData.owner_name || ''} 
                        onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })} 
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Phone</label>
                        <input 
                          type="text" 
                          value={formData.phone || ''} 
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Email</label>
                        <input 
                          type="email" 
                          value={formData.email || ''} 
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">City</label>
                      <input 
                        type="text" 
                        value={formData.city || ''} 
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Business Type</label>
                        <select 
                          value={formData.business_type || 'other'} 
                          onChange={(e) => setFormData({ ...formData, business_type: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        >
                          <option value="cafe" className="bg-black text-white">Cafe</option>
                          <option value="restaurant" className="bg-black text-white">Restaurant</option>
                          <option value="shop" className="bg-black text-white">Shop</option>
                          <option value="other" className="bg-black text-white">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Status</label>
                        <select 
                          value={formData.status || 'active'} 
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        >
                          <option value="active" className="bg-black text-white">Active</option>
                          <option value="pending" className="bg-black text-white">Pending</option>
                          <option value="inactive" className="bg-black text-white">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {modalType === 'project' && (
                  <>
                    {modalMode === 'add' ? (
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Client *</label>
                        <select 
                          value={formData.client_id || ''} 
                          onChange={(e) => setFormData({ ...formData, client_id: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                          required
                        >
                          {allClients.length === 0 ? (
                            <option value="">No clients — add one first</option>
                          ) : (
                            allClients.map((c) => (
                              <option key={c.id} value={c.id} className="bg-black text-white">{c.name}</option>
                            ))
                          )}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Client</label>
                        <input 
                          type="text" 
                          value={allClients.find(c => c.id === formData.client_id)?.name || 'Unknown'} 
                          className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none cursor-not-allowed"
                          readOnly
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Service Type</label>
                        <select 
                          value={formData.service_type || 'ar_menu'} 
                          onChange={(e) => setFormData({ ...formData, service_type: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        >
                          <option value="ar_menu" className="bg-black text-white">AR Menu</option>
                          <option value="website" className="bg-black text-white">Website</option>
                          <option value="digital_growth" className="bg-black text-white">Digital Growth</option>
                          <option value="bundle" className="bg-black text-white">Bundle</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Package</label>
                        <select 
                          value={formData.package || 'standard'} 
                          onChange={(e) => setFormData({ ...formData, package: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        >
                          <option value="basic" className="bg-black text-white">Basic</option>
                          <option value="standard" className="bg-black text-white">Standard</option>
                          <option value="premium" className="bg-black text-white">Premium</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Monthly Fee (₹)</label>
                        <input 
                          type="number" 
                          value={formData.monthly_fee || 0} 
                          onChange={(e) => setFormData({ ...formData, monthly_fee: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Status</label>
                        <select 
                          value={formData.status || 'in_progress'} 
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        >
                          <option value="in_progress" className="bg-black text-white">In Progress</option>
                          <option value="active" className="bg-black text-white">Active</option>
                          <option value="completed" className="bg-black text-white">Completed</option>
                          <option value="paused" className="bg-black text-white">Paused</option>
                        </select>
                      </div>
                    </div>

                    {formData.service_type === 'website' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Tech Stack</label>
                          <input 
                            type="text" 
                            value={formData.tech_stack || 'HTML/CSS/JS'} 
                            onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })} 
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Website Type</label>
                          <input 
                            type="text" 
                            value={formData.website_type || 'Landing Page'} 
                            onChange={(e) => setFormData({ ...formData, website_type: e.target.value })} 
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                          />
                        </div>
                      </div>
                    )}

                    {formData.service_type === 'ar_menu' && (
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Model Count</label>
                        <input 
                          type="number" 
                          value={formData.model_count || 5} 
                          onChange={(e) => setFormData({ ...formData, model_count: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Start Date</label>
                      <input 
                        type="date" 
                        value={formData.start_date || ''} 
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} 
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Notes</label>
                      <textarea 
                        value={formData.notes || ''} 
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })} 
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors h-20 resize-none"
                      />
                    </div>
                  </>
                )}

                {modalType === 'instagram' && (
                  <>
                    {modalMode === 'add' ? (
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Client *</label>
                        <select 
                          value={formData.client_id || ''} 
                          onChange={(e) => setFormData({ ...formData, client_id: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                          required
                        >
                          {allClients.length === 0 ? (
                            <option value="">No clients — add one first</option>
                          ) : (
                            allClients.map((c) => (
                              <option key={c.id} value={c.id} className="bg-black text-white">{c.name}</option>
                            ))
                          )}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Client</label>
                        <input 
                          type="text" 
                          value={allClients.find(c => c.id === formData.client_id)?.name || 'Unknown'} 
                          className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none cursor-not-allowed"
                          readOnly
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Instagram Handle</label>
                        <input 
                          type="text" 
                          placeholder="@username"
                          value={formData.instagram_handle || ''} 
                          onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Package</label>
                        <select 
                          value={formData.package || 'standard'} 
                          onChange={(e) => setFormData({ ...formData, package: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        >
                          <option value="basic" className="bg-black text-white">Basic</option>
                          <option value="standard" className="bg-black text-white">Standard</option>
                          <option value="premium" className="bg-black text-white">Premium</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Posts Per Month</label>
                        <input 
                          type="number" 
                          value={formData.posts_per_month || 0} 
                          onChange={(e) => setFormData({ ...formData, posts_per_month: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Reels Per Month</label>
                        <input 
                          type="number" 
                          value={formData.reels_per_month || 0} 
                          onChange={(e) => setFormData({ ...formData, reels_per_month: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Monthly Fee (₹)</label>
                        <input 
                          type="number" 
                          value={formData.monthly_fee || 0} 
                          onChange={(e) => setFormData({ ...formData, monthly_fee: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Status</label>
                        <select 
                          value={formData.status || 'in_progress'} 
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        >
                          <option value="in_progress" className="bg-black text-white">In Progress</option>
                          <option value="active" className="bg-black text-white">Active</option>
                          <option value="completed" className="bg-black text-white">Completed</option>
                          <option value="paused" className="bg-black text-white">Paused</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Login Username</label>
                        <input 
                          type="text" 
                          value={formData.login_username || ''} 
                          onChange={(e) => setFormData({ ...formData, login_username: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Login Password</label>
                        <input 
                          type="text" 
                          value={formData.login_password || ''} 
                          onChange={(e) => setFormData({ ...formData, login_password: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Start Date</label>
                        <input 
                          type="date" 
                          value={formData.start_date || ''} 
                          onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Next Post Due</label>
                        <input 
                          type="date" 
                          value={formData.next_post_due || ''} 
                          onChange={(e) => setFormData({ ...formData, next_post_due: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Notes</label>
                      <textarea 
                        value={formData.notes || ''} 
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })} 
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors h-20 resize-none"
                      />
                    </div>
                  </>
                )}

                {modalType === 'subscription' && (
                  <>
                    {modalMode === 'add' ? (
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Client *</label>
                        <select 
                          value={formData.client_id || ''} 
                          onChange={(e) => {
                            const newClientId = e.target.value;
                            setFormData({ ...formData, client_id: newClientId, project_id: '' });
                          }} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                          required
                        >
                          {allClients.length === 0 ? (
                            <option value="">No clients — add one first</option>
                          ) : (
                            allClients.map((c) => (
                              <option key={c.id} value={c.id} className="bg-black text-white">{c.name}</option>
                            ))
                          )}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Client</label>
                        <input 
                          type="text" 
                          value={allClients.find(c => c.id === formData.client_id)?.name || 'Unknown'} 
                          className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none cursor-not-allowed"
                          readOnly
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Tie to Project (Optional)</label>
                      <select 
                        value={formData.project_id || ''} 
                        onChange={(e) => {
                          const newProjId = e.target.value;
                          const foundProj = allProjects.find(p => p.id === newProjId);
                          setFormData({ 
                            ...formData, 
                            project_id: newProjId || null,
                            service_type: foundProj ? foundProj.service_type : formData.service_type,
                            amount: foundProj ? foundProj.monthly_fee : formData.amount
                          });
                        }} 
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                      >
                        <option value="" className="bg-black text-white">None / General</option>
                        {allProjects.filter(p => p.client_id === formData.client_id).map((p) => (
                          <option key={p.id} value={p.id} className="bg-black text-white">
                            {p.service_type.replace('_',' ')} - {p.package} (₹{p.monthly_fee})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Service Type</label>
                        <input 
                          type="text" 
                          value={formData.service_type || ''} 
                          onChange={(e) => setFormData({ ...formData, service_type: e.target.value })} 
                          placeholder="e.g. instagram, website"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Amount (₹)</label>
                        <input 
                          type="number" 
                          value={formData.amount || 0} 
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Status</label>
                      <select 
                        value={formData.status || 'pending'} 
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                      >
                        <option value="pending" className="bg-black text-white">Pending</option>
                        <option value="paid" className="bg-black text-white">Paid</option>
                        <option value="overdue" className="bg-black text-white">Overdue</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Start Date</label>
                        <input 
                          type="date" 
                          value={formData.start_date || ''} 
                          onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Due Date</label>
                        <input 
                          type="date" 
                          value={formData.due_date || ''} 
                          onChange={(e) => setFormData({ ...formData, due_date: e.target.value })} 
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <button 
                    type="button" 
                    onClick={() => setModalType(null)} 
                    className="flex-1 px-6 py-3.5 rounded-xl text-sm font-medium border border-white/10 hover:bg-white/5 transition-all text-center text-white"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting} 
                    className="flex-1 px-6 py-3.5 rounded-xl text-sm font-bold bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast.show && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-full border backdrop-blur-xl font-medium text-sm shadow-2xl flex items-center gap-3 ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-white/10 border-white/20 text-white'}`}>
            <div className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-red-500' : 'bg-white'}`} />
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuperAdminDashboard;
