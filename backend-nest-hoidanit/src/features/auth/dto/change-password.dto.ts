import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'Mật khẩu hiện tại phải là chuỗi.' })
  @IsNotEmpty({ message: 'Mật khẩu hiện tại không được để trống.' })
  currentPassword: string;

  @IsString({ message: 'Mật khẩu mới phải là chuỗi.' })
  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống.' })
  @MinLength(6, { message: 'Mật khẩu mới phải từ 6 ký tự.' })
  @MaxLength(255)
  newPassword: string;
}
