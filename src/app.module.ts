import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
//import { ExceptionFiltersModule } from './exception-filters/exception-filters.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ProductModule, UserModule, DatabaseModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
