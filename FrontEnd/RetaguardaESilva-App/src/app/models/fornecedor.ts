import { Produto } from "./produto";

export interface Fornecedor {
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
  cnpj: string;
  inscricaoMunicipal: string;
  inscricaoEstadual: string;
  dataCadastroFornecedor: string;
  ativo: boolean;
  empresaId: number;
  produtos: Array<Produto>;
}
