import { Component, HostBinding } from '@angular/core';
import { environment } from '@environment/environment';
import { LayoutComponent } from './shared/components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Quick-start-angular-template';
  @HostBinding('attr.app-version') appVersionAttr = environment.appVersion;
}
