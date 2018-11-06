import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { BackgroundDirective } from './background.directive';
import { DrawableImageViewComponent } from './drawable-image-view/drawable-image-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    BackgroundDirective,
    DrawableImageViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
