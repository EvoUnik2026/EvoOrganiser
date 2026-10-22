import React, { useState } from 'react';
import { UserProfile, Language } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  language: Language;
  showToast: (msg: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  showToast,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateUser({
      ...user,
      name: name.trim() || user.name,
      email: email.trim() || user.email,
    });
    showToast('Profile updated');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#111319] rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200/80 dark:border-white/[0.08] animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">User Profile</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-indigo-500/30"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-white text-[12px]">
              <span className="material-symbols-outlined text-[13px] material-symbols-fill">
                verified
              </span>
            </span>
          </div>
          <span className="mt-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {user.isPro ? 'PRO ACCOUNT' : 'FREE TIER'}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs outline-none border border-slate-200 dark:border-slate-700 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs outline-none border border-slate-200 dark:border-slate-700 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
