const getUser = async(req, res)=>{
    try{
        if(!req.user){
            return res.status(401).json({
                message:"Unauthorized access"
            })
        }
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({message:`ERROR : GetUser : ${error}`})
    }
}
module.exports = {getUser}