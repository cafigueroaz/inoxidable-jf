# CLAUDE.md — InoxidableJF

Contexto técnico del proyecto para asistir en tareas de desarrollo.

## Negocio

Fabricación de bumpers, tanques y accesorios en acero inoxidable para tractomulas (Kenworth, Freightliner, Scania, Volvo, etc.), Bogotá, Colombia.

Sitio en producción: https://www.inoxidablejf.com (Next.js) — landing con hero en video, catálogo de productos, redes sociales, mapa y contacto por WhatsApp. Indexado, con SEO orientado a Bogotá/Colombia.

## Regla de oro

**No desplegar ni modificar nada en producción (www.inoxidablejf.com) hasta tener un MVP completo y probado en local.**

## Arquitectura

| Capa     | Legacy                                                | Actual                                |
|----------|--------------------------------------------------------|----------------------------------------|
| Backend  | NestJS (solo boilerplate, sin lógica de negocio)       | Express + Prisma 7 + PostgreSQL        |
| Frontend | Next.js (en producción)                                | Angular standalone                     |

### Estructura de carpetas

Hermanas, cada una con repo git independiente:

```
InoxidableJF/
├── backend/              # NestJS legacy — solo boilerplate + schema/seed, no se modifica
├── frontend/              # Next.js legacy — EN PRODUCCIÓN, no se modifica
├── backend-express/       # actual — en construcción
└── frontend-angular/      # actual — pendiente de iniciar
```

## Patrón de estructura

### Backend Express, capas por recurso

```
src/
├── index.js                       # entry point: app Express, conexión DB, monta rutas
├── config/                        # conexión DB, constantes globales
├── routes/       *.route.js       # endpoints + middlewares aplicados
├── controllers/  *.controllers.js # recibe req/res, delega al service, formatea respuesta
├── services/     *.services.js    # lógica de acceso a datos
├── models/       *.model.js       # (o equivalente vía schema.prisma)
├── middlewares/  authentication / authorization
├── helpers/      bcrypt, jwt
└── seeds/        datos iniciales
```

**Auth** por JWT vía header custom `X-Token` (no `Authorization: Bearer`).
- `authenticationUser` (middleware): verifica el token, agrega el payload a `req.payload`.
- `authorizationUser([roles])` (middleware factory): compara `req.payload.role` contra los roles permitidos por ruta.

**Convención de nombres**: cada recurso tiene archivos gemelos (`route`, `controllers`, `services`, `model`) con el mismo prefijo. Funciones sueltas exportadas, no clases.

### Frontend Angular standalone, organizado por dominio

```
app/
├── app.config.ts / app.routes.ts
├── core/
│   ├── services/    # un HttpXxx service por recurso, mismo slug que las rutas Express
│   ├── guards/      # CanActivateFn: auth-guard, role-guard, public-guard
│   └── interfaces/  # tipos TS de los modelos del backend
├── features/<dominio>/    # una carpeta por página/dominio
├── shared/
│   ├── layout/      # header, footer, navbar
│   └── components/  # reutilizables
└── environments/    # apiUrl centralizado
```

- Cada componente: carpeta con `.ts` / `.html` / `.css`, sin NgModule (standalone).
- Auth state en `localStorage`, expuesto como `BehaviorSubject`/`Observable`.

## Modelo de datos (Prisma, ya diseñado y migrado)

- `User` (roles `ADMIN`/`EDITOR`)
- `Contact` (leads: `NEW`/`CONTACTED`/`CLOSED`)
- `VehicleType`, `Brand`, `Model` (taxonomía de vehículos — 15 marcas sembradas)
- `Work` (portafolio) + `WorkPhoto` + `WorkService` (N:N con `Service`)
- `Service` + `Price` (catálogo, 9 servicios sembrados)

## Stack backend-express

- Express + Prisma 7 con `@prisma/adapter-pg` + `pg` (driver adapter requerido por Prisma 7)
- PostgreSQL
- `dotenv`, `nodemon` (dev)
- Cliente Prisma generado en `generated/prisma/` (no versionar — ignorado en `.gitignore`)
