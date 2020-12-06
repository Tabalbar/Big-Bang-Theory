import React, {useState, useRef} from "react";
import {Canvas, extend, useFrame, useThree} from "react-three-fiber";
import _ from "lodash";
import Sphere from "../Objects/Sphere";
import ToolbarWrapper from "./ToolbarWrapper";
import {planetInfo} from '../PlanetData'
import starInfo from '../newStarData'
import {Stats, Stars} from "drei";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import CameraControls from "../HelperFunctions/CameraControls";
import Star from "../Objects/Star";
import StarArrow from "../Objects/StarArrow";
import Selected from "../Objects/Selected";
import Pin from "../Objects/Pin";
import * as THREE from "three";
import Toolbar from "./Toolbar";


function Visualization(
    {}
) {

    const [cameraPosition, setCameraPosition] = useState({x: 0, y: 0, z: 0});
    const [cameraMoving, setCameraMoving] = useState(false);
    const [active, setActive] = useState(false);
    const [cameraMovingToHome, setCameraMovingToHome] = useState(false);
    const [selectedPosition ,setSelectedPosition] = useState({x: 0, y: 0, z:0})
    const [selectedSize, setSelectedSize] = useState({innerRadius: planetInfo[0].size[0]*3, outerRadius: planetInfo[0].size[1]*3, thetaSegments: planetInfo[0].size[2]})
    const [focusDescription, setFocusDescription] = useState({
        name: 'Sun',
        funFact: 'A very small star',
        notable: true,
        realPosition: 'X =-9.256536737968663 E+05, Y = 9.520686612116818 E+05, Z = 1.366316508862237 E+04',
        temperature: '5772',
        ra: planetInfo[0].ra,
        dec: planetInfo[0].dec,
        distance: planetInfo[0].distance,
        velocityDirection: [10,230, 5],
        vel_is_valid: "True",
        velMag: 230.271,
        realColor: 'Yellow'
    });
    const [toggleLines, setToggleLines] = useState(true);
    const [distanceValues, setDistanceValues] = useState([0,3216]);
    const [velMagValues, setVelMagValues] = useState([0,9821]);
    const [filterValues, setFilterValues] = useState({
        distance: [0,1000],
        velMag: [0,9821],
        velArrows: true
    })
    const [bookmarkList, setBookmarkList] = useState([]);
    const [toggleVel, setToggleVel] = useState(true);
    const [cameraAxisView, setCameraAxisView] = useState()

    const removeStarFromList = (index) => {
      let temp = bookmarkList.splice(index, 1)
      setBookmarkList(temp)
    }

    const handleHomeButton = () => {
        const tmpCameraPosition = {
            x: 0,
            y: 0,
            z: 0
        };
        const tmpSelectedPosition = {
            x: planetInfo[0].position[0],
            y: planetInfo[0].position[1],
            z: planetInfo[0].position[2]
        };
        const tmpSelectedSize = {
            innerRadius: planetInfo[0].size[0]*3,
            outerRadius: planetInfo[0].size[1]*3,
            thetaSegments: planetInfo[0].size[2]
        };

        setSelectedSize(tmpSelectedSize)
        setSelectedPosition(tmpSelectedPosition)
        setFocusDescription({
            name: 'Sun',
            funFact: 'A very small star',
            notable: true,
            realPosition: 'X =-9.256536737968663 E+05, Y = 9.520686612116818 E+05, Z = 1.366316508862237 E+04',
            temperature: '5772',
            ra: planetInfo[0].ra,
            dec: planetInfo[0].dec,
            distance: planetInfo[0].distance,
            velocityDirection: [10,230, 5],
            velMag: 230.271,
            vel_is_valid: "True",
            realColor: 'Yellow'
        });
        setCameraPosition(tmpCameraPosition);
        setToggleLines(true)
        setCameraMovingToHome(true)
    };

    const updateStarPosition = (indexNum) => {
        const tmpCameraPosition = {
            x: starInfo[indexNum].position[0],
            y: starInfo[indexNum].position[1],
            z: starInfo[indexNum].position[2]
        };
        const tmpSelectedPosition = {
            x: starInfo[indexNum].position[0],
            y: starInfo[indexNum].position[1],
            z: starInfo[indexNum].position[2]
        };
        const tmpSelectedSize = {
            innerRadius: starInfo[indexNum].size[0]*3,
            outerRadius: starInfo[indexNum].size[1]*3,
            thetaSegments: starInfo[indexNum].size[2]
        };
        setSelectedSize(tmpSelectedSize)

        setSelectedPosition(tmpSelectedPosition)
        setCameraPosition(tmpCameraPosition);
        setCameraMoving(true)
        setCameraMovingToHome(true)
        setToggleLines(false)
        setFocusDescription({
            name: starInfo[indexNum].name,
            funFact: starInfo[indexNum].funFact,
            notable: starInfo[indexNum].notable,
            ra: starInfo[indexNum].ra,
            dec: starInfo[indexNum].dec,
            distance: starInfo[indexNum].distance,
            realPosition: starInfo[indexNum].realPosition,
            temperature: starInfo[indexNum].temperature,
            brightness: starInfo[indexNum].brightness,
            realSize: starInfo[indexNum].realSize,
            realColor: starInfo[indexNum].realColor,
            vel_is_valid: starInfo[indexNum].vel_is_valid,
            velMag: starInfo[indexNum].velMag

        })
    };

    const goToBookmarkedStar = (indexNum) => {
        const tmpCameraPosition = {
            x: bookmarkList[indexNum].position[0],
            y: bookmarkList[indexNum].position[1],
            z: bookmarkList[indexNum].position[2]
        };
        const tmpSelectedPosition = {
            x: bookmarkList[indexNum].position[0],
            y: bookmarkList[indexNum].position[1],
            z: bookmarkList[indexNum].position[2]
        };
        const tmpSelectedSize = {
            innerRadius: bookmarkList[indexNum].size[0]*3,
            outerRadius: bookmarkList[indexNum].size[1]*3,
            thetaSegments: bookmarkList[indexNum].size[2]
        };
        setSelectedSize(tmpSelectedSize)

        setSelectedPosition(tmpSelectedPosition)
        setCameraPosition(tmpCameraPosition);
        setCameraMoving(true)
        setCameraMovingToHome(true)
        setToggleLines(false)
        setFocusDescription({
            name: bookmarkList[indexNum].name,
            funFact: bookmarkList[indexNum].funFact,
            notable: bookmarkList[indexNum].notable,
            ra: bookmarkList[indexNum].ra,
            dec: bookmarkList[indexNum].dec,
            distance: bookmarkList[indexNum].distance,
            realPosition: bookmarkList[indexNum].realPosition,
            temperature: bookmarkList[indexNum].temperature,
            brightness: bookmarkList[indexNum].brightness,
            realSize: bookmarkList[indexNum].realSize,
            realColor: bookmarkList[indexNum].realColor,
            vel_is_valid: bookmarkList[indexNum].vel_is_valid === "True" ? true : false,
            velMag: bookmarkList[indexNum].velMag

        })
    };

    const handleSetFilterValues = (event) => {
        let tmp = {
            distance: [distanceValues[0], distanceValues[1]],
            velMag: [velMagValues[0],velMagValues[1]],
            velArrows: toggleVel
        }
        setFilterValues(tmp)
    };

    const handleSetVelMagValues = (event, value) => {
        setVelMagValues(value)

    }

    const handleSetDistanceValues = (event, value) => {
        setDistanceValues(value)
    };

    const handleToggleLines = () => {
        setToggleLines(prevState => !prevState);
    };

    const handleToggleVel = () => {
        setToggleVel(prevState => !prevState);
    }

    const handleBookmark = (indexNum) => {
        setBookmarkList(prevState => [...prevState, starInfo[indexNum]])
    };

    return (
        <>
            <div className='mainVisualization'>
                <Canvas
                    camera={{far: 10000000000, position: [0, 0, 7], fov: 50}}
                >
                    <ambientLight/>
                    <pointLight position={[10, 10, 10]}/>
                            <Sphere
                                color={planetInfo[0].color}
                                size={planetInfo[0].size}
                                name={planetInfo[0].name}
                                indexNum={0}
                                position={planetInfo[0].position}
                                cameraPosition={cameraPosition}
                                cameraMoving={cameraMoving}
                                setCameraMoving={setCameraMoving}
                                setActive={setActive}
                                active={active}
                                ra={planetInfo[0].ra}
                                dec={planetInfo[0].dec}
                                velocityDirection={planetInfo[0].velocityDirection}
                                velMag={planetInfo[0].velMag}
                                temperature={planetInfo[0].temperature}
                                distance={planetInfo[0].distance}
                                starInfo={starInfo}
                                focusDescription={focusDescription}
                            />

                    <Selected
                        position={[selectedPosition.x, selectedPosition.y, selectedPosition.z]}
                        size={[selectedSize.innerRadius, selectedSize.outerRadius, 10000]}
                    />

                    {
                        _.times(starInfo.length, (i) => (
                            <>

                                {
                                    starInfo[i].distance >= filterValues.distance[0] && starInfo[i].distance <= filterValues.distance[1] ?
                                        <Star
                                            color={starInfo[i].color}
                                            size={[.1,.1,.1]}
                                            indexNum={i}
                                            position={starInfo[i].position}
                                            updateStarPosition={updateStarPosition}
                                            cameraPosition={cameraPosition}
                                            cameraMoving={cameraMoving}
                                            temperature={starInfo[i].temperature}
                                            setCameraMoving={setCameraMoving}
                                            velocityDirection={starInfo[i].velocityDirection}
                                            vel_is_valid={starInfo[i].vel_is_valid}
                                            velMag={starInfo[i].velMag}
                                            setActive={setActive}
                                            starInfo={starInfo[i]}
                                            active={active}
                                            focusDescription={focusDescription}
                                            filterValues={filterValues}
                                            handleBookmark={handleBookmark}
                                        />
                                        :
                                        null
                                }


                            </>
                        ))
                    }
                    {/*{*/}
                    {/*    toggleLines ?*/}
                    {/*    _.times(starInfo.length, (i)=>(*/}
                    {/*        <>*/}
                    {/*            <Pin*/}
                    {/*                updateStarPosition={updateStarPosition}*/}
                    {/*                setActive={setActive}*/}
                    {/*                active={active}*/}
                    {/*                indexNum={i}*/}
                    {/*                position={[(1-.01)*selectedPosition.x+.01*starInfo[i].position[0],(1-.01)*selectedPosition.y+.01*starInfo[i].position[1],(1-.01)*selectedPosition.z+.01*starInfo[i].position[2]]}*/}
                    {/*                fromPosition={[new THREE.Vector3(starInfo[i].position[0],starInfo[i].position[1],starInfo[i].position[2]),new THREE.Vector3(selectedPosition.x,selectedPosition.y,selectedPosition.z)]}*/}
                    {/*            />*/}
                    {/*        </>*/}
                    {/*    ))*/}
                    {/*        :*/}
                    {/*        null*/}
                    {/*}*/}
                    {
                        cameraMoving ?
                            null
                            :
                            <CameraControls
                                cameraPosition={cameraPosition}
                                cameraMoving={cameraMoving}
                                setCameraMoving={setCameraMoving}
                                cameraMovingToHome={cameraMovingToHome}
                                setCameraMovingToHome={setCameraMovingToHome}
                            />
                    }
                    <Stats
                        className='stats'
                    />
                </Canvas>
                <ToolbarWrapper
                    handleHomeButton={handleHomeButton}
                    focusDescription={focusDescription}
                    updateStarPosition={updateStarPosition}
                    handleToggleLines={handleToggleLines}
                    cameraPosition={cameraPosition}
                    distanceValues={distanceValues}
                    handleSetDistanceValues={handleSetDistanceValues}
                    bookmarkList={bookmarkList}
                    goToBookmarkedStar={goToBookmarkedStar}
                    handleSetFilterValues={handleSetFilterValues}
                    filterValues={filterValues}
                    handleSetVelMagValues={handleSetVelMagValues}
                    velMagValues={velMagValues}
                    toggleVel={toggleVel}
                    handleToggleVel={handleToggleVel}
                    cameraMoving={cameraMoving}
                    setCameraMoving={setCameraMoving}
                    cameraMovingToHome={cameraMovingToHome}
                    setCameraMovingToHome={setCameraMovingToHome}
                />
            </div>
        </>
    )
}


export default Visualization
