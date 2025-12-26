import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../../../core/services/auth.service';
import { MatIcon } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon
],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  hide = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = '';

    this.http.post<any>('/api/auth/login', this.loginForm.value)
      .subscribe({
        next: (res) => {
          this.authService.setToken(res.token);
          this.router.navigate(['/products']);
        },
        error: () => {
          this.errorMessage = 'Invalid username or password';
        }
      });
  }
}
