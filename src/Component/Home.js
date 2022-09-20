import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import TolList from "./TolList";


var Data=JSON.parse(localStorage.getItem("AllToll")) || [];

function Home() {
  const [count, setcount] = useState(0);

  const [close, setclose] = useState(false);
  const [pop, setpop] = useState(false);
  const [modelvehicle, setmodelvehicle] = useState(false);
  const [Toll_List, setToll_List] = useState(true);
  const [AllData, setAllData] = useState();



  // value 

  const [ VehicleEntery,setVehicleEntery ] = useState([
    {
      vehicleType:""
      ,vehicleNumber:""
      ,date:""
      ,tollname:""
      ,tariff:""
    }
  ]);

const [tollname, settollname] = useState("")
  const [ Newtoll,setNewtoll ] = useState([
    {
      vehicleType:""
      ,single:""
      ,return:""
    },
    {
      vehicleType:""
      ,single:""
      ,return:""
    },
    {
      vehicleType:""
      ,single:""
      ,return:""
    },
    {
      vehicleType:""
      ,single:""
      ,return:""
    }
  ]);


  useEffect(() => {
   Data= JSON.parse(localStorage.getItem("AllToll")) || [];

   setAllData(Data);
  }, [Newtoll,count]);

  useEffect(() => {
  console.log(VehicleEntery)
 } ,[VehicleEntery]);

  


  const set_New_toll=(data,index)=>{
    Newtoll[index].vehicleType=data;
     setNewtoll(Newtoll)
  }


const singleJourney=(data,index)=>{
  Newtoll[index].single=data;
  setNewtoll(Newtoll)
 }
const ReturnJourney=(data,index)=>{
  Newtoll[index].return=data;
  setNewtoll(Newtoll)
}

const on_submit=()=>{
  const LocalData= JSON.parse(localStorage.getItem("AllToll")) || [];
    LocalData.push({tollname,Newtoll});
    localStorage.setItem("AllToll", JSON.stringify(LocalData));
    console.log(LocalData)
    setNewtoll('');
    settollname('');
     setclose(!close);

}

const submit_Toll=()=>{

  const LocalToll= JSON.parse(localStorage.getItem("TollData")) || [];
  LocalToll.push(VehicleEntery);
  localStorage.setItem("TollData", JSON.stringify(LocalToll));
  console.log(LocalToll)
  setVehicleEntery({});
   setmodelvehicle(!modelvehicle);


}

const Sorthnd=(data,i)=>{
  console.log(data)
  setpop(!pop);

}

const Vehicle_hnd=(data)=>{
  console.log(data);


  var currentdate = new Date(); 
  var datetime =  currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + "  "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
    
                 
                  
  AllData.map((ele,index)=>{
    if(ele.Newtoll[index].vehicleType===data)
    {
      VehicleEntery.tollname=ele.tollname;
      VehicleEntery.date=datetime;
      VehicleEntery.tariff=ele.Newtoll[index].single
    }

  });
  VehicleEntery.vehicleType=data;

  setVehicleEntery(VehicleEntery);
 setcount(()=>count+1);

}

  const popmenu = () => {
    return (
      <div className="popmenu">
        <div className="rotate"></div>
        <div className="pop-content">
          <ul>
          <li onClick={()=>Sorthnd("All",-1)}>All</li>
          {
            Data.map((ele,i)=>(<>
            <li key={i} onClick={()=>Sorthnd(ele.tollname,i)} >{ele.tollname}</li>
            </>
            ))
          }
          </ul>
         
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="title">
        <h1>Toll Management Application</h1>
      </div>
      <hr />
      <div className="toll_nav">
       
      { Toll_List?
        <div className="firstSearch">
          <h3>Toll entries/Vehicle entries</h3>
          <span>|</span>
          <span
            className="sorticon"
            onClick={() => {
              setpop(!pop);
            }}
          >
            <FaFilter />
          </span>
          <div className="search-div">
            <input type="search" placeholder="Search vehicle"></input>
          </div>
        </div>:<div className="firstSearch">
          <h3>Toll entries/Vehicle entries</h3>
          <span>|</span>
          <div className="search-div">
            <input type="search" placeholder="Search  Toll "></input>
          </div>
        </div>}

        {/* pop menue */}
        {pop ? popmenu() : ""}
        <div className="btn-div">
          <button onClick={() => setmodelvehicle(!modelvehicle)}>
            Add vehicle Entry
          </button>
          <button onClick={() => setclose(!close)}>Add new toll</button>
          <button onClick={() => setToll_List(!Toll_List)} >{`${Toll_List? ("Views All tolls"):(" Back to list")}`}</button>
        </div>

      </div>

      <div>
        {/* Add  new toll model  */}
        {close ? (
          <div id="myModal" class="modal">
            <div class="modal-content">
              <span onClick={() => setclose(!close)} class="close">
                &times;
              </span>
              <h2>Add New Toll</h2>
              <div>
                <div className="toll_name">
                  <p>
                    Toll Name<span className="astik">*</span>
                  </p>
                  <input
                    className="journey1"
                    type="text"
                    placeholder="Enter Toll Name"
                   value={tollname}
                   onChange={(e) => settollname(e.target.value)}
                  ></input>
                </div>

                <p>
                  Vehicles fare details<span className="astik">*</span>
                </p>
                <div className="Tollvehicle">
                  <select className="journey"
                   value={Newtoll.vehicleType}
                  onChange={(e) => set_New_toll(e.target.value,0)}
                  >
                    
                    <option selected>Select vehicle type</option>
                    <option value="Car/Jeep/Van">Car/Jeep/Van</option>
                    <option value="LCV">LCV</option>
                    <option value="Truck/Bus">Truck/Bus</option>
                    <option value="Heavy vehicle">Heavy vehicle</option>
                  </select>

                  <input
                    className="journey"
                    type="number"
                    placeholder="Single Journey"
                    value={Newtoll.single}
                    onChange={(e)=>singleJourney(e.target.value,0)}
                  ></input>
                  <input
                    className="journey"
                    type="number"
                    placeholder="Return Journey"
                    value={Newtoll.return}
                    onChange={(e)=>ReturnJourney(e.target.value,0)}
                  ></input>
                </div>
                <div className="Tollvehicle">
                  <select className="journey"
                    value={Newtoll.vehicleType}
                    onChange={(e) => set_New_toll(e.target.value,1)}
                    >
                    <option value="0">Select vehicle type</option>
                    <option value="Car/Jeep/Van">Car/Jeep/Van</option>
                    <option value="LCV">LCV</option>
                    <option value="Truck/Bus">Truck/Bus</option>
                    <option value="Heavy vehicle">Heavy vehicle</option>
                  </select>
                  <input
                    className="journey"
                    type="number"
                    placeholder="Single Journey"
                    value={Newtoll.single}
                    onChange={(e)=>singleJourney(e.target.value,1)}
                  ></input>
                  <input
                    className="journey"
                    type="number"
                    placeholder="Return Journey"
                    value={Newtoll.return}
                    onChange={(e)=>ReturnJourney(e.target.value,1)}
                  ></input>
                </div>
                <div className="Tollvehicle">
                  <select className="journey"
                    value={Newtoll.vehicleType}
                    onChange={(e) => set_New_toll(e.target.value,2)}
                  >
                    <option value="0">Select vehicle type </option>
                    <option value="Car/Jeep/Van">Car/Jeep/Van</option>
                    <option value="LCV">LCV</option>
                    <option value="Truck/Bus">Truck/Bus</option>
                    <option value="Heavy vehicle">Heavy vehicle</option>
                  </select>
                  <input
                    className="journey"
                    type="number"
                    placeholder="Single Journey"
                    value={Newtoll.single}
                    onChange={(e)=>singleJourney(e.target.value,2)}
                  ></input>
                  <input
                    className="journey"
                    type="number"
                    placeholder="Return Journey"
                    value={Newtoll.return}
                    onChange={(e)=>ReturnJourney(e.target.value,2)}
                  ></input>
                </div>
                <div className="Tollvehicle">
                  <select className="journey"
                    value={Newtoll.vehicleType}
                    onChange={(e) => set_New_toll(e.target.value,3)}
                  >
                    <option value="" selected>Select vehicle type</option>
                    <option value="Car/Jeep/Van">Car/Jeep/Van</option>
                    <option value="LCV">LCV</option>
                    <option value="Truck/Bus">Truck/Bus</option>
                    <option value="Heavy vehicle">Heavy vehicle</option>
                  </select>
                  <input
                    className="journey"
                    type="number"
                    placeholder="Single Journey"
                    value={Newtoll.single}
                    onChange={(e)=>singleJourney(e.target.value,3)}
                  ></input>
                  <input
                    className="journey"
                    type="number"
                    placeholder="Return Journey"
                    value={Newtoll.return}
                    onChange={(e)=>ReturnJourney(e.target.value,3)}
                  ></input>
                </div>

              </div>
              <div>
                <button className="Add_entry" onClick={()=>on_submit()}>Add Details</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        {/* Add  new toll model  */}
        {modelvehicle ? (
          <div id="myModal" class="modal">
            <div class="modal-content-vehicle">
              <span
                onClick={() => setmodelvehicle(!modelvehicle)}
                class="close"
              >
                &times;
              </span>

              <h2 className="h2-title">Add New Entry</h2>
              <div className="Vehicle_div">
                <p>
                  {" "}
                  Vehicle type <span className="astik">*</span>{" "}
                </p>
                <select className="journey-vehicle"
                value={VehicleEntery.vehicleType}
                onChange={(e) => Vehicle_hnd(e.target.value)}
                >
                  <option value="0">Select vehicle type</option>
                  <option value="Car/Jeep/Van">Car/Jeep/Van</option>
                  <option value="LCV">LCV</option>
                  <option value="Truck/Bus">Truck/Bus</option>
                  <option value="Heavy vehicle">Heavy vehicle</option>
                </select>

                <p>
                  Vehicle Number<span className="astik">*</span>
                </p>
                <input
                  className="journey-vehicle"
                  type="text"
                  placeholder="Enter Vehicle Number"
                  value={VehicleEntery.vehicleNumber}
                  onChange={(e)=>{setVehicleEntery({...VehicleEntery} , VehicleEntery.vehicleNumber=e.target.value)}}
                ></input>

                <p>
                  Tariff <span className="astik">*</span>
                </p>
                <input
                  className="journey-vehicle"
                  type="number"
                  disabled
                  value={VehicleEntery.tariff}
                  placeholder="Enter tariff amount"
                ></input>
              </div>

              <div>
                <button className="Add_entry"onClick={(e)=>submit_Toll()} >Add Details</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>


    
{ Toll_List?       
  <table className="table">
  <thead>     
<tr className="table_header">
  <th>Vehicle type</th>
  <th> Vehicle Number</th>
  <th> Date/Times</th>
  <th>Toll Name</th>
  <th>Tariff</th>

</tr>
</thead>

<tbody>
{
  
  Data?.map((data,i)=>(
    <>
    
  <tr key={i} className="tablecontent" >
    <td>{data.tollname}</td>
    <td>data</td>
    <td>"data"</td>
    <td>"data"</td>
    <td>"data"</td>
    </tr>

    </>
    ))

}
</tbody>
        </table>:<TolList/>
        
      }

    
    </div>
  );
}

export default Home;
