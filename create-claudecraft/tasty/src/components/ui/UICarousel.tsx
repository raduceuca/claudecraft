import { useState, useEffect } from 'react'
import { useTheme, type Theme } from '@/context/ThemeContext'

const slides = [
  {
    id: 'chat',
    content: (
      <div className="space-y-3">
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-primary text-sm">Can you make this pop more?</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-secondary text-sm">I've added 47 gradients</div>
        </div>
      </div>
    ),
  },
  {
    id: 'card',
    content: (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-4">
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-10">
                <span className="text-sm">AI</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">Claude</h3>
              <p className="text-xs text-base-content/50">Probably typing...</p>
            </div>
            <span className="badge badge-success badge-sm gap-1">
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" aria-hidden="true"></span>
              Online
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'notification',
    content: (
      <div className="space-y-3">
        <div className="alert alert-success py-2 px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-sm">Deployed. Nobody noticed.</span>
        </div>
        <div className="alert alert-warning py-2 px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span className="text-sm">Client is typing...</span>
        </div>
      </div>
    ),
  },
  {
    id: 'modal',
    content: (
      <div className="bg-base-100 rounded-lg shadow-xl p-4">
        <h3 className="font-bold text-sm mb-2">Delete everything?</h3>
        <p className="text-xs text-base-content/70 mb-4">This will remove all your work. Forever. No take-backs.</p>
        <div className="flex gap-2 justify-end">
          <button className="btn btn-ghost btn-sm">Keep it</button>
          <button className="btn btn-error btn-sm">Burn it down</button>
        </div>
      </div>
    ),
  },
  {
    id: 'stats',
    content: (
      <div className="stats stats-vertical bg-base-200 shadow w-full">
        <div className="stat py-3 px-4">
          <div className="stat-title text-xs">Meetings survived</div>
          <div className="stat-value text-2xl text-primary">47</div>
        </div>
        <div className="stat py-3 px-4">
          <div className="stat-title text-xs">Coffee consumed</div>
          <div className="stat-value text-2xl text-secondary">∞</div>
        </div>
      </div>
    ),
  },
  {
    id: 'progress',
    content: (
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-base-content/70">Scope creep</span>
            <span className="text-base-content/50">89%</span>
          </div>
          <progress className="progress progress-error w-full" value="89" max="100"></progress>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-base-content/70">Sanity remaining</span>
            <span className="text-base-content/50">12%</span>
          </div>
          <progress className="progress progress-success w-full" value="12" max="100"></progress>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-base-content/70">Budget</span>
            <span className="text-base-content/50">3%</span>
          </div>
          <progress className="progress progress-warning w-full" value="3" max="100"></progress>
        </div>
      </div>
    ),
  },
  {
    id: 'tabs',
    content: (
      <div>
        <div role="tablist" className="tabs tabs-boxed bg-base-200 mb-3" aria-label="Project phases">
          <button role="tab" className="tab tab-active text-xs" aria-selected="true" id="tab-design" aria-controls="tabpanel-design">Design</button>
          <button role="tab" className="tab text-xs" aria-selected="false" id="tab-code" aria-controls="tabpanel-code">Code</button>
          <button role="tab" className="tab text-xs" aria-selected="false" id="tab-regret" aria-controls="tabpanel-regret">Regret</button>
        </div>
        <div role="tabpanel" id="tabpanel-design" aria-labelledby="tab-design" className="bg-base-200 rounded-lg p-3">
          <p className="text-sm text-base-content/70">Current tab: Design</p>
          <p className="text-xs text-base-content/50 mt-1">Where ideas go to become tickets.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'form',
    content: (
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your best idea"
          className="input input-bordered input-sm w-full"
          aria-label="Idea input"
          readOnly
        />
        <div className="flex gap-2">
          <button className="btn btn-primary btn-sm flex-1">Ship it</button>
          <button className="btn btn-ghost btn-sm flex-1">Overthink it</button>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" defaultChecked readOnly />
          <span className="text-xs text-base-content/70">I accept that pixels are my life now</span>
        </label>
      </div>
    ),
  },
  {
    id: 'timeline',
    content: (
      <ul className="timeline timeline-vertical timeline-compact">
        <li>
          <div className="timeline-start text-xs text-base-content/50">Mon</div>
          <div className="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-success"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
          </div>
          <div className="timeline-end text-sm">Started project</div>
          <hr className="bg-success"/>
        </li>
        <li>
          <hr className="bg-success"/>
          <div className="timeline-start text-xs text-base-content/50">Tue</div>
          <div className="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-success"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
          </div>
          <div className="timeline-end text-sm">Added scope</div>
          <hr/>
        </li>
        <li>
          <hr/>
          <div className="timeline-start text-xs text-base-content/50">Fri</div>
          <div className="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-base-content/30"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
          </div>
          <div className="timeline-end text-sm text-base-content/50">Ship?</div>
        </li>
      </ul>
    ),
  },
  {
    id: 'rating',
    content: (
      <div className="text-center space-y-4">
        <p className="text-sm text-base-content/70">Rate your work-life balance</p>
        <div className="rating rating-lg gap-1">
          <input type="radio" name="rating" className="mask mask-star-2 bg-primary" aria-label="1 star" />
          <input type="radio" name="rating" className="mask mask-star-2 bg-primary" aria-label="2 stars" />
          <input type="radio" name="rating" className="mask mask-star-2 bg-primary" defaultChecked aria-label="3 stars" />
          <input type="radio" name="rating" className="mask mask-star-2 bg-base-300" aria-label="4 stars" />
          <input type="radio" name="rating" className="mask mask-star-2 bg-base-300" aria-label="5 stars" />
        </div>
        <p className="text-xs text-base-content/50">Could be worse. Could be better.</p>
      </div>
    ),
  },
]

export function UICarousel() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { theme, setTheme, themes } = useTheme()

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [isHovered])

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Theme selector */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-base-content/50">Try a theme:</span>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="select select-bordered select-sm w-40"
          aria-label="Select theme"
        >
          {themes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Carousel container */}
      <div className="bg-base-200 rounded-lg p-6 min-h-[220px] flex items-center justify-center overflow-hidden relative">
        {/* Prev button */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm btn-ghost"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Content */}
        <div
          className="w-full px-8 transition-opacity duration-300"
          key={slides[current].id}
        >
          {slides[current].content}
        </div>

        {/* Next button */}
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm btn-ghost"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        {/* Counter */}
        <span className="text-xs text-base-content/40 tabular-nums">
          {current + 1} / {slides.length}
        </span>

        {/* Dots - with adequate touch targets */}
        <div className="flex gap-1" role="tablist" aria-label="Carousel slides">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrent(index)}
              role="tab"
              aria-selected={index === current}
              className={`p-2 -m-1.5 transition-all ${
                index === current ? '' : ''
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  index === current
                    ? 'bg-primary w-6'
                    : 'bg-base-300 hover:bg-base-content/30 w-2'
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        {/* Pause indicator */}
        <span className="text-xs text-base-content/40 w-12 text-right">
          {isHovered ? 'paused' : ''}
        </span>
      </div>
    </div>
  )
}
