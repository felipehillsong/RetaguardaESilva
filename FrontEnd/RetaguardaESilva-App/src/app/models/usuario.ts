import { Permissao } from "./permissao";

export interface Usuario {
  id: number;
  nomeEmpresa: string;
  nome: string;
  email: string;
  senha: string;
  dataCadastroUsuario: string;
  ativo: boolean;
  funcionarioId: number;
  empresaId: number;
  permissoes: Array<Permissao>;
  botaoExcluir:boolean;
}
