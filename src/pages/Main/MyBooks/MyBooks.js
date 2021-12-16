import React from 'react';
// import React, { useEffect, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows, OrbitControls } from 'drei';
import MyBook from './MyBook/MyBook';

softShadows();

const MyBooks = () => {
  // const [purchasedBooks, setPurchasedBooks] = useState([]);
  // const [isBooksLoading, setIsBooksLoading] = useState(false);

  //  목데이터로 데이터 모두 받아오기
  // const fetchData = async () => {
  //   const data = await fetch('/data/bookData.json');
  //   const res = await data.json();
  //   setPurchasedBooks(res);
  // };

  // useEffect(() => {
  //   (async () => {
  //     setIsBooksLoading(true);
  //     await fetchData();
  //     setIsBooksLoading(false);
  //   })();
  // }, []);

  return (
    <Canvas
      colorManagement
      shadowMap
      camera={{ position: [-5, 2, 30], fov: 20 }}
    >
      <ambientLight intensity={1.5} />

      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[0, 10, 0]} intensity={1.5} />
      <group>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -4, 0]}
          receiveShadow
        >
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <shadowMaterial attach="material" opacity={0.1} />
        </mesh>
        {/* {purchasedBooks.map(el => ( */}
        <MyBook
          position={[0, 0, 0]}
          color="#5a81ff"
          args={[3, 5, 0.5]}
          speed={0.2}
          // key={el.id}
        />
        {/* ))} */}
      </group>
      <OrbitControls />
    </Canvas>
  );
};

export default MyBooks;
