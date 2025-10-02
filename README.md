<p align="center">
  <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS Logo" width="320"/>
</p>

# E-commerce Chroma Backend

## 📋 Descripción General

E-commerce Chroma Backend es una API RESTful robusta y escalable desarrollada con [NestJS](https://nestjs.com/) y TypeScript. Este proyecto sirve como el backend para una plataforma de comercio electrónico completa, ofreciendo funcionalidades avanzadas de gestión de productos, usuarios, carritos, pedidos y pagos.

## 🚀 Características Principales

- **Autenticación y Autorización**: Sistema seguro de registro y login con JWT, incluyendo roles de usuario.
- **Gestión de Productos**: CRUD completo para productos con variantes, imágenes y categorías.
- **Carrito de Compras**: Funcionalidad completa de carrito con persistencia.
- **Procesamiento de Pedidos**: Flujo completo de checkout y seguimiento de pedidos.
- **Pasarela de Pagos**: Integración con MercadoPago para procesamiento seguro de pagos.
- **Reserva Temporal de Stock**: Sistema que reserva automáticamente el stock durante 10 minutos al iniciar el checkout, garantizando disponibilidad hasta completar la compra. Si no se finaliza en ese tiempo, el stock regresa al inventario original.
- **API Documentada**: Documentación interactiva con Swagger/OpenAPI.
- **Validación de Datos**: Uso de `class-validator` y `class-transformer` para DTOs robustos.

## 🛠️ Tecnologías Utilizadas

- **Backend**: [NestJS](https://nestjs.com/), [TypeScript](https://www.typescriptlang.org/)
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/) con [Prisma ORM](https://www.prisma.io/)
- **Autenticación**: [JWT](https://jwt.io/), [Passport](http://www.passportjs.org/)
- **Documentación**: [Swagger/OpenAPI](https://swagger.io/)
- **Pagos**: [MercadoPago](https://www.mercadopago.com.ar/developers/es)
- **Contenedorización**: [Docker](https://www.docker.com/)
- **Variables de Entorno**: [dotenv](https://www.npmjs.com/package/dotenv), [Joi](https://joi.dev/)
- **Testing**: [Jest](https://jestjs.io/), [Supertest](https://www.npmjs.com/package/supertest)

## 📦 Estructura del Proyecto

```text
ecommerce-chroma-backend/
├── src/
│   ├── auth/               # Autenticación y autorización
│   ├── brands/             # Gestión de marcas
│   ├── cart/               # Carrito de compras
│   ├── catalog/            # Catálogo de productos
│   ├── categories/         # Categorías de productos
│   ├── config/             # Configuración de la aplicación
│   ├── errors/             # Gestión de errores
│   ├── orders/             # Gestión de pedidos
│   ├── payments/           # Integración con pasarelas de pago
│   ├── products/           # Gestión de productos
│   ├── users/              # Gestión de usuarios
│   ├── shared/             # Utilidades y código compartido
│   └── prisma/             # Configuración de Prisma ORM
│   └── stripe/             # Configuración de Stripe para los pagos de un ecommerce de Doraemon
├── prisma/
│   └── schema.prisma       # Esquema de la base de datos
├── test/                   # Pruebas automatizadas
└── .env.template           # Plantilla de variables de entorno
```

## 🚀 Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Lucascabral95/ecommerce-chrome-backend.git
   cd ecommerce-chroma-backend
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   - Copiar `.env.template` a `.env`
   - Configurar las variables según tu entorno

4. **Configurar la base de datos:**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Iniciar el servidor:**

   ```bash
   # Modo desarrollo
   npm run start:dev

   # Modo producción
   npm run build
   npm run start:prod
   ```

6. **Acceder a la documentación:**
   Abre tu navegador en `http://localhost:3000/api` para ver la documentación interactiva de la API.

## 📚 Documentación de la API

La documentación completa de la API está disponible en formato OpenAPI (Swagger) en:

- **URL**: `http://localhost:3000/api`
- **Esquema JSON**: `http://localhost:3000/api-json`

## 🧪 Ejecutando las pruebas

```bash
# Ejecutar pruebas unitarias
npm run test

# Ejecutar pruebas e2e
npm run test:e2e

# Generar cobertura de código
npm run test:cov
```

## 🐳 Docker

El proyecto incluye configuración para Docker:

```bash
# Construir y ejecutar los contenedores
docker-compose up --build -d

# Detener los contenedores
docker-compose down
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, lee mis [pautas de contribución](CONTRIBUTING.md) antes de enviar un pull request.

## 📄 Licencia

Este proyecto está bajo la licencia [UNLICENSED](LICENSE).

## 📬 Contacto

- **Autor**: [Lucas Cabral]
  - **Email**: [Lucassimple1995@hotmail.com](mailto:lucassimple1995@hotmail.com)
- **LinkedIn**: [[Lucas Gastón Cabral](https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/)]
- **GitHub**: [@Lucascabral95](https://github.com/Lucascabral95)
- **Website**: [Lucas Cabral | Portfolio](https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/)

## 📊 Cobertura de Pruebas

```bash
# Generar informe de cobertura
npm run test:cov
```

## 🚀 Despliegue

Para desplegar la aplicación en producción, sigue estos pasos:

1. Configura las variables de entorno de producción en `.env`
2. Construye la aplicación:
   ```bash
   npm run build
   ```
3. Ejecuta las migraciones de la base de datos:
   ```bash
   npx prisma migrate deploy
   ```
4. Inicia el servidor en producción:
   ```bash
   npm run start:prod
   ```

### 🐳 Usando Docker

El proyecto incluye configuración para Docker. Para desplegar con Docker:

1. Construye las imágenes:
   ```bash
   docker-compose build
   ```
2. Inicia los contenedores:
   ```bash
   docker-compose up -d
   ```

## 📚 Recursos Adicionales

- [Documentación de NestJS](https://docs.nestjs.com/)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [Documentación de MercadoPago](https://www.mercadopago.com.ar/developers/es)

## 🤝 Soporte

Si necesitas ayuda o tienes preguntas, por favor abre un issue en el repositorio.

## 📄 Licencia

Este proyecto está bajo la licencia [UNLICENSED](LICENSE).
