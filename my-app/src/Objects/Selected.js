import React, {useRef} from "react";
import * as THREE from "three";
import {useFrame} from "react-three-fiber";
import {Tube} from "drei";

function Selected(props){


    const mesh = useRef();

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (
        mesh.current.rotation.y = mesh.current.rotation.y += .2
    ));

    return (
        <>
            <mesh
                {...props}
                ref={mesh}
                scale={props.size}
                // onPointerOver={(e) => setHover(true)}
                // onPointerOut={(e) => setHover(false)}
            >
                <ringBufferGeometry/>
                <meshStandardMaterial attach='material' color='#986967'/>
            </mesh>
            {/*<Tube*/}
            {/*    args={[1,1]} // Width, Height and Depth of the box*/}
            {/*    {...props} // All THREE.Mesh props are valid*/}
            {/*>*/}
            {/*    <meshPhongMaterial attach="material" color="#f3f3f3" wireframe />*/}
            {/*</Tube>*/}
            {/*<line ref={mesh} geometry={coneGeometry}>*/}
            {/*    <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={100}/>*/}
            {/*</line>*/}
        </>
    )
}

export default Selected
