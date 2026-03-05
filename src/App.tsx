/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Pause, 
  Save, 
  Trash2, 
  Clock, 
  Heart
} from 'lucide-react';
import { SOUNDS, Sound } from './constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Mix {
  id: string;
  name: string;
  volumes: Record<string, number>;
}

export default function App() {
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [bgColor, setBgColor] = useState('#1a1a1a');
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  // Initialize audio elements
  useEffect(() => {
    SOUNDS.forEach(sound => {
      const audio = new Audio(sound.url);
      audio.loop = true;
      audio.volume = 0;
      audioRefs.current[sound.id] = audio;
    });

    // Load mixes from localStorage
    const savedMixes = localStorage.getItem('aura-mixes');
    if (savedMixes) {
      setMixes(JSON.parse(savedMixes));
    }

    return () => {
      Object.values(audioRefs.current).forEach((audio: HTMLAudioElement) => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  // Handle background color change based on active sounds
  useEffect(() => {
    const activeSounds = Object.entries(volumes).filter(([_, vol]) => (vol as number) > 0);
    if (activeSounds.length === 0) {
      setBgColor('#1a1a1a');
      return;
    }

    // Average the colors of active sounds
    const colors = activeSounds.map(([id]) => SOUNDS.find(s => s.id === id)?.color || '#1a1a1a');
    setBgColor(colors[0]); // For simplicity, just use the first active sound's color
  }, [volumes]);

  // Handle global play/pause
  useEffect(() => {
    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      const volume = volumes[id] || 0;
      (audio as HTMLAudioElement).volume = volume;
      if (isPlaying && volume > 0) {
        (audio as HTMLAudioElement).play().catch(() => {
          // Autoplay policy might block this
          console.warn('Playback blocked by browser');
        });
      } else {
        (audio as HTMLAudioElement).pause();
      }
    });
  }, [isPlaying, volumes]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => (t !== null ? t - 1 : null));
      }, 1000);
    } else if (timer === 0) {
      setIsPlaying(false);
      setTimerActive(false);
      setTimer(null);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const handleVolumeChange = (id: string, value: number) => {
    setVolumes(prev => ({ ...prev, [id]: value }));
    if (value > 0 && !isPlaying) {
      setIsPlaying(true);
    }
  };

  const saveMix = () => {
    const name = prompt('Enter a name for your mix:');
    if (!name) return;

    const newMix: Mix = {
      id: Date.now().toString(),
      name,
      volumes: { ...volumes }
    };

    const updatedMixes = [...mixes, newMix];
    setMixes(updatedMixes);
    localStorage.setItem('aura-mixes', JSON.stringify(updatedMixes));
  };

  const loadMix = (mix: Mix) => {
    setVolumes(mix.volumes);
    setIsPlaying(true);
  };

  const deleteMix = (id: string) => {
    const updatedMixes = mixes.filter(m => m.id !== id);
    setMixes(updatedMixes);
    localStorage.setItem('aura-mixes', JSON.stringify(updatedMixes));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (mins: number) => {
    setTimer(mins * 60);
    setTimerActive(true);
    setIsPlaying(true);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-1000"
      style={{ backgroundColor: bgColor }}
    >
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl flex justify-between items-center mb-12 text-white"
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-black rounded-full animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter">AURA</h1>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <div className="relative group">
            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Clock size={24} />
            </button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block glass-card p-4 min-w-[200px] z-50">
              <h3 className="text-sm font-semibold mb-3">Timer</h3>
              <div className="grid grid-cols-2 gap-2">
                {[15, 25, 45, 60].map(mins => (
                  <button 
                    key={mins}
                    onClick={() => startTimer(mins)}
                    className="text-xs py-2 rounded bg-white/10 hover:bg-white/20"
                  >
                    {mins}m
                  </button>
                ))}
              </div>
              {timer !== null && (
                <div className="mt-4 text-center">
                  <div className="text-2xl font-mono">{formatTime(timer)}</div>
                  <button 
                    onClick={() => { setTimer(null); setTimerActive(false); }}
                    className="text-[10px] uppercase tracking-widest mt-2 opacity-50 hover:opacity-100"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="relative group">
            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Heart size={24} />
            </button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block glass-card p-4 min-w-[240px] z-50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold">My Mixes</h3>
                <button onClick={saveMix} className="p-1 hover:bg-white/10 rounded">
                  <Save size={16} />
                </button>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {mixes.length === 0 && (
                  <p className="text-xs opacity-50 italic">No saved mixes yet</p>
                )}
                {mixes.map(mix => (
                  <div key={mix.id} className="flex items-center justify-between group/item">
                    <button 
                      onClick={() => loadMix(mix)}
                      className="text-xs hover:underline truncate flex-1 text-left"
                    >
                      {mix.name}
                    </button>
                    <button 
                      onClick={() => deleteMix(mix.id)}
                      className="p-1 opacity-0 group-hover/item:opacity-50 hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Sound Grid */}
      <main className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-12">
        {SOUNDS.map((sound, index) => {
          const Icon = sound.icon;
          const volume = volumes[sound.id] || 0;
          const isActive = volume > 0;

          return (
            <motion.div
              key={sound.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center gap-6"
            >
              <button
                onClick={() => handleVolumeChange(sound.id, isActive ? 0 : 0.5)}
                className={cn(
                  "relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-500",
                  isActive 
                    ? "bg-white text-black scale-110 shadow-[0_0_40px_rgba(255,255,255,0.3)]" 
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                <Icon size={isActive ? 40 : 32} className="transition-all duration-500" />
                {isActive && (
                  <motion.div 
                    layoutId={`active-ring-${sound.id}`}
                    className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-20"
                  />
                )}
              </button>
              
              <div className="w-full max-w-[120px] flex flex-col items-center gap-2">
                <span className={cn(
                  "text-xs font-medium tracking-wide uppercase transition-opacity",
                  isActive ? "opacity-100" : "opacity-40"
                )}>
                  {sound.name}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => handleVolumeChange(sound.id, parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </motion.div>
          );
        })}
      </main>

      {/* Footer Info */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-20 text-white/30 text-[10px] uppercase tracking-[0.2em] text-center"
      >
        <p>Crafted for focus & relaxation</p>
        <div className="flex gap-4 mt-4 justify-center">
          <button onClick={() => setVolumes({})} className="hover:text-white transition-colors">Reset All</button>
          <span>•</span>
          <p>Aura v1.0</p>
        </div>
      </motion.footer>
    </div>
  );
}
