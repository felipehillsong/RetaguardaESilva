using Newtonsoft.Json;
using RetaguardaESilva.Domain.Mensagem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RetaguardaESilva.Application.Helpers
{
    public class CorreiosCEP
    {
        public string CEP { get; set; }
        public string Endereco { get; set; }
        public string Bairro { get; set; }
        public string Municipio { get; set; }
        public string UF { get; set; }   
        List<CorreiosCEP> correios = new List<CorreiosCEP>();
        public string ConsultaCEP(string cep)
        {
            try
            {
                var enderecoJson = "";
                var enderecoRetorno = new Correios.NET.CorreiosService().GetAddresses(cep);                
                foreach (var item in enderecoRetorno)
                {
                    var endereco = new CorreiosCEP
                    {
                        CEP = item.ZipCode,
                        Endereco = item.Street,
                        Bairro = item.District,
                        Municipio = item.City,
                        UF = item.State,
                    };
                    
                    correios.Add(endereco);
                    enderecoJson = JsonConvert.SerializeObject(endereco);
                }

                return enderecoJson;
            }
            catch (Exception)
            {
                throw new Exception(MensagemDeErro.ErroCEP);
            }            
        }
    }
}
