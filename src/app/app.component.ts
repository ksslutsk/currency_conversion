import { Component } from '@angular/core';
import { Currency } from './utils/models';
import { getEURUrl, getUSDUrl } from './utils/endpoints';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currency_converter';

  currencies: Currency[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    let usd = this.http.get<Currency[]>(getUSDUrl);
    let eur = this.http.get<Currency[]>(getEURUrl);

    forkJoin([usd, eur]).subscribe(data => {
      const usdArray: Currency[] = data[0];
      const eurArray: Currency[] = data[1];

      this.currencies = usdArray.concat(eurArray);
    });
  }
}
