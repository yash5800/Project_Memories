import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

import '../scroll.css'
import { SplitText } from 'gsap/all';

gsap.registerPlugin(SplitText);

const Button = ({content,active,setActive})=>{
  const but = useRef();

  useEffect(() => {
    gsap.set(but.current, {
      backgroundImage: 'linear-gradient(to right, #d1d5db, #9ca3af)',
      scale: 1,
      ease: 'power1.inOut'
    });
    if (active === content) {
      gsap.set(but.current, {
        scale: 1.1,
        ease: 'power1.inOut',
        backgroundImage : 'linear-gradient(to top right, #22c55e, #60a5fa, #f9a8d4)'
      })
    }
  },[active,content])

  function handleClick() {
     setActive(content);
     gsap.fromTo('.page',{
      opacity: 0,
     },
     {
      opacity: 1,
      duration: 0.5,
      ease: 'power1.inOut',
      stagger: 0.1
     }
    )
  }

  return(
    <div
      ref={but}
      className={`flex justify-center items-center w-10 h-10 rounded-full bg-gradient-to-br 
        ${ active == content ?'cursor-pointer' : 'cursor-default'}`
      }
      onClick={handleClick}
    >
      <span className='text-black font-medium caveat'>{content}</span>
    </div>
  )
}


const Book = () => {
  const [active, setActive] = useState('En');
  let ismobile = window.innerWidth < 768;

  useLayoutEffect(()=>{

    gsap.fromTo('.headbook',
      {
        y: 50,
        opacity: 0
      },
      {
        y:0,
        opacity: 1,
        duration:1.5,
        ease: 'power1.out'
    })

    const textlines = new SplitText('.pbook', { type: 'lines' });

    gsap.from(textlines.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power1.out',
      stagger: 0.2,
      delay: 0.5
    });

  },[])

  const data = {
    'Tl': {
      page1:
        `Namaskaaram Priyamaina Paathakulaara..! 🙏🏻

        2022

        Appude oka 'mahammari' prabhanjananni thattuku nilabadi, enno parishkalni daati, entho aanandanga gadipina pasipraayanni vidichi vachham...

        Ee Ede maa tholi parichayam ee suvishala prapancha pravahamlo andaru kothhavalle , edo theliyani gubulu ,edo cheyyalanna thalampu, inkedo saadhidda manna pattudala ,  alaaa oka kothha adhyayam modalu pettam...`,
      page2: 
      `Cheppedemundi, elaa gaithe andaru bayata anukuntaro ade jarigindi, elaa anni subjects lo top cheyyali ani sagam elaa anni subjects pass ithe chaalu ani mari sagam nischayinchukoni Modati adugu vesam...Enno kothha vishayalu, inkenno kothha parichayalu, marenno manchi maatalu ede ee edadi visheshaalu.
      
      Oka vyakthi, Rendu kothha bhaashalu , okati anni bhaashalaku thalli lanti bhaasha, inkoti annitilo kella sulabhamaina bhaasha (alaa ani valla nammakam, mammalni em anakandi) nerpinche kramamlo , andari priyatama upadhayudai thana prathibha paatavaalatho ,meppinchi, navvinchi,kavvinchi thanani ennadu maravakunda oka gatti punadi vesukunnaru maa hrudayalalo mariyu maa jeevithaalalo...`, 
      page3:
      ` Edi rendo adugu...
koncham koncham perigina parichayaalu, chilipi panulu chese snehithulu, bayataku velli party chesukone alavatlu, college lo jarigina events, vaatini nirvahinche panilo kondaru, vaatini enjoy chese marikondaru...
Mukhyanga malli kontha mandi thama vyakthithvam tho, alavokagaa paathaalanu cheppe naipunyamtho, athi kashtamaina bhaashanu saitham alavokagaa cheppina upadhyayuralu thana sneha bhavanatho...
`,
page4:
`Edi moodo adugu...
Snehithulatho velli choosina cinemalu, chesukunna partielu, aasvadinchina kothha anubhavalu,
Thappulnunchi nerchukunna gunapaathaalu, Polaalu, government office lu thirugina rojulu, hackathons kosam thirigina nagaralu, college lo jarigina vivaadaalu, vaatini daati nilabadina gatti hrudayalu....
elaa anni rasaalanu andinchindi ee edadi.
`,
page5:
`Ede aakhari mettu...
`,
page6:
`Enno Kalisi gadipina khshanalu,
madhuramaina sanniveshalu,
Entho shradhaga vinna paathalu,
Thaamu navvakunda Navvisthu paathalu cheppe upadyayulu,
Ennadu maravaleni upadhyayulu,

Snehithulatho digina marapurani chithralu,
Bavishthhunu gurinchina vichaaralu
Evaru evariki theliyani paristhithi nunchi manakantu okaru unnaru anna aalochana varaku, edo saadidhha manna korika nunchi daanni saadhinche varaku, tholi valapu/choopu nunchi thane naa Jeevitham anna bhaavana varaku, saagina maa ee prayanam ennadu marivanidi...`

    },
    'En':{
      page1: 
        `Hello Dear Reader..! 👋🏻

        2022

        That was the year we stepped out — just after surviving the storm of a global pandemic. Leaving behind the golden days of childhood filled with joy, we entered a new world.

        This was our first introduction — in this vast flow of life, we were all strangers, like ripples in an unknown sea… filled with curiosity, a desire to do something, and a determination to achieve something great.

        And just like that, we turned a new page and began a brand new chapter.`,
      page2: 
        `What can we say — it unfolded exactly as people predicted.
        Half of us began thinking, "I should top every subject!", while the other half thought, "Let’s just pass every subject somehow."
        And with that mindset, we took our very first step.

        We were introduced to new ideas, new friends, and shared many beautiful conversations.
        " One person, two new languages — one, the mother of all languages, and the other, the easiest of them all (or so we believed — no judgment!).
        Through his brilliant teaching style, his warmth, his wit — he became our most loved teacher.
        He taught us, guided us, made us laugh, made us think, and carved a place in our hearts and in our lives that will never fade."`,
      
      page3:
      `This was our second step...
Friendships grew stronger. Mischief got a little bolder. We started going out for parties. We had college events — some organized them, some just enjoyed them.
But most importantly, we met more teachers — some who shared wisdom like poetry, some who effortlessly taught the most difficult languages with grace and empathy.
They weren’t just teachers — they were friends in disguise.
`,
page4:
`This was the third step...
Movies with friends, birthday parties, unforgettable experiences...
Lessons learned from mistakes, visiting Agriculture lands and Government offices for projects, travelling states and cities for hackathons (yes, really), arguments in college, and standing strong through it all.
This year gave us a taste of everything — laughter, frustration, surprise, and joy.
`,
page5:
`And this… this is our final step.
`,
page6:
`So many unforgettable moments spent together,
So many sweet memories shared,
So many lessons we listened to with attention — and sometimes without,
Teachers who made even the driest subjects come alive with smiles,
Teachers we will never forget.

The countless photos and memories with our friends,
Our random thoughts about the future,
The journey from not even knowing each other's names to becoming each other’s biggest support,
From a wish to achieve something… to actually achieving it,
From a first glance of affection… to realizing, “This is my life now.”

This journey we've taken — will never be forgotten.`
  },
  }
  return (
   <div id = 'book' className='overflow-hidden flex justify-center items-center p-5 max-md:flex-col max-sm:gap-3 max-sm:p-2 w-full max-w-[1000px] mx-auto'>
      <div className='z-1 justify-center items-center flex flex-col min-xl:h-[400px] bg-[#0d0f12]'>
        <h1 className='text-3xl text-gray-400 font-bold mb-5'>Memories Book</h1>
        <p className='memo_para text-gray-500 max-w-lg max-lg:max-w-md'>
          This book contains the memories of our 22 batch. Each page represents a unique moment, from our first day to the last farewell. Flip through the pages to relive those unforgettable times!
        </p>
        <div
         className='flex flex-row justify-center items-center gap-3 mt-5'
        >
          <Button content={'En'} active={active} setActive={setActive} />
          <Button content={'Tl'} active={active} setActive={setActive} />
          {/* <Button content={'Tu'} active={active} setActive={setActive} /> */}
        </div>
      </div>
      <div className="w-full  flex justify-center ">
  <div className="flipbook-wrapper">
      <HTMLFlipBook
        width={270}
        height={350}
        maxShadowOpacity={0.5}
        drawShadow={true}
        size="fixed"
        style={{zIndex: 0}}
      >
        {/* Page 1 */}
        <div className="custom-scroll flex flex-col justify-center items-center p-5 bg-gradient-to-br from-yellow-100 via-pink-200 to-purple-300 rounded-sm overflow-y-scroll page">
          <p className="text-base text-gray-700 whitespace-pre-line">{data[active].page1}</p>
          <p className="text-sm text-gray-500 text-center mt-2">- 1 -</p>
        </div>

        {/* Page 2 */}
        <div className="custom-scroll overflow-y-scroll flex flex-col justify-center items-center p-5 bg-gradient-to-tr from-green-100 via-lime-200 to-emerald-300 rounded-sm page">
          <p className="text-base text-gray-700 whitespace-pre-line">{data[active].page2}</p>
          <p className="text-sm text-gray-500 text-center mt-2">- 2 -</p>
        </div>

        {/* Page 3 */}
        <div className="custom-scroll flex flex-col justify-center items-center p-5 bg-gradient-to-bl from-sky-100 via-blue-200 to-indigo-300 rounded-sm page">
          <p className="text-base text-gray-700 whitespace-pre-line">{data[active].page3}</p>
          <p className="text-sm text-gray-500 text-center mt-2">- 3 -</p>
        </div>

        {/* Page 4 */}
        <div className="custom-scroll flex flex-col justify-center items-center p-5 bg-gradient-to-r from-pink-100 via-rose-200 to-red-300 rounded-sm page">
          <p className="text-base text-gray-700 whitespace-pre-line">{data[active].page4}</p>
          <p className="text-sm text-gray-500 text-center mt-2">- 4 -</p>
        </div>

        {/* Page 5 */}
        <div className="custom-scroll flex flex-col justify-center items-center p-5 bg-gradient-to-tl from-orange-100 via-amber-200 to-yellow-300 rounded-sm">
          <p className="text-base text-gray-700 whitespace-pre-line page">{data[active].page5}</p>
          <p className="text-sm text-gray-500 text-center mt-2">- 5 -</p>
        </div>

        {/* Page 6 */}
        <div className="custom-scroll flex flex-col justify-center items-center p-5 bg-gradient-to-b from-purple-100 via-violet-200 to-fuchsia-300 rounded-sm page">
          <p className="text-base text-gray-700 whitespace-pre-line">{data[active].page6}</p>
          <p className="text-sm text-gray-500 text-center mt-2">- 6 -</p>
        </div>
      </HTMLFlipBook>
    </div>
    </div>
  </div>
  );
};

export default Book;
