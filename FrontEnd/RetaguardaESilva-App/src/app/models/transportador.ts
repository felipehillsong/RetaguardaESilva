export interface Transportador {
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
  cnpj: string;
  inscricaoMunicipal: string;
  inscricaoEstadual: string;
  dataCadastroTransportador: string;
  ativo: boolean;
  empresaId: number;
}
