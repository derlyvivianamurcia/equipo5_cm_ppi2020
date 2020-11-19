const {Router} = require("express")
const router = Router()
const multer = require('multer')
const path = require('path')
const {v4 : uuidv4} = require('uuid')
//const fs = require("fs")
const {connection} = require("./../db/mysql_pool")

const cargador = multer({
  storage : multer.diskStorage({
    destination : (req, file, cb) => {
      cb(null, path.join(__dirname,'../public/uploads'))
    },
    filename : (req, file, cb) => {
       cb(null, uuidv4() + path.extname(file.originalname));
    }
  })
})

router.post('/anadirproductos', (req, res) => {
  try{
    const {
      nombre_producto,
      stock,
      valor_unidad,
      imagen_producto,
      nombre_empresa
    } = req.body    
    const SQL = `INSERT INTO productos(nombre_producto, stock,valor_unidad, imagen_producto, nombre_empresa)
                  VALUES(?,?,?,?,?)`
    const parametros = [nombre_producto, stock, valor_unidad, imagen_producto, nombre_empresa]
    connection.query(SQL, parametros, (error, results, fields) => {
      if(error){
        console.log(error)
        res.status(502).json({mensaje : 'Error ejecutando la consulta.'})
      }else{
        console.log(results)
        res.status(201).json({
                              id_producto : results.insertId,
                              nombre_producto : nombre_producto,
                              stock : stock,
                              valor_unidad : valor_unidad,
                              imagen_producto : imagen_producto,
                              nombre_empresa : nombre_empresa})
      }
    })
  }catch(error){
    res.status(502).json({mensaje:"Error en el servidor"})
  }
})

router.post('/imagencita', cargador.single('imagen_producto'),(req, res) => {
  res.json(req.file)
  /*if(req.file){
  const {id_producto} = req.body
  const response = await connection.query(`UPDATE productos SET imagen_producto = ? WHERE id = ?`,
  [JSON.stringify, req.file, id_producto])
  console.log(response)
  }else{
    res.json({mensaje : "tu archivo no se cargó"})
  }*/
})
/*router.post('/anadirproducto',(req,res)=>{
const {
      nombre_producto,
      stock,
      valor_unidad,
      imagen_producto,
      nombre_empresa
    } = req.body  
let product = [nombre_producto, stock, valor_unidad, imagen_producto, nombre_empresa]

connection.query(`INSERT INTO productos (nombre_producto, stock,valor_unidad, imagen_producto, nombre_empresa)
                  VALUES(?,?,?,?,?)`, product, (err, results, fields)=>{
  if(err){
    return console.error(err.message)
  }
  res.json({ message:`perfume agregado!!` })
})
})*/
/*const FileAgregar = fs.readFileSync('./productos.json', 'utf-8')
const JSONAgregar = JSON.parse(FileAgregar)

router.get("/anadirproductos", (req, res) => {
  res.json(JSONAgregar)
})

router.post("/anadirproductos", (req, res) => {
  let id = JSONAgregar.length + 1
  let {nombre, descrip, empresa, precio, stock} = req.body
  let nuevoProducto = {
    "id" : id,
    "nombre" : nombre,
    "descrip" : descrip,
    "Empresa" : empresa,
    "precio" : precio, 
    "stock": stock
  } 
  JSONAgregar.push(nuevoProducto)
  fs.writeFileSync('./productos.json', JSON.stringify(JSONAgregar), 'utf-8')
  res.status(201).json(nuevoProducto)
})*/

module.exports = router