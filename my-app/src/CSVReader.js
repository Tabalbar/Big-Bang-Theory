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
            console.log(data.parallax);
            if(parseInt(data.parallax) >= 3
            ){
                arr.push({
                    color: 'white',
                    position: [parseInt(data.x.split(' ')[0]), parseInt(data.y.split(' ')[0]), parseInt(data.z.split(' ')[0])],
                    name: data.source_id,
                    size: [1,1,1],
                    notable: true,
                    realPosition: 'Dec: ' + parseInt(data.dec) + ', RA: ' + parseInt(data.ra) + ', Parallax: ' + parseInt(data.parallax),
                    temperature: data.teff_val,
                    brightness: 'N/A',
                    realSize: 'N/A',
                    realColor: 'N/A',
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
