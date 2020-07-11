import React, {useState, useEffect} from "react";
import {getCountryName} from "../../api"
import {NativeSelect, FormControl} from "@material-ui/core";
import styles from "./CountryPicker.module.css"

function CountryPicker(props){
    const [fetchedcountries,setFetchCountries] = useState([]);
    useEffect(()=>{
        const fetchCountries = async () => {
            setFetchCountries(await getCountryName())
        }
        fetchCountries();
    },[setFetchCountries])

    return <div>
    <FormControl className={styles.FormControl}>
        <NativeSelect onChange={(e) => {props.HandleChange(e.target.value)}}>
            <option value="">Global</option>
            {fetchedcountries.map((country,index) => <option key={index} value={country}>{country}</option>)}
        </NativeSelect>
    </FormControl>
    </div>
}

export default CountryPicker;