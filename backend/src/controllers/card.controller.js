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

export const getAllCardsAndDate = async (req, res, next) => {
    
    const { deckid } = req.params;
  try {
    const result = await pool.query(
      `SELECT card.*, 
              user_card_parameters.racha, 
              user_card_parameters.date_creation, 
              user_card_parameters.review_date
       FROM card
       JOIN user_card_parameters 
       ON card.id = user_card_parameters.card_id
       WHERE card.deck_id = $1`,
      [deckid]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las tarjetas y fechas" });
  }
};


export const createCard = async (req, res, next) => {
    const { card } = req.body; 
    const { deckId } = req.body;
    const {userId} = req.body;
    const {typeCard} = req.body;
    try{
        const result = await pool.query(
        "INSERT INTO card (content, deck_id, typeCard, user_id) VALUES ($1, $2, $3, $4) RETURNING *",  
        [card, deckId, typeCard, userId]
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
    await pool.query('DELETE FROM user_card_parameters_copies WHERE parameter_id IN (SELECT parameter_id FROM user_card_parameters WHERE card_id = $1)', [req.params.id]);
    await pool.query('DELETE FROM user_card_parameters WHERE card_id = $1', [req.params.id]);
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
    const result = await pool.query(
        `SELECT ucp.*, c.content, c.typecard
        FROM user_card_parameters ucp
        JOIN card c ON ucp.card_id = c.id
        JOIN deck d ON c.deck_id = d.id 
        WHERE ucp.user_id = $1
          AND ucp.review_date <= CURRENT_DATE
          AND d.user_id = $1 
          AND d.id = $2`, [
        id, deckId
    ]);
    return res.json(result.rows);
};

export const updateReviewCard = async (req, res, next) => {
    const { racha, ef, interval_repeat, review_date } = req.body;
    const result = await pool.query(
        `UPDATE user_card_parameters 
         SET racha = $1, ef = $2, interval_repeat = $3, review_date = $4 
         WHERE idcard = $5 
         RETURNING *`,
        [racha, ef, interval_repeat, review_date, req.params.id]
    );
    
    return res.json(result.rows);
};