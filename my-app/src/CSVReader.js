import React, {useState} from 'react'
import * as d3 from 'd3'
import xyzCoordinates from './xyz_cooridinates.csv'
import fileDownload from "js-file-download";

function CSVReader() {

    // const [csvFile, setCsvFile] = useState(null);

    const handleReadCSV = async () => {
        let arr = [];
        await d3.csv(xyzCoordinates,  (data) => {
            const JSONobj =  JSON.stringify(data);
            arr.push(JSONobj)
        })
        fileDownload(arr, 'xyzCoordinates.json')
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
