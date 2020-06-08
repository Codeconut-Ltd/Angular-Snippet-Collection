import { environment } from '@env/environment';

import { Injectable, SecurityContext } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { filter } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )
export class GoogleAnalyticsEventsService {
  private trackingId: string;
  private gtag: ( ...args: any ) => {};

  constructor( private domSanitizer: DomSanitizer, private router: Router ) {
    this.trackingId = environment.googleAnalyticsId;
    this.gtag = window.gtag;
  }

  init() {
    this.router.events
      .pipe( filter( e => e instanceof NavigationEnd ) )
      .subscribe( ( e: any ) => {
        this.trackNavigationChange( e.url );
      } );
  }

  /**
   * @param data Format: [Category, Action, Label, Value]
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
   */
  public trackCustomEvent( data: Array<number | string> ) {
    if ( !window.ga ) {
      return;
    }

    if ( data.length === 4 ) {
      this.gtag( 'event', data[1], {
        event_category: data[0],
        event_label: data[2],
        value: data[3],
        non_interaction: true
      } );
    }
  }

  /**
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/pages
   */
  private trackNavigationChange( currentRoute: string ) {
    if ( !window.ga ) {
      return;
    }

    const url = this.domSanitizer.sanitize( SecurityContext.URL, currentRoute );

    this.gtag( 'config', this.trackingId, {
      page_path: url
    } );
  }
}
