import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { Titulos } from 'src/app/enums/titulos';
import { Login } from 'src/app/models/login';
import { Pedido } from 'src/app/models/pedido';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { _MatOptionBase } from '@angular/material/core';
import { MensagensAlerta } from 'src/app/enums/mensagensAlerta';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { TransportadorService } from 'src/app/services/transportador/transportador.service';
import { Transportador } from 'src/app/models/transportador';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { Produto } from 'src/app/models/produto';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-pedido-criar',
  templateUrl: './pedido-criar.component.html',
  styleUrls: ['./pedido-criar.component.scss']
})
export class PedidoCriarComponent implements OnInit {
  modalRef?: BsModalRef;
  titulo =  Titulos.cadastroPedidos;
  formCliente!: FormGroup;
  formProduto!: FormGroup;
  formQuantidade!: FormGroup;
  public loginUsuario!: Login;
  pedidoNome: Pedido[] = [];
  public clientes: Cliente[] = [];
  public transportadores: Transportador[] = [];
  public produtos: Produto[] = [];
  public produtosSelecionados: Produto[] = [];
  public pedidoProdutos = {} as Produto;
  public produtosGrid: Produto[] = [];
  gerarPedido = {} as Pedido;
  produto = {} as Produto;
  produtoGrid = {} as Produto;
  public produtoControls: FormControl<number | null>[] = [];
  clienteControl = new FormControl('');
  produtoControl = new FormControl('');
  pedidoControl = new FormControl('');
  transportadorControl = new FormControl('');
  filteredClientes!: Observable<Cliente[]>;
  filteredTransportadores!: Observable<Transportador[]>;
  filteredProdutos!: Observable<Produto[]>;
  clienteId!:number;
  transportadorId!:number;
  produtoId!:number;
  produtoIdGrid!: number;
  usuarioId!:number;
  produtoNome!:string;
  inputCliente:boolean = false;
  inputTransportador:boolean = false;
  mostrarProduto:boolean = false;
  mostrarGrid:boolean = false;
  criarPedido:boolean = false;
  botaoExcluir:boolean = false;
  selecionarProduto:boolean = true;
  limiteDeProduto = MensagensAlerta.LimiteDeProduto;
  precoTotalPedido:number = 0;
  produtosQuantidadeMaiorVenda:string = "";

  constructor(private router: Router, private modalService: BsModalService, public titu: TituloService, private fb: FormBuilder, private fbProduto: FormBuilder, private fbPedido: FormBuilder, private produtoService: ProdutoService, private clienteService: ClienteService, private transportadorService: TransportadorService, private pedidoService: PedidoService, private toastr: ToastrService, private spinner: NgxSpinnerService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getClientes();
    this.getTransportadores();
    this.getProdutos();
    this.validationCliente();
    this.validationProduto();
    this.validationQuantidade();
  }

  public getClientes(): void{
    this.clienteService.getClientes(this.authService.empresaId()).subscribe(
      (_clientes: Cliente[]) => {
        this.clientes = _clientes;
        this.filteredClientes = this.clienteControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterClientes(value || '')),
        );
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public getTransportadores(): void{
    this.transportadorService.getTransportadores(this.authService.empresaId()).subscribe(
      (_transportadores: Transportador[]) => {
        this.transportadores = _transportadores;
        this.filteredTransportadores = this.transportadorControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterTransportadores(value || '')),
        );
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public getProdutos(): void{
    this.produtoService.getProdutos(this.authService.empresaId()).subscribe(
      (_produtos: Produto[]) => {
        this.produtos = _produtos;
        this.filteredProdutos = this.produtoControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterProdutos(value || '')),
        );
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  private _filterClientes(value: string): Cliente[] {
    const filterCliente = value.toLowerCase();
    var cliente = this.clientes.filter(cliente => cliente.nome.toLowerCase().includes(filterCliente));
    return cliente;
  }

  private _filterTransportadores(value: string): Transportador[] {
    const filterTransportador = value.toLowerCase();
    var transportador = this.transportadores.filter(transportador => transportador.nome.toLowerCase().includes(filterTransportador));
    return transportador;
  }

  private _filterProdutos(value: string): Produto[] {
    const filterProduto = value.toLowerCase();
    var produto = this.produtos.filter(produto => produto.nome.toLowerCase().includes(filterProduto));
    this._changeDetectorRef.markForCheck();
    return produto;
  }

  public pegarClienteId(id:number){
    const selectedCliente = this.clientes.find(cliente => cliente.id === id);
    if(selectedCliente != null){
      this.clienteId = selectedCliente?.id;
    }
  }

  public pegarTransportadorId(id:number){
    const selectedTransportador = this.transportadores.find(transportador => transportador.id === id);
    if(selectedTransportador != null){
      this.transportadorId = selectedTransportador?.id;
    }
  }

  public pegarProdutoId(id:number){
    this.produtoId = id;
    const selectedProduto = this.produtos.find(produto => produto.id === id);
    if(selectedProduto != null){
      this.pedidoProdutos.id = selectedProduto.id;
      this.pedidoProdutos.nome = selectedProduto.nome;
      this.pedidoProdutos.quantidade = selectedProduto.quantidade;
      this.pedidoProdutos.quantidadeVenda = selectedProduto.quantidadeVenda;
      this.pedidoProdutos.ativo = selectedProduto.ativo;
      this.pedidoProdutos.precoCompra = selectedProduto.precoCompra;
      this.pedidoProdutos.precoVenda = selectedProduto.precoVenda;
      this.pedidoProdutos.precoCompraFormatado = selectedProduto.precoCompraFormatado;
      this.pedidoProdutos.precoVendaFormatado = selectedProduto.precoVendaFormatado;
      this.pedidoProdutos.codigo = selectedProduto.codigo;
      this.pedidoProdutos.dataCadastroProduto = selectedProduto.dataCadastroProduto;
      this.pedidoProdutos.empresaId = selectedProduto.empresaId;
      this.pedidoProdutos.fornecedorId = selectedProduto.fornecedorId;
    }
  }

  onOptionSelectedCliente(event: MatAutocompleteSelectedEvent) {
    if (event.source._keyManager.activeItem) {
      const selectedOptionId = (event.option as _MatOptionBase)._getHostElement().getAttribute('data-id');
      if(selectedOptionId !== null){
        const selectedCliente = this.clientes.find(cliente => cliente.id === parseInt(selectedOptionId, 10));
        if(selectedCliente != null){
          this.clienteId = selectedCliente.id;
        }
      }
    }
  }

  onOptionSelectedTransportador(event: MatAutocompleteSelectedEvent) {
    if (event.source._keyManager.activeItem) {
      const selectedOptionId = (event.option as _MatOptionBase)._getHostElement().getAttribute('data-id');
      if(selectedOptionId !== null){
        const selectedTransportador = this.transportadores.find(transportador => transportador.id === parseInt(selectedOptionId, 10));
        if(selectedTransportador != null){
          this.transportadorId = selectedTransportador.id;
        }
      }
    }
  }

  onOptionSelectedProduto(event: MatAutocompleteSelectedEvent) {
    if (event.source._keyManager.activeItem) {
      const selectedOptionId = (event.option as _MatOptionBase)._getHostElement().getAttribute('data-id');
      if(selectedOptionId !== null){
        const selectedProduto = this.produtos.find(produto => produto.id === parseInt(selectedOptionId, 10));
        if(selectedProduto != null){
          this.produtoId = selectedProduto.id;
          this.pedidoProdutos.id = selectedProduto.id;
          this.pedidoProdutos.nome = selectedProduto.nome;
          this.pedidoProdutos.quantidade = selectedProduto.quantidade;
          this.pedidoProdutos.quantidadeVenda = selectedProduto.quantidadeVenda;
          this.pedidoProdutos.ativo = selectedProduto.ativo;
          this.pedidoProdutos.precoCompra = selectedProduto.precoCompra;
          this.pedidoProdutos.precoVenda = selectedProduto.precoVenda;
          this.pedidoProdutos.precoCompraFormatado = selectedProduto.precoCompraFormatado;
          this.pedidoProdutos.precoVendaFormatado = selectedProduto.precoVendaFormatado;
          this.pedidoProdutos.codigo = selectedProduto.codigo;
          this.pedidoProdutos.dataCadastroProduto = selectedProduto.dataCadastroProduto;
          this.pedidoProdutos.empresaId = selectedProduto.empresaId;
          this.pedidoProdutos.fornecedorId = selectedProduto.fornecedorId;
        }
      }
    }
  }

  public VerificaIdCliente(id:number):boolean{
    let retorno:boolean = false;
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].id === id) {
        retorno = true;
        break;
      }else{
        retorno = false;
      }
    }
    return retorno;
  }

  public VerificaIdTransportador(id:number):boolean{
    let retorno:boolean = false;
    for (let i = 0; i < this.transportadores.length; i++) {
      if (this.transportadores[i].id === id) {
        retorno = true;
        break;
      }else{
        retorno = false;
      }
    }
    return retorno;
  }

  public VerificaIdProduto(id:number):boolean{
    let retorno:boolean = false;
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].id === id) {
        retorno = true;
        break;
      }else{
        retorno = false;
      }
    }
    return retorno;
  }

  public SelecionarCliente(){
    var clienteTransportadorNome = {...this.formCliente.value};
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].nome === clienteTransportadorNome.clienteNome && this.clientes[i].id === this.clienteId) {
        this.mostrarProduto = true;
        this.inputCliente = true;
        this.inputTransportador = true;
        break;
      }else{
        this.mostrarProduto = false;
      }
    }

    for (let i = 0; i < this.clientes.length; i++) {
      if (this.transportadores[i].nome === clienteTransportadorNome.transportadorNome && this.transportadores[i].id === this.transportadorId) {
        this.mostrarProduto = true;
        break;
      }else{
        this.mostrarProduto = false;
      }
    }

  }

  public SelecionarProduto(){
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].nome === this.produto.nome && this.produtos[i].id === this.produtoId) {
        const produtoPedido = {
          id: this.pedidoProdutos.id,
          nome: this.pedidoProdutos.nome,
          quantidade: this.pedidoProdutos.quantidade,
          quantidadeVenda: this.pedidoProdutos.quantidadeVenda,
          ativo: this.pedidoProdutos.ativo,
          precoCompra: this.pedidoProdutos.precoCompra,
          precoVenda: this.pedidoProdutos.precoVenda,
          precoTotal: this.pedidoProdutos.precoCompra,
          precoVendaTotal: this.pedidoProdutos.precoVendaTotal,
          precoCompraFormatado: this.pedidoProdutos.precoCompraFormatado,
          precoVendaFormatado: this.pedidoProdutos.precoVendaFormatado,
          codigo: this.pedidoProdutos.codigo,
          dataCadastroProduto: this.pedidoProdutos.dataCadastroProduto,
          empresaId: this.pedidoProdutos.empresaId,
          fornecedorId: this.pedidoProdutos.fornecedorId,
          inputProduto: true,
          quantidadeProdutoGrid: false,
          botaoEnviarQuantidade: true,
          botaoEditarQuantidade: false,
          botaoQuantidadeConfirmada: false,
          botaoExcluir: true
        };
          this.produtosGrid.push(produtoPedido);
          this.mostrarGrid = true;
          this.mostrarProduto = true;
          this.criarPedido = false;
          this.formQuantidade.reset();
          this.selecionarProduto = false;
          this.botaoExcluir = true;
          this._changeDetectorRef.markForCheck();
        break;
      }
    }
  }

  openModal(event: any, template: TemplateRef<any>, produtoNome: string, produtoId: number): void {
    event.stopPropagation();
    this.produtoNome = produtoNome;
    this.produtoIdGrid = produtoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    let produtoDelete = this.produtosGrid.findIndex(produto => produto.id === this.produtoIdGrid);
    this.produtosGrid.splice(produtoDelete, 1);
    this.spinner.hide();
    if(this.produtosGrid.length == 0){
      this.mostrarGrid = false;
      this.criarPedido = false;
    }
    let produto = this.produtosSelecionados.find(produto => produto.id === this.produtoIdGrid);
    if(produto != null){
      this.produtos.push(produto);
      this._changeDetectorRef.markForCheck();
    }
    for(let i = 0; i < this.produtosGrid.length; i++){
      if(this.produtosGrid[i].quantidadeVenda == null){
        this.criarPedido = false;
        this.selecionarProduto = false;
        this._changeDetectorRef.markForCheck();
      }else{
        this.criarPedido = true;
        this.selecionarProduto = true;
        this._changeDetectorRef.markForCheck();
      }
      if(this.produtosGrid[i].botaoEnviarQuantidade){
        this.selecionarProduto = false;
      }

      if(this.produtosGrid[i].botaoEditarQuantidade){
        this.selecionarProduto = true;
      }
    }

    if(this.produtosGrid.length == 0){
      this.selecionarProduto = true;
    }
  }

  decline(): void {
    this.modalRef?.hide();

  }

  public CriarPedido(): void {
    this.spinner.show();
      var existeCliente = this.VerificaIdCliente(this.clienteId);
      var existeTransportador = this.VerificaIdTransportador(this.transportadorId);
      if(existeCliente && existeTransportador && this.authService.idDoUsuarioLogado() && this.produtosGrid.length != null && this.produtosQuantidadeMaiorVenda.length == 0){
        this.gerarPedido.produtos = [];
        this.preencherPedido(this.produtosGrid);
        this.pedidoService.addPedido(this.gerarPedido).subscribe(() => {
          this.router.navigate(['pedidos/lista']);
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error(error.error);
        },
        () => this.spinner.hide()
      );
      }else if(this.produtosQuantidadeMaiorVenda){
        this.spinner.hide();
          this.toastr.error(MensagensAlerta.QuantidadeVendaMaior);
      }
      else{
          this.spinner.hide();
          this.toastr.error(MensagensAlerta.ClienteTransportadorUsuarioInexistente);
      }
      () => this.spinner.hide()
    }

    public preencherPedido(produtos:Produto[]){
      for (let i = 0; i < produtos.length; i++) {
        const produtoPedido = {
          id: produtos[i].id,
          nome: produtos[i].nome,
          quantidade: produtos[i].quantidade,
          quantidadeVenda: produtos[i].quantidadeVenda,
          ativo: produtos[i].ativo,
          precoCompra: produtos[i].precoCompra,
          precoVenda: produtos[i].precoVenda,
          precoCompraFormatado: produtos[i].precoCompraFormatado,
          precoVendaFormatado: produtos[i].precoVendaFormatado,
          precoVendaTotal: produtos[i].precoVendaTotal,
          codigo: produtos[i].codigo,
          dataCadastroProduto: produtos[i].dataCadastroProduto,
          empresaId: produtos[i].empresaId,
          fornecedorId: produtos[i].fornecedorId,
          inputProduto: produtos[i].inputProduto,
          quantidadeProdutoGrid: produtos[i].quantidadeProdutoGrid,
          botaoEnviarQuantidade: produtos[i].botaoEnviarQuantidade,
          botaoEditarQuantidade: produtos[i].botaoEditarQuantidade,
          botaoQuantidadeConfirmada: produtos[i].botaoQuantidadeConfirmada,
          botaoExcluir: produtos[i].botaoExcluir,
          precoTotal: produtos[i].precoVenda * produtos[i].quantidadeVenda
        };
        this.precoTotalPedido += produtoPedido.precoTotal;
        this.gerarPedido.produtos.push(produtoPedido);
      }
      this.gerarPedido.clienteId = this.clienteId;
      this.gerarPedido.transportadorId = this.transportadorId;
      this.gerarPedido.dataCadastroPedido = new Date().toISOString().split('T')[0];
      this.gerarPedido.usuarioId = this.authService.idDoUsuarioLogado();
      this.gerarPedido.empresaId = this.authService.empresaId();
      this.gerarPedido.precoTotal = this.precoTotalPedido;
    }

    EnviarQuantidade(id:number): void {
      var quantidadeVenda = this.formQuantidade.get('quantidadeVenda')?.value;
      this.verificaQuantidadeProduto(quantidadeVenda, id);
      if(this.produtosQuantidadeMaiorVenda.length == 0){
        const quantidadeVendaString = quantidadeVenda.toString();
        if(quantidadeVendaString.charAt(0) === '0'){
          this.toastr.error(MensagensAlerta.ZeroQuantidade);
        }else{
          let produto = this.produtosGrid.findIndex(produto => produto.id === id);
          this.produtosGrid[produto].quantidadeVenda = quantidadeVenda;
          this.produtosGrid[produto].quantidadeProdutoGrid = true;
          this.produtosGrid[produto].botaoEditarQuantidade = true;
          this.produtosGrid[produto].botaoQuantidadeConfirmada = true;
          this.produtosGrid[produto].inputProduto = false;
          this.selecionarProduto = true;
          this.criarPedido = true;
          var produtoSelecionadoGrid = this.produtos.filter(p => p.id == id);
          this.produtosSelecionados.push(produtoSelecionadoGrid[0]);
          for(let i = 0; i < this.produtosGrid.length; i++){
            this.produtosGrid[i].botaoEditarQuantidade = true;
            this.produtosGrid[i].botaoExcluir = true;
            if(this.produtosGrid[i].quantidadeVenda == null){
              this.formQuantidade.reset();
              this.produtosGrid[i].inputProduto = true;
              this.criarPedido = false;
              this._changeDetectorRef.markForCheck();
            }
          }
          this.produtos = this.produtos.filter(p => p.id != id);
          this._changeDetectorRef.markForCheck();
        }
        this._changeDetectorRef.markForCheck();
      }else{
        this.toastr.error(MensagensAlerta.QuantidadeVendaMaior + this.produtosQuantidadeMaiorVenda);
        this.produtosQuantidadeMaiorVenda = '';
      }
    }

    public verificaQuantidadeProduto(quantidade:number, id:number):string{
      var produto = this.produtos.find(p => p.id == id);
      var produtoGrid = this.produtosGrid.find(p => p.id == id);
      if(produto != null){
        if(quantidade > produto.quantidade){
          this.produtosQuantidadeMaiorVenda = produto.nome;
        }
      }else if(produtoGrid != null){
        if(quantidade > produtoGrid.quantidade){
          this.produtosQuantidadeMaiorVenda = produtoGrid.nome;
        }
      }
      return this.produtosQuantidadeMaiorVenda;
    }

    EditarQuantidade(id:number): void {
      this.selecionarProduto = false;
      this.criarPedido = false;
      for(var i = 0; i < this.produtosGrid.length; i++){
        if(this.produtosGrid[i].id == id){
          this.formQuantidade.patchValue({
            quantidadeVenda: this.produtosGrid[i].quantidadeVenda
          });
          this.produtosGrid[i].inputProduto = true;
          this.produtosGrid[i].quantidadeProdutoGrid = false;
          this.produtosGrid[i].botaoEditarQuantidade = false;
          this.produtosGrid[i].botaoQuantidadeConfirmada = false;
          this.produtosGrid[i].botaoExcluir = false;
        }else{
          this.produtosGrid[i].inputProduto = false;
          this.produtosGrid[i].botaoEditarQuantidade = false;
          this.produtosGrid[i].botaoExcluir = false;
        }
      }
    }

  get f(): any {
    return this.formCliente.controls;
  }

  get p(): any {
    return this.formProduto.controls;
  }

  get pe(): any{
    return this.formQuantidade.controls;
  }

  public cssValidatorCliente(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public cssValidatorProduto(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public cssValidatorQuantidade(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  somenteNumeros(e: any):boolean {
    let charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace
    // charCode 9 = tab

    if (charCode != 8 && charCode != 9) {
      // charCode 48 equivale a 0
      // charCode 57 equivale a 9
      let max = 10;

      if ((charCode < 48 || charCode > 57)||(e.target.value.length >= max)) return false;
    }
    return true;
  }

  public Voltar(){
    this.router.navigate(['pedidos/lista']);
  }

  public validationCliente(): void {
    this.formCliente = this.fb.group({
      clienteNome: [null, Validators.required],
      transportadorNome: [null, Validators.required]
    });
  }

  public validationProduto(): void {
    this.formProduto = this.fbProduto.group({
      nome: [null, Validators.required]
    });
  }

  public validationQuantidade(): void {
    this.formQuantidade = this.fbPedido.group({
      quantidadeVenda: [null, Validators.required]
    });
  }

  permissoesDeTela(){
    this.authService.verificaAdministrador();
    this.authService.visualizarCliente();
    this.authService.visualizarEstoque();
    this.authService.visualizarEnderecoProduto();
    this.authService.visualizarFornecedor();
    this.authService.visualizarFuncionario();
    this.authService.visualizarProduto();
    this.authService.visualizarTransportador();
    this.authService.visualizarRelatorio();
    this.authService.visualizarUsuario();
    this.authService.visualizarPedido();
    this.authService.visualizarNotaFiscal();
    this.authService.visualizarRelatorio();
    this.nav.hide();
    this.titu.hide();
    this.titu.showTitulo();
  }

}
