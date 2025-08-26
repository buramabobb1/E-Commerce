import { Category } from 'src/category/entities/category.entity';
import { StockStatus } from '../enum/stock.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({ name: 'Product_To_Category ' })
  categories: Category[];

  @Column({
    type: 'enum',
    enum: StockStatus,
    default: StockStatus.IN_STOCK,
  })
  stockStatus: StockStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
