// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       setLoading(true);
//       const res = await api.post("auth/login/", formData);

//       localStorage.setItem("access", res.data.access);
//       localStorage.setItem("refresh", res.data.refresh);

//       // ✅ Success toast
//       toast.success("আপনি সফলভাবে লগইন করেছেন!");

//       navigate("/"); // home page or dashboard
//     } catch (err) {
//       // ✅ Error toast
//       toast.error(
//         err.response?.data?.message ||
//           JSON.stringify(err.response?.data) ||
//           "লগইন ব্যর্থ হয়েছে",
//       );
//       setError(
//         err.response?.data?.message ||
//           JSON.stringify(err.response?.data) ||
//           "ইমেইল বা পাসওয়ার্ড ভুল",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
//       <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative">
//         <h1 className="text-2xl font-bold text-center mb-2">
//           প্রাইম ফুটবল টার্ফ
//         </h1>
//         <p className="text-center text-gray-600 mb-6">বুকিং করতে লগইন করুন</p>

//         {/* Tabs */}
//         <div className="flex bg-gray-100 rounded-full p-1 mb-6">
//           <Link
//             to="/login"
//             className="flex-1 py-2 rounded-full bg-white shadow text-sm font-medium text-center"
//           >
//             লগইন
//           </Link>

//           <Link
//             to="/register"
//             className="flex-1 py-2 rounded-full text-sm font-medium text-gray-600 text-center"
//           >
//             রেজিস্ট্রেশন
//           </Link>
//         </div>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm mb-1">ইমেইল</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="your@email.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">পাসওয়ার্ড</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
//           >
//             {loading ? "লোড হচ্ছে..." : "লগইন করুন"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // remove field error while typing
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "ইমেইল প্রয়োজন";
    }

    if (!formData.password) {
      newErrors.password = "পাসওয়ার্ড প্রয়োজন";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("auth/login/", formData);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      toast.success("আপনি সফলভাবে লগইন করেছেন!");
      navigate("/");
    } catch (err) {
      setServerError("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative">
        <h1 className="text-2xl font-bold text-center mb-2">
          প্রাইম ফুটবল টার্ফ
        </h1>
        <p className="text-center text-gray-600 mb-6">বুকিং করতে লগইন করুন</p>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          <Link
            to="/login"
            className="flex-1 py-2 rounded-full bg-white shadow text-sm font-medium text-center"
          >
            লগইন
          </Link>

          <Link
            to="/register"
            className="flex-1 py-2 rounded-full text-sm font-medium text-gray-600 text-center"
          >
            রেজিস্ট্রেশন
          </Link>
        </div>

        {/* Server Error */}
        {serverError && (
          <p className="text-red-500 text-sm mb-3">{serverError}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">ইমেইল</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-green-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-green-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "লোড হচ্ছে..." : "লগইন করুন"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
