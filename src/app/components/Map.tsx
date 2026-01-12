// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Pin,
// } from "@vis.gl/react-google-maps";
// import { useState } from "react";

// interface AddressMapProps {
//   defaultPosition?: { lat: number; lng: number };
//   onLocationChange?: (lat: number, lng: number) => void;
// }

// const AddressMap = ({ defaultPosition, onLocationChange }: AddressMapProps) => {
//   const [position, setPosition] = useState(
//     defaultPosition || { lat: 35.14, lng: 129.03 }
//   ); // Default: Manila

//   const handleMapClick = (e: google.maps.MapMouseEvent) => {
//     if (e.latLng) {
//       const lat = e.latLng.lat();
//       const lng = e.latLng.lng();
//       setPosition({ lat, lng });
//       onLocationChange?.(lat, lng);
//     }
//   };

//   return (
//     <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
//       <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//         <Map
//           defaultCenter={position}
//           defaultZoom={15}
//           mapId="YOUR_MAP_ID" // Optional: create in Google Cloud for custom style
//           onClick={handleMapClick}
//           gestureHandling={"greedy"}
//           disableDefaultUI={false}
//         >
//           <AdvancedMarker position={position}>
//             <Pin
//               background={"#9333ea"} // purple like your screenshot
//               glyphColor={"#fff"}
//               borderColor={"#6b21a8"}
//             />
//           </AdvancedMarker>
//         </Map>
//       </APIProvider>
//     </div>
//   );
// };

// export default AddressMap;
