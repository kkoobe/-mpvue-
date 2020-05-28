 const dateFormat=function(date){
  let dateTime=new Date(date)
  let month= dateTime.getMonth()<10?"0"+dateTime.getMonth():dateTime.getMonth()
  let day =dateTime.getDay()<10?'0'+dateTime.getDay():dateTime.getDay()
  let hours =dateTime.getHours()<10?'0'+dateTime.getHours():dateTime.getHours()
  let minutes =dateTime.getMinutes()<10?"0"+dateTime.getMinutes():dateTime.getMinutes()
  return month+'/'+day+" "+hours+":"+minutes
}
