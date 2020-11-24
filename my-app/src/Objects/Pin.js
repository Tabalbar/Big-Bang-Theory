import React, {useRef, useState} from "react";
import * as THREE from 'three'

function Pin(props){

    const ref = useRef();
    const mesh = useRef();
    const [hover, setHover] = useState(false);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(props.fromPosition);

    return(
        <>
            <mesh
                {...props}
                ref={mesh}
                scale={hover? [1,1,1] : [.5,.5,.5]}
                onClick={() => {props.updateStarPosition(props.indexNum); props.setActive(!props.active)}}
                onPointerOver={(e) => setHover(true)}
                onPointerOut={(e) => setHover(false)}
            >
                <boxBufferGeometry/>

                <meshStandardMaterial attach='material' color={'blue'}/>
            </mesh>
            <line ref={mesh} geometry={lineGeometry}>
                <lineBasicMaterial attach="material" color={'white'} linewidth={1} />
            </line>

        </>
    )
}

export default Pin
