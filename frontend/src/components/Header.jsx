import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(){
  const navigate=useNavigate();
    return(<>
    
<header className="bg-oklch(13%_0.028_261.692)]
text-Primary text-lg font-bold w-full  p-2 rounded-b-sm flex justify-end items-end shadow-2xl shadow-black" >
  <nav className="flex px-2 py-2 m-2 gap-4">
    <Link to="/" className="hover:text-gray-200"> Dashboard</Link>
    <Link to="gold">Gold</Link>
    <Link to="silver">Silver</Link>
 <button onClick={()=>navigate("/signup")}>
  <svg xmlns="http://www.w3.org/2000/svg" width="22"
     height="22" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
 </button>
    
  

<Link to="/" className="hover:text-gray-200"> About</Link>
<Link to="/" className="hover:text-gray-200"> ?</Link>

{/* <button
  onClick={() => {
    document.documentElement.classList.toggle("dark");
  }}
  className="px-4 py-2 bg-primary text-primary-foreground rounded"
>
  Toggle Theme
</button> */}

  </nav>
  </header>
    </>)
}
export default Header;