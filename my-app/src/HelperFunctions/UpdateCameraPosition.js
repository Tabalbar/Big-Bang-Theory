import React from "react";
import {Vector3} from "three";

/**
 * @return {boolean}
 */

export default function UpdateCameraPosition(camera, newPosition, {setCameraMoving}) {
    if(camera.position.x < newPosition.x){
        camera.position.x += 10
    }
    if(camera.position.x > newPosition.x){
        camera.position.x -= 10;

    }

    if(camera.position.y < newPosition.y+1){
        camera.position.y += 10
    }
    if(camera.position.y > newPosition.y){
        camera.position.y -= 10;

    }

    if(camera.position.z < (newPosition.z)){
        camera.position.z += 10
    }
    if(camera.position.z > newPosition.z){
        camera.position.z -= 10;
    }
    if(Math.round(camera.position.x) === newPosition.x && Math.round(camera.position.y) === newPosition.y && Math.round(camera.position.z) === (newPosition.z)){
        camera.lookAt(new Vector3(newPosition.x,newPosition.y,newPosition.z));

        return true
    }
    return true
    // if(camera.position.y > newPosition.y){
    //     camera.position.y += 1
    // } else if(camera.position.y > newPosition.y){
    //     camera.position.y = 1
    //     if(camera.position.y === newPosition.y){
    //         return
    //     }
    // }
    // if(camera.position.z < newPosition.z){
    //     camera.position.z+= 1
    // } else if(camera.position.z > newPosition.z){
    //     camera.position.z -= 1
    //     if(camera.position.z === newPosition.z){
    //         return
    //     }
    // }



}
