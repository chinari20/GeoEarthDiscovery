
import React, { useState, FormEvent } from 'react';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

type Step = 'role' | 'auth';
type AuthTab = 'login' | 'signup';

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<'Student' | 'Researcher' | null>(null);
  const [activeTab, setActiveTab] = useState<AuthTab>('login');

  const handleRoleSelect = (selectedRole: 'Student' | 'Researcher') => {
    setRole(selectedRole);
    setStep('auth');
  };

  const handleBackToRole = () => {
    setRole(null);
    setStep('role');
  };
  
  // Simulate successful auth
  const handleAuthSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSuccess();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-[#0b1a36] text-[#cfdcff] rounded-lg w-[550px] max-w-[95vw] p-12 shadow-2xl shadow-blue-500/20 border border-blue-500/20" role="dialog" aria-modal="true">
        <button onClick={onClose} className="absolute top-4 right-5 text-4xl text-[#a0bff5cc] hover:text-[#1e90ff] transition-colors">&times;</button>
        
        <div className="flex justify-center gap-4 mb-8">
          <span className={`w-4 h-4 rounded-full transition-all ${step === 'role' ? 'bg-[#1e90ff] shadow-glow-pulse' : 'bg-[#1e90ff44]'}`}></span>
          <span className={`w-4 h-4 rounded-full transition-all ${step === 'auth' ? 'bg-[#1e90ff] shadow-glow-pulse' : 'bg-[#1e90ff44]'}`}></span>
        </div>

        {step === 'role' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#1e90ff] mb-6">Select your role to continue</h2>
            <div className="flex flex-col gap-5">
              <button onClick={() => handleRoleSelect('Student')} className="bg-[#1e90ff88] text-white text-xl py-4 rounded-lg shadow-md hover:bg-[#1e90ffcc] hover:scale-105 transition-all focus:outline-none focus:ring-2 ring-offset-2 ring-offset-[#0b1a36] ring-blue-400">
                I am a Student
              </button>
              <button onClick={() => handleRoleSelect('Researcher')} className="bg-[#1e90ff88] text-white text-xl py-4 rounded-lg shadow-md hover:bg-[#1e90ffcc] hover:scale-105 transition-all focus:outline-none focus:ring-2 ring-offset-2 ring-offset-[#0b1a36] ring-blue-400">
                I am a Researcher
              </button>
            </div>
          </div>
        )}

        {step === 'auth' && (
          <div>
            <p className="text-center text-xl mb-6 leading-relaxed">
              Welcome, {role}!<br />Access NASA's Earth science datasets.
            </p>
            <div className="flex justify-center gap-6 mb-6 border-b border-blue-500/20">
              <button onClick={() => setActiveTab('login')} className={`pb-2 font-semibold transition-colors ${activeTab === 'login' ? 'text-[#1e90ff] border-b-2 border-[#1e90ff]' : 'text-[#8fb0ffcc]'}`}>Login</button>
              <button onClick={() => setActiveTab('signup')} className={`pb-2 font-semibold transition-colors ${activeTab === 'signup' ? 'text-[#1e90ff] border-b-2 border-[#1e90ff]' : 'text-[#8fb0ffcc]'}`}>Sign Up</button>
            </div>
            
            {/* Login Form */}
            <form onSubmit={handleAuthSubmit} className={`${activeTab === 'login' ? 'flex' : 'hidden'} flex-col gap-4`}>
              <label className="text-left" htmlFor="login-email">Email</label>
              <input type="email" id="login-email" required className="bg-gray-800 text-white p-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#1e90ff]" />
              <label className="text-left" htmlFor="login-password">Password</label>
              <input type="password" id="login-password" required className="bg-gray-800 text-white p-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#1e90ff]" />
              <button type="submit" className="bg-[#1e90ff] text-white py-4 mt-2 rounded-lg text-lg font-bold hover:bg-[#0d70e0] transition-colors shadow-md hover:shadow-lg">Login</button>
            </form>

            {/* Signup Form */}
            <form onSubmit={handleAuthSubmit} className={`${activeTab === 'signup' ? 'flex' : 'hidden'} flex-col gap-4`}>
              <label className="text-left" htmlFor="signup-name">Full Name</label>
              <input type="text" id="signup-name" required className="bg-gray-800 text-white p-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#1e90ff]" />
              <label className="text-left" htmlFor="signup-email">Email</label>
              <input type="email" id="signup-email" required className="bg-gray-800 text-white p-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#1e90ff]" />
              <label className="text-left" htmlFor="signup-password">Password</label>
              <input type="password" id="signup-password" required className="bg-gray-800 text-white p-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#1e90ff]" />
              <button type="submit" className="bg-[#1e90ff] text-white py-4 mt-2 rounded-lg text-lg font-bold hover:bg-[#0d70e0] transition-colors shadow-md hover:shadow-lg">Sign Up</button>
            </form>
            
            <button onClick={handleBackToRole} className="w-full mt-4 text-[#a0bff5] hover:text-[#1e90ff] underline transition-colors">
              &larr; Back to Role Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
