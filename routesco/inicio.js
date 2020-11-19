const {Router} = require("express")
const router = Router()
//const fs = require("fs")
const {connection} = require("./../db/mysql_pool")
//const FileInicio = fs.readFileSync('./productos.json', 'utf-8')
//const JSONInicio = JSON.parse(FileInicio)

router.get('/inicio', (req, res) => {
  try{
    connection.query("SELECT * FROM productos", (error, rows, fields) => {
      if(error){
        res.status(503).json({mensaje : "Error en el servidor.", error : true, errorDB : error})
      }
      res.json(rows)
    })
  }catch(error){
    res.status(503).json({mensaje : "Error en el servidor.", error : true})
  }
})

router.get('inicio/:id', (req, res) => {
  try{
    const id = req.params.id
    connection.query(`SELECT * 
                      FROM productos
                      WHERE id = ?`, [id])
  }catch(error){
    res.status(503).json({mensaje : "Error en el servidor.", error : true})
  }
})

/*router.get("/inicio", (req, res) => {
  res.json(JSONInicio)
})

router.get("/inicio/:id", (req,res) => {
    let id = req.params.id
    let ProductoEncontrado = JSONInicio.find(producto => producto.id == id)
  
    if(ProductoEncontrado != undefined)
      res.status(200).json(ProductoEncontrado)
    else
      res.json(`El producto con el ID ${id} no existe`)
  })*/

module.exports = router