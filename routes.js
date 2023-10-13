import  fs from 'fs';

export const loadRoutes =async (app)=>{

    const dirs=getRouteDirs("./apps");
    const files=[]
    console.log("Route dirs",dirs)
    dirs.forEach(dir=>getFiles(dir,files))
    console.log("Route files",files)
    
    const classes = await files.reduce(async (acc, path) => {
        const arr = await acc; // This waits for the previous iteration to resolve.
        const mod = await import(path);
        app.use(mod.router)
        return arr;
    }, Promise.resolve([])); // Start with an immediately resolved promise
    
}
function getRouteDirs(dir, files = []){

   const fileList = fs.readdirSync(dir);

   for (const file of fileList) {
      const name = `${dir}/${file}`;
      if (fs.statSync(name).isDirectory() && file=="routes") {
        files.push(name);
      } else {
         if(fs.statSync(name).isDirectory())
            getRouteDirs(name, files);
      }
    }
    return files;
}

// Recursive function to get files
function getFiles(dir, files = []) {
   // Get an array of all files and directories in the passed directory using fs.readdirSync
   const fileList = fs.readdirSync(dir);
   // Create the full path of the file/directory by concatenating the passed directory and file/directory name
   for (const file of fileList) {
     const name = `${dir}/${file}`;
     // Check if the current file/directory is a directory using fs.statSync
     if (fs.statSync(name).isDirectory()) {
       // If it is a directory, recursively call the getFiles function with the directory path and the files array
       getFiles(name, files);
     } else {
       // If it is a file, push the full path to the files array
       files.push(name);
     }
   }
   return files;
}

  

