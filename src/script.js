import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()
const rgbeLoader = new RGBELoader()

/**
 * Base
 */
const global = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Environment map
 */
// Global intensity
global.envMapIntensity = 2.2
// Low Dynamic Range Equirectangular
textureLoader.load('/environment/map.jpg', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    environmentMap.colorSpace = THREE.SRGBColorSpace
    scene.background = environmentMap
    scene.environment = environmentMap
})

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            child.material.envMapIntensity = global.envMapIntensity
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Models
 */
// D20
let d20;
gltfLoader.load(
    '/dice/d20.glb',
    (gltf) =>
    {
        d20 = gltf
        d20.scene.position.set(0, 0, 0)
        scene.add(d20.scene)
        updateAllMaterials()
    }
)

// D4
let d4;
gltfLoader.load(
    '/dice/d4.glb',
    (gltf) =>
    {
        d4 = gltf
        d4.scene.position.set(-3, 0, 0)
        scene.add(d4.scene)
        updateAllMaterials()
    }
)

// D6
let d6;
gltfLoader.load(
    '/dice/d6.glb',
    (gltf) =>
    {
        d6 = gltf
        d6.scene.position.set(-3, 0, 0)
        scene.add(d6.scene)
        updateAllMaterials()
    }
)

// D8
let d8;
gltfLoader.load(
    '/dice/d8.glb',
    (gltf) =>
    {
        d8 = gltf
        d8.scene.position.set(-3, 0, 0)
        scene.add(d8.scene)
        updateAllMaterials()
    }
)

// D10
let d10;
gltfLoader.load(
    '/dice/d10.glb',
    (gltf) =>
    {
        d10 = gltf
        d10.scene.position.set(-3, 0, 0)
        scene.add(d10.scene)
        updateAllMaterials()
    }
)

// D100
let d100;
gltfLoader.load(
    '/dice/d100.glb',
    (gltf) =>
    {
        d100 = gltf
        d100.scene.position.set(-3, 0, 0)
        scene.add(d100.scene)
        updateAllMaterials()
    }
)

// D12
let d12;
gltfLoader.load(
    '/dice/d12.glb',
    (gltf) =>
    {
        d12 = gltf
        d12.scene.position.set(-3, 0, 0)
        scene.add(d12.scene)
        updateAllMaterials()
    }
)

let message;
gltfLoader.load(
    '/text/message.glb',
    (gltf) =>
    {
        message = gltf
        // message.scene.position.set(-60, 30, -35)
        message.scene.position.set(-20, 60, -50)
        // message.scene.rotation.set(0, 0.69, -.19)
        message.scene.rotation.set(.69,0,0)
        message.scene.scale.set(10, 10, 5)
        message.scene.traverse((o) => {
            if (o.isMesh) {
              o.material.emissive = new THREE.Color( 0x42069f )
            }
          });
        scene.add(message.scene)
        updateAllMaterials()
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = -1.5
camera.position.z = 6.9
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.SRGBColorSpace

// Bloom effect
const renderScene = new RenderPass(scene, camera)
const composer = new EffectComposer(renderer)
composer.addPass(renderScene)
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.15,
    0.15,
    0.15
)
composer.addPass(bloomPass)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    
    // Animate Dice
    const rot = elapsedTime * Math.PI * 0.38
    if(d20)
    {
        d20.scene.rotation.y = rot
        d20.scene.rotation.z = rot * 0.5
        d20.scene.position.z = Math.sin(rot) * 2
    }
    if(d4)
    {
        d4.scene.rotation.y = rot 
        d4.scene.rotation.z = rot * 0.5
        d4.scene.position.y = (-Math.sin(rot) * 3) 
        d4.scene.position.x = (Math.cos(rot) * 3)
        d4.scene.position.z = Math.sin(rot * 0.9) * 2
    }
    if(d6)
    {
        d6.scene.rotation.y = rot
        d6.scene.rotation.z = rot * 0.5
        d6.scene.position.y = (-Math.sin(rot + Math.PI / 3) * 3)
        d6.scene.position.x = (Math.cos(rot + Math.PI / 3) * 3)
        d6.scene.position.z = Math.sin(rot * 1.1) * 2
    }
    if(d8)
    {
        d8.scene.rotation.y = rot
        d8.scene.rotation.z = rot * 0.5
        d8.scene.position.y = (-Math.sin(rot + Math.PI * 2 / 3) * 3)
        d8.scene.position.x = (Math.cos(rot + Math.PI * 2/ 3) * 3)
        d8.scene.position.z = Math.sin(rot * 0.78) * 2
    }
    if(d10)
    {
        d10.scene.rotation.y = rot
        d10.scene.rotation.z = rot * 0.5
        d10.scene.position.y = (-Math.sin(rot + Math.PI) * 3)
        d10.scene.position.x = (Math.cos(rot + Math.PI) * 3)
        d10.scene.position.z = Math.sin(rot * 1.337) * 2
    }
    if(d100)
    {
        d100.scene.rotation.y = rot
        d100.scene.rotation.z = rot * 0.5
        d100.scene.position.y = (-Math.sin(rot + Math.PI * 4 / 3) * 3)
        d100.scene.position.x = (Math.cos(rot + Math.PI * 4 / 3) * 3)
        d100.scene.position.z = Math.sin(rot * 0.42) * 2
    }
    if(d12)
    {
        d12.scene.rotation.y = rot
        d12.scene.rotation.z = rot * 0.5
        d12.scene.position.y = (-Math.sin(rot + Math.PI * 5 / 3) * 3)
        d12.scene.position.x = (Math.cos(rot + Math.PI * 5 / 3) * 3)
        d12.scene.position.z = Math.sin(rot * 0.8675309) * 2
    }

    // directionalLight.position.set(rot, 5, rot)
    // Update controls
    controls.update()

    // Render
    composer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()