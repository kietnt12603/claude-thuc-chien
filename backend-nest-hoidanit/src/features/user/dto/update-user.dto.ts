import { IsString, IsEmail, MaxLength, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Email không đúng định dạng.' })
  @IsOptional()
  @MaxLength(255)
  email?: string;

  @IsString({ message: 'Họ tên phải là chuỗi.' })
  @IsOptional()
  @MaxLength(100)
  fullName?: string;

  @IsString({ message: 'Số điện thoại phải là chuỗi.' })
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsNumber({}, { message: 'ID Role phải là số.' })
  @IsOptional()
  roleId?: number;

  @IsBoolean({ message: 'Trạng thái hoạt động phải là boolean.' })
  @IsOptional()
  isActive?: boolean;
}
