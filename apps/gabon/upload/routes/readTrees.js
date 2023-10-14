import express from "express";
import { query } from "express-validator";
import { Tree } from "../models/tree.js";
import { validateRequest} from "root/common/src/middlewares/validate-request.js";


export const router = express.Router();

router.get(
    "/api/annual_allowable_cut_inventory/vectors",
     [
        query("zoom")
                                .exists()
                                .notEmpty()
                                .withMessage("zoom must be provided") ,
         query("bbox")
                        .exists()
                        .notEmpty()
                        .withMessage("bbox must be provided") ,
    ],
    validateRequest,
    async (req, res, next) => {
        try{ 
            const tree = new Tree();
            const rows=await tree.readTrees(req.query.zoom,req.query.bbox);
            if(rows){
            //    console.log(rows)
                res.status(200).send(rows[0].json_build_object);
            }

        }catch(err){
            next(err)
        }
    }
)
