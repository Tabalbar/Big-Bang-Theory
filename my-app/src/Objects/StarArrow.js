import React, {useRef} from "react";

function StarArrow(props) {
    const mesh = useRef();


    return (
        <mesh
            {...props}
            ref={mesh}
            scale={[1,1,1]}
            // onClick={()=>props.updateStarPosition(props.indexNum)}
            // onPointerOver={(e) => setHover(true)}
            // onPointerOut={(e) => setHover(false)}
        >
            <arrowHelper args={[props.position, props.velocityDirection, 1, '#4287f5']}/>
            <meshStandardMaterial attach='material' color={props.color}/>
        </mesh>
    )
}

export default StarArrow
