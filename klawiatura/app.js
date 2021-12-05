import './style.css'
import * as THREE from 'three'

//init
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 1 ,1000)
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera)

camera.position.set(-20,15,35)
camera.rotation.y = 12

//geometry || table
const TableTexture = new THREE.TextureLoader().load('istockphoto-1145602814-170667a.jpg')
const TableGeometry = new THREE.BoxGeometry(240,0,180)
const TableMaterial = new THREE.MeshBasicMaterial({
  map:TableTexture,
})

const Table = new THREE.Mesh(TableGeometry, TableMaterial)

scene.add(Table)

// geometry || board
const geometry = new THREE.BoxGeometry(50,2,40)
const material = new THREE.MeshBasicMaterial({
  color:0x51260b,
})
const basic = new THREE.Mesh(geometry, material)
basic.position.setY(1)
basic.position.setZ(-6)
scene.add(basic)

// geometry || wall
const WallGeometry = new THREE.BoxGeometry(50,2,30)
const WallMaterial = new THREE.MeshBasicMaterial({
  color:0x51260b,
})
const Wall = new THREE.Mesh(WallGeometry, WallMaterial)
Wall.position.setY(12)
Wall.position.setZ(-22)

Wall.rotation.x = 300
scene.add(Wall)

//geometry || screen

const screenTexture = new THREE.TextureLoader().load('tengyart-kSvpTrfhaiU-unsplash.jpg')
const screenGeometry = new THREE.BoxGeometry(45,1,25)
const screenMaterial = new THREE.MeshBasicMaterial({
  map: screenTexture,
})

const screen = new THREE.Mesh( screenGeometry, screenMaterial)

screen.position.setY(12)
screen.position.setZ(-21)
screen.rotation.x = 300
scene.add(screen)

//geometry claws 

const geometry2 = new THREE.BoxGeometry(5,1,5)
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x8A9999,
})

var mx = -20

for(var i = 0; i < 5; i++){
var box = new THREE.Mesh(geometry2, boxMaterial)
box.position.setY(2)
box.position.setX(mx)
box.position.setZ(8)
scene.add(box)
mx += 10
}

for(var i = 0; i < 5; i++){
  var box = new THREE.Mesh(geometry2, boxMaterial)
  box.position.setY(2)
  box.position.setX(mx-10)
  box.position.setZ(-8)
  scene.add(box)
  mx -= 10
  }

  for(var i = 0; i < 5; i++){
    var box = new THREE.Mesh(geometry2, boxMaterial)
    box.position.setY(2)
    box.position.setX(mx)
    box.position.setZ(0)
    scene.add(box)
    mx += 10
    }
//contols
//const controls = new OrbitControls(camera, renderer.domElement)

//lights
const light = new THREE.Light( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

//Texture 
const canvasTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = canvasTexture

// Resizer
window.addEventListener('resize', function() {
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
});

function animation(){
  requestAnimationFrame(animation);
  renderer.render(scene,camera)
}

function stars(){
  const geometry = new THREE.SphereGeometry(0.5, 24, 24)
  const material = new THREE.MeshStandardMaterial({
    color : 0xFFFFFF,
  })
  const star = new THREE.Mesh( geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 400));

  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(stars)
animation()