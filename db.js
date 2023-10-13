import pkg from 'pg';
const { Pool } = pkg;
 
const  pool =  new Pool()
 
export async function query(text, params) { return  pool.query(text, params) }