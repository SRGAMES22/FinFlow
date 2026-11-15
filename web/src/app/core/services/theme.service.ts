import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'mercenary';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme = signal<Theme>(this.getStoredTheme());

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      this.applyTheme(theme);
      localStorage.setItem('finflow-theme', theme);
    });
  }

  private getStoredTheme(): Theme {
    const stored = localStorage.getItem('finflow-theme') as Theme;
    return stored || 'light';
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }

  private applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-mercenary');
    root.classList.add(`theme-${theme}`);
  }

  isMercenaryAvailable(subscriptionType: string): boolean {
    return subscriptionType === 'mercenary';
  }
}
