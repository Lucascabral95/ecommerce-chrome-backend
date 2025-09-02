import { Size } from "@prisma/client";
import { CreateProductVariantDto } from "src/products/dto";

const productVariantsSeed: CreateProductVariantDto[] = [
    {
        id: "var1-2b3c-4d5e-6f7a-890123456789",
        productId: "a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789", // Remera Deportiva Dri-FIT
        colorId: "d4e5f6a7-b8c9-4012-d345-456789abcdef", // black
        sku: "NIKE-DRIFIT-BLK-M",
        barcode: "1234567890123",
        size: Size.M as Size,
        price: 15999,
        stock: 25,
        weightGrams: 180
    },
    {
        id: "var2-3c4d-5e6f-7a8b-901234567890",
        productId: "a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789", // Remera Deportiva Dri-FIT
        colorId: "e5f6a7b8-c9da-4123-e456-56789abcdef0", // white
        sku: "NIKE-DRIFIT-WHT-L",
        barcode: "1234567890124",
        size: Size.L as Size,
        price: 15999,
        stock: 18,
        weightGrams: 190
    },
    {
        id: "var3-4d5e-6f7a-8b9c-012345678901",
        productId: "b2c3d4e5-f6a7-4890-b123-c4d5e6f7a890", // Jean Straight Fit Azul
        colorId: "b2c3d4e5-f6a7-4890-b123-23456789abcd", // blue
        sku: "ZARA-JEAN-BLU-32",
        barcode: "2345678901234",
        size: Size.M as Size,
        price: 24999,
        stock: 15,
        weightGrams: 600
    },
    {
        id: "var4-5e6f-7a8b-9c0d-123456789012",
        productId: "b2c3d4e5-f6a7-4890-b123-c4d5e6f7a890", // Jean Straight Fit Azul
        colorId: "d4e5f6a7-b8c9-4012-d345-456789abcdef", // black
        sku: "ZARA-JEAN-BLK-34",
        barcode: "2345678901235",
        size: Size.M as Size,
        price: 26999,
        stock: 22,
        weightGrams: 620
    },
    {
        id: "var5-6f7a-8b9c-0d1e-234567890123",
        productId: "c3d4e5f6-a7b8-4901-c234-d5e6f7a8b901", // Zapatillas Stan Smith
        colorId: "e5f6a7b8-c9da-4123-e456-56789abcdef0", // white
        sku: "ADIDAS-STAN-WHT-42",
        barcode: "3456789012345",
        size: Size.XL as Size,
        price: 89999,
        stock: 12,
        weightGrams: 800
    },
    {
        id: "var6-7a8b-9c0d-1e2f-345678901234",
        productId: "c3d4e5f6-a7b8-4901-c234-d5e6f7a8b901", // Zapatillas Stan Smith
        colorId: "c3d4e5f6-a7b8-4901-c234-3456789abcde", // green
        sku: "ADIDAS-STAN-GRN-41",
        barcode: "3456789012346",
        size: Size.M as Size,
        price: 89999,
        stock: 8,
        weightGrams: 780
    },
    {
        id: "var7-8b9c-0d1e-2f30-456789012345",
        productId: "d4e5f6a7-b8c9-4012-d345-e6f7a8b9c012", // Camisa Oxford Blanca
        colorId: "e5f6a7b8-c9da-4123-e456-56789abcdef0", // white
        sku: "TOMMY-OXF-WHT-M",
        barcode: "4567890123456",
        size: Size.M as Size,
        price: 32999,
        stock: 20,
        weightGrams: 250
    },
    {
        id: "var8-9c0d-1e2f-3041-567890123456",
        productId: "d4e5f6a7-b8c9-4012-d345-e6f7a8b9c012", // Camisa Oxford Blanca
        colorId: "b2c3d4e5-f6a7-4890-b123-23456789abcd", // blue
        sku: "TOMMY-OXF-BLU-L",
        barcode: "4567890123457",
        size: Size.L as Size,
        price: 32999,
        stock: 16,
        weightGrams: 260
    },
    {
        id: "var9-0d1e-2f30-4152-678901234567",
        productId: "e5f6a7b8-c9d0-4123-e456-f7a8b9c0d123", // Buzo con Capucha Basic
        colorId: "daebfc0d-1e2f-4678-d901-abcdef012345", // gray
        sku: "HM-HOODIE-GRY-XL",
        barcode: "5678901234567",
        size: Size.XL as Size,
        price: 18999,
        stock: 30,
        weightGrams: 450
    },
    {
        id: "var10-1e2f-3041-5263-789012345678",
        productId: "b8c9d0e1-f2a3-4456-b789-c0d1e2f3a456", // Polo Lacoste Clásico
        colorId: "a1b2c3d4-e5f6-4789-a012-123456789abc", // red
        sku: "LACOSTE-POLO-RED-M",
        barcode: "6789012345678",
        size: Size.M as Size,
        price: 45999,
        stock: 14,
        weightGrams: 220
    }
];

export default productVariantsSeed;
