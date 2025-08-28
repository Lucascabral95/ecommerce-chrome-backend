import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateColorDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    hex?: string;
}