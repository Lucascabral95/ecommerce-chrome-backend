import { CreateTagDto } from "src/catalog/dto";

const tagsSeed: CreateTagDto[] = [
    // Categorías principales
    { id: "3f7a1b2c-5d6e-4f8a-9c10-2d3e4f5a6b7c", name: "Sweaters", slug: "sweaters" },
    { id: "4a8b2c3d-6e7f-4a9b-8d21-3e4f5a6b7c8d", name: "Camperas", slug: "camperas" },
    { id: "5b9c3d4e-7f80-4bac-7e32-4f5a6b7c8d9e", name: "Sobretodos", slug: "sobretodos" },
    { id: "6cad4e5f-8091-40bd-6f43-5a6b7c8d9e0f", name: "Camisas de Vestir", slug: "camisas-de-vestir" },
    { id: "7dbe5f60-9012-41ce-5f54-6b7c8d9e0f1a", name: "Remeras", slug: "remeras" },
    { id: "8ecf6071-a123-42df-4f65-7c8d9e0f1a2b", name: "Jeans", slug: "jeans" },
    { id: "9f017182-b234-43e0-3e76-8d9e0f1a2b3c", name: "Pantalones de Vestir", slug: "pantalones-de-vestir" },
    { id: "a0128394-c345-44f1-2d87-9e0f1a2b3c4d", name: "Sacos", slug: "sacos" },
    { id: "b12394a5-d456-4512-1c98-0f1a2b3c4d5e", name: "Chombas", slug: "chombas" },

    // Subtipos por categoría
    { id: "c234a5b6-e567-4623-0ba9-1a2b3c4d5e6f", name: "Sweater Polera", slug: "sweater-polera" },
    { id: "d345b6c7-f678-4734-9cab-2b3c4d5e6f70", name: "Sweater Campera", slug: "sweater-campera" },
    { id: "e456c7d8-0679-4845-8dbc-3c4d5e6f7081", name: "Sweater Escote V", slug: "sweater-escote-v" },
    { id: "f567d8e9-178a-4956-7ced-4d5e6f708192", name: "Sweater Fantasía", slug: "sweater-fantasia" },
    { id: "0617e9fa-289b-4a67-6def-5e6f708192a3", name: "Sweater Liso", slug: "sweater-liso" },

    { id: "1728f0ab-39ac-4b78-5ef0-6f708192a3b4", name: "Campera Inflada", slug: "campera-inflada" },
    { id: "2839f1bc-4abd-4c89-4f01-708192a3b4c5", name: "Campera de Jean", slug: "campera-de-jean" },
    { id: "394a02cd-5bce-4d9a-3f12-8192a3b4c5d6", name: "Campera Deportiva", slug: "campera-deportiva" },

    { id: "4a5b13de-6cdf-4eab-2f23-92a3b4c5d6e7", name: "Camisa Lisa", slug: "camisa-lisa" },
    { id: "5b6c24ef-7def-4fbc-1f34-a3b4c5d6e7f8", name: "Camisa a Cuadros", slug: "camisa-a-cuadros" },
    { id: "6c7d3500-8ef0-40cd-0f45-b4c5d6e7f809", name: "Camisa Rayada", slug: "camisa-rayada" },

    { id: "7d8e4611-9f01-41de-ff56-c5d6e7f8091a", name: "Jean Slim", slug: "jean-slim" },
    { id: "8e9f5722-a012-42ef-ee67-d6e7f8091a2b", name: "Jean Estático", slug: "jean-estatico" },
    { id: "9f108833-b123-43f0-dd78-e7f8091a2b3c", name: "Jean Gastado", slug: "jean-gastado" },

    { id: "a0199944-c234-4401-cc89-f8091a2b3c4d", name: "Pantalón Slim", slug: "pantalon-slim" },
    { id: "b12aaa55-d345-4512-bb9a-091a2b3c4d5e", name: "Pantalón SS100", slug: "pantalon-ss100" },

    { id: "c23bbb66-e456-4623-aaab-1a2b3c4d5e6f", name: "Saco Slim", slug: "saco-slim" },
    { id: "d34ccc77-f567-4734-999c-2b3c4d5e6f70", name: "Saco Fantasía", slug: "saco-fantasia" },
    { id: "e45ddd88-0678-4845-888d-3c4d5e6f7081", name: "Saco Corderoy", slug: "saco-corderoy" },
    { id: "f56eee99-1789-4956-777e-4d5e6f708192", name: "Saco Gabardina", slug: "saco-gabardina" },
    { id: "0617ffff-289a-4a67-666f-5e6f708192a3", name: "Saco de Punto", slug: "saco-de-punto" },

    { id: "172800aa-39ab-4b78-5550-6f708192a3b4", name: "Chomba Piqué", slug: "chomba-pique" },
    { id: "283901bb-4abc-4c89-4441-708192a3b4c5", name: "Chomba Jersey", slug: "chomba-jersey" },
    { id: "394a02cc-5bcd-4d9a-3332-8192a3b4c5d6", name: "Chomba Rayada", slug: "chomba-rayada" },
    { id: "4a5b13dd-6cde-4eab-2223-92a3b4c5d6e7", name: "Chomba Lisa", slug: "chomba-lisa" },

    // Atributos transversales (fit, material, temporada)
    { id: "5b6c24ee-7dee-4fbc-1114-a3b4c5d6e7f8", name: "Slim Fit", slug: "slim-fit" },
    { id: "6c7d34ff-8eef-40cd-0005-b4c5d6e7f809", name: "Ultra Slim", slug: "ultra-slim" },
    { id: "7d8e4600-9f00-41de-ff06-c5d6e7f8091a", name: "Regular Fit", slug: "regular-fit" },

    { id: "8e9f5701-a011-42ef-ee07-d6e7f8091a2b", name: "Poliéster", slug: "poliester" },
    { id: "9f108802-b122-43f0-dd08-e7f8091a2b3c", name: "Algodón", slug: "algodon" },
    { id: "a0199903-c233-4401-cc09-f8091a2b3c4d", name: "Rayón", slug: "rayon" },
    { id: "b12aaa04-d344-4512-bb10-091a2b3c4d5e", name: "Poliamida", slug: "poliamida" },
    { id: "c23bbb05-e455-4623-aa11-1a2b3c4d5e6f", name: "Elastano", slug: "elastano" },
    { id: "d34ccc06-f566-4734-9912-2b3c4d5e6f70", name: "Acrílico", slug: "acrilico" },
    { id: "e45ddd07-0677-4845-8813-3c4d5e6f7081", name: "Viscosa", slug: "viscosa" },

    { id: "f56eee08-1788-4956-7714-4d5e6f708192", name: "Invierno", slug: "invierno" },
    { id: "0617ff09-2899-4a67-6615-5e6f708192a3", name: "Otoño", slug: "otono" }
];

export default tagsSeed;
