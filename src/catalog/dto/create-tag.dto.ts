import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateTagDto {
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'Tag name', example: 'Casual', required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Tag slug (generated automatically from name)', example: 'casual', required: false })
    @IsString()
    @IsOptional()
    slug?: string;
}

export class TagDto {
    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    id: string;

    @ApiProperty({ example: 'Casual' })
    name: string;

    @ApiProperty({ example: 'casual' })
    slug: string;
}

export class ResponseCreateTagDto {
    @ApiProperty({ type: TagDto })
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => TagDto)
    tag: TagDto;

    @ApiProperty({ example: 'Tag created successfully' })
    @IsString()
    message: string;
}

