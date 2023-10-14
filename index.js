import {app} from "./app.js"
import {query} from "./db.js"
import dotenv from 'dotenv';

dotenv.config();

const start = async () => {
  // if (!process.env.JWT_KEY) {
  //   throw new Error("JWT_KEY must be defined");
  // }

  try {
    const { rows } = await query('Select count(*) as total from  spatial_ref_sys')
    
    if(rows[0])
      console.log("Connected to Posgresql!"+rows[0].total);

  } catch (err) {
    console.error(err);
  }

  app.listen(3001, () => {
    console.log("Listening on port 3001!....");
  });
};

start();
