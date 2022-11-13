import React from "react";
import L from "leaflet";
import { Marker, Polygon } from "react-leaflet";

const PolygonWithText = (props: {
  coord:
    | L.LatLngExpression[]
    | L.LatLngExpression[][]
    | L.LatLngExpression[][][];
  text: string | HTMLElement | false | undefined;
}) => {
  const center = L.polygon(props.coord).getBounds().getCenter();
  const text = L.divIcon({ html: props.text });

  return (
    <Polygon color="blue" positions={props.coord}>
      <Marker position={center} icon={text} />
    </Polygon>
  );
};

export default PolygonWithText;
