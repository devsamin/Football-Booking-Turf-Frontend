// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirm_password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirm_password) {
//       setError("পাসওয়ার্ড মিলছে না");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.post("auth/register/", {
//         username: formData.name, // ✅ DRF default User model এর জন্য required
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//         confirm_password: formData.confirm_password,
//       });

//       localStorage.setItem("access", res.data.access);
//       localStorage.setItem("refresh", res.data.refresh);

//       // ✅ Show success toast
//       toast.success("আপনার একাউন্ট সফলভাবে তৈরি হয়েছে!");

//       navigate("/"); // home page or dashboard
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           JSON.stringify(err.response?.data) || // detailed error
//           "রেজিস্ট্রেশন ব্যর্থ হয়েছে",
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
//         <p className="text-center text-gray-600 mb-6">নতুন একাউন্ট তৈরি করুন</p>

//         {/* Tabs */}
//         <div className="flex bg-gray-100 rounded-full p-1 mb-6">
//           <Link
//             to="/login"
//             className="flex-1 py-2 rounded-full text-sm font-medium text-gray-600 text-center"
//           >
//             লগইন
//           </Link>

//           <Link
//             to="/register"
//             className="flex-1 py-2 rounded-full bg-white shadow text-sm font-medium text-center"
//           >
//             রেজিস্ট্রেশন
//           </Link>
//         </div>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {/* Row 1 */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm mb-1">নাম</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="আপনার নাম"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm mb-1">ইমেইল</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="your@email.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               />
//             </div>
//           </div>

//           {/* Row 2 */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm mb-1">ফোন নাম্বার</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="01XXXXXXXXX"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm mb-1">পাসওয়ার্ড</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               />
//             </div>
//           </div>

//           {/* Row 3 */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm mb-1">
//                 পাসওয়ার্ড নিশ্চিত করুন
//               </label>
//               <input
//                 type="password"
//                 name="confirm_password"
//                 placeholder="••••••••"
//                 value={formData.confirm_password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
//           >
//             {loading ? "লোড হচ্ছে..." : "রেজিস্টার করুন"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // password match check
    if (formData.password !== formData.confirm_password) {
      setError("পাসওয়ার্ড মিলছে না");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("auth/register/", {
        username: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirm_password: formData.confirm_password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      toast.success("আপনার একাউন্ট সফলভাবে তৈরি হয়েছে!");
      navigate("/");
    } catch (err) {
      if (err.response?.data) {
        // show first backend error message cleanly
        const backendErrors = err.response.data;
        const firstError = Object.values(backendErrors)[0];
        setError(
          Array.isArray(firstError)
            ? firstError[0]
            : firstError || "রেজিস্ট্রেশন ব্যর্থ হয়েছে",
        );
      } else {
        setError("রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      }
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
        <p className="text-center text-gray-600 mb-6">নতুন একাউন্ট তৈরি করুন</p>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          <Link
            to="/login"
            className="flex-1 py-2 rounded-full text-sm font-medium text-gray-600 text-center"
          >
            লগইন
          </Link>

          <Link
            to="/register"
            className="flex-1 py-2 rounded-full bg-white shadow text-sm font-medium text-center"
          >
            রেজিস্ট্রেশন
          </Link>
        </div>

        {/* Top Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">নাম</label>
              <input
                type="text"
                name="name"
                placeholder="আপনার নাম"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">ইমেইল</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">ফোন নাম্বার</label>
              <input
                type="tel"
                name="phone"
                placeholder="01XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                name="confirm_password"
                placeholder="••••••••"
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "লোড হচ্ছে..." : "রেজিস্টার করুন"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
