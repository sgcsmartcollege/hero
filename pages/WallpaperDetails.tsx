
import React, { useState } from 'react';
import { Wallpaper } from '../types';

interface WallpaperDetailsProps {
  wallpaper: Wallpaper;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const WallpaperDetails: React.FC<WallpaperDetailsProps> = ({
  wallpaper,
  onBack,
  isFavorite,
  onToggleFavorite
}) => {
  const [previewMode, setPreviewMode] = useState<'HOME' | 'LOCK'>('HOME');
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownload = () => {
    setDownloading(true);
    // Simulate API storage fetch
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = wallpaper.imageUrl;
      link.download = `${wallpaper.title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(false);
      showToast('Wallpaper saved to gallery!');
    }, 1500);
  };

  const handleApply = () => {
    showToast('Applying wallpaper to system...');
    setTimeout(() => {
      showToast('Applied successfully!');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black text-white z-50 overflow-y-auto no-scrollbar">
      {/* Background Blur */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <img src={wallpaper.imageUrl} className="w-full h-full object-cover blur-3xl scale-110" alt="blur" />
      </div>

      <div className="relative min-h-screen flex flex-col app-container">
        {/* Header */}
        <div className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 z-20">
          <button onClick={onBack} className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center transition-transform hover:scale-110">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
            onClick={onToggleFavorite} 
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center transition-all ${isFavorite ? 'text-red-500 scale-110' : 'text-white'}`}
          >
            <i className={`${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
          </button>
        </div>

        {/* Responsive Content Wrapper */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 py-4">
          
          {/* Phone Preview Mockup Container */}
          <div className="flex flex-col items-center w-full max-w-sm">
            <div className="phone-mockup">
              <img src={wallpaper.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="preview" />
              
              <div className="absolute inset-0 z-10 flex flex-col">
                {/* Status Bar Mock */}
                <div className="status-bar justify-between text-white/90">
                  <span className="font-bold">9:41</span>
                  <div className="flex items-center space-x-1.5">
                    <i className="fa-solid fa-signal text-[8px]"></i>
                    <i className="fa-solid fa-wifi text-[8px]"></i>
                    <i className="fa-solid fa-battery-full text-[10px]"></i>
                  </div>
                </div>

                {previewMode === 'LOCK' ? (
                  <div className="flex-1 flex flex-col items-center pt-16">
                    <span className="text-6xl font-light text-white mb-2 font-outfit">09:41</span>
                    <span className="text-sm font-medium text-white/80">Monday, June 12</span>
                    <div className="mt-auto mb-16 flex justify-between w-full px-12">
                      <div className="w-10 h-10 rounded-full glass flex items-center justify-center"><i className="fa-solid fa-flashlight text-sm"></i></div>
                      <div className="w-10 h-10 rounded-full glass flex items-center justify-center"><i className="fa-solid fa-camera text-sm"></i></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 p-6">
                     <div className="grid grid-cols-4 gap-4 mt-10">
                        {[1,2,3,4,5,6,7,8].map(i => (
                          <div key={i} className="aspect-square rounded-xl bg-white/20 backdrop-blur-md border border-white/10"></div>
                        ))}
                     </div>
                     <div className="dock bg-white/20 backdrop-blur-xl bottom-6 flex items-center justify-around px-2 border border-white/10">
                       <div className="w-9 h-9 rounded-xl bg-white/30"></div>
                       <div className="w-9 h-9 rounded-xl bg-white/30"></div>
                       <div className="w-9 h-9 rounded-xl bg-white/30"></div>
                       <div className="w-9 h-9 rounded-xl bg-white/30"></div>
                     </div>
                  </div>
                )}
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="mt-8 glass p-1 rounded-full flex self-center shadow-xl">
              <button 
                onClick={() => setPreviewMode('HOME')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${previewMode === 'HOME' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                Home Screen
              </button>
              <button 
                onClick={() => setPreviewMode('LOCK')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${previewMode === 'LOCK' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                Lock Screen
              </button>
            </div>
          </div>

          {/* Action Panel - Adaptive for Desktop/Mobile */}
          <div className="w-full md:max-w-md bg-white/10 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 shadow-2xl border border-white/5">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-outfit font-bold">{wallpaper.title}</h2>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">{wallpaper.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  <span className="text-xs text-gray-400">{wallpaper.resolution} Ultra HD</span>
                </div>
              </div>
              {wallpaper.isPremium && (
                <span className="px-4 py-2 bg-yellow-400 text-black rounded-2xl text-[10px] font-black shadow-lg shadow-yellow-400/20">PREMIUM</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 py-4 rounded-2xl glass flex items-center justify-center space-x-3 transition-all hover:bg-white/10 active:scale-95 disabled:opacity-50"
              >
                <i className={`fa-solid ${downloading ? 'fa-circle-notch fa-spin' : 'fa-download'} text-lg`}></i>
                <span className="font-bold">Download</span>
              </button>
              <button 
                onClick={handleApply}
                className="flex-1 py-4 rounded-2xl bg-white text-black flex items-center justify-center space-x-3 transition-all hover:bg-gray-200 active:scale-95"
              >
                <i className="fa-solid fa-wand-magic-sparkles text-lg"></i>
                <span className="font-bold">Set Wallpaper</span>
              </button>
            </div>

            {/* Tags/Keywords - Hidden on very small screens, shown on md+ */}
            <div className="mt-8 hidden sm:block">
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Tags</p>
               <div className="flex flex-wrap gap-2">
                 {wallpaper.keywords.map(tag => (
                   <span key={tag} className="px-3 py-1.5 glass rounded-lg text-[10px] font-medium text-gray-300">#{tag}</span>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 bg-white text-black px-8 py-4 rounded-full text-sm font-bold shadow-2xl animate-bounce z-[100] border-4 border-black/10">
          {toast}
        </div>
      )}
    </div>
  );
};

export default WallpaperDetails;
