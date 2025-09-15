import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetBrandsDto {
    @ApiProperty({ description: "Brand id", type: String, example: "123e4567-e89b-12d3-a456-426655440000" })
    @IsString()
    id: string;

    @ApiProperty({ description: "Brand name", type: String, example: "Devre" })
    @IsString()
    name: string;

    @ApiProperty({ description: "Brand slug", type: String, example: "devre" })
    @IsString()
    slug: string;
}