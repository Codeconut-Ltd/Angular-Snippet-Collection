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
   * Warning: Not best practice, just ok in this particular case (e.g. on resorting, indexes might change).
   */
  trackByFn( index: number, item: any ) {
    return index;
  }

}
