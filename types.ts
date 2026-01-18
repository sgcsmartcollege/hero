
export enum Mood {
  CALM = 'Calm',
  MOTIVATED = 'Motivated',
  NIGHT = 'Night',
  FOCUS = 'Focus'
}

export enum Category {
  EARTH_TONES = 'Earth Tones',
  COSMIC = 'Cosmic',
  SPIRITUAL = 'Spiritual',
  AMOLED = 'AMOLED'
}

export interface Wallpaper {
  id: string;
  imageUrl: string;
  title: string;
  category: Category;
  mood: Mood;
  isFeatured: boolean;
  resolution: string;
  isPremium: boolean;
  keywords: string[];
}

export type ViewState = 'SPLASH' | 'HOME' | 'LIST' | 'DETAILS';

export interface AppState {
  view: ViewState;
  selectedWallpaper: Wallpaper | null;
  currentMoodFilter: Mood | null;
  currentCategoryFilter: Category | null;
  searchQuery: string;
  favorites: string[];
  isDarkMode: boolean;
}
