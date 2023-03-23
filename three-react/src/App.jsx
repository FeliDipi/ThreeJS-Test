import { useState,useEffect } from 'react'
import './App.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

function App() {
  useEffect(()=>
  {
    //scene
    const scene = new THREE.Scene();

    //sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    //camera
    const camera = new THREE.PerspectiveCamera(50,sizes.width/sizes.height,1,1000);
    camera.position.z = 96;

    //renderer
    const canvas = document.querySelector("#webGl");
    const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
    renderer.setSize(sizes.width,sizes.height);
    document.body.appendChild(renderer.domElement);

    //lights
    const ambienLight = new THREE.AmbientLight(0xffffff,0.5);
    ambienLight.castShadow = true;
    scene.add(ambienLight);

    const spotLight = new THREE.SpotLight(0xffffff,1);
    spotLight.castShadow = true;
    spotLight.position.set(0,64,32);
    scene.add(spotLight);

    //cube
    const geometry = new THREE.BoxGeometry(16,16,16);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry,material);

    box.rotation.x = 60;
    box.rotation.y = 40;

    scene.add(box);

    //controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;

    //fps stats
    const stats = Stats();
    document.body.appendChild(stats.dom);

    //animations
    const animate = ()=>
    {
      // box.rotation.x += 0.01;
      // box.rotation.y += 0.01;

      renderer.render(scene,camera);
      window.requestAnimationFrame(animate);
    }
    animate();
  },[]);

  return (
    <div>
      <canvas id="webGl"/>
    </div>
  )
}

export default App
