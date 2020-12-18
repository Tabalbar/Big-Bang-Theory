import React, {useMemo, useRef} from "react";
import StarArrow from "./StarArrow";
import _ from 'lodash'
import {useFrame} from 'react-three-fiber'


function NewStar(props) {
    const starPositions = [];
    const starColors = [];
    const mesh = useRef();

    for (let i = 0; i < props.starInfo.length; i++) {
        starPositions.push(props.starInfo[i].position[0]);
        starPositions.push(props.starInfo[i].position[1]);
        starPositions.push(props.starInfo[i].position[2]);
        starColors.push(3);
        starColors.push(1);
        starColors.push(0.5);
    }

    // useFrame(() => (
    //     mesh.current.rotation.x = mesh.current.rotation.x += 0.01
    // ))

    const positions = useMemo(() => new Float32Array(starPositions), [starPositions]);
    const colors = useMemo(() => new Float32Array(starColors), [starColors]);
    return (
        <>
            <points ref={mesh}>
                <bufferGeometry attach="geometry">
                    <bufferAttribute attachObject={["attributes", "position"]} count={positions.length / 3}
                                     array={positions} itemSize={3}/>
                    <bufferAttribute ref={mesh} attachObject={["attributes", "color"]} count={colors.length / 3}
                                     array={colors} itemSize={3}/>

                </bufferGeometry>
                <pointsMaterial attach="material" vertexColors size={3} sizeAttenuation={false}/>
            </points>

        </>
    )
}

export default NewStar
