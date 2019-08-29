const express = require('express')
var expressJoi = require('joi');
const app = express();
app.use(express.json());


var my =function fun(req,res,next){
    app.use(express.json());
    next()
}

app.use(my)
const ValidationMiddleware = require('./validation');


const modelFile = require('./Model.js');
const controllerFile = require('./Controller');

app.post('/',(req,res)=>{

    expressJoi.validate(req.body,ValidationMiddleware.schema,(err,value)=>{
        if(err)
        {
            res.send('err')
            console.log(err.message)
            res.end()
        }
        else
        {
            res.send('completed')
            controllerFile.pushData(req,res)
            res.end()
        }
    })
    //controllerFile.getData(req,res)
})

app.get('/',(req,res)=>{
    controllerFile.getData(req,res)
})

app.get('/:id',(req,res)=>{
    controllerFile.getDataId(req,res)

})

app.put('/:id',(req,res)=>{
    expressJoi.validate(req.body,ValidationMiddleware.schema,(err,value)=>{
        if(err)
        {
            //res.send('err')
            console.log(err.message)
            //res.end()
        }
        else
        {
            
            controllerFile.putData(req,res);
            
        }
    })
   
})

app.delete('/:id',(req,res)=>{

    controllerFile.deleteData(req,res);
            
})

app.listen(5000,()=>{
    console.log('server is started on port 5000');
})