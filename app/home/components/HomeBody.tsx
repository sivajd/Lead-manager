'use client';
import { useEffect, useState } from 'react';
import LeadFormModal from '../components/LeadFormModal';
import LeadTable from '../components/LeadTable';
import SidebarDrawer from '../components/SidebarDrawer';

type Lead = {
  id: number;
  name: string;
  phone: string;
  status: 'New' | 'Followup' | 'Closed';
};

export default function HomeBody() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchLeads = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId || isNaN(parseInt(userId))) return;

    const res = await fetch('/api/leads/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: parseInt(userId) }),
    });

    const data = await res.json();
    setLeads(data.leads || []);
  };


  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-gray-800">Lead Manager</h1>
        <SidebarDrawer
          onLeadClick={() => setShowModal(true)}
          onLogout={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
        />

      </nav>

      <main className="p-6">
        <LeadTable leads={leads} setLeads={setLeads} />
      </main>

      {showModal && (
        <LeadFormModal
          onClose={() => setShowModal(false)}
          onAdded={() => {
            fetchLeads();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
