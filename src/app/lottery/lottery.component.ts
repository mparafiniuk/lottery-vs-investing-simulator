import { Component, OnInit } from '@angular/core';

import { Config } from '../config';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css'],
})
export class LotteryComponent implements OnInit {

  // TODO:
  // config options:

  // start/stop button
  // progress bar
  // option to select popular lotteries
  // exclude duplicates when generating numbers
  // configuration of prizes

  lotteryStarted: boolean = false;
  config: Config = {
    initialAmount: 15,

    costOfTicket: 5,
    dailyNumberOfTickets: 2,

    numberOfDrawnNumbers: 6,
    numberOfAllNumbers: 42,

    simulationTime: 1
  };

  luckyNumbers: number[];
  currentAmount: number;
  currentDay: number;

  simInterval: number;

  log: string = "";
  readonly daysInYear: number = 365.242199;

  constructor() { }

  ngOnInit() {

  }

  startSimulation(): void {
    let simulationDays = Math.floor(this.config.simulationTime * this.daysInYear);
    console.log(simulationDays);

    this.lotteryStarted = true;
    this.loadConfigData();

    this.currentDay = 0;
    this.simInterval = setInterval(() => {
      this.luckyNumbers = this.generateNumbers();

      for(let i=0; i<this.config.dailyNumberOfTickets; i++) {
        this.draw();
      }

      if(++this.currentDay >= simulationDays) {
        clearInterval(this.simInterval);
      }
    }, 20);
  }

  stopSimulation(): void {
    this.lotteryStarted = false;
    clearInterval(this.simInterval);
  }

  loadConfigData(): void {
    this.currentAmount = this.config.initialAmount;
  }

  generateNumbers(): number[] {
    let generatedNumbers: number[] = [];
    for(let i=0; i<this.config.numberOfDrawnNumbers; i++) {
      generatedNumbers.push(this.randomInt(1,this.config.numberOfAllNumbers));
    }

    return generatedNumbers;
  }

  draw(): boolean {
    let randNr: number;
    let hits: number = 0;

    let drawnNumbers: number[] = this.generateNumbers();
    for(let n of drawnNumbers) {
      if(this.luckyNumbers.indexOf(n) !== -1) {
        hits++;
      }
    }

    this.currentAmount -= this.config.costOfTicket;

    if(hits > 3) {
      this.currentAmount += 1000;
      this.log += "Hits: " + hits + "\n";
    }
    else {
    }

    return true;
  }

  randomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
