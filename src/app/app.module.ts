import { NotificationsModule } from './../pages/notifications/notifications.module';
import { ChatModule } from './../pages/chat/chat.module';
import { SearchModule } from './../pages/search/search.module';
import { FeedModule } from './../pages/feed/feed.module';
import { getDayPipe } from './../pipes/get-day.pipe';
import { HttpClient } from './../shared/http-client';
import { AuthenticationService } from './../shared/auth/authentication.service';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      monthShortNames: ['janeiro', 'fevereiro', 'mar\u00e7oo', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
      cancelText: 'Cancelar',
      scrollAssist: false,
      autoFocusAssist: false,
      tabSubPages: false,
      tabsHideOnSubPages: false,
    }),
    HttpModule,
    FeedModule,
    SearchModule,
    ChatModule,
    NotificationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    HttpClient,
    { provide: LOCALE_ID, useValue: "pt-PT" },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
