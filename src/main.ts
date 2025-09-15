import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/env.schema';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import corsOptions from './config/cors';
import routesExcludesPrefix from './config/routes-excludes-prefix';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.setGlobalPrefix('api/v1', {
    exclude: routesExcludesPrefix
  });

  const config = new DocumentBuilder()
    .setTitle('Ecommerce Chroma - API RESTful')
    .setDescription(`
      ## 📚 Descripción General
      API RESTful para el sistema de Ecommerce Chroma.
      Maneja la gestión de productos, usuarios, carritos, pedidos y pagos.
  
      ### 🔍 Módulos Principales
      - **Autenticación**: Registro, login y gestión de sesiones
      - **Catálogo**: Gestión de productos y categorías
      - **Carrito**: Manejo de carritos de compras
      - **Órdenes**: Procesamiento y seguimiento de pedidos
      - **Pagos**: Integración con pasarelas de pago
      - **Usuarios**: Gestión de perfiles y roles
  
      ### 🛠️ Tecnologías
      - NestJS 10+
      - Prisma ORM
      - JWT para autenticación
      - Swagger para documentación interactiva
    `)
    .setVersion('1.0.0')
    .setContact(
      'Lucas Cabral',
      'https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/',
      'lucassimple1995@hotmail.com'
    )
    .addTag('🔐 Auth', 'Autenticación y autorización')
    .addTag('📦 Products', 'Gestión de productos')
    .addTag('🛒 Cart', 'Carrito de compras')
    .addTag('📋 Orders', 'Gestión de pedidos')
    .addTag('💳 Payments', 'Procesamiento de pagos')
    .addTag('� Catalog', 'Gestión de catalogos')
    .addTag('👥 Users', 'Gestión de usuarios')
    .addTag('🏷️ Brands', 'Administración de marcas')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = envs.port || 4000;

  await app.listen(port);
}
bootstrap();
