import React, {useState} from 'react'
import * as d3 from 'd3'
import xyzCoordinates from './xyz_pos_vel.csv'
import fileDownload from "js-file-download";
import newStarData from './newStarData'

function CSVReader() {

    // const [csvFile, setCsvFile] = useState(null);
    const handleReadCSV = async () => {
        let arr = [];
        await d3.csv(xyzCoordinates,  (data) => {
                arr.push({
                    color: 'white',
                    position: [parseInt(data.x), parseInt(data.y), parseInt(data.z)],
                    name: "Gaia Designator: " + data.source_id,
                    size: [.1,.1,.1],
                    notable: false,
                    ra: data.ra,
                    dec: data.dec,
                    distance: 3216.56/(data.parallax),
                    parallax: parseInt(data.parallax),
                    temperature: parseInt(data.teff_val),
                    realColor: ReturnColorName(parseInt(data.teff_val)),
                    velocityDirection: [parseInt(data.x_vel),parseInt(data.y_vel), parseInt(data.z_vel)],
                    vel_is_valid: data.vel_is_valid
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

/**
 * @return {string}
 */
function ReturnColorName(temperature) {
    if (temperature < 3700) {
        return 'Red'
    }
    if (temperature >= 3700 && temperature < 5200) {
        return 'Orange'
    }
    if (temperature >= 5200 && temperature < 6000) {
        return 'Yellow'
    }
    if (temperature >= 6000 && temperature < 7500) {
        return 'Yellow White'
    }
    if (temperature >= 7500 && temperature < 10000) {
        return 'White'
    }
    if (temperature >= 10000 && temperature < 33000) {
        return 'Blue White'
    }
    if (temperature >= 33000) {
        return 'White'
    }
}

function getRandomInt(max){
    let ranNum;
    if(Math.random() > .5){
         ranNum = -Math.floor(Math.random() * Math.floor(max));
    } else {
         ranNum = Math.floor(Math.random() * Math.floor(max));

    }
    return ranNum
}

export default CSVReader
