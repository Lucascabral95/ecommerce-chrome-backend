import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateColorDto {
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'Color name', example: 'Red', required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Color hex', example: '#FF0000', required: false })
    @IsString()
    @IsOptional()
    hex?: string;
}

export class Color {
    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ example: 'Red' })
    @IsString()
    name: string;

    @ApiProperty({ example: '#FF0000' })
    @IsString()
    hex?: string;
}

export class ResponseCreateColorDto {
    @ApiProperty({ type: Color })
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => Color)
    color: Color;

    @ApiProperty({ example: 'Color created successfully' })
    @IsString()
    message: string;
}