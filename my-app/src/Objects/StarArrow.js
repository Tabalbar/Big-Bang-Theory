import React, {useRef} from "react";

function StarArrow(props) {
    const mesh = useRef();


    return (
        <mesh
            {...props}
            ref={mesh}
            scale={[30,30,30]}
            // onClick={()=>props.updateStarPosition(props.indexNum)}
            // onPointerOver={(e) => setHover(true)}
            // onPointerOut={(e) => setHover(false)}
        >
            <arrowHelper args={[props.position, props.velocityDirection, 300, '#4287f5']}/>
            <meshStandardMaterial attach='material' color={props.color}/>
        </mesh>
    )
}

export default StarArrow
