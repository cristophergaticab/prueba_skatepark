//Constante paquete pg | Conexión a postresql
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "cristopher1897",
  database: "skatepark",
  port: 5432,
});

//Insertar nuevo participante en base de datos
const nuevoParticipante = async (skater) => {
  const values = Object.values(skater)
  const result = await pool.query(
    `INSERT INTO skaters  ( email  ,  nombre  ,  password  , anos_experiencia , especialidad  , foto  , estado ) values ($1,$2, $3, $4 ,$5, $6, 'f') RETURNING *`
    , values);
  return result.rows[0];
}

//Actualizar nuevo participante en base de datos
const actualizarParticipante = async (skater) => {
  const values = Object.values(skater)
  const result = await pool.query(
    `UPDATE skaters SET  nombre = $1, password = $2 , anos_experiencia = $3 , especialidad = $4   RETURNING *`
    , values);
  return result.rows[0];
}


const getSkaters = async () => {
  const result = await pool.query(`SELECT * FROM skaters`);
  return result.rows;
}

const getSkater = async (email, password) => {
  const result = await pool.query(
    `SELECT * FROM skaters WHERE email = '${email}' AND password = '${password}'`
  );

  return result.rows[0];
}

const statusParticipantes = async (id, estado) => {
  const result = await pool.query(
    `UPDATE skaters SET estado = ${estado} WHERE id = ${id} RETURNING *`
  );
  const skater = result.rows[0];
  return skater;
}
//Eliminar nuevo participante en base de datos
const eliminarParticipante = async (id) => {
  const result = await pool.query(
    `DELETE FROM skaters WHERE id = ${id} RETURNING *`
  );
  const skater = result.rows[0];
  return skater;
}


module.exports = {
  nuevoParticipante,
  getSkaters,
  getSkater,
  statusParticipantes,
  actualizarParticipante,
  eliminarParticipante
};
