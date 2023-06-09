﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RetaguardaESilva.Persistence.Data;

#nullable disable

namespace RetaguardaESilva.Persistence.Migrations
{
    [DbContext(typeof(RetaguardaESilvaContext))]
    [Migration("20230213164429_ArrumandoCamposParaTelaDePedido")]
    partial class ArrumandoCamposParaTelaDePedido
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.Cliente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<string>("Bairro")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CPFCNPJ")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Complemento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DataCadastroCliente")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InscricaoEstadual")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InscricaoMunicipal")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Municipio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Numero")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pais")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UF")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Cliente");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.Empresa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<string>("Bairro")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CNPJ")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Complemento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DataCadastroEmpresa")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InscricaoEstadual")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InscricaoMunicipal")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Municipio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Numero")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pais")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UF")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Empresa");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.EnderecoProduto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("DataCadastroEnderecoProduto")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<int>("EstoqueId")
                        .HasColumnType("int");

                    b.Property<string>("NomeEndereco")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProdutoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("EnderecoProduto");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.Estoque", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<int>("FornecedorId")
                        .HasColumnType("int");

                    b.Property<int>("ProdutoId")
                        .HasColumnType("int");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Estoque");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.Fornecedor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<string>("Bairro")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CNPJ")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Complemento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DataCadastroFornecedor")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InscricaoEstadual")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InscricaoMunicipal")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Municipio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Numero")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pais")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UF")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Fornecedor");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.Funcionario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<string>("Bairro")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CPF")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Complemento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DataCadastroFuncionario")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Municipio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Numero")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pais")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UF")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Funcionario");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.NotaFiscal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("ClienteId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DataCadastroNotaFiscal")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<int>("FornecedorId")
                        .HasColumnType("int");

                    b.Property<int>("PedidoNotaId")
                        .HasColumnType("int");

                    b.Property<decimal>("PrecoTotal")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("QuantidadeItens")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("NotaFiscal");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.Pedido", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("ClienteId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DataCadastroPedido")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<int>("FornecedorId")
                        .HasColumnType("int");

                    b.Property<decimal>("PrecoTotal")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("TransportadorId")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Pedido");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.PedidoNota", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("ClienteId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DataCadastroPedidoNota")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<int>("FornecedorId")
                        .HasColumnType("int");

                    b.Property<int>("PedidoId")
                        .HasColumnType("int");

                    b.Property<decimal>("PrecoVenda")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("ProdutoId")
                        .HasColumnType("int");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("PedidoNota");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.Permissao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("ClienteCadastro")
                        .HasColumnType("bit");

                    b.Property<bool>("ClienteDetalhe")
                        .HasColumnType("bit");

                    b.Property<bool>("ClienteEditar")
                        .HasColumnType("bit");

                    b.Property<bool>("ClienteExcluir")
                        .HasColumnType("bit");

                    b.Property<bool>("EmpresaCadastro")
                        .HasColumnType("bit");

                    b.Property<bool>("EmpresaDetalhe")
                        .HasColumnType("bit");

                    b.Property<bool>("EmpresaEditar")
                        .HasColumnType("bit");

                    b.Property<bool>("EmpresaExcluir")
                        .HasColumnType("bit");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<bool>("EnderecoProdutoCadastro")
                        .HasColumnType("bit");

                    b.Property<bool>("EnderecoProdutoDetalhe")
                        .HasColumnType("bit");

                    b.Property<bool>("EnderecoProdutoEditar")
                        .HasColumnType("bit");

                    b.Property<bool>("EnderecoProdutoExcluir")
                        .HasColumnType("bit");

                    b.Property<bool>("EstoqueDetalhe")
                        .HasColumnType("bit");

                    b.Property<bool>("EstoqueEditar")
                        .HasColumnType("bit");

                    b.Property<bool>("EstoqueExcluir")
                        .HasColumnType("bit");

                    b.Property<bool>("FornecedorCadastro")
                        .HasColumnType("bit");

                    b.Property<bool>("FornecedorDetalhe")
                        .HasColumnType("bit");

                    b.Property<bool>("FornecedorEditar")
                        .HasColumnType("bit");

                    b.Property<bool>("FornecedorExcluir")
                        .HasColumnType("bit");

                    b.Property<bool>("FuncionarioCadastro")
                        .HasColumnType("bit");

                    b.Property<bool>("FuncionarioDetalhe")
                        .HasColumnType("bit");

                    b.Property<bool>("FuncionarioEditar")
                        .HasColumnType("bit");

                    b.Property<bool>("FuncionarioExcluir")
                        .HasColumnType("bit");

                    b.Property<bool>("ProdutoCadastro")
                        .HasColumnType("bit");

                    b.Property<bool>("ProdutoDetalhe")
                        .HasColumnType("bit");

                    b.Property<bool>("ProdutoEditar")
                        .HasColumnType("bit");

                    b.Property<bool>("ProdutoExcluir")
                        .HasColumnType("bit");

                    b.Property<bool>("RelatorioCadastro")
                        .HasColumnType("bit");

                    b.Property<bool>("RelatorioDetalhe")
                        .HasColumnType("bit");

                    b.Property<bool>("RelatorioEditar")
                        .HasColumnType("bit");

                    b.Property<bool>("RelatorioExcluir")
                        .HasColumnType("bit");

                    b.Property<bool>("TransportadorCadastro")
                        .HasColumnType("bit");

                    b.Property<bool>("TransportadorDetalhe")
                        .HasColumnType("bit");

                    b.Property<bool>("TransportadorEditar")
                        .HasColumnType("bit");

                    b.Property<bool>("TransportadorExcluir")
                        .HasColumnType("bit");

                    b.Property<bool>("UsuarioCadastro")
                        .HasColumnType("bit");

                    b.Property<bool>("UsuarioEditar")
                        .HasColumnType("bit");

                    b.Property<bool>("UsuarioExcluir")
                        .HasColumnType("bit");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.Property<bool>("UsuarioPermissoes")
                        .HasColumnType("bit");

                    b.Property<bool>("VendaCadastro")
                        .HasColumnType("bit");

                    b.Property<bool>("VendaDetalhe")
                        .HasColumnType("bit");

                    b.Property<bool>("VendaEditar")
                        .HasColumnType("bit");

                    b.Property<bool>("VendaExcluir")
                        .HasColumnType("bit");

                    b.Property<bool>("VisualizarCliente")
                        .HasColumnType("bit");

                    b.Property<bool>("VisualizarEmpresa")
                        .HasColumnType("bit");

                    b.Property<bool>("VisualizarEnderecoProduto")
                        .HasColumnType("bit");

                    b.Property<bool>("VisualizarEstoque")
                        .HasColumnType("bit");

                    b.Property<bool>("VisualizarFornecedor")
                        .HasColumnType("bit");

                    b.Property<bool>("VisualizarFuncionario")
                        .HasColumnType("bit");

                    b.Property<bool>("VisualizarProduto")
                        .HasColumnType("bit");

                    b.Property<bool>("VisualizarRelatorio")
                        .HasColumnType("bit");

                    b.Property<bool>("VisualizarTransportador")
                        .HasColumnType("bit");

                    b.Property<bool>("VisualizarUsuario")
                        .HasColumnType("bit");

                    b.Property<bool>("VisualizarVenda")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Permissao");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.Produto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<double>("Codigo")
                        .HasColumnType("float");

                    b.Property<DateTime?>("DataCadastroProduto")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<int>("FornecedorId")
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("PrecoCompra")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("PrecoVenda")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Produto");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.Transportador", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<string>("Bairro")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CNPJ")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Complemento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DataCadastroTransportador")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InscricaoEstadual")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InscricaoMunicipal")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Municipio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Numero")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pais")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UF")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Transportador");
                });

            modelBuilder.Entity("RetaguardaESilva.Domain.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("DataCadastroUsuario")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<int>("FuncionarioId")
                        .HasColumnType("int");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Usuario");
                });
#pragma warning restore 612, 618
        }
    }
}
