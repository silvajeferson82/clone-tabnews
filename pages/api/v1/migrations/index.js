import migrationRunner from 'node-pg-migrate';

export default async function migrations(resquest, response) {
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
  });

  response.status(200).json(migrations);
}

