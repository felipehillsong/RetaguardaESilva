using Microsoft.AspNetCore.Mvc;
using RetaguardaESilva.Application.ContratosServices;
using RetaguardaESilva.Application.Helpers;

namespace RetaguardaESilva.API.Controllers
{
    [Route("api/emails")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IMailService _mailService;
        public EmailController(IMailService mailService)
        {
            _mailService = mailService;
        }

        [HttpPost]
        public IActionResult SendMail([FromBody] SendMailViewModel sendMailViewModel)
        {
            _mailService.SendMail(sendMailViewModel.Emails, sendMailViewModel.Assunto, sendMailViewModel.Corpo,
                sendMailViewModel.IsHtml);

            return Ok();
        }
    }
}