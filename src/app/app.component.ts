import { TuiButton, TuiRoot } from "@taiga-ui/core";
import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot, TuiButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Quick-start-angular-template';
  @HostBinding('attr.app-version') appVersionAttr = environment.appVersion;
}
