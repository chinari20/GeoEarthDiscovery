
import { Dataset, EarthEventCategory } from './types';

export const CATEGORIES: { id: EarthEventCategory; name: string }[] = [
  { id: 'floods', name: 'Floods' },
  { id: 'volcanoes', name: 'Volcanoes' },
  { id: 'earthquakes', name: 'Earthquakes' },
  { id: 'wildfires', name: 'Forest Fires' },
  { id: 'severeStorms', name: 'Hurricanes' },
  { id: 'landslides', name: 'Landslides' },
  { id: 'drought', name: 'Droughts' },
  { id: 'icebergs', name: 'Glaciers' },
];

export const DATASET_MAP: Record<EarthEventCategory, Dataset[]> = {
  volcanoes: [
    { title: "MODIS Thermal Anomalies", desc: "Detects volcanic eruptions, fires, and thermal hotspots.", link: "https://earthdata.nasa.gov/" },
    { title: "ASTER Surface Temperature", desc: "Provides land surface temperature for volcanic regions.", link: "https://earthdata.nasa.gov/" },
    { title: "Aerosol Optical Depth (MISR)", desc: "Measures ash plumes and aerosol concentrations.", link: "https://earthdata.nasa.gov/" }
  ],
  floods: [
    { title: "Global Flood Monitoring (GFMS)", desc: "Near real-time flood maps derived from satellite data.", link: "https://flood.umd.edu/" },
    { title: "MODIS Surface Reflectance", desc: "Tracks water bodies and inundation areas.", link: "https://earthdata.nasa.gov/" },
    { title: "SMAP Soil Moisture Data", desc: "Provides soil moisture data which is critical for flood prediction.", link: "https://earthdata.nasa.gov/" }
  ],
  earthquakes: [
    { title: "GRACE Gravity Data", desc: "Detects mass redistribution linked to earthquakes.", link: "https://earthdata.nasa.gov/" },
    { title: "Landsat Surface Deformation", desc: "Monitors ground shifts caused by seismic activity.", link: "https://landsat.gsfc.nasa.gov/" },
    { title: "Sentinel-1 SAR Data", desc: "Measures ground displacement with high precision using radar.", link: "https://earthdata.nasa.gov/" }
  ],
  wildfires: [
    { title: "VIIRS Active Fire Data", desc: "Detects forest fire locations and intensity globally.", link: "https://firms.modaps.eosdis.nasa.gov/" },
    { title: "MODIS Burned Area", desc: "Maps burned areas post-fire for impact studies.", link: "https://earthdata.nasa.gov/" },
    { title: "CALIPSO Aerosol Data", desc: "Tracks smoke plumes and their height in the atmosphere.", link: "https://earthdata.nasa.gov/" }
  ],
  severeStorms: [
      { title: "GPM Integrated Multi-satellitE Retrievals", desc: "Provides global precipitation data to track hurricanes.", link: "https://earthdata.nasa.gov/" },
      { title: "GOES-R Series Geostationary Satellites", desc: "Offers continuous monitoring of weather systems.", link: "https://www.goes-r.gov/" },
  ],
  landslides: [
      { title: "Global Landslide Catalog (GLC)", desc: "A database of rainfall-triggered landslides worldwide.", link: "https://data.nasa.gov/Earth-Science/Global-Landslide-Catalog/h9d8-grem" },
      { title: "Landsat Imagery", desc: "Optical imagery to assess landslide scars and land use changes.", link: "https://landsat.gsfc.nasa.gov/" },
  ],
  drought: [
      { title: "GRACE-FO Drought Indicators", desc: "Measures changes in water storage to monitor drought conditions.", link: "https://grace.jpl.nasa.gov/" },
      { title: "ECOSTRESS Evapotranspiration Data", desc: "Monitors plant water stress from the ISS.", link: "https://ecostress.jpl.nasa.gov/" },
  ],
  icebergs: [
      { title: "ICESat-2 Laser Altimetry", desc: "Measures ice sheet elevation and sea ice thickness.", link: "https://icesat-2.gsfc.nasa.gov/" },
      { title: "MODIS Snow and Sea Ice Global Mapping", desc: "Provides daily maps of snow and ice cover.", link: "https://nsidc.org/" },
  ]
};

export const VISUALIZER_KEYWORDS = ["Flood", "Volcano", "Cyclone", "Earthquake", "Landslide", "Temperature", "Wildfire", "Drought"];
