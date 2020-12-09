import React, {useRef} from "react";
import {extend, useFrame, useThree} from "react-three-fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three'
import UpdateCameraPosition from "./UpdateCameraPosition";
extend({OrbitControls});


const MinimapCamera = (props) => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
        camera,
        gl: {domElement},
    } = useThree();

    const mesh=useRef()
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame((state) => {
        // if(props.cameraMovingToHome){
        //     camera.position.set(0,0,2)
        //     props.setCameraMovingToHome(false)
        // }
        // if(props.cameraMovingToHome){
        //     camera.position.set(props.cameraPosition.x,props.cameraPosition.y,props.cameraPosition.z+2)
        //     props.setCameraMovingToHome(false);
        // }
        controls.current.update();
        camera.updateProjectionMatrix()
        // console.log(props.cameraPosition)
        camera.position.copy(props.miniMapCameraPosition)
        camera.lookAt(props.selectedPosition.x,props.selectedPosition.y,props.selectedPosition.z)
    });
    return <orbitControls
        target={[props.selectedPosition.x,props.selectedPosition.y,props.selectedPosition.z]}
        ref={controls}
        args={[camera, domElement]}
    />;
};
export default MinimapCamera
