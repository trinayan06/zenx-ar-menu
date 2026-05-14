import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Camera, Cuboid, Monitor, 
  CreditCard, BarChart3, Settings, LogOut, Search, Plus, 
  MoreVertical, Edit2, Trash2, Eye, ShieldAlert,
  Menu, X, Lock
} from 'lucide-react';

const supabase = createClient(
  'https://qjykkdmujwlkpcdyzeqa.supabase.co',
  'sb_publishable_rUybvqyug25z0OIXaCs25Q_cTmKdC8h'
);

const SuperAdminDashboard = () => {
  const [session, setSession] = useState(null);
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

  // Modals
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isNewInstaOpen, setIsNewInstaOpen] = useState(false);
  
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
    return () => authListener.subscription.unsubscribe();
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
    if (error) setLoginError(error.message);
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

  // UI Helpers
  const getBadgeColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'active' || s === 'completed' || s === 'paid') return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (s === 'in_progress' || s === 'pending') return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    if (s === 'inactive' || s === 'paused') return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    return 'bg-blue-500/10 text-blue-400 border-blue-500/20'; // Default to accent
  };

  if (loading) return <div className="min-h-screen bg-[#000000] flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;

  if (!session) {
    return (
      <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-4 relative overflow-hidden font-dm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <ShieldAlert className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bebas tracking-wider text-white">SYSTEM ACCESS</h1>
            <p className="text-gray-400 text-sm mt-2">Authorized Personnel Only</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                required
              />
            </div>
            {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full py-4 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/> : <><Lock className="w-5 h-5"/> INITIALIZE_</>}
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
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const totalRevenue = allSubscriptions.filter(s => s.status === 'paid' || s.status === 'active').reduce((sum, s) => sum + (s.amount || 0), 0);
  const activeProjectsCount = allProjects.filter(p => p.status !== 'completed').length;

  return (
    <div className="min-h-screen bg-[#000000] text-white font-dm selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0b0b0b]/90 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <span className="font-bebas text-3xl tracking-widest text-white"><span className="text-blue-500">ZEN</span>_X</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                  isActive 
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm tracking-wide">Disconnect</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-20 bg-[#0b0b0b]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-medium capitalize tracking-wide text-gray-200">{activeTab.replace('-', ' ')}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Command menu..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500/50 w-64 text-white"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              TX
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 lg:p-10 flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* --- DASHBOARD TAB --- */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Total MRR', value: `₹${totalRevenue.toLocaleString()}`, color: 'text-blue-400' },
                      { label: 'Active Projects', value: activeProjectsCount, color: 'text-white' },
                      { label: 'Total Clients', value: allClients.length, color: 'text-white' },
                      { label: 'New Signups', value: '+3 This Week', color: 'text-green-400' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:border-blue-500/30 transition-colors group">
                        <p className="text-gray-400 text-xs font-medium tracking-wider uppercase mb-2">{stat.label}</p>
                        <h3 className={`text-3xl font-bebas tracking-wider ${stat.color} group-hover:scale-105 transition-transform origin-left`}>{stat.value}</h3>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Active Projects */}
                    <div className="lg:col-span-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-medium text-lg">Active Projects</h3>
                        <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider">
                              <th className="pb-3 font-medium">Client</th>
                              <th className="pb-3 font-medium">Service</th>
                              <th className="pb-3 font-medium">Status</th>
                              <th className="pb-3 font-medium">Fee</th>
                            </tr>
                          </thead>
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

                    {/* Quick Actions */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6">
                      <h3 className="font-medium text-lg mb-6">Command Center</h3>
                      <div className="space-y-3">
                        <button className="w-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-xl py-3 px-4 flex items-center justify-between transition-all group">
                          <span className="font-medium text-sm">New Client</span>
                          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="w-full bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 rounded-xl py-3 px-4 flex items-center justify-between transition-all group">
                          <span className="font-medium text-sm">Instagram Project</span>
                          <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="w-full bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 rounded-xl py-3 px-4 flex items-center justify-between transition-all group">
                          <span className="font-medium text-sm">AR Menu Project</span>
                          <Cuboid className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- CLIENTS TAB --- */}
              {activeTab === 'clients' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative w-full sm:w-96">
                      <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input 
                        type="text" 
                        placeholder="Search clients..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 text-white"
                      />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] whitespace-nowrap flex items-center justify-center gap-2 text-sm">
                      <Plus className="w-4 h-4"/> Add Client
                    </button>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                            <th className="p-4 font-medium">Client Info</th>
                            <th className="p-4 font-medium">Type</th>
                            <th className="p-4 font-medium">Contact</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allClients.filter(c => c.name?.toLowerCase().includes(searchQuery.toLowerCase())).map((c, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                              <td className="p-4">
                                <div className="font-medium">{c.name}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{c.city || 'No City'}</div>
                              </td>
                              <td className="p-4 text-sm text-gray-400 capitalize">{c.business_type}</td>
                              <td className="p-4">
                                <div className="text-sm">{c.phone || '—'}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{c.email || '—'}</div>
                              </td>
                              <td className="p-4">
                                <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${getBadgeColor(c.status)}`}>{c.status}</span>
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-colors"><Edit2 className="w-4 h-4"/></button>
                                  <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"><Trash2 className="w-4 h-4"/></button>
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

              {/* Placeholder for other tabs to keep component size manageable */}
              {['instagram', 'armenu', 'websites', 'subscriptions', 'analytics', 'settings'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-blue-500/5 rounded-full border border-blue-500/10 flex items-center justify-center mb-6">
                    <Cuboid className="w-10 h-10 text-blue-500/50" />
                  </div>
                  <h3 className="text-2xl font-bebas tracking-widest text-gray-300">{activeTab} MODULE</h3>
                  <p className="text-gray-500 max-w-md mt-4 text-sm">
                    This module is active and connected to Supabase. Records: 
                    {activeTab === 'instagram' ? ` ${allInstaProjects.length}` : ''}
                    {activeTab === 'subscriptions' ? ` ${allSubscriptions.length}` : ''}
                    {activeTab === 'armenu' || activeTab === 'websites' ? ` ${allProjects.filter(p=>p.service_type===(activeTab==='armenu'?'ar_menu':'website')).length}` : ''}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-full border backdrop-blur-xl font-medium text-sm shadow-2xl flex items-center gap-3 ${
              toast.type === 'error' 
                ? 'bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`} />
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuperAdminDashboard;
