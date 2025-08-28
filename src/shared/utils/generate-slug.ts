export const generateSlug = (text: string): string => {
    return text.toLowerCase().trim().replace(/\s+/g, '_');
};