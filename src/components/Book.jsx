import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useTheme } from '../context/ThemeContext'

const Button = ({ content, active, setActive }) => {
  const but = useRef()

  useEffect(() => {
    gsap.to(but.current, {
      scale: active === content ? 1.1 : 1,
      duration: 0.3,
      ease: 'power1.inOut'
    })
  }, [active, content])

  function handleClick() {
    setActive(content)
    gsap.fromTo('.page', {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.5,
      ease: 'power1.inOut',
      stagger: 0.1
    })
  }

  return (
    <div
      ref={but}
      className={`flex justify-center items-center w-10 h-10 rounded-full cursor-pointer transition-all duration-300 ${
        active === content
          ? 'bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30'
          : 'bg-gray-700 hover:bg-gray-600'
      }`}
      onClick={handleClick}
    >
      <span className="text-white font-medium">{content}</span>
    </div>
  )
}

const Book = () => {
  const [active, setActive] = useState('En')
  const { isDark } = useTheme()

  const data = {
    'Tl': {
      page1: `Namaskaaram Priyamaina Paathakulaara..! 🙏🏻

2022

Appude oka 'mahammari' prabhanjananni thattuku nilabadi, enno parishkalni daati, entho aanandanga gadipina pasipraayanni vidichi vachham...

Ee Ede maa tholi parichayam ee suvishala prapancha pravahamlo andaru kothhavalle , edo theliyani gubulu ,edo cheyyalanna thalampu, inkedo saadhidda manna pattudala , alaaa oka kothha adhyayam modalu pettam...`,
      page2: `Cheppedemundi, elaa gaithe andaru bayata anukuntaro ade jarigindi, elaa anni subjects lo top cheyyali ani sagam elaa anni subjects pass ithe chaalu ani mari sagam nischayinchukoni Modati adugu vesam...

Enno kothha vishayalu, inkenno kothha parichayalu, marenno manchi maatalu ede ee edadi visheshaalu.

Oka vyakthi, Rendu kothha bhaashalu, okati anni bhaashalaku thalli lanti bhaasha, inkoti annitilo kella sulabhamaina bhaasha...`,
      page3: `Edi rendo adugu...
koncham chilipi panulu chese snehithulu, bayataku velli party chesukone alavatlu, college lo jarigina events...

Mukhyanga malli kontha mandi thana vyakthithvam tho, alavokagaa paathaalanu cheppe naipunyamtho, athi kashtamaina bhaashanu atleast alavokagaa cheppina upadhyayuralu thana sneha bhavanatho...`,
      page4: `Edi moodo adugu...
Snehithulatho velli choosina cinemalu, chesukunna partielu, aasvadinchina kothha anubhavalu,
Thappulnunchi nerchukunna gunapaathaalu...

Elaa anni rasaalanu andinchindi ee edadi.`,
      page5: `Ede aakhari mettu...`,
      page6: `So many unforgettable moments spent together,
So many sweet memories shared,

The journey from not even knowing each other's names to becoming each other's biggest support,

This journey we've taken — will never be forgotten.`
    },
    'En': {
      page1: `Hello Dear Reader..! 👋🏻

2022

That was the year we stepped out — just after surviving the storm of a global pandemic. Leaving behind the golden days of childhood filled with joy, we entered a new world.

This was our first introduction — in this vast flow of life, we were all strangers, like ripples in an unknown sea… filled with curiosity, a desire to do something, and a determination to achieve something great.

And just like that, we turned a new page and began a brand new chapter.`,
      page2: `What can we say — it unfolded exactly as people predicted.
Half of us began thinking, "I should top every subject!", while the other half thought, "Let's just pass every subject somehow."
And with that mindset, we took our very first step.

We were introduced to new ideas, new friends, and shared many beautiful conversations.`,
      page3: `This was our second step...
Friendships grew stronger. Mischief got a little bolder. We started going out for parties. We had college events — some organized them, some just enjoyed them.
But most importantly, we met more teachers — some who shared wisdom like poetry, some who effortlessly taught the most difficult languages with grace and empathy.`,
      page4: `This was the third step...
Movies with friends, birthday parties, unforgettable experiences...
Lessons learned from mistakes, visiting Agriculture lands and Government offices for projects, travelling states and cities for hackathons...

This year gave us a taste of everything — laughter, frustration, surprise, and joy.`,
      page5: `And this… this is our final step.`,
      page6: `So many unforgettable moments spent together,
So many sweet memories shared,
So many lessons we listened to with attention — and sometimes without,

Teachers who made even the driest subjects come alive with smiles,
Teachers we will never forget.

The countless photos and memories with our friends,
Our random thoughts about the future,
The journey from not even knowing each other's names to becoming each other's biggest support,

This journey we've taken — will never be forgotten.`
    },
  }

  const pageColors = [
    'from-amber-100 via-orange-200 to-yellow-300',
    'from-emerald-100 via-teal-200 to-cyan-300',
    'from-sky-100 via-blue-200 to-indigo-300',
    'from-rose-100 via-pink-200 to-red-300',
    'from-orange-100 via-amber-200 to-yellow-300',
    'from-violet-100 via-purple-200 to-fuchsia-300',
  ]

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-5xl mx-auto">
      <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm shadow-xl`}>
        <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Memories Book
        </h1>
        <p className={`text-justify mb-6 max-w-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          This book contains the memories of our 22 batch. Each page represents a unique moment, from our first day to the last farewell. Flip through the pages to relive those unforgettable times!
        </p>
        <div className="flex gap-3 justify-center">
          <Button content={'En'} active={active} setActive={setActive} />
          <Button content={'Tl'} active={active} setActive={setActive} />
        </div>
      </div>

      <div className="flipbook-wrapper">
        <HTMLFlipBook
          width={380}
          height={520}
          maxShadowOpacity={0.5}
          drawShadow={true}
          size="fixed"
          style={{ zIndex: 0 }}
        >
          {[1, 2, 3, 4, 5, 6].map((num, idx) => (
            <div
              key={num}
              className={`custom-scroll flex flex-col justify-center items-center p-6 bg-gradient-to-br ${pageColors[idx]} rounded-sm page`}
            >
              <p className="text-base text-gray-700 whitespace-pre-line leading-relaxed">
                {data[active][`page${num}`]}
              </p>
              <p className="text-sm text-gray-500 text-center mt-4">- {num} -</p>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  )
}

export default Book
