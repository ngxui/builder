import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { BlumaDemoComponent } from './app/app.component';

bootstrapApplication(BlumaDemoComponent, appConfig).catch((err) =>
  console.error(err)
);
