import { environment } from '@env/environment';

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { UserTrackPreferenceService } from 'user-track-preference.service';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  /**
   * Cookieconsent module - Window object reference.
   */
  private windowCookieConsent: any;

  /**
   * Status change Observable.
   */
  private status: any;

  /**
   * Cookieconsent module JS options.
   */
  private options: any;

  constructor(private userTrackPreferenceService: UserTrackPreferenceService) {
    this.windowCookieConsent = window.cookieconsent;
    this.status = new Subject();

    // Manual fix: Handle all animations being removed styles
    // Completely disable JS animation delays when clicking buttons
    this.windowCookieConsent.hasTransition = false;

    this.options = {
      revokable: true,
      location: false,
      law: { regionalLaw: false },
      animate: false,
      animateRevokable: false,
      secure: !!environment.production,
      theme: 'cookieconsent',
      type: 'opt-in',
      content: { // TODO - CHANGE AS NEEDED
        header: 'We use cookies',
        message: '...',
        allow: 'Allow cookies',
        dismiss: 'Decline',
        deny: 'Decline',
        link: 'Cookie policy',
        policy: 'Privacy',
        href: '...',
        target: '_blank',
        close: '&#x274c;',
      },
      onInitialise: this.onInitialise.bind(this),
      onStatusChange: this.onStatusChange.bind(this),
    };
  }

  init() {
    this.windowCookieConsent.initialise(this.options);
  }

  getObservable(): Observable<any> {
    return this.status.asObservable();
  }

  /**
   * User consent is considered always as declined
   * with enabled 'Do not track' in browser.
   */
  hasUserConsentStatus(data: string): boolean {
    const hasDoNotTrackSignal = this.userTrackPreferenceService.hasDoNotTrackSignal();
    const hasConsent = !hasDoNotTrackSignal && (data === 'allow');

    return hasConsent;
  }

  /**
   * By plugin definition, happens once the status cookie exists (NOT on the first run).
   */
  private onInitialise(status: string) {
    const hasConsented = this.hasUserConsentStatus(status);

    this.status.next({ type: 'initialise', data: hasConsented });
  }

  /**
   * By plugin definition, happens on user interaction within the plugin banner.
   */
  private onStatusChange(status: string, chosenBefore: string) {
    const hasConsented = this.hasUserConsentStatus(status);

    this.status.next({ type: 'change', data: hasConsented });
  }
}
