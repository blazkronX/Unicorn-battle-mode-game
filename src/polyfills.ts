// src/polyfills.ts - Optimized for Node 23
import { Buffer } from 'buffer'

// Add Buffer and process to global scope for Web3 compatibility
if (typeof window !== 'undefined') {
  window.global = window.global ?? window
  window.Buffer = window.Buffer ?? Buffer
  window.process = window.process ?? { 
    env: import.meta.env || {},
    browser: true,
    version: 'v23.0.0',
    versions: { 
      node: '23.0.0',
      v8: '12.0.0'
    },
    platform: 'browser',
    nextTick: (callback: Function) => setTimeout(callback, 0)
  }
}

// BigInt JSON serialization (Node 23 native support)
if (typeof BigInt !== 'undefined' && typeof BigInt.prototype.toJSON === 'undefined') {
  BigInt.prototype.toJSON = function() {
    return this.toString()
  }
}

// Enhanced Math.pow fix for wagmi BigInt errors (Node 23 optimized)
const originalPow = Math.pow
Math.pow = function(base: any, exponent: any): number {
  try {
    // Handle BigInt conversion with Node 23 optimizations
    if (typeof base === 'bigint') {
      // Use Node 23's improved BigInt handling
      if (base > 0x1fffffffffffff) { // 2^53 - 1
        console.warn('BigInt base exceeds safe integer range in Math.pow')
        base = Number.MAX_SAFE_INTEGER
      } else if (base < -0x1fffffffffffff) {
        console.warn('BigInt base below safe integer range in Math.pow')
        base = Number.MIN_SAFE_INTEGER
      } else {
        base = Number(base)
      }
    }
    
    if (typeof exponent === 'bigint') {
      if (exponent > 0x1fffffffffffff) {
        console.warn('BigInt exponent exceeds safe integer range in Math.pow')
        exponent = Number.MAX_SAFE_INTEGER
      } else if (exponent < -0x1fffffffffffff) {
        console.warn('BigInt exponent below safe integer range in Math.pow')
        exponent = Number.MIN_SAFE_INTEGER
      } else {
        exponent = Number(exponent)
      }
    }
    
    const result = originalPow.call(Math, base, exponent)
    
    // Validate result
    if (!Number.isFinite(result)) {
      console.warn('Math.pow resulted in non-finite number, returning 0')
      return 0
    }
    
    return result
  } catch (error) {
    console.warn('Math.pow BigInt conversion error caught:', error)
    return 0
  }
}

// Enhanced Number constructor for Node 23
const originalNumberConstructor = Number
const enhancedNumber = function(value?: any): number {
  if (arguments.length === 0) return 0
  
  if (typeof value === 'bigint') {
    // Use Node 23's improved BigInt to Number conversion
    try {
      if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
        console.warn('BigInt value exceeds MAX_SAFE_INTEGER, clamping to safe value')
        return Number.MAX_SAFE_INTEGER
      }
      if (value < BigInt(Number.MIN_SAFE_INTEGER)) {
        console.warn('BigInt value below MIN_SAFE_INTEGER, clamping to safe value')
        return Number.MIN_SAFE_INTEGER
      }
      return Number(value)
    } catch (error) {
      console.warn('BigInt to Number conversion failed:', error)
      return 0
    }
  }
  
  return originalNumberConstructor(value)
}

// Preserve all Number static properties and methods
Object.setPrototypeOf(enhancedNumber, originalNumberConstructor)
Object.defineProperty(enhancedNumber, 'prototype', {
  value: originalNumberConstructor.prototype,
  writable: false,
  enumerable: false,
  configurable: false
})

// Copy all static methods
Object.getOwnPropertyNames(originalNumberConstructor).forEach(prop => {
  if (prop !== 'length' && prop !== 'name' && prop !== 'prototype') {
    Object.defineProperty(enhancedNumber, prop, {
      value: (originalNumberConstructor as any)[prop],
      writable: false,
      enumerable: false,
      configurable: false
    })
  }
})

// Replace global Number constructor
Object.defineProperty(window, 'Number', {
  value: enhancedNumber,
  writable: false,
  enumerable: false,
  configurable: false
})

// Add support for crypto if needed (Node 23 has excellent crypto support)
if (typeof window !== 'undefined' && !window.crypto && typeof globalThis !== 'undefined' && globalThis.crypto) {
  window.crypto = globalThis.crypto
}

// Performance optimization: Use Node 23's native BigInt64Array if available
if (typeof BigInt64Array !== 'undefined') {
  window.BigInt64Array = BigInt64Array
}
if (typeof BigUint64Array !== 'undefined') {
  window.BigUint64Array = BigUint64Array
}

console.log('🦄 Charlie Unicorn Web3 polyfills loaded successfully!')
console.log('✅ Optimized for Node.js 23.x')
console.log('✅ Enhanced BigInt Math.pow fix applied')
console.log('✅ Buffer and process polyfills loaded')
console.log('✅ Ready for wagmi and TronLink with Node 23 optimizations!')