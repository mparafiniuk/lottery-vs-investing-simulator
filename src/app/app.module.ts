import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { LotteryComponent } from './lottery/lottery.component';
import { ConfigComponent } from './config/config.component';
import { InvestingComponent } from './investing/investing.component';
import { SimulationComponent } from './simulation/simulation.component';


@NgModule({
  declarations: [
    AppComponent,
    LotteryComponent,
    ConfigComponent,
    InvestingComponent,
    SimulationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatProgressBarModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
