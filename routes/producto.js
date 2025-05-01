const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
    try{
        const query = `
        SELECT 
            P.idproducto,
            M.nommarca,
            P.modeloproducto,
            P.descripcionproducto,
            P.memoriagb,
            P.ramgb,
            P.procesador,
            P.precioproducto,
            P.cantidadproducto,
            P.imageproducto,
            P.disponibilidadproducto,
            C.nomcategoria
        FROM producto P
            INNER JOIN marca M 
            INNER JOIN categoria C 
            ON P.idmarca = M.idmarca
            ON P.idmarca = C.idcategoria`

        const [producto] = await db.query(query)
        res.render('index', {producto})
    }catch(error){
        console.error(error)

    }
})