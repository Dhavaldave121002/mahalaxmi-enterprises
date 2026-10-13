import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../router/Router';
import { LotusLogo } from './Navbar';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, loginUser, logoutUser, showToast } = useStore();
  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState('signin'); // 'signin', 'register', 'b2b'
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    phone: '',
    email: '',
    accountType: 'Retail / Household Buyer',
    password: ''
  });
  const [b2bForm, setB2bForm] = useState({
    businessName: '',
    gstNumber: '',
    contactPerson: '',
    phone: ''
  });

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!loginForm.identifier) {
      showToast('Please enter your mobile number or email', 'error');
      return;
    }
    loginUser({
      name: loginForm.identifier.split('@')[0] || 'Dhaval Dave',
      email: loginForm.identifier.includes('@') ? loginForm.identifier : 'customer@mahalaxmi.com',
      phone: !loginForm.identifier.includes('@') ? loginForm.identifier : '+91 98400 12345',
      type: 'Retail Customer'
    });
    handleClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.phone) {
      showToast('Please fill in required fields', 'error');
      return;
    }
    loginUser({
      name: registerForm.name,
      email: registerForm.email || 'customer@mahalaxmi.com',
      phone: registerForm.phone,
      type: registerForm.accountType
    });
    showToast('Account created successfully!');
    handleClose();
  };

  const handleB2bSubmit = (e) => {
    e.preventDefault();
    if (!b2bForm.businessName || !b2bForm.phone) {
      showToast('Please enter Business Name & Phone', 'error');
      return;
    }
    loginUser({
      name: b2bForm.contactPerson || b2bForm.businessName,
      businessName: b2bForm.businessName,
      gst: b2bForm.gstNumber,
      phone: b2bForm.phone,
      type: 'Wholesale B2B Partner'
    });
    showToast('Wholesale Partner Account verified! Direct mill tier rates enabled.');
    handleClose();
  };

  const fillQuickDemo = () => {
    setLoginForm({
      identifier: 'customer@mahalaxmi.com',
      password: 'password123'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden z-10 animate-scale-in">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer z-20"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Brand Header ── */}
        <div className="pt-7 pb-4 px-6 text-center border-b border-slate-100 bg-gradient-to-b from-indigo-50/50 to-white">
          <div className="flex justify-center mb-2">
            <LotusLogo className="w-10 h-10" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            Mahalaxmi Enterprises
          </h3>
          <p className="text-[10px] font-bold tracking-[0.16em] text-indigo-600 uppercase mt-0.5">
            Direct Mill Rates &amp; Wholesale Essentials
          </p>

          {/* User state if logged in */}
          {user ? (
            <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-left flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{user.name}</p>
                <p className="text-[11px] text-slate-500">{user.email || user.phone} • {user.type}</p>
              </div>
              <button
                type="button"
                onClick={logoutUser}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-rose-600 hover:bg-rose-50"
              >
                Sign Out
              </button>
            </div>
          ) : (
            /* Tabs: Sign In / Register / Wholesale */
            <div className="mt-5 grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => setActiveTab('signin')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'signin'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('b2b')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'b2b'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                B2B Partner
              </button>
            </div>
          )}
        </div>

        {/* ── Form Content ── */}
        {!user && (
          <div className="p-6">
            
            {/* 1. SIGN IN FORM */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number or Email
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 98400 12345 or user@email.com"
                      value={loginForm.identifier}
                      onChange={e => setLoginForm({ ...loginForm, identifier: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to registered mobile'); }} className="text-[11px] font-semibold text-indigo-600 hover:underline">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-0" />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={fillQuickDemo}
                    className="text-[11px] text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    ⚡ Quick Demo Fill
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
                >
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* 2. REGISTER FORM */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={registerForm.name}
                    onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={registerForm.phone}
                      onChange={e => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="user@email.com"
                      value={registerForm.email}
                      onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Account Category</label>
                  <select
                    value={registerForm.accountType}
                    onChange={e => setRegisterForm({ ...registerForm, accountType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-indigo-600 outline-none cursor-pointer"
                  >
                    <option>Retail / Household Buyer</option>
                    <option>Boutique Homestay / Hotel</option>
                    <option>Retail Store Reseller</option>
                    <option>Hospital / Institution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Create Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={registerForm.password}
                    onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/25 transition-all cursor-pointer mt-2"
                >
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* 3. B2B WHOLESALE PARTNER */}
            {activeTab === 'b2b' && (
              <form onSubmit={handleB2bSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business / Firm Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Heritage Resort Pvt Ltd"
                    value={b2bForm.businessName}
                    onChange={e => setB2bForm({ ...b2bForm, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">GST Number (Optional)</label>
                    <input
                      type="text"
                      placeholder="27AAAAA0000A1Z5"
                      value={b2bForm.gstNumber}
                      onChange={e => setB2bForm({ ...b2bForm, gstNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 uppercase focus:border-indigo-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={b2bForm.phone}
                      onChange={e => setB2bForm({ ...b2bForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Authorized Contact Person</label>
                  <input
                    type="text"
                    placeholder="Manager / Proprietor Name"
                    value={b2bForm.contactPerson}
                    onChange={e => setB2bForm({ ...b2bForm, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer mt-2"
                >
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Access Direct Loom Rates</span>
                </button>
              </form>
            )}

          </div>
        )}

        {/* ── Footer Link to Admin Management Console ── */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Looking for Admin Console?</span>
          <button
            type="button"
            onClick={() => {
              handleClose();
              navigate('/admin');
            }}
            className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Open Admin Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
