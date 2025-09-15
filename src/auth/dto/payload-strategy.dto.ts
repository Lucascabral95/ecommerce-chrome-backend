import { ApiProperty } from "@nestjs/swagger";

export class PayloadStrategyDto {
    @ApiProperty({
        description: 'User ID from the authentication token',
        example: '123e4567-e89b-4d89-983d-1234567890ab'
    })
    id: string;

    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com'
    })
    email: string;

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe'
    })
    name: string;
}