export interface Funcionario {
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
  cpf: string;
  dataCadastroFuncionario: string;
  ativo: boolean;
  empresaId: number;
}
