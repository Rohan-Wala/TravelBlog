import React, { createContext } from 'react'
import moment from 'moment';




const Datecontext=createContext((date)=>{
      let date_1=moment(date).fromNow()
      var regex = /\d+/g;
      var number = date_1.match(regex);
      if(number&&number>7&&date_1.includes("days")){
            return moment(date).format('MMMM Do YYYY')
      }
      else if(number&&number>=1&&date_1.includes("months")){
        return moment(date).format('MMMM Do YYYY')
  }
  else if(number&&number>=1&&date_1.includes("years")){
    return moment(date).format('MMMM Do YYYY')
}
      else{
        return date_1
      }
      
});


  

export default Datecontext;