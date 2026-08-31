import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLayoutStore } from '../App';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform float uOpacity;
  
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 p = vUv * 2.0;
    p.y += uScroll * 0.0002;
    p.x += uTime * 0.02;
    
    float noise1 = snoise(vec2(p.x * 0.5, p.y * 1.5) + uTime * 0.05);
    float noise2 = snoise(vec2(p.x * 0.8, p.y * 2.0) - uTime * 0.08);
    
    vec3 navy = vec3(34.0/255.0, 43.0/255.0, 58.0/255.0);
    vec3 lighterNavy = vec3(44.0/255.0, 56.0/255.0, 75.0/255.0);
    vec3 gold = vec3(201.0/255.0, 168.0/255.0, 93.0/255.0);
    
    vec3 color = navy;
    float depthGlow = smoothstep(0.1, 0.8, noise1);
    color = mix(color, lighterNavy, depthGlow * 0.6);
    float goldGlow = smoothstep(0.4, 0.9, noise2);
    color = mix(color, gold, goldGlow * 0.35);
    
    gl_FragColor = vec4(color, uOpacity);
  }
`;

export function Background() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const size = useThree((state) => state.size);
  const targetOpacity = useRef(1.0);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uOpacity: { value: 1.0 },
  }), []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      const layoutState = useLayoutStore.getState();
      materialRef.current.uniforms.uScroll.value = layoutState.scrollY;
      
      // Fade out when viewing a project
      targetOpacity.current = (layoutState.activeProjectId || layoutState.isContactOpen) ? 0.0 : 1.0;
      materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uOpacity.value,
        targetOpacity.current,
        delta * 3.0 // Animation speed
      );
    }
  });

  const w = size.width * 1.5;
  const h = size.height * 1.5;

  return (
    <mesh ref={meshRef} position={[0, 0, -300]} scale={[w, h, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true} // Must be true for uOpacity to work
        depthWrite={false}
      />
    </mesh>
  );
}
