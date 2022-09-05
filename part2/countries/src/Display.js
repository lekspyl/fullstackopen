
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({})
  let weatherBlock
  useEffect(() => {
    const urlParams = [
      `lat=${country.capitalInfo.latlng[0]}`,
      `lon=${country.capitalInfo.latlng[1]}`,
      'units=metric',
      `appid=${process.env.REACT_APP_API_KEY}`
    ]
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?${urlParams.join('&')}`
    axios.get(requestUrl).then(response => {
      setWeather(response.data)

    })
  }, [country.capitalInfo.latlng])

  console.log('weather state', weather)
  if (!Object.keys(weather).length) {
    weatherBlock = (
      <p>Loading data...</p>
    )
  } else {
    let tempSign
    if(weather.main.temp) {
      tempSign = '+'
    } else {
      tempSign = '-'
    }
    weatherBlock = (
      <div>
        <p>Temperature: {tempSign}{Math.round(weather.main.temp)} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Weather in {country.capital[0]}</h3>
      {weatherBlock}
    </div>
  )
}

const Display = ({ countries }) => {
  const [isShown, setIsShown] = useState({});

  const showDetails = (id, setState) => {
    setIsShown({
      ...isShown,
      [id]: setState
    })
  }

  if (countries.length >= 1) {
    return (
      <div>
        {countries.map((x) => {
          const altFlagText = `Flag of ${x.name.common}`
          let languages
          let capital
          let buttonText
          let isVisible
          let countryDetails

          if (x.languages) {
            languages = Object.values(x.languages)
          } else {
            languages = ['No data']
          }
          if (x.capital) {
            capital = x.capital[0]
          } else {
            capital = 'No capital'
          }
          if (isShown[x.ccn3]) {
            buttonText = 'hide'
            isVisible = false
            countryDetails = (
              <div>
                <p>Capital: {capital}</p>
                <p>Area code: {x.area}</p>
                <p>Languages</p>
                <ul>
                  {languages.map(y => <li key={nanoid()}>{y}</li>)}
                </ul>
                <h3>Flag</h3>
                <img src={x.flags.png} alt={altFlagText} />
                <Weather country={x} />
              </div>
            )
          } else {
            buttonText = 'show'
            isVisible = true
            countryDetails = null
          }

          return(
            <div key={nanoid()}>
            <p>{x.flag} {x.name.common}<button onClick={() => showDetails(x.ccn3, isVisible)}>{buttonText}</button></p>
            {countryDetails}
          </div>
          )
        })}
      </div>
    )
  }
}

export default Display
