export const generateSlug = (text: string): string => {
    const normalized = text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const processed = normalized
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
        .replace(/_{2,}/g, '_')
        .replace(/^_|_$/g, '');

    const hash = text
        ? btoa(text + Date.now().toString())
            .replace(/[^a-zA-Z0-9]/g, '')
            .substring(0, 6)
            .toLowerCase()
        : Math.random().toString(36).substring(2, 8);

    return processed ? `${processed}_${hash}` : `slug_${hash}`;
};

export function generateSKU(longitud: number = 8): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sku = '';
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        sku += caracteres.charAt(indice);
    }
    return sku;
}