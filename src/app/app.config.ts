import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppInterceptor } from './app.interceptor';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimations(),

    provideToastr({}),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ]
};
