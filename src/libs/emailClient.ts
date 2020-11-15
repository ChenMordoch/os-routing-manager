import * as nodemailer from 'nodemailer'; 

export function sendApprovalEmail(requestId: string) {
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'osrequestmanager@gmail.com', // TODO: define ENV
        pass: 'CH9Q2yA1NjfRDz2ap1'
    }
});
  
  const mailOptions = { 
    from : 'sender@example.com',
    to : 'hen.mord@gmail.com',  
    subject : 'Hello', 
    text: 'Hello from node.js',
    html: `<html>
    Please click to approve request:
    <a href="http://localhost:3000/approve/${requestId}">Approve Request</a>
    </html>`
  }; 

  transporter.sendMail( mailOptions, (error, info) => { 
    if (error) { 
      return console.log(`error: ${error}`); 
    } 
    console.log(`Message Sent ${info.response}`); 
  }); 
}
