
import React from "react";

export default function RefundCancellation() {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800 dark:text-gray-200 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Refund and Cancellation Policy</h1>

      <p className="mb-4">
        At <strong>Wheels On Demand</strong>, we strive to provide the best car rental experience. We understand that plans can change, and we have outlined our refund and cancellation policies below to ensure transparency and convenience for our customers.
      </p>

      {/* Cancellation Policy Section */}
      <h2 className="text-2xl font-semibold mt-6">1. Cancellation Policy</h2>
      
      <h3 className="text-xl font-semibold mt-4">1.1 Cancellation Before Pickup</h3>
      <p>
        If you cancel your reservation at least <strong>48 hours</strong> before the scheduled pickup time, you are eligible for a **full refund**. 
        Cancellations made within **24 to 48 hours** of the scheduled pickup will incur a **50% cancellation fee**.
      </p>

      <h3 className="text-xl font-semibold mt-4">1.2 Last-Minute Cancellations</h3>
      <p>
        If you cancel within **24 hours** of the scheduled pickup time, you will not be eligible for a refund. However, you may reschedule your booking for a future date without additional charges.
      </p>

      <h3 className="text-xl font-semibold mt-4">1.3 No-Show Policy</h3>
      <p>
        If you do not pick up the vehicle at the scheduled time and do not notify us in advance, the reservation will be considered a **no-show**, and no refund will be issued.
      </p>

      {/* Refund Policy Section */}
      <h2 className="text-2xl font-semibold mt-6">2. Refund Policy</h2>

      <h3 className="text-xl font-semibold mt-4">2.1 Eligible Refunds</h3>
      <p>
        Refunds are processed within **7-10 business days** after a successful cancellation. The refund amount depends on the timing of your cancellation:
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li>100% refund for cancellations made **48+ hours before pickup**.</li>
        <li>50% refund for cancellations **24-48 hours before pickup**.</li>
        <li>No refund for cancellations made **less than 24 hours** before pickup.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">2.2 Refund Method</h3>
      <p>
        Refunds will be processed to the **original payment method** used for the booking. If you do not receive your refund within the expected timeframe, please contact our customer support.
      </p>

      {/* Modification Policy Section */}
      <h2 className="text-2xl font-semibold mt-6">3. Modification Policy</h2>
      <p>
        You can modify your booking up to **24 hours before** the scheduled pickup time without any extra charge. 
        Changes are subject to vehicle availability.
      </p>

      {/* Special Cases Section */}
      <h2 className="text-2xl font-semibold mt-6">4. Special Circumstances</h2>

      <h3 className="text-xl font-semibold mt-4">4.1 Weather or Natural Disasters</h3>
      <p>
        If your rental is affected by a **natural disaster, extreme weather, or government-imposed travel restrictions**, you may be eligible for a **full refund or free rescheduling**.
      </p>

      <h3 className="text-xl font-semibold mt-4">4.2 Vehicle Unavailability</h3>
      <p>
        In rare cases where we are unable to provide the booked vehicle due to unforeseen circumstances, you will receive a **full refund** or the option to switch to a similar vehicle.
      </p>

    
      <h2 className="text-2xl font-semibold mt-6">5. Contact Us</h2>
      <p>
        If you have any questions regarding our Refund and Cancellation Policy, please reach out to our support team.
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li><strong>Email:</strong> <a href="mailto:support@wheelsondemand.com" className="text-blue-500 dark:text-blue-400">support@wheelsondemand.com</a></li>
        <li><strong>Phone:</strong> +1 (800) 123-4567</li>
        <li><strong>WhatsApp:</strong> +1 (800) 987-6543</li>
      </ul>

      <p className="mt-6">
        Thank you for choosing <strong>Wheels On Demand</strong>. We appreciate your business and look forward to serving you.
      </p>
    </div>
  );
}
