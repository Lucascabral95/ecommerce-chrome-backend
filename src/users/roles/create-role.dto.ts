import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export enum RoleName {
    USER = 'USER',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN',
}

export class CreateRoleDto {
    @IsOptional()
    @IsString()
    id?: string;

    @ApiProperty({ description: 'The role that the user will have in the app', example: 'USER' })
    @IsEnum(RoleName)
    name: RoleName;
}
