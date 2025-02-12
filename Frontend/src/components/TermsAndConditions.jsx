import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-6 py-10 text-gray-800 dark:text-gray-200 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Terms and Conditions
      </h1>

      <p className="mb-4">
        Welcome to <strong>Wheels On Demand</strong>. By using our services, you
        agree to the following <strong>terms and conditions</strong>. Please
        read them carefully before proceeding with your car rental booking.
      </p>

    
      <h2 className="text-xl font-semibold mt-6">1. Rental Eligibility</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>
          <strong>Age Requirement:</strong> The renter must be at least{" "}
          <strong>21 years old</strong> and possess a valid driving license.
        </li>
        <li>
          <strong>License & ID Proof:</strong> A government-issued driving
          license and an additional identity proof (Passport, Aadhaar, etc.) are
          required.
        </li>
        <li>
          <strong>Security Deposit:</strong> A refundable security deposit is
          mandatory before the vehicle is handed over.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">2. Vehicle Usage Policy</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>
          <strong>No Drunk Driving:</strong> The renter must not drive under the
          influence of alcohol or drugs.
        </li>
        <li>
          <strong>Designated Driver:</strong> Only the registered driver(s) can
          operate the vehicle.
        </li>
        <li>
          <strong>Restricted Areas:</strong> Vehicles cannot be used for illegal
          activities, racing, or towing.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">3. Fuel Policy</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>
          <strong>Fuel Responsibility:</strong> The vehicle must be returned
          with the same fuel level as at pickup.
        </li>
        <li>
          <strong>Refueling Charges:</strong> If the fuel level is lower, a
          refueling charge will be applied.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">4. Booking & Payment</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>
          <strong>Advance Payment:</strong> Full or partial payment is required
          at the time of booking.
        </li>
        <li>
          <strong>Cancellation Policy:</strong> Cancellation fees apply as per
          our <a href="/refund-policy" className="text-blue-500 dark:text-blue-400">Refund Policy</a>.
        </li>
        <li>
          <strong>Late Return Fees:</strong> Additional charges apply if the
          vehicle is returned late.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">5. Insurance & Damage</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>
          <strong>Insurance Coverage:</strong> All rental cars include basic
          insurance.
        </li>
        <li>
          <strong>Damage Responsibility:</strong> The renter is responsible for
          any damages beyond normal wear and tear.
        </li>
        <li>
          <strong>Accident Reporting:</strong> Any accident must be reported to
          our customer service immediately.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">6. Traffic Violations</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>
          <strong>Penalty Charges:</strong> The renter is responsible for any
          traffic violations and fines incurred during the rental period.
        </li>
        <li>
          <strong>Toll Fees:</strong> The renter must pay all toll charges.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">7. Vehicle Return Policy</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>
          <strong>Return Time:</strong> The vehicle must be returned by the
          agreed time to avoid late fees.
        </li>
        <li>
          <strong>Clean Condition:</strong> The vehicle should be returned in
          clean condition; excessive dirt may incur cleaning charges.
        </li>
      </ul>

      
      
      <h2 className="text-xl font-semibold mt-6">8. Privacy & Data Protection</h2>
      <p>
        We respect your privacy and handle your personal information as per our{" "}
        <a href="/privacy-policy" className="text-blue-500 dark:text-blue-400">
          Privacy Policy
        </a>.
      </p>

     
      <h2 className="text-xl font-semibold mt-6">9. Customer Support</h2>
      <p>
        If you have any queries, feel free to contact our support team:
      </p>
      <p className="mt-2">
        📧 Email:{" "}
        <a
          href="mailto:support@wheelsondemand.com"
          className="text-blue-500 dark:text-blue-400"
        >
          support@wheelsondemand.com
        </a>
      </p>
      <p>📞 Phone: +1 234 567 8900</p>
      <p>💬 WhatsApp: +1 987 654 3210</p>

   
      <div className="mt-10 text-center">
        <p>
          <strong>Wheels On Demand</strong> | © {new Date().getFullYear()} All
          Rights Reserved.
        </p>
      </div>
    </div>
  );
}