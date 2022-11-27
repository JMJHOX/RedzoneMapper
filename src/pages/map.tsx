import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import LegendComponent from "../components/legendComponent";

import { provinceInfo } from "../types/models";
import { colorRating } from "../utils/enums";
import "./map.css";

interface props {
  geoJSONPROVINCES: any;
  provincesCrimes: any;
  provincesCrimesList: any;
}
const MapShowerPage = (props: props) => {
  function style2(feature: any) {
    return {
      fillColor: "white",
      weight: 1,
      opacity: 1,
      color: "#303778", //Outline color
      fillOpacity: 1,
    };
  }

  const onEachCountry = (province: any, layer: any) => {
    const name = province.properties.LABEL;

    layer.bindTooltip(name, {
      direction: "center",
      permanent: true,
      className: "labelstyle",
    });

    const checkProvinceIsOnList = props.provincesCrimes.includes(
      layer.feature.properties.LABEL
    );
    if (checkProvinceIsOnList) {
      const province_info: provinceInfo =
        props.provincesCrimesList[
          props.provincesCrimes.indexOf(layer.feature.properties.LABEL)
        ];

      switch (province_info.violence_rating) {
        case 0: {
          layer.setStyle({ fillColor: colorRating.GOOD });
          break;
        }
        case 1: {
          layer.setStyle({ fillColor: colorRating.NOTBAD });
          break;
        }
        case 2: {
          layer.setStyle({ fillColor: colorRating.WARNING });
          break;
        }
        case 3: {
          layer.setStyle({ fillColor: colorRating.DANGER });
          break;
        }
        default: {
          layer.setStyle({ fillColor: colorRating.DOUBT });
          break;
        }
      }
    }
    if (!checkProvinceIsOnList) {
      layer.setStyle({ fillColor: colorRating.DOUBT });
    }
    layer.on({
      //   mouseover: (event: any) => {
      //     event.target.setStyle({
      //       fillColor: "#B85042",
      //     });
      //   },
      //   mouseout: (event: any) => {
      //     event.target.setStyle({
      //       fillColor: "#A7BEAE",
      //     });
      //   },
      click: () => {},
    });
  };
  //var control = L.control.layers();
  //control.addTo(map);

  return (
    <MapContainer
      center={[9.018470612479675, -79.5170046667918]}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {props.geoJSONPROVINCES && (
        <GeoJSON
          data={props.geoJSONPROVINCES}
          style={style2}
          onEachFeature={onEachCountry}
        />
      )}
      <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
        permanent Tooltip for Rectangle
      </Tooltip>
      <LegendComponent />
    </MapContainer>
  );
};

export default MapShowerPage;
