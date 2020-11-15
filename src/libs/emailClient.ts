import * as nodemailer from 'nodemailer'; 

const SMTP_HOST: string = 'smtp.gmail.com'
const SMTP_PORT: number = 587
const SMTP_USERNAME: string = 'osrequestmanager@gmail.com'
const SMTP_PASSWORD: string = 'CH9Q2yA1NjfRDz2ap1'

const FROM: string = 'sender@example.com'
const SUBJECT: string = 'Approval Request'

export class EmailClient {
  public sendApprovalEmail(requestId: string, osUrl: string, approverEmail: string) : void {
  
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
          user: SMTP_USERNAME, // TODO: define ENV
          pass: SMTP_PASSWORD
      }
    });
    
    const mailOptions = { 
      from : FROM,
      to : approverEmail,  
      subject : SUBJECT, 
      html: `<html>
      <p>Hi, please check my OS url: ${osUrl} </p>
      <p>Please click to approve request:</p>
      <a href="http://localhost:8080/approve/${requestId}">Approve Request</a>
      </html>`
    }; 
  
    transporter.sendMail( mailOptions, (error, info) => { 
      if (error) { 
        return console.log(`error: ${error}`); 
      } 
      console.log(`Message Sent ${info.response}`); 
    }); 
  }
}
