import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { Navbar } from '../../components/storefront/Navbar';
import { Footer } from '../../components/storefront/Footer';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  QrCode,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  Truck,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const CheckoutPage = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    getEffectiveUnitPrice,
    createOrder,
    showToast
  } = useStore();

  const { navigate } = useRouter();

  // Address State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    notes: ''
  });

  // Payment State: 'COD' or 'UPI'
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold">Your Cart is Currently Empty</h2>
            <p className="text-xs text-slate-500">
              Please select products from our direct mill collections before navigating to checkout.
            </p>
            <Link
              to="/collections/all"
              className="inline-block px-5 py-2.5 bg-brand-indigo text-white text-xs font-bold rounded-xl"
            >
              Browse Collections
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid 10-digit phone number is required';
    if (!formData.addressLine.trim()) errs.addressLine = 'Delivery address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errs.pincode = 'Valid 6-digit PIN code required';
    if (paymentMethod === 'UPI' && !upiId.trim() && !upiId.includes('@')) {
      errs.upiId = 'Please enter a valid UPI ID (e.g., username@okhdfcbank or @upi)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors in the checkout form', 'error');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customerName: formData.fullName,
      customerEmail: formData.email || `${formData.phone}@customer.mahalaxmi.in`,
      customerPhone: formData.phone,
      shippingAddress: {
        addressLine: formData.addressLine,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        notes: formData.notes
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: getEffectiveUnitPrice(item.product, item.quantity),
        image: item.product.images[0]
      })),
      subtotal: cartSubtotal,
      discountAmount: cartDiscount,
      shippingFee: cartShipping,
      total: cartTotal,
      paymentMethod: paymentMethod,
      upiId: paymentMethod === 'UPI' ? upiId : null,
      couponApplied: appliedCoupon ? appliedCoupon.code : null
    };

    setTimeout(() => {
      const created = createOrder(orderPayload);
      setIsSubmitting(false);
      navigate(`/order-confirmation/${created.id}`);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-brand-indigo transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-semibold">Secure Checkout</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Delivery Details & Payment Method (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Delivery Address Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-brand-indigo flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Delivery Address</h2>
                      <p className="text-xs text-slate-500">Doorstep delivery across all Indian postal zones</p>
                    </div>
                  </div>
                  <Truck className="w-5 h-5 text-slate-400" />
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Receiver's Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'} focus:border-brand-indigo outline-none text-xs`}
                    />
                    {errors.fullName && <p className="text-rose-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'} focus:border-brand-indigo outline-none text-xs`}
                      />
                      {errors.phone && <p className="text-rose-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Email Address (for Tax Invoice)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. name@company.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Street Address & Building / Unit *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Flat/House number, Building name, Street, Landmark"
                      value={formData.addressLine}
                      onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl border ${errors.addressLine ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'} focus:border-brand-indigo outline-none text-xs`}
                    />
                    {errors.addressLine && <p className="text-rose-600 mt-1">{errors.addressLine}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">City *</label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai, Solapur"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.city ? 'border-rose-400' : 'border-slate-300'} focus:border-brand-indigo outline-none text-xs`}
                      />
                      {errors.city && <p className="text-rose-600 mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">State *</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs bg-white"
                      >
                        <option>Maharashtra</option>
                        <option>Tamil Nadu</option>
                        <option>Gujarat</option>
                        <option>Karnataka</option>
                        <option>Delhi NCR</option>
                        <option>West Bengal</option>
                        <option>Telangana</option>
                        <option>Rajasthan</option>
                        <option>Other State</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Pincode *</label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="6 digits"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.pincode ? 'border-rose-400' : 'border-slate-300'} focus:border-brand-indigo outline-none text-xs`}
                      />
                      {errors.pincode && <p className="text-rose-600 mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-brand-indigo flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Payment Option</h2>
                      <p className="text-xs text-slate-500">Configured secure payment processing</p>
                    </div>
                  </div>
                  <Lock className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* UPI Option */}
                  <div
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'UPI'
                        ? 'border-brand-indigo bg-indigo-50/40 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-brand-indigo" />
                        <span className="text-xs font-bold text-slate-900">Instant UPI Payment</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'UPI' ? 'border-brand-indigo bg-brand-indigo' : 'border-slate-300'}`}>
                        {paymentMethod === 'UPI' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      GPay, PhonePe, Paytm, or BHIM. Zero processing fee.
                    </p>
                  </div>

                  {/* Cash on Delivery (COD) Option */}
                  <div
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'COD'
                        ? 'border-brand-indigo bg-indigo-50/40 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-900">Cash on Delivery (COD)</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'COD' ? 'border-brand-indigo bg-brand-indigo' : 'border-slate-300'}`}>
                        {paymentMethod === 'COD' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Pay cash or UPI upon package inspection at doorstep.
                    </p>
                  </div>
                </div>

                {/* Sub-form for UPI ID if UPI is active */}
                {paymentMethod === 'UPI' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">
                      Enter UPI ID (Virtual Payment Address)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. mobile@okaxis or yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className={`w-full px-3.5 py-2 text-xs rounded-lg border ${errors.upiId ? 'border-rose-400' : 'border-slate-300'} bg-white focus:border-brand-indigo outline-none`}
                    />
                    {errors.upiId && <p className="text-rose-600 text-[11px]">{errors.upiId}</p>}
                    <p className="text-[11px] text-slate-400">
                      We initiate a payment prompt directly to your UPI banking app upon placing order.
                    </p>
                  </div>
                )}

              </div>

            </div>

            {/* Right Column: Order Review Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle space-y-5 sticky top-28">
                
                <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                  Order Review ({cart.length} distinct items)
                </h3>

                {/* Item List */}
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 pr-1 space-y-3">
                  {cart.map((item) => {
                    const itemUnit = getEffectiveUnitPrice(item.product, item.quantity);
                    return (
                      <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-14 h-14 rounded-lg object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Qty: <span className="font-semibold text-slate-800">{item.quantity}</span> × ₹{itemUnit}
                          </p>
                        </div>
                        <span className="text-xs font-extrabold text-slate-900">
                          ₹{itemUnit * item.quantity}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-slate-200 pt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">₹{cartSubtotal}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount ({appliedCoupon?.code})</span>
                      <span>-₹{cartDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Shipping & Handling</span>
                    <span>
                      {cartShipping === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        <span className="font-semibold text-slate-900">₹{cartShipping}</span>
                      )}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-extrabold text-brand-navy">
                    <span>Final Amount</span>
                    <span className="text-lg text-brand-indigo">₹{cartTotal}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-indigo hover:bg-brand-indigo-hover text-white font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition-all duration-200 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Validating Order Details...</span>
                  ) : (
                    <>
                      <span>Place Confirmed Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-[11px] text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Direct Mill Invoice with HSN code issued upon confirmation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-indigo flex-shrink-0" />
                    <span>7-Day standard inspection warranty on all weaves</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
