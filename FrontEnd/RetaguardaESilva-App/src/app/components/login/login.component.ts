import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [DatePipe],
})
export class LoginComponent implements OnInit {
  baseURL = environment.apiURL + 'api/Login';
  login = {} as Usuario;
  loginRetorno!: Usuario;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService,  private spinner: NgxSpinnerService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  public logar(): void {
    this.spinner.show();
    if(this.form.valid){
      this.login = {...this.form.value};
      this.authService.fazerLogin(this.login).subscribe((loginRetorno) => {
        sessionStorage.setItem('loginRetorno', JSON.stringify(loginRetorno));
        this.router.navigate(['home']);
      },
      (error: any) => {
        console.error(error);
        this.spinner.hide();
        this.toastr.error(error.error);
      },
      () => this.spinner.hide()
    );
  }
}
}
