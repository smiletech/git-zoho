import React, { useEffect } from 'react'

var Data= JSON.parse(localStorage.getItem("AllToll")) || [];

function TolList() {
    useEffect(() => {
        Data= JSON.parse(localStorage.getItem("AllToll")) || [];
    }, [])
    
  return (
    <div> 
      
      <table className="table">
    <thead>     
  <tr className="table_header">
  <th>Toll Name</th>
    <th>CAR/JEEP/VAN</th>
    <th> LCV</th>
    <th> TRUCK/BUS</th>
    <th>HEAVY VEHICLES</th>

  </tr>
  </thead>
  <tbody>
  {
    Data.map((data,i)=>(
    <tr key={i} className="table-content" >
      <td>{data.tollname}</td>
     {
      data.Newtoll.map((ele,ind)=>{
        if(ele.vehicleType==="Car/Jeep/Van")  return(<td>{ele.single} / {ele.return}</td>)
        if(ele.vehicleType==="LCV")  return(<td>{ele.single} / {ele.return} </td>)
        if(ele.vehicleType==="Truck/Bus")  return(<td>{ele.single} / {ele.return} </td>)
        if(ele.vehicleType==="Heavy vehicle")  return(<td>{ele.single} / {ele.return} </td>)    
})
      }
            </tr>

      ))
  }
  </tbody>
          </table></div>
  )
}

export default TolList