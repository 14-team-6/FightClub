import { useEffect, useState } from 'react';
import { ThemeItem } from '@frontend/src/services/types';
import { themeService } from '@frontend/src/services/themeService';

export function useThemes () {
  const [themesData, setThemesData] = useState<ThemeItem[]>();

  useEffect(() => {
    themeService.getThemes().then((themes: ThemeItem[]) => {
      const defaultTheme: ThemeItem = {
        id: 0,
        name: 'Default',
        isPremium: false,
      };
      themes.unshift(defaultTheme);

      setThemesData(themes);
    });
  }, []);

  return themesData;
}
