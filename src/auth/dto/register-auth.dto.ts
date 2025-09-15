import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterAuthDto {
    @IsOptional()
    @IsString()
    id?: string;

    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com'
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'User password (min 6 characters)',
        example: 'mySecurePassword123',
        minLength: 6
    })
    @IsString()
    @IsNotEmpty()
    hashedPassword: string;
}
