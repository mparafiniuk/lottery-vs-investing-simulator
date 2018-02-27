import { Component, OnInit } from '@angular/core';

import { LotteryConfig } form 'investing.config';

@Component({
  selector: 'app-investing',
  templateUrl: './investing.component.html',
  styleUrls: ['./investing.component.css']
})
export class InvestingComponent {

  config: InvestingConfig = {
    rateOfReturn: 4,

    periodicContribution: 100,
    contributionFrequency: 1
  };

  currentAmount: number;

  setCurrentAmount(amount: number): void {
    this.currentAmount = amount;
  }

  start(): void {
    console.log('a');
  }
}
