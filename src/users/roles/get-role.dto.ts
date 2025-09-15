import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetRoleDto {
    @ApiProperty({ description: 'Role id', example: '123e4567-e89b-4d17-85e8-697eb7772111' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'Role name', example: 'USER' })
    @IsString()
    name: string;
}