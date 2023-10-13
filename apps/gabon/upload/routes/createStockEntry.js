
import express from "express";
import { check } from "express-validator";
import { StockEntry }    from "../models/stockEntry.js"
import { validateRequest} from "root/common/src/middlewares/validate-request.js";
// import { authRequest } from "./authorization.js";

export const router = express.Router();
const route="/api/park_stocks";

router.post(
    route,
    // authRequest,
    [
        check("LogId")
                                .exists()
                                .notEmpty()
                                .withMessage("logId must be provided") ,
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

            let stockEntry=new StockEntry();
            req.body["User"]=req.currentUser.data.id;

            console.log(req.body)

            const row=await stockEntry.create(req.body);
            res.status(201).send({created:row});
        }catch(err){
            next(err)
            }
    }  
)

// export { router as router} ; 