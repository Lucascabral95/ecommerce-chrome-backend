import { CreateOrderItemDto } from "src/orders/dto";
import { Size } from "@prisma/client";

const orderItemsSeed: CreateOrderItemDto[] = [
    {
        id: "e2b1b2f3-1c4d-4f6a-9b0c-1d2e3f4a5b6c",
        orderId: "3f3a6a10-2b47-4c0d-9a3b-5b2e6a7c8d90",
        variantId: "var-sfg-gro-l",
        quantity: 1,
        unitPrice: 15999,
        productName: "Remera Deportiva Dri-FIT",
        sku: "NIKE-DRIFIT-BLK-M",
        size: Size.M,
        colorName: "black",
    },
    {
        id: "a1b2c3d4-5e6f-4789-8a0b-1c2d3e4f5a6b",
        orderId: "3f3a6a10-2b47-4c0d-9a3b-5b2e6a7c8d90",
        variantId: "var-sfg-gro-m",
        quantity: 2,
        unitPrice: 45999,
        productName: "Polo Lacoste Clásico",
        sku: "LACOSTE-POLO-RED-M",
        size: Size.M,
        colorName: "red",
    },
];

export default orderItemsSeed;
