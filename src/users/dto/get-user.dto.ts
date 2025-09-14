import { IsArray, IsBoolean, IsDate, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class Roles {
    @IsString()
    userId: string;

    @IsString()
    roleId: string;
}

class Addresses {
    @IsString()
    id: string;

    @IsString()
    userId: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    street1?: string;

    @IsString()
    @IsOptional()
    street2?: string;

    @IsString()
    city: string;

    @IsString()
    @IsOptional()
    state?: string;

    @IsString()
    @IsOptional()
    postalCode?: string;

    @IsString()
    country: string;

    @IsBoolean()
    isDefault: boolean;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}

class Carts {
    @IsString()
    id: string;

    @IsString()
    userId: string;

    @IsString()
    sessionId: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}

class User {
    @IsString()
    id: string;

    @IsString()
    email: string;

    @IsString()
    name: string;

    @Type(() => Roles)
    @ValidateNested({ each: true })
    @IsArray()
    roles: Roles[]

    @Type(() => Addresses)
    @ValidateNested({ each: true })
    @IsArray()
    addresses: Addresses[]

    @Type(() => Carts)
    @ValidateNested({ each: true })
    @IsArray()
    carts: Carts[]
}


export class GetUserDto {
    @IsNumber()
    page: number;

    @IsNumber()
    limit: number;

    @IsNumber()
    total: number;

    @IsBoolean()
    prevPage: boolean;

    @IsBoolean()
    nextPage: boolean;

    @Type(() => User)
    @ValidateNested({ each: true })
    @IsArray()
    users: User[];
}

export class GetUserByIdDto {  // Obtiene los datos de un usuario por UserId
    @IsObject()
    user: User;
}