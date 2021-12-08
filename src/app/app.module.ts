import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CsharpCodeComponent } from './shared/csharp-code/csharp-code.component';
import { TypescriptCodeComponent } from './shared/typescript-code/typescript-code.component';

@NgModule({
  declarations: [
    AppComponent,
    CsharpCodeComponent,
    TypescriptCodeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
