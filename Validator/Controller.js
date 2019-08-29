const express = require('express');
const modelFile = require('./Model');

let idCount = 1;

module.exports = {
    getData(req,res){
        res.json({
            message : modelFile
        })
    },
    getDataId(req,res){
        let found = false;
        let value;
        modelFile.forEach((data)=>{
            console.log(data)
            if(data.id === +req.params.id)
            {
                found = true;
                value = data;
               
            }
        })
        if(found){
            res.send(value);
        }
        else{
            console.log('fail')
            res.status(400).send({msg:'not found'});
        }
    },
    pushData(req,res){
        
        const newMem = {
            id : ++idCount,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            phone : req.body.phone,
            gender : req.body.gender
        }
        modelFile.push(newMem);
    },
    putData(req,res){
    
            const upMember = req.body;
            let found = false;
            modelFile.forEach((data)=>{
                if(data.id === +req.params.id){
                    data.firstName = upMember.firstName ? upMember.firstName : data.firstName;
                    data.lastName = upMember.lastName ? upMember.lastName : data.lastName;
                    data.email = upMember.email ? upMember.email : data.email;
                    data.phone = upMember.phone ? upMember.phone : data.phone;
                    data.gender = upMember.gender ? upMember.gender : data.gender;

                    found = true;
                    console.log('pass');
                    
                    return ; 
                }
            })
            if(found)
            {
            res.send({msg:'data updated'});
            }
            else{
                res.status(400).send({msg:'not found'});
            }
        
    },
    deleteData(req,res){
        let found = false;
        let value;
        modelFile.forEach((data , index)=>{
            if(data.id == +req.params.id){
               
                modelFile.splice(index , 1);
                found = true;

            }
            
        })
        if(found){
            res.status(200).json({
                message : "sucess" ,
                data : modelFile
            })
        }
        
    }


}