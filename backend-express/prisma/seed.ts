import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // ── Tipos de vehículo ──────────────────────────────────────────────
  const vehicleTypes = [
    { name: 'Mula / Tractocamión', slug: 'mula' },
    { name: 'Camión rígido', slug: 'camion-rigido' },
    { name: 'Volqueta', slug: 'volqueta' },
    { name: 'Camioneta 4x4', slug: 'camioneta-4x4' },
    { name: 'Buseta / Transporte', slug: 'buseta' },
    { name: 'Remolque', slug: 'remolque' },
  ];

  for (const vt of vehicleTypes) {
    await prisma.vehicleType.upsert({
      where: { slug: vt.slug },
      update: {},
      create: vt,
    });
  }
  console.log('✓ Tipos de vehículo creados');

  // ── Marcas y modelos ───────────────────────────────────────────────
  const brands = [
    {
      name: 'Kenworth',
      slug: 'kenworth',
      models: [
        { name: 'T680', slug: 't680' },
        { name: 'T800', slug: 't800' },
        { name: 'T880', slug: 't880' },
        { name: 'W900', slug: 'w900' },
        { name: 'C500', slug: 'c500' },
      ],
    },
    {
      name: 'Scania',
      slug: 'scania',
      models: [
        { name: 'R450', slug: 'r450' },
        { name: 'R500', slug: 'r500' },
        { name: 'R560', slug: 'r560' },
        { name: 'G450', slug: 'g450' },
      ],
    },
    {
      name: 'Volvo',
      slug: 'volvo',
      models: [
        { name: 'FH500', slug: 'fh500' },
        { name: 'FH16', slug: 'fh16' },
        { name: 'FMX460', slug: 'fmx460' },
        { name: 'FL280', slug: 'fl280' },
      ],
    },
    {
      name: 'Mercedes-Benz',
      slug: 'mercedes-benz',
      models: [
        { name: 'Actros', slug: 'actros' },
        { name: 'Atego', slug: 'atego' },
        { name: 'Arocs', slug: 'arocs' },
      ],
    },
    {
      name: 'Foton',
      slug: 'foton',
      models: [
        { name: 'Auman GTL', slug: 'auman-gtl' },
        { name: 'Ollin', slug: 'ollin' },
      ],
    },
    {
      name: 'Wokstar',
      slug: 'wokstar',
      models: [{ name: 'Wokstar Estándar', slug: 'wokstar-estandar' }],
    },
    {
      name: 'Hino',
      slug: 'hino',
      models: [
        { name: 'Hino 500', slug: 'hino-500' },
        { name: 'Hino 700', slug: 'hino-700' },
        { name: 'Hino 300', slug: 'hino-300' },
      ],
    },
    {
      name: 'Isuzu',
      slug: 'isuzu',
      models: [
        { name: 'FVR 34', slug: 'fvr-34' },
        { name: 'FRR 90', slug: 'frr-90' },
        { name: 'NQR 75', slug: 'nqr-75' },
      ],
    },
    {
      name: 'Mack',
      slug: 'mack',
      models: [
        { name: 'Granite', slug: 'granite' },
        { name: 'Anthem', slug: 'anthem' },
      ],
    },
    {
      name: 'International',
      slug: 'international',
      models: [
        { name: 'HX520', slug: 'hx520' },
        { name: 'HV607', slug: 'hv607' },
      ],
    },
    {
      name: 'Toyota',
      slug: 'toyota',
      models: [
        { name: 'Hilux 4x4', slug: 'hilux-4x4' },
        { name: 'Land Cruiser', slug: 'land-cruiser' },
      ],
    },
    {
      name: 'Nissan',
      slug: 'nissan',
      models: [
        { name: 'Frontier 4x4', slug: 'frontier-4x4' },
        { name: 'NP300', slug: 'np300' },
      ],
    },
    {
      name: 'Ford',
      slug: 'ford',
      models: [{ name: 'Ranger 4x4', slug: 'ranger-4x4' }],
    },
    {
      name: 'Chevrolet',
      slug: 'chevrolet',
      models: [{ name: 'D-Max 4x4', slug: 'd-max-4x4' }],
    },
    {
      name: 'Otra marca',
      slug: 'otra-marca',
      models: [{ name: 'Otro modelo', slug: 'otro-modelo' }],
    },
  ];

  for (const brand of brands) {
    const created = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: { name: brand.name, slug: brand.slug },
    });

    for (const model of brand.models) {
      await prisma.model.upsert({
        where: { slug: model.slug },
        update: {},
        create: { name: model.name, slug: model.slug, brandId: created.id },
      });
    }
  }
  console.log('✓ Marcas y modelos creados');

  // ── Servicios ──────────────────────────────────────────────────────
  const services = [
    { name: 'Bumper', slug: 'bumper' },
    { name: 'Caja de herramientas', slug: 'caja-herramientas' },
    { name: 'Estribo', slug: 'estribo' },
    { name: 'Tanque', slug: 'tanque' },
    { name: 'Culata', slug: 'culata' },
    { name: 'Persiana', slug: 'persiana' },
    { name: 'Soldadura', slug: 'soldadura' },
    { name: 'Carrocería general', slug: 'carroceria-general' },
    { name: 'Otro servicio', slug: 'otro-servicio' },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log('✓ Servicios creados');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
