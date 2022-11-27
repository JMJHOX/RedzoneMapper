import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import "./App.css";
interface provinceInfo {
  province?: string;
  violence_rating?: number;
}

export enum colorRating {
  GOOD = "#47CB54",
  WARNING = "#ECD24A",
  DANGER = "#E33A3A",
  HELL = "#3B3B3B",
  DOUBT = "#2596be",
}
function App() {
  const [geoJSON, setGeoJSON] = useState(null);
  const [geoJSONPROVINCES, setgeoJSONPROVINCES] = useState(null);
  const [provincesCrimes, setProvincesCrimes] = useState([{}]);
  const [provincesCrimesList, setProvincesList] = useState([{}]);
  async function fetchGeoJSON() {
    const responsePan = await axios.get(
      "https://raw.githubusercontent.com/inmagik/world-countries/master/countries/PAN.geojson"
    );
    if (responsePan) {
      setGeoJSON(responsePan.data);
    }
    const responseProvinces = await axios.get(
      "https://s3.amazonaws.com/tabulario/Data/Instituto+Tommy+Guardia/limites-geograficos-de-panama/distritos-panama.geojson"
    );
    const responseCrimes = await axios.get(
      "https://raw.githubusercontent.com/JMJHOX/RedzoneMapper/development/scripts/province-rating.json"
    );
    if (responseProvinces && responseCrimes) {
      setgeoJSONPROVINCES(responseProvinces.data);
      let crime_list: any = [];
      let crime_province: any = [];
      responseCrimes.data.forEach(({ province, violence_rating }: any) => {
        crime_province.push(province);
        crime_list.push({ province, violence_rating });
      });
      console.log("crime_provinces:", crime_province);
      console.log("crime_list:", crime_list);
      setProvincesList(crime_list);
      setProvincesCrimes(crime_province);
    }
  }

  useEffect(() => {
    fetchGeoJSON();
  }, []);

  function style1(feature: any) {
    return {
      fillColor: "transparent",
      weight: 2,
      opacity: 1,
      color: "#303778", //Outline color
      fillOpacity: 1,
    };
  }
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
    console.log(province);
    console.log(province.properties.LABEL);
    const name = province.properties.LABEL;

    layer.bindTooltip(name, {
      direction: "center",
      permanent: true,
      className: "labelstyle",
    });
    console.log(layer.feature.properties);
    // console.log(provincesCrimes)
    const checkProvinceIsOnList = provincesCrimes.includes(
      layer.feature.properties.LABEL
    );
    if (checkProvinceIsOnList) {
      console.log("check:");
      const province_info: provinceInfo =
        provincesCrimesList[
          provincesCrimes.indexOf(layer.feature.properties.LABEL)
        ];

      switch (province_info.violence_rating) {
        case 0: {
          layer.setStyle({ fillColor: colorRating.GOOD });
          break;
        }
        case 1: {
          layer.setStyle({ fillColor: colorRating.WARNING });
          break;
        }
        case 2: {
          layer.setStyle({ fillColor: colorRating.DANGER });
          break;
        }
        case 3: {
          layer.setStyle({ fillColor: colorRating.HELL });
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
      click: () => {
        console.log("hello");
      },
    });
  };

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
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geoJSON && <GeoJSON data={geoJSON} style={style1} />}
      {geoJSONPROVINCES && (
        <GeoJSON
          data={geoJSONPROVINCES}
          style={style2}
          onEachFeature={onEachCountry}
        />
      )}
      <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
        permanent Tooltip for Rectangle
      </Tooltip>
    </MapContainer>
  );
}

export default App;
