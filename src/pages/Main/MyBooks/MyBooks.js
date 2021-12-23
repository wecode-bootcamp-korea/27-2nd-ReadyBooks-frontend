import * as THREE from 'three';
import React, { useEffect, useState, Suspense } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { softShadows, OrbitControls } from 'drei';
import { API } from '../../../config';
import MyBook from './MyBook/MyBook';

softShadows();

const MyBookCustom = ({ bookId, getImage, idx, bookTitle }) => {
  const [image] = useLoader(THREE.TextureLoader, [getImage]);

  return (
    <MyBook
      position={[5 * idx, 0, 0]}
      color="#ffdddd"
      args={[3.5, 5, 0.5]}
      speed={0.2}
      image={image}
      bookId={bookId}
      bookTitle={bookTitle}
    />
  );
};

const MyBooks = () => {
  const [purchasedBookList, setPurchasedBookList] = useState([]);
  const [isBooksLoading, setIsBooksLoading] = useState(false);
  const [isBookLoaded, setIsBookLoaded] = useState(false);
  let token = sessionStorage.getItem('Authorization') || '';

  // TODO 백엔드 통신 회원이 구매한 책 내용 받기
  const fetchData = async () => {
    const data = await fetch(API.purchase_books, {
      headers: {
        Authorization: token,
      },
    });
    const res = await data.json();
    setPurchasedBookList(res.result);
  };

  useEffect(() => {
    (async () => {
      setIsBooksLoading(true);
      await fetchData();
      setIsBooksLoading(false);
      setIsBookLoaded(true);
    })();
  }, []);

  return (
    !isBooksLoading && (
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-15, 8, 30], fov: 20 }}
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
        <pointLight position={[0, 10, 0]} intensity={1} />
        <group>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -4, 0]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.1} />
          </mesh>
          <Suspense fallback={null}>
            {purchasedBookList &&
              purchasedBookList.map(
                (el, idx) =>
                  isBookLoaded && (
                    <MyBookCustom
                      getImage={el.order_book.thumbnail}
                      key={idx}
                      id={el.order_id}
                      idx={idx}
                      bookId={el.order_book.id}
                      bookTitle={el.order_book}
                    />
                  )
              )}
          </Suspense>
        </group>
        <OrbitControls />
      </Canvas>
    )
  );
};

export default MyBooks;
