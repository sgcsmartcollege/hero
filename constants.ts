
import { Wallpaper, Category, Mood } from './types';

const generateWallpapers = (): Wallpaper[] => {
  const wallpapers: Wallpaper[] = [];
  const categories = [Category.EARTH_TONES, Category.COSMIC, Category.SPIRITUAL, Category.AMOLED];
  const moods = [Mood.CALM, Mood.MOTIVATED, Mood.NIGHT, Mood.FOCUS];
  
  const categoryKeywords: Record<Category, string[]> = {
    [Category.EARTH_TONES]: ['nature', 'forest', 'mountain', 'sand', 'clay', 'organic', 'warm', 'landscape'],
    [Category.COSMIC]: ['stars', 'galaxy', 'nebula', 'planets', 'space', 'astronaut', 'void', 'astronomy'],
    [Category.SPIRITUAL]: ['zen', 'meditation', 'abstract', 'light', 'energy', 'peace', 'sacred', 'aura'],
    [Category.AMOLED]: ['dark', 'neon', 'minimal', 'black', 'oled', 'contrast', 'geometry', 'lineart']
  };

  const adjectives = ['Ethereal', 'Vibrant', 'Silent', 'Mystic', 'Golden', 'Deep', 'Ancient', 'Neo', 'Urban', 'Wild', 'Pure', 'Infinite'];

  categories.forEach((cat) => {
    for (let i = 1; i <= 100; i++) {
      const mood = moods[Math.floor(Math.random() * moods.length)];
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const id = `${cat.replace(/\s+/g, '-').toLowerCase()}-${i}`;
      
      // Use different width/height to get portrait orientation for mobile wallpapers
      const seed = Math.floor(Math.random() * 10000);
      const imageUrl = `https://picsum.photos/seed/${id}-${seed}/1080/1920`;

      wallpapers.push({
        id,
        imageUrl,
        title: `${adj} ${cat.split(' ')[0]} ${i}`,
        category: cat,
        mood,
        isFeatured: i <= 5, // First 5 of each category are featured
        resolution: i % 10 === 0 ? '8K' : '4K',
        isPremium: i % 15 === 0,
        keywords: [
          ...categoryKeywords[cat],
          mood.toLowerCase(),
          adj.toLowerCase()
        ]
      });
    }
  });

  return wallpapers;
};

export const MOCK_WALLPAPERS: Wallpaper[] = generateWallpapers();
