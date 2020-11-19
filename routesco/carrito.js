const { Router } = require("express")
const router = Router()
const { connection } = require("./../db/mysql_pool")
const fs = require("fs")
const FileCarrito = fs.readFileSync('./carrito.json', 'utf-8')
const JSONCarrito = JSON.parse(FileCarrito)

router.post('/carritodecompra', (req, res) => {
  try{
    const {
      cantidad,
      valor_total,
      direccion_entrega,
      monto
    } = req.body    
    const SQL = `INSERT INTO carrito_de_compra(cantidad, valor_total,direccion_entrega, monto)
                  VALUES(?,?,?,?)`
    const parametros = [cantidad, valor_total, direccion_entrega, monto]
    connection.query(SQL, parametros, (error, results, fields) => {
      if(error){
        console.log(error)
        res.status(502).json({mensaje : 'Error ejecutando la consulta.'})
      }else{
        console.log(results)
        res.status(201).json({
                              id : results.insertId,
                              cantidad : cantidad,
                              valor_total : valor_total,
                              direccion_entrega : direccion_entrega,
                              monto : monto,
                              })
      }
    })
  }catch(error){
    res.status(502).json({mensaje:"Error en el servidor"})
  }
})


module.exports = router