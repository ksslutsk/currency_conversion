import { Component, Input, OnInit } from '@angular/core';
import { Currency, Operands } from 'src/app/utils/models';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {

  @Input() currencies: Currency[] = [];

  operands: Operands = {
    left: {
      rate: 1,
      value: ''
    },
    right: {
      rate: 1,
      value: ''
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  onChangeSelection = (side: boolean, value: string): void => {
    value = value.toUpperCase();
    const currency: Currency | undefined = this.currencies.find((data: Currency) => {
      return data.cc === value;
    });

    if (!side) {
      this.operands.left.rate = currency?.rate || 1;
    }
    else {
      this.operands.right.rate = currency?.rate || 1;
    }
  }

  //доробити
  onLeftInput = (value: number) => {
    console.log(this.operands);
    this.operands.right.value = (value * (this.operands.left.rate / this.operands.right.rate)).toFixed(2);
  }

  onRightInput = (value: number) => {
    console.log(this.operands);
    this.operands.left.value = (value * (this.operands.right.rate / this.operands.left.rate)).toFixed(2);
  }
}
