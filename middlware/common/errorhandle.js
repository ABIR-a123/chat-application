// ? 404 not found handler
const { render } = require("ejs")
const createError=require("http-errors")


function notFoundHandler(rq,res,next){
    next(createError(404,"your content was not found"))
}

// ? Default error handler
function errorHandler(err,req,res,next){
    res.locals.error=process.env.NODE_ENV="development"? err : {massage:err.massage}
    res.status(err.status || 500);
    if(res.locals.html){
        // ? html responds
        res.render("error",{
            title:"Error page"
        });

    }else{
        // ? json responds
        res.json(res.locals.error)

    }
}

module.exports={
    notFoundHandler,
    errorHandler,
}