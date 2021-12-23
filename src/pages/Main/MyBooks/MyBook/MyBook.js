import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { MeshWobbleMaterial, Text } from 'drei';
import { useSpring, a } from 'react-spring/three';
// import { useNavigate } from 'react-router-dom';

const MyBook = ({ position, color, speed, args, image }) => {
  const mesh = useRef();

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.0001));

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  // const nav = useNavigate();
  return (
    <a.mesh
      position={position}
      ref={mesh}
      onClick={() => {
        setExpand(!expand);
        // console.log(image);
        // nav('/cart');
      }}
      scale={props.scale}
      castShadow
    >
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[2, 0, 0]}
      >
        hello
      </Text>
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach="material"
        factor={0.6}
        map={image}
      />
    </a.mesh>
  );
};

export default MyBook;
