import React, {useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2'

export default function (props) {
    const [arrayChamp, setArrayChamp] = useState({})
    const [values, setValues] = useState([])
    const [allValuesChart, setAllValuesChart] = useState([])

    useEffect(() => {
        setArrayChamp(props.chartValues)
    }, [props.chartValues])

    useEffect(() => {
        chartInit(arrayChamp)
    }, [arrayChamp])


    useEffect(() => {
        console.log(values)
    }, [values])


    useEffect(() => {
        arrayPerLevel()
    }, [values])

    function chartData () {
        return {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
            datasets:[{
              label: "",
              data: [1,2],
              borderWidth: 4,
              borderColor: 'red',
              backgroundColor: 'red'
              }, 
              {
              label: "",
              data: [1,2],
              borderWidth: 4,
              borderColor: 'green',
              backgroundColor: 'green'
              }, 
              {
              label: "",
              data: [1,2],
              borderWidth: 4,
              borderColor: 'yellow',
              backgroundColor: 'yellow'
              }, 
              {
              label: "",
              data: [1,2],
              borderWidth: 4,
              borderColor: 'blue',
              backgroundColor: 'blue'
              }, 
              {
              label: "",
              data: [1,2],
              borderWidth: 4,
              borderColor: 'orange',
              backgroundColor: 'orange'
            }]
        }
    }

    function chartInit(values){
        let statInitial = Object.values(values)
        .map((value) => value["stats"]["armor"])
        let valuesPerLvl = Object.values(values)
        .map((value) => value["stats"]["armorperlevel"])
        setValues([statInitial, valuesPerLvl])
     }

    function arrayPerLevel() {
        values
        .map((teste) => teste.map((oi, index) => console.log(oi, index)))
    }

    return(
        <div>
            <Bar
                data={chartData()}
                options={{
                    maintainAspectRadio: false
                }}
            />
        </div>
    )

}
