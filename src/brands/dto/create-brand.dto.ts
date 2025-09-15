import { IsObject, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateBrandDto {
    @ApiProperty({ description: 'Brand name', example: 'Devre' })
    @IsString()
    name: string;
}

class Brand {
    @ApiProperty({ description: 'Brand id', example: '123e4567-e89b-12d3-a456-426655440000' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'Brand name', example: 'Devre' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Brand slug', example: 'devre' })
    @IsString()
    slug: string;
}

export class ResponseCreateBrandDto {
    @ApiProperty({ description: 'Brand', type: Brand })
    @Type(() => Brand)
    @ValidateNested({ each: true })
    @IsObject()
    brand: Brand;

    @ApiProperty({ description: 'Message', example: 'Brand created successfully' })
    @IsString()
    message: string;
}