import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Senhas } from 'src/app/enums/senhas';
import { AuthGuardsService } from 'src/app/guards/login/AuthGuardsService';
import { Login } from 'src/app/models/login';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/login/auth.service';

import { NavService } from 'src/app/services/nav/nav.service';

@Component({
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.scss'],
  providers: [DatePipe]
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  mostrarMenu!: boolean;
  paramsSub: any;
  nomeDoUsuario!:string;
  modalRef?: BsModalRef;
  usuario = {} as Usuario;
  form!: FormGroup;
  senhaBD!:string;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private auth: AuthGuardsService, private spinner: NgxSpinnerService, public nav: NavService, public authService: AuthService, private modalService: BsModalService, private router: Router, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.validation();
  }

  logout(): void {
    this.auth.clearStorage();
  }

  openModal(event: any, template: TemplateRef<any>): void {
    event.stopPropagation();
    this.usuario = this.authService.dadosDoUsuario();
    this.senhaBD = this.usuario.senha;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm', backdrop: 'static', keyboard : false});
  }

  public validation(): void {
    this.form = this.fb.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      senha: [null],
      repetirSenha: [null]
    });
  }

  get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }


  confirm():void{
    this.spinner.show();
    var senha = this.verificarSenhas(this.form.value.senha, this.form.value.repetirSenha)
    if(senha == Senhas.senhaOriginal){
      if(this.form.valid){
        this.usuario.funcionarioId = this.usuario.funcionarioId;
        this.usuario.nome = this.form.value.nome;
        this.usuario.email = this.form.value.email;
        this.usuario.senha = this.senhaBD;
        this.authService.alterarLogin(this.usuario).subscribe((loginRetorno) => {
          this.nav.show();
          this.modalRef?.hide();
          this.toastr.success("Dados alterados com sucesso");
          sessionStorage.clear();
          sessionStorage.setItem('loginRetorno', JSON.stringify(loginRetorno));
          this.router.navigate(['home']);
          this._changeDetectorRef.markForCheck();
          this.spinner.hide();
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error(error.error);
        },
        () => this.spinner.hide()
      );
    }
    }else if(senha == Senhas.senhaEmBranco){
      if(this.form.valid){
        this.usuario.funcionarioId = this.usuario.funcionarioId;
        this.usuario.nome = this.form.value.nome;
        this.usuario.email = this.form.value.email;
        this.usuario.senha = this.senhaBD;
        this.authService.alterarLogin(this.usuario).subscribe((loginRetorno) => {
          this.nav.show();
          this.modalRef?.hide();
          this.toastr.success("Dados alterados com sucesso");
          sessionStorage.clear();
          sessionStorage.setItem('loginRetorno', JSON.stringify(loginRetorno));
          this.router.navigate(['home']);
          this._changeDetectorRef.markForCheck();
          this.spinner.hide();
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error(error.error);
        },
        () => this.spinner.hide()
      );
    }
    }else if(senha == Senhas.SenhaIgual){
      if(this.form.valid){
        this.usuario.funcionarioId = this.usuario.funcionarioId;
        this.usuario.nome = this.form.value.nome;
        this.usuario.email = this.form.value.email;
        this.usuario.senha = this.form.value.senha;
        this.authService.alterarLogin(this.usuario).subscribe(() => {
          this.nav.hide();
          sessionStorage.clear();
          this.modalRef?.hide();
          this.toastr.success("Dados alterados com sucesso");
          this.router.navigate(['login']);
          this.spinner.hide();
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
    else{
      this.toastr.error("Senhas não conferem");
      this.spinner.hide();
    }
  }

  decline(){
    this.modalRef?.hide();
    this.form.reset();
  }

  verificarSenhas(senha: string, repetirSenha: string):string{
    if(senha == this.senhaBD && repetirSenha == null || senha == this.senhaBD && repetirSenha == ""){
      return Senhas.senhaOriginal;
    }
    else if(senha == null && repetirSenha == null || senha == "" && repetirSenha == null || senha == null && repetirSenha == "" || senha == "" && repetirSenha == ""){
      return Senhas.senhaEmBranco;
    }
    else if(senha == repetirSenha){
      return Senhas.SenhaIgual;
    }else{
      return Senhas.senhaErro;
    }
  }
}
