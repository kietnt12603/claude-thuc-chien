import { IsString, IsEmail, IsNotEmpty, MaxLength, IsOptional, MinLength, IsBoolean, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không đúng định dạng.' })
  @IsNotEmpty({ message: 'Email không được để trống.' })
  @MaxLength(255)
  email: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi.' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống.' })
  @MinLength(6, { message: 'Mật khẩu phải từ 6 ký tự.' })
  @MaxLength(255)
  password: string;

  @IsString({ message: 'Họ tên phải là chuỗi.' })
  @IsNotEmpty({ message: 'Họ tên không được để trống.' })
  @MaxLength(100)
  fullName: string;

  @IsString({ message: 'Số điện thoại phải là chuỗi.' })
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsNumber({}, { message: 'ID Role phải là số.' })
  @IsNotEmpty({ message: 'Vai trò (Role ID) không được để trống.' })
  roleId: number;

  @IsBoolean({ message: 'Trạng thái hoạt động phải là boolean.' })
  @IsOptional()
  isActive?: boolean;
}
