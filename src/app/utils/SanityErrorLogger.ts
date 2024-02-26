import { isPlatformBrowser } from '@angular/common';
import { ErrorHandler, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as Sentry from '@sentry/angular-ivy';

@Injectable()
export class SanityErrorLogger implements ErrorHandler {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      Sentry.init({
        dsn: 'https://d35bfe173f18304ab62d559db5e21340@o4505987068723200.ingest.sentry.io/4506747266138112',
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration({
            maskAllText: false,
            blockAllMedia: false,
          }),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Session Replay
        replaysSessionSampleRate: 0.1,
        // This sets the sample rate at 10%.
        // You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0,
      });
    }
  }

  handleError(error: any): void {
    if (isPlatformBrowser(this.platformId)) {
      const eventId = Sentry.captureException(error.originalError || error);
      Sentry.showReportDialog({ eventId });
    }
  }
}
