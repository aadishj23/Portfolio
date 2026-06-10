declare global {
  interface Window {
    lastScrollY?: number;
    scrollEndTimeout?: ReturnType<typeof setTimeout>;
  }
}

export {};
