/**
 * Microsoft Clarity event tracking utilities
 * @see https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
 */

declare global {
  interface Window {
    clarity?: (action: string, ...args: unknown[]) => void
  }
}

/**
 * Track a custom event in Microsoft Clarity
 * @param eventName - Name of the event to track
 */
export function trackEvent(eventName: string): void {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', eventName)
  }
}

/**
 * Set a custom tag in Microsoft Clarity
 * @param key - Tag key
 * @param value - Tag value
 */
export function setTag(key: string, value: string): void {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('set', key, value)
  }
}

/**
 * Identify a user in Microsoft Clarity
 * @param userId - Unique user identifier
 * @param sessionId - Optional session identifier
 * @param pageId - Optional page identifier
 */
export function identify(userId: string, sessionId?: string, pageId?: string): void {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('identify', userId, sessionId, pageId)
  }
}
