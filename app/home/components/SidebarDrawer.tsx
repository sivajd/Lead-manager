'use client';

import { useState } from 'react';
import { Menu, LogOut, PlusCircle } from 'lucide-react';

type SidebarDrawerProps = {
  onLeadClick: () => void;
  onLogout: () => void;
};

export default function SidebarDrawer({ onLeadClick, onLogout }: SidebarDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger always visible */}
      <button
        onClick={() => setOpen(true)}
        className="text-gray-800 p-2 rounded hover:bg-gray-100 focus:outline-none"
      >
        <Menu size={28} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-90 backdrop-blur-md z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer from left */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        <ul className="px-4 py-6 space-y-4">
          <li>
            <button
              onClick={() => {
                onLeadClick();
                setOpen(false);
              }}
              className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
            >
              <PlusCircle size={20} />
              Add Lead
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                onLogout();
                setOpen(false);
              }}
              className="flex items-center gap-3 text-red-600 hover:text-red-800"
            >
              <LogOut size={20} />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
