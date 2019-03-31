const request= require('request')

const weather=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/e1f19c9569355373a9a8b228e7a4c78d/'+latitude+','+longitude+'?units=si'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Check your internet connection or services',undefined)
        }
        else if(response.body.error){
            callback('Unable to find Temperature. Search Again.',undefined)
        }
        else{
           callback(undefined,response.body.hourly.summary+'. The temperature is '+response.body.currently.temperature+' and precipProbability is '+response.body.currently.precipProbability+'%.')

        }
    })
}
module.exports=weather