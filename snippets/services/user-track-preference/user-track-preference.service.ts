import { Injectable } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class UserTrackPreferenceService {
  win: any;
  nav: any;

  constructor() {
    this.win = window;
    this.nav = navigator;
  }

  hasDoNotTrackSignal(): boolean {
    const win = this.win;
    const nav = this.nav;

    return !!( win.doNotTrack || nav.doNotTrack )
      && ( win.doNotTrack === '1' || nav.doNotTrack === '1' );
  }
}
