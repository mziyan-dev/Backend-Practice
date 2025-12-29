import mongoose from "mongoose";
import dbgr from "debug"; ("development:mongoose");
import config from "config";

mongoose.connect(`${config.get("MONGODB_URI")}/ecommerce`)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    dbgr(err);
})


const connection = mongoose.connection;
export default connection;