import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'Brand name', example: 'Brand name', required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Brand slug (generated automatically from name)', example: 'brand-slug', required: false })
    @IsString()
    @IsOptional()
    slug?: string;
}
