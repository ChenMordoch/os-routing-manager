import React, { useState } from 'react';
//import {Form, TabContainer, Button} from "react-bootstrap";

export interface Request {
  url: string,
  approverMail: string
}

interface RequestsProps {
  requests: Request[]
}

function OSRequests({requests}: RequestsProps) {
  // const [url, setUrl] = useState("");
  // const [email, setEmail] = useState("");

  // const afterSubmission = (event: any) => {
  //   event.preventDefault();
  //   // if (!this.isFormValid()) {
  //   //   alert("Form not valid! all fields should be filled");
  //   // } else {
  //   submitFunc(url, email);
  //   // }
  //   setUrl("");
  //   setEmail("");
  // };

  return (
          <div id="app">
            <ul>
              {requests.map((request: Request) => {
                return <li>Request URL is : {request.url}, approver's email is: {request.approverMail}</li>
              })}
            </ul>
          </div>
         );
}

export default OSRequests;
