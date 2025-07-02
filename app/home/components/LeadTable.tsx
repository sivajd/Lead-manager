'use client';
import { useState } from 'react';

type Lead = {
  id: number;
  name: string;
  phone: string;
  status: 'New' | 'Followup' | 'Closed';
};

type Props = {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
};

export default function LeadTable({ leads, setLeads }: Props) {
  const handleStatusChange = async (leadId: number, newStatus: Lead['status']) => {
    const updated = leads.map((lead) =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    setLeads(updated);

    const res = await fetch('/api/leads/updateStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, status: newStatus }),
    });

    if (!res.ok) {
      alert('Failed to update status');
    }
  };

  if (!leads || leads.length === 0) {
    return <div className="text-center text-gray-500">No leads found.</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto border border-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-gray-700 font-medium">Name</th>
            <th className="px-6 py-3 text-gray-700 font-medium">Number</th>
            <th className="px-6 py-3 text-gray-700 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map((lead) => {
            const rowBg =
              lead.status === 'New'
                ? 'bg-green-100'
                : lead.status === 'Followup'
                ? 'bg-yellow-100'
                : 'bg-red-100';

            return (
              <tr key={lead.id} className={`${rowBg} hover:bg-opacity-80`}>
                <td className="px-6 py-4 text-gray-900">{lead.name}</td>
                <td className="px-6 py-4 text-gray-900">{lead.phone}</td>
                <td className="px-6 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleStatusChange(lead.id, e.target.value as Lead['status'])
                    }
                    className="px-3 py-1 border rounded text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                  >
                    <option value="New">New</option>
                    <option value="Followup">Followup</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
