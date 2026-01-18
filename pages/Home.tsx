
import React, { useMemo } from 'react';
import { Wallpaper, Mood, Category } from '../types';

interface HomeProps {
  wallpapers: Wallpaper[];
  onMoodSelect: (mood: Mood) => void;
  onCategorySelect: (cat: Category) => void;
  onSearch: (q: string) => void;
  onSelectWallpaper: (w: Wallpaper) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ 
  wallpapers, 
  onMoodSelect, 
  onCategorySelect, 
  onSearch, 
  onSelectWallpaper,
  onToggleTheme,
  isDarkMode
}) => {
  const featured = useMemo(() => wallpapers.filter(w => w.isFeatured).slice(0, 20), [wallpapers]);

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="app-container">
        {/* Header */}
        <header className="px-6 md:px-12 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-inherit/80 backdrop-blur-lg z-50">
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest opacity-60`}>AuraWalls</p>
            <h1 className="text-2xl md:text-3xl font-outfit font-bold">Discover</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={onToggleTheme} className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center transition-transform hover:scale-110">
              <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 overflow-hidden border-2 border-white/20">
              <img src="https://picsum.photos/100" alt="profile" />
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="px-6 md:px-12 mb-8">
          <div className="relative group max-w-2xl mx-auto">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors"></i>
            <input 
              type="text" 
              placeholder="Search 400+ AI wallpapers..." 
              onKeyDown={(e) => e.key === 'Enter' && onSearch((e.target as HTMLInputElement).value)}
              className={`w-full py-4 pl-12 pr-4 rounded-2xl border-none outline-none text-sm transition-all shadow-lg ${isDarkMode ? 'bg-white/5 focus:bg-white/10' : 'bg-white focus:ring-2 ring-purple-100'}`}
            />
          </div>
        </div>

        {/* Today's Pick - Horizontal Scroll */}
        <section className="mb-10">
          <div className="px-6 md:px-12 flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-outfit font-bold">Today's Picks</h2>
            <button onClick={() => onSearch('')} className="text-xs font-bold text-purple-500 uppercase tracking-widest hover:underline">See All</button>
          </div>
          <div className="flex overflow-x-auto px-6 md:px-12 space-x-5 no-scrollbar scroll-smooth pb-4">
            {featured.length > 0 ? featured.map(w => (
              <div 
                key={w.id} 
                onClick={() => onSelectWallpaper(w)}
                className="flex-shrink-0 w-[80vw] sm:w-72 h-[450px] relative rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl transition-transform hover:scale-[1.02]"
              >
                <img src={w.imageUrl} className="w-full h-full object-cover" alt={w.title} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-xs font-medium text-white/60 mb-1">{w.category}</p>
                  <h3 className="text-xl font-outfit font-bold text-white leading-tight">{w.title}</h3>
                  <div className="mt-3 flex space-x-2">
                    <span className="px-2 py-1 glass text-[10px] rounded-md font-bold text-white uppercase">{w.resolution}</span>
                    {w.isPremium && <span className="px-2 py-1 bg-yellow-400 text-black text-[10px] rounded-md font-bold uppercase">PRO</span>}
                  </div>
                </div>
              </div>
            )) : (
              <div className="flex-shrink-0 w-72 h-[450px] rounded-[2rem] bg-white/5 animate-pulse flex items-center justify-center">
                <i className="fa-solid fa-spinner fa-spin text-2xl opacity-20"></i>
              </div>
            )}
          </div>
        </section>

        {/* Mood Selector */}
        <section className="mb-10 px-6 md:px-12">
          <h2 className="text-lg md:text-xl font-outfit font-bold mb-4">Select Mood</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[Mood.CALM, Mood.MOTIVATED, Mood.NIGHT, Mood.FOCUS].map(mood => (
              <button 
                key={mood}
                onClick={() => onMoodSelect(mood)}
                className={`p-4 md:p-6 rounded-2xl flex items-center space-x-3 transition-all hover:translate-y-[-2px] hover:shadow-xl active:scale-95 ${isDarkMode ? 'glass border border-white/5' : 'bg-white shadow-md'}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <i className={`fa-solid ${mood === Mood.CALM ? 'fa-leaf' : mood === Mood.MOTIVATED ? 'fa-bolt' : mood === Mood.NIGHT ? 'fa-moon' : 'fa-eye'} text-lg`}></i>
                </div>
                <span className="font-semibold text-sm md:text-base">{mood}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section className="px-6 md:px-12">
          <h2 className="text-lg md:text-xl font-outfit font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[Category.EARTH_TONES, Category.COSMIC, Category.SPIRITUAL, Category.AMOLED].map(cat => (
              <div 
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className="group relative h-32 md:h-48 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              >
                <img 
                  src={`https://picsum.photos/seed/${cat.toLowerCase().replace(' ', '')}/600/400`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt={cat} 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center flex-col">
                  <span className="text-white font-outfit font-bold tracking-wide text-center px-4">{cat}</span>
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">100 Items</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
