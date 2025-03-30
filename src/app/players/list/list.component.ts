import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiTitle } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, TuiAvatar, TuiCell, TuiTitle],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {}
