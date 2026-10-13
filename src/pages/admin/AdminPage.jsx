import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminAnalysisDashboard } from '../../components/admin/AdminAnalysisDashboard';
import { AdminOverview } from '../../components/admin/AdminOverview';
import { AdminProducts } from '../../components/admin/AdminProducts';
import { AdminCategories } from '../../components/admin/AdminCategories';
import { AdminHomepage } from '../../components/admin/AdminHomepage';
import { AdminOrders } from '../../components/admin/AdminOrders';
import { AdminInventory } from '../../components/admin/AdminInventory';

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'inventory' && <AdminAnalysisDashboard setActiveTab={setActiveTab} />}
      {activeTab === 'overview' && <AdminOverview setActiveTab={setActiveTab} />}
      {activeTab === 'products' && <AdminProducts />}
      {activeTab === 'categories' && <AdminCategories />}
      {activeTab === 'homepage' && <AdminHomepage />}
      {activeTab === 'orders' && <AdminOrders />}
      {activeTab === 'raw-inventory' && <AdminInventory />}
    </AdminLayout>
  );
};
