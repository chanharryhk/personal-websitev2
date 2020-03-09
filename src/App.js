import React, {useState, useRef, useEffect} from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, extend, useThree} from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'
import './App.css';

extend({ OrbitControls })

const CyberTruck = () => {
  const [model, setModel] = useState()
  useEffect(() => {
    new GLTFLoader().load("/scene.gltf", setModel)
  })
  return model ? <primitive object={model.scene} /> : null
}

const Subtitle = () => {
  const [count, setCount] = useState(0);
  return (
      <h1 className="Subtitle">HELLO</h1>
  );
}


const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } =  useThree()

  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls 
      autoRotate 
      autoRotate
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.5}
      rotateSpeed={1}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}

const Box = () => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
  })

  useFrame(() => {
    meshRef.current.rotation.y += 0.01
    meshRef.current.rotation.x += 0.01
  })

  return (
    <a.mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
    > 
      <ambientLight />
      <spotLight position={[0, 5, 10]} penumbra={1}/>
      <boxBufferGeometry attach="geometry" args={[1,1,1]} />
      <meshPhysicalMaterial 
        attach="material" 
        color={hovered ? "blue" : "gray"}
      />
    </a.mesh>
  )
}

function App() {
  
  return (
    <>
      <div className="App">
        <h1>Harry Chan</h1>
        <Canvas camera={{position: [0,0,2.75]}} shadowMap>
            <ambientLight intensity={1.5} />
            <pointLight intensity={2} position={[-10, -25, -10]} />
            <spotLight
              castShadow
              intensity={1.25}
              angle={Math.PI / 3}
              position={[25, 25, 15]}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <Controls /> 
            {/* <Box /> */}
            <CyberTruck />
        </Canvas>
        <Subtitle/>
        {/* <h1 className="Subtitle">SOFTWARE ENGINEER</h1> */}
        <div className="top-left">
          <a href="https://github.com/drcmda/learnwithjason" children="Github" />
          <a href="https://github.com/drcmda/learnwithjason" children="FUCk" />
        </div>
        <a href="https://twitter.com/0xca0a" className="top-right" children="Resume" />
        <a href="https://github.com/drcmda/react-three-fiber" className="bottom-right" children="Software Engineer" />
      </div>
    </>
  );
}

export default App;
