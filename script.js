import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import {OrbitControls} from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";

let camera;
let scene;
let renderer;
let material;
let mouseX=0;
let mouseY=0;
let windowHalfX=window.innerWidth/2;
let windowHalfY=window.innerHeight/2;

init();
animate();

function init(){
    camera=new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 5, 2000);
    camera.position.z=500;

    scene=new THREE.Scene();
    scene.fog=new THREE.FogExp2(0x0000ff, 0,001);

    let geometry=new THREE.BufferGeometry();
    let vertices=[];
    let size=2000;

    for(let i=0; i<20000; i++){
        let x=(Math.random()*size+Math.random()*size)/2-size/2-size/2;
        let y=(Math.random()*size+Math.random()*size)/2-size/2-size/2;
        let z=(Math.random()*size+Math.random()*size)/2-size/2-size/2;

        vertices.push(x,y,z);
    }

    geometry.setAttribute('positions', new THREE.Float32BufferAttribute(vertices,3));

    material=new THREE.PointsMaterial({
        size:2,
        color:0xffffff,
    });

    let particles=new THREE.Points(geometry, material);
    scene.add(particles);

    renderer=new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    document.body.style.touchAction='none';
    document.body.addEventListener('pointermove', onpointermove);
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize(){
    windowHalfX=window.innerWidth/2;
    windowHalfY=window.innerHeight/2;

    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event){
    mouseX=event.clientX-windowHalfX;
    mouseY=event.clientY-windowHalfY;
}

function animate(){
    requestAnimationFrame(animate);
    render();
}

function render(){
    camera.position.x+=(mouseX*2-camera.position.x)*0.02;
    camera.position.y+=(mouseY*2-camera.position.y)*0.02;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    scene.rotation.x+=0.001;
    scene.rotation.y+=0.002;
}
