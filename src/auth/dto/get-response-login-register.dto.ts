import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';

class UserRegister {
  id: string;
  name: string;
  email: string;
}

export class GetResponseRegisterDto {
  @ApiProperty({
    description: "User data",
    type: UserRegister,
    example: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com"
    }
  })
  @IsObject()
  @Type(() => UserRegister)
  @ValidateNested({ each: true })
  user: UserRegister;

  @ApiProperty({
    description: "Success message",
    type: String,
    example: "User created successfully"
  })
  message: string;
}

export class GetResponseLoginDto {
  @ApiProperty({
    description: "Success message",
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
