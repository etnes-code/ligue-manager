import { Component, HostBinding, OnInit } from '@angular/core';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  @HostBinding('attr.app-version') appVersionAttr = environment.appVersion;
  currentYear?: number;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
