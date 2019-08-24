import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule, Injectable } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
//import { HttpClientModule } from '@angular/common/http';
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { environment } from "../environment";
import { IonicStorageModule } from "@ionic/storage";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { DeviceFeedback } from "@ionic-native/device-feedback";
import { TapticEngine } from "@ionic-native/taptic-engine";
import { InAppPurchase } from "@ionic-native/in-app-purchase";
import { LaunchReview } from '@ionic-native/launch-review';
import { KeyPressDirective } from "../directives/key-press/key-press";
import { MathsProvider } from '../providers/maths/maths';
import { SafeEvalProvider } from '../providers/safe-eval/safe-eval';

@Injectable()
export class MyErrorHandler extends IonicErrorHandler {
  constructor() {
    super();
  }
  handleError(err) {
    super.handleError(err);
    console.error(`Error occurred:${err.message}`);
  }
}



@NgModule({
  declarations: [MyApp, HomePage, KeyPressDirective],
  imports: [
    BrowserModule,
    //HttpClientModule,
    //IonicModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp, {
      scrollAssist: false, 
      backButtonText: "Go Back",
      //iconMode: 'imd',
      mode: "md",
      modalEnter: "modal-slide-in",
      modalLeave: "modal-slide-out",
      tabsPlacement: "bottom",
      pageTransition: "md-transition",
      platforms: {
        ios: {
          statusbarPadding: false
        }
      } /*,
       platforms: {
      android: {
        activator: 'none'
      }}
      */
    }),

    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    DeviceFeedback,
    TapticEngine,
    InAppPurchase,
    LaunchReview,
    SplashScreen,
    { provide: ErrorHandler, useClass: MyErrorHandler },
    MathsProvider,
    SafeEvalProvider
  ]
})
export class AppModule {}
