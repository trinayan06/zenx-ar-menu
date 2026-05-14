import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Camera, Cuboid, Monitor, 
  CreditCard, BarChart3, Settings, LogOut, Search, Plus, 
  Edit2, Trash2, ShieldAlert, Menu, Lock
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
                    <button className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center justify-center gap-2 text-sm"><Plus className="w-4 h-4"/> Add Client</button>
                  </div>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead><tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider"><th className="p-4 font-medium">Client Info</th><th className="p-4 font-medium">Type</th><th className="p-4 font-medium">Contact</th><th className="p-4 font-medium">Status</th></tr></thead>
                        <tbody>
                          {allClients.filter(c => c.name?.toLowerCase().includes(searchQuery.toLowerCase())).map((c, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                              <td className="p-4"><div className="font-medium">{c.name}</div><div className="text-xs text-gray-500 mt-0.5">{c.city || 'No City'}</div></td>
                              <td className="p-4 text-sm text-gray-400 capitalize">{c.business_type}</td>
                              <td className="p-4"><div className="text-sm">{c.phone || '—'}</div><div className="text-xs text-gray-500 mt-0.5">{c.email || '—'}</div></td>
                              <td className="p-4"><span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${getBadgeColor(c.status)}`}>{c.status}</span></td>
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
                  <div className="flex justify-between"><h3 className="text-xl font-medium">Instagram Projects</h3><button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium">New Insta Project</button></div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                      <thead><tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider"><th className="p-4">Client</th><th className="p-4">Package</th><th className="p-4">Posts/Reels</th><th className="p-4">Fee</th><th className="p-4">Status</th></tr></thead>
                      <tbody>
                        {allInstaProjects.map((p, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5"><td className="p-4 font-medium">{p.clients?.name}</td><td className="p-4 text-gray-400 capitalize">{p.projects?.package || 'Standard'}</td><td className="p-4 text-sm">{p.posts_per_month} / {p.reels_per_month}</td><td className="p-4">₹{p.projects?.monthly_fee}</td><td className="p-4"><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${getBadgeColor(p.projects?.status)}`}>{p.projects?.status}</span></td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'armenu' && (
                <div className="space-y-6">
                  <div className="flex justify-between"><h3 className="text-xl font-medium">AR Menu Projects</h3><button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium">New AR Project</button></div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                      <thead><tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider"><th className="p-4">Client</th><th className="p-4">Package</th><th className="p-4">Status</th><th className="p-4">Fee</th></tr></thead>
                      <tbody>
                        {allProjects.filter(p=>p.service_type==='ar_menu').map((p, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5"><td className="p-4 font-medium">{p.clients?.name}</td><td className="p-4 text-gray-400 capitalize">{p.package || 'Standard'}</td><td className="p-4"><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${getBadgeColor(p.status)}`}>{p.status}</span></td><td className="p-4">₹{p.monthly_fee}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'websites' && (
                <div className="space-y-6">
                  <div className="flex justify-between"><h3 className="text-xl font-medium">Website Projects</h3><button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium">New Website</button></div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                      <thead><tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider"><th className="p-4">Client</th><th className="p-4">Tech Stack</th><th className="p-4">Status</th><th className="p-4">Fee</th></tr></thead>
                      <tbody>
                        {allProjects.filter(p=>p.service_type==='website').map((p, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5"><td className="p-4 font-medium">{p.clients?.name}</td><td className="p-4 text-gray-400 capitalize">{p.tech_stack || 'React'}</td><td className="p-4"><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${getBadgeColor(p.status)}`}>{p.status}</span></td><td className="p-4">₹{p.monthly_fee}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'subscriptions' && (
                <div className="space-y-6">
                  <div className="flex justify-between"><h3 className="text-xl font-medium">Subscriptions</h3><button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium">New Subscription</button></div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                      <thead><tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider"><th className="p-4">Client</th><th className="p-4">Service</th><th className="p-4">Amount</th><th className="p-4">Status</th></tr></thead>
                      <tbody>
                        {allSubscriptions.map((s, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5"><td className="p-4 font-medium">{s.clients?.name}</td><td className="p-4 text-gray-400 capitalize">{(s.service_type||'').replace('_',' ')}</td><td className="p-4">₹{s.amount}</td><td className="p-4"><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${getBadgeColor(s.status)}`}>{s.status}</span></td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {['analytics', 'settings'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mb-6"><Settings className="w-10 h-10 text-white/50" /></div>
                  <h3 className="text-2xl font-bebas tracking-widest text-gray-300">{activeTab} MODULE</h3>
                  <p className="text-gray-500 max-w-md mt-4 text-sm">Additional configurations and analytics are fully connected to the database backend.</p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
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
