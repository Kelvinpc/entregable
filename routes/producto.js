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
        `;

        const [producto] = await db.query(query)
        res.render('catalogo', {producto})
    }catch(error){
        console.error(error)

    }
})


router.get('/create', async(req,res) => {
    try{
        const [categoria] = await db.query('SELECT * FROM categoria');
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






module.exports=router