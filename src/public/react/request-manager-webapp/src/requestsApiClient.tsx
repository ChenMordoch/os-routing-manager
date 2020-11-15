import { Request } from './components/requestsList';

const SERVER_BASE_URL: string = 'http://localhost:8080'

export class RequestsApiClient {
  public newRequest(url: string, approver: string, userId: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url, 
            approver: approver,
            userId: userId,
          })  
      };

      fetch(`${SERVER_BASE_URL}/requests/`, options)
      .then(res => {
        return res.json();
      })
      .then((resJson) => resolve(resJson.userId))
      .catch(err => reject(err) );
    })
  }

  public getRequests(userId: string): Promise<Request[]> {
    return new Promise<Request[]>((resolve, reject) => {
      fetch(`${SERVER_BASE_URL}/requests/${userId}`)
      .then(res => {
        return res.json();
      }).then((resJson) => {
        let result: Request[] = [];
  
        resJson.forEach(element => {
          result.push({
            url: element.osUrl,
            approverMail: element.approverEmail,
            approved: element.approved
          })
        });

        resolve(result);
      })
      .catch(err => reject(err));
    })
  }
}