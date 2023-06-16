using RetaguardaESilva.Application.ContratosServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace RetaguardaESilva.Application.PersistenciaService
{
    public class MailService : IMailService
    {
        private string smtpAddress => "smtp.office365.com";
        private int portNumber => 587;
        private string emailFromAddress => "retaguardaesilva@hotmail.com";
        private string password => "jesusCRISTO@33";
        public void AddEmailsToMailMessage(MailMessage mailMessage, string[] emails)
        {
            foreach (var email in emails)
            {
                mailMessage.To.Add(email);
            }
        }

        public void SendMail(string[] emails, string subject, string body, bool isHtml = false)
        {
            using (MailMessage mailMessage = new MailMessage())
            {
                mailMessage.From = new MailAddress(emailFromAddress);
                AddEmailsToMailMessage(mailMessage, emails);
                mailMessage.Subject = subject;
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = isHtml;
                using (SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
                {
                    smtp.EnableSsl = true;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential(emailFromAddress, password);
                    smtp.Send(mailMessage);
                }
            }
        }
    }
}
