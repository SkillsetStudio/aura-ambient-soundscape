import { 
  CloudRain, 
  Trees, 
  Coffee, 
  Flame, 
  Wind, 
  Waves, 
  Moon, 
  TrainFront, 
  WindArrowDown,
  Zap,
  Volume2,
  VolumeX,
  Bird
} from 'lucide-react';

export interface Sound {
  id: string;
  name: string;
  icon: any;
  url: string;
  color: string;
}

export const SOUNDS: Sound[] = [
  {
    id: 'rain',
    name: 'Rain',
    icon: CloudRain,
    url: 'https://actions.google.com/sounds/v1/water/rain_on_roof.ogg',
    color: '#4a6fa5'
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: Trees,
    url: 'https://actions.google.com/sounds/v1/ambiences/forest_ambience.ogg',
    color: '#2d5a27'
  },
  {
    id: 'coffee',
    name: 'Coffee Shop',
    icon: Coffee,
    url: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    color: '#8b5e3c'
  },
  {
    id: 'fire',
    name: 'Fireplace',
    icon: Flame,
    url: 'https://actions.google.com/sounds/v1/ambiences/fireplace.ogg',
    color: '#d35400'
  },
  {
    id: 'wind',
    name: 'Wind',
    icon: Wind,
    url: 'https://actions.google.com/sounds/v1/weather/wind_howling.ogg',
    color: '#7f8c8d'
  },
  {
    id: 'waves',
    name: 'Seaside',
    icon: Waves,
    url: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_shore.ogg',
    color: '#2980b9'
  },
  {
    id: 'night',
    name: 'Summer Night',
    icon: Moon,
    url: 'https://actions.google.com/sounds/v1/ambiences/summer_night.ogg',
    color: '#2c3e50'
  },
  {
    id: 'train',
    name: 'Train',
    icon: TrainFront,
    url: 'https://actions.google.com/sounds/v1/transportation/train_passing.ogg',
    color: '#34495e'
  },
  {
    id: 'birds',
    name: 'Birds',
    icon: Bird,
    url: 'https://actions.google.com/sounds/v1/ambiences/morning_birds.ogg',
    color: '#27ae60'
  }
];
