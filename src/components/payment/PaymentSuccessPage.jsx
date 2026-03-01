import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import api from "../../services/api";
import { Button } from "../ui/Button";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tran_id = query.get("tran_id");

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.post("/bookings/payment-success/", { tran_id });
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    if (tran_id) fetchBookings();
  }, [tran_id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">পেমেন্ট সফল হয়েছে!</h1>
      <p className="mb-4 text-center text-green-800">
        আপনার বুকিং সফলভাবে সম্পন্ন হয়েছে।
      </p>

      <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md mb-4">
        <h2 className="font-semibold mb-2">বুকিং বিস্তারিত</h2>
        {bookings.length > 0 ? (
          bookings.map((b, i) => (
            <div key={i} className="border-b last:border-b-0 py-1">
              <p>তারিখ: {b.date}</p>
              <p>
                সময়: {b.start_time} - {b.end_time}
              </p>
              <p>মূল্য: ৳{b.price}</p>
            </div>
          ))
        ) : (
          <p>বুকিং তথ্য পাওয়া যায়নি।</p>
        )}
      </div>

      <Button
        className="bg-green-600 hover:bg-green-700"
        onClick={() => navigate("/bookings")}
      >
        ফিরে যান বুকিং পেজে
      </Button>
    </div>
  );
};

export default PaymentSuccessPage;
