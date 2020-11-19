const {Router} = require("express")
const router = Router()
const {connection} = require("./../db/mysql_pool")

router.get('/login',(req,res)=>{
  try{
    connection.query('SELECT * FROM compradores',(err, row, fields)=>{
      if(!err){
        console.log(err)
      }
      res.status(200).json(row)
    })
  }catch(error){
    res.status(503).json({mnesaje:"Error"})
  }
})

router.get('/login/:id',(req,res)=>{
  let {id} = req.params;
    try{
      connection.query('SELECT * FROM compradores WHERE id_comprador = ?',[id],(err, row, fields)=>{
        if(err){
          console.log(err)
        }
        res.json(row[0])
      })
    }catch(error){
      res.status(502).json({mensaje:"Error"})
    }
})

router.get('/loginem',(req,res)=>{
  try{
    connection.query('SELECT * FROM empresas',(err, row, fields)=>{
      if(!err){
        console.log(err)
      }
      res.status(200).json(row)
    })
  }catch(error){
    res.status(503).json({mnesaje:"Error"})
  }
})

router.get('/loginem/:id',(req,res)=>{
  let {id} = req.params;
    try{
      connection.query('SELECT * FROM empresas WHERE id_empresa = ?',[id],(err, row, fields)=>{
        if(err){
          console.log(err)
        }
        res.json(row[0])
      })
    }catch(error){
      res.status(502).json({mensaje:"Error"})
    }
})

module.exports = router;