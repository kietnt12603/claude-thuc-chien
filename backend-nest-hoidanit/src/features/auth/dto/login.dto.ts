import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email không đúng định dạng.' })
  @IsNotEmpty({ message: 'Email không được để trống.' })
  @MaxLength(255)
  email: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi.' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống.' })
  password: string;
}
