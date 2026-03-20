/// <reference types="astro/client" />

declare namespace React {
  interface HTMLAttributes<T> {
    class?: string;
  }
  interface SVGProps<T> {
    class?: string;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}