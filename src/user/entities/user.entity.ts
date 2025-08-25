import { Order } from 'src/order/entities/order.entity';
import { UserStatus } from '../enum/user-status.enum';
import {
  //BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
//import * as bcrypt from 'bcrypt';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @OneToMany(() => Order, (Order) => Order.customer)
  order: Order[];

  /* //password hashing
  //install bcrypt  as n(pm install bcrypy) and a type as (npm install -D @types/bcrypt)
  //import the bcrypt as (import * as bcrypt from 'bcrypt')
  @BeforeInsert()
  async hashPassword() { }
 this.password = await bcrypt.hash(this.password, 10);
 */
}
