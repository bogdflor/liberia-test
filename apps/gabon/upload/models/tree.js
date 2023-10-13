
    import {query} from "root/db.js"

    export class Tree {

        async readTrees(zoom,bbox){
            if(0<=zoom && zoom<8){
              console.log(zoom)
              const { rows } = await query(` SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json))
              FROM  (SELECT "Id",cluster,'Concession' as cluster_level,"Name",live,marked,falled,ST_TRANSFORM(st_centroid,4326) as geom FROM  "ForestResources"."ConcessionTrees") AS t`);
            return rows;
            }
            if(8<=zoom && zoom<9){
              console.log(zoom)
              const { rows } = await query(` SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json))
              FROM  (SELECT "Id",cluster,'Development unit' as cluster_level,"Name",live,marked,falled,ST_TRANSFORM(st_centroid,4326) as geom FROM  "ForestResources"."UFATrees" WHERE  ST_INTERSECTS(st_centroid,ST_TRANSFORM(ST_MAKEENVELOPE(${bbox},4326),5223))) AS t`);
              console.log(rows)
            return rows;
            }
            if(9<=zoom && zoom<10){
              console.log(zoom)
              const { rows } = await query(` SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json))
              FROM  (SELECT "Id",cluster,'Management unit' as cluster_level,"Name",live,marked,falled,ST_TRANSFORM(st_centroid,4326) as geom FROM  "ForestResources"."UFGTrees" WHERE  ST_INTERSECTS(st_centroid,ST_TRANSFORM(ST_MAKEENVELOPE(${bbox},4326),5223))) AS t`);
            return rows;
            }
            if(10<=zoom && zoom<12){
              console.log(zoom)
              const { rows } = await query(` SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json))
              FROM  (SELECT "Id",cluster,'Annual alowable cut' as cluster_level,"Name",live,marked,falled,ST_TRANSFORM(st_centroid,4326) as geom FROM  "ForestResources"."AACTrees" WHERE  ST_INTERSECTS(st_centroid,ST_TRANSFORM(ST_MAKEENVELOPE(${bbox},4326),5223))) AS t`);
            return rows;
            }
            if(zoom>=12){
              const { rows } = await query(` SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json))
              FROM  (SELECT *,"Geometry" as geom FROM  "ForestResources"."AnnualAllowableCutInventoryTable"   LIMIT 100000) AS t`); //WHERE  ST_INTERSECTS("Geometry",ST_TRANSFORM(ST_MAKEENVELOPE(${bbox},4326),5223))
            return rows;
            }
            return null;
          }

          async findTrees(treeId){
            const { rows } = await query(` SELECT *, ST_AsGeoJSON(ST_BUFFER(ST_TRANSFORM("Geometry",4326),0.0001, 'quad_segs=2')):: json->'coordinates' AS coordinates FROM "ForestResources"."AnnualAllowableCutInventoryTable" WHERE "Id"=${treeId}`)
            return rows;
          }

          async create(params){
            try{
                  let fields=[]
                  let indexes=['$1','$2','$3','$4','ST_MakePoint($5, $6)','$7','$8','$9']
                  let vals=[params["TreeId"],params["SpeciesCode"],params["Quality"],params["DiameterBreastHeight"],params["Lon"],params["Lat"],params["Species"],params["AnnualAllowableCut"],params["User"]] 
                  let i=1 

                  // ("TreeId","SpeciesCode","Quality","DiameterBreastHeight","Lon","Lat","Species", "AnnualAllowableCut")

                  // for (const [key, value] of Object.entries(params)) {
                  //     fields.push(key)
                  //     indexes.push('$'+i); i++;
                  //     vals.push(value)
          
                  // }

                  
                  // console.log(params)
                  let qry=`INSERT INTO "ForestResources"."AnnualAllowableCutInventoryTable" ("TreeId","SpeciesCode","Quality","DiameterBreastHeight","Geometry","Species", "AnnualAllowableCut", "User") VALUES (${indexes.toString()}) RETURNING "Id";`;
                    // console.log(qry)
                    // console.log(vals)
                    const { rows } = await query(qry, vals);
                    return rows;
                  }catch(err){
                    console.log(err)
                    }
        }

    }