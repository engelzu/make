"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image"; // trigger redeploy timestamp
import { motion, AnimatePresence } from "motion/react";
import { belezaData, peleData, cabeloData, saudeData, horoscopoData, achadinhosData } from "@/lib/data";
import { getHoroscopeForSign } from "@/lib/horoscope-generator";
import Constellation from "@/components/Constellation";
import ColorQuiz from "@/components/ColorQuiz";
import {
  Calendar,
  Sparkles,
  Droplet,
  ArrowRight,
  Heart,
  User,
  Palette,
  Droplets,
  Shirt,
  X,
  Menu,
  Activity,
  Apple,
  Wind,
  HomeIcon,
  Volume2,
  VolumeX,
  Star,
  Briefcase,
  ShoppingBag
} from "lucide-react";

const colorNames: Record<string, string> = {
  "#EF4444": "Vermelho Intenso",
  "#F59E0B": "Dourado Solar",
  "#10B981": "Verde Esmeralda",
  "#3B82F6": "Azul Safira",
  "#8B5CF6": "Roxo Místico",
  "#EC4899": "Rosa Pink",
  "#F43F5E": "Rosa Rose",
  "#14B8A6": "Turquesa",
  "#F97316": "Laranja Vibrante",
  "#6366F1": "Índigo Profundo",
  "#D946EF": "Fuchsia",
  "#06B6D4": "Ciano Claro",
  "#EAB308": "Amarelo Ouro",
  "#1E40AF": "Azul Marinho",
  "#4C1D95": "Roxo Escuro",
  "#BE123C": "Vinho Carmim",
  "#15803D": "Verde Floresta",
  "#C2410C": "Terracota",
  "#9333EA": "Roxo Violeta",
  "#0F766E": "Verde Petróleo",
  "#1F2937": "Cinza Escuro",
  "#000000": "Preto Clássico",
  "#FFFFFF": "Branco Puro",
  "#D1D5DB": "Cinza Claro",
  "#A7F3D0": "Verde Menta",
  "#FEF3C7": "Amarelo Pastel",
  "#F5F5DC": "Bege",
  "#D2B48C": "Caramelo",
  "#1E3A8A": "Azul Royal",
  "#E11D48": "Vermelho Rosado",
  "#D8B4E2": "Lavanda",
  "#4B5563": "Cinza Chumbo",
  "#F3F4F6": "Off-White",
  "#7F1D1D": "Vermelho Escuro",
  "#FDE047": "Amarelo Claro",
  "#C0C0C0": "Prata",
  "#0284C7": "Azul Celeste"
};

const allCategories = {
  beleza: { id: "beleza", name: "Beauty Match", icon: Sparkles, data: belezaData },
  pele: { id: "pele", name: "Glow do Dia", icon: Droplets, data: peleData },
  cabelo: { id: "cabelo", name: "Trend Radar", icon: Wind, data: cabeloData },
  saude: { id: "saude", name: "Mood Wellness", icon: Activity, data: saudeData },
  horoscopo: { id: "horoscopo", name: "Make Astral", icon: Star, data: horoscopoData },
  achadinhos: { id: "achadinhos", name: "Achadinhos", icon: ShoppingBag, data: achadinhosData as any[] },
} as const;

type CategoryId = keyof typeof allCategories;

function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [weatherMsg, setWeatherMsg] = useState("");
  const slideshowImages = belezaData.map((d) => d.image);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const ipRes = await fetch("https://freeipapi.com/api/json");
        const ipData = await ipRes.json();
        if (ipData.latitude && ipData.longitude) {
          const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ipData.latitude}&longitude=${ipData.longitude}&current_weather=true`);
          const wData = await weatherRes.json();
          const temp = wData.current_weather.temperature;
          const code = wData.current_weather.weathercode;
          
          let msg = `🌡️ ${Math.round(temp)}°C em ${ipData.cityName}: `;
          if (temp < 20) {
            msg += "Clima frio, aposte em looks quentinhos e hidratação extra na pele!";
          } else if (temp > 28) {
            msg += "Calor! Abuse do protetor solar e makes leves à prova de suor.";
          } else {
            msg += "Clima agradável, perfeito para looks criativos e pele glow.";
          }
          
          // Códigos de chuva no OpenMeteo
          if ([61, 63, 65, 80, 81, 82].includes(code)) {
            msg = `🌧️ ${Math.round(temp)}°C em ${ipData.cityName}: Chovendo! Make à prova d'água e look cozy.`;
          }
          setWeatherMsg(msg);
        }
      } catch (e) {
        // Silently fail if adblocker blocks the API or rate limit hit
      }
    }
    fetchWeather();
  }, []);

  const hour = new Date().getHours();
  let suggestion = "Pronta para o seu Skincare Matinal e look do dia?";
  if (hour >= 12 && hour < 18) {
    suggestion = "Hora de renovar a energia e dar aquele retoque na Make.";
  } else if (hour >= 18) {
    suggestion = "Momento ideal para seu Skincare Noturno e relaxamento.";
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-end items-center pb-20 overflow-hidden bg-stone-950">
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

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          {weatherMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium"
            >
              {weatherMsg}
            </motion.div>
          )}

          <div className="relative inline-block mb-4">
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-widest text-white uppercase" 
              style={{ textShadow: "0 0 30px rgba(244, 63, 94, 0.6), 0 0 60px rgba(251, 113, 133, 0.4)" }}>
              ESTILO
            </h1>
          </div>

          <p className="font-sans text-rose-100/80 tracking-wide text-sm md:text-base max-w-sm mb-10">
            {suggestion}
          </p>

          <button
            onClick={onEnter}
            className="group flex items-center gap-3 bg-white text-stone-950 px-8 py-4 rounded-full font-medium tracking-wide hover:bg-rose-50 transition-all shadow-[0_0_40px_rgba(244,63,94,0.3)] hover:shadow-[0_0_60px_rgba(244,63,94,0.5)] active:scale-95"
          >
            ENTRAR NO GUIA
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("beleza");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeDataList = allCategories[activeCategory].data;

  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);
  const [realDayIdx, setRealDayIdx] = useState<number>(-1);
  const activeDayRef = useRef<HTMLButtonElement>(null);

  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [selectedSign, setSelectedSign] = useState<string>("Áries");
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState<number>(-1);
  const [glowPoints, setGlowPoints] = useState<number>(0);


  const [isNight, setIsNight] = useState<boolean>(true);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [userPalette, setUserPalette] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().getDay();
    setActiveDayIdx(today);
    setRealDayIdx(today);
    
    // Check local storage for glow points and favorites
    try {
      const savedFavs = localStorage.getItem('makeFavs');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      
      const savedGlow = localStorage.getItem('glowPoints');
      if (savedGlow) setGlowPoints(parseInt(savedGlow));
      
      const savedPalette = localStorage.getItem('userPalette');
      if (savedPalette) setUserPalette(savedPalette);
    } catch (e) {}

    // Set Day/Night mode
    const hour = new Date().getHours();
    setIsNight(hour >= 18 || hour < 6);

    // Registra o Service Worker para transformar em PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW Registrado'))
        .catch((err) => console.log('SW Erro:', err));
    }
  }, []);

  const addGlowPoints = (points: number) => {
    setGlowPoints(prev => {
      const newPoints = prev + points;
      try { localStorage.setItem('glowPoints', newPoints.toString()); } catch(e) {}
      return newPoints;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      const jsDay = new Date().getDay();
      const idx = belezaData.findIndex((d: any) => d.dayNumber === jsDay);
      if (idx !== -1) {
        setActiveDayIdx(idx);
        setRealDayIdx(idx);
      }
    }, 0);
    
    const storedFavs = localStorage.getItem("dailyStyleFavoritesV2");
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs));
      } catch (e) {
        console.error("Error loading favorites", e);
      }
    }
  }, []);

  useEffect(() => {
    if (hasEntered && activeDayRef.current && activeTab !== "favoritos") {
      activeDayRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeDayIdx, hasEntered, activeTab]);

  useEffect(() => {
    setActiveTab("tab1");
  }, [activeCategory]);

  // Limpa o áudio ao trocar de aba ou desmontar
  useEffect(() => {
    stopVoice();
    return () => stopVoice();
  }, [activeCategory, activeTab, activeDayIdx]);

  // Carrega as vozes nativas do navegador
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const stopVoice = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentSpeakingIndex(-1);
  };

  const playVoice = (textList: string[]) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isPlaying) {
      stopVoice();
      return;
    }
    
    setIsPlaying(true);
    addGlowPoints(10); // Gamification
    isPlayingRef.current = true;
    
    // Interrompe qualquer áudio travado e zera timeouts
    window.speechSynthesis.cancel();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Filtra vozes brasileiras
    const voices = window.speechSynthesis.getVoices();
    const ptVoices = voices.filter(v => v.lang.includes("pt-BR") || v.lang.includes("pt_BR"));
    
    // Tenta forçar as vozes "Neurais/Naturais" que são perfeitas
    let bestVoice = ptVoices.find(v => v.name.includes("Francisca") && v.name.includes("Online")); // Edge
    if (!bestVoice) bestVoice = ptVoices.find(v => v.name.includes("Online") || v.name.includes("Natural") || v.name.includes("Google")); // Chrome/Edge Neural
    if (!bestVoice) bestVoice = ptVoices.find(v => v.name.includes("Luciana")); // Fallback Windows
    
    let index = 0;

    const speakNext = () => {
      if (!isPlayingRef.current) {
        setIsPlaying(false);
        setCurrentSpeakingIndex(-1);
        return;
      }

      // Se passou do último, reinicia o loop
      if (index >= textList.length) {
        index = 0;
      }
      
      setCurrentSpeakingIndex(index);
      
      const utterance = new SpeechSynthesisUtterance(textList[index]);
      utteranceRef.current = utterance; // Previne que o Garbage Collector mate o áudio no Chrome
      utterance.lang = "pt-BR";
      utterance.rate = 1.25; 
      utterance.pitch = 1.1; 
      
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onend = () => {
        index++;
        // Pausa maior (2s) antes de recomeçar o loop, ou 800ms entre os passos normais
        const delay = index >= textList.length ? 2500 : 800;
        
        timeoutRef.current = setTimeout(() => {
          speakNext();
        }, delay);
      };
      
      utterance.onerror = (e) => {
        // Ignorar erros normais de interrupção quando o usuário clica em "Parar"
        if (e.error === "canceled" || e.error === "interrupted") {
          return;
        }
        console.error("Erro na síntese:", e);
        setIsPlaying(false);
        isPlayingRef.current = false;
        setCurrentSpeakingIndex(-1);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  const toggleFavorite = (uid: string) => {
    let newFavs;
    if (favorites.includes(uid)) {
      newFavs = favorites.filter((f) => f !== uid);
    } else {
      newFavs = [...favorites, uid];
    }
    setFavorites(newFavs);
    localStorage.setItem("dailyStyleFavoritesV2", JSON.stringify(newFavs));
  };

  if (!hasEntered) {
    return <WelcomeScreen onEnter={() => setHasEntered(true)} />;
  }

  const activeData: any = activeDataList?.[activeDayIdx] || null;
  const uniqueId = activeData ? `${activeCategory}-${activeData.id}` : `${activeCategory}-none`;
  const isFavorite = favorites.includes(uniqueId);

  // Dynamic Tabs Configuration
  const getTabsConfig = () => {
    if (activeCategory === "beleza") return [
      { id: "tab1", label: "Make", icon: Sparkles },
      { id: "tab2", label: "Look", icon: Shirt },
      { id: "tab3", label: "Unhas", icon: Palette },
      { id: "favoritos", label: "Salvos", icon: Heart },
    ];
    if (activeCategory === "pele") return [
      { id: "tab1", label: "Rotina Diária", icon: Droplets },
      { id: "tab2", label: "Máscaras", icon: Sparkles },
      { id: "favoritos", label: "Salvos", icon: Heart },
    ];
    if (activeCategory === "cabelo") return [
      { id: "tab1", label: "Penteado", icon: User },
      { id: "tab2", label: "Tratamento", icon: Droplet },
      { id: "favoritos", label: "Salvos", icon: Heart },
    ];
    if (activeCategory === "saude") return [
      { id: "tab1", label: "Corpo", icon: Activity },
      { id: "tab2", label: "Nutrição", icon: Apple },
      { id: "tab3", label: "Mente", icon: Wind },
      { id: "favoritos", label: "Salvos", icon: Heart },
    ];
    if (activeCategory === "horoscopo") return [
      { id: "tab1", label: "Make de Hoje", icon: Sparkles },
      { id: "tab2", label: "Cor e Unha", icon: Palette },
      { id: "tab3", label: "Look Astral", icon: Shirt },
      { id: "favoritos", label: "Salvos", icon: Heart },
    ];
    if (activeCategory === "achadinhos") return [
      { id: "tab1", label: "Dupes", icon: ShoppingBag },
      { id: "favoritos", label: "Salvos", icon: Heart },
    ];
    return [];
  };

  const tabsConfig = getTabsConfig();

  // Helper renderer for steps
  const renderSteps = (steps: string[]) => (
    <div className="space-y-6">
      {steps.map((step, i) => {
        const isSpeakingThisStep = currentSpeakingIndex === i;
        return (
          <div key={i} className={`flex gap-4 transition-all duration-500 ${isSpeakingThisStep ? "scale-[1.02]" : ""}`}>
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold shrink-0 mt-0.5 transition-all duration-300
              ${isSpeakingThisStep ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200 animate-[pulse_2s_ease-in-out_infinite]" : "bg-white border-stone-100/80 shadow-[0_4px_10px_rgba(0,0,0,0.05)] text-rose-500"}
            `}>
              {i + 1}
            </div>
            <p className={`leading-relaxed pt-1 transition-colors duration-300 ${isSpeakingThisStep ? "text-stone-900 font-medium" : "text-stone-600"}`}>
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`min-h-screen pb-28 transition-colors duration-1000 ${isNight ? "bg-stone-900 text-stone-100" : "bg-stone-50 text-stone-900"}`}>
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/40 z-[60] backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">Mundos</h2>
                <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Seu Universo</p>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-stone-400 hover:text-stone-900 bg-stone-50 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-2">
              <button 
                onClick={() => { setHasEntered(false); setIsMenuOpen(false); }}
                className="group w-full flex items-center gap-4 px-4 py-3 mx-2 rounded-2xl transition-all duration-300 hover:bg-stone-50 active:bg-stone-100"
                style={{ width: 'calc(100% - 16px)' }}
              >
                <div className="p-2.5 rounded-xl transition-all duration-300 bg-gradient-to-b from-white to-stone-50 border border-stone-100 border-t-white shadow-[0_2px_6px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,1)] text-stone-400 group-hover:shadow-[0_4px_10px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,1)] group-active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.05)] group-active:bg-stone-100 group-hover:text-stone-600">
                  <HomeIcon className="w-5 h-5 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)]" strokeWidth={2.5} />
                </div>
                <span className="font-medium transition-colors duration-300 text-stone-500 group-hover:text-stone-800">Tela Inicial</span>
              </button>
              
              <div className="h-px bg-stone-100 my-2 mx-2" />

              {(Object.keys(allCategories) as CategoryId[]).map((id) => {
                const Icon = allCategories[id].icon;
                const name = allCategories[id].name;
                return (
                  <button
                    key={id}
                    onClick={() => { setActiveCategory(id as CategoryId); setActiveTab("tab1"); setIsMenuOpen(false); }}
                    className={`group w-full flex items-center gap-4 px-4 py-3 mx-2 rounded-2xl transition-all duration-300 ${activeCategory === id && activeTab !== "favoritos" ? "bg-white shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] border border-stone-100/80 scale-[1.02]" : "hover:bg-stone-50 active:bg-stone-100"}`}
                    style={{ width: 'calc(100% - 16px)' }}
                  >
                    <div className={`p-2.5 rounded-xl transition-all duration-300 ${activeCategory === id && activeTab !== "favoritos" ? "bg-gradient-to-b from-white to-rose-50 border border-rose-100 border-t-white shadow-[0_4px_12px_rgba(225,29,72,0.15),inset_0_2px_4px_rgba(255,255,255,1)] text-rose-500" : "bg-gradient-to-b from-white to-stone-50 border border-stone-100 border-t-white shadow-[0_2px_6px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,1)] text-stone-400 group-hover:shadow-[0_4px_10px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,1)] group-active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.05)] group-active:bg-stone-100 group-hover:text-stone-600"}`}>
                      <Icon className={`w-5 h-5 ${activeCategory === id && activeTab !== "favoritos" ? "drop-shadow-[0_2px_3px_rgba(225,29,72,0.4)]" : "drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)]"}`} strokeWidth={2.5} />
                    </div>
                    <span className={`font-medium transition-colors duration-300 ${activeCategory === id && activeTab !== "favoritos" ? "text-stone-900" : "text-stone-500 group-hover:text-stone-800"}`}>
                      {name}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className={`${isNight ? "bg-stone-950 border-b border-stone-800" : "bg-white shadow-sm"} px-6 py-4 flex items-center justify-between sticky top-0 z-20 transition-colors duration-1000`}>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className={`p-2 -ml-2 rounded-full transition-colors ${isNight ? "text-stone-300 hover:bg-stone-800" : "text-stone-600 hover:bg-stone-100"}`}>
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className={`font-serif text-xl md:text-2xl tracking-tight ${isNight ? "text-white" : "text-stone-900"}`}>{allCategories[activeCategory].name}</h1>
            <p className={`font-sans text-xs ${isNight ? "text-stone-400" : "text-stone-500"}`}>Seu guia diário</p>
          </div>
        </div>
        
        {/* Glow Points Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${isNight ? "bg-stone-900/50 border-stone-800" : "bg-rose-50/50 border-rose-100"}`}>
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span className={`text-xs font-bold ${isNight ? "text-rose-300" : "text-rose-600"}`}>{glowPoints} Glow</span>
        </div>
        {activeTab !== "favoritos" && (
          <button 
            onClick={() => toggleFavorite(uniqueId)}
            className={`p-3 rounded-full transition-all active:scale-95 shadow-sm border ${isFavorite ? "bg-rose-50 border-rose-200 text-rose-500" : "bg-white border-stone-200 text-stone-400 hover:text-rose-400"}`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-rose-500" : ""}`} />
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 mt-6 relative">
        
        {activeTab === "favoritos" ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> Meus Favoritos
            </h2>
            {favorites.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm">
                <Heart className="w-12 h-12 text-stone-200 mx-auto mb-4" />
                <p className="text-stone-500">Você ainda não salvou nenhum estilo.</p>
                <button 
                  onClick={() => setActiveTab("tab1")}
                  className="mt-4 text-rose-500 font-medium hover:underline"
                >
                  Voltar e explorar
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favorites.map(favId => {
                  const [cat, idStr] = favId.split("-");
                  const favItem: any = allCategories[cat as CategoryId].data.find(d => d.id.toString() === idStr);
                  if (!favItem) return null;
                  return (
                    <div key={favId} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex gap-4 items-center">
                      <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
                        <Image src={favItem.image} alt={favItem.theme} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1">{allCategories[cat as CategoryId].name} • {favItem.day}</p>
                        <h3 className="font-serif text-base text-stone-900 leading-tight mb-2">{favItem.theme}</h3>
                        <button 
                          onClick={() => {
                            setActiveCategory(cat as CategoryId);
                            setActiveDayIdx(allCategories[cat as CategoryId].data.findIndex(d => d.id === favItem.id));
                            setActiveTab("tab1");
                          }}
                          className="text-xs bg-stone-100 text-stone-600 px-3 py-1.5 rounded-full hover:bg-stone-200"
                        >
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Days Navigator */}
            <div className="w-full max-w-sm mx-auto mb-8 px-4">
                <div className={`flex overflow-x-auto hide-scrollbar gap-1 p-1 rounded-full shadow-sm border mx-auto w-full backdrop-blur-md ${isNight ? "bg-stone-900/50 border-stone-800" : "bg-stone-50/80 border-stone-200/50"}`}>
                  {activeDataList.map((item: any, index: number) => {
                    const isActive = activeDayIdx === index;
                    const isToday = realDayIdx === index;
                    return (
                      <button
                        key={item.id}
                        ref={isActive ? activeDayRef : null}
                        onClick={() => setActiveDayIdx(index)}
                        className={`shrink-0 flex flex-col items-center justify-center px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                          ${isActive 
                            ? (isNight ? "bg-stone-800 text-rose-400 shadow-md border border-stone-700" : "bg-white text-rose-600 shadow-md border border-stone-100") 
                            : (isNight ? "text-stone-400 hover:bg-stone-800/50" : "text-stone-500 hover:bg-stone-200/50")}
                        `}
                      >
                        <span>{item.day}</span>
                        {isToday && (
                          <span className={`text-[8px] leading-tight mt-0.5 ${isActive ? "text-rose-500" : "text-stone-400"} font-bold tracking-widest uppercase`}>
                            Hoje
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${uniqueId}-${activeTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6"
              >
                {/* Hero / Media Section */}
                <div className="md:col-span-5 flex flex-col gap-4">
                  
                  {/* Hero Image - ALWAYS RENDERED now! */}
                  <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-stone-950">
                    {activeCategory === "horoscopo" ? (
                      <Constellation sign={selectedSign} />
                    ) : (
                      (() => {
                        const dynamicTabImages: Record<string, Record<string, string[]>> = {
                          beleza: {
                            tab1: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"],
                            tab2: [
                              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", 
                              "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
                              "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=800&auto=format&fit=crop",
                              "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=800&auto=format&fit=crop",
                              "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop",
                              "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
                              "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop"
                            ],
                            tab3: ["https://images.unsplash.com/photo-1519415943484-9fa1873496d4?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=800&auto=format&fit=crop"]
                          },
                          pele: {
                            tab1: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop"],
                            tab2: ["https://images.unsplash.com/photo-1500336624523-d727130c3328?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop"]
                          },
                          cabelo: {
                            tab1: ["https://images.pexels.com/photos/2799605/pexels-photo-2799605.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/3356170/pexels-photo-3356170.jpeg?auto=compress&cs=tinysrgb&w=800"],
                            tab2: ["https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/2799605/pexels-photo-2799605.jpeg?auto=compress&cs=tinysrgb&w=800"]
                          },
                          saude: {
                            tab1: ["https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"],
                            tab2: [
                              "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=800&auto=format&fit=crop",
                              "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
                              "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop",
                              "https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=800&auto=format&fit=crop",
                              "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop",
                              "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=800&auto=format&fit=crop",
                              "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop"
                            ],
                            tab3: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"]
                          }
                        };
                        
                        let displayImage = activeData.image;
                        if (dynamicTabImages[activeCategory] && dynamicTabImages[activeCategory][activeTab]) {
                          const pool = dynamicTabImages[activeCategory][activeTab];
                          displayImage = pool[activeDayIdx % pool.length];
                        }

                        return <Image src={displayImage} alt={activeData.theme} fill className="object-cover" referrerPolicy="no-referrer" />;
                      })()
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-2 inline-block">{allCategories[activeCategory].name}</span>
                      <h2 className="font-serif text-3xl mb-1">
                        {activeCategory === "beleza" && activeTab === "tab2" ? "Look do Dia" : 
                         activeCategory === "beleza" && activeTab === "tab3" ? "Unhas da Semana" :
                         activeData.theme}
                      </h2>
                    </div>
                  </div>

                  {/* Video Embbed - HIDDEN on Beleza -> Look or Unhas, and HIDDEN on Horoscopo and Achadinhos */}
                  {!(activeCategory === "beleza" && (activeTab === "tab2" || activeTab === "tab3")) && activeCategory !== "horoscopo" && activeCategory !== "achadinhos" && (
                    <div className="bg-white p-2 rounded-3xl shadow-sm ring-1 ring-stone-100">
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-100">
                        {(() => {
                          let vidId = "";
                          if (activeCategory === "beleza") vidId = activeData.videoId;
                          if (activeCategory === "pele") vidId = activeTab === "tab1" ? activeData.rotina.videoId : activeData.mascaras.videoId;
                          if (activeCategory === "cabelo") vidId = activeTab === "tab1" ? activeData.penteado.videoId : activeData.tratamento.videoId;
                          if (activeCategory === "saude") {
                            if (activeTab === "tab1") vidId = activeData.exercicio.videoId;
                            if (activeTab === "tab2") vidId = activeData.alimentacao.videoId;
                            if (activeTab === "tab3") vidId = activeData.relaxamento.videoId;
                          }
                          return (
                            <iframe
                              className="w-full h-full"
                              src={`https://www.youtube.com/embed/${vidId}?controls=1&rel=0&loop=1&playlist=${vidId}`}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Horoscope Sign Image */}
                  {activeCategory === "horoscopo" && (
                    <div className="bg-white p-2 rounded-3xl shadow-sm ring-1 ring-stone-100">
                      <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-100 relative">
                        {(() => {
                          const fire = ["Áries", "Leão", "Sagitário"];
                          const earth = ["Touro", "Virgem", "Capricórnio"];
                          const air = ["Gêmeos", "Libra", "Aquário"];
                          const water = ["Câncer", "Escorpião", "Peixes"];
                          
                          let src = "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?q=80&w=800&auto=format&fit=crop";
                          if (fire.includes(selectedSign)) src = "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop";
                          if (earth.includes(selectedSign)) src = "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?q=80&w=800&auto=format&fit=crop";
                          if (air.includes(selectedSign)) src = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop";
                          if (water.includes(selectedSign)) src = "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop";
                          
                          const zodiacSymbols: Record<string, string> = {
                            "Áries": "\u2648\uFE0E", "Touro": "\u2649\uFE0E", "Gêmeos": "\u264A\uFE0E", "Câncer": "\u264B\uFE0E", 
                            "Leão": "\u264C\uFE0E", "Virgem": "\u264D\uFE0E", "Libra": "\u264E\uFE0E", "Escorpião": "\u264F\uFE0E", 
                            "Sagitário": "\u2650\uFE0E", "Capricórnio": "\u2651\uFE0E", "Aquário": "\u2652\uFE0E", "Peixes": "\u2653\uFE0E"
                          };

                          return (
                            <>
                              <Image src={src} alt={selectedSign} fill className="object-cover" />
                              <div className="absolute inset-0 bg-stone-900/50 flex flex-col items-center justify-center gap-2">
                                <span className="text-rose-200/90 text-6xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans">{zodiacSymbols[selectedSign]}</span>
                                <h4 className="text-white font-serif text-3xl font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{selectedSign}</h4>
                              </div>
                            </>
                          )
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Produtos/Extras - HIDDEN on Beleza -> Look or Unhas, and HIDDEN on Horoscopo */}
                  {!(activeCategory === "beleza" && (activeTab === "tab2" || activeTab === "tab3")) && activeCategory !== "horoscopo" && (
                    <div className="bg-white p-6 rounded-3xl text-stone-900 border border-stone-100 shadow-sm">
                      {(() => {
                        let title = "O que você vai precisar";
                        let items: string[] = [];
                        if (activeCategory === "beleza" && activeTab === "tab1") items = activeData.products;
                        if (activeCategory === "pele") items = activeTab === "tab1" ? activeData.rotina.products : activeData.mascaras.products;
                        if (activeCategory === "cabelo") items = activeTab === "tab1" ? activeData.penteado.products : activeData.tratamento.products;
                        if (activeCategory === "saude") {
                          if (activeTab === "tab1") return <p className="font-medium text-rose-500">Duração: {activeData.exercicio.duration}</p>;
                          if (activeTab === "tab2") return <p className="font-medium text-rose-500">Receita: {activeData.alimentacao.recipe}</p>;
                          if (activeTab === "tab3") return <p className="font-medium text-rose-500">Dica: Um ambiente tranquilo é essencial.</p>;
                        }
                        
                        if (!items || items.length === 0) return <p className="text-stone-500 text-sm">Nenhum produto extra necessário.</p>;
                        return (
                          <>
                            <h3 className="font-medium font-serif text-lg mb-4">{title}</h3>
                            <ul className="space-y-2 text-sm text-stone-600">
                              {items.map((it, i) => <li key={i} className="flex gap-2"><span>•</span> {it}</li>)}
                            </ul>
                          </>
                        )
                      })()}
                    </div>
                  )}
                </div>

                {/* Steps & Description Section */}
                <div className="md:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-sm ring-1 ring-stone-100">
                  <div className="mb-8">
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                      {activeCategory === "beleza" && activeTab === "tab2" ? "Look do Dia" : 
                       activeCategory === "beleza" && activeTab === "tab3" ? "Unhas da Semana" :
                       activeData.theme}
                    </h3>
                    <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                      {activeCategory === "beleza" && activeTab === "tab2" 
                        ? "Sugerimos a paleta de cores perfeita para a sua roupa, feita para harmonizar com a maquiagem escolhida para hoje." 
                        : activeCategory === "beleza" && activeTab === "tab3"
                        ? "Confira a paleta de cores ideal para suas unhas, complementando todo o seu visual."
                        : activeData.description}
                    </p>
                    
                    {activeCategory === "horoscopo" && (
                      <div className="mt-6 flex gap-2 overflow-x-auto hide-scrollbar pb-2 pt-1">
                        {["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"].map(sign => (
                          <button
                            key={sign}
                            onClick={() => setSelectedSign(sign)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                              selectedSign === sign
                                ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                            }`}
                          >
                            {sign}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {activeCategory === "beleza" && activeTab === "tab1" && (
                      <div className={`mt-8 p-6 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center gap-4 justify-between ${isNight ? "bg-rose-900/20 border-rose-500/20" : "bg-rose-50 border-rose-100"}`}>
                        <div>
                          <h4 className={`font-serif text-xl font-bold flex items-center gap-2 mb-1 ${isNight ? "text-rose-300" : "text-rose-900"}`}>
                            <Sparkles className="w-5 h-5 text-rose-500" /> Coloração Pessoal
                          </h4>
                          <p className={`text-sm ${isNight ? "text-rose-200/70" : "text-rose-700/70"}`}>
                            {userPalette ? `Sua paleta é: ${userPalette}` : "Descubra quais cores harmonizam perfeitamente com você!"}
                          </p>
                        </div>
                        <button 
                          onClick={() => setIsQuizOpen(true)}
                          className="w-full sm:w-auto px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold uppercase tracking-wider text-xs transition-colors shadow-lg shadow-rose-500/30 whitespace-nowrap"
                        >
                          {userPalette ? "Refazer Teste" : "Fazer Teste Rápido"}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* If tab2 Beleza -> Show Look Colors entirely */}
                  {activeCategory === "beleza" && activeTab === "tab2" ? (
                    <div className="flex flex-col gap-10">
                      {/* Look Colors */}
                      <div>
                        <h3 className="font-serif text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                          <Shirt className="w-5 h-5 text-rose-500" /> Cores Sugeridas para a Roupa
                        </h3>
                        <div className="flex flex-wrap gap-4">
                          {activeData.outfitColors.map((color: string, idx: number) => (
                            <div key={idx} className="flex flex-col items-center gap-2">
                              <div className="w-20 h-20 rounded-full shadow-md border-2 border-white ring-1 ring-stone-200" style={{ backgroundColor: color }} />
                              <span className="text-sm text-stone-600 font-medium capitalize">{colorNames[color] || color}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : activeCategory === "beleza" && activeTab === "tab3" ? (
                    <div className="flex flex-col gap-10">
                      {/* Unhas 3D */}
                      <div>
                        <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 flex items-center gap-2">
                          <Palette className="w-5 h-5 text-rose-500" /> Unhas em 3D
                        </h3>
                        <p className="text-stone-500 text-sm mb-6">{activeData.nails.suggestion}</p>

                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-y-8 gap-x-4">
                          {activeData.nails.palette.map((color: string, idx: number) => (
                            <div key={idx} className="flex flex-col items-center group cursor-pointer" title={color}>
                              <div 
                                className="relative w-12 h-[5.5rem] rounded-t-full rounded-b-xl shadow-[inset_-5px_-3px_12px_rgba(0,0,0,0.3),_inset_4px_4px_10px_rgba(255,255,255,0.5),_0_6px_10px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 overflow-hidden" 
                                style={{ backgroundColor: color }}
                              >
                                <div className="absolute top-2 bottom-3 left-2 w-[0.35rem] rounded-full bg-gradient-to-b from-white/90 via-white/40 to-transparent blur-[0.5px] rotate-[1deg]"></div>
                                <div className="absolute top-[0.4rem] left-[0.4rem] w-[0.4rem] h-[1.2rem] rounded-full bg-white/90 blur-[0.5px] rotate-[-5deg]"></div>
                              </div>
                              <span className="mt-2 text-[10px] font-bold text-stone-500 uppercase tracking-wider">{color}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    ) : activeCategory === "achadinhos" ? (
                      <div className="flex flex-col gap-8">
                          <h3 className={`font-serif text-xl font-bold flex items-center gap-2 ${isNight ? "text-white" : "text-stone-900"}`}>
                            <ShoppingBag className="w-5 h-5 text-rose-500" /> Comparativo de Produtos
                          </h3>
                          <div className="flex flex-col md:flex-row gap-6">
                          {/* High End */}
                          <div className={`flex-1 p-5 rounded-3xl border shadow-sm relative overflow-hidden ${isNight ? "bg-stone-900 border-stone-800" : "bg-white border-stone-100"}`}>
                            <div className="absolute top-0 right-0 bg-stone-900 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase z-10 border-b border-l border-stone-700">Luxo</div>
                            <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-4 bg-stone-50">
                              <Image src={activeData.highEnd.image} alt="High End" fill className="object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <h4 className={`font-serif text-lg leading-tight ${isNight ? "text-stone-100" : "text-stone-900"}`}>{activeData.highEnd.name}</h4>
                            <p className={`text-xs uppercase tracking-wider mb-2 ${isNight ? "text-stone-400" : "text-stone-500"}`}>{activeData.highEnd.brand}</p>
                          </div>
                          {/* VS badge */}
                          <div className="hidden md:flex items-center justify-center -mx-4 z-10">
                            <div className="bg-rose-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg ring-4 ring-stone-50">VS</div>
                          </div>
                          {/* Drugstore */}
                          <div className={`flex-1 p-5 rounded-3xl border shadow-sm relative overflow-hidden ${isNight ? "bg-stone-800 border-rose-900/30" : "bg-rose-50 border-rose-100"}`}>
                            <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase z-10">Achadinho</div>
                            <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-4 bg-white">
                              <Image src={activeData.drugstore.image} alt="Drugstore" fill className="object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <h4 className={`font-serif text-lg leading-tight ${isNight ? "text-rose-100" : "text-rose-950"}`}>{activeData.drugstore.name}</h4>
                            <p className={`text-xs uppercase tracking-wider mb-2 ${isNight ? "text-rose-400" : "text-rose-600"}`}>{activeData.drugstore.brand}</p>
                          </div>
                        </div>
                        <p className={`text-center italic p-4 rounded-xl border shadow-sm ${isNight ? "bg-stone-900 border-stone-800 text-stone-300" : "bg-white border-stone-100 text-stone-600"}`}>
                          "{activeData.description}"
                        </p>
                      </div>
                    ) : (
                      <div>
                      {(() => {
                        let steps: string[] = [];
                        if (activeCategory === "beleza") steps = activeData.steps;
                        if (activeCategory === "pele") steps = activeTab === "tab1" ? activeData.rotina.steps : activeData.mascaras.steps;
                        if (activeCategory === "cabelo") steps = activeTab === "tab1" ? activeData.penteado.steps : activeData.tratamento.steps;
                        if (activeCategory === "saude") {
                          if (activeTab === "tab1") steps = activeData.exercicio.steps;
                          if (activeTab === "tab2") steps = activeData.alimentacao.steps;
                          if (activeTab === "tab3") steps = activeData.relaxamento.steps;
                        }
                        if (activeCategory === "horoscopo") {
                          const dynamicHoroscope = getHoroscopeForSign(selectedSign, activeDayIdx);
                          if (activeTab === "tab1") steps = [dynamicHoroscope.make];
                          if (activeTab === "tab2") steps = [dynamicHoroscope.cor];
                          if (activeTab === "tab3") steps = [dynamicHoroscope.look];
                        }
                        
                        return (
                          <>
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                                {activeCategory === "horoscopo" ? <Star className="w-5 h-5 text-rose-500 shrink-0" /> : <Calendar className="w-5 h-5 text-rose-500 shrink-0" />}
                                {activeCategory === "horoscopo" ? "Sua Previsão" : "Passo a Passo"}
                              </h3>
                              {steps && steps.length > 0 && (
                                <button 
                                  onClick={() => playVoice(steps)}
                                  className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isPlaying ? "bg-rose-500 text-white shadow-md shadow-rose-200" : "bg-rose-50 text-rose-600 hover:bg-rose-100"}`}
                                >
                                  {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                  <span className="hidden sm:inline">{isPlaying ? "Parar" : "Ouvir"}</span>
                                </button>
                              )}
                            </div>
                            {activeCategory === "horoscopo" ? (
                              <p className="text-stone-600 text-lg leading-relaxed">{steps[0]}</p>
                            ) : (
                              renderSteps(steps || [])
                            )}
                          </>
                        )
                      })()}
                    </div>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </>
        )}
      </main>

      {/* Botão Me Inspire Flutuante */}
      {hasEntered && (
        <button
          onClick={() => {
            const categories: CategoryId[] = ["beleza", "pele", "cabelo", "saude", "horoscopo"];
            const randomCat = categories[Math.floor(Math.random() * categories.length)];
            const dataLen = allCategories[randomCat].data.length;
            const randomDay = Math.floor(Math.random() * dataLen);
            setActiveCategory(randomCat);
            setActiveDayIdx(randomDay);
            setActiveTab("tab1");
            addGlowPoints(10); // Gamification
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed bottom-20 right-4 z-[45] bg-gradient-to-br from-rose-500 to-pink-500 text-white p-3 rounded-full shadow-[0_4px_20px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group md:right-6 md:bottom-24 md:px-5 md:py-3"
        >
          <Sparkles className="w-6 h-6 md:w-5 md:h-5 group-hover:animate-spin" />
          <span className="font-bold tracking-wide hidden md:inline">Me Inspire</span>
        </button>
      )}

      {/* Dynamic Bottom Navigation Menu */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 flex justify-between items-center z-50 md:max-w-md md:mx-auto md:rounded-t-3xl md:border-x">
        {tabsConfig.map(tab => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-rose-500" : "text-stone-400 hover:text-stone-600"}`}
            >
              <TabIcon className={`w-6 h-6 ${isActive && tab.id === "favoritos" ? "fill-rose-500" : ""}`} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </nav>

      <AnimatePresence>
        {isQuizOpen && (
          <ColorQuiz 
            onClose={() => setIsQuizOpen(false)} 
            onComplete={(res) => {
              setUserPalette(res);
              try { localStorage.setItem("userPalette", res); } catch(e) {}
            }} 
          />
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}} />
    </div>
  );
}
