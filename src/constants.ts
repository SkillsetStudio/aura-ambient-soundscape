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
    url: 'https://github.com/rafaelrinaldi/noisli-clone/raw/master/public/sounds/rain.mp3',
    color: '#4a6fa5'
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: Trees,
    url: 'https://github.com/rafaelrinaldi/noisli-clone/raw/master/public/sounds/forest.mp3',
    color: '#2d5a27'
  },
  {
    id: 'coffee',
    name: 'Coffee Shop',
    icon: Coffee,
    url: 'https://github.com/rafaelrinaldi/noisli-clone/raw/master/public/sounds/coffee_shop.mp3',
    color: '#8b5e3c'
  },
  {
    id: 'fire',
    name: 'Fireplace',
    icon: Flame,
    url: 'https://github.com/rafaelrinaldi/noisli-clone/raw/master/public/sounds/fire.mp3',
    color: '#d35400'
  },
  {
    id: 'wind',
    name: 'Wind',
    icon: Wind,
    url: 'https://github.com/rafaelrinaldi/noisli-clone/raw/master/public/sounds/wind.mp3',
    color: '#7f8c8d'
  },
  {
    id: 'waves',
    name: 'Seaside',
    icon: Waves,
    url: 'https://github.com/rafaelrinaldi/noisli-clone/raw/master/public/sounds/seaside.mp3',
    color: '#2980b9'
  },
  {
    id: 'night',
    name: 'Summer Night',
    icon: Moon,
    url: 'https://github.com/rafaelrinaldi/noisli-clone/raw/master/public/sounds/summer_night.mp3',
    color: '#2c3e50'
  },
  {
    id: 'train',
    name: 'Train',
    icon: TrainFront,
    url: 'https://github.com/rafaelrinaldi/noisli-clone/raw/master/public/sounds/train.mp3',
    color: '#34495e'
  },
  {
    id: 'birds',
    name: 'Birds',
    icon: Bird,
    url: 'https://github.com/rafaelrinaldi/noisli-clone/raw/master/public/sounds/birds.mp3',
    color: '#27ae60'
  }
];
