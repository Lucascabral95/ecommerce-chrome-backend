import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterAuthDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    hashedPassword: string;
}
