import { Link } from "react-router-dom";

export default function DamagePenalties() {
  return (
    <div className="container mx-auto px-6 py-10 text-gray-800 dark:text-gray-200 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center">Damage Penalties</h1>

      <p className="mb-4">
        At <strong>Wheels On Demand</strong>, we ensure that every vehicle is in top condition before renting. In case of any damage during your rental period, the following penalties and charges apply.
      </p>

      
      <h2 className="text-xl font-semibold mt-6">1. Types of Damage</h2>
      <ul className="list-disc pl-6">
        <li><strong>Minor Scratches</strong> – ₹500 to ₹2,000 (depends on severity)</li>
        <li><strong>Major Scratches/Dents</strong> – ₹2,000 to ₹10,000</li>
        <li><strong>Broken Lights/Mirrors</strong> – Cost of replacement + ₹1,000 labor charge</li>
        <li><strong>Accidental Damage</strong> – Full repair cost as per service invoice</li>
        <li><strong>Engine or Internal Damage</strong> – Determined by certified mechanics</li>
      </ul>

      
      <h2 className="text-xl font-semibold mt-6">2. Insurance Coverage</h2>
      <p>
        Our rentals include basic insurance coverage. However, additional charges may apply if the damage exceeds the insured amount.
      </p>

      
      <h2 className="text-xl font-semibold mt-6">3. Reporting Damage</h2>
      <p>
        If you notice any damage during your rental period, please report it immediately to our customer support. Failing to report damage may result in additional penalties.
      </p>

      
      <h2 className="text-xl font-semibold mt-6">4. Refund & Dispute Resolution</h2>
      <p>
        Any dispute regarding damage charges can be resolved through our{" "}
        <Link to="/refund-and-cancellation" className="text-blue-500 dark:text-blue-400 hover:underline">
          Refund and Cancellation Policy
        </Link>.
      </p>

     
      <div className="mt-10 text-center">
        <p>
          <strong>Wheels On Demand</strong> | © {new Date().getFullYear()} All Rights Reserved.
        </p>
        <p className="mt-2">
          <Link to="/damage-penalties" className="text-blue-500 dark:text-blue-400 hover:underline">
            Damage Penalties
          </Link>
        </p>
      </div>
    </div>
  );
}