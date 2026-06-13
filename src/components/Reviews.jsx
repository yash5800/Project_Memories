import React, { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

const cardAccents = [
  'border-t-[#ff6b6b]', 'border-t-[#ffa94d]', 'border-t-[#ffd43b]',
  'border-t-[#69db7c]', 'border-t-[#4dabf7]', 'border-t-[#9775fa]', 'border-t-[#f06595]',
]

const ReviewCard = ({ name, role, image, quote, accent }) => {
  const { isDark } = useTheme()

  return (
    <div
      className={`flex-shrink-0 w-80 md:w-96 p-6 rounded-2xl mx-4 border-t-4 ${accent} ${
        isDark
          ? 'bg-gray-800/80 hover:bg-gray-800'
          : 'bg-white hover:bg-gray-50'
      } shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#9775fa]">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-rainbow flex items-center justify-center text-white text-xl font-bold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h4>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {role}
          </p>
        </div>
      </div>

      <div className="relative">
        <svg
          className="absolute -top-2 -left-1 w-8 h-8 text-[#9775fa] opacity-30"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className={`text-sm leading-relaxed pl-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {quote}
        </p>
      </div>
    </div>
  )
}

const Reviews = () => {
  const scrollRef = useRef()
  const autoScrollRef = useRef(null)
  const { isDark } = useTheme()

const reviews = [
  {
    name: 'Dr. M. Babu Rao',
    role: 'Professor & HOD',
    quote:
      'It has been a privilege to witness this batch grow into confident and capable individuals. I am confident that your dedication, perseverance, and values will guide you toward remarkable achievements in your future endeavors.',
  },
  {
    name: 'Mr. K. Bhaskar',
    role: 'Assistant Professor',
    quote:
      'It has always been a pleasure teaching this batch and guiding you in achieving your goals throughout these years. I wish each of you continued success and fulfillment in all your future pursuits.',
  },
  {
    name: 'Dr. Y. Aditya',
    role: 'Associate Professor',
    quote:
      'Your curiosity, enthusiasm for learning, and commitment to excellence have consistently stood out. May you continue to embrace challenges with confidence and make meaningful contributions to society.',
  },
  {
    name: 'Mr. M. N. Sathish Kumar',
    role: 'Assistant Professor',
    quote:
      'This batch has demonstrated resilience, teamwork, and a genuine passion for growth. May your professional journey be defined by integrity, innovation, and lifelong learning.',
  },
  {
    name: 'Dr. J. A. Ranga Babu',
    role: 'Associate Professor',
    quote:
      'Watching you evolve from students into responsible professionals has been truly rewarding. I hope you pursue your aspirations with determination and leave a positive impact wherever you go.',
  },
  {
    name: 'Dr. N. Siva Chintaiah',
    role: 'Associate Professor',
    quote:
      'Success is built upon discipline, perseverance, and continuous self-improvement. I encourage each of you to remain grounded in your values while striving for excellence in your chosen paths.',
  },
  {
    name: 'Dr. S. Ravi',
    role: 'Associate Professor',
    quote:
      'You have shown the potential to overcome obstacles and transform opportunities into achievements. May you continue to inspire others through your dedication, professionalism, and character.',
  },
  {
    name: 'Dr. T. Nagamani',
    role: 'Associate Professor',
    quote:
      'As you embark on the next chapter of your lives, remember that true success lies not only in accomplishments but also in the positive difference you make in the lives of others. Wishing you a future filled with purpose and success.',
  },
];

  const handleScroll = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY
    }
  }

  const scrollByCards = (direction = 1) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 340, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = window.setInterval(() => {
        if (!scrollRef.current) {
          return
        }

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        const reachedEnd = scrollLeft + clientWidth >= scrollWidth - 20

        if (reachedEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollByCards(1)
        }
      }, 3500)
    }

    startAutoScroll()

    return () => {
      if (autoScrollRef.current) {
        window.clearInterval(autoScrollRef.current)
      }
    }
  }, [])

  const pauseAutoScroll = () => {
    if (autoScrollRef.current) {
      window.clearInterval(autoScrollRef.current)
      autoScrollRef.current = null
    }
  }

  const resumeAutoScroll = () => {
    if (autoScrollRef.current) {
      return
    }
    autoScrollRef.current = window.setInterval(() => {
      if (!scrollRef.current) {
        return
      }
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const reachedEnd = scrollLeft + clientWidth >= scrollWidth - 20
      if (reachedEnd) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollByCards(1)
      }
    }, 3500)
  }

  return (
    <section
      id="reviews"
      className={`relative py-20 ${
        isDark ? 'bg-[#0f0f1a]' : 'bg-gray-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#9775fa]/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#f06595]/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12 px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-rainbow">Faculty Opinions</span>
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            What our teachers have to say about the 2022 batch
          </p>
        </div>

        <div
          ref={scrollRef}
          onWheel={handleScroll}
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
          className="flex overflow-x-auto scrollbar-hide px-6 py-4 cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: 'smooth' }}
        >
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} accent={cardAccents[index % cardAccents.length]} />
          ))}
          {reviews.map((review, index) => (
            <ReviewCard key={`dup-${index}`} {...review} accent={cardAccents[index % cardAccents.length]} />
          ))}
        </div>

        <div className="text-center mt-6 px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => scrollByCards(-1)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100'} shadow-md`}
            >
              ← Previous
            </button>
            <button
              onClick={() => scrollByCards(1)}
              className="rounded-full px-4 py-2 text-sm font-semibold bg-rainbow text-white shadow-md hover:opacity-90 transition-opacity"
            >
              Next →
            </button>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            ← Scroll horizontally to see more →
          </p>
        </div>
      </div>
    </section>
  )
}

export default Reviews
