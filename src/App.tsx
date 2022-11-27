import axios from "axios";
import { CSSProperties, useEffect, useState } from "react";
import "./App.css";
import MapShowerPage from "./pages/map";
import { BeatLoader } from "react-spinners";

const override: CSSProperties = {
  
  
};

function App() {
  const [loading, setLoading] = useState(true);
  let [color] = useState("#2596be");
  const [geoJSONPROVINCES, setgeoJSONPROVINCES] = useState(null);
  const [provincesCrimes, setProvincesCrimes] = useState([{}]);
  const [provincesCrimesList, setProvincesList] = useState([{}]);
  async function fetchGeoJSON() {
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
      setProvincesList(crime_list);
      setProvincesCrimes(crime_province);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGeoJSON();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <BeatLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <MapShowerPage
          geoJSONPROVINCES={geoJSONPROVINCES}
          provincesCrimes={provincesCrimes}
          provincesCrimesList={provincesCrimesList}
        />
      )}
    </div>
  );
}

export default App;
