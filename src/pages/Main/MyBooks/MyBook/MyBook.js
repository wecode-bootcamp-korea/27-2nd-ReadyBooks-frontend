import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { MeshWobbleMaterial, Text } from 'drei';
import { useSpring, a } from 'react-spring/three';
// import Gotham_Bold from '../../../../fonts/Gotham_Bold.json';

const MyBook = ({ position, color, speed, args, image, bookId, bookTitle }) => {
  const mesh = useRef();

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.0001));

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  // const font = new THREE.FontLoader().parse(Gotham_Bold);

  return (
    <a.mesh
      position={position}
      ref={mesh}
      onClick={e => {
        setExpand(!expand);
        setTimeout(function () {
          window.open(`./detail/${bookId}`, '_blank');
        }, 500);
      }}
      scale={props.scale}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach="material"
        factor={0.6}
        map={image}
      />
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, -3, 0]}
        fontSize={0.8}
        // font={font}
      >
        {/* hello */}
        {/* {bookTitle.title} */}
      </Text>
    </a.mesh>
  );
};

export default MyBook;
