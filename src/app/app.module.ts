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

@NgModule({
  declarations: [
    AppComponent,
    CsharpCodeComponent,
    TypescriptCodeComponent,
    GithubCornerComponent,
    SwiftCodeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
