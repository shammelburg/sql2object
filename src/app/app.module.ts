import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CsharpCodeComponent } from './shared/csharp-code/csharp-code.component';
import { TypescriptCodeComponent } from './shared/typescript-code/typescript-code.component';
import { GithubCornerComponent } from './shared/github-corner/github-corner.component';
import { SwiftCodeComponent } from './shared/swift-code/swift-code.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NotifierModule } from 'angular-notifier';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BuildUpdateComponent } from './shared/build-update/build-update.component';
import { AppRoutingModule, routedComponents } from './app-routing-module';

@NgModule({
  declarations: [
    AppComponent,
    CsharpCodeComponent,
    TypescriptCodeComponent,
    GithubCornerComponent,
    SwiftCodeComponent,
    NavbarComponent,
    BuildUpdateComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NotifierModule.withConfig({
      position: {
        horizontal:{
          position: 'middle',
          distance: 20
        },
        vertical: {
          distance: 20,
          position:'top'
        }
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: false,//environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
