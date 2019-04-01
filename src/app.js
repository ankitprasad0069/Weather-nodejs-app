const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const tempo=require('./utils/temp')
const app=express()
const port=process.env.PORT || 3000
// console.log(__dirname)
// console.log(__filename)
/// Define Paths for Express config
const pathDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//set up handlebars engine and vies location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// set up static directory to serve
app.use(express.static(pathDirectory))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ankit Prasad'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ankit Prasad'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'Please provide some help',
        title:'Help Me',
        name:'Ankit Prasad'
    })
})
// app.get('',(req,res)=>{
//      res.send('<h1>Hello How u Doin</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send({
//         name:'Ankit',
//         rollno:9
//     })
// })
// app.get('/about',(req,res)=>{
//     res.send('Here u would get to know about us')
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Unable to find location.Try another search'
        })
    }
    geocode(req.query.address,(error,{location,latitude,longitude}={})=>{
           if(error){
            return res.send({
                error:'Unable to find location.Try another search'
            })
           }
        //    if(location=='undefined')return  res.render('404')
           tempo(latitude,longitude,(error,forecastData)=>{
               if(error){
                return res.send({
                    error:'Unable to find location.Try another search'
                })
               }
            //    if(location==undefined)return  res.render('404')
               res.send({
                   forecast:forecastData,
                   location,
                   address:req.query.address
               })
           })
           

    })
    
})
app.get('*',(req,res)=>{
    res.render('404')
}
)
app.listen(port,()=>{
    console.log('Server is up and running at '+port)
})