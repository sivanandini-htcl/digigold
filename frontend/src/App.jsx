import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Gold from "./pages/Gold";
import Silver from "./pages/Silver";
import Profile from "./pages/Profile";
import { PriceProvider } from "./components/PriceProvider";
import Signup from "./pages/Authentication/Signup";
import Login from "./pages/Authentication/Login";
import EditProfile from "./pages/EditProfile";
import KycPage from "./pages/KYC.jsx/KycPage";
import Nominee from "./pages/ProfileComponents/Nominee";
import Delivery from "./pages/ProfileComponents/Delivery";
import BankAccount from "./pages/ProfileComponents/BankAccount";
import BuyGold from "./pages/ProfileComponents/BuyGold";



function App() {
  return (
    <div  className="min-h-screen bg-[#0f121a] text-gray-100 font-sans">
      {/* <div className="min-h-screen bg-background text-foreground py-8 px-4"></div> */}
   <PriceProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="gold" element={<Gold/>}/>
        <Route path="silver" element={<Silver/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="edit" element={<EditProfile/>}/>
        <Route path="kycpage" element={<KycPage/>}/>
        <Route path="nominee" element={<Nominee/>}/>
        <Route path="/delivery" element={<Delivery/>}/>
        <Route path="/account" element={< BankAccount/>}/>
        <Route path="/buygold" element={<BuyGold />} />

      </Routes>
    </BrowserRouter>
    </PriceProvider>
     </div>
  );
}

export default App;
