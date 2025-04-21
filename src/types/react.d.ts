/// <reference types="react" />
/// <reference types="react-dom" />

import { useEffect } from 'react';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  export { useEffect };
} 