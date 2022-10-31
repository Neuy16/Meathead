const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

  if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else  {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
     
      dialect: 'mysql',
      
    }
  );
} ;
/*  const sequelize = new Sequelize ('meathead_db', 'root', '123654', {
    host: 'localhost',
    dialect: 'mysql'
}); 
*/
async function authen(){
try{
    await sequelize.authenticate();
    console.log('connected');
} catch (error){
    console.error('unable to connect');
}
}
authen();
 module.exports = sequelize;