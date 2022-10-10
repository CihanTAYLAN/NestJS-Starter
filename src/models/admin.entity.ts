import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.entity';

@Entity()
export class Admin extends BaseModel {
  @Column({ type: 'varchar', length: 120 })
  public firstName: string;

  @Column({ type: 'varchar', length: 120 })
  public lastName: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column()
  public password: string;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;
}
