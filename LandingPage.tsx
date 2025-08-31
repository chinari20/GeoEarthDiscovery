
import React, { useState, useEffect } from 'react';
import AuthModal from '../components/AuthModal';

interface LandingPageProps {
  onNavigateToDashboard: () => void;
}

const Star: React.FC = () => {
  const style = {
    position: 'absolute' as 'absolute',
    backgroundColor: 'white',
    borderRadius: '50%',
    opacity: (Math.random() * 0.8).toFixed(2),
    width: `${Math.random() * 2 + 1}px`,
    height: `${Math.random() * 2 + 1}px`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    filter: 'drop-shadow(0 0 1px white)',
    animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
  };
  return <div style={style}></div>;
};

const StarryBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      {Array.from({ length: 150 }).map((_, i) => <Star key={i} />)}
    </div>
  );
};


const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToDashboard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
        setIsModalOpen(false);
       }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-radial-gradient-bottom from-[#000428] to-[#004e92] text-[#cfdcff] overflow-hidden">
      <StarryBackground />
      <div className="relative z-10 h-screen flex flex-col justify-center items-center text-center p-5">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wider text-shadow-glow">GeoDiscovery</h1>
        <p className="text-lg md:text-xl mt-3 mb-10 text-[#a0bff5cc]">
          Access NASA's vast Earth science datasets with intelligent recommendations
        </p>
        <button
          id="get-started"
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-[#1e90ff] to-[#00bfff] text-white text-lg font-semibold py-4 px-10 rounded-lg shadow-lg transition-all duration-400 ease-in-out hover:shadow-glow-pulse focus:outline-none focus:ring-4 focus:ring-blue-400"
        >
          Get Started
        </button>
      </div>
      {isModalOpen && (
        <AuthModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={onNavigateToDashboard}
        />
      )}
    </div>
  );
};

export default LandingPage;

