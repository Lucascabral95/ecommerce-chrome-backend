import { ApiProperty } from "@nestjs/swagger";

export class GetCategoryDto {
    @ApiProperty({ description: 'Category identifier', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    id: string;

    @ApiProperty({ description: 'Category name', example: 'Camisa de Vestir' })
    name: string;

    @ApiProperty({ description: 'Category slug (generated automatically from name)', example: 'camisa_de_vestir' })
    slug: string;

    @ApiProperty({ description: 'Parent category identifier (for subcategories)', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    parentId?: string;
}