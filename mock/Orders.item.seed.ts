import { CreateOrderItemDto } from "src/orders/dto";
import { Size } from "@prisma/client";

const orderItemsSeed: CreateOrderItemDto[] = [
    {
        // Item 1: Remera Deportiva Dri-FIT negra, talle M
        id: "e2b1b2f3-1c4d-4f6a-9b0c-1d2e3f4a5b6c", // opcional
        orderId: "3f3a6a10-2b47-4c0d-9a3b-5b2e6a7c8d90", // id de la orden creada antes
        variantId: "var1-2b3c-4d5e-6f7a-890123456789",
        quantity: 1,
        unitPrice: 15999,
        productName: "Remera Deportiva Dri-FIT",
        sku: "NIKE-DRIFIT-BLK-M",
        size: Size.M,
        colorName: "black",
    },
    {
        // Item 2: Polo Lacoste Clásico rojo, talle M
        id: "a1b2c3d4-5e6f-4789-8a0b-1c2d3e4f5a6b", // opcional
        orderId: "3f3a6a10-2b47-4c0d-9a3b-5b2e6a7c8d90", // misma orden
        variantId: "var10-1e2f-3041-5263-789012345678",
        quantity: 2,
        unitPrice: 45999,
        productName: "Polo Lacoste Clásico",
        sku: "LACOSTE-POLO-RED-M",
        size: Size.M,
        colorName: "red",
    },
];

export default orderItemsSeed;
