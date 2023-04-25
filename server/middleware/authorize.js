const adminAuth = (req , res , next) =>{
    const { admin }  = req.headers ;
    if(admin == 1){
        next(); // kamel el bt3mlo
    }
    else{
        res.statusCode = 403 ; 
        res.send({
            message : "you are not authorized"
        });
    }
};
module.exports = adminAuth ; 