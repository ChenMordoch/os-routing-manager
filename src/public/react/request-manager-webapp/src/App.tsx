import React, { useState } from 'react';
import './App.css';
import SubmitForm from './components/submitFrom'
import fetch from "node-fetch";

function App() {
  const [count, setCount] = useState(0);

  const submitFunc = (url: string, email: string) => {
    // const uuid = uuidv4.v4();
    // // this.fillQueue(uuid, subject, true);
    // let timerId = setInterval(this.fetchGIFs, freq, uuid, subject);
    registerRequest(url, email);    
  };

  const registerRequest = (urlStr: string, emailStr: string) => {
    let options = {
        method: 'post',
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          // 'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          url: urlStr,
          approver: emailStr
        })
    };
    fetch('http://localhost:8080/requests/', options)
    .then(res => {
      console.log(`statusCode: ${res.status} statusText = ${res.statusText} `);
      return res.json();
    }).then(json => console.log(json))
    .catch(err => {
      console.error(`ERROR: ${err}`);
      return;
    });
    setCount(count+1);
    // this.setState({
    //   jobs: [...this.state.jobs, job],
    //   presentedGifs: { ...this.state.presentedGifs, [uuid]: [] },
    // });
  };

  return (
    <div className="App">
    <h1 className="Main-title">OS Request Manager {count}</h1>
    <SubmitForm submitFunc={submitFunc}></SubmitForm>
  </div>
  );
}

export default App;
