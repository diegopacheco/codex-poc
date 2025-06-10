import '@testing-library/jest-dom'
import { vi } from 'vitest'

globalThis.fetch = vi.fn(() =>
  Promise.resolve({ ok: true, json: async () => [] }) as unknown as Response
)
