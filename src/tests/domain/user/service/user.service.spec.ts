import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { TypeOrmConfig } from "src/config/typeorm.config";
import { UserModule } from "src/domain/users/user.module";
import { UserService } from "src/domain/users/service/user.service";

describe("CategoryService", () => {
    let app: INestApplication;
    let userService: UserService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRootAsync({
                    useClass: TypeOrmConfig,
                }),
                UserModule,
            ],
        }).compile();

        app = module.createNestApplication();

        const entityManager = app.get(EntityManager);
        await entityManager.query("truncate table user;");

        userService = module.get(UserService);

        await app.init();
    });

    afterAll(async () => {
        app.close();
    });

    it("createUser() & signinUser()", async () => {
        const mockUser = {
            email: "tester2@gmail.com",
            name: "Tester2",
            nickname: "FoxMon2",
            password: "tester123@",
            phoneNumber: "010-1234-1234",
        };
        const createdUser = await userService.createUser(mockUser);

        expect(createdUser.email).toBe(mockUser.email);

        const signinUser = await userService.signinUser({
            email: mockUser.email,
            password: mockUser.password,
        });

        expect(signinUser).toBeDefined();
    });
});
