export interface Cliente {
  id: number;
  nome: string;
  endereco: string;
  bairro: string;
  numero: string;
  municipio: string;
  uf: string;
  pais: string;
  cep: string;
  complemento: string;
  telefone: string;
  email: string;
  cpfcnpj: string;
  inscricaoMunicipal: string;
  inscricaoEstadual: string;
  dataCadastroCliente: string;
  ativo: boolean;
  empresaId: number;
}
