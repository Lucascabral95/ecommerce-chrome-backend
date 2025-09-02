import { CreateAddressUserDto } from "src/users/dto";

const addressesSeed: CreateAddressUserDto[] = [
    {
        id: "addr1-2b3c-4d5e-6f7a-890123456789",
        userId: "6e678f4c-c0a7-468a-be7a-29191bf49955",
        firstName: "Lucas",
        lastName: "Cabral",
        phone: "+541123456789",
        street1: "Av. Corrientes 1234",
        street2: "Piso 5, Depto B",
        city: "Buenos Aires",
        state: "Buenos Aires",
        postalCode: "C1043AAC",
        country: "Argentina"
    },
    {
        id: "addr2-3c4d-5e6f-7a8b-901234567890",
        userId: "569ad29f-e8a6-4f2b-b7a5-8f84dca33d7a",
        firstName: "Carlos",
        lastName: "Rodríguez",
        phone: "+541198765432",
        street1: "Calle Florida 1001",
        street2: "Piso 3, Oficina 12",
        city: "Buenos Aires",
        state: "Buenos Aires",
        postalCode: "C1005AAB",
        country: "Argentina"
    },
    {
        id: "addr3-4d5e-6f7a-8b9c-012345678901",
        userId: "3ed4f891-022f-44c5-999a-84721a374414",
        firstName: "Ana",
        lastName: "Martínez",
        phone: "+541187654321",
        street1: "Av. Santa Fe 3250",
        street2: "Piso 8, Depto A",
        city: "Buenos Aires",
        state: "Buenos Aires",
        postalCode: "C1425BGH",
        country: "Argentina"
    },
    {
        id: "addr4-5e6f-7a8b-9c0d-123456789012",
        userId: "e4e382bc-225b-4a73-8069-69577df9b10a",
        firstName: "Juan",
        lastName: "Pérez",
        phone: "+541111223344",
        street1: "Av. Callao 789",
        street2: "Piso 2",
        city: "Buenos Aires",
        state: "Buenos Aires",
        postalCode: "C1022AAD",
        country: "Argentina"
    }
];

export default addressesSeed;
