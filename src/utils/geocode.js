const request= require('request')
 

const geocode=(address,callback)=>{
    const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5raXRwcmFzYWQwMDY5IiwiYSI6ImNqdGtlbDBkODEzeHg0M256bXFtMHozNGQifQ.5ap1-C3ojf9zq37Q2dNhwQ&limit=1'
    request({url:geocodeURL,json:true},(error,response)=>{
         if(error){
              callback('Check your internet connection or services',undefined)
         }
         else if(response.body.features.length==0){
              callback('Unable to find Location. Search Proper location.',undefined)  
         }
         else{
             callback(undefined,{
                 location:response.body.features[0].place_name,
                 longitude:response.body.features[0].center[0],
                 latitude:response.body.features[0].center[1]
             })

         }
    })
}
module.exports=geocode