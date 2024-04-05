import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { GLOBAL_ENV } from "./global.env.config";

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        return {
            type: "mysql",
            username: GLOBAL_ENV.MYSQL_USER,
            password: GLOBAL_ENV.MYSQL_PASSWORD,
            port: Number(GLOBAL_ENV.MYSQL_PORT),
            host: GLOBAL_ENV.MYSQL_HOST,
            database: GLOBAL_ENV.MYSQL_DATABASE,
            synchronize: true,
            autoLoadEntities: true,
            logging: true,
        };
    }
}
