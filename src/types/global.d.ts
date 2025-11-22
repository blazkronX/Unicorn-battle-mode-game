// src/types/global.d.ts
declare global {
  interface BigInt {
    toJSON(): string
  }

  interface Window {
    Buffer: typeof Buffer
    process: {
      env: Record<string, any>
      browser: boolean
      version: string
      versions: Record<string, string>
      platform: string
      nextTick: (callback: Function) => void
    }
    global: Window & typeof globalThis
    BigInt64Array: typeof BigInt64Array
    BigUint64Array: typeof BigUint64Array
  }

  // Enhanced Number constructor types
  interface NumberConstructor {
    (value?: any): number
    new (value?: any): Number
  }

  // Process types for polyfill
  namespace NodeJS {
    interface Process {
      browser?: boolean
      nextTick: (callback: Function) => void
    }
  }
}

// Make this a module to avoid global scope issues
export {}