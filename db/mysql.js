const mysql = require ('mysql')
const connection = mysql.createConnection({

  port: 3306,
  host:process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  multipleStatements:true

});

/*connection.connect((error) => {
    if(error){
      console.log(`Error en conexión a base de datos: ${error}`)
      return;
      }else{   console.log("Conexión extablecida con el servidor de MySQL")
    }
}); */ 

module.exports =  {connection: connection}

