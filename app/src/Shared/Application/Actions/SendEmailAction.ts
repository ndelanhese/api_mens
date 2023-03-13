import EmailService from '../../Domain/Services/Transporters/SMTP/EmailService';
import SendEmailInputData from '../Dtos/SendEmailInputData';

export default class SendEmailAction {
  execute(input: SendEmailInputData) {
    const emailService = new EmailService();
    emailService.execute({
      to: input.to,
      cc: input.cc,
      subject: input.subject,
      html: input.html,
      from: input.from,
    });
  }
}
