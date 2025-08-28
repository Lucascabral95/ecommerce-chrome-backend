import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTagDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}