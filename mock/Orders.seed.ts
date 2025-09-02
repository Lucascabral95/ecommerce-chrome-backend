import { Currency, OrderStatus } from "@prisma/client";
import { CreateOrderDto } from "src/orders/dto";

const ordersSeed: CreateOrderDto[] = [
    {
        id: "3f3a6a10-2b47-4c0d-9a3b-5b2e6a7c8d90",
        userId: "6e678f4c-c0a7-468a-be7a-29191bf49955",
        status: OrderStatus.PAID,
        currency: Currency.ARS,
        subtotal: 107997,
        shipping: 1500,
        tax: 0,
        discount: 0,
        total: 109497,
        shippingAddress: {
            street: "Av. Siempre Viva 742",
            city: "Buenos Aires",
            state: "CABA",
            postalCode: "1000",
            country: "AR",
            contactName: "Lucas Cabral",
            phone: "+54 11 5555-5555",
            taxId: "20-12345678-9",
        },
        billingAddress: {
            street: "Av. Siempre Viva 742",
            city: "Buenos Aires",
            state: "CABA",
            postalCode: "1000",
            country: "AR",
            contactName: 'Lucas Cabral'
        },
        mpPreferenceId: undefined,
    },
];

export default ordersSeed;
