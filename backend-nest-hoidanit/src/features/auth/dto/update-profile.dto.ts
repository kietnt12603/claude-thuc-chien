import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString({ message: 'Họ tên phải là chuỗi.' })
  @IsOptional()
  @MaxLength(100)
  fullName?: string;

  @IsString({ message: 'Số điện thoại phải là chuỗi.' })
  @IsOptional()
  @MaxLength(20)
  phone?: string;
}
