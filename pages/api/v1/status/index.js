import database from '../../../../infra/database.js';

async function status(resquest, response) {
  const result = await database.query("SELECT 1 + 1;");
  console.log(result.rows);
  response.status(200).json({ message: 'Hello World' });
}

export default status;
