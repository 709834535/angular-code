import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {COUNTRIES} from "./countries";
import {CountryService} from "./country.service";
import {DecimalPipe} from "@angular/common";
import {Observable} from "rxjs";
import {Country} from "./country";
import {SortEvent, SorttblDirective} from "./sorttbl.directive";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountryService, DecimalPipe]
})
export class CountryComponent implements OnInit {


  countries$: Observable<Country[]>;
  total$: Observable<number>;


  @ViewChildren(SorttblDirective) headers: QueryList<SorttblDirective>;
  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {
  }

}
