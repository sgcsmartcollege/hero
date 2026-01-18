
import { MOCK_WALLPAPERS } from '../constants';
import { Wallpaper, Category, Mood } from '../types';

export class WallpaperService {
  static async getAll(): Promise<Wallpaper[]> {
    return new Promise((resolve) => {
      // Simulate a slightly longer fetch for a larger dataset
      setTimeout(() => resolve(MOCK_WALLPAPERS), 500);
    });
  }

  static async getFeatured(): Promise<Wallpaper[]> {
    const all = await this.getAll();
    return all.filter(w => w.isFeatured);
  }

  static async getByMood(mood: Mood): Promise<Wallpaper[]> {
    const all = await this.getAll();
    return all.filter(w => w.mood === mood);
  }

  static async getByCategory(category: Category): Promise<Wallpaper[]> {
    const all = await this.getAll();
    return all.filter(w => w.category === category);
  }

  static async search(query: string): Promise<Wallpaper[]> {
    const all = await this.getAll();
    const lowQuery = query.toLowerCase().trim();
    if (!lowQuery) return all;
    
    return all.filter(w => 
      w.title.toLowerCase().includes(lowQuery) ||
      w.category.toLowerCase().includes(lowQuery) ||
      w.mood.toLowerCase().includes(lowQuery) ||
      w.keywords.some(k => k.toLowerCase().includes(lowQuery))
    );
  }
}
