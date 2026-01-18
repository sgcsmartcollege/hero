
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Wallpaper, ViewState, Mood, Category, AppState } from './types';
import { WallpaperService } from './services/wallpaperService';
import Splash from './pages/Splash';
import Home from './pages/Home';
import WallpaperList from './pages/WallpaperList';
import WallpaperDetails from './pages/WallpaperDetails';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'SPLASH',
    selectedWallpaper: null,
    currentMoodFilter: null,
    currentCategoryFilter: null,
    searchQuery: '',
    favorites: JSON.parse(localStorage.getItem('aura-favorites') || '[]'),
    isDarkMode: true,
  });

  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial Data Fetch
  useEffect(() => {
    const init = async () => {
      const data = await WallpaperService.getAll();
      setWallpapers(data);
      setLoading(false);
    };
    init();
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('aura-favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  // Navigation Logic
  const navigateTo = useCallback((view: ViewState, params?: Partial<AppState>) => {
    setState(prev => ({ ...prev, view, ...params }));
  }, []);

  const handleMoodSelect = (mood: Mood) => {
    navigateTo('LIST', { currentMoodFilter: mood, currentCategoryFilter: null, searchQuery: '' });
  };

  const handleCategorySelect = (cat: Category) => {
    navigateTo('LIST', { currentCategoryFilter: cat, currentMoodFilter: null, searchQuery: '' });
  };

  const handleSearch = (query: string) => {
    navigateTo('LIST', { searchQuery: query, currentMoodFilter: null, currentCategoryFilter: null });
  };

  const toggleFavorite = (id: string) => {
    setState(prev => {
      const isFav = prev.favorites.includes(id);
      return {
        ...prev,
        favorites: isFav ? prev.favorites.filter(f => f !== id) : [...prev.favorites, id]
      };
    });
  };

  const goBack = () => {
    if (state.view === 'DETAILS') navigateTo('LIST');
    else if (state.view === 'LIST') navigateTo('HOME');
  };

  // Render Logic
  switch (state.view) {
    case 'SPLASH':
      return <Splash onComplete={() => navigateTo('HOME')} />;
    case 'HOME':
      return (
        <Home 
          wallpapers={wallpapers}
          onMoodSelect={handleMoodSelect}
          onCategorySelect={handleCategorySelect}
          onSearch={handleSearch}
          onSelectWallpaper={(w) => navigateTo('DETAILS', { selectedWallpaper: w })}
          onToggleTheme={() => setState(p => ({ ...p, isDarkMode: !p.isDarkMode }))}
          isDarkMode={state.isDarkMode}
        />
      );
    case 'LIST':
      return (
        <WallpaperList 
          allWallpapers={wallpapers}
          moodFilter={state.currentMoodFilter}
          categoryFilter={state.currentCategoryFilter}
          searchQuery={state.searchQuery}
          onSelectWallpaper={(w) => navigateTo('DETAILS', { selectedWallpaper: w })}
          onBack={goBack}
          onSearch={handleSearch}
        />
      );
    case 'DETAILS':
      return state.selectedWallpaper ? (
        <WallpaperDetails 
          wallpaper={state.selectedWallpaper}
          onBack={goBack}
          isFavorite={state.favorites.includes(state.selectedWallpaper.id)}
          onToggleFavorite={() => toggleFavorite(state.selectedWallpaper!.id)}
        />
      ) : null;
    default:
      return null;
  }
};

export default App;
