import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const dailydataURL = "https://covid19.mathdro.id/api/daily";
const countryUrl = "https://covid19.mathdro.id/api/countries";

export const fetchData = async (country) => {
  let changeableUrl = url;
  if(country){
    changeableUrl=`https://covid19.mathdro.id/api/countries/${country}`;
  }
    try {
      const response = await axios.get(changeableUrl);
      const {data:{confirmed, recovered, deaths, lastUpdate}} = response;
      const modifiedData = {confirmed, recovered, deaths,lastUpdate}
      return modifiedData;
    } catch (error) {
      console.error(error)
    }
  }

  export const fetchDailyData = async () => {
    try{
      const {data} = await axios.get(dailydataURL);
      const finalData = data.map((dailydata) =>({
        confirmed:dailydata.confirmed.total,
        deaths:dailydata.deaths.total,
        date:dailydata.reportDate
      }))
      return finalData
    }catch(error){
      console.log(error);
      
    }      
  }

  export const getCountryName = async () => {
    try {
        const countryresult = await axios.get(countryUrl)
        const {data:{countries}} = countryresult;
        return countries.map((country)=>country.name)
    } catch (error) {
      
    }
  }