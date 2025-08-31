
import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import DatasetsPage from './pages/DatasetsPage';
import VisualizerPage from './pages/VisualizerPage';
import { EarthEventCategory } from './types';

type Page = 'landing' | 'dashboard' | 'datasets' | 'visualizer';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('landing');
  const [category, setCategory] = useState<EarthEventCategory | null>(null);

  const navigateToDashboard = () => setPage('dashboard');
  
  const navigateToDatasets = (cat: EarthEventCategory) => {
    setCategory(cat);
    setPage('datasets');
  };

  const navigateToVisualizer = () => setPage('visualizer');
  
  const navigateHome = () => {
    setCategory(null);
    setPage('landing');
  }

  const renderPage = () => {
    switch (page) {
      case 'landing':
        return <LandingPage onNavigateToDashboard={navigateToDashboard} />;
      case 'dashboard':
        return <DashboardPage onSelectCategory={navigateToDatasets} onNavigateToVisualizer={navigateToVisualizer} onNavigateHome={navigateHome} />;
      case 'datasets':
        return category ? <DatasetsPage category={category} onBack={() => setPage('dashboard')} /> : <DashboardPage onSelectCategory={navigateToDatasets} onNavigateToVisualizer={navigateToVisualizer} onNavigateHome={navigateHome} />;
      case 'visualizer':
        return <VisualizerPage onBack={() => setPage('dashboard')} />;
      default:
        return <LandingPage onNavigateToDashboard={navigateToDashboard} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {renderPage()}
    </div>
  );
};

export default App;
