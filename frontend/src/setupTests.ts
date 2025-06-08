import '@testing-library/jest-dom'

// Mock global fetch for components that make network calls during tests
globalThis.fetch = vi.fn(() =>
  Promise.resolve({ ok: true, json: async () => [] }) as any
)
