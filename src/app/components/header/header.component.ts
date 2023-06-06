import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getEURUrl, getUSDUrl } from 'src/app/utils/endpoints';
import { forkJoin } from 'rxjs';
import { Currency } from 'src/app/utils/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currencies: Currency[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  getRate = (name: string): number => {
    name = name.toUpperCase();

    const curr: Currency | undefined = this.currencies.find((data: Currency) => {
      return data.cc === name;
    });

    return curr?.rate || 0;
  }

}
