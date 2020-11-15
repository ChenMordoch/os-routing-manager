import {Sequelize, DataType} from 'sequelize-typescript';
import {OSRequest} from './models/request'
import {sendApprovalEmail} from './../libs/emailClient'
//const path = require('path');
 
const sequelize =  new Sequelize({
        dialect: 'sqlite',
        storage: __dirname + 'sqlite_db.sqlite',
        models: [OSRequest], 
});

let db = {
  sequelize: sequelize,
};

export default db;

export function saveNewRequest(osUrl: string, approverEmail: string, userId: string) : void {
  let data = {
    osUrl: osUrl, 
    approverEmail: approverEmail,
    approved: false,
    userId: userId,
    requestId: '12345aa', // TODO: switch by uuid given as input
  }
  OSRequest.create(data).then((result: OSRequest) => {
    sendApprovalEmail(result.requestId);
    return result.requestId;
  }).catch((err: Error) => {
    throw new Error("Couldn't create request: " + err);
  });
}

export function getRequestsByUserId(userId: string) {
  return OSRequest.findAll({ where: { userId: userId } }).then((requests: OSRequest[]) => {
    return requests;
  }).catch((err: Error) => {
    throw new Error("Couldn't find requests: " + err);
  });
}

export function approveRequest(requestId: string) : void {
  OSRequest.update({ approved: true }, {
    where: {
      requestId: requestId
    }
  }).then((result: [number, OSRequest[]]) => {
    return result[0];
  }).catch((err) => {
    throw new Error("Couldn't update request approval: " + err);
  });
}

 
