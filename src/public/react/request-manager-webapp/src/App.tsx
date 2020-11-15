import React, { useState, useEffect } from 'react';
import './App.css';
import SubmitForm from './components/submitForm';
import OSRequests from './components/requestsList'
import { useCookies } from "react-cookie";
import { Request } from './components/requestsList';
import { RequestsApiClient } from './requestsApiClient';

function App() {
  let initialRequests: Request[] = []

  const [requests, setRequests] = useState(initialRequests);
  const [cookies, setCookie] = useCookies(['auth_id']);

  useEffect(() => {
    if (!cookies.auth_id) {
      return;
    } 

    new RequestsApiClient().getRequests(cookies.auth_id).then((osRequests: Request[]) => {
      setRequests(osRequests);
    }).catch(err => alert(err));
  }, []);

   const submitFunc = (url: string, email: string) => {
    let userId: string = '';    
    if(typeof(cookies.auth_id) !== 'undefined') {
      userId = cookies.auth_id;
    }

    new RequestsApiClient().newRequest(url, email, userId).then((id) => {
      if(typeof cookies.auth_id === 'undefined') {
        setCookie('auth_id' , id, { path: '/' });
      }

      new RequestsApiClient().getRequests(id).then((reqs) => {
        setRequests(reqs);
      }).catch(err => alert(err));
    }).catch(err => alert(err));
  };

  return (
    <div className="App">
    <h1 className="Main-title">OS Request Manager</h1>
    <SubmitForm submitFunc={submitFunc}></SubmitForm>
    <OSRequests requests={requests}></OSRequests>
  </div>
  );
}

export default App;
