import * as THREE from 'three'

// import * as dat from 'lil-gui'
// const gui = new dat.GUI()
export default class threeCanvas {

  constructor() {

    if (document.querySelector('canvas.webgl') == undefined) {
      console.log("THREE.JS PASS");
    } else {
      runThreeJS()
    }
  }

}
function runThreeJS() {
  const canvas = document.querySelector('canvas.webgl')
  console.log("dDSM");
  // Scene
  const scene = new THREE.Scene()

  //shapeからジオメトリに変換
  const t1 = new THREE.PlaneGeometry(8, 8);
  const t2 = triangle1(10, 10);
  const t3 = triangle1(15, 15);
  const t4 = triangle1(15, 30);

  const texturepath = canvas.getAttribute('tpath')
  console.log("pppp",texturepath);
  const m1Texture = new THREE.TextureLoader().load(texturepath);
  const m1 = new THREE.MeshBasicMaterial({
    transparent: true,
    color: 0xFFFFFF,
    side: THREE.DoubleSide,
    map: m1Texture,
    alphaTest: 0.2
  });
  const m2 = new THREE.MeshBasicMaterial({
    color: 0xFF4EA0,
    opacity: 0.5,
    transparent: true
  }) //red
  const m3 = new THREE.MeshBasicMaterial({
    color: 0xFFB11F,
    opacity: 0.5,
    transparent: true
  }) //yellow
  const m4 = new THREE.MeshBasicMaterial({
    color: 0x28DCFC,
    opacity: 0.5,
    transparent: true
  }) //blue

  // 頂点情報を格納する配列
  const v1 = getVertices(200, 80, 0.05) //広さ500 数200のオブジェクトの位置情報
  const v2 = getVertices(400, 120, 0.25)
  const v3 = getVertices(600, 160, 0.2)
  const v4 = getVertices(1000, 160, 0.25)

  const g1 = new THREE.Group
  for (const i in v1) {
    const mesh = new THREE.Mesh(t1, m1)
    g1.add(mesh)
    mesh.position.set(v1[i][0], v1[i][1], v1[i][2])
    mesh.rotation.set(v1[i][0], v1[i][1], v1[i][2])
  }
  scene.add(g1)

  const g2 = new THREE.Group
  for (const i in v2) {
    const mesh = new THREE.Mesh(t2, m2)
    g2.add(mesh)
    mesh.position.set(v2[i][0], v2[i][1], v2[i][2])
    mesh.rotation.set(v2[i][0], v2[i][1], v2[i][2])
  }
  scene.add(g2)

  const g3 = new THREE.Group
  for (const i in v3) {
    const mesh = new THREE.Mesh(t3, m3)
    g3.add(mesh)
    mesh.position.set(v3[i][0], v3[i][1], v3[i][2])
    mesh.rotation.set(v3[i][0], v3[i][1], v3[i][2])
  }
  scene.add(g3)

  const g4 = new THREE.Group
  for (const i in v4) {
    const mesh = new THREE.Mesh(t4, m4)
    g4.add(mesh)
    mesh.position.set(v4[i][0], v4[i][1], v4[i][2])
    mesh.rotation.set(v4[i][0], v4[i][1], v4[i][2])
  }
  scene.add(g4)

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  /**
   * Camera
   */
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
  camera.position.z = 0
  scene.add(camera)

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  })
  renderer.setSize(sizes.width, sizes.height)
  //setPixelRatio（デバイスの解像度）
  renderer.setPixelRatio(window.devicePixelRatio);

  /**
   * Resize
   */
  // 初期化のために実行
  onResize();
  // リサイズイベント発生時に実行
  window.addEventListener('resize', onResize);

  function onResize() {
    // サイズを取得
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sizes.width, sizes.height);

    // カメラのアスペクト比を正す
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  }



  const speed = {
    now: 0,
    delta: 0.0008,
    cons: 0.0005
  }


  let pageY = window.pageYOffset
  g1.position.y = pageY * 0.4;
  g2.position.y = pageY * 0.3;
  g3.position.y = pageY * 0.2;
  g4.position.y = pageY * 0.1;
  window.addEventListener('scroll', () => {
    pageY = window.pageYOffset
    g1.position.y = pageY * 0.4;
    g2.position.y = pageY * 0.3;
    g3.position.y = pageY * 0.2;
    g4.position.y = pageY * 0.1;
    speed.now += speed.delta
    scrollHide(sizes.height / 2, 500)

  });


  const tick = () => {
    window.requestAnimationFrame(tick)
    renderer.render(scene, camera)
    g1.rotation.y += speed.cons * 1 + speed.now
    g2.rotation.y += speed.cons * 2 + speed.now
    g3.rotation.y += speed.cons * 3 + speed.now
    g4.rotation.y += speed.cons * 4 + speed.now
    speed.now = (speed.now > speed.cons ? speed.now / 1.05 : 0)

  }
  tick()

  function getRandomInt(max) {
    return Math.floor(Math.random() * max) - max / 2;
  }


  function getVertices(size, length, del) {
    const v = []
    let xm, ym, zm
    for (let i = 0; i < length; i++) {
      xm = Math.random() - 0.5
      ym = Math.random() - 0.5
      zm = Math.random() - 0.5
      if (Math.abs(xm) < del && Math.abs(zm) < del) {
        continue;
      }
      const x = size * xm;
      const y = size * ym;
      const z = size * zm;
      v.push([x, y, z]);
    }
    return v
  }

  function triangle1(width, height) {
    const shape = new THREE.Shape();
    shape.moveTo(width / 2, 0);
    shape.lineTo(0, height);
    shape.lineTo(width, height);

    const extrudeSettings = {
      steps: 1,
      depth: 0,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }







  function scrollHide(y, d) {
    if (pageY < y) {
      m1.opacity = 0.5
      m2.opacity = 0.5
      m3.opacity = 0.5
      m4.opacity = 0.5
    } else if (y + d < pageY) {
      m1.opacity = 0
      m2.opacity = 0
      m3.opacity = 0
      m4.opacity = 0
    } else {
      m1.opacity = -0.5 / d * pageY + (y + d) / 2 / d
      m2.opacity = -0.5 / d * pageY + (y + d) / 2 / d
      m3.opacity = -0.5 / d * pageY + (y + d) / 2 / d
      m4.opacity = -0.5 / d * pageY + (y + d) / 2 / d
    }

  }

  // gui.add(camera.position, 'z', 0, 2000, 1)
  // gui.add(camera.rotation, 'y', 0, 3, 0.01)
  // gui.add(speed, 'delta', 0, 0.002, 0.00001)
  // gui.add(speed, 'cons', 0, 0.002, 0.000001)

}
