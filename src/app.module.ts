import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
//import { ExceptionFiltersModule } from './exception-filters/exception-filters.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ProductModule, UserModule, DatabaseModule, OrderModule, PaymentModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
