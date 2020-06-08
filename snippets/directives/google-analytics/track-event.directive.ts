import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { GoogleAnalyticsEventsService } from 'google-analytics-events.service';

@Directive({
  selector: '[appTrackEvent]',
})
export class TrackEventDirective {
  /**
   * Property binding to retrieve Google Analytics tracking data.
   * Format: [Category, Action, Label, Value]
   */
  @Input() appTrackEvent: Array<number | string> = [];

  constructor(private el: ElementRef, private googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
  }

  @HostListener('click') onClick() {
    const trackData = this.appTrackEvent;

    if (trackData.length) {
      this.googleAnalyticsEventsService.trackCustomEvent(trackData);
    }
  }
}
