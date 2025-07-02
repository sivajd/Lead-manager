'use client';
import { useState } from 'react';

type LeadFormModalProps = {
  onClose: () => void;
  onAdded: () => void;
};

export default function LeadFormModal({ onClose, onAdded }: LeadFormModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('New');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const userId = localStorage.getItem('userId');

  if (!userId || isNaN(parseInt(userId))) {
    alert("User not logged in");
    return;
  }

  const res = await fetch('/api/leads/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      phone,
      status,
      userId: parseInt(userId), // ✅ Convert string to number
    }),
  });

  const data = await res.json();

  if (res.ok) {
    onAdded(); // refresh lead list
  } else {
    alert('Failed to add lead: ' + data.error);
  }
};


  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-90 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Add New Lead</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Lead Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option>New</option>
            <option>Followup</option>
            <option>Closed</option>
          </select>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
