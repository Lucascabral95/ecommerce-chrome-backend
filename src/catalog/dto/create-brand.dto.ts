import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
