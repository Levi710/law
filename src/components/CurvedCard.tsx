import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useLayoutStore } from '../App';

const vertexShader = `
  varying vec2 vUv;
  uniform float uViewportWidth;
  uniform float uScrollVelocity;
  uniform float uTransitionProgress;
  uniform float uContactMode;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    
    // Original curve logic
    float normalizedDistX = worldPos.x / (uViewportWidth / 2.0);
    float curveAmount = pow(abs(normalizedDistX), 2.5) * 200.0;
    float originalZ = worldPos.z - curveAmount * (1.0 - uTransitionProgress);
    float originalX = worldPos.x - (position.y * uScrollVelocity * 1.5) * (1.0 - uTransitionProgress);
    
    // Contact mode transition logic (pulling back and scaling down)
    float blackholeZ = originalZ - 1000.0;
    
    // Interpolate based on uContactMode
    worldPos.x = mix(originalX, originalX * 0.5, uContactMode);
    worldPos.y = mix(worldPos.y, worldPos.y * 0.5, uContactMode);
    worldPos.z = mix(originalZ, blackholeZ, uContactMode);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uScrollVelocity;
  uniform float uTransitionProgress;
  uniform float uContactMode;
  
  // To handle aspect ratio
  uniform vec2 uImageRes;
  uniform vec2 uPlaneRes;

  void main() {
    float shift = uScrollVelocity * 0.05 * (1.0 - uTransitionProgress);
    
    // Background cover math for UVs
    vec2 ratio = vec2(
      min((uPlaneRes.x / uPlaneRes.y) / (uImageRes.x / uImageRes.y), 1.0),
      min((uPlaneRes.y / uPlaneRes.x) / (uImageRes.y / uImageRes.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    uv.y += shift;

    vec4 texColor = texture2D(uTexture, uv);
    gl_FragColor = vec4(texColor.rgb, texColor.a * (1.0 - uContactMode));
  }
`;

export function CurvedCard({ id, imageUrl }: { id: string; imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const size = useThree((state) => state.size);
  
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    let active = true;
    if (imageUrl.toLowerCase().endsWith('.mp4')) {
      const vid = document.createElement('video');
      vid.src = imageUrl;
      vid.crossOrigin = "Anonymous";
      vid.loop = true;
      vid.muted = true;
      vid.playsInline = true;
      vid.play().catch(e => console.error("Video play failed:", e));
      const tex = new THREE.VideoTexture(vid);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      if (active) setTexture(tex);
    } else {
      new THREE.TextureLoader().load(imageUrl, (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        if (active) setTexture(tex);
      });
    }
    return () => { active = false; };
  }, [imageUrl]);

  const uniforms = useMemo(() => {
    const imgWidth = texture?.image ? (texture.image as any).width || (texture.image as any).videoWidth : 1;
    const imgHeight = texture?.image ? (texture.image as any).height || (texture.image as any).videoHeight : 1;
    return {
      uViewportWidth: { value: size.width },
      uScrollVelocity: { value: 0 },
      uTransitionProgress: { value: 0 },
      uContactMode: { value: 0 },
      uTexture: { value: texture },
      uImageRes: { value: new THREE.Vector2(imgWidth, imgHeight) },
      uPlaneRes: { value: new THREE.Vector2(1, 1) }
    };
  }, [texture, size.width]);

  useEffect(() => {
    if (materialRef.current) {
      const imgWidth = texture?.image ? ((texture.image as any).width || (texture.image as any).videoWidth) : 1;
      const imgHeight = texture?.image ? ((texture.image as any).height || (texture.image as any).videoHeight) : 1;
      materialRef.current.uniforms.uViewportWidth.value = size.width;
      materialRef.current.uniforms.uImageRes.value = new THREE.Vector2(imgWidth, imgHeight);
    }
  }, [size, texture]);

  useEffect(() => {
    const unsub = useLayoutStore.subscribe((state, prevState) => {
      const prevActive = prevState ? prevState.activeProjectId : null;

      if (state.isContactOpen && !prevState?.isContactOpen) {
        gsap.to(uniforms.uContactMode, { value: 1, duration: 1.5, ease: 'power3.inOut' });
      }
      if (!state.isContactOpen && prevState?.isContactOpen) {
        gsap.to(uniforms.uContactMode, { value: 0, duration: 1.5, ease: 'power3.inOut' });
      }
      
      if (state.activeProjectId === id && prevActive !== id) {
        isTransitioning.current = true;
        gsap.to(uniforms.uTransitionProgress, {
          value: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          onComplete: () => {
            isTransitioning.current = false;
          }
        });
      }
      
      if (!state.activeProjectId && prevActive === id) {
        isTransitioning.current = true;
        gsap.to(uniforms.uTransitionProgress, {
          value: 0,
          duration: 1.2,
          ease: 'power3.inOut',
          onComplete: () => {
            isTransitioning.current = false;
          }
        });
      }
    });
    return unsub;
  }, [id, uniforms]);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;
    
    const state = useLayoutStore.getState();
    const scrollY = state.scrollY;
    const velocity = state.velocity;
    
    const clampedVelocity = Math.max(-0.2, Math.min(0.2, velocity * 0.005));
    materialRef.current.uniforms.uScrollVelocity.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uScrollVelocity.value,
      clampedVelocity,
      0.1
    );

    let targetRect = state.activeProjectId === id ? state.proxies['project-hero'] : state.proxies[id];
    
    if (!targetRect) {
      if (isTransitioning.current) {
          return;
      }
      meshRef.current.visible = false;
      return;
    }
    
    meshRef.current.visible = true;

    // Update plane resolution for background cover math
    materialRef.current.uniforms.uPlaneRes.value.set(targetRect.width, targetRect.height);

    let currentLeft = targetRect.left;
    let currentTop = targetRect.top;

    if (state.activeProjectId === id) {
       // Target is project-hero, which scrolls vertically
       currentTop -= scrollY;
    } else {
       // Target is Home card, which scrolls horizontally
       // Removed currentLeft -= scrollY because DOM elements now handle their own scroll position 
    }

    const targetX = currentLeft - window.innerWidth / 2 + targetRect.width / 2;
    const targetY = -currentTop + window.innerHeight / 2 - targetRect.height / 2;

    if (isTransitioning.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.04);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.04);
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetRect.width, 0.04);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetRect.height, 0.04);
    } else {
      meshRef.current.position.set(targetX, targetY, 0);
      meshRef.current.scale.set(targetRect.width, targetRect.height, 1);
    }
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <primitive object={new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: uniforms,
        transparent: true
      })} ref={materialRef} attach="material" />
    </mesh>
  );
}
