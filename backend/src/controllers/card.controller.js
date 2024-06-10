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
    console.log(req.body);
    const { card } = req.body; 
    const { deckId } = req.body;
    const {userId} = req.body;
    console.log("user", userId)
    const relacion = 1;
    try{
        const result = await pool.query(
        "INSERT INTO card (content, deck_id, relation, user_id) VALUES ($1, $2, $3, $4) RETURNING *",  
        [card, deckId, relacion, userId]
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


export const getAllReviewCards = async (req, res, next) => {
    const { id, deckId } = req.params;
    console.log("user", id, "deck", deckId);
    const result = await pool.query(
        `SELECT ucp.*
        FROM user_card_parameters ucp
        JOIN deck d ON ucp.user_id = d.user_id
        WHERE ucp.user_id = $1 AND ucp.updated_at <= CURRENT_DATE AND d.user_id = $1 AND d.id = $2`,[
        id, deckId
    ]);
    return res.json(result.rows);
};

export const updateReviewCard = async (req, res, next) => {
    const result = await pool.query("UPDATE card SET content = $1, relation = $2 WHERE id = $3 RETURNING *', [card, relation, id]",[
        req.params.deckid,
    ]);
    return res.json(result.rows);
};