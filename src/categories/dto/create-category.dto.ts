import { IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateCategoryDto {
    @ApiProperty({ description: 'Category name', example: 'Camisa de Vestir', required: true })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Optional parent category identifier. If provided, this category will be a subcategory of the specified parent category.', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsOptional()
    @IsString()
    parentId?: string;
}

class GetCategoryDto {
    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ example: 'Camisa de Vestir' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'camisa_de_vestir' })
    @IsString()
    slug: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    parentId?: string;
}

export class ResponseCreateCategoryDto {
    @ApiProperty({ type: GetCategoryDto })
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => GetCategoryDto)
    category: GetCategoryDto;

    @ApiProperty({ example: 'Category created successfully' })
    @IsString()
    message: string;
}