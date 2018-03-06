import { Component, OnInit } from '@angular/core';

import { InvestingConfig } from './investing.config';

@Component({
  selector: 'app-investing',
  templateUrl: './investing.component.html',
  styleUrls: ['./investing.component.css']
})
export class InvestingComponent {

  config: InvestingConfig = {
    rateOfReturn: 4,

    periodicContribution: 100,
    contributionFrequency: 30
  };

  // TODO refactor so that this variable be in only one place instead of two different components
  readonly daysInYear: number = 365.242199;

  currentAmount: number;
  // TODO refactor so that InvestingComponent use currentDay value from SimulationComponent
  currentDay: number;

  dailyProfit: number;

  setCurrentAmount(amount: number): void {
    this.currentAmount = amount;
  }

  setCurrentDayToZero(): void {
    this.currentDay = 0;
    // TODO this is incorrect to only calculate that on simulation start
    // it should be racalculated based on chosen capitalization
    this.dailyProfit = this.calculateDailyProfit();
  }

  simulationCycle(): void {
    this.currentDay++;

    if(this.currentDay % this.config.contributionFrequency == 0) {
      this.currentAmount += this.config.periodicContribution;
    }

    this.currentAmount = this.roundToTwoDecimalPlaces(
        this.currentAmount + this.dailyProfit);
  }

  calculateDailyProfit(): number {
    const dailyRateOfReturn = this.config.rateOfReturn / this.daysInYear;
    const dailyProfit = this.currentAmount * dailyRateOfReturn / 100;

    return this.roundToTwoDecimalPlaces(dailyProfit);
  }

  roundToTwoDecimalPlaces(num: number): number {
    return parseFloat(num.toFixed(2));
  }
}
