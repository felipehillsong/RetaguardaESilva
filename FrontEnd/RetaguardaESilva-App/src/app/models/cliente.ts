export interface Cliente {
  id: number;
  nome: string;
  logradouro: string;
  localidade: string;
  bairro: string;
  numero: string;
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
