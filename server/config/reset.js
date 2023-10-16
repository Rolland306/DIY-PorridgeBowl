import { pool } from '../config/database.js'
import '../config/dotenv.js'
import bowlData from '../data/bowls.js'

const createBowlsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS bowls CASCADE;

    CREATE TABLE IF NOT EXISTS bowls (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      sugar_price DECIMAL(10, 2) NOT NULL,
      base_price DECIMAL(10, 2) NOT NULL,
      additive_price DECIMAL(10, 2) NOT NULL
    )
  `

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 bowls table created successfully')
    } catch (err) {
        console.error('⚠️ error creating bowls table', err)
    }
}

const seedBowlsTable = async () => {
    await createBowlsTable();

    bowlData.forEach(async (bowl) => {
        const insertQuery = {
            text: 'INSERT INTO bowls (name, sugar_price, base_price, additive_price) VALUES ($1, $2, $3, $4)'
        };

        const values = [
            bowl.name,
            bowl.sugar_price,
            bowl.base_price,
            bowl.additive_price
        ];

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting bowl', err)
                return
            }
            console.log(`✅ ${bowl.name} added successfully`)
        })
    })
}

seedBowlsTable()