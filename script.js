export function initGame(THREE, OrbitControls) {

// script.js
// 간단한 3D 자유 비행 비행기 시뮬레이션


// 기본 설정
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x87CEFA, 0.0006); // 하늘색 안개로 먼 거리 페이드


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


// 카메라 (3인칭)
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 5, 12);


// 조명
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
hemi.position.set(0, 200, 0);
scene.add(hemi);


const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(-10, 20, 10);
scene.add(dir);


// 땅
const groundGeo = new THREE.PlaneGeometry(20000, 20000);
const groundMat = new THREE.MeshLambertMaterial({ color: 0x3cb043 }); // 초록
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2;
scene.add(ground);


// 간단한 구름 생성 함수
function makeCloud(x, y, z, scale = 1) {
const g = new THREE.Group();
const sphereGeo = new THREE.SphereGeometry(1 * scale, 8, 6);
const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
const a = new THREE.Mesh(sphereGeo, mat);
const b = new THREE.Mesh(sphereGeo, mat);
const c = new THREE.Mesh(sphereGeo, mat);
a.position.set(0, 0, 0);
b.position.set(1.1 * scale, 0.2 * scale, -0.2 * scale);
c.position.set(-1.0 * scale, 0.1 * scale, 0.1 * scale);
a.scale.set(1.0, 0.7, 0.9);
b.scale.set(0.9, 0.6, 0.8);
c.scale.set(0.8, 0.5, 0.7);
g.add(a, b, c);
g.position.set(x, y, z);
g.rotation.y = Math.random() * Math.PI * 2;
scene.add(g);
return g;
}


// 몇 개의 구름 흩뿌리기
const clouds = [];
for (let i = 0; i < 30; i++) {
const x = (Math.random() - 0.5) * 1000;
const y = 20 + Math.random() * 50;
const z = (Math.random() - 0.5) * 1000 - 200;
clouds.push(makeCloud(x, y, z, 2 + Math.random() * 3));
}


// 플레이어 비행기 (저폴리 만화풍)
function makePlane() {
const plane = new THREE.Group();


// 동체
animate();
}