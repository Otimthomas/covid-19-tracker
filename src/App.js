import React from "react";
import "./App.css";
import {MenuItem, FormControl, Select} from "@material-ui/core";

function App() {
  const [countries, setCountries] = React.useState([]);
  const [country, setCountry] = React.useState("Worldwide");

  React.useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    console.log("YOOOOO >>>>>>>", countryCode);

    setCountry(countryCode);
  };

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>Covid-19 Tracker</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' onChange={onCountryChange} value={country}>
            <MenuItem value='Worldwide'>Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
            {/* <MenuItem value='worldwide'>Worldwide</MenuItem>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            <MenuItem value='worldwide'>Worldwide</MenuItem> */}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
