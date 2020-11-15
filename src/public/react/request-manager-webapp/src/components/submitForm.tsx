import React, { useState } from 'react';
//import {Form, TabContainer, Button} from "react-bootstrap";

interface SubmitProps {
  submitFunc: Function
}

function SubmitForm({submitFunc}: SubmitProps) {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");

  const afterSubmission = (event: any) => {
    event.preventDefault();
    // if (!this.isFormValid()) {
    //   alert("Form not valid! all fields should be filled");
    // } else {
    submitFunc(url, email);
    // }import {sendApprovalEmail} from './../libs/emailClient'

    setUrl("");
    setEmail("");
  };

  return (
          <div id="app">
              <form id="myform">
                  <fieldset>
                      <label>
                        Url: 
                      </label>
                      <input 
                      type="text" 
                      placeholder="Enter OS Url"
                      onChange={(e) => setUrl(e.target.value)}
                      value={url}/>
                  </fieldset>
                  <fieldset>
                      <label>
                        Approver's email: 
                      </label>
                      <input 
                      type="text" 
                      placeholder="Enter Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}/>
                  </fieldset>
                  <button type="submit" onClick={afterSubmission}>Submit</button>
              </form>
          </div>
         );
}

export default SubmitForm;
