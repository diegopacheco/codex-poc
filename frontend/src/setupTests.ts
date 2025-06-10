import '@testing-library/jest-dom'

globalThis.fetch = vi.fn(() =>
  Promise.resolve({ ok: true, json: async () => [] }) as unknown as Response
)
