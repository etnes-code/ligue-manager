import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiLoader,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS, TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { LoginService } from './login.service';

export const CUSTOM_ERRORS = {
  required: 'Ce champ est obligatoire.',
  email: 'Veuillez entrer une adresse email valide.',
};

@Component({
  selector: 'app-login-form',
  styles: [
    `
      .container {
        display: flex;
        justify-content: center; /* Centre horizontalement */
        align-items: center; /* Centre verticalement */
        height: 100vh; /* Prend toute la hauteur de la fenêtre */
      }
    `,
  ],
  template: `
    <tui-loader [overlay]="true" [showLoader]="loading">
      <div class="container">
        <form
          (ngSubmit)="submit()"
          tuiAppearance="floating"
          tuiCardLarge
          tuiForm="m"
          [formGroup]="form"
          [style.max-width.em]="32"
          [style.grid-column]="'2 / span 7'"
          [style.margin-top.rem]="1">
          <header tuiHeader>
            <h2 tuiTitle>Connexion admin</h2>
          </header>
          <tui-textfield>
            <label tuiLabel for="username">username</label>
            <input formControlName="username" tuiTextfield />
          </tui-textfield>
          <tui-error
            formControlName="username"
            [error]="['required'] | tuiFieldError | async" />
          <ng-container>
            <tui-textfield>
              <label tuiLabel for="password">Mot de passe</label>
              <input formControlName="password" tuiTextfield type="password" />
            </tui-textfield>
            <tui-error
              formControlName="password"
              [error]="['required'] | tuiFieldError | async" />
          </ng-container>
          <footer>
            <button appearance="secondary" tuiButton type="button">
              Cancel
            </button>
            <button tuiButton type="submit">Submit</button>
          </footer>
        </form>
      </div>
    </tui-loader>
  `,
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TuiHeader,
    TuiLoader,
    TuiTextfield,
    TuiTitle,
  ],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: CUSTOM_ERRORS,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService: LoginService = inject(LoginService);

  protected readonly form: FormGroup = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  public loading = false;

  submit() {
    this.loading = true;
    this.authService
      .login(
        this.form.controls['username'].value,
        this.form.controls['password'].value
      )
      .subscribe({
        next: response => {
          console.log(response);
          this.form.reset();
          this.loading = false;
        },
      });
  }
}
