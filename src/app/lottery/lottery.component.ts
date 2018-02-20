import { Component, OnInit } from '@angular/core';

import { Config } from '../config';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css'],
})
export class LotteryComponent implements OnInit {

  lotteryStarted: boolean = false;
  simulationPaused: boolean = false;

  config: Config = {
    initialAmount: 15,

    costOfTicket: 5,
    dailyNumberOfTickets: 2,

    numberOfDrawnNumbers: 6,
    numberOfAllNumbers: 42,
    prizes: {
      4: 100,
      5: 10000
      6: 1000000
    },

    simulationYears: 1
  };

  luckyNumbers: number[];
  currentAmount: number;
  currentDay: number;

  simInterval: number;

  simulationDays: number;
  readonly daysInYear: number = 365.242199;

  log: string = "";

  constructor() { }

  ngOnInit() {

  }

  loadLottery(lotteryId: number): void {
    switch(parseInt(lotteryId)) {
      case 1:
        this.config = {
          initialAmount: 1000,
          costOfTicket: 10,
          dailyNumberOfTickets: 2,

          numberOfDrawnNumbers: 6,
          numberOfAllNumbers: 42,

          prizes: {
            4: 100,
            5: 10000
            6: 1000000
          },

          simulationYears: 1
        }
        break;
    }
  }

  startSimulation(): void {
    this.lotteryStarted = true;
    this.loadConfigData();

    this.currentDay = 0;
    this.simulation();
  }

  stopSimulation(): void {
    this.lotteryStarted = false;
    clearInterval(this.simInterval);
  }

  pauseSimulation(): void {
    if(this.simulationPaused === false) {
      clearInterval(this.simInterval);
      this.simulationPaused = true;
    }
    else {
      this.simulation();
    }
  }

  simulation(): void {
    this.simulationPaused = false;

    this.simInterval = setInterval(() => {
      this.luckyNumbers = this.generateNumbers();

      for(let i=0; i<this.config.dailyNumberOfTickets; i++) {
        this.draw();
      }

      if(++this.currentDay >= this.simulationDays) {
        clearInterval(this.simInterval);
      }
    }, 1);
  }

  loadConfigData(): void {
    this.currentAmount = this.config.initialAmount;
    this.simulationDays = Math.floor(this.config.simulationYears * this.daysInYear);
  }

  generateNumbers(): number[] {
    let generatedNumbers: number[] = [];

    while(generatedNumbers.length < this.config.numberOfDrawnNumbers) {
      let randomNumber = this.randomInt(1, this.config.numberOfAllNumbers);

      if(generatedNumbers.indexOf(randomNumber) === -1) {
        generatedNumbers.push(randomNumber);
      }
    }

    return generatedNumbers;
  }

  draw(): boolean {
    let hits: number = 0;

    let drawnNumbers: number[] = this.generateNumbers();
    for(let n of drawnNumbers) {
      if(this.luckyNumbers.indexOf(n) !== -1) {
        hits++;
      }
    }

    this.currentAmount -= this.config.costOfTicket;

    for(let hitsNumber in this.config.prizes) {
      if(hits === parseInt(hitsNumber)) {
        this.currentAmount += this.config.prizes[hitsNumber];
        this.log += "Hits: " + hits + "Prize: " + this.config.prizes[hitsNumber] +"\n";
      }
    }

    return true;
  }

  randomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
