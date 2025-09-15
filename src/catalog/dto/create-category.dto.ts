import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'Category name', example: 'Shirt XL', required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Parent category id', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    parentId?: string;

    @ApiProperty({ description: 'Category slug (generated automatically from name)', example: 'shirt_xl', required: false })
    @IsString()
    @IsOptional()
    slug?: string;
}

class Category {
    @ApiProperty({
        description: 'Unique identifier for the category',
        example: '123e4567-e89b-4d89-983d-1234567890ab'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'Name of the category',
        example: 'Shirts'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'URL-friendly version of the category name',
        example: 'shirts'
    })
    @IsString()
    slug: string;

    @ApiProperty({
        description: 'ID of the parent category (for subcategories)',
        example: '123e4567-e89b-4d89-983d-1234567890ab',
        required: false
    })
    @IsString()
    @IsOptional()
    parentId?: string;
}

export class ResponseCreateCategoryDto {
    @ApiProperty({
        description: 'The created category object',
        type: Category
    })
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => Category)
    category: Category;

    @ApiProperty({
        description: 'Success message',
        example: 'Category created successfully'
    })
    @IsString()
    message: string;
}