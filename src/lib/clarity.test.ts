import { describe, it, expect, vi, beforeEach } from 'vitest'
import { trackEvent, setTag, identify } from './clarity'

describe('clarity utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('trackEvent', () => {
    it('calls window.clarity with event action', () => {
      trackEvent('button_click')

      expect(window.clarity).toHaveBeenCalledWith('event', 'button_click')
    })

    it('handles missing clarity gracefully', () => {
      const originalClarity = window.clarity
            window.clarity = undefined

      expect(() => trackEvent('test')).not.toThrow()

      window.clarity = originalClarity
    })
  })

  describe('setTag', () => {
    it('calls window.clarity with set action', () => {
      setTag('user_type', 'designer')

      expect(window.clarity).toHaveBeenCalledWith('set', 'user_type', 'designer')
    })

    it('handles missing clarity gracefully', () => {
      const originalClarity = window.clarity
            window.clarity = undefined

      expect(() => setTag('key', 'value')).not.toThrow()

      window.clarity = originalClarity
    })
  })

  describe('identify', () => {
    it('calls window.clarity with identify action', () => {
      identify('user-123')

      expect(window.clarity).toHaveBeenCalledWith('identify', 'user-123', undefined, undefined)
    })

    it('passes optional session and page IDs', () => {
      identify('user-123', 'session-456', 'page-789')

      expect(window.clarity).toHaveBeenCalledWith('identify', 'user-123', 'session-456', 'page-789')
    })

    it('handles missing clarity gracefully', () => {
      const originalClarity = window.clarity
            window.clarity = undefined

      expect(() => identify('user-123')).not.toThrow()

      window.clarity = originalClarity
    })
  })
})
