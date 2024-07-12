import {pool} from '../db.js';

export const getAllDecks = async (req, res, next) => {
    const result = await pool.query("SELECT * FROM deck WHERE user_id = $1",[
        req.userId,
    ]);
    return res.json(result.rows);
};

export const getDeck = async (req, res) => {
    const result = await pool.query("SELECT * FROM  deck WHERE id = $1", [
        req.params.id,
    ]);

    if(result.rowCount === 0){
        return res.status(404).json({
            message: "No existe una tarea con ese id",
        })
    }
    return res.json(result.rows[0]);
};

export const createDeck = async (req, res, next) => {
    const {title, description, icon} = req.body;
    console.log(req.body)
    console.log(icon)
    try{
        const result = await pool.query(
        "INSERT INTO deck (title, description, user_id, icon_name) VALUES ($1, $2, $3, $4) RETURNING *",  
        [title,description ,req.userId, icon]
    );   
    res.json(result.rows[0]);  
    } catch(error){
        if (error.code === "23505"){
            return res.status(409).json({
                message:"Ya existe un deck con ese titulo",
            });
        }
        next(error);
    }
};
    
export const updateDeck = async (req, res) => {
    console.log(req.userId)
    const id = req.params.id;
    const {title, description, icon} = req.body;

    const result = await pool.query(
        'UPDATE deck SET title = $1, description = $2, icon_name = $4 WHERE id = $3 RETURNING *', [title, description, id,icon ])
    if (result.rowCount === 0) {
        return res.status(404).json({
            message: "No existe una tarea con ese id",
        });
    }
    return res.json(result.rows[0]);
};

export const deleteDeck = async (req, res) => {
    const result = await pool.query('DELETE FROM deck WHERE id = $1 RETURNING *',[req.params.id])
    console.log(result)

    if(result.rowCount === 0){
        return res.status(404).json({
            message:"No existe una tarea con ese id",
        })
    }

    return res.sendStatus(204);
}

export const getDeckReview = async (req, res) => {
    try {
        console.log('Controller getDeckReview - User ID:', req.userId); // Añadir registro

        const result = await pool.query(`
            SELECT DISTINCT d.id AS deck_id
            FROM user_card_parameters p
            JOIN Card c ON p.card_id = c.id
            JOIN Deck d ON c.deck_id = d.id
            WHERE p.review_date <= CURRENT_DATE
            AND d.user_id = $1
        `, [req.userId]);

        console.log('Query Result:', result.rows); // Añadir registro

        return res.json(result.rows);
    } catch (error) {
        console.error('Error en getDeckReview:', error.message); // Añadir registro
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
