import { Component, OnInit, ViewChild } from '@angular/core';

import { SimulationConfig } from './simulation.config';
import { LotteryComponent } from '../lottery/lottery.component';
import { InvestingComponent } from '../investing/investing.component';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  @ViewChild(LotteryComponent)
  private lotteryComponent: LotteryComponent;

  @ViewChild(InvestingComponent)
  private investingComponent: InvestingComponent;

  simulationStarted: boolean = false;
  simulationPaused: boolean = false;

  readonly daysInYear: number = 365.242199;

  config: SimulationConfig = {
    simYears: 1,
    clockInterval: 20,
    initialAmount: 1000
  };

  simClock: number;
  simDays: number;
  currentDay: number;
  simProgress: number;

  constructor() { }

  ngOnInit() {
  }

  loadConfig(): void {
    this.simDays = Math.floor(this.config.simYears * this.daysInYear);

    this.lotteryComponent.setCurrentAmount(this.config.initialAmount);
    this.investingComponent.setCurrentAmount(this.config.initialAmount);
    this.investingComponent.setCurrentDayToZero();
  }

  startSimulation(): void {
    this.loadConfig();
    this.simulationStarted = true;

    this.currentDay = 0;
    this.start();
  }

  stopSimulation(): void {
    this.simulationStarted = false;
    clearInterval(this.simClock);
  }

  pauseSimulation(): void {
    if(this.simulationPaused === false) {
      clearInterval(this.simClock);
      this.simulationPaused = true;
    }
    else {
      this.simulationPaused = false;
      this.start();
    }
  }

  start(): void {
    this.simClock = setInterval(() => {
      if(++this.currentDay >= this.simDays) {
        clearInterval(this.simClock);
      }
      this.simProgress = Math.round(this.currentDay / this.simDays * 100);

      this.lotteryComponent.simulationCycle();
      this.investingComponent.simulationCycle();
    }, this.config.clockInterval);
  }

}
