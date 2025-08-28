import { CreateAddressUserDto } from "src/users/dto";

const addressesSeed: CreateAddressUserDto[] = [
    {
        id: "addr1-2b3c-4d5e-6f7a-890123456789",
        userId: "user-a1b2-c3d4-e5f6-789012345678",
        firstName: "María",
        lastName: "González",
        phone: "+541123456789",
        street1: "Av. Corrientes 1234",
        street2: "Piso 5, Depto B",
        city: "Buenos Aires",
        state: "Buenos Aires",
        zipCode: "C1043AAC",
        country: "Argentina"
    },
    {
        id: "addr2-3c4d-5e6f-7a8b-901234567890",
        userId: "user-b2c3-d4e5-f6a7-890123456789",
        firstName: "Carlos",
        lastName: "Rodríguez",
        phone: "+541198765432",
        street1: "Calle Florida 1001",
        street2: "Piso 3, Oficina 12",
        city: "Buenos Aires",
        state: "Buenos Aires",
        zipCode: "C1005AAB",
        country: "Argentina"
    },
    {
        id: "addr3-4d5e-6f7a-8b9c-012345678901",
        userId: "user-c3d4-e5f6-a7b8-901234567890",
        firstName: "Ana",
        lastName: "Martínez",
        phone: "+541187654321",
        street1: "Av. Santa Fe 3250",
        street2: "Piso 8, Depto A",
        city: "Buenos Aires",
        state: "Buenos Aires",
        zipCode: "C1425BGH",
        country: "Argentina"
    },
    {
        id: "addr4-5e6f-7a8b-9c0d-123456789012",
        userId: "user-d4e5-f6a7-b8c9-012345678901",
        firstName: "Juan",
        lastName: "Pérez",
        phone: "+541111223344",
        street1: "Av. Callao 789",
        street2: "Piso 2",
        city: "Buenos Aires",
        state: "Buenos Aires",
        zipCode: "C1022AAD",
        country: "Argentina"
    }
];

export default addressesSeed;
