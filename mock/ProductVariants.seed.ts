import { Size } from "@prisma/client";
import { CreateProductVariantDto } from "src/products/dto";

const productVariantsSeed: CreateProductVariantDto[] = [
    // SWEATER
    // SWEATER
    // SWEATER
    // SWEATER
    // Sweater Rayado Negro (Negro)
    { id: "var-srn-neg-m", productId: "bc9e7dd0-7c5b-4856-a704-b41c2ea931de", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-RAY-NEG-M", barcode: "7790000010001", size: Size.M as Size, price: 39990, stock: 24, weightGrams: 620 },
    { id: "var-srn-neg-l", productId: "bc9e7dd0-7c5b-4856-a704-b41c2ea931de", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-RAY-NEG-L", barcode: "7790000010002", size: Size.L as Size, price: 39990, stock: 20, weightGrams: 640 },
    { id: "var-srn-neg-xl", productId: "bc9e7dd0-7c5b-4856-a704-b41c2ea931de", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-RAY-NEG-XL", barcode: "7790000010003", size: Size.XL as Size, price: 39990, stock: 16, weightGrams: 660 },

    // Sweater liso celeste (Celeste)
    { id: "var-slc-cel-m", productId: "0eb9ab50-51e3-4916-ab43-fc43c84db024", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "SWT-LIS-CEL-M", barcode: "7790000010101", size: Size.M as Size, price: 64990, stock: 18, weightGrams: 590 },
    { id: "var-slc-cel-l", productId: "0eb9ab50-51e3-4916-ab43-fc43c84db024", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "SWT-LIS-CEL-L", barcode: "7790000010102", size: Size.L as Size, price: 64990, stock: 16, weightGrams: 610 },

    // Sweater campera lisa tostado (Tostado)
    { id: "var-scl-tos-m", productId: "5078f0fe-4812-4cb6-978f-e0f4213597b6", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SWT-CAMP-TOS-M", barcode: "7790000010201", size: Size.M as Size, price: 64990, stock: 15, weightGrams: 680 },
    { id: "var-scl-tos-l", productId: "5078f0fe-4812-4cb6-978f-e0f4213597b6", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SWT-CAMP-TOS-L", barcode: "7790000010202", size: Size.L as Size, price: 64990, stock: 12, weightGrams: 700 },
    { id: "var-scl-tos-xl", productId: "5078f0fe-4812-4cb6-978f-e0f4213597b6", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SWT-CAMP-TOS-XL", barcode: "7790000010203", size: Size.XL as Size, price: 64990, stock: 10, weightGrams: 720 },

    // Sweater Fantasía Gris Oscuro (Gris Oscuro)
    { id: "var-sfg-gro-m", productId: "6f70b92d-196d-41a7-93b3-5b75979ac8e1", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "SWT-FAN-GRO-M", barcode: "7790000010301", size: Size.M as Size, price: 39990, stock: 22, weightGrams: 600 },
    { id: "var-sfg-gro-l", productId: "6f70b92d-196d-41a7-93b3-5b75979ac8e1", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "SWT-FAN-GRO-L", barcode: "7790000010302", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 620 },

    // Sweater Rayado Azul Marino (Azul Marino)
    { id: "var-sra-am-m", productId: "7b2a9f83-4d15-4e26-8c73-9a4b5e7c2d8f", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-RAY-AM-M", barcode: "7790000010401", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 610 },
    { id: "var-sra-am-l", productId: "7b2a9f83-4d15-4e26-8c73-9a4b5e7c2d8f", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-RAY-AM-L", barcode: "7790000010402", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 630 },
    { id: "var-sra-am-xl", productId: "7b2a9f83-4d15-4e26-8c73-9a4b5e7c2d8f", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-RAY-AM-XL", barcode: "7790000010403", size: Size.XL as Size, price: 39990, stock: 15, weightGrams: 650 },

    // Sweater Fantasía Gris Claro (Gris Claro)
    { id: "var-sfg-grc-m", productId: "3e8c4a71-2b6d-49f2-a185-c7d9e4f6b293", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "SWT-FAN-GRC-M", barcode: "7790000010501", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 600 },
    { id: "var-sfg-grc-l", productId: "3e8c4a71-2b6d-49f2-a185-c7d9e4f6b293", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "SWT-FAN-GRC-L", barcode: "7790000010502", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 620 },

    // Sweater bomber fantasía gris oscuro (Gris Oscuro)
    { id: "var-sbf-gro-m", productId: "9f5a2e84-6c37-4b1d-8e92-f3a7b8c5d9e4", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "SWT-BOM-GRO-M", barcode: "7790000010601", size: Size.M as Size, price: 64990, stock: 14, weightGrams: 700 },
    { id: "var-sbf-gro-l", productId: "9f5a2e84-6c37-4b1d-8e92-f3a7b8c5d9e4", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "SWT-BOM-GRO-L", barcode: "7790000010602", size: Size.L as Size, price: 64990, stock: 12, weightGrams: 720 },
    { id: "var-sbf-gro-xl", productId: "9f5a2e84-6c37-4b1d-8e92-f3a7b8c5d9e4", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "SWT-BOM-GRO-XL", barcode: "7790000010603", size: Size.XL as Size, price: 64990, stock: 10, weightGrams: 740 },

    // Sweater bomber fantasía verde oliva (Verde Oliva)
    { id: "var-sbf-vo-m", productId: "4a7b8c9d-5e3f-4726-9d18-e2f4c6a7b8d5", colorId: "9d2a5940-b577-4153-9gc8-83f4ea1b127a", sku: "SWT-BOM-VO-M", barcode: "7790000010701", size: Size.M as Size, price: 64990, stock: 14, weightGrams: 700 },
    { id: "var-sbf-vo-l", productId: "4a7b8c9d-5e3f-4726-9d18-e2f4c6a7b8d5", colorId: "9d2a5940-b577-4153-9gc8-83f4ea1b127a", sku: "SWT-BOM-VO-L", barcode: "7790000010702", size: Size.L as Size, price: 64990, stock: 12, weightGrams: 720 },
    { id: "var-sbf-vo-xl", productId: "4a7b8c9d-5e3f-4726-9d18-e2f4c6a7b8d5", colorId: "9d2a5940-b577-4153-9gc8-83f4ea1b127a", sku: "SWT-BOM-VO-XL", barcode: "7790000010703", size: Size.XL as Size, price: 64990, stock: 10, weightGrams: 740 },

    // Sweater bomber fantasía gris claro (Gris Claro)
    { id: "var-sbf-grc-m", productId: "8c2d5e9f-4a6b-4173-8c25-d7e9f2a4b6c8", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "SWT-BOM-GRC-M", barcode: "7790000010801", size: Size.M as Size, price: 64990, stock: 14, weightGrams: 700 },
    { id: "var-sbf-grc-l", productId: "8c2d5e9f-4a6b-4173-8c25-d7e9f2a4b6c8", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "SWT-BOM-GRC-L", barcode: "7790000010802", size: Size.L as Size, price: 64990, stock: 12, weightGrams: 720 },
    { id: "var-sbf-grc-xl", productId: "8c2d5e9f-4a6b-4173-8c25-d7e9f2a4b6c8", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "SWT-BOM-GRC-XL", barcode: "7790000010803", size: Size.XL as Size, price: 64990, stock: 10, weightGrams: 740 },

    // Sweater fantasía borravino → Bordó
    { id: "var-sfb-bor-m", productId: "1e4c7a2d-8f5b-4639-9e14-c7a2d5e8f3b6", colorId: "8c19483f-a466-4052-8fb7-72e3d90a0169", sku: "SWT-FAN-BOR-M", barcode: "7790000010901", size: Size.M as Size, price: 64990, stock: 16, weightGrams: 610 },
    { id: "var-sfb-bor-l", productId: "1e4c7a2d-8f5b-4639-9e14-c7a2d5e8f3b6", colorId: "8c19483f-a466-4052-8fb7-72e3d90a0169", sku: "SWT-FAN-BOR-L", barcode: "7790000010902", size: Size.L as Size, price: 64990, stock: 14, weightGrams: 630 },

    // Sweater liso con botones verde oliva (Verde Oliva)
    { id: "var-slb-vo-m", productId: "6b8d2f5a-3c7e-4951-a286-b4d7f9a2c5e8", colorId: "9d2a5940-b577-4153-9gc8-83f4ea1b127a", sku: "SWT-BOT-VO-M", barcode: "7790000011001", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 600 },
    { id: "var-slb-vo-l", productId: "6b8d2f5a-3c7e-4951-a286-b4d7f9a2c5e8", colorId: "9d2a5940-b577-4153-9gc8-83f4ea1b127a", sku: "SWT-BOT-VO-L", barcode: "7790000011002", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 620 },

    // Sweater liso melange crudo → Beige
    { id: "var-slm-cru-m", productId: "2d9a6f3c-5b8e-4174-b397-d9a6f3c5b8e1", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "SWT-MEL-CRU-M", barcode: "7790000011101", size: Size.M as Size, price: 49990, stock: 18, weightGrams: 590 },
    { id: "var-slm-cru-l", productId: "2d9a6f3c-5b8e-4174-b397-d9a6f3c5b8e1", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "SWT-MEL-CRU-L", barcode: "7790000011102", size: Size.L as Size, price: 49990, stock: 16, weightGrams: 610 },

    // Sweater liso melange petróleo → Azul
    { id: "var-slm-pet-m", productId: "7f2c8e4a-9d6b-4285-c7f2-c8e4a9d6b285", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "SWT-MEL-PET-M", barcode: "7790000011201", size: Size.M as Size, price: 49990, stock: 18, weightGrams: 590 },
    { id: "var-slm-pet-l", productId: "7f2c8e4a-9d6b-4285-c7f2-c8e4a9d6b285", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "SWT-MEL-PET-L", barcode: "7790000011202", size: Size.L as Size, price: 49990, stock: 16, weightGrams: 610 },

    // Sweater fantasía verde claro → Verde
    { id: "var-sfv-ver-m", productId: "5a3e9c7b-4f2d-4896-a35a-3e9c7b4f2d48", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SWT-FAN-VER-M", barcode: "7790000011301", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 600 },
    { id: "var-sfv-ver-l", productId: "5a3e9c7b-4f2d-4896-a35a-3e9c7b4f2d48", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SWT-FAN-VER-L", barcode: "7790000011302", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 620 },

    // Sweater fantasía morley azul stone → Azul
    { id: "var-sfm-azs-m", productId: "9e1c4d7a-6b8f-4307-9e14-c4d7a6b8f307", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "SWT-MOR-AZS-M", barcode: "7790000011401", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 600 },
    { id: "var-sfm-azs-l", productId: "9e1c4d7a-6b8f-4307-9e14-c4d7a6b8f307", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "SWT-MOR-AZS-L", barcode: "7790000011402", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 620 },

    // Sweater chaleco tejido negro (Negro)
    { id: "var-sct-neg-m", productId: "3c6f2a8e-5d9b-4518-c36f-2a8e5d9b4518", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-CHA-NEG-M", barcode: "7790000011501", size: Size.M as Size, price: 39990, stock: 22, weightGrams: 520 },
    { id: "var-sct-neg-l", productId: "3c6f2a8e-5d9b-4518-c36f-2a8e5d9b4518", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-CHA-NEG-L", barcode: "7790000011502", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 540 },

    // Sweater polera liso negra (Negro)
    { id: "var-spl-neg-m", productId: "8d4a7e1c-2f5b-4629-8d47-a7e1c2f5b629", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-POL-NEG-M", barcode: "7790000011601", size: Size.M as Size, price: 39990, stock: 22, weightGrams: 630 },
    { id: "var-spl-neg-l", productId: "8d4a7e1c-2f5b-4629-8d47-a7e1c2f5b629", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-POL-NEG-L", barcode: "7790000011602", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 650 },

    // Sweater campera liso azul marino (Azul Marino)
    { id: "var-scl-am-m", productId: "4f7c9a2d-6e3b-4730-4f7c-9a2d6e3b4730", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-CAMP-AM-M", barcode: "7790000011701", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 680 },
    { id: "var-scl-am-l", productId: "4f7c9a2d-6e3b-4730-4f7c-9a2d6e3b4730", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-CAMP-AM-L", barcode: "7790000011702", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 700 },
    { id: "var-scl-am-xl", productId: "4f7c9a2d-6e3b-4730-4f7c-9a2d6e3b4730", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-CAMP-AM-XL", barcode: "7790000011703", size: Size.XL as Size, price: 39990, stock: 16, weightGrams: 720 },

    // Sweater fantasía verde oliva (Verde Oliva)
    { id: "var-sfv-vo-m", productId: "1a5e8c4f-3d2b-4841-1a5e-8c4f3d2b4841", colorId: "9d2a5940-b577-4153-9gc8-83f4ea1b127a", sku: "SWT-FAN-VO-M", barcode: "7790000011801", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 600 },
    { id: "var-sfv-vo-l", productId: "1a5e8c4f-3d2b-4841-1a5e-8c4f3d2b4841", colorId: "9d2a5940-b577-4153-9gc8-83f4ea1b127a", sku: "SWT-FAN-VO-L", barcode: "7790000011802", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 620 },

    // Sweater fantasía azul marino (Azul Marino)
    { id: "var-sfa-am-m", productId: "7b9d3f6a-4c8e-4952-7b9d-3f6a4c8e4952", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-FAN-AM-M", barcode: "7790000011901", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 600 },
    { id: "var-sfa-am-l", productId: "7b9d3f6a-4c8e-4952-7b9d-3f6a4c8e4952", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-FAN-AM-L", barcode: "7790000011902", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 620 },

    // Sweater liso en V gris claro (Gris Claro)
    { id: "var-sv-grc-m", productId: "2e6c9a3f-5d1b-4063-2e6c-9a3f5d1b4063", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "SWT-V-GRC-M", barcode: "7790000012001", size: Size.M as Size, price: 49990, stock: 18, weightGrams: 590 },
    { id: "var-sv-grc-l", productId: "2e6c9a3f-5d1b-4063-2e6c-9a3f5d1b4063", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "SWT-V-GRC-L", barcode: "7790000012002", size: Size.L as Size, price: 49990, stock: 16, weightGrams: 610 },

    // Sweater liso en V tostado (Tostado)
    { id: "var-sv-tos-m", productId: "3f8c5a2e-4d7b-4285-3f8c-5a2e4d7b4285", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SWT-V-TOS-M", barcode: "7790000012101", size: Size.M as Size, price: 49990, stock: 18, weightGrams: 590 },
    { id: "var-sv-tos-l", productId: "3f8c5a2e-4d7b-4285-3f8c-5a2e4d7b4285", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SWT-V-TOS-L", barcode: "7790000012102", size: Size.L as Size, price: 49990, stock: 16, weightGrams: 610 },

    // Sweater liso tostado (Tostado)
    { id: "var-slt-tos-m", productId: "9d7a4f1e-2c6b-4396-9d7a-4f1e2c6b4396", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SWT-LIS-TOS-M", barcode: "7790000012201", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 590 },
    { id: "var-slt-tos-l", productId: "9d7a4f1e-2c6b-4396-9d7a-4f1e2c6b4396", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SWT-LIS-TOS-L", barcode: "7790000012202", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 610 },
    { id: "var-slt-tos-xl", productId: "9d7a4f1e-2c6b-4396-9d7a-4f1e2c6b4396", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SWT-LIS-TOS-XL", barcode: "7790000012203", size: Size.XL as Size, price: 39990, stock: 16, weightGrams: 630 },

    // Sweater polera liso tostado (Tostado)
    { id: "var-spl-tos-m", productId: "4c2e8b5a-7f3d-4507-4c2e-8b5a7f3d4507", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SWT-POL-TOS-M", barcode: "7790000012301", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 630 },
    { id: "var-spl-tos-l", productId: "4c2e8b5a-7f3d-4507-4c2e-8b5a7f3d4507", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SWT-POL-TOS-L", barcode: "7790000012302", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 650 },

    // Sweater campera liso negro (Negro)
    { id: "var-scl-neg-m", productId: "6f4a9c2d-8e5b-4618-6f4a-9c2d8e5b4618", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-CAMP-NEG-M", barcode: "7790000012401", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 680 },
    { id: "var-scl-neg-l", productId: "6f4a9c2d-8e5b-4618-6f4a-9c2d8e5b4618", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-CAMP-NEG-L", barcode: "7790000012402", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 700 },
    { id: "var-scl-neg-xl", productId: "6f4a9c2d-8e5b-4618-6f4a-9c2d8e5b4618", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-CAMP-NEG-XL", barcode: "7790000012403", size: Size.XL as Size, price: 39990, stock: 16, weightGrams: 720 },

    // Polera liso azul marino (Azul Marino)
    { id: "var-pal-am-m", productId: "1b5d8f3a-9c7e-4729-1b5d-8f3a9c7e4729", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-POL-AM-M", barcode: "7790000012501", size: Size.M as Size, price: 39990, stock: 22, weightGrams: 630 },
    { id: "var-pal-am-l", productId: "1b5d8f3a-9c7e-4729-1b5d-8f3a9c7e4729", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-POL-AM-L", barcode: "7790000012502", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 650 },

    // Liso beige (Beige)
    { id: "var-slb-bei-m", productId: "8e3c6a4d-2f7b-4830-8e3c-6a4d2f7b4830", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "SWT-LIS-BEI-M", barcode: "7790000012601", size: Size.M as Size, price: 39990, stock: 22, weightGrams: 600 },
    { id: "var-slb-bei-l", productId: "8e3c6a4d-2f7b-4830-8e3c-6a4d2f7b4830", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "SWT-LIS-BEI-L", barcode: "7790000012602", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 620 },

    // Liso gris claro (Gris Claro)
    { id: "var-slg-grc-m", productId: "5a7c9e2f-4d6b-4941-5a7c-9e2f4d6b4941", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "SWT-LIS-GRC-M", barcode: "7790000012701", size: Size.M as Size, price: 64990, stock: 18, weightGrams: 610 },
    { id: "var-slg-grc-l", productId: "5a7c9e2f-4d6b-4941-5a7c-9e2f4d6b4941", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "SWT-LIS-GRC-L", barcode: "7790000012702", size: Size.L as Size, price: 64990, stock: 16, weightGrams: 630 },

    // Liso gris (Gris)
    { id: "var-slg-gr-m", productId: "2d9f4c7a-6e8b-4052-2d9f-4c7a6e8b4052", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "SWT-LIS-GR-M", barcode: "7790000012801", size: Size.M as Size, price: 64990, stock: 18, weightGrams: 610 },
    { id: "var-slg-gr-l", productId: "2d9f4c7a-6e8b-4052-2d9f-4c7a6e8b4052", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "SWT-LIS-GR-L", barcode: "7790000012802", size: Size.L as Size, price: 64990, stock: 16, weightGrams: 630 },

    // Liso bordó (Bordó)
    { id: "var-slb-bor-m", productId: "7f1a5d8c-3b9e-4163-7f1a-5d8c3b9e4163", colorId: "8c19483f-a466-4052-8fb7-72e3d90a0169", sku: "SWT-LIS-BOR-M", barcode: "7790000012901", size: Size.M as Size, price: 64990, stock: 18, weightGrams: 610 },
    { id: "var-slb-bor-l", productId: "7f1a5d8c-3b9e-4163-7f1a-5d8c3b9e4163", colorId: "8c19483f-a466-4052-8fb7-72e3d90a0169", sku: "SWT-LIS-BOR-L", barcode: "7790000012902", size: Size.L as Size, price: 64990, stock: 16, weightGrams: 630 },

    // Liso verde (Verde)
    { id: "var-slg-ver-m", productId: "4c8e2b5f-9a6d-4274-4c8e-2b5f9a6d4274", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SWT-LIS-VER-M", barcode: "7790000013001", size: Size.M as Size, price: 64990, stock: 18, weightGrams: 610 },
    { id: "var-slg-ver-l", productId: "4c8e2b5f-9a6d-4274-4c8e-2b5f9a6d4274", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SWT-LIS-VER-L", barcode: "7790000013002", size: Size.L as Size, price: 64990, stock: 16, weightGrams: 630 },

    // Liso negro (Negro)
    { id: "var-slg-neg-m", productId: "6a3f7c9e-8d2b-4385-6a3f-7c9e8d2b4385", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-LIS-NEG-M", barcode: "7790000013101", size: Size.M as Size, price: 64990, stock: 18, weightGrams: 610 },
    { id: "var-slg-neg-l", productId: "6a3f7c9e-8d2b-4385-6a3f-7c9e8d2b4385", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SWT-LIS-NEG-L", barcode: "7790000013102", size: Size.L as Size, price: 64990, stock: 16, weightGrams: 630 },

    // Liso en V azul marino (Azul Marino)
    { id: "var-sv-am-m", productId: "9e5c1a4d-7f8b-4496-9e5c-1a4d7f8b4496", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-V-AM-M", barcode: "7790000013201", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 600 },
    { id: "var-sv-am-l", productId: "9e5c1a4d-7f8b-4496-9e5c-1a4d7f8b4496", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-V-AM-L", barcode: "7790000013202", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 620 },

    // Medio cierre verde (Verde)
    { id: "var-smc-ver-m", productId: "3b7d4f2a-5c6e-4507-3b7d-4f2a5c6e4507", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SWT-MC-VER-M", barcode: "7790000013301", size: Size.M as Size, price: 64990, stock: 16, weightGrams: 680 },
    { id: "var-smc-ver-l", productId: "3b7d4f2a-5c6e-4507-3b7d-4f2a5c6e4507", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SWT-MC-VER-L", barcode: "7790000013302", size: Size.L as Size, price: 64990, stock: 14, weightGrams: 700 },

    // Liso azul marino (Azul Marino)
    { id: "var-sla-am-m", productId: "8c2a6e9f-4d5b-4618-8c2a-6e9f4d5b4618", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-LIS-AM-M", barcode: "7790000013401", size: Size.M as Size, price: 64990, stock: 18, weightGrams: 610 },
    { id: "var-sla-am-l", productId: "8c2a6e9f-4d5b-4618-8c2a-6e9f4d5b4618", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SWT-LIS-AM-L", barcode: "7790000013402", size: Size.L as Size, price: 64990, stock: 16, weightGrams: 630 },

    // En V liso verde melange → Verde
    { id: "var-svm-vmg-m", productId: "5f4c8a1d-2e7b-4729-5f4c-8a1d2e7b4729", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SWT-V-VMG-M", barcode: "7790000013501", size: Size.M as Size, price: 35990, stock: 20, weightGrams: 590 },
    { id: "var-svm-vmg-l", productId: "5f4c8a1d-2e7b-4729-5f4c-8a1d2e7b4729", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SWT-V-VMG-L", barcode: "7790000013502", size: Size.L as Size, price: 35990, stock: 18, weightGrams: 610 },

    // CAMPERAS
    // CAMPERAS
    // CAMPERAS
    // CAMPERAS
    // CAMPERAS
    // Campera Inflada Verde Claro -> Verde
    { id: "c9b2d1f8-3a47-4f2b-9a8e-2b6e3d1a4c59", productId: "9d6ed52c-d83c-4e13-b33f-f46f24249726", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "JKT-INF-VER-M", barcode: "7790000020001", size: Size.M as Size, price: 59990, stock: 20, weightGrams: 780 },
    { id: "f1a6c3b2-5d8e-4a7c-8b3f-1e2d4c6a7b80", productId: "9d6ed52c-d83c-4e13-b33f-f46f24249726", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "JKT-INF-VER-L", barcode: "7790000020002", size: Size.L as Size, price: 59990, stock: 18, weightGrams: 800 },
    { id: "7e2d9b41-8c5f-48a1-9b32-a7c6d2f1e480", productId: "9d6ed52c-d83c-4e13-b33f-f46f24249726", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "JKT-INF-VER-XL", barcode: "7790000020003", size: Size.XL as Size, price: 59990, stock: 14, weightGrams: 820 },

    // Campera Inflada Tostado -> Tostado
    { id: "b6c1a3e8-2d45-4e7f-9a3b-5c1d7e8f2a90", productId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "JKT-INF-TOS-M", barcode: "7790000020101", size: Size.M as Size, price: 59990, stock: 20, weightGrams: 780 },
    { id: "e3d9a7b4-6c1f-4a8e-8b52-1a3c5d7e9f21", productId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "JKT-INF-TOS-L", barcode: "7790000020102", size: Size.L as Size, price: 59990, stock: 18, weightGrams: 800 },
    { id: "4a7c2e1d-9b35-44f8-8a61-5f2d3c7e9b04", productId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "JKT-INF-TOS-XL", barcode: "7790000020103", size: Size.XL as Size, price: 59990, stock: 14, weightGrams: 820 },

    // Campera Inflada Cemento -> Gris
    { id: "9c1e2b3d-4a5f-49c8-8d7e-1f2a3b4c5d6e", productId: "8d8ac610-566d-4ef0-9c22-186b2a5ed793", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "JKT-INF-GRI-M", barcode: "7790000020201", size: Size.M as Size, price: 59990, stock: 20, weightGrams: 780 },
    { id: "2f7a6b5c-1d4e-4b8a-9c30-7a6b5c1d4e9f", productId: "8d8ac610-566d-4ef0-9c22-186b2a5ed793", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "JKT-INF-GRI-L", barcode: "7790000020202", size: Size.L as Size, price: 59990, stock: 18, weightGrams: 800 },
    { id: "8b1d2c3e-4f5a-4a7c-9d81-2c3e4f5a7b6d", productId: "8d8ac610-566d-4ef0-9c22-186b2a5ed793", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "JKT-INF-GRI-XL", barcode: "7790000020203", size: Size.XL as Size, price: 59990, stock: 14, weightGrams: 820 },

    // Campera Inflada Tiza -> Gris Claro
    { id: "7d3a1b2c-5e6f-43a8-8c7d-1a2b3c4d5e6f", productId: "4ed161b5-0d3c-4f06-8381-5f14678e13da", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "JKT-INF-GRC-M", barcode: "7790000020301", size: Size.M as Size, price: 59990, stock: 20, weightGrams: 770 },
    { id: "5e1f2a3b-4c6d-4e8a-9b10-2c3d4a5b6e7f", productId: "4ed161b5-0d3c-4f06-8381-5f14678e13da", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "JKT-INF-GRC-L", barcode: "7790000020302", size: Size.L as Size, price: 59990, stock: 18, weightGrams: 790 },

    // Campera deportiva fantasía con capucha -> Gris
    { id: "3f2a1d4c-5b6e-4a8f-9c21-7d8e9f0a1b2c", productId: "3f1c2a7e-2b9a-4c7d-8a3f-bf2d1e9c6a01", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "JKT-DEP-GRI-M", barcode: "7790000020401", size: Size.M as Size, price: 69990, stock: 18, weightGrams: 720 },
    { id: "6a1b2c3d-4e5f-40a8-8b9c-1d2e3f4a5b6c", productId: "3f1c2a7e-2b9a-4c7d-8a3f-bf2d1e9c6a01", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "JKT-DEP-GRI-L", barcode: "7790000020402", size: Size.L as Size, price: 69990, stock: 16, weightGrams: 740 },

    // Campera Fantasía Azul -> Azul Marino
    { id: "1a2b3c4d-5e6f-41a8-8b9c-2d3e4f5a6b7c", productId: "a2f0b1c4-5d67-4e89-9abc-12d34ef56a78", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "JKT-FAN-AM-M", barcode: "7790000020501", size: Size.M as Size, price: 69990, stock: 18, weightGrams: 730 },
    { id: "2b3c4d5e-6f70-4a18-8c9d-3e4f5a6b7c8d", productId: "a2f0b1c4-5d67-4e89-9abc-12d34ef56a78", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "JKT-FAN-AM-L", barcode: "7790000020502", size: Size.L as Size, price: 69990, stock: 16, weightGrams: 750 },

    // Campera Inflada Gris Oscuro -> Gris Oscuro
    { id: "4c5d6e7f-8a1b-4c2d-9e3f-5a6b7c8d9e01", productId: "c7e2d915-6a3b-4f28-8c9d-0b1a2f3e4d56", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "JKT-INF-GRO-M", barcode: "7790000020601", size: Size.M as Size, price: 59990, stock: 20, weightGrams: 790 },
    { id: "7d8e9f0a-1b2c-43d4-8e9f-0a1b2c3d4e5f", productId: "c7e2d915-6a3b-4f28-8c9d-0b1a2f3e4d56", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "JKT-INF-GRO-L", barcode: "7790000020602", size: Size.L as Size, price: 59990, stock: 18, weightGrams: 810 },

    // Campera de jean celeste claro -> Celeste
    { id: "9e0f1a2b-3c4d-4e5f-8a9b-0c1d2e3f4a5b", productId: "f2a41d3b-8c76-4d21-9f34-5ab6c7d8e901", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "JKT-JEAN-CEL-M", barcode: "7790000020701", size: Size.M as Size, price: 79990, stock: 16, weightGrams: 980 },
    { id: "0a1b2c3d-4e5f-4a6b-8c9d-1e2f3a4b5c6d", productId: "f2a41d3b-8c76-4d21-9f34-5ab6c7d8e901", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "JKT-JEAN-CEL-L", barcode: "7790000020702", size: Size.L as Size, price: 79990, stock: 14, weightGrams: 1000 },

    // Campera Inflada Negra -> Negro
    { id: "1f2a3b4c-5d6e-4f7a-9b8c-0d1e2f3a4b5c", productId: "6b3e2c1d-5f47-4a89-8bcd-7e9f0a1b2c34", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "JKT-INF-NEG-M", barcode: "7790000020801", size: Size.M as Size, price: 59990, stock: 22, weightGrams: 800 },
    { id: "2c3d4e5f-6a7b-4c8d-9e0f-1a2b3c4d5e6f", productId: "6b3e2c1d-5f47-4a89-8bcd-7e9f0a1b2c34", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "JKT-INF-NEG-L", barcode: "7790000020802", size: Size.L as Size, price: 59990, stock: 18, weightGrams: 820 },
    { id: "3d4e5f6a-7b8c-4d9e-8f01-2a3b4c5d6e7f", productId: "6b3e2c1d-5f47-4a89-8bcd-7e9f0a1b2c34", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "JKT-INF-NEG-XL", barcode: "7790000020803", size: Size.XL as Size, price: 59990, stock: 14, weightGrams: 840 },

    // Campera de jean azul marino -> Azul Marino
    { id: "4e5f6a7b-8c9d-4e0f-9a1b-2c3d4e5f6a7b", productId: "0a9f8e7d-6c5b-4a32-9b1c-d2e3f4a5b6c7", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "JKT-JEAN-AM-M", barcode: "7790000020901", size: Size.M as Size, price: 79990, stock: 16, weightGrams: 990 },
    { id: "5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c", productId: "0a9f8e7d-6c5b-4a32-9b1c-d2e3f4a5b6c7", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "JKT-JEAN-AM-L", barcode: "7790000020902", size: Size.L as Size, price: 79990, stock: 14, weightGrams: 1010 },


    // SOBRETODOS
    // SOBRETODOS
    // SOBRETODOS
    // SOBRETODOS
    // SOBRETODOS
    // Sobretodo liso negro -> Negro | M, L, XL
    { id: "e7f2a1c3-4b5d-4e8f-9a16-2c3d4e5f6a70", productId: "6c2d8f41-9a73-4b8f-8c12-7e5a3d1f9b24", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SBT-LIS-NEG-M", barcode: "7790000021001", size: Size.M as Size, price: 179990, stock: 12, weightGrams: 1250 },
    { id: "b1c2d3e4-5f6a-4b7c-8d9e-0a1b2c3d4e5f", productId: "6c2d8f41-9a73-4b8f-8c12-7e5a3d1f9b24", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SBT-LIS-NEG-L", barcode: "7790000021002", size: Size.L as Size, price: 179990, stock: 10, weightGrams: 1290 },
    { id: "c2d3e4f5-6a7b-4c8d-9e0f-1a2b3c4d5e6f", productId: "6c2d8f41-9a73-4b8f-8c12-7e5a3d1f9b24", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SBT-LIS-NEG-XL", barcode: "7790000021003", size: Size.XL as Size, price: 179990, stock: 8, weightGrams: 1330 },

    // Sobretodo Liso Azul Marino -> Azul Marino | M, L, XL
    { id: "d3e4f5a6-7b8c-4d9e-8f01-2a3b4c5d6e7f", productId: "a7f3b2c1-4d8e-4a9f-9c31-0b2e5d7a8c96", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SBT-LIS-AM-M", barcode: "7790000021101", size: Size.M as Size, price: 179990, stock: 12, weightGrams: 1240 },
    { id: "e4f5a6b7-8c9d-4e0f-9a12-3b4c5d6e7f80", productId: "a7f3b2c1-4d8e-4a9f-9c31-0b2e5d7a8c96", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SBT-LIS-AM-L", barcode: "7790000021102", size: Size.L as Size, price: 179990, stock: 10, weightGrams: 1280 },
    { id: "f5a6b7c8-9d0e-4f1a-8b23-4c5d6e7f8091", productId: "a7f3b2c1-4d8e-4a9f-9c31-0b2e5d7a8c96", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "SBT-LIS-AM-XL", barcode: "7790000021103", size: Size.XL as Size, price: 179990, stock: 8, weightGrams: 1320 },

    // Sobretodo fantasía gris oscuro -> Gris Oscuro | L, M
    { id: "a6b7c8d9-0e1f-4a2b-9c34-5d6e7f8091a2", productId: "3e1b7c5a-2d49-46f8-8a90-1c2d3e4f5b6a", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "SBT-FAN-GRO-M", barcode: "7790000021201", size: Size.M as Size, price: 179990, stock: 12, weightGrams: 1260 },
    { id: "b7c8d9e0-1f2a-4b3c-8d45-6e7f8091a2b3", productId: "3e1b7c5a-2d49-46f8-8a90-1c2d3e4f5b6a", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "SBT-FAN-GRO-L", barcode: "7790000021202", size: Size.L as Size, price: 179990, stock: 10, weightGrams: 1300 },

    // Sobretodo liso corto slim negro -> Negro (solo M y L por calce slim)
    { id: "c8d9e0f1-2a3b-4c5d-8e56-7f8091a2b3c4", productId: "bd5c2e1a-7f34-4a9d-8e12-3c4b5a6d7e8f", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SBT-SLM-NEG-M", barcode: "7790000021301", size: Size.M as Size, price: 179990, stock: 10, weightGrams: 1180 },
    { id: "d9e0f1a2-3b4c-4d5e-8f67-8091a2b3c4d5", productId: "bd5c2e1a-7f34-4a9d-8e12-3c4b5a6d7e8f", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SBT-SLM-NEG-L", barcode: "7790000021302", size: Size.L as Size, price: 179990, stock: 8, weightGrams: 1210 },

    // Sobretodo liso corto slim gris oscuro -> Gris Oscuro (solo M y L)
    { id: "e0f1a2b3-4c5d-4e6f-8a78-91a2b3c4d5e6", productId: "f0a9c3b2-6d1e-4f8a-9b20-7c3d2e1f4a68", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "SBT-SLM-GRO-M", barcode: "7790000021401", size: Size.M as Size, price: 179990, stock: 10, weightGrams: 1180 },
    { id: "f1a2b3c4-5d6e-4f70-8b89-a2b3c4d5e6f7", productId: "f0a9c3b2-6d1e-4f8a-9b20-7c3d2e1f4a68", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "SBT-SLM-GRO-L", barcode: "7790000021402", size: Size.L as Size, price: 179990, stock: 8, weightGrams: 1210 },

    // REMERA MANGA LARGA
    // REMERA MANGA LARGA
    // REMERA MANGA LARGA
    // Remera lisa flamé terracota -> Beige (tono cálido cercano)
    { id: "8c2f1b7a-4e65-4f0b-8a91-3d5e7f2a9c41", productId: "f0a9c3b2-322f-4f8a-3225-7c3d2e1f4a68", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "RMR-FLM-BEI-M", barcode: "7790000022001", size: Size.M as Size, price: 299990, stock: 24, weightGrams: 260 },
    { id: "1a6e5c3b-9f20-4bd8-9a7c-2e4f6a1b7c93", productId: "f0a9c3b2-322f-4f8a-3225-7c3d2e1f4a68", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "RMR-FLM-BEI-L", barcode: "7790000022002", size: Size.L as Size, price: 299990, stock: 22, weightGrams: 280 },
    { id: "5b3d2e1f-6a7c-4d8e-8f01-2a3b4c5d6e71", productId: "f0a9c3b2-322f-4f8a-3225-7c3d2e1f4a68", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "RMR-FLM-BEI-XL", barcode: "7790000022003", size: Size.XL as Size, price: 299990, stock: 18, weightGrams: 300 },

    { id: "9b1c2d3e-4f5a-4b7c-8d91-0a1b2c3d4e63", productId: "f0a9c3b2-6d1e-4f8a-9b20-2342sdfsdww", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "RMR-FLM-VER-M", barcode: "7790000022101", size: Size.M as Size, price: 299990, stock: 24, weightGrams: 260 },
    { id: "ad5e6f70-1b2c-4d3e-8f98-1a2b3c4d5e74", productId: "f0a9c3b2-6d1e-4f8a-9b20-2342sdfsdww", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "RMR-FLM-VER-L", barcode: "7790000022102", size: Size.L as Size, price: 299990, stock: 22, weightGrams: 280 },
    { id: "be6f7081-2c3d-4e4f-9a07-2b3c4d5e6f75", productId: "f0a9c3b2-6d1e-4f8a-9b20-2342sdfsdww", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "RMR-FLM-VER-XL", barcode: "7790000022103", size: Size.XL as Size, price: 299990, stock: 18, weightGrams: 300 },

    // JEANS
    // JEANS
    // JEANS
    // Jean Estático Negro -> Negro
    { id: "d3b1a6f2-7c45-4a9e-8b12-3e5f7a9c0d41", productId: "34234fds-6d1e-4f8a-9b20-2342sdfsdww", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "JEA-EST-NEG-M", barcode: "7790000023001", size: Size.M as Size, price: 65999, stock: 20, weightGrams: 720 },
    { id: "e4c2b7a1-8d56-4b0f-9a23-4f6a8b0c1d52", productId: "34234fds-6d1e-4f8a-9b20-2342sdfsdww", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "JEA-EST-NEG-L", barcode: "7790000023002", size: Size.L as Size, price: 65999, stock: 18, weightGrams: 740 },
    { id: "f5d3c8b2-9e67-4c1a-8b34-5a7b9c1d2e63", productId: "34234fds-6d1e-4f8a-9b20-2342sdfsdww", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "JEA-EST-NEG-XL", barcode: "7790000023003", size: Size.XL as Size, price: 65999, stock: 16, weightGrams: 760 },

    // Jean Estático Azul Marino -> Azul Marino
    { id: "a6e2d1c3-4b59-4e8f-9a16-2c3d4e5f6a70", productId: "6sgf5d-6d1e-4f8a-3432ds-2342sdfsdww", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "JEA-EST-AM-M", barcode: "7790000023101", size: Size.M as Size, price: 65999, stock: 20, weightGrams: 720 },
    { id: "b7f3e2d1-5c6a-4f90-8a27-3d4e5f6a7b81", productId: "6sgf5d-6d1e-4f8a-3432ds-2342sdfsdww", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "JEA-EST-AM-L", barcode: "7790000023102", size: Size.L as Size, price: 65999, stock: 18, weightGrams: 740 },
    { id: "c8f4f3e2-6d7b-4fa1-9b38-4e5f6a7b8c92", productId: "6sgf5d-6d1e-4f8a-3432ds-2342sdfsdww", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "JEA-EST-AM-XL", barcode: "7790000023103", size: Size.XL as Size, price: 65999, stock: 16, weightGrams: 760 },

    // Jean gastado slim gris claro -> Gris Claro (slim: M y L)
    { id: "d9a1b2c3-4d5e-4f70-8b89-a2b3c4d5e6f7", productId: "sdesed-6d1e-4f8a-sdfs-2342sdfsdfww", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "JEA-GAS-GRC-M", barcode: "7790000023201", size: Size.M as Size, price: 65990, stock: 18, weightGrams: 710 },
    { id: "e0b2c3d4-5e6f-40a8-8b9c-1d2e3f4a5b6c", productId: "sdesed-6d1e-4f8a-sdfs-2342sdfsdfww", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "JEA-GAS-GRC-L", barcode: "7790000023202", size: Size.L as Size, price: 65990, stock: 16, weightGrams: 730 },

    // SACOS
    // SACOS
    // SACOS
    // Saco corderoy slim gris -> Gris
    { id: "8f3a9c21-5d6e-4b7a-8c91-2e3f5a7b9c01", productId: "sdesed-6d132e-4f8a-sdfs-23324", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "SAC-COR-GRI-M", barcode: "7790000024001", size: Size.M as Size, price: 129990, stock: 10, weightGrams: 880 },
    { id: "1b2c3d4e-5f60-4a7b-8c9d-0e1f2a3b4c52", productId: "sdesed-6d132e-4f8a-sdfs-23324", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "SAC-COR-GRI-L", barcode: "7790000024002", size: Size.L as Size, price: 129990, stock: 8, weightGrams: 910 },

    // Saco de punto liso gris claro -> Gris Claro
    { id: "2c3d4e5f-6071-4b8c-9d0e-1f2a3b4c5d63", productId: "sdesed-6d1e-43dw-sdfs-323423sdsdf", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "SAC-PTO-GRC-M", barcode: "7790000024101", size: Size.M as Size, price: 129990, stock: 12, weightGrams: 820 },
    { id: "3d4e5f60-7182-4c9d-8e0f-2a3b4c5d6e74", productId: "sdesed-6d1e-43dw-sdfs-323423sdsdf", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "SAC-PTO-GRC-L", barcode: "7790000024102", size: Size.L as Size, price: 129990, stock: 10, weightGrams: 850 },

    // Saco gamuzado slim marrón oscuro -> Marrón
    { id: "4e5f6071-8293-4dae-9f10-3b4c5d6e7f85", productId: "sdesed-634d1e-4f8a-sdfs-2342sdfsdfww", colorId: "c05d8c73-e8aa-4456-8jf1-b6i71d4e45ad", sku: "SAC-GAM-MAR-M", barcode: "7790000024201", size: Size.M as Size, price: 129990, stock: 10, weightGrams: 900 },
    { id: "5f607182-93a4-4ebf-8011-4c5d6e7f8a96", productId: "sdesed-634d1e-4f8a-sdfs-2342sdfsdfww", colorId: "c05d8c73-e8aa-4456-8jf1-b6i71d4e45ad", sku: "SAC-GAM-MAR-L", barcode: "7790000024202", size: Size.L as Size, price: 129990, stock: 8, weightGrams: 930 },

    // Saco de punto liso azul claro -> Celeste
    { id: "60718293-a4b5-4fc0-9122-5d6e7f8a9b07", productId: "sdesed-6d1e-4fwer8a-sdfs-2342sdfs2dfww", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "SAC-PTO-CEL-M", barcode: "7790000024301", size: Size.M as Size, price: 129990, stock: 12, weightGrams: 820 },
    { id: "718293a4-b5c6-40d1-8233-6e7f8a9b0c18", productId: "sdesed-6d1e-4fwer8a-sdfs-2342sdfs2dfww", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "SAC-PTO-CEL-L", barcode: "7790000024302", size: Size.L as Size, price: 129990, stock: 10, weightGrams: 850 },

    // Saco de punto liso arena -> Beige
    { id: "8293a4b5-c6d7-41e2-9344-7f8a9b0c1d29", productId: "sdesed-6d1e-4f8a-sdfs-34werwew", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "SAC-PTO-BEI-M", barcode: "7790000024401", size: Size.M as Size, price: 129990, stock: 12, weightGrams: 820 },
    { id: "93a4b5c6-d7e8-42f3-a455-8a9b0c1d2e3a", productId: "sdesed-6d1e-4f8a-sdfs-34werwew", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "SAC-PTO-BEI-L", barcode: "7790000024402", size: Size.L as Size, price: 129990, stock: 10, weightGrams: 850 },

    // Saco de punto liso negro -> Negro
    { id: "a4b5c6d7-e8f9-4304-b566-9b0c1d2e3f4b", productId: "weds3-6d1e-4f8a-sdfs-2342sdfsdfww", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SAC-PTO-NEG-M", barcode: "7790000024501", size: Size.M as Size, price: 129990, stock: 12, weightGrams: 820 },
    { id: "b5c6d7e8-f9a0-4415-c677-0c1d2e3f4a5b", productId: "weds3-6d1e-4f8a-sdfs-2342sdfsdfww", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SAC-PTO-NEG-L", barcode: "7790000024502", size: Size.L as Size, price: 129990, stock: 10, weightGrams: 850 },

    // Saco velour fantasía verde oscuro -> Verde
    { id: "c6d7e8f9-a0b1-4526-d788-1d2e3f4a5b6c", productId: "sdf33-6d14e-4f8a-sdfs-2342sdfsdfww", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SAC-VEL-VER-M", barcode: "7790000024601", size: Size.M as Size, price: 129990, stock: 10, weightGrams: 880 },
    { id: "d7e8f9a0-b1c2-4637-e899-2e3f4a5b6c7d", productId: "sdf33-6d14e-4f8a-sdfs-2342sdfsdfww", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SAC-VEL-VER-L", barcode: "7790000024602", size: Size.L as Size, price: 129990, stock: 8, weightGrams: 910 },

    // Saco pana liso slim negro -> Negro
    { id: "e8f9a0b1-c2d3-4748-f9aa-3f4a5b6c7d8e", productId: "sdesed-342s-4f8a-sdwfs-2342sdfsdfww", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SAC-PAN-NEG-M", barcode: "7790000024701", size: Size.M as Size, price: 129990, stock: 10, weightGrams: 900 },
    { id: "f9a0b1c2-d3e4-4859-0abb-4a5b6c7d8e9f", productId: "sdesed-342s-4f8a-sdwfs-2342sdfsdfww", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SAC-PAN-NEG-L", barcode: "7790000024702", size: Size.L as Size, price: 129990, stock: 8, weightGrams: 930 },

    // Saco SS100 fantasía slim azulino -> Azul (o Azul Marino si preferís tono más oscuro)
    { id: "0a1b2c3d-4e5f-496a-8bbc-5b6c7d8e9f01", productId: "sdesed-sd32-4f8a-sdfs-sre232se", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "SAC-SS100-AZU-M", barcode: "7790000024801", size: Size.M as Size, price: 129990, stock: 12, weightGrams: 830 },
    { id: "1b2c3d4e-5f60-4a7b-9ccd-6c7d8e9f0a12", productId: "sdesed-sd32-4f8a-sdfs-sre232se", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "SAC-SS100-AZU-L", barcode: "7790000024802", size: Size.L as Size, price: 129990, stock: 10, weightGrams: 860 },

    // Saco corderoy slim marrón oscuro -> Marrón
    { id: "2c3d4e5f-6071-4b8c-addd-7d8e9f0a1b23", productId: "sdesed-gd1e-3333-sdfs-2342sdfsdfww", colorId: "c05d8c73-e8aa-4456-8jf1-b6i71d4e45ad", sku: "SAC-COR-MAR-M", barcode: "7790000024901", size: Size.M as Size, price: 129990, stock: 10, weightGrams: 900 },
    { id: "3d4e5f60-7182-4c9d-beee-8e9f0a1b2c34", productId: "sdesed-gd1e-3333-sdfs-2342sdfsdfww", colorId: "c05d8c73-e8aa-4456-8jf1-b6i71d4e45ad", sku: "SAC-COR-MAR-L", barcode: "7790000024902", size: Size.L as Size, price: 129990, stock: 8, weightGrams: 930 },

    // Saco de punto tramado slim tostado -> Tostado
    { id: "4e5f6071-8293-4dae-cfff-9f0a1b2c3d45", productId: "sdesed-6d1e-23wf-s22s-2342sdfsdfww", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SAC-PTO-TOS-M", barcode: "7790000025001", size: Size.M as Size, price: 129990, stock: 12, weightGrams: 840 },
    { id: "5f607182-93a4-4ebf-d111-0a1b2c3d4e56", productId: "sdesed-6d1e-23wf-s22s-2342sdfsdfww", colorId: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c", sku: "SAC-PTO-TOS-L", barcode: "7790000025002", size: Size.L as Size, price: 129990, stock: 10, weightGrams: 870 },

    // Saco de punto tramado azulino -> Azul
    { id: "60718293-a4b5-4fc0-e222-1b2c3d4e5f67", productId: "sdesed-6d1e-4f8a-sdfs-iuwhe7w32", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "SAC-PTO-AZU-M", barcode: "7790000025101", size: Size.M as Size, price: 129990, stock: 12, weightGrams: 840 },
    { id: "718293a4-b5c6-40d1-f333-2c3d4e5f6071", productId: "sdesed-6d1e-4f8a-sdfs-iuwhe7w32", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "SAC-PTO-AZU-L", barcode: "7790000025102", size: Size.L as Size, price: 129990, stock: 10, weightGrams: 870 },

    // Saco de punto tramado beige -> Beige
    { id: "8293a4b5-c6d7-41e2-0444-3d4e5f607182", productId: "sdesed-wwss-4f8a-sdfs-uwehriu82", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "SAC-PTO-BEJ-M", barcode: "7790000025201", size: Size.M as Size, price: 129990, stock: 12, weightGrams: 840 },
    { id: "93a4b5c6-d7e8-42f3-1555-4e5f60718293", productId: "sdesed-wwss-4f8a-sdfs-uwehriu82", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "SAC-PTO-BEJ-L", barcode: "7790000025202", size: Size.L as Size, price: 129990, stock: 10, weightGrams: 870 },

    // Saco en gabardina beige -> Beige
    { id: "a4b5c6d7-e8f9-4304-2666-5f60718293a4", productId: "sdesed-2sdfs-4f8a-sdfs-ygsdf7", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "SAC-GAB-BEJ-M", barcode: "7790000025301", size: Size.M as Size, price: 129990, stock: 12, weightGrams: 860 },
    { id: "b5c6d7e8-f9a0-4415-3777-60718293a4b5", productId: "sdesed-2sdfs-4f8a-sdfs-ygsdf7", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "SAC-GAB-BEJ-L", barcode: "7790000025302", size: Size.L as Size, price: 129990, stock: 10, weightGrams: 890 },

    // Saco en gabardina verde oscuro -> Verde
    { id: "c6d7e8f9-a0b1-4526-4888-718293a4b5c6", productId: "sdesed-6d1e-4n8a-sdfs-uuir43h8", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SAC-GAB-VER-M", barcode: "7790000025401", size: Size.M as Size, price: 129990, stock: 12, weightGrams: 860 },
    { id: "d7e8f9a0-b1c2-4637-5999-8293a4b5c6d7", productId: "sdesed-6d1e-4n8a-sdfs-uuir43h8", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "SAC-GAB-VER-L", barcode: "7790000025402", size: Size.L as Size, price: 129990, stock: 10, weightGrams: 890 },

    // Saco SS100 Fantasía fit negro -> Negro
    { id: "e8f9a0b1-c2d3-4748-6aaa-93a4b5c6d7e8", productId: "sdesed-89j3r44-4f8a-sdfs-uher873h3", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SAC-SS100-NEG-M", barcode: "7790000025501", size: Size.M as Size, price: 129990, stock: 12, weightGrams: 840 },
    { id: "f9a0b1c2-d3e4-4859-7bbb-a4b5c6d7e8f9", productId: "sdesed-89j3r44-4f8a-sdfs-uher873h3", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "SAC-SS100-NEG-L", barcode: "7790000025502", size: Size.L as Size, price: 129990, stock: 10, weightGrams: 870 },

    // CAMISAS DE VESTIR 
    // CAMISAS DE VESTIR 
    // CAMISAS DE VESTIR 
    // Camisa Lisa Negra (id producto: a3d4f5b6-7c89-4e12-b345-6789cdef0123)   
    { id: "fa1c2d3e-5061-42b3-8c3d-4e5f60718294", productId: "a3d4f5b6-7c89-4e12-b345-6789cdef0123", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "CAM-LIS-NEG-M", barcode: "7790000126101", size: Size.M as Size, price: 45990, stock: 22, weightGrams: 330, },
    { id: "0b2d3e4f-6172-43c4-9d4e-5f60718293a5", productId: "a3d4f5b6-7c89-4e12-b345-6789cdef0123", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "CAM-LIS-NEG-L", barcode: "7790000126102", size: Size.L as Size, price: 45990, stock: 18, weightGrams: 350, },

    // Camisa Lisa Azul Marino (id producto: c1e2f3a4-b567-48d9-91ef-23456789abcd)
    { id: "1c2e3f40-7283-44d5-8e5f-60718293a4b6", productId: "c1e2f3a4-b567-48d9-91ef-23456789abcd", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "CAM-LIS-AM-M", barcode: "7790000126201", size: Size.M as Size, price: 45990, stock: 22, weightGrams: 330, },
    { id: "2d3f4051-8394-45e6-9f60-718293a4b5c7", productId: "c1e2f3a4-b567-48d9-91ef-23456789abcd", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "CAM-LIS-AM-L", barcode: "7790000126202", size: Size.L as Size, price: 45990, stock: 18, weightGrams: 350, },

    // Camisa de vestir lisa blanca (id producto: 9f8a7654-3210-4cba-8def-abcdef123456)
    { id: "30415263-94a5-46f7-a071-8293a4b5c6d8", productId: "9f8a7654-3210-4cba-8def-abcdef123456", colorId: "15a2d1c8-3def-4f9b-9e40-0b7c62d38fa2", sku: "CAM-VES-LIS-BLA-M", barcode: "7790000126301", size: Size.M as Size, price: 45990, stock: 24, weightGrams: 320, },
    { id: "41526374-a5b6-4708-b182-93a4b5c6d7e9", productId: "9f8a7654-3210-4cba-8def-abcdef123456", colorId: "15a2d1c8-3def-4f9b-9e40-0b7c62d38fa2", sku: "CAM-VES-LIS-BLA-L", barcode: "7790000126302", size: Size.L as Size, price: 45990, stock: 22, weightGrams: 340, },
    { id: "52637485-b6c7-4819-b293-a4b5c6d7e8fa", productId: "9f8a7654-3210-4cba-8def-abcdef123456", colorId: "15a2d1c8-3def-4f9b-9e40-0b7c62d38fa2", sku: "CAM-VES-LIS-BLA-XL", barcode: "7790000126303", size: Size.XL as Size, price: 45990, stock: 18, weightGrams: 360, },

    // Camisa vestir cuadros bordo (id producto: def12345-6789-40ab-cdef-0123456789ab)
    { id: "63748596-c7d8-492a-c3a4-b5c6d7e8f901", productId: "def12345-6789-40ab-cdef-0123456789ab", colorId: "8c19483f-a466-4052-8fb7-72e3d90a0169", sku: "CAM-VES-CUA-BOR-M", barcode: "7790000126401", size: Size.M as Size, price: 45990, stock: 20, weightGrams: 330, },
    { id: "748596c7-d8e9-4a3b-d4b5-c6d7e8f90112", productId: "def12345-6789-40ab-cdef-0123456789ab", colorId: "8c19483f-a466-4052-8fb7-72e3d90a0169", sku: "CAM-VES-CUA-BOR-L", barcode: "7790000126402", size: Size.L as Size, price: 45990, stock: 18, weightGrams: 350, },
    { id: "8596c7d8-e9f0-4b4c-e5c6-d7e8f9011223", productId: "def12345-6789-40ab-cdef-0123456789ab", colorId: "8c19483f-a466-4052-8fb7-72e3d90a0169", sku: "CAM-VES-CUA-BOR-XL", barcode: "7790000126403", size: Size.XL as Size, price: 45990, stock: 16, weightGrams: 370, },

    // PANTALONES DE VESTIR
    // PANTALONES DE VESTIR
    // PANTALONES DE VESTIR
    // Pantalón Liso Gris Oscuro -> Gris Oscuro | M, L, XL
    { id: "e2a7b1c3-4d5e-4f78-8a19-2b3c4d5e6f70", productId: "def12345-6789-40ab-cwerdef-122werwere1", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "PAN-LIS-GRO-M", barcode: "7790000028001", size: Size.M as Size, price: 79990, stock: 18, weightGrams: 520 },
    { id: "f3b8c2d4-5e6f-40a9-9b2c-3d4e5f607182", productId: "def12345-6789-40ab-cwerdef-122werwere1", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "PAN-LIS-GRO-L", barcode: "7790000028002", size: Size.L as Size, price: 79990, stock: 16, weightGrams: 540 },
    { id: "a49c3e50-6172-41ba-8c3d-4e5f60718293", productId: "def12345-6789-40ab-cwerdef-122werwere1", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "PAN-LIS-GRO-XL", barcode: "7790000028003", size: Size.XL as Size, price: 79990, stock: 12, weightGrams: 560 },

    // Pantalón Liso Azul Marino -> Azul Marino| M, L, XL
    { id: "b5d1e460-7283-42cb-9d4e-5f60718293a4", productId: "def12345-6789-40ab-cdewrwef-21weqeqw", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "PAN-LIS-AM-M", barcode: "7790000028101", size: Size.M as Size, price: 79990, stock: 18, weightGrams: 520 },
    { id: "c6e2f571-8394-43dc-9e5f-60718293a4b5", productId: "def12345-6789-40ab-cdewrwef-21weqeqw", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "PAN-LIS-AM-L", barcode: "7790000028102", size: Size.L as Size, price: 79990, stock: 16, weightGrams: 540 },
    { id: "d7f30682-94a5-44ed-af60-718293a4b5c6", productId: "def12345-6789-40ab-cdewrwef-21weqeqw", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "PAN-LIS-AM-XL", barcode: "7790000028103", size: Size.XL as Size, price: 79990, stock: 12, weightGrams: 560 },

    // Pantalón Liso Gris -> Gris  | M, L, XL
    { id: "e8091a2b-5b6c-46f7-b071-8293a4b5c6d7", productId: "def12345-123w-40ab-qdfweq-0123456789ab", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "PAN-LIS-GRI-M", barcode: "7790000028201", size: Size.M as Size, price: 79990, stock: 18, weightGrams: 520 },
    { id: "f91a2b3c-6c7d-4708-c182-93a4b5c6d7e8", productId: "def12345-123w-40ab-qdfweq-0123456789ab", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "PAN-LIS-GRI-L", barcode: "7790000028202", size: Size.L as Size, price: 79990, stock: 16, weightGrams: 540 },
    { id: "0a2b3c4d-7d8e-4819-d293-a4b5c6d7e8f9", productId: "def12345-123w-40ab-qdfweq-0123456789ab", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "PAN-LIS-GRI-XL", barcode: "7790000028203", size: Size.XL as Size, price: 79990, stock: 12, weightGrams: 560 },

    // Pantalón Liso Negro -> Negro | M, L, XL
    { id: "1b2c3d4e-8e9f-492a-e3a4-b5c6d7e8f901", productId: "def1N2345-612312v789-v40ab-wqeq1-0123456789ab", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "PAN-LIS-NEG-M", barcode: "7790000028301", size: Size.M as Size, price: 79990, stock: 18, weightGrams: 520 },
    { id: "2c3d4e5f-9f01-4a3b-f4b5-c6d7e8f90112", productId: "def1N2345-612312v789-v40ab-wqeq1-0123456789ab", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "PAN-LIS-NEG-L", barcode: "7790000028302", size: Size.L as Size, price: 79990, stock: 16, weightGrams: 540 },
    { id: "3d4e5f60-a012-4b4c-05c6-d7e8f9011223", productId: "def1N2345-612312v789-v40ab-wqeq1-0123456789ab", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "PAN-LIS-NEG-XL", barcode: "7790000028303", size: Size.XL as Size, price: 79990, stock: 12, weightGrams: 560 },

    // Pantalón Liso Azulino -> Azul | M, L, XL
    { id: "4e5f6071-b123-4c5d-16d7-e8f901122334", productId: "1232N1131-6789-40ab-cdef-012345qweq6789ab", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "PAN-LIS-AZU-M", barcode: "7790000028401", size: Size.M as Size, price: 79990, stock: 18, weightGrams: 520 },
    { id: "5f607182-c234-4d6e-27e8-f90112233445", productId: "1232N1131-6789-40ab-cdef-012345qweq6789ab", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "PAN-LIS-AZU-L", barcode: "7790000028402", size: Size.L as Size, price: 79990, stock: 16, weightGrams: 540 },
    { id: "60718293-d345-4e7f-38f9-011223344556", productId: "1232N1131-6789-40ab-cdef-012345qweq6789ab", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "PAN-LIS-AZU-XL", barcode: "7790000028403", size: Size.XL as Size, price: 79990, stock: 12, weightGrams: 560 },

    // Pantalón SS100 liso fit azul marino -> Azul Marino | M, L, XL
    { id: "718293a4-e456-40f0-49aa-122334455667", productId: "qeewNq112-6789q-40ab-cdef-qweqasda2ewqqw", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "PAN-SS100-AM-M", barcode: "7790000028501", size: Size.M as Size, price: 79990, stock: 18, weightGrams: 520 },
    { id: "8293a4b5-f567-4101-5abb-233445566778", productId: "qeewNq112-6789q-40ab-cdef-qweqasda2ewqqw", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "PAN-SS100-AM-L", barcode: "7790000028502", size: Size.L as Size, price: 79990, stock: 16, weightGrams: 540 },

    // Pantalón de vestir liso negro (SS100) -> Negro || M, L
    { id: "93a4b5c6-0678-4212-6bcc-344556677889", productId: "dsads-345-6789-40eXwqweab-cdessf-asdad2d2", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "PAN-SS100-NEG-M", barcode: "7790000028601", size: Size.M as Size, price: 79990, stock: 18, weightGrams: 520 },
    { id: "a4b5c6d7-1789-4323-7cdd-45566778899a", productId: "dsads-345-6789-40eXwqweab-cdessf-asdad2d2", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "PAN-SS100-NEG-L", barcode: "7790000028602", size: Size.L as Size, price: 79990, stock: 16, weightGrams: 540 },

    // Pantalón vestir SS100 ultra slim negro -> Negro (ultra slim: M y L)
    { id: "b5c6d7e8-289a-4434-8dee-566778899aab", productId: "asdaAsdaq-6789-40ab-sXda-012341156789ab", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "PAN-SS100-US-NEG-M", barcode: "7790000028701", size: Size.M as Size, price: 79990, stock: 16, weightGrams: 510 },
    { id: "c6d7e8f9-39ab-4545-9eff-6778899aabbb", productId: "asdaAsdaq-6789-40ab-sXda-012341156789ab", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "PAN-SS100-US-NEG-L", barcode: "7790000028702", size: Size.L as Size, price: 79990, stock: 14, weightGrams: 530 },

    // Pantalón vestir SS100 ultra slim azul -> Azul Marino (ultra slim: M y L)
    { id: "d7e8f901-4abc-4656-af10-78899aabbbcc", productId: "sada1-6789-40ab-cvdef-0v12adsasd34562789ab", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "PAN-SS100-US-AM-M", barcode: "7790000028801", size: Size.M as Size, price: 79990, stock: 16, weightGrams: 510 },
    { id: "e8f90112-5bcd-4767-bf21-899aabbccdde", productId: "sada1-6789-40ab-cvdef-0v12adsasd34562789ab", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "PAN-SS100-US-AM-L", barcode: "7790000028802", size: Size.L as Size, price: 79990, stock: 14, weightGrams: 530 },

    // TRAJES
    // TRAJES
    // TRAJES
    // Traje SS100 liso ultra slim gris -> Gris (ultra slim: M, L)
    { id: "a92b1c3d-4e5f-46a7-8b19-203d4e5f6071", productId: "sada1-6789-40ab-sdfef-0v12adsasd34562789ab", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "TRA-SS100-US-GRI-M", barcode: "7790000029001", size: Size.M as Size, price: 199990, stock: 10, weightGrams: 1450 },
    { id: "b03c1d2e-5f60-41b8-9c2a-314e5f607182", productId: "sada1-6789-40ab-sdfef-0v12adsasd34562789ab", colorId: "6af7261d-8244-4e40-8d95-50c1b7i8ef47", sku: "TRA-SS100-US-GRI-L", barcode: "7790000029002", size: Size.L as Size, price: 199990, stock: 8, weightGrams: 1490 },

    // Traje SS100 liso ultra slim gris oscuro -> Gris Oscuro (ultra slim: M, L)
    { id: "c14d2e3f-6071-42c9-8d3b-425f60718293", productId: "sada1-6789-40ab-c324vdef-0v12adsasd34562789ab", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "TRA-SS100-US-GRO-M", barcode: "7790000029101", size: Size.M as Size, price: 199990, stock: 10, weightGrams: 1460 },
    { id: "d25e3f40-7182-43da-9e4c-5360718293a4", productId: "sada1-6789-40ab-c324vdef-0v12adsasd34562789ab", colorId: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36", sku: "TRA-SS100-US-GRO-L", barcode: "7790000029102", size: Size.L as Size, price: 199990, stock: 8, weightGrams: 1500 },

    // Traje Liso Azul Marino -> Azul Marino (ultra slim line: M, L)
    { id: "e36f4051-8293-44eb-af5d-64718293a4b5", productId: "sada1-6789-40ab-c3wq24vdef-0v12adsasd34562789ab", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "TRA-LIS-US-AM-M", barcode: "7790000029201", size: Size.M as Size, price: 199990, stock: 10, weightGrams: 1460 },
    { id: "f4805162-93a4-45fc-b06e-758293a4b5c6", productId: "sada1-6789-40ab-c3wq24vdef-0v12adsasd34562789ab", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "TRA-LIS-US-AM-L", barcode: "7790000029202", size: Size.L as Size, price: 199990, stock: 8, weightGrams: 1500 },

    // Traje Liso Negro -> Negro (ultra slim line: M, L)
    { id: "05162738-a4b5-460d-c17f-8693a4b5c6d7", productId: "sada1-6789-21wq3-c324vdef-0v12adsasd34562789ab", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "TRA-LIS-US-NEG-M", barcode: "7790000029301", size: Size.M as Size, price: 199990, stock: 10, weightGrams: 1470 },
    { id: "16273849-b5c6-471e-d280-9693a4b5c6d7", productId: "sada1-6789-21wq3-c324vdef-0v12adsasd34562789ab", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "TRA-LIS-US-NEG-L", barcode: "7790000029302", size: Size.L as Size, price: 199990, stock: 8, weightGrams: 1510 },

    // Traje SS100 liso slim tiza -> Gris Claro (slim: M, L, XL)
    { id: "2738495a-c6d7-482f-e391-0793a4b5c6d7", productId: "sada1-6789-dsaqwda-c324vdef-0v12adsasd34562789ab", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "TRA-SS100-SL-GRC-M", barcode: "7790000029401", size: Size.M as Size, price: 199990, stock: 12, weightGrams: 1480 },
    { id: "38495a6b-d7e8-4930-f4a2-1893a4b5c6d7", productId: "sada1-6789-dsaqwda-c324vdef-0v12adsasd34562789ab", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "TRA-SS100-SL-GRC-L", barcode: "7790000029402", size: Size.L as Size, price: 199990, stock: 10, weightGrams: 1520 },
    { id: "495a6b7c-e8f9-4a41-05b3-2993a4b5c6d7", productId: "sada1-6789-dsaqwda-c324vdef-0v12adsasd34562789ab", colorId: "7b08372e-9355-4f51-9ea6-61d2c8j9f058", sku: "TRA-SS100-SL-GRC-XL", barcode: "7790000029403", size: Size.XL as Size, price: 199990, stock: 8, weightGrams: 1560 },

    // Traje SS100 liso slim fit negro -> Negro (slim: M, L, XL)
    { id: "5a6b7c8d-f9a0-4b52-16c4-3a4b5c6d7e8f", productId: "sada1-6789-40aqwb-asdasd21-0v12adsasd34562789ab", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "TRA-SS100-SL-NEG-M", barcode: "7790000029501", size: Size.M as Size, price: 199990, stock: 12, weightGrams: 1480 },
    { id: "6b7c8d9e-0a1b-4c63-27d5-4b5c6d7e8f90", productId: "sada1-6789-40aqwb-asdasd21-0v12adsasd34562789ab", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "TRA-SS100-SL-NEG-L", barcode: "7790000029502", size: Size.L as Size, price: 199990, stock: 10, weightGrams: 1520 },
    { id: "7c8d9e0a-1b2c-4d74-38e6-5c6d7e8f901a", productId: "sada1-6789-40aqwb-asdasd21-0v12adsasd34562789ab", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "TRA-SS100-SL-NEG-XL", barcode: "7790000029503", size: Size.XL as Size, price: 199990, stock: 8, weightGrams: 1560 },

    // traje ss100 liso slim fit azul marino -> Azul Marino (slim: M, L, XL)
    { id: "8d9e0a1b-2c3d-4e85-49f7-6d7e8f901ab2", productId: "sad21a1-6789-40ab-asdd123-0v12adsasd34562789ab", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "TRA-SS100-SL-AM-M", barcode: "7790000029601", size: Size.M as Size, price: 199990, stock: 12, weightGrams: 1480 },
    { id: "9e0a1b2c-3d4e-4f96-5a08-7e8f901ab2c3", productId: "sad21a1-6789-40ab-asdd123-0v12adsasd34562789ab", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "TRA-SS100-SL-AM-L", barcode: "7790000029602", size: Size.L as Size, price: 199990, stock: 10, weightGrams: 1520 },
    { id: "0a1b2c3d-4e5f-4097-6b19-8f901ab2c3d4", productId: "sad21a1-6789-40ab-asdd123-0v12adsasd34562789ab", colorId: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3", sku: "TRA-SS100-SL-AM-XL", barcode: "7790000029603", size: Size.XL as Size, price: 199990, stock: 8, weightGrams: 1560 },

    // CHOMBAS
    // CHOMBAS
    // CHOMBAS
    // Chomba lisa piqué premium slim blanca -> Blanco (slim: M, L)
    { id: "6a7e4c6a-9d24-4a65-8d5a-9a9a6a5e2b7f", productId: "sad21a1-6789-234sdf-were23-0v122adsasd34562789ab", colorId: "15a2d1c8-3def-4f9b-9e40-0b7c62d38fa2", sku: "CHO-PRE-LIS-BLA-M", barcode: "7790000031101", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 260 },
    { id: "e5f9b8f8-3c1a-481e-9c1f-1b0a7a6b3c2d", productId: "sad21a1-6789-234sdf-were23-0v122adsasd34562789ab", colorId: "15a2d1c8-3def-4f9b-9e40-0b7c62d38fa2", sku: "CHO-PRE-LIS-BLA-L", barcode: "7790000031102", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 280 },

    // Chomba lisa piqué premium slim celeste -> Celeste (slim: M, L)
    { id: "f3c6c4f0-0f0a-4b52-9d6a-5a5d55f0b2b1", productId: "sad21a1-6789-40324ab-jsadniuanads-0v12adsasd34562789ab", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "CHO-PRE-LIS-CEL-M", barcode: "7790000031301", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 260 },
    { id: "6b9a4e8f-9e28-4aa1-84d3-36bcb5d4c9a7", productId: "sad21a1-6789-40324ab-jsadniuanads-0v12adsasd34562789ab", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "CHO-PRE-LIS-CEL-L", barcode: "7790000031302", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 280 },

    // Chomba piqué rayada negra -> Negro (regular: M, L, XL)
    { id: "c6e2b4d1-c4d2-4b3a-9d1e-1f0a3a5b7c6e", productId: "sad21a1-6723489-40ab-asdd234123-823u34klsdkldsf", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "CHO-PIQ-RAY-NEG-M", barcode: "7790000031401", size: Size.M as Size, price: 39990, stock: 22, weightGrams: 270 },
    { id: "4f6d9b1d-42d2-4b27-8b82-394f17d6a7f3", productId: "sad21a1-6723489-40ab-asdd234123-823u34klsdkldsf", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "CHO-PIQ-RAY-NEG-L", barcode: "7790000031402", size: Size.L as Size, price: 39990, stock: 20, weightGrams: 290 },
    { id: "b0af1a67-0f5f-4da7-9a63-0f9ce0e99b4b", productId: "sad21a1-6723489-40ab-asdd234123-823u34klsdkldsf", colorId: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91", sku: "CHO-PIQ-RAY-NEG-XL", barcode: "7790000031403", size: Size.XL as Size, price: 39990, stock: 16, weightGrams: 310 },

    // Chomba de jersey rosa -> Beige (no hay Rosa en el seed)
    { id: "1b0f0a20-9b7a-49d1-9d4e-1e5f7a9b0c2d", productId: "sad21a1-6234789-40ab-asdd234123-0v12adsasd34wjner92", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "CHO-JER-LIS-BEI-M", barcode: "7790000031501", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 260 },
    { id: "3d2a6b7c-7a1f-4abc-9d0e-4f0b1a2c3d4e", productId: "sad21a1-6234789-40ab-asdd234123-0v12adsasd34wjner92", colorId: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b", sku: "CHO-JER-LIS-BEI-L", barcode: "7790000031502", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 280 },

    // Chomba lisa lavada celeste -> Celeste (regular: M, L, XL)
    { id: "e7b6a5c4-9d3e-4f2a-8a1b-2c3d4e5f6a7b", productId: "sad21a1-6789-40123ab-asd12d123-73gr741h8rhiwuiewh", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "CHO-LAV-CEL-M", barcode: "7790000031601", size: Size.M as Size, price: 39990, stock: 22, weightGrams: 265 },
    { id: "c5d4e3f2-8a1b-4c2d-9e3f-4a5b6c7d8e9f", productId: "sad21a1-6789-40123ab-asd12d123-73gr741h8rhiwuiewh", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "CHO-LAV-CEL-L", barcode: "7790000031602", size: Size.L as Size, price: 39990, stock: 20, weightGrams: 285 },
    { id: "b4a3c2d1-7e6f-4031-9a2b-5c6d7e8f901a", productId: "sad21a1-6789-40123ab-asd12d123-73gr741h8rhiwuiewh", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "CHO-LAV-CEL-XL", barcode: "7790000031603", size: Size.XL as Size, price: 39990, stock: 16, weightGrams: 305 },

    // Chomba lisa de piqué blanca -> Blanco (slim: M, L)
    { id: "a9b8c7d6-5e4f-4a3b-9c2d-1e0f2a3b4c5d", productId: "sad21a1-6sd789-40ab-asdd123-837r43sfh43uisehiw", colorId: "15a2d1c8-3def-4f9b-9e40-0b7c62d38fa2", sku: "CHO-PIQ-LIS-BLA-M", barcode: "7790000031701", size: Size.M as Size, price: 39990, stock: 20, weightGrams: 260 },
    { id: "f1e0d2c3-b4a5-4c3d-8e9f-0a1b2c3d4e5f", productId: "sad21a1-6sd789-40ab-asdd123-837r43sfh43uisehiw", colorId: "15a2d1c8-3def-4f9b-9e40-0b7c62d38fa2", sku: "CHO-PIQ-LIS-BLA-L", barcode: "7790000031702", size: Size.L as Size, price: 39990, stock: 18, weightGrams: 280 },

    // Chomba rayada azulino -> Azul (regular: M, L, XL)
    { id: "0b1c2d3e-4f50-41a2-9b2c-3d4e5f607182", productId: "sad21a1-678dsf9-40ab-asfddd123-iweuhrs8e23huw", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "CHO-RAY-AZU-M", barcode: "7790000031801", size: Size.M as Size, price: 39990, stock: 22, weightGrams: 270 },
    { id: "16273849-5b6c-4708-b182-93a4b5c6d7e8", productId: "sad21a1-678dsf9-40ab-asfddd123-iweuhrs8e23huw", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "CHO-RAY-AZU-L", barcode: "7790000031802", size: Size.L as Size, price: 39990, stock: 20, weightGrams: 290 },
    { id: "28394a5b-6c7d-4819-c293-a4b5c6d7e8f9", productId: "sad21a1-678dsf9-40ab-asfddd123-iweuhrs8e23huw", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "CHO-RAY-AZU-XL", barcode: "7790000031803", size: Size.XL as Size, price: 39990, stock: 16, weightGrams: 310 },

    // Chomba rayada verde -> Verde (regular: M, L, XL)
    { id: "394a5b6c-7d8e-492a-d3a4-b5c6d7e8f901", productId: "sad2fds1a1-6sfd789-4sdf0ab-asdd123-ss872hruihseiwksdnsw3", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "CHO-RAY-VER-M", barcode: "7790000031901", size: Size.M as Size, price: 39990, stock: 22, weightGrams: 270 },
    { id: "4a5b6c7d-8e9f-4a3b-e4b5-c6d7e8f90112", productId: "sad2fds1a1-6sfd789-4sdf0ab-asdd123-ss872hruihseiwksdnsw3", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "CHO-RAY-VER-L", barcode: "7790000031902", size: Size.L as Size, price: 39990, stock: 20, weightGrams: 290 },
    { id: "5b6c7d8e-9f01-4b4c-f5c6-d7e8f9011223", productId: "sad2fds1a1-6sfd789-4sdf0ab-asdd123-ss872hruihseiwksdnsw3", colorId: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123", sku: "CHO-RAY-VER-XL", barcode: "7790000031903", size: Size.XL as Size, price: 39990, stock: 16, weightGrams: 310 },

    // Chomba de jersey azulino -> Azul (regular: M, L, XL)
    { id: "6c7d8e9f-0123-4c5d-0617-e8f901122334", productId: "sad21a1-6119-40ab-asd2d123-9823uuseikses", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "CHO-JER-AZU-M", barcode: "7790000032001", size: Size.M as Size, price: 39990, stock: 22, weightGrams: 270 },
    { id: "7d8e9f01-1234-4d6e-1728-f90112233445", productId: "sad21a1-6119-40ab-asd2d123-9823uuseikses", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "CHO-JER-AZU-L", barcode: "7790000032002", size: Size.L as Size, price: 39990, stock: 20, weightGrams: 290 },
    { id: "8e9f0112-2345-4e7f-2839-011223344556", productId: "sad21a1-6119-40ab-asd2d123-9823uuseikses", colorId: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14", sku: "CHO-JER-AZU-XL", barcode: "7790000032003", size: Size.XL as Size, price: 39990, stock: 16, weightGrams: 310 },

    // Chomba de jersey celeste claro -> Celeste (regular: M, L, XL)
    { id: "9f011223-3456-4f80-394a-112233445567", productId: "sad21a1-6789-4042ab-asdd123223-324378hr3hiuiew", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "CHO-JER-CEL-M", barcode: "7790000032101", size: Size.M as Size, price: 39990, stock: 22, weightGrams: 270 },
    { id: "01122334-4556-4081-4a5b-223344556678", productId: "sad21a1-6789-4042ab-asdd123223-324378hr3hiuiew", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "CHO-JER-CEL-L", barcode: "7790000032102", size: Size.L as Size, price: 39990, stock: 20, weightGrams: 290 },
    { id: "12233445-5667-4192-5b6c-334455667789", productId: "sad21a1-6789-4042ab-asdd123223-324378hr3hiuiew", colorId: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25", sku: "CHO-JER-CEL-XL", barcode: "7790000032103", size: Size.XL as Size, price: 39990, stock: 16, weightGrams: 310 },
];

export default productVariantsSeed;
