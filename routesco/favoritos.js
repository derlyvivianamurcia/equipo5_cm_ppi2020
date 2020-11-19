const {Router} = require("express")
const router = Router()
//const fs = require("fs")
const {connection} = require("./../db/mysql_pool")
//const FileFavoritos = fs.readFileSync('./favoritos.json', 'utf-8')
//const JSONFavoritos = JSON.parse(FileFavoritos)

router.get('/favoritos', (req, res) => {
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

module.exports = router