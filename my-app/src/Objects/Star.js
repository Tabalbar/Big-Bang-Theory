import React, {useRef, useState, useMemo} from "react";
import * as THREE from "three";
import {ReturnColor} from "../HelperFunctions/ReturnColor";
import {Html} from "drei";
import {Button, Icon} from "semantic-ui-react";
import starInfo from "../newStarData";
import _ from 'lodash'

function Star(props) {
    // This reference will give us direct access to the mesh
    const group = useRef();

    // Set up state for the hovered and active state
    // const [hovered, setHover] = useState(false);
    // const [active, setActive] = useState(false);
    // Rotate mesh every frame, this is outside of React without overhead
    // useFrame(() => (
    //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    // ))

    const [hover, setHover] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [cameraFocused, setCameraFocused] = useState(false);
    // const x = props.velocityDirection[0];
    // const y = props.velocityDirection[1];
    // const z = props.velocityDirection[2];

    // const coords = new Array(100).fill().map(i => {
    //     let tmp = [];
    //     for(let w = 0; w < 100; w++)
    //     {
    //         let tmpArr = [];
    //         tmpArr.push(0);
    //         tmpArr.push(1);
    //         tmpArr.push(0);
    //         tmp.push(tmpArr);
    //     }
    //     console.log(tmp)
    //     return tmp
    // })
    const coords = new Array(starInfo.length).fill().map((i) => {
        return (
            [0,0,0]
        )
    })
// console.log(coords)

    // const [geo, mat, vertices, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(.1, 5, 5);
    //     const coords = new Array(2000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
    //     return [geo, mat,  coords]
    // }, []);
    return (
        <>
            <group ref={group}>
                {coords.map(([p1, p2, p3], i) => (
                    <mesh key={i} geometry={geo} material={new THREE.MeshBasicMaterial({color: new THREE.Color(ReturnColor(starInfo[i].temperature))})} position={[starInfo[i].position[0], starInfo[i].position[1], starInfo[i].position[2]]}/>
                ))}
                {starInfo.map((data)=>(
                    <arrowHelper
                        args={[new THREE.Vector3(data.velocityDirection[0],data.velocityDirection[1],data.velocityDirection[2]), new THREE.Vector3(data.position[0], data.position[1], data.position[2]), (data.normalizedVelMag), 'green', .1, .1]}/>

                ))}
            </group>
            {/*<mesh*/}
            {/*    {...props}*/}
            {/*    ref={mesh}*/}
            {/*    scale={hover ? [.3, .3, .3] : props.size}*/}
            {/*    onClick={() => {*/}
            {/*        props.updateStarPosition(props.indexNum);*/}
            {/*        props.setActive(!props.active);*/}
            {/*        setCameraFocused(true)*/}
            {/*    }}*/}
            {/*    onPointerOver={(e) => setHover(true)}*/}
            {/*    onPointerOut={(e) => setHover(false)}*/}
            {/*>*/}
            {/*    <sphereBufferGeometry/>*/}
            {/*    <meshStandardMaterial attach='material' color={ReturnColor(props.temperature)}/>*/}
            {/*</mesh>*/}
            {/*    {*/}
            {/*        hover ?*/}
            {/*            <Html scaleFactor={3}>*/}
            {/*                <div className='focusedDescription'>*/}
            {/*                    <p>*/}
            {/*                        <strong style={{fontSize: 40}}>{props.focusDescription.name}</strong><br/><br/>*/}
            {/*                        <b>Description:</b> {props.focusDescription.funFact}<br/>*/}
            {/*                        <b>Ra: </b>{props.focusDescription.ra} Deg<br/>*/}
            {/*                        <b>Dec: </b>{props.focusDescription.dec} Deg <br/>*/}
            {/*                        <b>Distance: </b>{props.focusDescription.distance} Light year(s)<br/>*/}
            {/*                        <b>Temperature:</b> {props.focusDescription.temperature} K<br/>*/}
            {/*                        {*/}
            {/*                            props.focusDescription.vel_is_valid === 'True' ?*/}
            {/*                                <>*/}
            {/*                                    <b>Velocity Magnitude: </b>{props.focusDescription.velMag} Km/s<br/>*/}
            {/*                                </>*/}
            {/*                                :*/}
            {/*                                null*/}
            {/*                        }*/}
            {/*                        <b>Color:</b> {props.focusDescription.realColor}*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*                {*/}
            {/*                    cameraFocused ?*/}
            {/*                        null*/}
            {/*                        :*/}
            {/*                        <div className='starDescription'>*/}
            {/*                            <p>*/}
            {/*                                <strong style={{fontSize: 40}}>{props.starInfo.name}</strong><br/><br/>*/}
            {/*                                <b>Description:</b> {props.starInfo.funFact}<br/>*/}
            {/*                                <b>Ra: </b>{props.starInfo.ra} Deg<br/>*/}
            {/*                                <b>Dec: </b>{props.starInfo.dec} Deg <br/>*/}
            {/*                                <b>Distance: </b>{props.starInfo.distance} Light year(s)<br/>*/}
            {/*                                <b>Temperature:</b> {props.starInfo.temperature} K<br/>*/}
            {/*                                {*/}
            {/*                                    props.starInfo.vel_is_valid === 'True' ?*/}
            {/*                                        <>*/}
            {/*                                            <b>Velocity Magnitude: </b>{props.starInfo.velMag} Km/s<br/>*/}
            {/*                                        </>*/}
            {/*                                        :*/}
            {/*                                        null*/}
            {/*                                }*/}
            {/*                                <b>Color:</b> {props.starInfo.realColor}*/}
            {/*                            </p>*/}
            {/*                        </div>*/}
            {/*                }*/}


            {/*            </Html>*/}
            {/*            :*/}
            {/*            null*/}
            {/*    }*/}
            {/*    <Html scaleFactor={2}>*/}
            {/*        <div>*/}
            {/*            <Button color='blue' onClick={() => {*/}
            {/*                props.handleBookmark(props.indexNum);*/}
            {/*                setIsSelected(true)*/}
            {/*            }} icon>*/}
            {/*                {*/}
            {/*                    isSelected ?*/}
            {/*                        <Icon color='yellow' name='star'/>*/}
            {/*                        :*/}
            {/*                        <Icon color='yellow' name='star outline'/>*/}
            {/*                }*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    </Html>*/}


            {/*{*/}
            {/*    props.vel_is_valid === "True" ?*/}
            {/*        <mesh*/}
            {/*            {...props}*/}
            {/*            ref={mesh}*/}
            {/*            scale={[.1, .1, .1]}*/}
            {/*        >*/}
            {/*            <arrowHelper*/}
            {/*                args={[new THREE.Vector3(x, y, z), new THREE.Vector3(0, 0, 0), (props.starInfo.normalizedVelMag*10), 'green', 1, 1]}/>*/}
            {/*            <meshStandardMaterial attach='material' color={props.color}/>*/}
            {/*        </mesh>*/}
            {/*        :*/}
            {/*        null*/}
            {/*}*/}

            {/*<StarArrow*/}
            {/*    position={new THREE.Vector3(props.position[0],props.position[1],props.position[2])}*/}
            {/*    velocityDirection={new THREE.Vector3(0,0,0)}*/}
            {/*/>*/}
        </>
    )
}

export default Star
