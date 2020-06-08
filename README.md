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

Angular wrapper for the NPM plugin, including a little tweak (yep, dirty) to also respect the 'do not track signal' users might set. In this case, cookies will always be declined. A better way would be to change the cookie banner text as well.

*Todo:* Decouple dependency, optimise display.


#### Requirements

- global.d.ts

Services
- UserTrackPreferenceService

External
- [CookieConsent - Osano](https://www.npmjs.com/package/cookieconsent)

#### Example

---

### Google Analytics / GoogleAnalyticsService

Enables Google Analytics and defines a custom datalayer variable.
Respects user opt-in from 'cookie consent'.

#### Requirements

- index.html
- global.d.ts

Services
- CookieConsentService
- GoogleAnalyticsEventsService

External
- [CookieConsent - Osano](https://www.npmjs.com/package/cookieconsent)


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

Set user color scheme preference as CSS class. It will be stored and loaded from cookie as well. The information is useful for theming websites and applying 'light switches'.

*Todo:* Move to LocalStorage instead, no need for cookies here.

---

### User track preference / UserTrackPreferenceService

Retrieve 'do not track signal' from user settings. Used to disable tracking implementations in other services.

