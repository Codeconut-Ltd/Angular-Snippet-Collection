import { environment } from '@env/environment';

import { Injectable } from '@angular/core';

import { CookieConsentService } from 'cookie-consent.service';
import { GoogleAnalyticsEventsService } from 'google-analytics-events.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private trackingId: string;
  private dataLayerName: string;
  private trackingBaseUrl: string;
  private libraryHasLoadedOnce: boolean;
  private gtag: (...args: any) => {};

  constructor(private cookieConsentService: CookieConsentService, private googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
    // TODO - CHANGE AS NEEDED
    this.dataLayerName = 'dataLayer_EXAMPLE';

    this.trackingId = environment.googleAnalyticsId;
    this.trackingBaseUrl = `https://www.googletagmanager.com/gtag/js`;
    this.libraryHasLoadedOnce = false;
    this.gtag = window.gtag;

    this.cookieConsentService.getObservable()
      .subscribe({
        next: this.toggleAnalytics.bind(this)
      });
  }

  /**
   * Observable callback.
   */
  private toggleAnalytics(status: any) {
    const isActive = !!status.data;

    if (isActive) {
      this.enableTracking();
    } else {
      this.disableTracking();
    }
  }

  /**
   * Make sure to execute only once after a preceding status change.
   *
   * @code Snippet:
   *   window[`ga-disable-${this.trackingId}`] = false;
   */
  private enableTracking() {
    if (this.libraryHasLoadedOnce) {
      return;
    }

    this.libraryHasLoadedOnce = true;

    this.setTrackingVariableEnabled();
    this.trackInitialParameters();
    this.loadScript();

    this.googleAnalyticsEventsService.init();
  }

  /**
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/user-opt-out
   * @code Snippet:
   *   window[`ga-disable-${this.trackingId}`] = true;
   *   window[this.dataLayerName] = [];
   */
  private disableTracking() {
    (window as { [key: string]: any })[`ga-disable-${this.trackingId}`] = true;
    (window as { [key: string]: any })[this.dataLayerName] = [];
  }

  private setTrackingVariableEnabled() {
    (window as { [key: string]: any })[`ga-disable-${this.trackingId}`] = false;
  }

  /**
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/display-features
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/ip-anonymization
   */
  private trackInitialParameters() {
    const id = this.trackingId;

    this.gtag('js', new Date());
    this.gtag('config', id, {
      anonymize_ip: true,
      allow_google_signals: false
    });
  }

  private loadScript() {
    const element = document.createElement('script');

    element.src = this.trackingBaseUrl + '?id=' + this.trackingId + '&l=' + this.dataLayerName;
    element.id = this.trackingId;
    element.async = true;

    document.head.appendChild(element);
  }
}
