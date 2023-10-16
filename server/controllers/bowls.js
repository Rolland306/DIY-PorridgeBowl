import { pool } from '../config/database.js'

const getBowls = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM bowls')
        res.status(200).json(results.rows)
    } catch (error) {
        console.error(error); // Log the actual database error
        res.status(409).json({ error: "test" })
    }
}

const getBowlById = async (req, res) => {
    try {
        const selectQuery = `
        SELECT name, sugar_price, base_price, additive_price
        FROM bowls
        WHERE id=$1`

        const bowlId = req.params.bowlId

        const results = await pool.query(selectQuery, [bowlId])
        res.status(200).json(results.rows[0])

    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const createBowl = async (req, res) => {
    try {
        const { name, sugar_price, base_price, additive_price } = req.body

        const results = await pool.query(`
            INSERT INTO bowls (name, sugar_price, base_price, additive_price)
            VALUES($1, $2, $3, $4)
            RETURNING *`,
            [name, sugar_price, base_price, additive_price]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateBowl = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, sugar_price, base_price, additive_price } = req.body
        const results = await pool.query(`
          UPDATE bowls SET name = $1, sugar_price = $2, base_price = $3, additive_price = $4`,
            [name, sugar_price, base_price, additive_price, id]
        )
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteBowl = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM bowls WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}


export default {
    getBowls, getBowlById, createBowl, updateBowl, deleteBowl
}