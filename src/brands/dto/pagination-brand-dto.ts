import { IsEnum, IsOptional } from "class-validator";
import { SortOrder } from "src/products/dto";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationBrandDto {
    @ApiProperty({ description: 'Sort order', example: 'ASC' })
    @IsOptional()
    @IsEnum(SortOrder)
    sortBy?: SortOrder;
}