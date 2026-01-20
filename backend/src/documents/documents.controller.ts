import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('documents')
export class DocumentsController {

    @Get('health')
    healthCheck() {
        return { status: 'ok' };
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadDoc(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No se recibió archivo');
        }
        if (file.mimetype !== 'application/pdf') {
            throw new BadRequestException('El archivo debe ser un PDF');
        }
        return {
            message: 'PDF recibido correctamente',
            filename: file.originalname,
            size: file.size,
        };
    }
}
