import { IsEnum, IsOptional } from "class-validator";
import { SortOrder } from "src/products/dto";

export class PaginationBrandDto {
    @IsOptional()
    @IsEnum(SortOrder)
    sortBy?: SortOrder;
}