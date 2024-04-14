import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "src/config/typeorm.config";
import { CardDirection } from "src/domain/cards/card.entity";
import { CardModule } from "src/domain/cards/card.module";
import { CardRepository } from "src/domain/cards/card.repository";
import { UserRepository } from "src/domain/users/repository/user.repository";
import { UserModule } from "src/domain/users/user.module";
import { EntityManager } from "typeorm";

const mockCreateCard = {
    title: "testCardTitle",
    direction: CardDirection.HORIZONTAL,
};
const mockUpdateCard = {
    title: "testCardTitle_update",
    direction: CardDirection.VERTICAL,
};
const mockUser = {
    email: "tester@gmail.com",
    name: "Tester",
    nickname: "FoxMon",
    password: "tester123@",
    phoneNumber: "010-1234-1234",
};

describe("CardRepository", () => {
    let app: INestApplication;
    let cardRepository: CardRepository;
    let userRepository: UserRepository;
    let createdUserId: string;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRootAsync({
                    useClass: TypeOrmConfig,
                }),
                CardModule,
                UserModule,
            ],
        }).compile();

        app = module.createNestApplication();

        const entityManager = app.get(EntityManager);
        await entityManager.query("TRUNCATE TABLE CARD;");
        await entityManager.query("TRUNCATE TABLE USER;");

        cardRepository = module.get(CardRepository);
        userRepository = module.get(UserRepository);

        const createdUser = await userRepository.createUser(mockUser);
        createdUserId = createdUser.id;

        await app.init();
    });

    afterAll(async () => {
        const entityManager = app.get(EntityManager);
        await entityManager.query("TRUNCATE TABLE CARD;");
        await entityManager.query("TRUNCATE TABLE USER;");

        app.close();
    });

    it("createCard()", async () => {
        const createdCard = await cardRepository.createCard({
            userId: createdUserId,
            ...mockCreateCard,
        });

        expect(createdCard.userId).toBe(createdUserId);
        expect(createdCard.title).toBe(mockCreateCard.title);
        expect(createdCard.direction).toBe(mockCreateCard.direction);
    });

    it("getOneCardById()", async () => {
        const createdCard = await cardRepository.createCard({
            userId: createdUserId,
            ...mockCreateCard,
        });
        const foundCard = await cardRepository.getOneCardById(createdCard.id);

        expect(foundCard.id).toBe(createdCard.id);
    });

    it("getAllCardsByUser()", async () => {
        const foundUser = await userRepository.findByEmail(mockUser.email);
        const foundCards = await cardRepository.getAllCardsByUser(foundUser.id);

        foundCards.forEach((card) => {
            expect(card.userId).toBe(foundUser.id);
        });
    });

    it("updateCard()", async () => {
        const createdCard = await cardRepository.createCard({
            userId: createdUserId,
            ...mockCreateCard,
        });

        await cardRepository.updateCard(createdCard.id, mockUpdateCard);

        const updatedCard = await cardRepository.getOneCardById(createdCard.id);

        expect(updatedCard.title).toBe(mockUpdateCard.title);
        expect(updatedCard.direction).toBe(mockUpdateCard.direction);
    });
});
