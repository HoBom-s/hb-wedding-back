import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "src/config/typeorm.config";
import { UserRepository } from "src/domain/users/repositories/user.repository";
import { UserModule } from "src/domain/users/user.module";
import { EntityManager } from "typeorm";

describe("UserRepository", () => {
    let app: INestApplication;
    let userRepository: UserRepository;

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

        userRepository = module.get(UserRepository);

        await app.init();
    });

    afterAll(async () => {
        app.close();
    });

    it("createUser() & signinUser()", async () => {
        const mockUser = {
            email: "tester@gmail.com",
            name: "Tester",
            nickname: "FoxMon",
            password: "tester123@",
            phoneNumber: "010-1234-1234",
        };
        const createdUser = await userRepository.createUser(mockUser);

        expect(createdUser.email).toBe(mockUser.email);

        const signinUser = await userRepository.findByEmail(mockUser.email);

        expect(signinUser.email).toBe(mockUser.email);
    });
});
