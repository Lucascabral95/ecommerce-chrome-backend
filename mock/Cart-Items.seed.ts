import { CartItemDto } from "src/cart/dto";

const cartItemsSeed: CartItemDto[] = [
    {
        id: "8b2f3c56-7a1e-4b9a-9d1c-1e2f3a4b5c6d",
        cartId: "8d8ac610-566d-4ef0-9c22-186b2a5ed793",
        variantId: "var-slc-cel-l",
        quantity: 2,
        unitPriceSnap: 64990,
    },
    {
        id: "c3a7c9d2-0b3a-4c5f-8e21-19d8b0c1f2e3",
        cartId: "8d8ac610-566d-4ef0-9c22-186b2a5ed793",
        variantId: "var-sra-am-xl",
        quantity: 1,
        unitPriceSnap: 39990,
    },
];

export default cartItemsSeed;
