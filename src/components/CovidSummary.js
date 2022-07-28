

import React from 'react'
import Card from './Card'
import NumberFormat from 'react-number-format'

const CovidSummary = (props) => {
  const {
    totalConfirmed,
    totalRecovered,
    totalDeaths,
    country
  } = props

  return(
    <div >
      <div>
        <div>
          <h1 style={{textTransform: 'capitalize'}}>{country === '' ? 'World Covid Report' : country}</h1>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            // backgroundColor: 'red'
          }}>
          <Card>
         <span>Total Recovered Cases: </span><br />
         <span>{<NumberFormat 
        value={totalRecovered} 
        displayType='text'
        thousandSeparator={true} 
        /> }</span>
       </Card>
        <Card>
        <span>Total Confirmed Cases: </span><br />
        <span>{<NumberFormat 
        value={totalConfirmed} 
        displayType='text'
        thousandSeparator={true} 
        /> }</span>
         </Card>
         <Card>
         <span>Total Death: </span><br />
         <span>{<NumberFormat 
        value={totalDeaths} 
        displayType='text'
        thousandSeparator={true} 
        /> }</span>
         </Card>
          </div>
          
        </div>
      </div>
    </div>
  )
}
export default CovidSummary