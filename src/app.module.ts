import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerModule } from './Customer/Customer.module';

@Module({
imports: [CustomerModule, TypeOrmModule.forRoot(
{ type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: 'mahin',
database: 'Test',//Change to your database name
autoLoadEntities: true,
synchronize: true,
} ),
],
controllers: [],
providers: [],
})

export class AppModule {}
