import React, {useState} from 'react'
import * as d3 from 'd3'
import xyzCoordinates from './xyz_cooridinates.csv'
import fileDownload from "js-file-download";
import newStarData from './newStarData'

function CSVReader() {

    // const [csvFile, setCsvFile] = useState(null);
    const handleReadCSV = async () => {
        let arr = [];
        await d3.csv(xyzCoordinates,  (data) => {
            console.log(parseInt(data.x))
            arr.push({
                color: 'white',
                position: [parseInt(data.x), parseInt(data.y), parseInt(data.z)],
                name: 'N/A',
                size: [10,10,10],
                notable: true,
                realPosition: 'x,y,z',
                temperature: '1 million degrees',
                brightness: '5 lumens',
                realSize: '1 million miles',
                realColor: 'blue',
                velocityDirection: [5000,0,0]
            })
        })
        const JSONobj =  JSON.stringify(arr);

        console.log(JSONobj)
        fileDownload(JSONobj, 'newStarData.json')
    };

    // const handleChange = (event)=>{
    //     setCsvFile(event.target.files[0])
    //     console.log(event.target.files[0])
    // }

    return (
        <>
            <h1>CsvReader</h1>
            {/*<input type='file' onChange={handleChange}/>*/}
            <button onClick={handleReadCSV}>read csv</button>
        </>
    )
}

export default CSVReader
