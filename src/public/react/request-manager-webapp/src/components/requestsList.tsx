import React from 'react';

export interface Request {
  url: string,
  approverMail: string
  approved: boolean
}

interface RequestsProps {
  requests: Request[]
}

function OSRequests({requests}: RequestsProps) {
  console.log("asdasdsad")

  return (
          <div id="app">
            <ul>
              {requests.map((request: Request) => {
                return <li>Request URL is : {request.url}, approver's email is: {request.approverMail}, Status: {request.approved.toString()}</li>
              })}
            </ul>
          </div>
         );
}

export default OSRequests;
