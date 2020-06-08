# Angular 9 snippets

- [About](#about)
- [Components](#components)
- [Directives](#directives)
- [Services](#services)

<br>

---


<br><br>

## About

Collection of small helper components, directives and services that might be published in a more convenient format via NPM in the future.

> For now I don't have the time to do better than just list those lose code snippets here. Use at your own risk!

*Tested with Angular 8-9*


### Installation

Manually copy and integrate these files in your own Angular setup.

Make sure to set the correct import paths for requirements.
Some classes need to be integrated in the main application module and component.
Watch out for 'todo' comments where custom data is required.


<br><br>

---

## Components

### AbstractComponent

Use with view components. Applies `trackByFn` to improve list rendering performance.

#### Example

Component

```ts
import { AbstractComponent } from 'abstract.component';

@Component(...)
export class UiNavigationFooterComponent extends AbstractComponent {
...
```

View

```html
<ul>
  <li *ngFor="let item of items; trackBy: trackByFn">{{item.id}}</li>
</ul>
```

<br><br>

---

## Directives

### GoogleAnalytics / TrackEventDirective

Allow to track custom events via Google Analytics.

#### Requirements

Services
- GoogleAnalyticsEventsService

#### Example

```html
<a [appTrackEvent]="['UI module', 'Click', link.name, 1]">Link</a>
```

<br><br>

---

## Services

### Cookie consent / CookieConsentService
#### Requirements

- global.d.ts

Services
- UserTrackPreferenceService

External
- [CookieConsent - Osano](https://www.npmjs.com/package/cookieconsent)

#### Example

---

### Google Analytics / GoogleAnalyticsService
#### Requirements

#### Requirements

- index.html
- global.d.ts

Services
- CookieConsentService
- GoogleAnalyticsEventsService


#### Example

---

### Google Analytics events / GoogleAnalyticsEventsService

Allows to track custom and navigation change events.
Custom events can be tracked via `TrackEventDirective`.

#### Example

```ts
export class ExampleComponent {
  constructor( private googleAnalyticsEventsService: GoogleAnalyticsEventsService ) {
  }

  track( event: any ) {
    const eventData = ['UI module', 'Click', 'EVENT VALUE', 1];

    this.googleAnalyticsEventsService.trackCustomEvent( eventData );
  }
}
```


---

### User color scheme / UserColorSchemeService
#### Requirements
#### Example

---

### User track preference / UserTrackPreferenceService
#### Requirements
#### Example

