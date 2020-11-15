import React, { useState, useEffect } from 'react';
import './App.css';
import SubmitForm from './components/submitForm';
import OSRequests from './components/requestsList'
import fetch from "node-fetch";
import { useCookies } from "react-cookie";
import { v4 as uuid } from 'uuid';
import { Request } from './components/requestsList';

function App() {
  let initialVal : Request[] = [];
  const [requests, setRequests] = useState(initialVal);
  const [cookies, setCookie] = useCookies(['selected']);

  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log('render!');
    getAllRequests(cookies.selected).then((osRequests: Request[]) => {
      setRequests(osRequests);
    });

    // If you want to implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.
    return () => console.log('unmounting...');
  }, []);

   const submitFunc = (url: string, email: string) => {
    const reqUuid: string = uuid();
    registerRequest(url, email, reqUuid).then((id) => {
      return getAllRequests(id);
    }).then((reqs) => {
      setRequests(reqs);
    });
  };

  const registerRequest = (urlStr: string, emailStr: string, reqId: string) : Promise<string> => {
    let userId: string = '';    
    if(typeof(cookies.selected) !== 'undefined') {
      userId = cookies.selected;
    }
    let options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: urlStr, 
          approver: emailStr,
          userId: userId,
          requestId: reqId,
        })  
    };
    return fetch('http://localhost:8080/requests/', options)
    .then(res => {
      console.log(`statusCode: ${res.status} statusText = ${res.statusText} `);
      return res.json();
    }).then((resJson) => {
      console.log(resJson);
      if(typeof cookies.selected === 'undefined') {
        setCookie('selected' , resJson.userId, { path: '/' });
      }
      return new Promise<string>(resolve => resolve(resJson.userId));
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
      return new Promise<string>(resolve => resolve(""));;
    });
  };

  const getAllRequests = (userId: string) : Promise<Request[]> => {
    let options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    };
    let result: Request[] = [];
    return fetch(`http://localhost:8080/requests/${userId}`, options)
    .then(res => {
      console.log(`statusCode: ${res.status} statusText = ${res.statusText} `);
      return res.json();
    }).then((resJson) => {
      console.log(resJson);
      resJson.forEach(element => {
        result.push({
          url: element.osUrl,
          approverMail: element.approverEmail
        })
      });
      return new Promise<Request[]>(resolve => resolve(result));
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
      return new Promise<Request[]>(resolve => resolve(result));
    });
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
