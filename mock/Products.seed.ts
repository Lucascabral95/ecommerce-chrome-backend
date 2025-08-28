import { CreateProductDto } from "src/products/dto";

const productsSeed: CreateProductDto[] = [
    {
        id: "a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789",
        name: "Remera Deportiva Dri-FIT",
        description: "Remera deportiva de secado rápido ideal para entrenamientos y running",
        brandId: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", // Nike
        categoryId: "1a2b3c4d-5e6f-4789-a012-123456789abc", // Deportivo
        basePrice: 15999,
        status: "ACTIVE"
    },
    {
        id: "b2c3d4e5-f6a7-4890-b123-c4d5e6f7a890",
        name: "Jean Straight Fit Azul",
        description: "Pantalón jean de corte recto clásico, 100% algodón",
        brandId: "f47ac10b-58cc-4372-a567-0e02b2c3d480", // Zara
        categoryId: "2b3c4d5e-6f7a-4890-b123-23456789abcd", // Casual
        basePrice: 24999,
        status: "ACTIVE"
    },
    {
        id: "c3d4e5f6-a7b8-4901-c234-d5e6f7a8b901",
        name: "Zapatillas Stan Smith",
        description: "Zapatillas icónicas de cuero blanco con detalles verdes",
        brandId: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Adidas
        categoryId: "6f7a8b9c-0d1e-4234-f567-6789abcdef01", // Calzado
        basePrice: 89999,
        status: "ACTIVE"
    },
    {
        id: "d4e5f6a7-b8c9-4012-d345-e6f7a8b9c012",
        name: "Camisa Oxford Blanca",
        description: "Camisa clásica de vestir en algodón oxford, perfecta para oficina",
        brandId: "f47ac10b-58cc-4372-a567-0e02b2c3d481", // Tommy Hilfiger
        categoryId: "3c4d5e6f-7a8b-4901-c234-3456789abcde", // Formal
        basePrice: 32999,
        status: "ACTIVE"
    },
    {
        id: "e5f6a7b8-c9d0-4123-e456-f7a8b9c0d123",
        name: "Buzo con Capucha Basic",
        description: "Hoodie básico de algodón con capucha ajustable",
        brandId: "550e8400-e29b-41d4-a716-446655440001", // H&M
        categoryId: "2b3c4d5e-6f7a-4890-b123-23456789abcd", // Casual
        basePrice: 18999,
        status: "ACTIVE"
    },
    {
        id: "f6a7b8c9-d0e1-4234-f567-a8b9c0d1e234",
        name: "Calzoncillos Boxer Pack x3",
        description: "Pack de 3 boxers de algodón con banda elástica",
        brandId: "6ba7b812-9dad-11d1-80b4-00c04fd430c8", // Calvin Klein
        categoryId: "4d5e6f7a-8b9c-4012-d345-456789abcdef", // Ropa Interior
        basePrice: 12999,
        status: "ACTIVE"
    },
    {
        id: "a7b8c9d0-e1f2-4345-a678-b9c0d1e2f345",
        name: "Zapatillas Running Ultra Boost",
        description: "Zapatillas de running con tecnología Boost para máximo confort",
        brandId: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Adidas
        categoryId: "1a2b3c4d-5e6f-4789-a012-123456789abc", // Deportivo
        basePrice: 129999,
        status: "ACTIVE"
    },
    {
        id: "b8c9d0e1-f2a3-4456-b789-c0d1e2f3a456",
        name: "Polo Lacoste Clásico",
        description: "Polo de piqué de algodón con el icónico cocodrilo bordado",
        brandId: "550e8400-e29b-41d4-a716-446655440003", // Lacoste
        categoryId: "2b3c4d5e-6f7a-4890-b123-23456789abcd", // Casual
        basePrice: 45999,
        status: "ACTIVE"
    },
    {
        id: "c9d0e1f2-a3b4-4567-c890-d1e2f3a4b567",
        name: "Cinturón de Cuero Negro",
        description: "Cinturón de cuero genuino con hebilla plateada clásica",
        brandId: "6ba7b813-9dad-11d1-80b4-00c04fd430c8", // Ralph Lauren
        categoryId: "5e6f7a8b-9c0d-4123-e456-56789abcdef0", // Accesorios
        basePrice: 28999,
        status: "ACTIVE"
    },
    {
        id: "d0e1f2a3-b4c5-4678-d901-e2f3a4b5c678",
        name: "Pantalón Chino Beige",
        description: "Pantalón chino de gabardina, corte slim fit",
        brandId: "550e8400-e29b-41d4-a716-446655440002", // Uniqlo
        categoryId: "2b3c4d5e-6f7a-4890-b123-23456789abcd", // Casual
        basePrice: 21999,
        status: "ACTIVE"
    },
    {
        id: "e1f2a3b4-c5d6-4789-e012-f3a4b5c6d789",
        name: "Short Deportivo Puma",
        description: "Short de entrenamiento con tecnología DryCELL",
        brandId: "6ba7b811-9dad-11d1-80b4-00c04fd430c8", // Puma
        categoryId: "1a2b3c4d-5e6f-4789-a012-123456789abc", // Deportivo
        basePrice: 13999,
        status: "ACTIVE"
    },
    {
        id: "f2a3b4c5-d6e7-4890-f123-a4b5c6d7e890",
        name: "Corbata Seda Azul Marino",
        description: "Corbata de seda 100% con diseño clásico liso",
        brandId: "6ba7b812-9dad-11d1-80b4-00c04fd430c8", // Calvin Klein
        categoryId: "5e6f7a8b-9c0d-4123-e456-56789abcdef0", // Accesorios
        basePrice: 16999,
        status: "ACTIVE"
    }
];

export default productsSeed;
