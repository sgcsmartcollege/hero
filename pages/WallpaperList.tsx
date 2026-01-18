
import React, { useMemo, useState } from 'react';
import { Wallpaper, Mood, Category } from '../types';

interface WallpaperListProps {
  allWallpapers: Wallpaper[];
  moodFilter: Mood | null;
  categoryFilter: Category | null;
  searchQuery: string;
  onSelectWallpaper: (w: Wallpaper) => void;
  onBack: () => void;
  onSearch: (q: string) => void;
}

const WallpaperList: React.FC<WallpaperListProps> = ({
  allWallpapers,
  moodFilter,
  categoryFilter,
  searchQuery,
  onSelectWallpaper,
  onBack,
  onSearch
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filtered = useMemo(() => {
    let result = allWallpapers;
    if (moodFilter) result = result.filter(w => w.mood === moodFilter);
    if (categoryFilter) result = result.filter(w => w.category === categoryFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(w => 
        w.title.toLowerCase().includes(q) || 
        w.keywords.some(k => k.toLowerCase().includes(q))
      );
    }
    return result;
  }, [allWallpapers, moodFilter, categoryFilter, searchQuery]);

  const title = moodFilter || categoryFilter || (searchQuery ? `"${searchQuery}"` : 'All Wallpapers');

  return (
    <div className="min-h-screen bg-black text-white pb-10">
      <div className="app-container">
        <header className="px-6 md:px-12 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-50">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center transition-transform hover:scale-110">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-outfit font-bold leading-tight">{title}</h1>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{filtered.length} Wallpapers Found</p>
            </div>
          </div>
          <button className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center">
            <i className="fa-solid fa-sliders"></i>
          </button>
        </header>

        <div className="px-6 md:px-12 mb-6">
          <div className="relative max-w-2xl">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
            <input 
              type="text" 
              placeholder="Refine search..." 
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch(localSearch)}
              className="w-full py-3 md:py-4 pl-11 pr-4 rounded-xl bg-white/5 border-none outline-none text-sm focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="px-6 md:px-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filtered.map(w => (
              <div 
                key={w.id} 
                onClick={() => onSelectWallpaper(w)}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
              >
                <img 
                  src={w.imageUrl} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt={w.title}
                  loading="lazy" 
                />
                <div className="absolute top-3 right-3 flex flex-col items-end space-y-2 z-10">
                  {w.isPremium && <span className="px-2 py-1 bg-yellow-400 text-black text-[8px] rounded font-black uppercase">PRO</span>}
                  <span className="px-1.5 py-0.5 glass text-[8px] rounded font-bold uppercase">{w.resolution}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-xs md:text-sm font-bold truncate">{w.title}</h3>
                  <p className="text-[9px] md:text-xs text-gray-400 font-medium">{w.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] px-10 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <i className="fa-solid fa-image-slash text-3xl text-gray-600"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">No results found</h3>
            <p className="text-gray-500 text-sm">Try searching for something else or explore different categories.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WallpaperList;
