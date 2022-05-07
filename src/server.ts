import express from "express"

const app = express();

app.get('/users',(req,res)=>{
    return res.send("hello Word")
})

app.listen(3333,()=>{
    console.log("Http server runing")
});