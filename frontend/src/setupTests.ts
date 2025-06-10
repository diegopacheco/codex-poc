import '@testing-library/jest-dom'
import { vi } from 'vitest'

globalThis.fetch = vi.fn<
  (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
>(async () => ({ ok: true, json: async () => [] } as Response))
