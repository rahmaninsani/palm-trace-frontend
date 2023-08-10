import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

const MapRoutingControl = ({ origin, destination }) => {
  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(origin[0], origin[1]), L.latLng(destination[0], destination[1])],
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4,
          },
        ],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    routingControl.hide();

    const destinationMarker = L.marker(destination).addTo(map);
    destinationMarker.bindPopup("Lokasi Kebun").openPopup();

    return () => map.removeControl(routingControl);
  }, [map, origin, destination]);

  return null;
};

export default MapRoutingControl;
