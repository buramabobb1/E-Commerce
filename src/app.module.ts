import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
//import { ExceptionFiltersModule } from './exception-filters/exception-filters.module';

@Module({
  imports: [ProductModule, UserModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
