import { Component, OnInit } from '@angular/core';

import { LotteryConfig } from './lottery.config';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css'],
})
export class LotteryComponent implements OnInit {

  config: LotteryConfig = {
    initialAmount: 15,

    costOfTicket: 5,
    dailyNumberOfTickets: 2,

    numberOfDrawnNumbers: 6,
    numberOfAllNumbers: 42,
    prizes: {
      4: 100,
      5: 10000,
      6: 1000000
    }
  };

  luckyNumbers: number[];
  currentAmount: number;

  log: string = "";

  constructor() { }

  ngOnInit() {
    this.currentAmount = 15;
  }

  loadLottery(lotteryId: string): void {
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
            5: 10000,
            6: 1000000
          }
        }
        break;
    }
  }

  start(): void {
    this.luckyNumbers = this.generateNumbers();

    for(let i=0; i<this.config.dailyNumberOfTickets; i++) {
      this.draw();
    }
  }

  loadConfigData(): void {
    this.currentAmount = this.config.initialAmount;
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
