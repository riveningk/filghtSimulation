import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js';

// === 기본 설정 ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // bright sky blue

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === 조명 ===
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// === 바닥 (초록 평면) ===
const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x228b22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// === 구름 ===
const cloudMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
for (let i = 0; i < 10; i++) {
  const cloudGeo = new THREE.SphereGeometry(5 + Math.random() * 5, 8, 8);
  const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
  cloud.position.set(
    Math.random() * 400 - 200,
    20 + Math.random() * 40,
    Math.random() * 400 - 200
  );
  scene.add(cloud);
}

// === 비행기 (간단한 로우폴리 스타일) ===
const airplane = new THREE.Group();

// 몸체
const bodyGeometry = new THREE.BoxGeometry(2, 1, 6);
const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
airplane.add(body);

// 날개
const wingGeometry = new THREE.BoxGeometry(8, 0.2, 2);
const wingMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const wing = new THREE.Mesh(wingGeometry, wingMaterial);
wing.position.y = 0;
wing.position.z = 0;
airplane.add(wing);

scene.add(airplane);

// === 카메라 ===
camera.position.set(0, 3, 10);

// === 키보드 제어 ===
const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
window.addEventListener('keydown', (e) => (keys[e.code] = true));
window.addEventListener('keyup', (e) => (keys[e.code] = false));

// === 애니메이션 ===
let velocity = 0.2;
function animate() {
  requestAnimationFrame(animate);

  // 조작
  if (keys.ArrowUp) airplane.rotation.x -= 0.02;
  if (keys.ArrowDown) airplane.rotation.x += 0.02;
  if (keys.ArrowLeft) airplane.rotation.z += 0.02;
  if (keys.ArrowRight) airplane.rotation.z -= 0.02;

  // 전진 이동
  const forward = new THREE.Vector3(0, 0, -1);
  forward.applyQuaternion(airplane.quaternion);
  airplane.position.addScaledVector(forward, velocity);

  // 카메라 따라가기
  const camOffset = new THREE.Vector3(0, 3, 10).applyQuaternion(airplane.quaternion);
  camera.position.copy(airplane.position).add(camOffset);
  camera.lookAt(airplane.position);

  renderer.render(scene, camera);
}

animate();

// === 리사이즈 대응 ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
