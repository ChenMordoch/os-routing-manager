import { Table, Column, Model } from 'sequelize-typescript';
 
@Table
export class OSRequest extends Model<OSRequest> {
 
  @Column
  osUrl: string;
 
  @Column
  approverEmail: string;

  @Column
  approved: boolean;
 
  @Column
  userId: string;

  @Column
  requestId: string;
}