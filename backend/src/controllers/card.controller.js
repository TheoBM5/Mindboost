import {pool} from '../db.js';

export const getAllCards = async (req, res, next) => {
    const result = await pool.query("SELECT * FROM card WHERE deck_id = $1",[
        req.params.deckid,
    ]);
    return res.json(result.rows);
};

export const getCard = async (req, res) => {
    const result = await pool.query("SELECT * FROM card WHERE id = $1", [
        req.params.id,
    ]);

    if(result.rowCount === 0){
        return res.status(404).json({
            message: "No existe una tarjeta con ese id",
        })
    }
    return res.json(result.rows[0]);
};

export const createCard = async (req, res, next) => {
    const { card } = req.body; 
    const { deckId } = req.body;
    const relacion = 1;
    try{
        const result = await pool.query(
        "INSERT INTO card (content, deck_id, relation) VALUES ($1, $2, $3) RETURNING *",  
        [card, deckId, relacion]
    );   
    res.json(result.rows[0]);  
    } catch(error){
        next(error);
    }
};
    
export const updateCard = async (req, res) => {
    const id = req.params.id;
    const {card} = req.body;
    const relation = 1;
    const result = await pool.query(
        'UPDATE card SET content = $1, relation = $2 WHERE id = $3 RETURNING *', [card, relation, id])
    if (result.rowCount === 0) {
        return res.status(404).json({
            message: "No existe una tarjeta con ese id",
        });
    }
    return res.json(result.rows[0]);
};

export const deleteCard = async (req, res) => {
    const result = await pool.query('DELETE FROM card WHERE id = $1 RETURNING *',[req.params.id])
    if(result.rowCount === 0){
        return res.status(404).json({
            message:"No existe una tarjeta con ese id",
        })
    }

    return res.sendStatus(204);
}