import { prisma } from "./prisma"
import express from "express"
import nodemailer from "nodemailer"

const app = express();

// GET,POST,PUT,PATCH,DELETE

//GET = Buscar informação
// POST = Cadastrar informação
// PUT = Atualizar informação de um entidade
// PATCH = Atualizar uma informação unica de uma entidade
// DELETE = Deletar uma informação
app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "78faac51a36a7e",
      pass: "33a9fd7bda1463"
    }
  });

app.post('/feedbacks', async (req,res)=>{

    const {type,comment,screenshot} = req.body;

   const feedback = await prisma.feddback.create({
       data:{
           type,
           comment,
           screenshot,
       } 
    })

    transport.sendMail({

        from: "Equipe Feedget <oi@feedget.com>",
        to: "Givaildo Andrade <gil.nmy@gmail.com>",
        subject: "novo Feedback",
        html:[
            ` <div style=font-family:sans-serif; font-size:16px; color: #111;>`,
            `<p> Tipo de Feddback: ${type}<p>`,
            `<p> Comentário: ${comment}<p>`,
            `</div>`

        ].join("\n")


    });


    return res.status(201).json({data:feedback});
})

app.listen(3333,()=>{
    console.log("Http server runing")
});