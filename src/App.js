import React from 'react';

import Cards from "./components/Cards/Cards"
import Chart from "./components/Chart/Chart"
import CountryPicker from "./components/CountryPicker/CountryPicker"
import { fetchData } from './api/';
import styles from './App.module.css';

import coronaImage from "./images/image.png"


class App extends React.Component {
  state = {
    data: {},
    country: ""
  }
  
  async componentDidMount() {
    const fetcheddata = await fetchData();
    this.setState({ data:fetcheddata });
  }

  HandleCountryEvent = async (country) => {
      //fetch data
      const fetchdedata = await fetchData(country);
      //set data
      this.setState({ data: fetchdedata, country: country });

  }

  render() {
      
    const { data, country} = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="covid-19"/>
        <Cards mydata={data}/>
        <CountryPicker HandleChange={this.HandleCountryEvent}/>
        <Chart data={data} country={country}/> 
      </div>
    );
  }
}

export default App;