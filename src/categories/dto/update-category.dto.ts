import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

//export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
export class UpdateCategoryDto {
    @ApiProperty({ description: 'Category name', example: 'Camisa de Vestir', required: true })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Optional parent category identifier. If provided, this category will be a subcategory of the specified parent category.', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsOptional()
    @IsString()
    parentId?: string;
}
