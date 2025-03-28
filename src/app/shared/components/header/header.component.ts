import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiGroup } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';
import { TuiBlock } from '@taiga-ui/kit';
import { DarkModeComponent } from '../dark-mode/dark-mode.component';

@Component({
  selector: 'app-header',
  imports: [TuiNavigation, TuiGroup, TuiBlock, DarkModeComponent],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
