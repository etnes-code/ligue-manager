import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@app/login/services/auth.service';
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

export const CUSTOM_ERRORS = {
  required: 'Ce champ est obligatoire.',
  email: 'Veuillez entrer une adresse email valide.',
};

@Component({
  selector: 'app-login-form',
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
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private readonly authService: AuthService = inject(AuthService);

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
