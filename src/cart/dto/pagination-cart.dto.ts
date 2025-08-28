import { OrderBy } from "src/orders/dto";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class PaginationCartDto {
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    page?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    limit?: number;

    @IsEnum(OrderBy)
    @IsOptional()
    orderBy?: OrderBy = OrderBy.DESC;
}