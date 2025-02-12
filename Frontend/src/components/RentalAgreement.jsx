import React from "react";

export default function RentalAgreement() {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800 dark:text-gray-200 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Rental Agreement</h1>
      <p className="mb-4">
        Welcome to Wheels On Demand! This Rental Agreement outlines the terms and conditions of renting a vehicle from us. By renting a vehicle, you agree to comply with the following conditions.
      </p>
      
      <h2 className="text-xl font-semibold mt-6">1. Rental Period</h2>
      <p>
        The rental period begins when the vehicle is picked up and ends when the vehicle is returned to the designated location. You are responsible for the vehicle during the rental period.
      </p>

      <h2 className="text-xl font-semibold mt-6">2. Rental Charges</h2>
      <p>
        The rental charges include the base rental fee, taxes, fees, and any additional charges (such as fuel, insurance, or damage repair costs). All charges are due at the time of rental.
      </p>

      <h2 className="text-xl font-semibold mt-6">3. Insurance</h2>
      <p>
        You are required to have valid insurance coverage for the duration of the rental. If you do not have personal insurance, you may purchase insurance through us.
      </p>

      <h2 className="text-xl font-semibold mt-6">4. Vehicle Use</h2>
      <p>
        The vehicle may only be used for lawful purposes and within the region specified. The vehicle should not be used for racing, illegal activities, or driven under the influence of drugs or alcohol.
      </p>

      <h2 className="text-xl font-semibold mt-6">5. Vehicle Condition</h2>
      <p>
        The vehicle is provided in good condition. You are responsible for inspecting the vehicle upon pickup and notifying us of any pre-existing damage. You must return the vehicle in the same condition.
      </p>

      <h2 className="text-xl font-semibold mt-6">6. Late Returns</h2>
      <p>
        If the vehicle is returned later than the scheduled time, you will incur additional fees for the extended period. Late fees will be charged based on the hourly or daily rate.
      </p>

      <h2 className="text-xl font-semibold mt-6">7. Cancellation and Modifications</h2>
      <p>
        You may cancel or modify your reservation within a certain timeframe. Any cancellations or modifications made after the specified period will incur a cancellation fee.
      </p>

      <h2 className="text-xl font-semibold mt-6">8. Liability</h2>
      <p>
        You are responsible for any damages to the vehicle during the rental period, including but not limited to accidents, theft, or vandalism. You agree to indemnify and hold Wheels On Demand harmless for any claims arising during the rental period.
      </p>

      <h2 className="text-xl font-semibold mt-6">9. Governing Law</h2>
      <p>
        This agreement is governed by the laws of the jurisdiction where the vehicle is rented, and any disputes will be resolved in accordance with those laws.
      </p>

      <h2 className="text-xl font-semibold mt-6">10. Contact Us</h2>
      <p>
        If you have any questions regarding this agreement, please contact us at <a href="mailto:support@wheelsondemand.com" className="text-blue-500 dark:text-blue-400">support@wheelsondemand.com</a>.
      </p>
    </div>
  );
}