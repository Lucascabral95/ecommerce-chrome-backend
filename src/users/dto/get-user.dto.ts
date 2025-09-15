import { IsArray, IsBoolean, IsDate, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class Roles {
    @ApiProperty({ description: 'User id', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'Role id', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    roleId: string;
}

class Addresses {
    @ApiProperty({ description: 'Unique identifier for the address', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'ID of the user this address belongs to', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'First name of the address recipient', example: 'John' })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'Last name of the address recipient', example: 'Doe' })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'Contact phone number', example: '+541112345678', required: false })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ description: 'Primary street address', example: '123 Main St', required: false })
    @IsString()
    @IsOptional()
    street1?: string;

    @ApiProperty({ description: 'Secondary address line (apartment, suite, etc.)', example: 'Apt 4B', required: false })
    @IsString()
    @IsOptional()
    street2?: string;

    @ApiProperty({ description: 'City name', example: 'Buenos Aires' })
    @IsString()
    city: string;

    @ApiProperty({ description: 'State or province', example: 'Buenos Aires', required: false })
    @IsString()
    @IsOptional()
    state?: string;

    @ApiProperty({ description: 'Postal or ZIP code', example: 'C1430', required: false })
    @IsString()
    @IsOptional()
    postalCode?: string;

    @ApiProperty({ description: 'Country name', example: 'Argentina' })
    @IsString()
    country: string;

    @ApiProperty({ description: 'Whether this is the default shipping/billing address', example: true })
    @IsBoolean()
    isDefault: boolean;

    @ApiProperty({ description: 'Date when the address was created', example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ description: 'Date when the address was last updated', example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    updatedAt: Date;
}

class Carts {
    @ApiProperty({ description: 'Cart id', example: '123e4567-e89b-4d17-85e8-697eb7772111' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'User id', example: '123e4567-e89b-4d17-85e8-697eb7772111' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'Session id of the cart of inlogin', example: '123e4567-e89b-4d17-85e8-697eb7772111' })
    @IsString()
    sessionId: string;

    @ApiProperty({ description: 'Date of creation of the cart', example: '2022-01-01T00:00:00.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ description: 'Date of update of the cart', example: '2022-01-01T00:00:00.000Z' })
    @IsDate()
    updatedAt: Date;
}

export class User {
    @ApiProperty({ description: "User id", type: String, example: "1" })
    @IsString()
    id: string;

    @ApiProperty({ description: "User email", type: String, example: "user@example.com" })
    @IsString()
    email: string;

    @ApiProperty({ description: "User name", type: String, example: "User Name" })
    @IsString()
    name: string;

    @ApiProperty({ description: "User roles", type: [Roles] })
    @Type(() => Roles)
    @ValidateNested({ each: true })
    @IsArray()
    roles: Roles[]

    @ApiProperty({ description: "User addresses", type: [Addresses] })
    @Type(() => Addresses)
    @ValidateNested({ each: true })
    @IsArray()
    addresses: Addresses[]

    @ApiProperty({ description: "User carts", type: [Carts] })
    @Type(() => Carts)
    @ValidateNested({ each: true })
    @IsArray()
    carts: Carts[]
}

export class GetUserDto {
    @ApiProperty({ description: "Page number", type: Number, example: 1 })
    @IsNumber()
    page: number;

    @ApiProperty({ description: "Limit number", type: Number, example: 10 })
    @IsNumber()
    limit: number;

    @ApiProperty({ description: "Total number", type: Number, example: 10 })
    @IsNumber()
    total: number;

    @ApiProperty({ description: "Previous page", type: Boolean, example: false })
    @IsBoolean()
    prevPage: boolean;

    @ApiProperty({ description: "Next page", type: Boolean, example: false })
    @IsBoolean()
    nextPage: boolean;

    @ApiProperty({ description: "Users data", type: [User] })
    @Type(() => User)
    @ValidateNested({ each: true })
    @IsArray()
    users: User[];
}

export class GetUserByIdDto {  // Obtiene los datos de un usuario por UserId
    @ApiProperty({ description: "User data", type: User })
    @IsObject()
    user: User;
}