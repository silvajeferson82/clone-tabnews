import database from 'infra/database.js';

async function status(resquest, response) {
  const updateAt = new Date().toISOString();

  const versionResult = await database.query("SHOW server_version;");
  const versionValue = versionResult.rows[0].server_version;

  const databaseName = process.env.POSTGRES_DB;
  const maxConnectionResult = await database.query("SHOW max_connections;");
  const maxConnectionValue = maxConnectionResult.rows[0].max_connections;

  const openedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });
  const openedConnectionsValue = openedConnectionsResult.rows[0].count;

  const databaseInfo = {
    updated_at: updateAt,
    dependencies: {
      database: {
        version: versionValue,
        max_connections: parseInt(maxConnectionValue),
        opened_connections: openedConnectionsValue,
      }
    }
  }

  response.status(200).json({
    ...databaseInfo
  })
}

export default status;
