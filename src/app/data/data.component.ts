import { Component, OnInit } from '@angular/core';
import { FetchdataService } from 'src/services/fetchdata.service';
import { GetherService } from 'src/services/gether.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  stockNames: string[] = [];
  companyHtml: string = '';
  priceSummary: string = '';
  companyEssential: string = '';
  finstar: string = '';
  companyName = '';
  essentialData: any[] = [];
  data: any[] = [];
  constructor(
    private gatherDataService: GetherService,
    private companyDataService: FetchdataService
  ) {}

  ngOnInit() {
    this.gatherDataService.stockNames$.subscribe((names) => {
      this.stockNames = names;
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file: File = (input.files as FileList)[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const csv: string = e.target.result;
        this.extractStockNames(csv);
        this.fetchDataForStockNames();
      };
      reader.readAsText(file);
    }
    console.log('hii');
  }

  extractStockNames(csv: string) {
    const lines: string[] = csv.split('\n');
    const stockNameColumnIndex = 2;
    const stockNames: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const columns: string[] = lines[i].split(',');
      if (columns.length > stockNameColumnIndex) {
        const stockName = columns[stockNameColumnIndex].trim();
        console.log(stockName);
        stockNames.push(stockName);
      }
    }
    this.gatherDataService.updateStockNames(stockNames);
  }

  fetchDataForStockNames() {
    for (const companyName of this.stockNames) {
      this.fetchDataForCompany(companyName);
    }
  }

  private fetchDataForCompany(companyName: string) {
    this.companyDataService.scrapeCompanyData(companyName).subscribe(
      (data: any) => {
        console.log(`Data for ${companyName}:`, data);
        this.data.push(data);
      },
      (error) => {
        console.error(`Error fetching data for ${companyName}:`, error);
      }
    );
  }
}
