import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({ description: 'User email address', example: 'john.doe@example.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'User password', example: 'mySecurePassword123' })
    @IsString()
    @IsNotEmpty()
    hashedPassword: string;
}