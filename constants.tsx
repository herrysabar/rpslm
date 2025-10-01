import React from 'react';
import { Choice, CardInfo } from './types';

// SVG Icons as React Components
const RockIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z" opacity="0.3" /><path d="M19.34 12.66A8.001 8.001 0 0 0 12 4V2c5.52 0 10 4.48 10 10 0 2.22-.72 4.26-1.94 5.94l-1.42-1.42c.83-1.19 1.36-2.6 1.36-4.18zM4.66 11.34c.83 1.19 1.36 2.6 1.36 4.18 0 3.13 1.83 5.86 4.48 7.15l.65-1.83A6.01 6.01 0 0 1 6 15.52c0-1.22.4-2.35 1.09-3.28L4.66 11.34z" />
  </svg>
);

const PaperIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </svg>
);

const ScissorsIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19.7 3.3c-.39-.39-1.02-.39-1.41 0L14 7.59l1.41 1.41 4.29-4.29c.39-.39.39-1.02 0-1.41z"/>
  </svg>
);

const LaserIcon: React.FC<{className?: string}> = ({className}) => (
   <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 13h14v-2H5v2zm-2 6h2v-2H3v2zm0-8h2v-2H3v2zm0-8h2V3H3v2zm4 16h2v-2H7v2zm8-16v2h2V3h-2zm-4 8h2v-2h-2v2zm8 8h2v-2h-2v2zm-4-16h2V3h-2v2z"/>
  </svg>
);

const MirrorIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.77 16.77L6.5 8.5H18v8.27l-3.23-3.23zm.73-1.41L18 12.83V10.5h-2.33l-1.55 1.55zM6 18h12V6H6v12zm-4 4h16v-2H2V2H0v18c0 1.1.9 2 2 2z"/>
  </svg>
);

export const CHOICES: Record<Choice, CardInfo> = {
  [Choice.ROCK]: { id: Choice.ROCK, name: 'Rock', icon: <RockIcon/>, color: 'border-red-500', shadow: 'shadow-red-400/50' },
  [Choice.PAPER]: { id: Choice.PAPER, name: 'Paper', icon: <PaperIcon/>, color: 'border-sky-500', shadow: 'shadow-sky-400/50' },
  [Choice.SCISSORS]: { id: Choice.SCISSORS, name: 'Scissors', icon: <ScissorsIcon/>, color: 'border-amber-400', shadow: 'shadow-amber-400/50' },
  [Choice.LASER]: { id: Choice.LASER, name: 'Laser', icon: <LaserIcon/>, color: 'border-lime-500', shadow: 'shadow-lime-400/50' },
  [Choice.MIRROR]: { id: Choice.MIRROR, name: 'Mirror', icon: <MirrorIcon/>, color: 'border-violet-500', shadow: 'shadow-violet-400/50' },
};

export const INITIAL_DECK: Choice[] = [
    Choice.ROCK,
    Choice.PAPER,
    Choice.SCISSORS,
    Choice.LASER,
    Choice.MIRROR,
];

export const WIN_CONDITIONS: Record<Choice, Choice[]> = {
  [Choice.ROCK]: [Choice.SCISSORS, Choice.MIRROR],
  [Choice.PAPER]: [Choice.ROCK, Choice.MIRROR],
  [Choice.SCISSORS]: [Choice.PAPER, Choice.MIRROR],
  [Choice.LASER]: [Choice.ROCK, Choice.PAPER, Choice.SCISSORS],
  [Choice.MIRROR]: [Choice.LASER],
};

export const POINT_VALUES: Record<Choice, number> = {
    [Choice.ROCK]: 3,
    [Choice.PAPER]: 3,
    [Choice.SCISSORS]: 3,
    [Choice.LASER]: 2,
    [Choice.MIRROR]: 7,
};