import HttpError from '@exceptions/HttpError';
import nodemailer from 'nodemailer';

import { emailData } from './emailInterface';

export default class EmailService {
  private emailHost: string;
  private emailPort: number;
  private emailUser: string;
  private emailPass: string;

  constructor() {
    this.emailHost = process.env.EMAIL_HOST ?? '';
    this.emailPort = Number(process.env.EMAIL_PORT);
    this.emailUser = process.env.EMAIL_USER ?? '';
    this.emailPass = process.env.EMAIL_PASS ?? '';
  }

  public execute(data: emailData) {
    const mailOptions = {
      from: data.from,
      to: data.to,
      cc: data.cc,
      subject: data.subject,
      html: data.html,
    };

    this.sendMail(mailOptions);
  }

  private sendMail(mailOptions: emailData) {
    this.createTransporter().sendMail(mailOptions, error => {
      if (error) throw new HttpError(500, 'Erro ao enviar e-mail');
    });
  }

  private createTransporter() {
    return nodemailer.createTransport({
      host: this.emailHost,
      port: this.emailPort,
      secure: false,
      auth: {
        user: this.emailUser,
        pass: this.emailPass,
      },
    });
  }
}
