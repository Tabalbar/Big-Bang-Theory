import React, {useState} from 'react'
import * as d3 from 'd3'
import xyzCoordinates from './xyz_cooridinates.csv'
import fileDownload from "js-file-download";

function CSVReader() {

    const [csvFile, setCsvFile] = useState(null);

    const handleReadCSV = async () => {
        let arr = [];
        await d3.csv(csvFile,  (data) => {
            const JSONobj =  JSON.stringify(data);
            arr.push(JSONobj)
        })
        fileDownload(arr, 'xyzCoordinates.json')
    }

    return (
        <>
            <h1>CsvReader</h1>
            <input type='file'/>
            <button onClick={handleReadCSV}>read csv</button>
        </>
    )
}

export default CSVReader
