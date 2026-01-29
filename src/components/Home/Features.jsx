import React from "react";
import { features, bookingSteps } from "../../data/homeData";


export default function Features() {
return (
<section className="py-16 px-10">
{/* সুবিধাসমূহ */}
<h2 className="text-3xl font-bold text-center mb-10">আমাদের সুবিধাসমূহ</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
{features.map((item, index) => (
<div
key={index}
className="bg-white rounded-2xl shadow-sm p-6 text-center border"
>
<div className="text-4xl mb-4">{item.icon}</div>
<h3 className="text-xl font-semibold mb-2">{item.title}</h3>
<p className="text-gray-600">{item.desc}</p>
</div>
))}
</div>


{/* বুকিং প্রসেস */}
<h2 className="text-3xl font-bold text-center mb-10">কিভাবে বুক করবেন?</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{bookingSteps.map((step, index) => (
<div
key={index}
className="bg-white rounded-2xl border-2 border-green-200 p-6 text-center"
>
<div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-600 text-white font-bold text-lg">
{step.step}
</div>
<h3 className="text-lg font-semibold mb-2">{step.title}</h3>
<p className="text-gray-600 text-sm">{step.desc}</p>
</div>
))}
</div>
</section>
);
}