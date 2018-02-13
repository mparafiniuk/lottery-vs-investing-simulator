import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Config } from '../config';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css'],
  imports: [FormsModule]
})
export class LotteryComponent implements OnInit {

  // TODO:
  // lottery options:

  // start/stop button
  // option to select popular lotteries
  // exclude duplicates when generating numbers
  // configuration of prizes

  lotteryStarted: boolean = false;
  config: Config = {
    initialAmount: 15,
    costOfTicket: 5,
    dailyNumberOfTickets: 2,
    numberOfDrawnNumbers: 6,
    numberOfAllNumbers: 42
  };

  luckyNumbers: number[];
  currentAmount: number;

  simInterval: number;

  log: string[] = "";

  constructor() { }

  ngOnInit() {

  }

  startSimulation(): void {
    if(this.lotteryStarted === true) {
      this.lotteryStarted = false;
      clearInterval(this.simInterval);
    }
    else {
      this.lotteryStarted = true;
      this.loadConfigData();

      this.simInterval = setInterval(() => {
        this.luckyNumbers = this.generateNumbers();

        for(let i=0; i<this.config.dailyNumberOfTickets; i++) {
          this.draw();
        }
      }, 20);
    }
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
