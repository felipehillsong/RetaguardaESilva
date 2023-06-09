using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetaguardaESilva.Domain.Mensagem
{
    public class MensagemDeAlerta
    {
        public const string ProdutoSemFornecedor = "Produto sem fornecedor";
        public const string ProdutoSemEndereco = "Produto sem endereço";
        public const string PedidoEmAnalise = "Pedido em analise";
        public const string PedidoConfirmado = "Pedido confirmado";
        public const string PedidoCancelado = "Pedido cancelado";
        public const string NotaFiscalAprovada = "Nota fiscal aprovada";
        public const string NotaFiscalCancelada = "Nota fiscal cancelada";
        public const string ClienteExcluido = "Cliente excluído";
    }
}
