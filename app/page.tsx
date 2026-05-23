"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { weeklyMakeupData } from "@/lib/data";
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  Droplet,
  Star,
  Wand2,
  ArrowRight,
} from "lucide-react";

function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const slideshowImages = weeklyMakeupData.map((d) => d.image);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % slideshowImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-end items-center pb-24 overflow-hidden bg-stone-950">
      {/* Background Slideshow */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIdx}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.7, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slideshowImages[currentImageIdx]}
            alt="Makeup Background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Modern 3D Icon */}
          <div className="w-24 h-24 mb-8 rounded-[2rem] bg-gradient-to-br from-rose-200 via-rose-400 to-rose-600 flex items-center justify-center border border-white/40 shadow-[inset_0_4px_16px_rgba(255,255,255,0.7),_0_20px_40px_rgba(244,63,94,0.4)] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-[2rem]"></div>
            <Sparkles
              className="w-12 h-12 text-white drop-shadow-[0_2px_4px_rgba(159,18,57,0.5)] relative z-10"
              strokeWidth={1.5}
            />
          </div>

          <h1
            className="font-serif text-5xl md:text-7xl font-bold tracking-widest text-white mb-4 uppercase"
            style={{
              textShadow:
                "0 0 30px rgba(244, 63, 94, 0.6), 0 0 60px rgba(251, 113, 133, 0.4)",
            }}
          >
            MAKEUP
          </h1>

          <p className="font-sans text-rose-200/90 tracking-wide text-sm md:text-base max-w-sm mb-12">
            Descubra a sua beleza todos os dias com inspirações diárias
            exclusivas.
          </p>

          <button
            onClick={onEnter}
            className="group flex items-center gap-3 bg-white text-stone-950 px-8 py-4 rounded-full font-medium tracking-wide hover:bg-rose-50 transition-all shadow-[0_0_40px_rgba(244,63,94,0.3)] hover:shadow-[0_0_60px_rgba(244,63,94,0.5)] active:scale-95"
          >
            ENTRAR
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);
  const [realDayIdx, setRealDayIdx] = useState<number>(-1);
  const activeDayRef = useRef<HTMLButtonElement>(null);

  // set initial day based on current JS Date
  useEffect(() => {
    const jsDay = new Date().getDay(); // 0 is Sunday, 1 is Monday
    // Find index of the day in weeklyMakeupData
    const idx = weeklyMakeupData.findIndex((d) => d.dayNumber === jsDay);
    if (idx !== -1) {
      setActiveDayIdx(idx);
      setRealDayIdx(idx);
    }
  }, []);

  useEffect(() => {
    if (hasEntered && activeDayRef.current) {
      activeDayRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeDayIdx, hasEntered]);

  if (!hasEntered) {
    return <WelcomeScreen onEnter={() => setHasEntered(true)} />;
  }

  const activeMakeup = weeklyMakeupData[activeDayIdx];

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <header className="bg-white px-6 py-8 shadow-sm text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-3 tracking-tight">
          Make Todo Dia
        </h1>
        <p className="text-stone-500 font-sans text-sm md:text-base max-w-xl mx-auto">
          Dicas fáceis de maquiagem para todos os dias da semana, com produtos
          corriqueiros e acessíveis.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* Days Navigator */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm ring-1 ring-stone-100 mx-auto w-max max-w-full">
          {weeklyMakeupData.map((item, index) => {
            const isActive = activeDayIdx === index;
            const isToday = realDayIdx === index;
            return (
              <button
                key={item.id}
                ref={isActive ? activeDayRef : null}
                onClick={() => setActiveDayIdx(index)}
                className={`shrink-0 flex flex-col items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-rose-200 to-rose-300 text-rose-950 shadow-sm"
                      : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                  }
                  ${
                    isToday && !isActive
                      ? "ring-2 ring-rose-200 bg-rose-50/50"
                      : ""
                  }
                `}
              >
                <span>{item.day}</span>
                {isToday && (
                  <span
                    className={`text-[10px] leading-tight ${isActive ? "text-rose-800" : "text-rose-500"} font-bold tracking-widest uppercase`}
                  >
                    Hoje
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMakeup.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            {/* Image / Hero of the day */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src={activeMakeup.image}
                  alt={activeMakeup.theme}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="font-serif text-3xl mb-1">
                    {activeMakeup.theme}
                  </h2>
                  <p className="text-white/90 text-sm">{activeMakeup.day}</p>
                </div>
              </div>

              {/* Video Embbed */}
              <div className="bg-white p-2 rounded-3xl shadow-sm ring-1 ring-stone-100">
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-100">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeMakeup.videoId}`}
                    title="Video Tutorial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="bg-rose-50 p-6 rounded-3xl text-rose-900 border border-rose-100">
                <h3 className="font-medium flex items-center gap-2 mb-2 font-serif text-xl">
                  <Droplet className="w-5 h-5" /> Produtos Sugeridos
                </h3>
                <ul className="space-y-2 mt-4 text-sm max-w-sm">
                  {activeMakeup.products.map((prod, i) => (
                    <li key={i} className="flex gap-2 items-start opacity-90">
                      <span className="shrink-0 mt-1">•</span>
                      <span>{prod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Steps & Description */}
            <div className="md:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-sm ring-1 ring-stone-100">
              <div className="mb-8">
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-500 shrink-0" />
                  <span>Proposta do Dia: {activeMakeup.theme}</span>
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                  {activeMakeup.description}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-rose-500 shrink-0" />
                  Passo a Passo
                </h3>
                <div className="space-y-6">
                  {activeMakeup.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start group">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm group-hover:bg-rose-500 group-hover:text-white transition-colors">
                        {idx + 1}
                      </div>
                      <p className="text-stone-700 leading-relaxed text-sm md:text-base pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Encouragement */}
              <div className="mt-10 pt-6 border-t border-stone-100 flex items-center gap-3 text-stone-500 text-sm">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>
                  Lembre-se: Você é linda de qualquer jeito. A maquiagem é só
                  para realçar!
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Hide scrollbar styles without adding a css file */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </div>
  );
}
