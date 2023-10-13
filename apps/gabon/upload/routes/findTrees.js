import express from "express";
import { Tree } from "../models/tree.js";


export const router = express.Router();

router.get(
    "/api/annual_allowable_cut_inventory/find_trees",
    async (req, res, next) => {
        try{ 
            const tree = new Tree();
            const rows=await tree.findTrees(req.query.tree_id);
            if(rows){
            //    console.log(rows)
                res.status(200).send(rows);
            }

        }catch(err){
            next(err)
        }
    }
)
