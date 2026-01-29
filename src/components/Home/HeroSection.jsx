import React from "react";
import image from "../../assets/images/image.png"
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <section className="relative h-screen w-full">
      <img
        src={image} // adjust path if needed
        alt="Football Turf"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
          প্রাইম ফুটবল টার্ফ
        </h1>
        <p className="mb-6 max-w-xl text-lg text-white md:text-xl">
          ঢাকার সেরা ফুটবল টার্ফ। আধুনিক সুবিধা সহ উন্নতমানের কৃত্রিম ঘাস।
        </p>
        <Link to="/booking">
  <button className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-lg font-semibold text-white hover:bg-green-700 transition">
    📅 এখনই বুক করুন
  </button>
</Link>
      </div>
    </section>
  );
};

export default HeroSection;
