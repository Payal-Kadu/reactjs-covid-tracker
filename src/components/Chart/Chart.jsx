import React, {useState, useEffect} from "react";
import { Line, Bar} from 'react-chartjs-2';
import {fetchDailyData} from "../../api";

import styles from "./Chart.module.css"


function Chart({data:{confirmed, recovered,deaths},country}){
    
    const [dailyData, setDailyData] = useState([]);

    //we cannot write async with useEffect that's why we created a function inside useEffect.
    //Example: we cannot write useEffect( async () => {}) this will throw error race condition so to eliminate that we created
    //a async function inside it.
    // ** since axios is promise-based here fetchDailyData() is promise so we have to use await before it and write it inside a async function.

    useEffect(() => {   
        const fetchAPI = async () => {
        //    const finalresult= await fetchDailyData()
           setDailyData(await fetchDailyData());
        }
        
        fetchAPI();
    },[]);


    const lineChart = (
        dailyData.length?(<Line 
            data={{
                labels: dailyData.map(({date})=>date),
                datasets:[{
                    data: dailyData.map(({confirmed})=>confirmed),
                    label:"Infected",
                    borderColor:"#3333ff",
                    fill:true,
                },{
                    data: dailyData.map(({deaths})=>deaths),
                    label:"Deaths",
                    borderColor:"reds",
                    backgroundColor:"rgba(255,0,0,0.5)",
                    fill:true,
                }]
            }}
        />) : null
    );

   
    

    const barChart = (
        confirmed?(
            <Bar 
                data={{
                   labels:["infected", "Recovered", "Deaths"],
                   datasets:[{
                       label:"People",
                       backgroundColor:["rgba(0,0,255,0.5)","rgba(0,255,0,0.5)","rgba(255,0,0,0.5)"],
                       data:[confirmed.value, recovered.value, deaths.value]
                   }]
                }}
                options={{
                        legend:{display: false},
                        title:{ display:true, text:`Current state in ${country}`},
                    }}
            />
        ) :null
    )
    

    return <div className={styles.container}>
        {country? barChart : lineChart}
        {/* {country? lineChart: barChart} */}
    </div>
}

export default Chart;