import { Component } from '@angular/core';
import { GetherService } from 'src/services/gether.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'stock';

  constructor(private gatherDataService: GetherService) {}
}
