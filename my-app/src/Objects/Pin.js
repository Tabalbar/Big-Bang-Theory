import React, {useRef} from "react";
import * as THREE from 'three'

function Pin(props){

    const ref = useRef();
    const mesh = useRef();

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(props.fromPosition);

    return(
        <>
            <mesh
                {...props}
                ref={mesh}
                scale={[1000,1000,1000]}
                onClick={() => {props.updateStarPosition(props.indexNum); props.setActive(!props.active)}}
                // onPointerOver={(e) => setHover(true)}
                // onPointerOut={(e) => setHover(false)}
            >
                <sphereBufferGeometry/>

                {/*<line ref={mesh} geometry={lineGeometry}>*/}
                {/*    <lineBasicMaterial attach="material" color={'white'} linewidth={600} />*/}
                {/*</line>*/}
                <meshStandardMaterial attach='material' color={props.color}/>
            </mesh>
            <line ref={mesh} geometry={lineGeometry}>
                <lineBasicMaterial attach="material" color={'white'} linewidth={300} />
            </line>

        </>
    )
}

export default Pin
