import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({closeModal, switchToLogin }) {
  const navigate=useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!/^[A-Za-z ]+$/.test(form.name))
      newErrors.name = "Name should contain only letters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsOpen(true);
    }
  };

  const isAnyFieldEmpty =
    !form.name || !form.email || !form.phone;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <button
  onClick={closeModal}
  className="absolute top-3 right-3 text-gray-400 hover:text-white"
>
  ✕
</button>
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Signup
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-2 p-3 rounded-lg bg-gray-700 text-white
           focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mb-2">
            {errors.name}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-2 p-3 rounded-lg bg-gray-700 text-white
          focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mb-2">
            {errors.email}
          </p>
        )}

        {/* Phone */}
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full mb-2 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.phone && (
          <p className="text-red-400 text-sm mb-4">
            {errors.phone}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={isAnyFieldEmpty}
          className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
            isAnyFieldEmpty
              ? "bg-gray-500 cursor-not-allowed": "bg-yellow-500 hover:bg-yellow-600 text-black"
          }`}
        >
          Signup
        </button>

       <p className="text-gray-400 text-sm mt-4 text-center">
        Registered?{" "}
        <span
          onClick={switchToLogin}
          className="text-yellow-400 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
      </div>

      {/* Modal */}
      {/* {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center
         bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80
           text-center animate-scaleIn">
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Signup Successful 
            </h3>
            <p className="text-gray-600 mb-4">
              Welcome, {form.name}
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Signup;
