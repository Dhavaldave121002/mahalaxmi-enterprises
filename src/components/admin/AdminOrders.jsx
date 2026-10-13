import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  Truck,
  MapPin,
  Calendar,
  X,
  Printer
} from 'lucide-react';

export const AdminOrders = () => {
  const { orders, updateOrderStatus, showToast } = useStore();

  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Processing', 'Delivered', 'Cancelled'
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null); // for inspection modal
  const [trackingInput, setTrackingInput] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    }
  };

  const handleSaveTracking = (orderId) => {
    if (!trackingInput.trim()) return;
    updateOrderStatus(orderId, selectedOrder.orderStatus, trackingInput.trim());
    setSelectedOrder({ ...selectedOrder, trackingNumber: trackingInput.trim() });
    setTrackingInput('');
    showToast('Tracking number assigned');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Customer & Wholesale Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review dispatches, assign consignment tracking numbers, and update delivery statuses.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            placeholder="Search by Order ID, customer, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-brand-indigo outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <span className="text-slate-500 font-medium">Status:</span>
          {['All', 'Processing', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                statusFilter === status
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer & City</th>
                <th className="py-3 px-4">Consignment Items</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No orders matching selected criteria
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  let badge = 'bg-amber-50 text-amber-800 border-amber-200';
                  if (order.orderStatus === 'Delivered') {
                    badge = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                  } else if (order.orderStatus === 'Cancelled') {
                    badge = 'bg-rose-50 text-rose-800 border-rose-200';
                  }

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-slate-900 block">{order.id}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(order.orderDate || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{order.customerName}</div>
                        <div className="text-[11px] text-slate-500">{order.shippingAddress?.city}, {order.shippingAddress?.state}</div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        {order.items?.length || 1} distinct item(s)
                      </td>

                      <td className="py-3.5 px-4 font-extrabold text-slate-900">
                        ₹{order.total}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {order.paymentMethod}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold border outline-none cursor-pointer ${badge}`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setTrackingInput(order.trackingNumber || '');
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-brand-indigo font-bold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 border-b border-slate-100 mb-4">
              <span className="text-xs font-mono font-bold text-brand-indigo block">
                #{selectedOrder.id}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Consignment Details & Customer Info
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              {/* Customer Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-900">{selectedOrder.customerName}</p>
                <p className="text-slate-600 mt-1">{selectedOrder.customerEmail} • {selectedOrder.customerPhone}</p>
                <p className="text-slate-600 mt-1">
                  {selectedOrder.shippingAddress?.addressLine}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
                </p>
              </div>

              {/* Tracking assign */}
              <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <label className="block font-bold text-slate-800">Assign Consignment Tracking Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. BLUEDART-COI-99120"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveTracking(selectedOrder.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-indigo text-white font-bold"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-bold text-slate-700 mb-2">Order Items ({selectedOrder.items?.length})</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between bg-white">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 border"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{item.productName}</p>
                          <p className="text-[11px] text-slate-500">Qty: {item.quantity} × ₹{item.price}</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="p-3 rounded-xl bg-slate-50 space-y-1.5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{selectedOrder.subtotal}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-₹{selectedOrder.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-slate-900 border-t border-slate-200 pt-1.5">
                  <span>Final Total</span>
                  <span className="text-brand-indigo">₹{selectedOrder.total}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
