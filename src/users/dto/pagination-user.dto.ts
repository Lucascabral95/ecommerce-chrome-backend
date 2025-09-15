import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { envs } from "src/config/env.schema";

import { Transform } from "class-transformer";
import { SortOrder } from "src/products/dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationUserDto {
    @ApiPropertyOptional({
        description: 'Page number for pagination',
        example: 1,
        minimum: 1,
        default: 1
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || 1)
    page?: number;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        example: 10,
        minimum: 1,
        maximum: 100,
        default: envs.limit
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || envs.limit)
    limit?: number;

    @ApiPropertyOptional({
        description: 'Filter users by name (partial match)',
        example: 'John Doe'
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({
        description: 'Filter users by email (partial match)',
        example: 'john.doe@example.com',
    })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({
        description: 'Sort order for the results',
        enum: SortOrder,
        example: SortOrder.ASC
    })
    @IsEnum(SortOrder)
    @IsOptional()
    orderBy?: SortOrder;
}
