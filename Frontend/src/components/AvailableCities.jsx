import { useState } from "react";
import mumbaiImg from "../images/cities/mumbai.jpg";
import delhiImg from "../images/cities/delhi.jpg";
import bengaluruImg from "../images/cities/bengaluru.jpg";
import chennaiImg from "../images/cities/chennai.jpg";
import hyderabadImg from "../images/cities/hyderabad.jpg";
import puneImg from "../images/cities/pune.jpg";
import kolkataImg from "../images/cities/kolkata.jpg";
import ahmedabadImg from "../images/cities/ahemdabad.jpg";
import jaipurImg from "../images/cities/jaipur.jpg";
import lucknowImg from "../images/cities/lucknow.jpg";

export default function AvailableCities() {
    const [cities] = useState([
        { name: "Mumbai", regional: "मुंबई", image: mumbaiImg },
        { name: "Delhi", regional: "दिल्ली", image: delhiImg },
        { name: "Bengaluru", regional: "ಬೆಂಗಳೂರು", image: bengaluruImg },
        { name: "Chennai", regional: "சென்னை", image: chennaiImg },
        { name: "Hyderabad", regional: "హైదరాబాద్", image: hyderabadImg },
        { name: "Pune", regional: "पुणे", image: puneImg },
        { name: "Kolkata", regional: "কলকাতা", image: kolkataImg },
        { name: "Amedabad", regional: "અમદાવાદ", image: ahmedabadImg },
        { name: "Jaipur", regional: "जयपुर", image: jaipurImg },
        { name: "Lucknow", regional: "लखनऊ", image: lucknowImg },
      ]);

  const openGoogleMaps = (city) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="container mx-auto px-6 py-10 text-gray-800 dark:text-gray-200 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Cities</h1>
      <p className="text-center mb-8">
        Our car rental services are available in the following cities</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cities.map((city, index) => (
          <div
            key={index}
            className="bg-blue-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md 
            transform transition duration-300 ease-in-out hover:shadow-xl hover:scale-105 
            hover:bg-blue-200 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => openGoogleMaps(city.name)}
          >
            <img src={city.image} alt={city.name} className="w-full h-40 object-cover" style={{width: "500px"}}/>
            <div className="p-4">
              <h2 className="text-xl font-bold">{city.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{city.regional}</p>
            </div>
            <br/>
          </div>
          
        ))}
      </div>

      <div className="mt-10 text-center">
        <p>
          <strong>Wheels On Demand</strong> | © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </div>
  );
}