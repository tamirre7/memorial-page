/**
 * Vitest + React Testing Library setup.
 * Runs before each test file.
 */
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Unmount React tree after each test to avoid leaks and side effects
afterEach(() => {
  cleanup()
})
