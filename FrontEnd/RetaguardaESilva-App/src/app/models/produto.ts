export interface Produto {
    id:number;
    nome:string;
    quantidade:number;
    quantidadeVenda:number;
    ativo:boolean;
    precoCompra:number;
    precoVenda:number;
    precoVendaTotal:number;
    precoTotal:number;
    precoCompraFormatado:string;
    precoVendaFormatado:string;
    codigo:number;
    dataCadastroProduto:string;
    empresaId:number;
    fornecedorId:number;
    inputProduto:boolean;
    quantidadeProdutoGrid:boolean;
    botaoEnviarQuantidade: boolean;
    botaoEditarQuantidade: boolean;
    botaoQuantidadeConfirmada: boolean;
    botaoExcluir: boolean;
}
