import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

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
        console.log(d20)
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
    }
)

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.camera.left = - 7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right = 7
// directionalLight.shadow.camera.bottom = - 7
// directionalLight.position.set(5, 5, 5)
// scene.add(directionalLight)

/**
 * Particles
 */
// // Texture
// const particleTexture = textureLoader.load('/particles/8.png')
// // Geometry
// const particlesGeometry = new THREE.BufferGeometry()
// const particleCount = 10 ** 4
// const positions = new Float32Array(particleCount * 3)
// const colors = new Float32Array(particleCount * 3)
// for(let i = 0; i < particleCount * 3; i ++)
// {
//     positions[i] = (Math.random() - 0.5) * 25
//     colors[i] = Math.random() 
// }
// particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
// particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3)) 

// // Material
// const particlesMaterial = new THREE.PointsMaterial({
//     size: 0.1,
//     sizeAttenuation: true,
//     transparent: true
// })
// particlesMaterial.map = particleTexture
// particlesMaterial.alphaMap = particleTexture
// particlesMaterial.depthTest = true
// particlesMaterial.depthWrite = true
// particlesMaterial.blending = THREE.AdditiveBlending
// particlesMaterial.vertexColors = true

// // Points
// const particles = new THREE.Points(particlesGeometry, particlesMaterial)
// scene.add(particles)


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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 8
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    
    // Animate Dice
    const rot = elapsedTime * Math.PI * 0.25
    if(d20)
    {
        d20.scene.rotation.y = rot
        d20.scene.rotation.z = rot * 0.5
    }
    if(d4)
    {
        d4.scene.rotation.y = rot 
        d4.scene.rotation.z = rot * 0.5
        d4.scene.position.y = (-Math.sin(rot) * 3) 
        d4.scene.position.x = (Math.cos(rot) * 3)
        d4.scene.position.z = Math.sin(rot * 0.5)
    }
    if(d6)
    {
        d6.scene.rotation.y = rot
        d6.scene.rotation.z = rot * 0.5
        d6.scene.position.y = (-Math.sin(rot + Math.PI / 3) * 3)
        d6.scene.position.x = (Math.cos(rot + Math.PI / 3) * 3)
        d6.scene.position.z = Math.sin(rot * 0.5)
    }
    if(d8)
    {
        d8.scene.rotation.y = rot
        d8.scene.rotation.z = rot * 0.5
        d8.scene.position.y = (-Math.sin(rot + Math.PI * 2 / 3) * 3)
        d8.scene.position.x = (Math.cos(rot + Math.PI * 2/ 3) * 3)
        d8.scene.position.z = Math.sin(rot * 0.5)
    }
    if(d10)
    {
        d10.scene.rotation.y = rot
        d10.scene.rotation.z = rot * 0.5
        d10.scene.position.y = (-Math.sin(rot + Math.PI) * 3)
        d10.scene.position.x = (Math.cos(rot + Math.PI) * 3)
        d10.scene.position.z = Math.sin(rot * 0.5)
    }
    if(d100)
    {
        d100.scene.rotation.y = rot
        d100.scene.rotation.z = rot * 0.5
        d100.scene.position.y = (-Math.sin(rot + Math.PI * 4 / 3) * 3)
        d100.scene.position.x = (Math.cos(rot + Math.PI * 4 / 3) * 3)
        d100.scene.position.z = Math.sin(rot * 0.5)
    }
    if(d12)
    {
        d12.scene.rotation.y = rot
        d12.scene.rotation.z = rot * 0.5
        d12.scene.position.y = (-Math.sin(rot + Math.PI * 5 / 3) * 3)
        d12.scene.position.x = (Math.cos(rot + Math.PI * 5 / 3) * 3)
        d12.scene.position.z = Math.sin(rot * 0.5)
    }

    // directionalLight.position.set(rot, 5, rot)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()