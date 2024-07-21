
export const aiParser = (req, res, next)=>{
    
    req.body.tags = ["positive", "negative"]
    next()
}