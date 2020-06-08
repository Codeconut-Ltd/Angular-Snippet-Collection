import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component( {
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AbstractComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Template directive performance optimisation.
   */
  trackByFn( index: number, item: any ) {
    return index;
  }

}
