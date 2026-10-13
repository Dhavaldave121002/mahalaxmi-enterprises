import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { Navbar } from '../../components/storefront/Navbar';
import { Footer } from '../../components/storefront/Footer';
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  MapPin,
  Calendar,
  Printer,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const OrderConfirmationPage = ({ orderId }) => {
  const { orders } = useStore();
  const { navigate } = useRouter();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div>
            <h2 className="text-xl font-bold">Order Not Found</h2>
            <Link to="/" className="mt-4 inline-block px-4 py-2 bg-brand-indigo text-white rounded-lg text-sm">
              Return to Storefront
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success Banner */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-premium p-8 sm:p-12 text-center space-y-4 mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
              Direct Mill Order Confirmed
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Thank You, {order.customerName}!
            </h1>

            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Your order has been queued directly for mill packing. An email confirmation and tax invoice have been generated for your records.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-800">
              <span>Order ID: #{order.id}</span>
              <span>•</span>
              <span className="text-emerald-700">{order.paymentStatus || 'Verified'}</span>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle p-6 sm:p-8 space-y-6">
            
            {/* Tracking Status Box */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-indigo text-white flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Consignment Tracking: {order.trackingNumber || 'Assigned at Dispatch'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Status: <span className="font-semibold text-brand-indigo">{order.orderStatus}</span> (Estimated arrival: 3-4 working days)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-300 text-xs font-semibold shadow-subtle self-start sm:self-auto"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>

            {/* Grid of Shipping and Payment Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-2">
                  <MapPin className="w-4 h-4 text-brand-indigo" />
                  <span>Delivery Address</span>
                </div>
                <p className="font-semibold text-slate-800">{order.customerName}</p>
                <p className="text-slate-600">{order.shippingAddress?.addressLine}</p>
                <p className="text-slate-600">
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                </p>
                <p className="text-slate-500 pt-1">Phone: {order.customerPhone}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-2">
                  <Calendar className="w-4 h-4 text-brand-indigo" />
                  <span>Order & Billing Summary</span>
                </div>
                <p className="text-slate-600">
                  Date: <span className="font-semibold text-slate-800">{new Date(order.orderDate || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </p>
                <p className="text-slate-600">
                  Payment Method: <span className="font-semibold text-slate-800">{order.paymentMethod}</span>
                </p>
                <p className="text-slate-600">
                  Invoice Amount: <span className="font-bold text-brand-indigo text-sm">₹{order.total}</span>
                </p>
                <p className="text-slate-500 pt-1">Tax Status: GST Paid</p>
              </div>
            </div>

            {/* Purchased Items List */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Items In This Consignment
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-4 bg-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{item.productName}</p>
                        <p className="text-[11px] text-slate-500">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Math summary */}
            <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">₹{order.subtotal}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount Applied</span>
                  <span>-₹{order.discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-brand-navy">
                <span>Total Paid</span>
                <span className="text-brand-indigo">₹{order.total}</span>
              </div>
            </div>

            {/* Return / Continue Shopping actions */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/collections/all"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-indigo hover:bg-brand-indigo-hover text-white font-bold rounded-xl text-xs shadow-md transition-all"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Back to Homepage
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
