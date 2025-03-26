import { Component, inject } from '@angular/core';
import { TUI_DARK_MODE, TUI_DARK_MODE_KEY, TuiButton } from '@taiga-ui/core';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';

@Component({
  selector: 'app-dark-mode',
  imports: [TuiButton],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss',
})
export class DarkModeComponent {
  protected readonly darkMode = inject(TUI_DARK_MODE);
  private readonly key = inject(TUI_DARK_MODE_KEY);
  private readonly storage = inject(WA_LOCAL_STORAGE);
  private readonly media = inject(WA_WINDOW).matchMedia(
    '(prefers-color-scheme: dark)'
  );

  reset(): void {
    this.darkMode.set(this.media.matches);
    this.storage.removeItem(this.key);
  }
}
