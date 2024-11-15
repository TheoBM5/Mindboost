import bcrypt from 'bcrypt';
import {pool} from '../db.js';
import { createAccessToken } from '../lib/jwt.js';
import md5 from 'md5'

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "El correo no está registrado",
      });
    }

    const validPassword = await bcrypt.compare(password, result.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({
        message: "La contraseña es incorrecta",
      });
    }

    const userId = result.rows[0].id;

    // Check for preferences and create if not exist
    let preferenceResult = await pool.query("SELECT * FROM preference WHERE user_id = $1", [userId]);
    if (preferenceResult.rowCount === 0) {
      await pool.query(
        "INSERT INTO preference (user_id, img_duck, color_duck, mode_color) VALUES ($1, $2, $3, $4)",
        [userId, '1', 'blue', 'dark']
      );
      preferenceResult = await pool.query("SELECT * FROM preference WHERE user_id = $1", [userId]);
    }

    const token = await createAccessToken({ id: userId });

    res.cookie('token', token, {
      // httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Return user data with preferences included
    return res.json({
      user: result.rows[0],
      preferences: preferenceResult.rows[0],
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({
      message: "Hubo un error en el servidor",
    });
  }
};
export const signup = async (req, res, next) => {
    const {name, username, email, password} =  req.body;

    try{
      const hashedPassword = await bcrypt.hash(password, 10);
      const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;
  
      const result = await pool.query(
        "INSERT INTO users(name, username, email, password, gravatar) VALUES($1, $2, $3, $4, $5) Returning *",
        [name, username, email, hashedPassword, gravatar]
      );


      const userId = result.rows[0].id;

    const preferenceResult = await pool.query("SELECT * FROM preference WHERE user_id = $1", [userId]);
  
    if (preferenceResult.rowCount === 0) {
      await pool.query(
        "INSERT INTO preference (user_id, img_duck, color_duck, mode_color) VALUES ($1, $2, $3, $4)",
        [userId, '1', 'blue', 'dark']
      );
    }

        const token = await createAccessToken({id: result.rows[0].id});
        
        res.cookie('token', token, {
            // httpOnly: true,
            // secure: true,
            sameSite: 'none',
            maxAge: 24*60*60*1000
        })

        return res.json(result.rows[0]);
    } catch (error) {
      if (error.code === "23505") {
        return res.status(400).json({
          message: "El correo ya esta registrado",
        });
      }
  
      next(error);
    }
  };

export const signout = (req, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
}
export const profile = async (req, res) =>{
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.userId]);
    return res.json(result.rows[0]);
}

export const preferences = async (req, res) =>{
  const result = await pool.query('SELECT * FROM preference WHERE user_id = $1', [req.userId]);
  return res.json(result.rows[0]);
}

export const savePreferences = async (req, res) => {
  const { color_duck, img_duck, mode_color } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: 'No se encontró el usuario' });
  }

  try {
  
    const existingPreferences = await pool.query('SELECT * FROM preference WHERE user_id = $1', [userId]);

    if (existingPreferences.rowCount > 0) {
    
      await pool.query(
        'UPDATE preference SET color_duck = $1, img_duck = $2, mode_color = $3 WHERE user_id = $4',
        [color_duck, img_duck, mode_color, userId]
      );
    } else {
    
      await pool.query(
        'INSERT INTO preference (user_id, color_duck, img_duck, mode_color) VALUES ($1, $2, $3, $4)',
        [userId, color_duck, img_duck, mode_color]
      );
    }

    return res.status(200).json({ message: 'Preferencias guardadas correctamente' });
  } catch (error) {
    console.error('Error al guardar las preferencias:', error);
    return res.status(500).json({ message: 'Error al guardar las preferencias' });
  }
};