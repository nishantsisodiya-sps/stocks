import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetherService {
  private stockNamesSource = new BehaviorSubject<string[]>([]);
  stockNames$ = this.stockNamesSource.asObservable();
  constructor() {}

  updateStockNames(names: string[]) {
    this.stockNamesSource.next(names);
  }
}
