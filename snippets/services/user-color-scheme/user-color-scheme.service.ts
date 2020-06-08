import { environment } from '@env/environment';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserColorSchemeService {
  private win: any;

  // TODO - CHANGE 'PREFIX'
  private cookieName = 'PREFIX-user-color-scheme';

  /**
   * Set if user has set 'dark' mode.
   * Defaults is considered as 'light' mode.
   */
  private isDarkMode: boolean;

  constructor() {
    this.win = window;
    this.isDarkMode = false;

    this.setDefaultColorScheme();
  }

  getColorScheme() {
    return this.isDarkMode;
  }

  setColorScheme(isDarkMode: boolean = true) {
    const htmlElement = document.querySelector('html');
    const cssName = (isDarkMode) ? 'dark' : 'light';

    if (htmlElement) {
      htmlElement.className = 'PREFIX-theme-' + cssName;

      this.isDarkMode = isDarkMode;
      this.setCookie();
    }
  }

  private setDefaultColorScheme() {
    if (this.hasCookie()) {
      this.setFromCookie();
    } else {
      this.setFromUserPreference();
    }

    this.setCookie();
  }

  private setFromUserPreference() {
    const win = this.win;

    this.isDarkMode = (win.matchMedia && win.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  private setFromCookie() {
    this.isDarkMode = document.cookie.includes(`${this.cookieName}=1`);
  }

  private setCookie() {
    const secure = !!environment.production ? 'secure;' : '';
    const cookieDate = new Date();

    cookieDate.setFullYear(cookieDate.getFullYear() + 1);

    document.cookie = `${this.cookieName}=${this.isDarkMode ? '1' : '0'}; ${secure} samesite=strict; expires=${cookieDate.toUTCString()};`;
  }

  private hasCookie() {
    return document.cookie.includes(this.cookieName);
  }
}
