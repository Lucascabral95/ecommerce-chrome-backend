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

    @IsEnum(RoleName)
    name: RoleName;
}
