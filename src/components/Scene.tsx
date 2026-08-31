import React from 'react';
import { CurvedCard } from './CurvedCard';
import { Background } from './Background';
import { PROJECTS_DATA } from '../App';

export function Scene() {
  return (
    <>
      <Background />
      {PROJECTS_DATA.map((project) => (
        <CurvedCard key={project.id} id={project.id} imageUrl={project.image} />
      ))}
    </>
  );
}
