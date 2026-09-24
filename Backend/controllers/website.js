const generateResponse = require("../config/openRouter")
const { masterPrompt } = require("../constants/constants")



const generateWebsite = async(req,res) =>{
    try{
         const { prompt } = req.body
        if (!prompt) {
            return res.status(400).json({ message: "prompt is required" })
        }
    }
    catch(err){

    }
}


const generateWebsiteDemo = async(req,res) =>{
    try{
        const result = await generateResponse(masterPrompt);
        res.send(result)
    }
    catch(err){
        res.send("Error:"+err)
    }
}

module.exports = {generateWebsiteDemo}
