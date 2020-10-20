import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

function Sphere(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    // Set up state for the hovered and active state
    // const [hovered, setHover] = useState(false);
    // const [active, setActive] = useState(false);

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={props.size}
            // onClick={(e) => setActive(!active)}
            // onPointerOver={(e) => setHover(true)}
            // onPointerOut={(e) => setHover(false)}
        >
            <sphereBufferGeometry/>
            <meshStandardMaterial attach='material' color={props.color} />
        </mesh>
    )
}

export default Sphere
