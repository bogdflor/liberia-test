
import express from "express";
import { check } from "express-validator";
import { Tree }    from "../models/tree.js"
import { validateRequest} from "root/common/src/middlewares/validate-request.js";
// import { authRequest } from "./authorization.js";

export const router = express.Router();
const route="/api/annual_allowable_cut_inventory";

router.post(
    route,
    // authRequest,
    [
        // check("treeId")
        //                         .isInt()
        //                         .withMessage("categ must be integer"),
        check("TreeId")
                                .exists()
                                .notEmpty()
                                .withMessage("treeId must be provided") ,
    ],
    validateRequest,
    async (req, res, next) => {
        // console.log(req.currentUser)
        try{
            // let params={
            //     "app_user":req.currentUser.email
            // };

            // req.currentUser.auth.x.forEach(col => {
            //     params[col]=req.body[col] ? req.body[col] : null
            // });

            let tree=new Tree();
            req.body["User"]=req.currentUser.data.id;

            console.log(req.body)

            const row=await tree.create(req.body);
            res.status(201).send({created:row});
        }catch(err){
            next(err)
            }
    }  
)

// export { router as router} ; 