import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseModel } from './base';
import * as bcrypt from 'bcrypt';

@Entity()
export class Admin extends BaseModel {
  @Column({ type: 'varchar' })
  public firstName: string;

  @Column({ type: 'varchar' })
  public lastName: string;

  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar', unique: true })
  public username: string;

  @Column({ type: 'varchar' })
  public password: string;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }

  @BeforeUpdate()
  async beforeUpdate(): Promise<void> {
    if (this.password) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
  }
}
