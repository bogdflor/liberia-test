
import {query} from "../../../db.js"

export  const currentGroup= async (
  req,
  res,
  next
) => {
  
  try {  

    if(req.currentUser.email=="guest"){
      req.currentUser.group = ["guest"];
    }
    else{
    
      const { rows } = await query("SELECT STRING_AGG(app_group,',') as groups FROM authorizations.usergroups WHERE email = $1", [req.currentUser.email]);

      if(rows[0].groups)
        req.currentUser.group = rows[0].groups.split(",");
      else
        req.currentUser.group = ["authenticated"]
    }
  } catch (err) {
    next(err);
  }
  next();
};
