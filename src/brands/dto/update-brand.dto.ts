import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateBrandDto extends PartialType(CreateBrandDto) { }

export class ResponseUpdateBrandDto extends UpdateBrandDto {
    @ApiProperty({ description: 'Message', example: 'Brand updated successfully' })
    message: string;
}