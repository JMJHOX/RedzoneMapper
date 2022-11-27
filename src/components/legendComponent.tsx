import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { colorRating } from "../utils/enums";
import "./LegendComponent.css";

function LegendComponent() {
  console.log("dios ayudame a dominar este bug");
  const map = useMap();

  useEffect(() => {
    if (map) {
      const legend = L.control.layers();

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML = `
        <ul style="list-style: none;">
        <li><h4> <span class="color-box"  style="background-color: ${colorRating.GOOD};"></span> No existe crimen</h4></li>
        <li><h4> <span class="color-box"  style="background-color: ${colorRating.NOTBAD};"></span> Bajo</h4></li>
        <li><h4> <span class="color-box"  style="background-color:${colorRating.WARNING};"></span> Moderado       </h4></li>
        <li> <h4> <span class="color-box"  style="background-color: ${colorRating.DANGER};"></span> Alto</h4>  </li>
        <li> <h4> <span class="color-box"  style="background-color: ${colorRating.DOUBT};"></span> No hay datos registrados</h4>  </li>
       </ul> 
          `;
        return div;
      };

      map.addControl(legend);
    }
  }, [map]); //here add map
  return null;
}

export default LegendComponent;
