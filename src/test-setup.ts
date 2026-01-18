import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock clipboard API - can't directly stub navigator, so we stub the writeText method
if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn().mockResolvedValue(undefined),
      readText: vi.fn().mockResolvedValue(''),
    },
    writable: true,
    configurable: true,
  })
} else {
  // If clipboard exists (jsdom), replace with mock
  navigator.clipboard.writeText = vi.fn().mockResolvedValue(undefined)
  navigator.clipboard.readText = vi.fn().mockResolvedValue('')
}

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock window.clarity for analytics
Object.defineProperty(window, 'clarity', {
  value: vi.fn(),
  writable: true,
})
