import React, {useState} from 'react'
import * as d3 from 'd3'
import xyzCoordinates from './big_xyz_cooridinates.csv'
import fileDownload from "js-file-download";
import newStarData from './newStarData'

function CSVReader() {

    // const [csvFile, setCsvFile] = useState(null);
    const handleReadCSV = async () => {
        let arr = [];
        await d3.csv(xyzCoordinates,  (data) => {
            if(data.parallax >= 20){
                arr.push({
                    color: 'white',
                    position: [parseInt(data.x), parseInt(data.y), parseInt(data.z)],
                    name: data.source_id,
                    size: [.1,.1,.1],
                    notable: true,
                    ra: data.ra,
                    dec: data.dec,
                    distance: 3216.56/(data.parallax),
                    realPosition: 'Dec: ' + data.dec + ', Ra: ' + data.ra + ', Parallax: ' + data.parallax,
                    temperature: parseInt(data.teff_val),
                    brightness: '5 lumens',
                    realSize: '1 million miles',
                    realColor: 'blue',
                    velocityDirection: [getRandomInt(3),getRandomInt(3),getRandomInt(3)]
                })
            }

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


function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

export default CSVReader
