import { prisma } from "./prisma"
import express from "express"

const app = express();

// GET,POST,PUT,PATCH,DELETE

//GET = Buscar informação
// POST = Cadastrar informação
// PUT = Atualizar informação de um entidade
// PATCH = Atualizar uma informação unica de uma entidade
// DELETE = Deletar uma infomação
app.use(express.json());

app.post('/feedbacks', async (req,res)=>{

    const {type,comment,screenshot} = req.body;

   const feedback = await prisma.feddback.create({
       data:{
           type,
           comment,
           screenshot,
       } 
    })


    return res.status(201).json({data:feedback});
})

app.listen(3333,()=>{
    console.log("Http server runing")
});