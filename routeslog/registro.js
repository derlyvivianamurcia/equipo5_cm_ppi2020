const {Router} = require("express")
const router = Router()
const {connection} = require("./../db/mysql_pool")

router.post('/login',(req,res)=>{
const {nombre_completo, correo, contrasena, id_carrito} = req.body;
let datacompra = [nombre_completo, correo, contrasena, id_carrito];
let newcompra = 'INSERT INTO compradores(nombre_completo, correo, contrasena, id_carrito) VALUES (?,?,?,?)';
connection.query(newcompra, datacompra, (err, results, fields)=>{
  if(err){
    return console.error(err.message)
  }
  console.log(results)
  res.json({ message:`Pedido creado <[:)!!`, })
})
})

router.post('/loginem',(req,res)=>{
const {nombre_empresa,nombre_propetario, correo_empresa, contrasena_empresa, direccion, telefono} = req.body;
let dataempresa = [nombre_empresa,nombre_propetario, correo_empresa, contrasena_empresa, direccion, telefono];
let newempresa = 'INSERT INTO empresas(nombre_empresa,nombre_propetario, correo_empresa, contrasena_empresa, direccion, telefono) VALUES (?,?,?,?,?,?)';
connection.query(newempresa, dataempresa, (err, results, fields)=>{
  if(err){
    return console.error(err.message)
  }
  console.log(results)
  res.json({ message:`Pedido creado <[:)!!`, })
})
})

module.exports = router;