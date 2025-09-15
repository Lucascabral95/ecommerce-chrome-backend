import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';

class UserRegister {
  @ApiProperty({ description: "User unique identifier", type: String, example: "123e4567-e89b-12d3-a456-426655440000" })
  @IsString()
  id: string;

  @ApiProperty({ description: "User name", type: String, example: "John Doe" })
  @IsString()
  name: string;

  @ApiProperty({ description: "User email", type: String, example: "john.doe@example.com" })
  @IsString()
  email: string;
}

export class GetResponseRegisterDto {
  @ApiProperty({
    description: "Registered user dta",
    type: UserRegister
  })
  @IsObject()
  @Type(() => UserRegister)
  @ValidateNested({ each: true })
  user: UserRegister;

  @ApiProperty({
    description: "Registration success message",
    type: String,
    example: "User created successfully"
  })
  message: string;
}

export class GetResponseLoginDto {
  @ApiProperty({
    description: "Login success message",
    type: String,
    example: "Login successful"
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: "Access token (JWT)",
    type: String,
    example: "gfgfgfdgfdfgd.eyJzdWIiOiIxMjM0NTY3ODkwIiwigfdfggfdfgdfdbmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2ggfdfgdfgdfdgQT4fwpMeJf36POk6yJV_adQssw5c"
  })
  @IsString()
  accessToken: string;
}
