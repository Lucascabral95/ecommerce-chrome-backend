import { OrderBy } from "src/orders/dto";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationCartDto {
    @ApiProperty({ description: 'Page number', example: 1 })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    page?: number;

    @ApiProperty({ description: 'Limit number', example: 10 })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    limit?: number;

    @ApiProperty({ description: 'Order by', example: 'DESC' })
    @IsEnum(OrderBy)
    @IsOptional()
    orderBy?: OrderBy = OrderBy.DESC;
}