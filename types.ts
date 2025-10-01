// FIX: Import `React` to provide the `JSX` namespace, which is needed for the `JSX.Element` type.
import React from 'react';

export enum Choice {
  ROCK = 'ROCK',
  PAPER = 'PAPER',
  SCISSORS = 'SCISSORS',
  LASER = 'LASER',
  MIRROR = 'MIRROR',
}

export interface CardInfo {
  id: Choice;
  name: string;
  // FIX: To resolve the 'Cannot find namespace JSX' error, changed the type from `JSX.Element` to the more explicit `React.ReactElement`.
  icon: React.ReactElement;
  color: string;
  shadow: string;
}