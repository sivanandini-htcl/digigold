
import { useContext } from "react";
import { PriceContext } from "../components/PriceProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Profile() {
  const { goldPrice, goldPercentage ,silverPrice,silverPercentage} = useContext(PriceContext);
  const user = {
    name: "Siva",
    phone: "9876543210",
    email: "siva@gmail.com",
    image: "#",
    gold:12,
    silver:14
  };

  const isProfit = Number(goldPercentage) > 0;
  const navigate=useNavigate();
  const silverisProfit = Number(silverPercentage) > 0;

  return (
    <div className="m-3 min-h-screen min-w-screen">
    <div className="bg-white  w-full rounded-xl  justify-center p-4 shadow-md text-accent">
      
      <div className="flex w-full">
        <div className="items-center justify-center">

        <img
          src={user.image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-black"/>

        <p className="mt-3">Name : {user.name}</p>
        <p>Phone : {user.phone}</p>
        <p>Email : {user.email}</p>
         </div>
        </div>

 <div className="flex gap-1 justify-center ">
        <button className="bg-accent rounded-xl p-2 text-white flex  "
         onClick={()=>navigate("/edit")}>View and Update Profile</button>
        <button className="bg-accent rounded-xl p-2 text-white"
         onClick={()=>navigate("/nominee")}>Nominee Details</button>      
         <button className="bg-accent rounded-xl p-2 text-white"
         onClick={()=>navigate("/kycpage")}>KYC</button>
        <button className="bg-accent rounded-xl p-2 text-white "
         onClick={()=>navigate("/delivery")}>Delivery Address</button>
         <button className="bg-accent rounded-xl p-2 text-white"
         onClick={()=>navigate("/account")}>Account Details</button>
         <button className="bg-accent rounded-xl p-2 text-white"
         onClick={()=>navigate("/")}>Billing Information</button>
         <button className="bg-accent rounded-xl p-2 text-white"
         onClick={()=>navigate("/")}>History</button>
         <button className="bg-accent rounded-xl p-2 text-white"
         onClick={()=>navigate("/")}>Transaction</button>
        <button className="bg-accent rounded-xl p-2 text-white"
         onClick={()=>navigate("/")}>Redeem</button>
</div>
 </div>
       
    

<div className="flex justify-center">
<div className="bg-white w-100 m-4 rounded-xl  justify-center p-4 shadow-md text-accent">
<h1 className="font-bold text-center">Gold</h1>
<div className="flex flex-col items-start">
 <div className="flex font-bold gap-6 items-start">
      <p >Your Gold : {user.gold+"/g"} </p>    
      <p>
  Value Today: {(user.gold * goldPrice).toFixed(2)}
</p>
</div>
        
    <div className="flex gap-3 font-bold">
        {/* <p>Gold Today: {goldPrice}/g </p> */}
      Gold Today: 
        {goldPercentage && (
        <p
          className={`text-sm font-semibold mt-1 ${
            isProfit ? "text-green-400" : "text-red-400"
          }`}>
        
         {Math.abs(goldPrice)}
        </p>
      )}

         {goldPercentage && (
        <p
          className={`text-sm font-semibold mt-1 ${
            isProfit ? "text-green-400" : "text-red-400"
          }`}>
          {isProfit ? "▲" : "▼"}{" "}
          {Math.abs(goldPercentage)}%
        </p>
      )}
</div>   
</div>
 <div className="flex justify-center items-center gap-1 m-2">
        <button className="bg-accent rounded-xl p-2 text-white ">Sell</button>
        <button onClick={()=>navigate("/gold")} className="bg-accent rounded-xl p-2 text-white ">Buy</button>
</div>
</div>

<div className="bg-white w-100 m-4 rounded-xl  justify-start items-baseline p-4 shadow-md text-accent">
    <h1 className="font-bold text-center">Silver</h1>
    <div className="flex flex-col items-start">
    <div className="flex gap-8 font-bold items-start">
      <p>Your silver : {user.silver+"/g"} </p>    
      <p>Value Today: {(user.silver * silverPrice).toFixed(2)}</p>
    </div>
        
    <div className="flex gap-3 font-bold">
        Silver Today: 
        {silverPercentage && (
        <p
          className={`text-sm font-semibold mt-1 ${
            silverisProfit ? "text-green-400" : "text-red-400"
          }`}>
        
         {Math.abs(silverPrice)}
        </p>
      )}
       {silverPercentage && (
        <p
          className={`text-sm font-semibold mt-1 ${
            silverisProfit? "text-green-400" : "text-red-400"
          }`}
        >
          {silverisProfit ? "▲" : "▼"}{" "}
          {Math.abs(silverPercentage)}%
        </p>
      )}
</div>
          
    </div>
     <div className="flex justify-center gap-1 m-2">
        <button className="bg-accent rounded-xl p-2 text-white ">Sell</button>
        <button onClick={()=>navigate("/silver")} className="bg-accent rounded-xl p-2 text-white ">Buy</button>
</div>
    </div>
    </div>

      </div>
      

  );
}

export default Profile;
