const {Router} = require("express")
const router = Router();
const {connection} = require("./../db/mysql_pool")

router.get('/historial',(req,res)=>{
  try{
    connection.query('SELECT * FROM carrito_de_compra',(err, row, fiels)=>{
      if(!err){
        console.log(err)
      }
      res.json(row)
    })
  }catch(error){
    res.status(502).json({mensaje:"Error en la base de datos"})
  }
})

router.get('/historial/:id',(req,res)=>{
  let {id} = req.params;
  try{
    connection.query('SELECT * FROM carrito_de_compra WHERE id_carrito = ?',[id],(err, row, fields)=>{
      if(!err){
        console.log(err)
      }
      res.json(row[0])
    })
  }catch(error){
    res.status(502).json({mensaje:"Error en la base de datos"})
  }
})

module.exports = router