import { Currency, Prisma } from "@prisma/client";

const ordersSeed: Prisma.OrderCreateManyInput[] = [
    {
        id: "3f3a6a10-2b47-4c0d-9a3b-5b2e6a7c8d90",
        userId: "6e678f4c-c0a7-468a-be7a-29191bf49955", // Lucas
        status: "PENDING",
        currency: Currency.ARS,
        subtotal: 107997,            // 1×15999 + 2×45999
        shipping: 1500,
        tax: 0,
        discount: 0,
        total: 109497,
        shippingAddress: {
            street: "Av. Siempre Viva 742",
            city: "Buenos Aires",
            state: "CABA",
            zip: "1000",
            country: "AR",
            contactName: "Lucas Cabral",
            phone: "+54 11 5555-5555",
        },
        billingAddress: {
            street: "Av. Siempre Viva 742",
            city: "Buenos Aires",
            state: "CABA",
            zip: "1000",
            country: "AR",
            taxId: "20-12345678-9",
        },
        mpPreferenceId: null,
    },
    {
        id: "0c8d5a9e-1f3b-4b7a-94a2-1b3c5d7e9f01",
        userId: "569ad29f-e8a6-4f2b-b7a5-8f84dca33d7a", // Carlos
        status: "PENDING",
        currency: Currency.ARS,
        subtotal: 78998,             // 2×39499 (ejemplo)
        shipping: 1200,
        tax: 0,
        discount: 0,
        total: 80198,
        shippingAddress: {
            street: "Calle Corrientes 1234",
            city: "Buenos Aires",
            state: "CABA",
            zip: "1043",
            country: "AR",
            contactName: "Carlos Rodríguez",
            phone: "+54 11 4444-4444",
        },
        billingAddress: {
            street: "Calle Corrientes 1234",
            city: "Buenos Aires",
            state: "CABA",
            zip: "1043",
            country: "AR",
            taxId: "20-87654321-0",
        },
        mpPreferenceId: null,
    },
    {
        id: "a7b6c5d4-3e2f-41a0-9b8c-7d6e5f4a3b2c",
        userId: "3ed4f891-022f-44c5-999a-84721a374414", // Ana
        status: "PENDING",
        currency: Currency.ARS,
        subtotal: 15999,             // 1×15999
        shipping: 0,                 // retiro en tienda, por ejemplo
        tax: 0,
        discount: 0,
        total: 15999,
        shippingAddress: {
            street: "San Martín 555",
            city: "Córdoba",
            state: "Córdoba",
            zip: "5000",
            country: "AR",
            contactName: "Ana Martínez",
            phone: "+54 351 555-5555",
        },
        billingAddress: {},
        mpPreferenceId: null,
    },
];

export default ordersSeed;
