
    import {query} from "root/db.js"

    export class StockEntry {

          async create(params){
            try{
                  let fields=[]
                  let indexes=['$1','$2','$3','$4','$5','$6','$7','$8','$9','$10']
                  let vals=[params["LogId"],params["Species"],params["MinDiameter"],params["MaxDiameter"],params["AverageDiameter"],params["Length"],params["Volume"],params["User"],params["AnnualAllowableCut"],params["Park"]] 
                  let i=1 


                  let qry=`INSERT INTO "Stock"."ExtraParkLogStockTable"
                            ( "LogId", "Species", "MinDiameter", "MaxDiameter", "AverageDiameter", "Length", "Volume", "User", "AnnualAllowableCut", "Park") 
                            VALUES (${indexes.toString()}) RETURNING "Id";`;
                
                      console.log(qry)
                    // console.log(vals)
                    const { rows } = await query(qry, vals);
                    return rows;
                  }catch(err){
                    console.log(err)
                    }
        }

    }