import React, { useState, useEffect, useRef } from 'react';
import leafImage from '../assets/images/leaf1.png';
import { EffectContainer } from './ComponentStyled';

function FallingEffect() {
  const [leaves, setLeaves] = useState([]);

  const animateRef = useRef();

  useEffect(() => {
    // 브라우저 크기에 맞게 나뭇잎을 생성합니다.
    const createLeaves = () => {
      // 나뭇잎 넣을 빈 배열
      const newLeaves = [];
      // 나뭇잎 20개 위치 랜덤 만들기
      for (let i = 0; i < 20; i++) {
        const leaf = {
          id: i,
          image: leafImage,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          z: Math.random() * 200,
          rotation: {
            x: Math.random() * 360,
            y: Math.random() * 360,
            z: Math.random() * 360,
          },
          speed: 1 + Math.random() * 1,
        };
        newLeaves.push(leaf);
      }
      setLeaves(newLeaves);
    };
    createLeaves();

    // 일정한 시간마다 나뭇잎의 위치 업데이트
    const updateLeaves = () => {
      setLeaves((leaves) => {
        const newLeaves = leaves.map((leaf) => {
          let newX = leaf.x - leaf.speed;
          let newY = leaf.y + leaf.speed;
          if (newX < -100 || newY > window.innerHeight + 100) {
            newX = Math.random() * window.innerWidth;
            newY = -100;
            leaf.z = Math.random() * 200;
            leaf.rotation.x = Math.random() * 360;
            leaf.rotation.y = Math.random() * 360;
            leaf.rotation.z = Math.random() * 360;
          }
          return { ...leaf, x: newX, y: newY };
        });
        return newLeaves;
      });
      animateRef.current = requestAnimationFrame(updateLeaves);
    };
    animateRef.current = requestAnimationFrame(updateLeaves);
    return () => cancelAnimationFrame(animateRef.current);
  }, []);

  return (
    <EffectContainer>
      {leaves.map((leaf) => (
        <img
          key={leaf.id}
          src={leaf.image}
          alt="leaf"
          style={{
            width: '15px',
            position: 'absolute',
            left: leaf.x,
            top: leaf.y,
            transform: `translateZ(${leaf.z}px) rotateX(${leaf.rotation.x}deg) rotateY(${leaf.rotation.y}deg) rotateZ(${leaf.rotation.z}deg)`,
            filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2))',
          }}
        />
      ))}
    </EffectContainer>
  );
}

export default FallingEffect;
