/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useEffect, ReactNode } from 'react';
import { 
  Link2, 
  Play, 
  Camera, 
  Music, 
  ShoppingCart, 
  Mail, 
  Lock,
  Unlock,
  Save,
  Plus,
  Trash2,
  X,
  Settings,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Globe,
  MessageSquare,
  Smartphone,
  Cpu,
  Zap,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LinkItem {
  id: string;
  title: string;
  icon: string; // Store as string key for simplicity
  url: string;
}

interface ProfileData {
  logoText: string;
  logoSub: string;
  logoImage?: string; // Base64 string
  backgroundImage?: string; // Base64 or URL
  name: string;
  tagline: string;
  links: LinkItem[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  link: <Link2 size={20} />,
  play: <Play size={20} />,
  camera: <Camera size={20} />,
  music: <Music size={20} />,
  cart: <ShoppingCart size={20} />,
  mail: <Mail size={20} />,
  instagram: <Instagram size={20} />,
  twitter: <Twitter size={20} />,
  youtube: <Youtube size={20} />,
  github: <Github size={20} />,
  globe: <Globe size={20} />,
  message: <MessageSquare size={20} />,
  phone: <Smartphone size={20} />,
  cpu: <Cpu size={20} />,
  zap: <Zap size={20} />,
};

const DEFAULT_DATA: ProfileData = {
  logoText: 'LOGO',
  logoSub: 'YOUR',
  backgroundImage: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
  name: 'Your Name',
  tagline: 'Your Tagline Here',
  links: [
    { id: '1', title: 'LINK ONE', icon: 'link', url: '#' },
    { id: '2', title: 'LINK TWO', icon: 'play', url: '#' },
    { id: '3', title: 'LINK THREE', icon: 'camera', url: '#' },
    { id: '4', title: 'LINK FOUR', icon: 'music', url: '#' },
    { id: '5', title: 'LINK FIVE', icon: 'cart', url: '#' },
    { id: '6', title: 'LINK SIX', icon: 'mail', url: '#' },
  ],
};

const compressImage = (file: File, maxWidth: number, maxHeight: number, quality: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

const ADMIN_PASSWORD = 'admin'; // Simple password for demo

export default function App() {
  return (
    <CyberLink />
  );
}

function CyberLink() {
  const [data, setData] = useState<ProfileData>(DEFAULT_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('cyberlink_data');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSave = (newData: ProfileData) => {
    try {
      setData(newData);
      localStorage.setItem('cyberlink_data', JSON.stringify(newData));
      setIsEditing(false);
      setToast('SYSTEM UPDATED');
    } catch (e: any) {
      console.error("Failed to save to localStorage", e);
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        setToast('ERROR: STORAGE QUOTA EXCEEDED. TRY SMALLER IMAGES.');
      } else {
        setToast('ERROR: FAILED TO SAVE DATA');
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsEditing(true);
      setShowLogin(false);
      setPassword('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start py-12 px-4 overflow-y-auto font-sans">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ 
          backgroundImage: `url('${data.backgroundImage || DEFAULT_DATA.backgroundImage}')`,
          filter: 'brightness(0.6) contrast(1.2)'
        }}
      />
      
      {/* Animated Scanline Effect */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Admin Toggle Button */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button 
          onClick={() => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(window.location.href)
                .then(() => setToast('LINK COPIED TO CLIPBOARD'))
                .catch(() => setToast('ERROR: CLIPBOARD BLOCKED'));
            } else {
              setToast('ERROR: CLIPBOARD UNAVAILABLE');
            }
          }}
          className="p-2 rounded-full cyber-glass text-cyan-400/50 hover:text-cyan-400 transition-colors"
          title="Copy Link"
        >
          <Link2 size={20} />
        </button>
        <button 
          onClick={() => setShowLogin(true)}
          className="p-2 rounded-full cyber-glass text-cyan-400/50 hover:text-cyan-400 transition-colors"
          title="Admin Settings"
        >
          <Settings size={20} />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo Section */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="w-32 h-32 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-black/60 backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.4)] overflow-hidden">
            {data.logoImage ? (
              <img 
                src={data.logoImage} 
                alt="Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  setToast('ERROR: LOGO LOAD FAILED');
                }}
              />
            ) : (
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase">{data.logoSub}</p>
                <p className="text-lg font-black tracking-tighter text-white uppercase">{data.logoText}</p>
              </div>
            )}
          </div>
          <div className="absolute inset-[-4px] rounded-full border border-cyan-500/30 animate-pulse" />
        </motion.div>

        {/* Name Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white mb-1 cyber-glow">
            {data.name}
          </h1>
          <p className="text-cyan-400/80 text-sm font-medium tracking-widest uppercase">
            {data.tagline}
          </p>
        </motion.div>

        {/* Links Section */}
        <div className="w-full space-y-4 mb-12">
          {data.links.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, filter: 'brightness(1.2)' }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center w-full cyber-button-bg cyber-button-shape rounded-none p-1 group transition-all duration-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            >
              <div className="flex items-center justify-center w-14 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                {ICON_MAP[link.icon] || <Link2 size={22} />}
              </div>
              <div className="flex-1 text-center py-4 pr-14">
                <span className="text-sm font-bold tracking-[0.2em] text-white group-hover:text-cyan-100 transition-colors flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_white]" />
                  {link.title}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm cyber-glass rounded-2xl p-8 border-cyan-500/50"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                  <Lock size={20} /> Access Control
                </h2>
                <button onClick={() => setShowLogin(false)} className="text-white/50 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-cyan-400/60 uppercase mb-2 tracking-widest">Enter Admin Key</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-cyan-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="••••••••"
                    autoFocus
                  />
                  {loginError && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-widest">Invalid Access Key</p>}
                </div>
                <button 
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-3 rounded-lg transition-all duration-300 uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  Decrypt & Enter
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="w-full max-w-2xl cyber-glass rounded-2xl p-8 border-cyan-500/50 my-8"
            >
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-black/40 backdrop-blur-md py-2 z-10 border-b border-cyan-500/20">
                <h2 className="text-2xl font-black text-cyan-400 tracking-tighter uppercase flex items-center gap-3">
                  <Settings className="animate-spin-slow" /> System Configuration
                </h2>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors uppercase text-xs font-bold tracking-widest"
                  >
                    Discard
                  </button>
                  <button 
                    onClick={() => handleSave(data)}
                    className="px-6 py-2 rounded-lg bg-cyan-500 text-black font-black hover:bg-cyan-400 transition-all uppercase text-xs tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {/* Profile Settings */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-cyan-400/60 uppercase tracking-[0.3em]">Identity</h3>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase mb-1 tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        value={data.name}
                        onChange={(e) => setData({...data, name: e.target.value})}
                        className="w-full bg-black/40 border border-cyan-500/20 rounded-lg py-2 px-3 text-white focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase mb-1 tracking-widest">Tagline</label>
                      <input 
                        type="text" 
                        value={data.tagline}
                        onChange={(e) => setData({...data, tagline: e.target.value})}
                        className="w-full bg-black/40 border border-cyan-500/20 rounded-lg py-2 px-3 text-white focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase mb-1 tracking-widest">Background Image</label>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-16 rounded border border-cyan-500/30 bg-black/40 flex items-center justify-center overflow-hidden">
                          {data.backgroundImage ? (
                            <img src={data.backgroundImage} alt="BG Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Globe size={20} className="text-white/20" />
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  setToast('PROCESSING IMAGE...');
                                  const compressed = await compressImage(file, 1200, 800, 0.7);
                                  setData({...data, backgroundImage: compressed});
                                  setToast('IMAGE READY');
                                } catch (err) {
                                  console.error("Failed to compress background image", err);
                                  setToast('ERROR: IMAGE PROCESSING FAILED');
                                }
                              }
                            }}
                            className="hidden" 
                            id="bg-upload"
                          />
                          <label 
                            htmlFor="bg-upload"
                            className="inline-block px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors"
                          >
                            Upload Background
                          </label>
                          {data.backgroundImage && data.backgroundImage !== DEFAULT_DATA.backgroundImage && (
                            <button 
                              onClick={() => setData({...data, backgroundImage: DEFAULT_DATA.backgroundImage})}
                              className="block text-[9px] text-red-500 hover:text-red-400 uppercase font-bold tracking-widest"
                            >
                              Reset to Default
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-cyan-400/60 uppercase tracking-[0.3em]">Branding</h3>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase mb-1 tracking-widest">Logo Image</label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full border border-cyan-500/30 bg-black/40 flex items-center justify-center overflow-hidden">
                          {data.logoImage ? (
                            <img src={data.logoImage} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Camera size={20} className="text-white/20" />
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  setToast('PROCESSING LOGO...');
                                  const compressed = await compressImage(file, 400, 400, 0.8);
                                  setData({...data, logoImage: compressed});
                                  setToast('LOGO READY');
                                } catch (err) {
                                  console.error("Failed to compress logo image", err);
                                  setToast('ERROR: IMAGE PROCESSING FAILED');
                                }
                              }
                            }}
                            className="hidden" 
                            id="logo-upload"
                          />
                          <label 
                            htmlFor="logo-upload"
                            className="inline-block px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors"
                          >
                            Upload Image
                          </label>
                          {data.logoImage && (
                            <button 
                              onClick={() => setData({...data, logoImage: undefined})}
                              className="block text-[9px] text-red-500 hover:text-red-400 uppercase font-bold tracking-widest"
                            >
                              Remove Image
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase mb-1 tracking-widest">Logo Main Text (Fallback)</label>
                      <input 
                        type="text" 
                        value={data.logoText}
                        onChange={(e) => setData({...data, logoText: e.target.value})}
                        className="w-full bg-black/40 border border-cyan-500/20 rounded-lg py-2 px-3 text-white focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase mb-1 tracking-widest">Logo Sub Text (Fallback)</label>
                      <input 
                        type="text" 
                        value={data.logoSub}
                        onChange={(e) => setData({...data, logoSub: e.target.value})}
                        className="w-full bg-black/40 border border-cyan-500/20 rounded-lg py-2 px-3 text-white focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>
                </section>

                {/* Links Management */}
                <section className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black text-cyan-400/60 uppercase tracking-[0.3em]">Neural Links</h3>
                    <button 
                      onClick={() => setData({...data, links: [...data.links, { id: Date.now().toString(), title: 'NEW LINK', icon: 'link', url: '#' }]})}
                      className="flex items-center gap-2 text-[10px] font-black text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest"
                    >
                      <Plus size={14} /> Add Link
                    </button>
                  </div>
                  <div className="space-y-3">
                    {data.links.map((link, idx) => (
                      <div key={link.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-3">
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="block text-[9px] font-bold text-white/30 uppercase mb-1 tracking-widest">Label</label>
                            <input 
                              type="text" 
                              value={link.title}
                              onChange={(e) => {
                                const newLinks = [...data.links];
                                newLinks[idx].title = e.target.value;
                                setData({...data, links: newLinks});
                              }}
                              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-cyan-500/50"
                            />
                          </div>
                          <div className="w-32">
                            <label className="block text-[9px] font-bold text-white/30 uppercase mb-1 tracking-widest">Icon</label>
                            <select 
                              value={link.icon}
                              onChange={(e) => {
                                const newLinks = [...data.links];
                                newLinks[idx].icon = e.target.value;
                                setData({...data, links: newLinks});
                              }}
                              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-cyan-500/50"
                            >
                              {Object.keys(ICON_MAP).map(key => (
                                <option key={key} value={key}>{key.toUpperCase()}</option>
                              ))}
                            </select>
                          </div>
                          <button 
                            onClick={() => {
                              const newLinks = data.links.filter(l => l.id !== link.id);
                              setData({...data, links: newLinks});
                            }}
                            className="self-end p-2 text-red-500/50 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-white/30 uppercase mb-1 tracking-widest">Destination URL</label>
                          <input 
                            type="text" 
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = [...data.links];
                              newLinks[idx].url = e.target.value;
                              setData({...data, links: newLinks});
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-cyan-500/50"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-8 z-[200] px-6 py-3 cyber-glass rounded-full text-cyan-400 font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
