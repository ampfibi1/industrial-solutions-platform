import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  private readonly MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB in bytes

  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!file) {
      throw new BadRequestException('NID image file is required.');
    }

    if (file.size > this.MAX_SIZE_BYTES) {
      throw new BadRequestException(
        `NID image must not exceed 2MB. Uploaded file size: ${(file.size / (1024 * 1024)).toFixed(2)}MB.`,
      );
    }

    // Validate file is an image (jpg, jpeg, png)
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'NID image must be a valid image file (jpg, jpeg, or png).',
      );
    }

    return file;
  }
}