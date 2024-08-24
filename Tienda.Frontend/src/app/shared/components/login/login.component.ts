import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,private loginServices:AuthService,private router: Router) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Nombre:', formData.name);
      console.log('Contraseña:', formData.password);
      this.loginServices.login(formData.name,formData.password).subscribe(repuesta=>{
        localStorage.setItem("Token", repuesta.Token);
        this.router.navigate(['cliente']);
      },error=>{
        console.error(error);
      })
    } else {
      console.log('Formulario inválido');
    }
  }
}
