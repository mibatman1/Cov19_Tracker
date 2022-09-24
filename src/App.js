import { Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import {useState, useEffect} from 'react';
import InfoBox from './InfoBox';
import Table from './Table';
import LineGraph from './LineGraph';
import Map from './Map';
import {sortData} from './util';
import 'leaflet/dist/leaflet.css';
import {prettyPrintStat} from './util';
import './App.css';
const App=()=>
{
  const [countries, setCountries]=useState([]);
  const [county, setCounty]=useState('worldwide');
  const [countryInfo, setCountryInfo]=useState({});
  const [tableData, setTableData]=useState([]);
  const [mapCenter, setMapCenter]=
  useState({lat:34.80746, lng:-40.476});
  const [mapZoom, setMapZoom]=useState(3);
  const [mapCountries, setMapCountries]=useState([]);
  const [casesType, setCasesType]=useState('cases');

  useEffect(()=>
  {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response=>response.json())
    .then((data)=>
    {
      setCountryInfo(data);
    });

  },[]);

  useEffect(()=>
  {
    //The code inside here will run once
    //when the component loads and not again after
    const getCountriesData=async()=>
    {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=>response.json())
      .then((data)=>
      {
        const countries=data.map((country)=>({
          name:country.country,
          value:country.countryInfo.iso2
        }));

        const sortedData=sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
      });
    };

    getCountriesData();

  },[]);

  const onCountryChange=async(event)=>
  {
    const countryCode=event.target.value;
    setCounty(countryCode);

    const url=countryCode==='worldwide'?'https://disease.sh/v3/covid-19/all':
    `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response=>response.json())
    .then(data=>
      {
        setCounty(countryCode);

        //All of the country response
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
        setMapZoom(4);
      });
  };

  // console.log(countryInfo);


  return(
    <div className="app">

      <div className="app__left">

        <div className="app__header">
          <h1>CovTrack</h1>
          <FormControl className="app__dropdown">

            <Select variant="outlined"
            value={county} onChange={onCountryChange}>

              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((country)=>
              {
                return(
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                );
              })}

            </Select>

          </FormControl>
        </div>


        <div className="app__stats">

          <InfoBox
          isRed 
          active={casesType==='cases'}
          title="Active Cases" 
          total={countryInfo.cases} 
          cases={prettyPrintStat(countryInfo.todayCases)}
          onClick={(e)=>setCasesType('cases')}
          />

          <InfoBox
          isRed 
          active={casesType==='recovered'}
          title="Recovered" 
          total={countryInfo.recovered} 
          cases={countryInfo.todayRecovered}
          onClick={(e)=>setCasesType('recovered')}
          />

          <InfoBox
          isRed 
          active={casesType==='deaths'}
          title="Deaths" 
          total={countryInfo.deaths} 
          cases={countryInfo.todayDeaths}
          onClick={(e)=>setCasesType('deaths')}
          />
        </div>

        <p><strong>Vaccine Notification Coming Soon!</strong></p>

        <Map 
        casesType={casesType}
        center={mapCenter} 
        zoom={mapZoom}
        countries={mapCountries}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3 className="h3">Live Cases by country</h3>
            <Table countries={tableData}></Table>

          <h3 className="h32">Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType}/>
            {/* {Graph} */}

        </CardContent>
      </Card>

    </div>
  );
}

export default App;