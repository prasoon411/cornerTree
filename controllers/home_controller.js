//controller for rendering home page

module.exports.home=function(req,res){
    return res.render('home',{
        title : "Authenticator"
    });
}

//module.exports.actionName= function(req,res){}