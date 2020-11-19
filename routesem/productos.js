const {Router} = require("express")
const router = Router()
const {connection} = require("./../db/mysql_pool")

router.get('/productos',(req,res)=>{
  try{
    connection.query('SELECT * FROM productos',(err, row, fields)=>{
      if(err){
         console.log(err)
      }
      res.json(row)
    })
  }catch(error){
    res.status(502).json({mensaje:"Error en la base de datos!!"})
  }
})

router.get('/producto/:id',(req,res)=>{
  let {id} = req.params;
  try{
    connection.query('SELECT * FROM productos WHERE id_producto = ?',[id],(err, row, fields)=>{
      if(err){
         console.log(err)
      }
      res.json(row[0])
    })
  }catch(error){
    res.status(502).json({mensaje:"Error en la base de datos!!"})
  }
})

router.put('/editar/:id', (req, res) => {
  const {imagen_producto} = req.body;
  const { id } = req.params;
  connection.query(`UPDATE productos SET imagen_producto = ? WHERE id_producto = ?`, 
  [imagen_producto, id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Nice producto!!'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;