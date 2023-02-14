module.exports = (req, res, next)=>{ // Якщо не адміністратор, відорбазити помилку
    try {
        if(!req.user.isAdmin){
            return res.status(401).json({error:'Ви не маєте прав доступу'})
        }
        next()
    } catch (error) {
        res.status(401).json({error:'Ви не маєте прав доступу'})
    }
  
}