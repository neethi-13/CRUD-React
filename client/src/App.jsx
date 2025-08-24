
import './App.css'
import { useState , useEffect } from 'react';
import axios from 'axios';
function App() {
  const [user , setUser] = useState([]);
  const [search, setSearch] = useState([]);
  const [add , setAdd] = useState({name:"" , age:"",city :""});
  const [model , setModel] = useState(false);
  const getAlluser = async () => {
    await axios.get("https://crud-react-rqet.onrender.com/users").then((res)=>{
      setUser(res.data);
      
      setSearch(res.data);
    })
  }

  // Searching the Data

  const changes = (e) =>{
    const text = e.target.value.toLowerCase();
    const searchs = user.filter((user) =>user.name.toLowerCase().includes(text) || user.city.toLowerCase().includes(text));
      setSearch(searchs);
  
  } 
// Adding the Record
  const AddRecordbtn =  ()=>{
    setAdd({name:"" , age:"", city:""}); 
    setModel(true);
  };
   // clse the modal
   const close = ()=>{
    setModel(false);
    getAlluser();
   }
   // Add the Record
   const handleData = (e) =>{
    setAdd({...add,[e.target.name] : e.target.value});
   }
   //ADD USER
   const adduser = async (e)=>{
    e.preventDefault();
    if (!add.name.trim() || !add.age.trim() || !add.city.trim()) {
        alert("All the fields are required");
        return;
      }
    if(add.id){
      await axios.patch(`http://localhost:8000/users/${add.id}`,add).then((res)=>{
        alert(res.data.message);
        close();
      })
    }else{
      
      await axios.post("http://localhost:8000/users",add).then((res)=>{
        
        alert(res.data.message);
        
      })
      close();
    }
   }
   //Update User

   const updateDetail = (us)=>{
    setAdd(us);
    setModel(true);

   }
  const deleteuser = async (id ,name) => {
    const isconfirm = window.confirm(`Are you sure you want to delete this user " ${name} "` );
    if(isconfirm){
      await axios.delete(`http://localhost:8000/users/${id}`).then((res)=>{
        setUser(res.data);
        setSearch(res.data);
      })
    }
  }

  useEffect(()=>{
    getAlluser();
  },[]);

  return (
    <div className="container">
      <h3>CRUD Application with React.js Frontend and Node.js Backend</h3>
      <div className="input-search">
        <input type="search" placeholder='Search Here ' onChange={changes}/>
        <button className='btn green' onClick={AddRecordbtn}>Add Record</button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {search && search.map((us , index)=>{
            return(
              <tr key = {us.id}>
            <td>{index+1}</td>
            <td>{us.name}</td>
            <td>{us.age}</td>
            <td>{us.city}</td>
            <td><button className='btn green' onClick={()=>updateDetail(us)}>Edit</button></td>
            <td><button className='btn red' onClick={()=>deleteuser(us.id , us.name)}>Delete</button></td>
          </tr>
            )
          })}
          
        </tbody>
      </table>
      {model && (
        <div className="modal">
          <div className="modal-content">
            <span className='close' onClick={close}>
              &times;
            </span>
            <h2>{add.id ? 'Update Record' : 'Add Record'}</h2>
            <div className="input-group">
              <label htmlFor="name" > Full Name</label>
              <input type="text" name ='name' id='name' value={add.name} onChange={handleData} />
            </div>
            <div className="input-group">
              <label htmlFor="age"> Age</label>
              <input type="number" name ='age' id='age' value={add.age} onChange={handleData} />
            </div>
            <div className="input-group">
              <label htmlFor="city"> City</label>
              <input type="text" name ='city' id='city' value={add.city} onChange={handleData} />
            </div>
            <button className='btn green'onClick={adduser} >{add.id ?"Update User":"Add User"}</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
