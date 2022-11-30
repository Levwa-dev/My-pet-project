module.exports = (req, res, next)=>{
    try {
        if(!req.user.isAdmin){
            return res.status(401).json({error:'Ви не маєте прав доступу'})
        }
        next()
    } catch (error) {
        res.status(401).json({error:'Ви не маєте прав доступу'})
    }
  
}