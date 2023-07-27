import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import './environments/disable-console-log';



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
