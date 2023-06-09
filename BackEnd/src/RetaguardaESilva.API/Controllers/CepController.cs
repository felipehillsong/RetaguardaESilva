using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RetaguardaESilva.Application.Helpers;

namespace RetaguardaESilva.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CepController : ControllerBase
    {
        // GET: api/Cep
        [HttpGet]
        public async Task<ActionResult> GetCep(string cep)
        {
            var correios = new CorreiosCEP();
            var endereco = correios.ConsultaCEP(cep);
            return Ok(endereco);
        }
    }
}
