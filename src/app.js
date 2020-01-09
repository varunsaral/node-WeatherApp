const request = require('request')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../util/geocode')
const forcast = require('../util/forcast')


const app = express()

//paths 
const publicpathroot = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../template/views')
const partialpath = path.join(__dirname,'../template/partials')

//template settings
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

//setting for serving static pages 
app.use(express.static(publicpathroot))

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        Name :'Varun Saral'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather App',
        Name :'Varun Saral'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'You need some help?',
        title:'Weather App',
        Name :'Varun Saral'
        
    })
})



app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must Provide a search term'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forcast(latitude,longitude,(error,forcastdata) => {
            if(error){
                return res.send({error})
            }

            res.send({
                place:req.query.address,
                weather:forcastdata,
                location
            })
        })
    })
} )


app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        Name :'Varun Saral',
        errormessage: '404 Help Article not found'
    })
})


app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        Name :'Varun Saral',
        errormessage: '404 Page Not Found'
    })
})


app.listen(3000,() => {
    console.log('Server is running on port 3000')
})