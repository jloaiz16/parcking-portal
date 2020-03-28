import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { Routing } from './app-routing.module';
import { AppLayoutModule } from './layouts/app-layout/app-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AuthenticationService } from './core/authentication/authentication.service';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    Routing,
    AppLayoutModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthenticationService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {}
