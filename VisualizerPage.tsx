
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GlobeLocation, NasaCollection } from '../types';
import { VISUALIZER_KEYWORDS } from '../constants';

interface VisualizerPageProps {
    onBack: () => void;
}

const VisualizerPage: React.FC<VisualizerPageProps> = ({ onBack }) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<any>(null);
  const [collections, setCollections] = useState<NasaCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchNASAData = useCallback(async (keyword: string) => {
    setLoading(true);
    setCollections([]);
    const nasaApiUrl = `https://cmr.earthdata.nasa.gov/search/collections.json?keyword=${keyword}&page_size=5`;
    
    try {
      const res = await fetch(nasaApiUrl);
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      const data = await res.json();
      const fetchedCollections = data.feed.entry || [];
      setCollections(fetchedCollections);

      const locations: GlobeLocation[] = [];

      const geocodePlace = async (place: string): Promise<GlobeLocation | null> => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
        try {
          const geoRes = await fetch(url, { headers: { 'User-Agent': 'nasa-hackathon-app/1.0' } });
          const geoData = await geoRes.json();
          if (geoData.length > 0) {
            return {
              lat: parseFloat(geoData[0].lat),
              lng: parseFloat(geoData[0].lon),
              place: geoData[0].display_name,
              label: `${keyword} – ${geoData[0].display_name.split(',')[0]}`
            };
          }
        } catch (err) {
          console.error("Geocoding failed", err);
        }
        return null;
      };

      for (const dataset of fetchedCollections) {
        const loc = await geocodePlace(dataset.title);
        if (loc) locations.push(loc);
      }

      if (globeInstance.current) {
        globeInstance.current.labelsData(locations)
          .labelLat((d: GlobeLocation) => d.lat)
          .labelLng((d: GlobeLocation) => d.lng)
          .labelText((d: GlobeLocation) => d.label)
          .labelSize(() => 0.6)
          .labelDotRadius(() => 0.3)
          .labelColor(() => 'rgba(255, 100, 100, 0.85)')
          .labelResolution(2);
      }

    } catch (err) {
      console.error(err);
      setCollections([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (globeRef.current && !globeInstance.current) {
      const Globe = (window as any).Globe;
      if (Globe) {
        globeInstance.current = Globe()(globeRef.current)
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
          .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
          .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchNASAData("Flood");
  }, [fetchNASAData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query) {
      const matches = VISUALIZER_KEYWORDS.filter(k => k.toLowerCase().startsWith(query.toLowerCase()));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    fetchNASAData(suggestion);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(searchTerm) {
        setSuggestions([]);
        fetchNASAData(searchTerm);
    }
  };

  return (
    <div className="flex h-screen bg-[#0b1020] text-white font-sans">
      <div className="w-1/2 p-5 overflow-y-auto">
        <button onClick={onBack} className="text-yellow-400 hover:text-yellow-500 text-lg mb-4 transition-colors">
          ← Back to Dashboard
        </button>
        <h1 className="text-4xl font-bold mb-4">🌍 NASA Earth Data Recommender</h1>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            id="search-box"
            type="text"
            placeholder="🔎 Search disaster (Flood, Volcano...)"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-[#1a1f36] p-4 text-lg rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {suggestions.length > 0 && (
            <div id="suggestions" className="absolute w-full bg-[#1a1f36] mt-1 rounded-lg shadow-xl z-10">
              {suggestions.map(s => (
                <div key={s} onClick={() => handleSuggestionClick(s)} className="p-3 text-lg cursor-pointer hover:bg-[#333a56]">
                  {s}
                </div>
              ))}
            </div>
          )}
        </form>
        <div id="cards" className="mt-6">
          {loading && <p className="text-xl">⏳ Loading datasets...</p>}
          {!loading && collections.length === 0 && <p className="text-xl">⚠️ No datasets found. Try another keyword.</p>}
          {!loading && collections.map((col, index) => (
            <div key={index} className="bg-[#1a1f36] p-6 mb-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-blue-400 mb-2">{col.title}</h2>
              <p className="text-base text-gray-300 leading-relaxed">{col.summary || "No description available."}</p>
              <a href={col.links?.[0]?.href || "#"} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-lg text-red-400 font-bold hover:underline">
                🔗 View Dataset
              </a>
            </div>
          ))}
        </div>
      </div>
      <div id="globeViz" ref={globeRef} className="w-1/2 h-full"></div>
    </div>
  );
};

export default VisualizerPage;
