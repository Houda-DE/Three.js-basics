import * as THREE from 'three'
import { CubeTexture, GridHelper } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import galaxy from '../img/galaxy.jpg'
import gal from '../img/gal.jpg'


const renderer = new THREE.WebGL1Renderer();

renderer.shadowMap.enabled = true

renderer.setSize(window.innerWidth , window.innerHeight)

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight , 0.1 ,1000);

const orbit = new OrbitControls(camera , renderer.domElement)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

camera.position.set(-10,30,30);

orbit.update()

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color : 0x00ff00});
const box = new THREE.Mesh(boxGeometry , boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30 , 30)
const planeMaterial = new THREE.MeshStandardMaterial({color : 0xffffff , side : THREE.DoubleSide})
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane)
plane.rotation.x = 0.5*Math.PI
plane.receiveShadow = true

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4 , 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry , sphereMaterial);
scene.add(sphere);
sphere.position.set(-2 , 5 , 6)
sphere.castShadow = true

//const ambientLight = new THREE.AmbientLight(0x3333333);
//scene.add(ambientLight)

//const directionalLight = new THREE.DirectionalLight(0xffffff , 1)
//scene.add(directionalLight)
//directionalLight.position.set(-30 , 50 , 0)
//directionalLight.castShadow = true
//directionalLight.shadow.camera.top = 10
//directionalLight.shadow.camera.right = 12

//const dLightHelper = new THREE.DirectionalLightHelper(directionalLight , 5);

//scene.add(dLightHelper)

const spotLight = new THREE.SpotLight(0xffffff)
scene.add(spotLight)
spotLight.position.set(100 , 100 ,0)
spotLight.castShadow = true
spotLight.angle = 0.2

const gui = new dat.GUI();

//renderer.setClearColor(0xffffff)

const textureLoader = new THREE.TextureLoader()
scene.background = textureLoader.load(galaxy)



//const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
//scene.add(dLightShadowHelper)

const options = {
    sphereColor : '#123456',
    wireframe : false,
    speed :0.01,
    angle : 0.2,
    penumbra : 0,
    intensity : 1
};

gui.addColor(options , 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
})

gui.add(options , 'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
})

gui.add(options , 'speed' , 0 , 0.1);
gui.add(options , 'angle' , 0 , 1);
gui.add(options , 'penumbra' , 0 , 1);
gui.add(options , 'intensity' , 0 , 1);

scene.fog = new THREE.FogExp2(0xffffff , 0.01)

let step = 0
let speed = 0.01

function animate() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    step += options.speed;
    sphere.position.y = 10*Math.abs(Math.sin(step))
    spotLight.angle = options.angle
    spotLight.penumbra = options.penumbra
    spotLight.intensity = options.intensity
    renderer.render(scene , camera)
}

renderer.setAnimationLoop(animate);