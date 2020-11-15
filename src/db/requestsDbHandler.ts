import { Sequelize } from 'sequelize-typescript';
import { OSRequest } from './models/request'
import { v4 as uuid } from 'uuid';

export class RequestsDbHandler {
  private SEQUELIZE_DB = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + 'sqlite_db.sqlite',
    models: [OSRequest], 
});

  public async saveNewRequest(osUrl: string, approverEmail: string, userId: string) : Promise<string> {
    const data = {
      osUrl: osUrl, 
      approverEmail: approverEmail,
      approved: false,
      userId: userId,
      requestId: uuid(),
    }
    
    try {
      const newRequest: OSRequest = await OSRequest.create(data)
      return Promise.resolve<string>(newRequest.requestId)
    } 
    catch (error) {
      return Promise.reject<string>({ error: error })
    }
  }
  
  public async getRequestsByUserId(userId: string): Promise<OSRequest[]> {
    try {
      const requests: OSRequest[] = await OSRequest.findAll({ where: { userId: userId } })
      return Promise.resolve<OSRequest[]>(requests)
    } 
    catch (error) {
      return Promise.reject<OSRequest[]>({ error: error })
    }
  }
  
  public async approveRequest(requestId: string) : Promise<void> {
    try {
      await OSRequest.update({ approved: true }, {
                              where: {
                                requestId: requestId
                              }})
    } 
    catch (error) {
      return Promise.reject<void>({ error: error })
    }
  }

  public createDb() {
    this.SEQUELIZE_DB.sync({ force: false })
  }
}
