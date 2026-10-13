import React, { useState } from 'react';
import { useRouter, Link } from '../../router/Router';
import { useStore } from '../../context/StoreContext';
import { Navbar, LotusLogo } from '../../components/storefront/Navbar';
import { AnnouncementBar } from '../../components/storefront/AnnouncementBar';
import { Footer } from '../../components/storefront/Footer';
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Phone,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const LoginPage = () => {
  const { user, loginUser, logoutUser, showToast } = useStore();
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

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!loginForm.identifier) {
      showToast('Please enter your mobile number or email', 'error');
      return;
    }

    const id = loginForm.identifier.trim().toLowerCase();
    const pwd = loginForm.password.trim();

    // 👑 Direct Admin Check
    if (
      (id === 'admin@mahalaxmi.com' || id === 'admin' || id === 'mahalaxmi') &&
      (pwd === 'admin123' || pwd === 'admin' || pwd === 'mahalaxmi123' || pwd === 'password123')
    ) {
      loginUser({
        name: 'Mahalaxmi Administrator',
        email: 'admin@mahalaxmi.com',
        role: 'admin',
        type: 'Store Administrator'
      });
      showToast('👑 Welcome Administrator! Redirecting to Admin Console...');
      navigate('/admin');
      return;
    }

    // Regular Customer Login
    loginUser({
      name: loginForm.identifier.split('@')[0] || 'Dhaval Dave',
      email: loginForm.identifier.includes('@') ? loginForm.identifier : 'customer@mahalaxmi.com',
      phone: !loginForm.identifier.includes('@') ? loginForm.identifier : '+91 98400 12345',
      type: 'Retail Customer'
    });
    showToast('Signed in successfully!');
    navigate('/');
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
    navigate('/');
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
    navigate('/');
  };

  const fillQuickDemo = () => {
    setLoginForm({
      identifier: 'customer@mahalaxmi.com',
      password: 'password123'
    });
  };

  const fillAdminDemo = () => {
    setLoginForm({
      identifier: 'admin@mahalaxmi.com',
      password: 'admin123'
    });
    showToast('Admin credentials filled! Click Sign In to open Admin Console.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden">
        {/* Subtle ambient brand glow matching website theme */}
        <div className="absolute top-1/4 left-1/4 -z-10 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 -z-10 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

        {/* Central Split-Screen Card */}
        <div className="w-full max-w-5xl bg-white rounded-3xl sm:rounded-[32px] overflow-hidden shadow-xl border border-slate-200/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">

            {/* ── LEFT COLUMN (7 cols): Editorial Typography & Theme-Matched Login Form ── */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between bg-white">
              
              <div>
                {/* Brand Header with Golden Lotus & Indigo Subtitle */}
                <div className="flex items-center gap-3 mb-8">
                  <LotusLogo className="w-10 h-10" />
                  <div>
                    <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight block">
                      Mahalaxmi Enterprises
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.16em] text-indigo-600 uppercase block mt-0.5">
                      DIRECT MILL RATES &amp; WHOLESALE ESSENTIALS
                    </span>
                  </div>
                </div>

                {/* Big Editorial Headline */}
                <div className="mb-4">
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-slate-900 tracking-tight leading-[1.12]">
                    ELEVATE YOUR REST.<br />
                    SIMPLIFY YOUR<br />
                    SANCTUARY.
                  </h1>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed mb-6">
                  Discover thoughtfully selected textiles, cotton essentials and household products directly from the mill.
                </p>

                {/* Logged in state view */}
                {user ? (
                  <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 shadow-2xs space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        {user.name?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email || user.phone} • {user.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs"
                      >
                        Go to Storefront
                      </button>
                      <button
                        type="button"
                        onClick={logoutUser}
                        className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Theme-Matched Tab Switcher Pills */}
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600 mb-6 max-w-md border border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => setActiveTab('signin')}
                        className={`py-2 rounded-full transition-all cursor-pointer ${
                          activeTab === 'signin'
                            ? 'bg-indigo-600 text-white font-bold shadow-sm'
                            : 'hover:text-slate-900'
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('register')}
                        className={`py-2 rounded-full transition-all cursor-pointer ${
                          activeTab === 'register'
                            ? 'bg-indigo-600 text-white font-bold shadow-sm'
                            : 'hover:text-slate-900'
                        }`}
                      >
                        Register
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('b2b')}
                        className={`py-2 rounded-full transition-all cursor-pointer ${
                          activeTab === 'b2b'
                            ? 'bg-indigo-600 text-white font-bold shadow-sm'
                            : 'hover:text-slate-900'
                        }`}
                      >
                        B2B Partner
                      </button>
                    </div>

                    {/* 1. SIGN IN FORM */}
                    {activeTab === 'signin' && (
                      <form onSubmit={handleSignIn} className="space-y-4 max-w-md">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Mobile Number or Email
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. 98400 12345 or user@email.com"
                              value={loginForm.identifier}
                              onChange={e => setLoginForm({ ...loginForm, identifier: e.target.value })}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-colors shadow-2xs"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                              Password
                            </label>
                            <a
                              href="#forgot"
                              onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to registered contact'); }}
                              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
                            >
                              Forgot Password?
                            </a>
                          </div>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              required
                              placeholder="••••••••"
                              value={loginForm.password}
                              onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-colors shadow-2xs"
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
                            className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold"
                          >
                            ⚡ Quick Demo Fill
                          </button>
                        </div>

                        {/* Theme Matched Royal Indigo Pill Button */}
                        <button
                          type="submit"
                          className="w-full py-3.5 px-6 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm tracking-widest uppercase shadow-md shadow-indigo-600/30 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-2"
                        >
                          <span>Sign In to Account</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        {/* Admin Credentials Helper Card */}
                        <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-indigo-950 flex items-center gap-1">
                              <span>👑 Admin Credentials:</span>
                            </p>
                            <p className="text-[11px] text-slate-600 mt-0.5 font-mono">
                              ID: <span className="font-bold text-indigo-900">admin@mahalaxmi.com</span> • Pass: <span className="font-bold text-indigo-900">admin123</span>
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={fillAdminDemo}
                            className="px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold text-[11px] shadow-2xs transition-all cursor-pointer"
                          >
                            ⚡ Fill Admin
                          </button>
                        </div>
                      </form>
                    )}

                    {/* 2. REGISTER FORM */}
                    {activeTab === 'register' && (
                      <form onSubmit={handleRegister} className="space-y-3.5 max-w-md">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh Patel"
                            value={registerForm.name}
                            onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+91 98XXX XXXXX"
                              value={registerForm.phone}
                              onChange={e => setRegisterForm({ ...registerForm, phone: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                              Email (Optional)
                            </label>
                            <input
                              type="email"
                              placeholder="user@email.com"
                              value={registerForm.email}
                              onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Account Category
                          </label>
                          <select
                            value={registerForm.accountType}
                            onChange={e => setRegisterForm({ ...registerForm, accountType: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:border-indigo-600 outline-none cursor-pointer"
                          >
                            <option>Retail / Household Buyer</option>
                            <option>Boutique Homestay / Hotel</option>
                            <option>Retail Store Reseller</option>
                            <option>Hospital / Institution</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Create Password *
                          </label>
                          <input
                            type="password"
                            required
                            placeholder="At least 6 characters"
                            value={registerForm.password}
                            onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 px-6 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm tracking-widest uppercase shadow-md shadow-indigo-600/30 transition-all cursor-pointer mt-2"
                        >
                          <span>Create Free Account</span>
                        </button>
                      </form>
                    )}

                    {/* 3. B2B WHOLESALE PARTNER */}
                    {activeTab === 'b2b' && (
                      <form onSubmit={handleB2bSubmit} className="space-y-3.5 max-w-md">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Business / Firm Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Royal Heritage Resort Pvt Ltd"
                            value={b2bForm.businessName}
                            onChange={e => setB2bForm({ ...b2bForm, businessName: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                              GST Number (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="27AAAAA0000A1Z5"
                              value={b2bForm.gstNumber}
                              onChange={e => setB2bForm({ ...b2bForm, gstNumber: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 uppercase focus:border-indigo-600 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                              Contact Phone *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+91 98XXX XXXXX"
                              value={b2bForm.phone}
                              onChange={e => setB2bForm({ ...b2bForm, phone: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Authorized Contact Person
                          </label>
                          <input
                            type="text"
                            placeholder="Manager / Proprietor Name"
                            value={b2bForm.contactPerson}
                            onChange={e => setB2bForm({ ...b2bForm, contactPerson: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-widest uppercase shadow-md transition-all cursor-pointer mt-2 flex items-center justify-center gap-2"
                        >
                          <Building2 className="w-4 h-4 text-amber-400" />
                          <span>Access Direct Loom Rates</span>
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Guarantee Line */}
              <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-medium text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-700">SUSTAINABLY SOURCED</span>
                  <span>|</span>
                  <span>FREE SHIPPING &amp; DISPATCH</span>
                </div>
                <Link to="/admin" className="text-indigo-600 hover:text-indigo-800 font-bold">
                  Admin Portal &rarr;
                </Link>
              </div>

            </div>

            {/* ── RIGHT COLUMN (5 cols): Serene Luxury Linen Photography Frame ── */}
            <div className="lg:col-span-5 relative overflow-hidden bg-slate-100 min-h-[320px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=85"
                alt="Serene bedroom sanctuary with luxury linen bedding"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
