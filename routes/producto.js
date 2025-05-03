const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/admin', async (req, res) => {
    try{
        const query = `
        SELECT 
            P.idproducto,
            M.nommarca,
            P.nomproducto,
            P.modeloproducto,
            P.descripcionproducto,
            P.memoriagb,
            P.ramgb,
            P.procesador,
            P.precioproducto,
            P.cantidadproducto,
            P.imageproducto,
            P.disponibilidadproducto,
            P.color,
            C.nomcategoria,
            P.idmarca,
            P.idcategoria
            FROM producto P
            INNER JOIN marcas M ON P.idmarca = M.idmarca
            INNER JOIN categoria C ON P.idcategoria = C.idcategoria
            WHERE disponibilidadproducto != 0
        `;

        const [producto] = await db.query(query)
        res.render('admin', {producto})
    }catch(error){
        console.error(error)

    }
})


router.get('/catalogo', async (req, res) => {
    try{
        const query = `
        SELECT 
            P.idproducto,
            M.nommarca,
            P.nomproducto,
            P.modeloproducto,
            P.descripcionproducto,
            P.memoriagb,
            P.ramgb,
            P.procesador,
            P.precioproducto,
            P.cantidadproducto,
            P.imageproducto,
            P.disponibilidadproducto,
            P.color,

            C.nomcategoria,
            P.idmarca,
            P.idcategoria
            FROM producto P  
            INNER JOIN marcas M ON P.idmarca = M.idmarca
            INNER JOIN categoria C ON P.idcategoria = C.idcategoria 
            WHERE disponibilidadproducto != 0
        `;

        const [producto] = await db.query(query)
        res.render('catalogo', {producto})
    }catch(error){
        console.error(error)

    }
})


router.get('/create', async(req,res) => {
    try{
        const [categoria] = await db.query('SELECT * FROM categoria ');
        const [marcas] = await db.query('SELECT * FROM marcas');
        res.render('create', { categoria: categoria, marcas: marcas });

    }catch(error){
        console.error(error)
    }
})


router.post('/create',async(req,res) =>{
    try{
        const{nomproducto, modeloproducto, descripcionproducto, memoriagb, ramgb, procesador, precioproducto, cantidadproducto, imageproducto,color,idcategoria, idmarca} = req.body
        await db.query(`INSERT INTO producto (nomproducto, modeloproducto, descripcionproducto, memoriagb, ramgb, procesador, precioproducto, cantidadproducto, imageproducto,color,idcategoria, idmarca) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,[nomproducto, modeloproducto, descripcionproducto, memoriagb, ramgb, procesador, precioproducto, cantidadproducto, imageproducto,color,idcategoria, idmarca])
        res.redirect('/')
    }catch(error){
        console.error(error)
    }
})



router.get('/edit/:id', async(req,res)=>{
    try{
        const[datosMarcas] =await db.query("SELECT * FROM marcas")
        const[datosCategoria] =await db.query("SELECT * FROM categoria")

        const[registro] = await db.query("SELECT * FROM producto WHERE idproducto = ?",[req.params.id])

        if (registro.length>0) {
            res.render('edit',{marcas:datosMarcas, categoria:datosCategoria,producto:registro[0]})
        }else{
            res.redirect('/')
        }
    }catch(error){
        console.error(error);
        
    }
})

router.post('/edit/:id',async(req,res) =>{
    try{

        const{nomproducto, modeloproducto, descripcionproducto, memoriagb, ramgb, procesador, precioproducto, cantidadproducto, imageproducto,color,idcategoria, idmarca} = req.body
        await db.query(`UPDATE producto SET nomproducto=?, modeloproducto=?, descripcionproducto=?, memoriagb=?, ramgb=?, procesador=?, precioproducto=?, cantidadproducto=?, imageproducto=?,color=?,idcategoria=?, idmarca=? WHERE idproducto= ?`,
            [nomproducto, modeloproducto, descripcionproducto, memoriagb, ramgb, procesador, precioproducto, cantidadproducto, imageproducto,color,idcategoria, idmarca, req.params.id])

        res.redirect('/')
    }catch(error){
        console.error(error)
    }
})





router.get('/delete/:id', async(req,res) =>{
    try{

        const resultado = await db.query("DELETE FROM producto WHERE idproducto = ?", [req.params.id])
        res.redirect('/admin')
    }catch(error){
        console.error(error)
    }
})






module.exports=router