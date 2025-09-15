import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class GetPreferenceUserDto {
    @ApiProperty({ description: 'OK', example: true })
    @IsBoolean()
    ok: boolean;

    @ApiProperty({ description: 'ID', example: '2653232273071-32423423-3424-f234-b7a3-23432werwe' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'Init point', example: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=2653232273071-32423423-3424-f234-b7a3-23432werwe' })
    @IsString()
    init_point: string;

    @ApiProperty({ description: 'Sandbox init point', example: 'https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=2653232273071-32423423-3424-f234-b7a3-23432werwe' })
    @IsString()
    sandbox_init_point: string;

    @ApiProperty({ description: 'User', example: '2653232273071-32423423-3424-f234-b7a3-23432werwe' })
    @IsString()
    user: string;

    @ApiProperty({ description: 'External reference', example: 'payment_6e678f4c-c0a7-3432-be7a-29191bf49955_1757881809753' })
    @IsString()
    externalReference: string;
}