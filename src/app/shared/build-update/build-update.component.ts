import { ApplicationRef, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';

interface EventVersion {
  hash: string
  appData: any
}

interface SwUpdateEvent {
  type: string,
  version: EventVersion
  currentVersion: EventVersion
  latestVersion: EventVersion
  error: any
}

@Component({
  selector: 'app-build-update',
  templateUrl: './build-update.component.html',
  styleUrls: ['./build-update.component.scss']
})
export class BuildUpdateComponent {

  appName = 'SQL2Object'

  updateDetected$ = this.updates.versionUpdates
    .pipe(
      tap(event => {
        switch (event.type) {
          case 'VERSION_DETECTED':
            console.log('New version detected', (<SwUpdateEvent>event).version);
            break;
          case 'VERSION_READY':
            console.log('Current version is', (<SwUpdateEvent>event).currentVersion);
            console.log('Available version is', (<SwUpdateEvent>event).latestVersion);
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log('Failed error is', event);
            break;
          default:
            console.log('No updates detected.')
            break;
        }
      }),
      map(event => ({
        versionDetected: event.type === 'VERSION_DETECTED',
        versionReady: event.type === 'VERSION_READY',
        versionInstallationFailed: event.type === 'VERSION_INSTALLATION_FAILED',
      })),
      map(version => ({
        ...version,
        divClass: {
          'update-detected': version.versionDetected,
          'update-ready': version.versionReady,
          'update-failed': version.versionInstallationFailed
        }
      }))
    )

  constructor(private appRef: ApplicationRef, private updates: SwUpdate) {
    if (updates.isEnabled) {
      // Allow the app to stabilize first, before starting
      // polling for updates with `interval()`.
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everyFourHours$ = interval(4 * 60 * 60 * 1000);
      const everyFourHoursOnceAppIsStable$ = concat(appIsStable$, everyFourHours$);

      everyFourHoursOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate())
    }
  }

  reloadPage() {
    this.updates.activateUpdate().then(() => document.location.reload())
  }
}