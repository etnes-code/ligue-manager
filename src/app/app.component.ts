import { Component, inject } from '@angular/core';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { TUI_DARK_MODE, TuiRoot } from '@taiga-ui/core';
import { TUI_IS_MOBILE } from '@taiga-ui/cdk';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, TuiRoot],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly darkMode = inject(TUI_DARK_MODE);
  protected readonly isMobile = inject(TUI_IS_MOBILE);
}
