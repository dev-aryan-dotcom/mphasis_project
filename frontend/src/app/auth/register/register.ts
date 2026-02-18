import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-register',
  imports: [FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name =''
  email = ''
  password = ''
  role = ''

    constructor(private auth: AuthService, private router: Router) {}

  register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.auth.register(data).subscribe(() => {
      alert('Registration successful');
      this.router.navigate(['/login']);
    });
  }
}

