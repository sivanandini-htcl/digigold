
import { useState } from "react";
function Signup(){
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });
  

 const handleChange = (e) =>{
    setForm({ ...form, [e.target.name]: e.target.value });
  };
     
    return(<>
    <div className="bg-white w-full rounded-2xl flex justify-center items-center ">
    
    <div className="text-accent w-70" >
<label>Name <span className="text-red-500">*</span>
        <input
          className="w-full p-2 border rounded-lg"
          onChange={handleChange} />
</label>
<label>Phone <span className="text-red-500">*</span>
        <input
          className="w-full p-2 border rounded-lg"
          onChange={handleChange} />
</label>
{/* OTP Verification */}

<label>Email <span className="text-red-500">*</span>
        <input
          className="w-full p-2 border rounded-lg"
          onChange={handleChange} />
</label>
</div>
<button className="text">Submit</button>
    
</div>
    
    </>);
}export default Signup;