import { CartItemDto } from "src/cart/dto";

const cartItemsSeed: CartItemDto[] = [
    {
        id: "8b2f3c56-7a1e-4b9a-9d1c-1e2f3a4b5c6d",
        cartId: "8d8ac610-566d-4ef0-9c22-186b2a5ed793", // cart usuario 6e678f4c...
        variantId: "var1-2b3c-4d5e-6f7a-890123456789", // NIKE-DRIFIT-BLK-M
        quantity: 2,
        unitPriceSnap: 15999,
    },
    {
        id: "c3a7c9d2-0b3a-4c5f-8e21-19d8b0c1f2e3",
        cartId: "8d8ac610-566d-4ef0-9c22-186b2a5ed793",
        variantId: "var2-3c4d-5e6f-7a8b-901234567890", // NIKE-DRIFIT-WHT-L
        quantity: 1,
        unitPriceSnap: 15999,
    },
    {
        id: "9f8e7d6c-5b4a-4321-9a0f-1b2c3d4e5f60",
        cartId: "aa97b177-9383-4934-8543-0f91a7a02836", // cart usuario 569ad29f...
        variantId: "var3-4d5e-6f7a-8b9c-012345678901", // ZARA-JEAN-BLU-32
        quantity: 1,
        unitPriceSnap: 24999,
    },
    {
        id: "f1e2d3c4-b5a6-4789-9c0d-1e2f3a4b5c6d",
        cartId: "aa97b177-9383-4934-8543-0f91a7a02836",
        variantId: "var4-5e6f-7a8b-9c0d-123456789012", // ZARA-JEAN-BLK-34
        quantity: 2,
        unitPriceSnap: 26999,
    },
    {
        id: "2a1b3c4d-5e6f-4789-8a0b-1c2d3e4f5a6b",
        cartId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", // cart usuario 3ed4f891...
        variantId: "var5-6f7a-8b9c-0d1e-234567890123", // ADIDAS-STAN-WHT-42
        quantity: 1,
        unitPriceSnap: 89999,
    },
    {
        id: "7c8d9e0f-1a2b-4c3d-8e9f-0a1b2c3d4e5f",
        cartId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        variantId: "var6-7a8b-9c0d-1e2f-345678901234", // ADIDAS-STAN-GRN-41
        quantity: 2,
        unitPriceSnap: 89999,
    },
    {
        id: "0a9b8c7d-6e5f-4a3b-9c2d-1e0f9a8b7c6d",
        cartId: "8a6e0804-2bd0-4672-b79d-d97027f9071a", // cart usuario e4e382bc...
        variantId: "var7-8b9c-0d1e-2f30-456789012345", // TOMMY-OXF-WHT-M
        quantity: 3,
        unitPriceSnap: 32999,
    },
    {
        id: "a0b1c2d3-e4f5-4768-9a0b-1c2d3e4f5a6b",
        cartId: "8a6e0804-2bd0-4672-b79d-d97027f9071a",
        variantId: "var8-9c0d-1e2f-3041-567890123456", // TOMMY-OXF-BLU-L
        quantity: 1,
        unitPriceSnap: 32999,
    },

    // Hoodie gris
    {
        id: "1f2e3d4c-5b6a-4789-8c0d-1e2f3a4b5c6d",
        cartId: "8d8ac610-566d-4ef0-9c22-186b2a5ed793",
        variantId: "var9-0d1e-2f30-4152-678901234567", // HM-HOODIE-GRY-XL
        quantity: 2,
        unitPriceSnap: 18999,
    },
    {
        id: "3a4b5c6d-7e8f-49a0-8b1c-2d3e4f5a6b7c",
        cartId: "aa97b177-9383-4934-8543-0f91a7a02836",
        variantId: "var10-1e2f-3041-5263-789012345678", // LACOSTE-POLO-RED-M
        quantity: 1,
        unitPriceSnap: 45999,
    },
    {
        id: "5d6e7f80-9a1b-4c2d-8e3f-0a1b2c3d4e5f",
        cartId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        variantId: "var1-2b3c-4d5e-6f7a-890123456789", // NIKE-DRIFIT-BLK-M
        quantity: 1,
        unitPriceSnap: 15999,
    },
    {
        id: "6e7f8091-a2b3-4c5d-8e9f-0a1b2c3d4e5f",
        cartId: "8a6e0804-2bd0-4672-b79d-d97027f9071a",
        variantId: "var3-4d5e-6f7a-8b9c-012345678901", // ZARA-JEAN-BLU-32
        quantity: 1,
        unitPriceSnap: 24999,
    },
    {
        id: "4c5d6e7f-8091-4a2b-9c3d-1e0f2a3b4c5d",
        cartId: "8d8ac610-566d-4ef0-9c22-186b2a5ed793",
        variantId: "var10-1e2f-3041-5263-789012345678", // LACOSTE-POLO-RED-M
        quantity: 2,
        unitPriceSnap: 45999,
    },
];

export default cartItemsSeed;
