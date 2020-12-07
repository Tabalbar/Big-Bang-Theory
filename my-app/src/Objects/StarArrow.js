import React, {useMemo, useRef} from "react";
import * as THREE from "three";
import starInfo from "../newStarData";
import {Canvas} from "react-three-fiber";
import _ from 'lodash'

function StarArrow(props) {
    const mesh = useRef();
    const material = new THREE.LineDashedMaterial({
        color: 0xffffff,
        linewidth: 1,
        scale: 1,
        dashSize: 3,
        gapSize: 1,
    });
    const lineGeometry = useMemo(() => {
        // return new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(props.velocityDirection[0]/80,props.velocityDirection[1]/80,props.velocityDirection[2]/80),new THREE.Vector3(0,0,0)])
        return new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(props.velocityDirection[0], props.velocityDirection[1], props.velocityDirection[2]), new THREE.Vector3(props.position[0], props.position[1], props.position[2])])

    }, [])
    // const lineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(props.velocityDirection[0]/80,props.velocityDirection[1]/80,props.velocityDirection[2]/80),new THREE.Vector3(0,0,0)]);
    const points = [(1 - .9999) * props.velocityDirection[0] + .9999 * props.position[0], (1 - .9999) * props.velocityDirection[1] + .9999 * props.position[1], (1 - .9999) * props.velocityDirection[2] + .9999 * props.position[2]];

    // console.log(Math.round(props.normalizedVelMag*5))
    const numOfArrows = Math.round(props.normalizedVelMag*5)

    return (
        <>
            <mesh
                {...props}
                ref={mesh}
                scale={[.1,.1,.1]}
                // onClick={()=>props.updateStarPosition(props.indexNum)}
                // onPointerOver={(e) => setHover(true)}
                // onPointerOut={(e) => setHover(false)}
            >
            {/*<line ref={mesh} geometry={lineGeometry}>*/}
            {/*    <lineBasicMaterial attach="material" color={'green'} linewidth={5}/>*/}
            {/*</line>*/}
                {
                    _.times((numOfArrows), i => (
                        <arrowHelper
                            args={[new THREE.Vector3(props.velocityDirection[0],props.velocityDirection[1],props.velocityDirection[2]), new THREE.Vector3(0, Math.sign(props.velocityDirection[1])*2, 0), (props.normalizedVelMag*i*FixSpacing(numOfArrows)), GetColor(Math.sign(props.velocityDirection[1])), 1, 1]}/>
                    ))
                }

            {/*<meshStandardMaterial attach='material' color={props.color}/>*/}
            </mesh>

            {/*// /!*<mesh*!/*/}
            {/*// /!*    scale={[.1, .1, .1]}*!/*/}
            {/*// /!*    position={points}*!/*/}
            {/*// /!*>*!/*/}
            {/*// /!*    <boxBufferGeometry/>*!/*/}
            {/*// /!*    /!*<arrowHelper*!/*!/*/}
            {/*// /!*    /!*    args={[new THREE.Vector3(props.velocityDirection[0],props.velocityDirection[1],props.velocityDirection[2]), new THREE.Vector3(0,0,0), (props.normalizedVelMag*10), 'green', 1, 1]}*!/*!/*/}
            {/*// /!*    /!*//*!/*/}
            {/*// /!*    <lineDashedMaterial attach="material" color={'green'} linewidth={40}/>*!/*/}
            {/*//*/}
            {/*// /!*</mesh>*!/*/}

        </>
    )
}

/**
 * @return {string}
 */
function GetColor(bool){
    if(bool === 1)
    {
        return "green"
    }
    else
    {
        return"purple"
    }
}

function FixSpacing(numArrows)
{
    if(numArrows >= 4)
    {return 1}
    else
    { return 2}
}

export default StarArrow
