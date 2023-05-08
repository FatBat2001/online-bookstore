const Limit = async(req , res , next) =>{
    const { userlimit }  = req.headers ;
    const query = util.promisify(conn.query).bind(conn);
    const limits = await query("SELECT COUNT(userid), userid FROM requested_book WHERE userid = ? GROUP BY userid"[req.headers]);

    if(limits[0].limits <= userlimit){
        next(); // kamel el bt3mlo
    }
    else{
        res.statusCode = 403 ; 
        res.send({
            message : "you exceeded the limit"
        });
    }
};
module.exports = Limit ; 