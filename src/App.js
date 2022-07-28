import './App.css';
import Line from './components/Line';
import CovidSummary from './components/CovidSummary';
import { useEffect, useState } from 'react';
import axios from './components/Axios';
import image from './image/a3.jpeg'

function App() {

  const [totalConfirmed, setTotalConfirmed] = useState(0)
  const [totalRecovered, setTotalRecovered] =useState(0)
  const [totalDeaths, setTotalDeaths] = useState(0)
  const [loading, setLoading] = useState(false)
  const [covidSummary, setCovidSummary] = useState({})
  const [days, setDays] = useState(7);
  const [country, setCountry] = useState('')
  const [coronaCount1, setcoronaCount1] = useState([])
  const [label, setLabel] = useState([])

  useEffect(() => {
    setLoading(true)
    axios.get(`/summary`)
    .then(res => {
      setLoading(false) 
      if(res.status === 200) {
        setTotalConfirmed(res.data.Global.TotalConfirmed)
        setTotalRecovered(res.data.Global.TotalRecovered)
        setTotalDeaths(res.data.Global.TotalDeaths)
        setCovidSummary(res.data)
        
      }
      console.log(res);
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const dateFormat = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const datex = d.getDate()

    return `${year}-${month}-${datex}`
  }

  const countryHandler = (e) => {
    setCountry(e.target.value)
    const d = new Date();
    const to = dateFormat(d);
    const from = dateFormat(d.setDate(d.getDate() - days))

    // console.log(from, to)

    getCoronaReport(e.target.value, from, to)
  }

  const daysHandler = (e) => {
    setDays(e.target.value)
    const d = new Date();
    const to = dateFormat(d);
    const from = dateFormat(d.setDate(d.getDate() - e.target.value))
    getCoronaReport(country, from, to)
  }

  const getCoronaReport = (countrySlug, from, to) => {
    axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res => {
      console.log(res);

      const yAxis1 = res.data.map(d => d.Cases);
      const xAxisLabel = res.data.map(d => d.Date)

      const covidDetails = covidSummary.Countries.find(country => country.Slug === countrySlug)

      setcoronaCount1(yAxis1)
      setTotalConfirmed(covidDetails.TotalConfirmed)
      setTotalRecovered(covidDetails.TotalRecovered)
      setTotalDeaths(covidDetails.TotalDeaths)
      setLabel(xAxisLabel)

      


    })
    .catch(error => {
      console.log(error)
    })
  }




  if(loading) {
    return <p >Fetching data from server!</p>
  }

  return (
    <div style={{backgroundImage:`url(${image})`}}>
    <div className="App">
      <CovidSummary
      totalConfirmed={totalConfirmed}
      totalRecovered={totalRecovered}
      totalDeaths={totalDeaths}
      country={country}
      />
      
      <div>
        <select value={country} onChange={countryHandler}>
          <option value="">Select Country</option>
          {
            covidSummary.Countries && covidSummary.Countries.map(country => 
              <option key={country.Slug} value={country.Slug}>{country.Country}</option>)
          }
        </select>
        <select value={days} onChange={daysHandler}>
          <option value='7'>last 7 days</option>
          <option value='30'>last 30 days</option>
          <option value='90'>last 90 days</option>
        </select>


      </div>
      <Line
      yAxis = {coronaCount1}
      label={label}
      />
    </div>
  
    </div>

  
  )
}



export default App;