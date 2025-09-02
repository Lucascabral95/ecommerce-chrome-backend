import { RegisterAuthDto } from "src/auth/dto"

const usersSeed: RegisterAuthDto[] = [
    {
        "id": "6e678f4c-c0a7-468a-be7a-29191bf49955",
        "email": "lucas@hotmail.com",
        "hashedPassword": "123456",
        "name": "Lucas Cabral"
    },
    {
        "id": "569ad29f-e8a6-4f2b-b7a5-8f84dca33d7a",
        "email": "carlos.rodriguez@example.com",
        "hashedPassword": "123456",
        "name": "Carlos Rodríguez"
    },
    {
        "id": "3ed4f891-022f-44c5-999a-84721a374414",
        "email": "ana.martinez@example.com",
        "hashedPassword": "123456",
        "name": "Ana Martínez"
    },
    {
        "id": "e4e382bc-225b-4a73-8069-69577df9b10a",
        "email": "juan.perez@example.com",
        "hashedPassword": "123456",
        "name": "Juan Pérez"
    }
]

export default usersSeed