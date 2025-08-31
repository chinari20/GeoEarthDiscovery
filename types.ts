
export interface Dataset {
  title: string;
  desc: string;
  link: string;
}

export type EarthEventCategory = 'floods' | 'volcanoes' | 'earthquakes' | 'wildfires' | 'severeStorms' | 'landslides' | 'drought' | 'icebergs';

export interface GlobeLocation {
  lat: number;
  lng: number;
  label: string;
  place: string;
}

export interface NasaCollection {
  title: string;
  summary: string;
  links?: { href: string }[];
}
