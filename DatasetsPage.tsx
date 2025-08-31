
import React from 'react';
import { EarthEventCategory } from '../types';
import { DATASET_MAP, CATEGORIES } from '../constants';

interface DatasetsPageProps {
  category: EarthEventCategory;
  onBack: () => void;
}

const DatasetsPage: React.FC<DatasetsPageProps> = ({ category, onBack }) => {
  const datasets = DATASET_MAP[category] || [];
  const categoryInfo = CATEGORIES.find(c => c.id === category);
  const categoryName = categoryInfo ? categoryInfo.name : 'Datasets';

  return (
    <div className="bg-[#0d1117] min-h-screen text-white">
      <header className="bg-[#111827] flex justify-between items-center py-4 px-8">
        <h1 className="text-2xl font-bold">Relevant Datasets</h1>
        <button onClick={onBack} className="text-yellow-400 hover:text-yellow-500 text-lg transition-colors">
          ← Back to Dashboard
        </button>
      </header>

      <main>
        <section className="text-center py-12 px-5">
          <h2 className="text-4xl font-bold">{categoryName}</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-300">
            Explore scientific datasets related to this Earth science event.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 pb-12">
          {datasets.length > 0 ? (
            datasets.map((ds, index) => (
              <div key={index} className="bg-[#1f2937] p-6 rounded-xl shadow-lg flex flex-col">
                <h3 className="text-xl font-bold text-yellow-400">{ds.title}</h3>
                <p className="text-gray-300 mt-2 flex-grow">{ds.desc}</p>
                <a href={ds.link} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-400 font-semibold hover:text-blue-500 transition-colors self-start">
                  View Dataset →
                </a>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">No datasets found for this category. Please go back and select another one.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default DatasetsPage;
