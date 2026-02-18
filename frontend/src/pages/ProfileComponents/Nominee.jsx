import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

function Nominee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomineeName: "",
    nomineePhone: "",
    address: "",
    relation: "",
    DOB: "",
    panNumber:""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  //  page load
//   useEffect(() => {
//     const fetchNominee = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/nominee");
//         setFormData(res.data);
//       } catch (error) {
//         console.error("Error fetching nominee:", error);
//       }
//     };

//     fetchNominee();
//   }, []);

  // Handle input change

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 

  // Save updated data
//   const handleSave = async () => {
//     try {
//       setLoading(true);

//       await axios.put(
//         "http://localhost:5000/api/nominee",
//         formData
//       );

//       alert("Nominee Updated Successfully!");
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating nominee:", error);
//       alert("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };
  const handleSave = () => {
    // backend updation
    console.log("Saved Data:", formData);
    alert("Profile Updated Successfully!");
    setIsEditing(false);
  }; 
  return (
    <div className="min-h-screen bg-gray-100 text-black w-full">
      <h1 className="text-center text-accent font-bold text-2xl m-4">
        Nominee Details
      </h1>

      <div className="grid grid-cols-3 w-full gap-4 p-4">

        {/* Name */}
        <div>
          <label>Name:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full" type="text"
              name="nomineeName"
              value={formData.nomineeName}
              onChange={handleChange}
            />
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-accent focus:border-indigo-500 ">{formData.nomineeName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label>Phone:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full" type="number" name="nomineePhone"
              value={formData.nomineePhone} onChange={handleChange} />
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-accent">{formData.nomineePhone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label>Address:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full" type="text"  name="address"
               value={formData.address} onChange={handleChange}/>
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-accent ">{formData.address}</p>
          )}
        </div>

        {/* Relation */}
        <div>
          <label>Relation:</label>
          {isEditing ? (
            <input className="border border-black p-2 w-full" type="text" name="relation"
             value={formData.relation} onChange={handleChange}
            />
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-accent ">{formData.relation}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label>DOB:</label>
          {isEditing ? (
            <input
             className="border border-black p-2 w-full" type="date"  name="age"
              value={formData.DOB} onChange={handleChange}
            />
          ) : (
            <p className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent ">{formData.DOB}</p>
          )}
        </div>

         <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PAN Number
                </label>
                 {isEditing ? (
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                   className="border border-black p-2 w-full"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-indigo-500 uppercase">{formData.DOB}</p>
          )}
              </div>

      </div>

      <div className="flex justify-center gap-4 mt-6">

        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl">
              Edit
            </button>

            <button
              onClick={() => navigate("/profile")} className="border px-4 py-2 rounded-xl">
              Back
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-xl">
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setIsEditing(false)} className="border px-4 py-2 rounded-xl">
              Cancel
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Nominee;
