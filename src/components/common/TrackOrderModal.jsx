import React, { useState } from 'react';
import { X, Search, Package, Truck, CheckCircle2, Clock, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const TrackOrderModal = ({ isOpen, onClose }) => {
  const [orderQuery, setOrderQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const MOCK_SHIPMENT = {
    orderId: 'MLX-98241',
    placedDate: 'Oct 11, 2026',
    estimatedDelivery: 'Oct 15, 2026',
    courier: 'Delhivery Air Surface',
    awbNumber: 'DLV9921820491',
    destination: 'Ahmedabad, Gujarat - 380015',
    items: [
      { name: 'Luxury Combed Cotton Bath Towel Set (Pack of 4)', qty: 2, gsm: '500 GSM' },
      { name: 'Floral Motif Double Bedsheet with Pillow Covers', qty: 1, tc: '300 TC' }
    ],
    timeline: [
      {
        title: 'Order Confirmed & Payment Verified',
        location: 'Mahalaxmi Mill Office, Surat',
        time: 'Oct 11, 2026 • 10:30 AM',
        status: 'done'
      },
      {
        title: 'Loom Inspection & 500 GSM Quality Audit Passed',
        location: 'Surat Textile Loom Facility',
        time: 'Oct 12, 2026 • 02:15 PM',
        status: 'done'
      },
      {
        title: 'Handed Over to Courier (In Transit)',
        location: 'Delhivery Surat Central Sorting Hub',
        time: 'Oct 13, 2026 • 08:45 AM',
        status: 'current'
      },
      {
        title: 'Out for Delivery to Customer Address',
        location: 'Ahmedabad Local Delivery Hub',
        time: 'Expected Oct 15, 2026',
        status: 'upcoming'
      },
      {
        title: 'Delivered',
        location: 'Recipient Doorstep',
        time: 'Expected Oct 15, 2026 (Evening)',
        status: 'upcoming'
      }
    ]
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orderQuery.trim()) {
      setError('Please enter a valid Order ID or Mobile Number');
      return;
    }
    setError('');
    // For demo, return mock shipment
    setSearchedOrder(MOCK_SHIPMENT);
  };

  const handleUseSample = () => {
    setOrderQuery('MLX-98241');
    setError('');
    setSearchedOrder(MOCK_SHIPMENT);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-semibold tracking-wide flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-400" />
              Loom Dispatch & Order Tracking
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Track live mill dispatch, quality inspection, and BlueDart / Delhivery delivery
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. MLX-98241) or Mobile Number"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-slate-900 shadow-2xs"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
            >
              Track Order
            </button>
          </form>

          {error && <p className="text-xs text-rose-600 mt-2">{error}</p>}

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <span>Try sample order:</span>
            <button
              type="button"
              onClick={handleUseSample}
              className="font-mono text-indigo-600 hover:text-indigo-800 underline font-medium"
            >
              MLX-98241
            </button>
          </div>
        </div>

        {/* Result Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {searchedOrder ? (
            <div className="space-y-6">
              {/* Order Quick Overview Card */}
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">Order Reference</span>
                  <h4 className="font-mono text-base font-bold text-slate-900">{searchedOrder.orderId}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Placed on {searchedOrder.placedDate}</p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Courier Partner</span>
                  <p className="text-sm font-medium text-slate-800">{searchedOrder.courier}</p>
                  <p className="font-mono text-xs text-indigo-700">AWB: {searchedOrder.awbNumber}</p>
                </div>
                <div className="bg-white px-3.5 py-2 rounded-lg border border-indigo-200/80 shadow-2xs text-center">
                  <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider block">Estimated Delivery</span>
                  <span className="text-sm font-bold text-slate-900">{searchedOrder.estimatedDelivery}</span>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                  Shipment Tracking Progress
                </h5>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {searchedOrder.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Checkpoint Dot */}
                      <div
                        className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                          step.status === 'done'
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : step.status === 'current'
                            ? 'bg-amber-500 border-amber-500 text-white animate-pulse'
                            : 'bg-white border-slate-300 text-slate-300'
                        }`}
                      >
                        {step.status === 'done' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {step.status === 'current' && <Clock className="w-3 h-3" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h6
                            className={`text-sm font-semibold ${
                              step.status === 'done'
                                ? 'text-slate-900'
                                : step.status === 'current'
                                ? 'text-amber-700'
                                : 'text-slate-400'
                            }`}
                          >
                            {step.title}
                          </h6>
                          <span className="text-xs text-slate-400">{step.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {step.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in Consignment */}
              <div className="border-t border-slate-100 pt-4">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Items in this Consignment
                </h5>
                <div className="divide-y divide-slate-100 text-xs">
                  {searchedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-slate-700">
                      <div>
                        <p className="font-medium text-slate-900">{item.name}</p>
                        <p className="text-[11px] text-slate-500">{item.gsm || item.tc}</p>
                      </div>
                      <span className="font-medium text-slate-900">Qty: {item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Tag */}
              <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 flex items-center gap-2 border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero-Tamper Poly-Woven Packaging verified by Mahalaxmi Mill QC Department.</span>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400">
              <Package className="w-12 h-12 mx-auto stroke-1 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-700">Enter your order ID above to trace live loom shipment</p>
              <p className="text-xs text-slate-400 mt-1">Orders are dispatched within 24 hours directly from our Surat loom facilities.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
