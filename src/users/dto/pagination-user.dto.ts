import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { envs } from "src/config/env.schema";

import { Transform } from "class-transformer";
import { SortOrder } from "src/products/dto";

export class PaginationUserDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || 1)
    page?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || envs.limit)
    limit?: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsEnum(SortOrder)
    @IsOptional()
    orderBy?: SortOrder;
}
