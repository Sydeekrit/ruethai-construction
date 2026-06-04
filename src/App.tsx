import { useState, useEffect, useRef, ChangeEvent, FocusEvent, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Building2, Hexagon, HardHat, Home, Ruler, Phone, Mail, MapPin, ArrowRight, CheckCircle2, ChevronRight, DraftingCompass, Hammer, ArrowLeft, Maximize, Bed, Bath, Car, Sofa, Utensils, Coffee, FileText, ChevronLeft, ChevronDown, Filter, Search, VolumeX, Info, Key, ShieldCheck, Wrench, Trophy, Sparkles, MessageSquare, Layout as LayoutIcon, Map, Mountain, Users, Menu, X, Paintbrush, Handshake, ClipboardList, PenTool, CircleDollarSign, ClipboardCheck, Truck, HomeIcon, AlertCircle, Landmark, ZoomIn, ZoomOut, Layers, Camera, Navigation, RefreshCw, Sun, Moon, Pencil, Soup } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import MaterialListPage from './MaterialListPage';
import ServiceFeesPage from './ServiceFeesPage';
import SEO from './components/SEO';

const getOptimizedImageUrl = (url: string, width = 800, quality = 70): string => {
  if (!url) return '';
  if (url.includes('unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fm', 'webp'); // conversion to modern webp format
      urlObj.searchParams.set('q', quality.toString());
      if (width) {
        urlObj.searchParams.set('w', width.toString());
      }
      return urlObj.toString();
    } catch (e) {
      let optimized = url;
      if (!optimized.includes('fm=webp')) {
        optimized += '&fm=webp';
      }
      return optimized;
    }
  }
  return url;
};

const ImageWithLoader = ({ 
  src, 
  alt, 
  className, 
  width = 800, 
  quality = 70, 
  fallback,
  containerClassName
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  width?: number; 
  quality?: number; 
  fallback?: string;
  containerClassName?: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  if (src !== prevSrc) {
    setLoaded(false);
    setPrevSrc(src);
    setCurrentSrc(src);
  }

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [currentSrc]);

  const optSrc = getOptimizedImageUrl(currentSrc, width, quality);

  return (
    <div className={`${containerClassName || 'relative w-full h-full'} overflow-hidden transition-colors duration-300 ${!loaded ? 'bg-slate-100 animate-pulse' : 'bg-transparent'}`}>
      {!loaded && (
        <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 z-10">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      {optSrc && (
        <img
          key={currentSrc}
          ref={imgRef}
          src={optSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (fallback && currentSrc !== fallback) {
              setCurrentSrc(fallback);
            }
          }}
          className={`max-w-none max-h-none ${className || ''} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-in-out`}
        />
      )}
    </div>
  );
};

// ==========================================
// FEATURE TOGGLE: DISABLE HOUSE PLANS SECTION
// ตั้งค่าเป็น true เพื่อปิดหมวดหมู่แบบบ้านชั่วคราว (Show Under Construction page)
// ตั้งค่าเป็น false เพื่อเปิดใช้งานปกติ
// ==========================================
export const IS_HOUSES_DISABLED = false;

export const UnderConstructionPage = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-28 pb-24 px-4 bg-slate-50 min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center">
      <div className="max-w-md bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 transform scale-100">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-x-0 inset-y-0 bg-amber-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-amber-50 border border-amber-200 p-5 rounded-full text-amber-600">
              <HardHat className="w-12 h-12" />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-3">
          {t('ขออภัย หมวดหมู่แบบบ้านปิดปรับปรุงชั่วคราว')}
        </h1>
        <p className="text-slate-600 text-sm md:text-base mb-8 max-w-xs mx-auto leading-relaxed">
          {t('เรากำลังอัปเดตข้อมูลแบบบ้านและระบบแสดงผลให้ดียิ่งขึ้น เพื่ออำนวยความสะดวกในการเลือกชมแบบบ้านของท่าน ขออภัยในความไม่สะดวกมา ณ ที่นี้')}
        </p>
        <Link to="/" className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary hover:bg-primary/95 text-white font-medium rounded-full shadow-sm transition-all duration-200">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('กลับไปหน้าแรก')}
        </Link>
      </div>
    </div>
  );
};

const ImageModal = ({ isOpen, onClose, imageSrc, title }: { isOpen: boolean, onClose: () => void, imageSrc: string, title?: string }) => {
  const { t } = useTranslation();
  const [dims, setDims] = useState<{w: number, h: number} | null>(null);
  const [zoomScale, setZoomScale] = useState(1.4);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setZoomScale(1.4);
    } else {
      document.body.style.overflow = '';
      setDims(null);
      setZoomScale(1.4);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, imageSrc]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 overflow-auto"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 z-[110] bg-white/10 text-white rounded-full p-2.5 hover:bg-white/25 backdrop-blur-md transition-all cursor-pointer shadow-lg border border-white/10 active:scale-95"
        title={t("ปิด (Close)")}
      >
        <X className="w-6 h-6" />
      </button>

      <div 
        className="m-auto flex flex-col items-center justify-center min-h-[50%] min-w-[50%] relative py-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-xl shadow-2xl bg-white select-none">
          <img 
            src={imageSrc} 
            alt={title || "Preview"} 
            onLoad={(e) => {
              const naturalWidth = e.currentTarget.naturalWidth;
              const naturalHeight = e.currentTarget.naturalHeight;
              
              // Calculate perfect screen-fit baseline (1.0 scale)
              const maxW = window.innerWidth * 0.9;
              const maxH = window.innerHeight * 0.85;
              
              let w = naturalWidth;
              let h = naturalHeight;
              const ratio = naturalWidth / naturalHeight;
              
              if (w > maxW) {
                w = maxW;
                h = w / ratio;
              }
              if (h > maxH) {
                h = maxH;
                w = h * ratio;
              }
              
              setDims({ w, h });
            }}
            style={dims ? { 
              width: dims.w * zoomScale, 
              height: dims.h * zoomScale,
              transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            } : { visibility: 'hidden', position: 'absolute' }}
            className="object-contain bg-white shrink-0 transition-all cursor-pointer"
            onClick={() => setZoomScale(prev => prev === 1.0 ? 1.4 : 1.0)}
          />
        </div>
      </div>

      {/* Floating Zoom Action Bar - Always accessible at the bottom center of the screen */}
      {dims && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 bg-slate-900/90 py-2 px-3 rounded-full backdrop-blur-md shadow-2xl border border-white/10 select-none">
          {/* Zoom Out Button */}
          <button 
            disabled={zoomScale === 1.0}
            onClick={(e) => {
              e.stopPropagation();
              setZoomScale(1.0);
            }}
            className={`text-white transition-all w-8 h-8 rounded-full flex items-center justify-center active:scale-90 ${zoomScale === 1.0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/10'}`}
            title={t("ย่อขนาดรูปภาพ (Fit image)")}
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Scale Display Badge */}
          <div className="px-3.5 py-1 bg-white/10 text-white rounded-md text-xs font-mono min-w-[140px] text-center border border-white/5 whitespace-nowrap">
            {zoomScale === 1.0 ? t("พอดีหน้าจอ (100%)") : t("ขยายภาพ (+40%)")}
          </div>

          {/* Zoom In Button */}
          <button 
            disabled={zoomScale === 1.4}
            onClick={(e) => {
              e.stopPropagation();
              setZoomScale(1.4);
            }}
            className={`text-white transition-all w-8 h-8 rounded-full flex items-center justify-center active:scale-90 ${zoomScale === 1.4 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/10'}`}
            title={t("ขยายขนาดรูปภาพ (Zoom 1.4x)")}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  sectionPadding: "py-16 sm:py-20",
  paddingX: "px-6 lg:px-8 mx-auto max-w-7xl",
};

function Logo() {
  const { t } = useTranslation();
  return (
    <div className="flex items-end gap-1 sm:gap-1.5 translate-y-[2px]">
      <div className="relative flex items-center justify-center w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] -translate-y-[2px]">
        <img src="/images/general/Logo.webp" alt="Ruethai Logo" loading="eager" decoding="async" className="w-full h-full object-contain object-bottom" />
      </div>
      <div className="flex flex-col justify-center text-center">
        <span className="font-medium text-[18px] leading-none tracking-wider text-primary uppercase" style={{fontFamily: 'Times New Roman'}}>RUETHAI</span>
        <span className="font-medium text-[9px] leading-tight tracking-widest text-primary/80 uppercase text-center" style={{fontFamily: 'Inter'}}>Construction</span>
      </div>
    </div>
  );
}

const ThaiFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-5 h-3.5 object-cover rounded shadow-sm overflow-hidden border border-slate-200 shrink-0">
    <rect fill="#A51931" width="900" height="600"/>
    <rect fill="#F4F5F8" y="100" width="900" height="400"/>
    <rect fill="#2D2A4A" y="200" width="900" height="200"/>
  </svg>
);

const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3.5 object-cover rounded shadow-sm overflow-hidden border border-slate-200 shrink-0">
    <clipPath id="uk-flag-s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="uk-flag-t">
      <path d="M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z"/>
    </clipPath>
    <g clipPath="url(#uk-flag-s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-flag-t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

const ChinaFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" className="w-5 h-3.5 object-cover rounded shadow-sm overflow-hidden border border-slate-200 shrink-0">
    <rect width="30" height="20" fill="#DE2910"/>
    <polygon fill="#FFDE00" points="5,3 6,5 8,5 6.5,6.5 7,8.5 5,7.5 3,8.5 3.5,6.5 2,5 4,5"/>
    <polygon fill="#FFDE00" points="10,2 10.5,3 11.5,3 10.5,3.5 11,4.5 10,4 9,4.5 9.5,3.5 8.5,3 9.5,3"/>
    <polygon fill="#FFDE00" points="12,5 12.5,6 13.5,6 12.5,6.5 13,7.5 12,7 11,7.5 11.5,6.5 10.5,6 11.5,6"/>
    <polygon fill="#FFDE00" points="12,8 12.5,9 13.5,9 12.5,9.5 13,10.5 12,10 11,10.5 11.5,9.5 10.5,9 11.5,9"/>
    <polygon fill="#FFDE00" points="10,11 10.5,12 11.5,12 10.5,12.5 11,13.5 10,13 9,13.5 9.5,12.5 8.5,12 9.5,12"/>
  </svg>
);

function Layout() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileLangMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
            setLanguageMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigation = [
    { name: t('หน้าแรก'), path: '/', icon: Home },
    { name: t('แบบบ้าน'), path: '/houses', icon: LayoutIcon },
    { name: t('โครงการบ้านพร้อมอยู่'), path: '/ready-houses', icon: Building2 },
    { name: t('ขายที่ดิน'), path: '/lands', icon: Map },
    { name: t('รายการวัสดุ'), path: '/materials', icon: ClipboardList },
    { name: t('อัตราค่าบริการ'), path: '/service-fees', icon: CircleDollarSign },
    { name: t('ผลงาน'), path: '/portfolio', icon: Trophy },
    { name: t('บทความ'), path: '/articles', icon: FileText },
    { name: t('บริการของเรา'), path: '/services', icon: HardHat },
    { name: t('เกี่ยวกับเรา'), path: '/about', icon: Users }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-primary selection:text-white">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-slate-200 shadow-xl">
        <nav className="px-4 lg:px-8 mx-auto max-w-[90rem] flex flex-1 items-center justify-between h-14 sm:h-16 w-full" aria-label="Global">
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 hover:text-primary"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">{t('')}</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex justify-center lg:justify-start">
            <Link to="/" className="-m-1.5 p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
              <span className="sr-only">{t('')}</span>
              <Logo />
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-x-4 xl:gap-x-6 items-center">
            {navigation.map((item) => (
              <Link key={item.name} to={item.path} onClick={() => {
                if (window.location.pathname === '/' && item.path.startsWith('/#')) {
                  const id = item.path.substring(2);
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }} className="text-[15px] xl:text-base font-medium leading-6 text-slate-700 hover:text-primary transition-all duration-300 hover:scale-110 inline-block origin-center border-b-[3px] border-transparent hover:border-transparent whitespace-nowrap">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:justify-end relative" ref={langMenuRef}>
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              {i18n.language === 'th' ? <ThaiFlag /> : i18n.language === 'en' ? <UKFlag /> : <ChinaFlag />}
              {i18n.language === 'th' ? 'ไทย' : i18n.language === 'en' ? 'English' : '中文'}
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div 
                    initial={{opacity:0, y:10}} 
                    animate={{opacity:1, y:0}} 
                    exit={{opacity:0, y:10}} 
                    transition={{duration: 0.2}}
                    className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 flex flex-col"
                  >
                    <button onClick={() => { i18n.changeLanguage('th'); setLanguageMenuOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-3 transition-colors ${i18n.language==='th' ? 'bg-primary/5 text-primary' : 'text-slate-700 hover:bg-slate-50'}`}><ThaiFlag/>{t("ไทย")}</button>
                    <button onClick={() => { i18n.changeLanguage('en'); setLanguageMenuOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-3 transition-colors ${i18n.language==='en' ? 'bg-primary/5 text-primary' : 'text-slate-700 hover:bg-slate-50'}`}><UKFlag/> English</button>
                    <button onClick={() => { i18n.changeLanguage('zh'); setLanguageMenuOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-3 transition-colors ${i18n.language==='zh' ? 'bg-primary/5 text-primary' : 'text-slate-700 hover:bg-slate-50'}`}><ChinaFlag/> 中文</button>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>

          <div className="flex lg:hidden w-10"></div>
        </nav>

        {/* Mobile menu, show/hide based on menu state. */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 z-50 w-[70%] overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-slate-900/10 lg:hidden"
              >
                <div className="flex items-center justify-between">
                  <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                    <span className="sr-only">{t('')}</span>
                    <Logo />
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-slate-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">{t('')}</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6">
                    <div className="space-y-2 py-6">
                      <div className="px-3 pb-4">
                        <div className="w-full text-left font-medium text-slate-700 bg-slate-100 rounded-lg overflow-hidden flex flex-col">
                          <div className="px-4 py-3 text-sm border-b border-white/50">{t('')}</div>
                          <div className="divide-y divide-white/50 flex flex-col">
                            <button onClick={() => { i18n.changeLanguage('th'); setMobileMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${i18n.language === 'th' ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-slate-200 text-slate-700'}`}><ThaiFlag/> {t("ไทย")}</button>
                            <button onClick={() => { i18n.changeLanguage('en'); setMobileMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${i18n.language === 'en' ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-slate-200 text-slate-700'}`}><UKFlag/> English</button>
                            <button onClick={() => { i18n.changeLanguage('zh'); setMobileMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${i18n.language === 'zh' ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-slate-200 text-slate-700'}`}><ChinaFlag/> 中文</button>
                          </div>
                        </div>
                      </div>
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium leading-7 text-slate-900 hover:bg-slate-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.icon && <item.icon className="w-5 h-5 text-primary" />}
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
      
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-primary py-2 px-6 lg:px-8 border-t hover:border-transparent border-slate-800">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-2">
    <div className="flex items-end gap-1 sm:gap-1.5 translate-y-[2px]">
      <div className="relative flex items-center justify-center w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] -translate-y-[2px]">
        <img src="/images/general/Logo.webp" alt="Ruethai Logo" loading="lazy" decoding="async" className="w-full h-full object-contain object-bottom filter brightness-0 invert" />
      </div>
      <div className="flex flex-col text-center">
        <span className="font-medium text-[18px] leading-none tracking-wider text-white uppercase" style={{fontFamily: 'Times New Roman'}}>RUETHAI</span>
        <span className="font-medium text-[9px] leading-tight tracking-widest text-white/80 uppercase" style={{fontFamily: 'Inter'}}>Construction</span>
      </div>
    </div>
          <p className="text-xs leading-4 text-slate-400 text-center md:text-right">
            &copy; {new Date().getFullYear()} {t('ฤทัยคอนสตรัคชั่น')}. <br />
            All rights reserved.<br />
            <span className="text-[10px] text-slate-500 mt-1 block">{t('')}</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

function houseCategoriesData() {
  return [
    { id: "modern", title: i18n.t("แบบบ้านโมเดิร์น"), img: "/images/house-designs/modern/cover.webp" },
    { id: "contemporary", title: i18n.t("แบบบ้านคอนเทมโพลารี่"), img: "/images/house-designs/contemporary/cover.webp" },
    { id: "western", title: i18n.t("แบบบ้านสไตล์ตะวันตก"), img: "/images/house-designs/western/cover.webp" },
    { id: "thai-applied", title: i18n.t("แบบบ้านไทยประยุกต์"), img: "/images/house-designs/thai-applied/cover.webp" },
    { id: "modern-classic", title: i18n.t("แบบบ้านโมเดิร์นคลาสสิก"), img: "/images/house-designs/modern-classic/cover.webp" },
    { id: "muji", title: i18n.t("แบบบ้านมูจิสไตล์"), img: "/images/house-designs/muji/cover.webp" }
  ];
}

function housePlansData() {
  return [
    { 
      id: "ruthai-modern1", 
      category: "modern", 
      img: "/images/house-designs/modern/Ruthai-modern1/Ruthaimodern001a.webp", 
      gallery: [
        "/images/house-designs/modern/Ruthai-modern1/Ruthaimodern001a.webp",
        "/images/house-designs/modern/Ruthai-modern1/Ruthaimodern001b.webp",
        "/images/house-designs/modern/Ruthai-modern1/gallery-2.webp",
        "/images/house-designs/modern/Ruthai-modern1/gallery-3.webp"
      ], 
      title: i18n.t("ฤทัยโมเดิร์น ๑"), 
      area: i18n.t("120 ตร.ม."), 
      landSize: i18n.t("80 ตร.วา"),
      bed: 4, 
      bath: 5, 
      car: 2,
      floor: 1,
      price: i18n.t("เริ่มต้น 2.5 ล้านบาท"),
      priceNumeric: 2.5
    },
    { 
      id: "ruthai-contemporary1", 
      category: "contemporary", 
      img: "/images/house-designs/contemporary/Ruthai-contemporary1/Ruethaicontempolary001a-trumbnall.webp?v=1", 
      gallery: [
        "/images/house-designs/contemporary/Ruthai-contemporary1/Ruethaicontempolary001a.webp?v=10"
      ], 
      title: i18n.t("ฤทัยคอนเทมโพลารี่ ๑"), 
      area: i18n.t("180 ตร.ม."), 
      landSize: i18n.t("150 ตร.วา"),
      bed: 4, 
      bath: 3, 
      car: 2,
      floor: 2,
      price: i18n.t("เริ่มต้น 3.8 ล้านบาท"),
      priceNumeric: 3.8
    },
    { 
      id: "ruthai-muji1", 
      category: "muji", 
      img: "/images/house-designs/muji/Ruthai-muji1/main.webp", 
      gallery: [
        "/images/house-designs/muji/Ruthai-muji1/main.webp",
        "/images/house-designs/muji/Ruthai-muji1/gallery-1.webp"
      ], 
      title: i18n.t("ฤทัยมูจิ ๑"), 
      area: i18n.t("250 ตร.ม."), 
      landSize: i18n.t("220 ตร.วา"),
      bed: 5, 
      bath: 4, 
      car: 2,
      floor: 2,
      price: i18n.t("เริ่มต้น 5.2 ล้านบาท"),
      priceNumeric: 5.2
    },
    { id: "ruthai-lanna1", category: "thai-applied", img: "/images/house-designs/thai-applied/Ruthai-lanna1/Ruthailanna001a-trumbnall.webp", gallery: ["/images/house-designs/thai-applied/Ruthai-lanna1/Ruthailanna001a.webp?v=9"], title: i18n.t("ฤทัยล้านนา ๑"), area: i18n.t("220 ตร.ม."), landSize: i18n.t("150 ตร.วา"), bed: 4, bath: 3, car: 2, floor: 2, price: i18n.t("เริ่มต้น 4.5 ล้านบาท"), priceNumeric: 4.5 },
    { id: "ruthai-modern-classic1", category: "modern-classic", img: "/images/house-designs/modern-classic/Ruthai-modern-classic1/main.webp", gallery: ["/images/house-designs/modern-classic/Ruthai-modern-classic1/main.webp"], title: i18n.t("ฤทัยโมเดิร์นคลาสสิก ๑"), area: i18n.t("320 ตร.ม."), landSize: i18n.t("220 ตร.วา"), bed: 5, bath: 5, car: 3, floor: 3, price: i18n.t("เริ่มต้น 7.5 ล้านบาท"), priceNumeric: 7.5 },
    { id: "ruthai-nordic1", category: "western", img: "/images/house-designs/western/Ruthai-nordic1/Ruthainordic001a.webp", gallery: ["/images/house-designs/western/Ruthai-nordic1/Ruthainordic001a.webp"], title: i18n.t("ฤทัยนอร์ดิก ๑"), area: i18n.t("400 ตร.ม."), landSize: i18n.t("220 ตร.วา"), bed: 6, bath: 6, car: 3, floor: 3, price: i18n.t("เริ่มต้น 12 ล้านบาท"), priceNumeric: 12 },
    { 
      id: "ruthai-modern2", 
      category: "modern", 
      img: "/images/house-designs/modern/Ruthai-modern2/Ruthaimodern002a.webp", 
      gallery: [
        "/images/house-designs/modern/Ruthai-modern2/Ruthaimodern002a.webp",
        "/images/house-designs/modern/Ruthai-modern2/Ruthaimodern002b.webp"
      ],
      title: i18n.t("ฤทัยโมเดิร์น ๒"), 
      area: i18n.t("135 ตร.ม."), 
      landSize: i18n.t("80 ตร.วา"),
      bed: 3, 
      bath: 2, 
      car: 2,
      floor: 1,
      price: i18n.t("เริ่มต้น 2.8 ล้านบาท"), 
      priceNumeric: 2.8 
    },
    { id: "ruthai-contemporary2", category: "contemporary", img: "/images/house-designs/contemporary/Ruthai-contemporary2/Ruthaicontempolary002a-trumbnall.webp?v=1", gallery: ["/images/house-designs/contemporary/Ruthai-contemporary2/Ruthaicontempolary002a.webp?v=10"], title: i18n.t("ฤทัยคอนเทมโพลารี่ ๒"), area: i18n.t("200 ตร.ม."), landSize: i18n.t("150 ตร.วา"), bed: 4, bath: 4, car: 2, floor: 2, price: i18n.t("เริ่มต้น 4.2 ล้านบาท"), priceNumeric: 4.2 },
    { id: "ruthai-muji2", category: "muji", img: "/images/house-designs/muji/Ruthai-muji2/main.webp", gallery: ["/images/house-designs/muji/Ruthai-muji2/main.webp"], title: i18n.t("ฤทัยมูจิ ๒"), area: i18n.t("260 ตร.ม."), landSize: i18n.t("220 ตร.วา"), bed: 5, bath: 4, car: 2, floor: 2, price: i18n.t("เริ่มต้น 5.5 ล้านบาท"), priceNumeric: 5.5 },
    { id: "ruthai-modern3", category: "modern", img: "/images/house-designs/modern/Ruthai-modern3/main.webp", gallery: ["/images/house-designs/modern/Ruthai-modern3/main.webp"], title: i18n.t("ฤทัยโมเดิร์น ๓"), area: i18n.t("150 ตร.ม."), landSize: i18n.t("150 ตร.วา"), bed: 3, bath: 3, car: 2, floor: 1, price: i18n.t("เริ่มต้น 3.2 ล้านบาท"), priceNumeric: 3.2 },
    { id: "ruthai-lanna2", category: "thai-applied", img: "/images/house-designs/thai-applied/Ruthai-lanna2/Ruthailanna002a-trumbnall.webp", gallery: ["/images/house-designs/thai-applied/Ruthai-lanna2/Ruthailanna002a.webp?v=9"], title: i18n.t("ฤทัยล้านนา ๒"), area: i18n.t("240 ตร.ม."), landSize: i18n.t("220 ตร.วา"), bed: 4, bath: 4, car: 2, floor: 2, price: i18n.t("เริ่มต้น 4.8 ล้านบาท"), priceNumeric: 4.8 },
    { id: "ruthai-modern-classic2", category: "modern-classic", img: "/images/house-designs/modern-classic/Ruthai-modern-classic2/main.webp", gallery: ["/images/house-designs/modern-classic/Ruthai-modern-classic2/main.webp"], title: i18n.t("ฤทัยโมเดิร์นคลาสสิก ๒"), area: i18n.t("350 ตร.ม."), landSize: i18n.t("220 ตร.วา"), bed: 5, bath: 6, car: 3, floor: 3, price: i18n.t("เริ่มต้น 8.0 ล้านบาท"), priceNumeric: 8.0 },
    { id: "ruthai-nordic2", category: "western", img: "/images/house-designs/western/Ruthai-nordic2/main.webp", gallery: ["/images/house-designs/western/Ruthai-nordic2/main.webp"], title: i18n.t("ฤทัยนอร์ดิก ๒"), area: i18n.t("420 ตร.ม."), landSize: i18n.t("220 ตร.วา"), bed: 6, bath: 7, car: 4, floor: 3, price: i18n.t("เริ่มต้น 12.5 ล้านบาท"), priceNumeric: 12.5 },
    { id: "ruthai-contemporary3", category: "contemporary", img: "/images/house-designs/contemporary/Ruthai-contemporary3/Ruthaicontempolary003a-trumbnall.webp?v=11", gallery: ["/images/house-designs/contemporary/Ruthai-contemporary3/Ruthaicontempolary003a.webp?v=11", "/images/house-designs/contemporary/Ruthai-contemporary3/Ruthaicontempolary003b.webp?v=11", "/images/house-designs/contemporary/Ruthai-contemporary3/Ruthaicontempolary003c.webp"], title: i18n.t("ฤทัยคอนเทมโพลารี่ ๓"), area: i18n.t("220 ตร.ม."), landSize: i18n.t("150 ตร.วา"), bed: 4, bath: 4, car: 2, floor: 2, price: i18n.t("เริ่มต้น 4.6 ล้านบาท"), priceNumeric: 4.6 },
    { id: "ruthai-muji3", category: "muji", img: "/images/house-designs/muji/Ruthai-muji3/main.webp", gallery: ["/images/house-designs/muji/Ruthai-muji3/main.webp"], title: i18n.t("ฤทัยมูจิ ๓"), area: i18n.t("280 ตร.ม."), landSize: i18n.t("220 ตร.วา"), bed: 5, bath: 4, car: 3, floor: 2, price: i18n.t("เริ่มต้น 6.0 ล้านบาท"), priceNumeric: 6.0 },
    { id: "ruthai-lanna3", category: "thai-applied", img: "/images/house-designs/thai-applied/Ruthai-lanna3/main.webp", gallery: ["/images/house-designs/thai-applied/Ruthai-lanna3/main.webp"], title: i18n.t("ฤทัยล้านนา ๓"), area: i18n.t("260 ตร.ม."), landSize: i18n.t("220 ตร.วา"), bed: 4, bath: 5, car: 3, floor: 2, price: i18n.t("เริ่มต้น 5.2 ล้านบาท"), priceNumeric: 5.2 },
    { id: "ruthai-modern-classic3", category: "modern-classic", img: "/images/house-designs/modern-classic/Ruthai-modern-classic3/main.webp", gallery: ["/images/house-designs/modern-classic/Ruthai-modern-classic3/main.webp"], title: i18n.t("ฤทัยโมเดิร์นคลาสสิก ๓"), area: i18n.t("380 ตร.ม."), landSize: i18n.t("220 ตร.วา"), bed: 5, bath: 6, car: 4, floor: 3, price: i18n.t("เริ่มต้น 9.5 ล้านบาท"), priceNumeric: 9.5 },
    { id: "ruthai-nordic3", category: "western", img: "/images/house-designs/western/Ruthai-nordic3/main.webp", gallery: ["/images/house-designs/western/Ruthai-nordic3/main.webp"], title: i18n.t("ฤทัยนอร์ดิก ๓"), area: i18n.t("450 ตร.ม."), landSize: i18n.t("220 ตร.วา"), bed: 6, bath: 7, car: 4, floor: 3, price: i18n.t("เริ่มต้น 14.5 ล้านบาท"), priceNumeric: 14.5 }
  ];
}

function readyHousesData() {
  return [
    { 
      id: "ready-1", 
      title: "C-Home Project", 
      img: "/images/regenerated_image_1779640810182.jpg", 
      gallery: [
        "/images/regenerated_image_1779640810182.jpg",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1200&q=80"
      ],
      desc: i18n.t("โครงการทาวน์โฮม 2 ชั้น ทำเลที่พักอาศัยอย่างแท้จริง เดินทางสะดวก เข้าโครงการจากเส้นหลัก (สันกำแพง-เชียงใหม่ สายเก่า) เพียง 500 เมตร หน้ากว้าง 5 เมตรเต็มๆ จอดรถสะดวก"), 
      price: i18n.t("เริ่มต้น 2.49 ล้านบาท"),
      details: [
        { icon: <Maximize className="w-5 h-5" />, label: i18n.t("พื้นที่ใช้สอย"), value: i18n.t("120 ตร.ม.") },
        { icon: <Sofa className="w-5 h-5" />, label: i18n.t("ห้องรับแขก"), value: i18n.t("1 ห้อง") },
        { icon: <Bed className="w-5 h-5" />, label: i18n.t("ห้องนอน"), value: i18n.t("2 ห้อง (มีห้องน้ำในตัว 1 ห้อง)") },
        { icon: <Bath className="w-5 h-5" />, label: i18n.t("ห้องน้ำ"), value: i18n.t("2 ห้อง") },
        { icon: <Utensils className="w-5 h-5" />, label: i18n.t("ห้องครัว"), value: i18n.t("1 ห้อง") },
        { icon: <Coffee className="w-5 h-5" />, label: i18n.t("ห้องอาหาร"), value: i18n.t("1 ห้อง") },
      ]
    },
    { 
      id: "ready-2", 
      title: i18n.t("P-Place Project"), 
      img: "/images/ready-houses/p-place/main.jpg", 
      desc: i18n.t("บ้านเดี่ยวและทาวน์โฮมโมเดิร์น ทำเลดีเดินทางสะดวก ใกล้สิ่งอำนวยความสะดวกครบครัน ตอบโจทย์รอบด้าน"), 
      price: i18n.t("เริ่มต้น 2.2 ล้านบาท") 
    },
    { 
      id: "ready-3", 
      title: i18n.t("Ruethai Luxury"), 
      img: "/images/ready-houses/luxury/main.jpg", 
      desc: i18n.t("คฤหาสน์หรูทำเลทอง สังคมคุณภาพพร้อมสระส่วนตัว สถาปัตยกรรมระดับพรีเมียม ตอบโจทย์การใช้ชีวิตที่เหนือระดับ"), 
      price: i18n.t("เริ่มต้น 15.9 ล้านบาท") 
    }
  ];
}

function landsData() {
  const commonGallery = [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505367352355-6b5cf6e8383a?auto=format&fit=crop&w=800&q=80"
  ];
  return [
    { id: "land-1", title: i18n.t("ที่ดินแบ่งขาย โซนสันกำแพง"), img: "/images/lands/land-1.webp?v=1", gallery: ["/images/lands/land-1.webp?v=1", ...commonGallery.slice(1)], desc: i18n.t("ที่ดินสวย วิวภูเขา เหมาะสำหรับสร้างบ้าน"), price: i18n.t("เริ่มต้น 8,000 บาท/ตร.ว."), area: i18n.t("80 - 120 ตร.ว."), location: i18n.t("อ.สันกำแพง จ.เชียงใหม่"), type: i18n.t("โฉนดครุฑแดง") },
    { id: "land-2", title: i18n.t("ที่ดินเปล่า โซนหางดง"), img: "/images/lands/land-2.webp?v=1", gallery: ["/images/lands/land-2.webp?v=1", ...commonGallery.slice(1)], desc: i18n.t("ใกล้สิ่งอำนวยความสะดวก น้ำไฟเข้าถึง"), price: i18n.t("เริ่มต้น 12,000 บาท/ตร.ว."), area: i18n.t("100 ตร.ว."), location: i18n.t("อ.หางดง จ.เชียงใหม่"), type: i18n.t("โฉนดครุฑแดง") },
    { id: "land-3", title: i18n.t("ที่ดินแปลงใหญ่ โซนสันทราย"), img: "/images/lands/land-3.webp?v=1", gallery: ["/images/lands/land-3.webp?v=1", ...commonGallery.slice(1)], desc: i18n.t("เหมาะสำหรับทำโครงการจัดสรร หรือการเกษตร"), price: i18n.t("เริ่มต้น 5,000 บาท/ตร.ว."), area: i18n.t("5 ไร่"), location: i18n.t("อ.สันทราย จ.เชียงใหม่"), type: i18n.t("โฉนดครุฑแดง") }
  ];
}

function portfolioCategoriesData() {
  return [
    { id: "design", title: i18n.t("ผลงานออกแบบอาคาร"), img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80", count: 4 },
    { id: "new-build", title: i18n.t("ผลงานก่อสร้างอาคารใหม่"), img: "https://images.unsplash.com/photo-1541888081600-0e10cc6b2c28?auto=format&fit=crop&w=800&q=80", count: 4 },
    { id: "renovation", title: i18n.t("ผลงานรีโนเวทอาคาร"), img: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=800&q=80", count: 4 },
    { id: "interior", title: i18n.t("ผลงานตกแต่งภายใน"), img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", count: 1 }
  ];
}

function portfolioData() {
  return [
    {
      id: "project-1",
      title: i18n.t("โครงการออกแบบบ้านเดี่ยว 2 ชั้น"),
      categoryId: "design",
      category: i18n.t("ผลงานออกแบบอาคาร"),
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("อ.เมือง จ.เชียงใหม่"),
      year: "2566",
      desc: i18n.t("ออกแบบสถาปัตยกรรมบ้านเดี่ยวสไตล์โมเดิร์นทรอปิคอล เน้นการประหยัดพลังงาน"),
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-2",
      title: i18n.t("ออกแบบอาคารพาณิชย์ 3 ชั้น"),
      categoryId: "design",
      category: i18n.t("ผลงานออกแบบอาคาร"),
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("ย่านนิมมานเหมินทร์"),
      year: "2567",
      desc: i18n.t("ผลงานการออกแบบสำนักงานและพื้นที่ร้านค้า เน้นความเป็นเอกลักษณ์และโดดเด่น"),
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-3",
      title: i18n.t("บ้านเดี่ยวสไตล์นอร์ดิก"),
      categoryId: "new-build",
      category: i18n.t("ผลงานก่อสร้างอาคารใหม่"),
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("อ.หางดง จ.เชียงใหม่"),
      year: "2566",
      desc: i18n.t("ก่อสร้างบ้านเดี่ยวสไตล์นอร์ดิกตั้งแต่เริ่มต้นจนส่งมอบงาน"),
      gallery: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-4",
      title: i18n.t("ก่อสร้างอาคารสำนักงานและโกดัง"),
      categoryId: "new-build",
      category: i18n.t("ผลงานก่อสร้างอาคารใหม่"),
      img: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("อ.สารภี จ.เชียงใหม่"),
      year: "2567",
      desc: i18n.t("ผลงานก่อสร้างอาคารโรงงานพร้อมสำนักงาน โครงสร้างเหล็กและคอนกรีตคุณภาพสูง"),
      gallery: [
        "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-5",
      title: i18n.t("รีโนเวทบ้านเก่า 30 ปี เป็นคาเฟ่"),
      categoryId: "renovation",
      category: i18n.t("ผลงานรีโนเวทอาคาร"),
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("ย่านวัดเกต เชียงใหม่"),
      year: "2565",
      desc: i18n.t("พลิกโฉมบ้านไม้กึ่งปูนเก่าแก่ให้กลายเป็นคาเฟ่และร้านอาหารสุดชิค"),
      gallery: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-6",
      title: i18n.t("ตกแต่งภายในคอนโดมิเนียมหรู"),
      categoryId: "interior",
      category: i18n.t("ผลงานตกแต่งภายใน"),
      img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("แยกศาลเด็ก เชียงใหม่"),
      year: "2566",
      desc: i18n.t("บิ้วอินและตกแต่งภายในคอนโดด้วยกระจกและลายหินอ่อน"),
      gallery: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-7",
      title: i18n.t("ต่อเติมบ้านสองชั้นและรอบบริเวณบ้าน"),
      categoryId: "renovation",
      category: i18n.t("ผลงานรีโนเวทอาคาร"),
      img: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("อ.สันทราย จ.เชียงใหม่"),
      year: "2567",
      desc: i18n.t("งานรีโนเวทต่อเติมพื้นที่รอบบ้าน และพื้นที่นั่งเล่นชั้นสอง"),
      gallery: [
        "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-8",
      title: i18n.t("ก่อสร้างรีสอร์ทสไตล์ธรรมชาติ"),
      categoryId: "new-build",
      category: i18n.t("ผลงานก่อสร้างอาคารใหม่"),
      img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("อ.แม่ริม จ.เชียงใหม่"),
      year: "2565",
      desc: i18n.t("รีสอร์ทสวยงามท่ามกลางธรรมชาติ ผสมผสานความลงตัวของไม้และคอนกรีต"),
      gallery: [
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
      ]

    },
    {
      id: "project-9",
      title: i18n.t("ออกแบบทาวน์โฮม 3 ชั้น"),
      categoryId: "design",
      category: i18n.t("ผลงานออกแบบอาคาร"),
      img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("ซอยวัดอุโมงค์ เชียงใหม่"),
      year: "2565",
      desc: i18n.t("ออกแบบสถาปัตยกรรมทาวน์โฮมสไตล์คลาสสิคร่วมสมัย เหมาะสำหรับการค้าขายและพักอาศัย"),
      gallery: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-10",
      title: i18n.t("ออกแบบโรงแรมบูติก"),
      categoryId: "design",
      category: i18n.t("ผลงานออกแบบอาคาร"),
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("คูเมือง เชียงใหม่"),
      year: "2566",
      desc: i18n.t("งานออกแบบสถาปัตยกรรมโรงแรมขนาดเล็ก สไตล์พื้นเมืองประยุกต์"),
      gallery: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-11",
      title: i18n.t("ก่อสร้างบ้านพักตากอากาศบนดอย"),
      categoryId: "new-build",
      category: i18n.t("ผลงานก่อสร้างอาคารใหม่"),
      img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("อ.สะเมิง จ.เชียงใหม่"),
      year: "2567",
      desc: i18n.t("บ้านพักตากอากาศรับวิวดอย โครงสร้างผสมผสานเหล็กและไม้ เข้ากับสภาพแวดล้อม"),
      gallery: [
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-12",
      title: i18n.t("รีโนเวทปรับพื้นที่ดาดฟ้า"),
      categoryId: "renovation",
      category: i18n.t("ผลงานรีโนเวทอาคาร"),
      img: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("อ.เมือง จ.เชียงใหม่"),
      year: "2565",
      desc: i18n.t("เปลี่ยนพื้นที่ดาดฟ้าตึกแถวให้กลายเป็น Rooftop Bar และลานจัดปาร์ตี้ส่วนตัว"),
      gallery: [
        "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-13",
      title: i18n.t("ต่อเติมห้องครัวสไตล์ลอฟท์"),
      categoryId: "renovation",
      category: i18n.t("ผลงานรีโนเวทอาคาร"),
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("อ.ดอยสะเก็ด จ.เชียงใหม่"),
      year: "2566",
      desc: i18n.t("ต่อเติมห้องครัวด้านหลังบ้านด้วยปูนเปลือยและเหล็กสีดำ สไตล์อินดัสเตรียลลอฟท์"),
      gallery: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-14",
      title: i18n.t("ตกแต่งและรีโนเวทคลินิกความงาม"),
      categoryId: "interior",
      category: i18n.t("ผลงานตกแต่งภายใน"),
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("นิมมานเหมินทร์ เชียงใหม่"),
      year: "2566",
      desc: i18n.t("ตกแต่งคลินิกเสริมความงามโทนขาว-ทอง หรูหราและสะอาดตา"),
      gallery: [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512404097405-b77da1cd699a?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-15",
      title: i18n.t("บิ้วอินห้องนอนสไตล์มินิมอล"),
      categoryId: "interior",
      category: i18n.t("ผลงานตกแต่งภายใน"),
      img: "https://images.unsplash.com/photo-1536349788264-1ddbc178fb02?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("อ.เมือง จ.เชียงใหม่"),
      year: "2567",
      desc: i18n.t("บิ้วอินห้องนอนและตู้เสื้อผ้าเน้นงานไม้สีอ่อน สร้างความรู้สึกอบอุ่น"),
      gallery: [
        "https://images.unsplash.com/photo-1536349788264-1ddbc178fb02?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "project-16",
      title: i18n.t("ตกแต่งออฟฟิศ Co-Working Space"),
      categoryId: "interior",
      category: i18n.t("ผลงานตกแต่งภายใน"),
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      location: i18n.t("ศิริมังคลาจารย์ เชียงใหม่"),
      year: "2565",
      desc: i18n.t("ตกแต่งพื้นที่ส่วนกลางสำหรับการทำงาน โปรงโล่ง และกระตุ้นความคิดสร้างสรรค์"),
      gallery: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];
}

function HouseCategoriesPage() {
  if (IS_HOUSES_DISABLED) {
    return <UnderConstructionPage />;
  }
  const { t } = useTranslation();
  const categories = houseCategoriesData();
  const originalPlans = useMemo(() => housePlansData(), []);
  const randomizedPlans = useMemo(() => {
    return [...originalPlans].sort(() => Math.random() - 0.5);
  }, [originalPlans]);
  
  const [styleFilter, setStyleFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [bedFilter, setBedFilter] = useState('all');
  const [bathFilter, setBathFilter] = useState('all');
  const [floorFilter, setFloorFilter] = useState('all');

  const [appliedStyleFilter, setAppliedStyleFilter] = useState('all');
  const [appliedPriceFilter, setAppliedPriceFilter] = useState('all');
  const [appliedBedFilter, setAppliedBedFilter] = useState('all');
  const [appliedBathFilter, setAppliedBathFilter] = useState('all');
  const [appliedFloorFilter, setAppliedFloorFilter] = useState('all');

  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setAppliedStyleFilter(styleFilter);
      setAppliedPriceFilter(priceFilter);
      setAppliedBedFilter(bedFilter);
      setAppliedBathFilter(bathFilter);
      setAppliedFloorFilter(floorFilter);
      setIsFiltering(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [styleFilter, priceFilter, bedFilter, bathFilter, floorFilter]);

  const allPlans = appliedStyleFilter === 'all' 
    ? randomizedPlans 
    : [...originalPlans].filter(p => p.category === appliedStyleFilter).sort((a, b) => a.title.localeCompare(b.title, 'th'));

  const filteredPlans = allPlans.filter(plan => {
    let priceMatch = true;
    if (appliedPriceFilter === 'under1.5') priceMatch = (plan as any).priceNumeric <= 1.5;
    else if (appliedPriceFilter === 'under2') priceMatch = (plan as any).priceNumeric > 1.5 && (plan as any).priceNumeric <= 2;
    else if (appliedPriceFilter === 'under3') priceMatch = (plan as any).priceNumeric > 2 && (plan as any).priceNumeric <= 3;
    else if (appliedPriceFilter === 'under5') priceMatch = (plan as any).priceNumeric > 3 && (plan as any).priceNumeric <= 5;
    else if (appliedPriceFilter === 'over5') priceMatch = (plan as any).priceNumeric > 5;

    return (appliedStyleFilter === 'all' || plan.category === appliedStyleFilter) &&
           (priceMatch) &&
           (appliedBedFilter === 'all' || plan.bed.toString() === appliedBedFilter) &&
           (appliedBathFilter === 'all' || plan.bath.toString() === appliedBathFilter) &&
           (appliedFloorFilter === 'all' || (plan as any).floor?.toString() === appliedFloorFilter);
  });

  const uniqueBeds = Array.from(new Set(allPlans.map(p => p.bed))).sort((a,b)=>Number(a)-Number(b));
  const uniqueBaths = Array.from(new Set(allPlans.map(p => p.bath))).sort((a,b)=>Number(a)-Number(b));
  const uniqueFloors = Array.from(new Set(allPlans.map(p => (p as any).floor).filter(Boolean))).sort((a,b)=>Number(a)-Number(b));

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-[calc(100vh-100px)]">
      <SEO 
        title={t("แบบบ้านยอดนิยม แบบสร้างบ้านโมเดิร์นและมินิมอล")} 
        description={t("รวมแบบบ้านสวยๆ พร้อมฟังก์ชันใช้สอยลงตัว ทั้งทาวน์โฮมสองชั้น ทาวน์เฮ้าส์ และแบบบ้านมูจิ มินิมอล โมเดิร์น ราคาประหยัดและคุ้มค่าที่สุดในเชียงใหม่")}
        keywords={t("แบบบ้านเชียงใหม่, แบบบ้านราคาถูก, ขายทาวน์เฮ้าส์เชียงใหม่, แบบบ้านมูจิ, รับสร้างบ้านเชียงใหม่")}
      />
      <div className={styles.paddingX}>
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="inline-flex items-center text-primary hover:text-accent font-medium mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t('กลับไปหน้าแรก')}
          </Link>
        </div>
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Home className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
            แบบบ้าน{t('ทั้งหมด')}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {t('ค้นหาแบบบ้านที่ตรงใจด้วยตัวกรองที่ยืดหยุ่น')}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
              <h2 className="text-lg font-medium text-slate-900 mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" /> {t('ค้นหาแบบบ้าน')}
              </h2>
              
              {/* Style Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">{t('')}</label>
                <div className="space-y-2">
                  <button 
                    onClick={() => setStyleFilter('all')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${styleFilter === 'all' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('ทั้งหมด')}
                  </button>
                  {categories.map((cat, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setStyleFilter(cat.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${styleFilter === cat.id ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">ช่วง{t('ราคา')}</label>
                <div className="space-y-2">
                  <button 
                    onClick={() => setPriceFilter('all')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${priceFilter === 'all' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('ทั้งหมด')}
                  </button>
                  <button 
                    onClick={() => setPriceFilter('under1.5')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${priceFilter === 'under1.5' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('ไม่เกิน 1.5 ล้านบาท')}
                  </button>
                  <button 
                    onClick={() => setPriceFilter('under2')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${priceFilter === 'under2' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('1.5 - 2 ล้านบาท')}
                  </button>
                  <button 
                    onClick={() => setPriceFilter('under3')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${priceFilter === 'under3' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('2 - 3 ล้านบาท')}
                  </button>
                  <button 
                    onClick={() => setPriceFilter('under5')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${priceFilter === 'under5' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('3 - 5 ล้านบาท')}
                  </button>
                  <button 
                    onClick={() => setPriceFilter('over5')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${priceFilter === 'over5' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('5 ล้านบาทขึ้นไป')}
                  </button>
                </div>
              </div>
              
              {/* Bed Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">{t('')}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setBedFilter('all')}
                    className={`w-full text-center px-2 py-2.5 rounded-lg text-sm transition-colors ${bedFilter === 'all' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('ทั้งหมด')}
                  </button>
                  {uniqueBeds.map((bed, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setBedFilter(bed.toString())}
                      className={`w-full text-center px-2 py-2.5 rounded-lg text-sm transition-colors ${bedFilter === bed.toString() ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                    >
                      {bed}{t(' ห้องนอน')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bath Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">{t('')}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setBathFilter('all')}
                    className={`w-full text-center px-2 py-2.5 rounded-lg text-sm transition-colors ${bathFilter === 'all' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('ทั้งหมด')}
                  </button>
                  {uniqueBaths.map((bath, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setBathFilter(bath.toString())}
                      className={`w-full text-center px-2 py-2.5 rounded-lg text-sm transition-colors ${bathFilter === bath.toString() ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                    >
                      {bath}{t(' ห้องน้ำ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floor Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">{t('')}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setFloorFilter('all')}
                    className={`w-full text-center px-1 py-2.5 rounded-lg text-sm transition-colors ${floorFilter === 'all' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('All')}
                  </button>
                  <button 
                    onClick={() => setFloorFilter('1')}
                    className={`w-full text-center px-1 py-2.5 rounded-lg text-sm transition-colors ${floorFilter === '1' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('1 Floor')}
                  </button>
                  <button 
                    onClick={() => setFloorFilter('2')}
                    className={`w-full text-center px-1 py-2.5 rounded-lg text-sm transition-colors ${floorFilter === '2' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('2 Floors')}
                  </button>
                  <button 
                    onClick={() => setFloorFilter('3')}
                    className={`w-full text-center px-1 py-2.5 rounded-lg text-sm transition-colors ${floorFilter === '3' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t('3 Floors')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Plans Grid */}
          <div className="w-full lg:w-3/4">
            {isFiltering ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full animate-pulse">
                    <div className="relative aspect-[3/2] bg-slate-200">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                    </div>
                    <div className="p-5 flex flex-col flex-1 text-left space-y-4">
                      <div className="h-6 bg-slate-200 rounded w-2/3" />
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6 pb-2">
                         <div className="h-4 bg-slate-200 rounded w-1/4" />
                         <div className="h-4 bg-slate-200 rounded w-1/6" />
                         <div className="h-4 bg-slate-200 rounded w-1/6" />
                      </div>
                      <div className="mt-auto pt-2">
                        <div className="h-10 bg-slate-200 rounded-xl w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan, idx) => (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <ImageWithLoader src={plan.img} alt={t(plan.title)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-medium text-primary shadow-sm">
                        {categories.find(c => c.id === plan.category)?.title || t('แบบบ้าน')}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1 text-left">
                      <h3 className="text-xl font-medium text-slate-900 mb-3">{t(plan.title)}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
                         <div className="flex items-center gap-1.5" title={t("พื้นที่ใช้สอย")}><Maximize className="w-4 h-4 text-slate-400" /> {plan.area}</div>
                         <div className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-slate-400" /> {plan.bed}</div>
                         <div className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-slate-400" /> {plan.bath}</div>
                         <div className="flex items-center gap-1.5"><Car className="w-4 h-4 text-slate-400" /> {plan.car}</div>
                      </div>
                      <div className="mt-auto">
                        <Link to={`/house/${plan.id}`} className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-primary border border-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 w-full">
                          {t('ดูรายละเอียด')}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 border-dashed">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg font-medium">{t('')}</p>
                <button onClick={() => { setStyleFilter('all'); setPriceFilter('all'); setBedFilter('all'); setBathFilter('all'); setFloorFilter('all'); }} className="mt-4 text-primary hover:text-accent underline underline-offset-4 text-sm font-medium">ล้างตัวกรอง{t('ทั้งหมด')}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryHousesPage() {
  if (IS_HOUSES_DISABLED) {
    return <UnderConstructionPage />;
  }
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const categories = houseCategoriesData();
  const allPlans = housePlansData();
  const category = categories.find(c => c.id === categoryId);
  const plans = allPlans.filter(p => p.category === categoryId).sort((a, b) => a.title.localeCompare(b.title, 'th'));
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [categoryId]);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-[calc(100vh-100px)]">
      <SEO 
        title={`แบบบ้านในหมวดหมู่ ${category ? t(category.title) : ''}`} 
        description={`ชมและเลือกแบบบ้านในสไตล์ ${category ? t(category.title) : ''} มินิมอล โมเดิร์น หรือลักชัวรี ออกแบบลงตัวทุกตารางนิ้ว พร้อมสร้างตามความฝันของคุณ`}
        keywords={`${category ? t(category.title) : 'แบบบ้าน'}, รับสร้างบ้านเชียงใหม่, ขายทาวน์เฮ้าส์เชียงใหม่, ห้องแถวราคาถูก`}
      />
      <div className={styles.paddingX}>
        <div className="flex flex-col items-center text-center">
          <Link to="/houses" className="inline-flex items-center text-primary hover:text-accent font-medium mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t('หมวดหมู่แบบบ้าน')}
          </Link>
        </div>
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
            {category?.title || ''}
          </h1>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full animate-pulse">
                <div className="relative aspect-[3/2] bg-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                </div>
                <div className="p-5 flex flex-col flex-1 text-left space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-2/3" />
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6 pb-2">
                     <div className="h-4 bg-slate-200 rounded w-1/4" />
                     <div className="h-4 bg-slate-200 rounded w-1/6" />
                     <div className="h-4 bg-slate-200 rounded w-1/6" />
                  </div>
                  <div className="mt-auto pt-2">
                    <div className="h-10 bg-slate-200 rounded-xl w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <ImageWithLoader src={plan.img} alt={t(plan.title)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 flex flex-col flex-1 text-left font-sans">
                  <h3 className="text-xl font-medium text-slate-900 mb-3">{t(plan.title)}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
                     <div className="flex items-center gap-1.5" title={t("พื้นที่ใช้สอย")}><Maximize className="w-4 h-4 text-slate-400" /> {plan.area}</div>
                     <div className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-slate-400" /> {plan.bed}</div>
                     <div className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-slate-400" /> {plan.bath}</div>
                     <div className="flex items-center gap-1.5"><Car className="w-4 h-4 text-slate-400" /> {plan.car}</div>
                  </div>
                  <div className="mt-auto">
                    <Link to={`/house/${plan.id}`} className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-primary border border-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 w-full">
                      {t('ดูรายละเอียด')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">{t('')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function HomePage() {
  const { t, i18n } = useTranslation();

  const workSteps = useMemo(() => [
    {
      num: "01",
      title: t("1. ออกแบบ"),
      desc: t("ทีมสถาปนิกของเรายินดีสร้างสรรค์บ้านที่สมบูรณ์แบบตามแนวคิดของคุณ ทั้งความสวยงามและฟังก์ชันการใช้งาน ลงตัวทุกสไตล์"),
      icon: <DraftingCompass className="w-12 h-12 text-[#9E2D30]" strokeWidth={1} />
    },
    {
      num: "02",
      title: t("2. คุมงบประมาณ"),
      desc: t("บริหารจัดการงบประมาณอย่างโปร่งใสและแม่นยำ พร้อมเสนอโซลูชันที่เหมาะสม เพื่อการลงทุนที่คุ้มค่าที่สุดของคุณ"),
      icon: <CircleDollarSign className="w-12 h-12 text-[#9E2D30]" strokeWidth={1} />
    },
    {
      num: "03",
      title: t("3. ยื่นขออนุญาต"),
      desc: t("เราดูแลขั้นตอนการยื่นขออนุญาตก่อสร้างกับหน่วยงานราชการทั้งหมด เพื่อให้การก่อสร้างเริ่มต้นได้อย่างราบรื่น"),
      icon: <ClipboardCheck className="w-12 h-12 text-[#9E2D30]" strokeWidth={1} />
    },
    {
      num: "04",
      title: t("4. ก่อสร้าง"),
      desc: t("ทีมวิศวกรและช่างผู้ชำนาญ ดำเนินงานก่อสร้างภายใต้การควบคุมคุณภาพเข้มงวด ใช้วัสดุมาตรฐานเพื่อบ้านที่แข็งแรง ทนทาน ปลอดภัย"),
      icon: <Landmark className="w-12 h-12 text-[#9E2D30]" strokeWidth={1} />
    },
    {
      num: "05",
      title: t("5. ส่งมอบงาน"),
      desc: t("ตรวจสอบงานทุกจุดก่อนส่งมอบ พร้อมให้คำแนะนำในการดูแล และการรับประกันคุณภาพหลังการเข้าอยู่"),
      icon: <Home className="w-12 h-12 text-[#9E2D30]" strokeWidth={1} />
    }
  ], [t]);

  const features = useMemo(() => [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: t('ทีมงานมืออาชีพ'),
      desc: t('ควบคุมงานโดยวิศวกรและสถาปนิกที่มีประสบการณ์สูง')
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: t('วัสดุคุณภาพเยี่ยม'),
      desc: t('เราคัดสรรวัสดุก่อสร้างที่ได้มาตรฐานและมีคุณภาพที่สุดสำหรับบ้านคุณ')
    },
    {
      icon: <Sparkles className="w-6 h-6 text-white" />,
      title: t('สร้างด้วยใจ'),
      desc: t('ดูแลทุกขั้นตอนเสมือนสร้างบ้านของเราเอง จริงใจและโปร่งใส')
    }
  ], [t]);

  const plans = useMemo(() => {
    return [...housePlansData()].sort(() => Math.random() - 0.5).slice(0, 9);
  }, []);
  const readyHouses = readyHousesData().slice(0, 3);
  const lands = landsData().slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPromoPopup, setShowPromoPopup] = useState(() => {
    const hasSeen = sessionStorage.getItem("hasSeenPromoPopup");
    return hasSeen !== "true";
  });

  useEffect(() => {
    if (showPromoPopup === false) {
      sessionStorage.setItem("hasSeenPromoPopup", "true");
    }
  }, [showPromoPopup]);
  const [promoImageError, setPromoImageError] = useState(false);
  const promoImageUrl = "/images/promo_banner.jpeg?v=4";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState<any>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Form Validation State
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', phone: '', message: '' });
  const [touchedFields, setTouchedFields] = useState({ name: false, phone: false, message: false });

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = t('กรุณากรอกชื่อ - นามสกุล');
    } else if (name === 'phone') {
      if (!value.trim()) error = t('กรุณากรอกเบอร์โทรศัพท์');
      else if (!/^[0-9-]{9,12}$/.test(value.replace(/\s+/g, ''))) error = 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (เช่น 090-123-4567)';
    } else if (name === 'message') {
      if (!value.trim()) error = t('กรุณากรอกรายละเอียดที่ต้องการปรึกษา');
    }
    setFormErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touchedFields[name as keyof typeof touchedFields]) {
      validateField(name, value);
    }
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const heroSlides = [
    "/images/general/hero.jpg?v=8",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1613490908579-a42cb4442f2b?auto=format&fit=crop&q=80&w=2000"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);
  
  return (
    <main>
      <SEO 
        title={t("รับออกแบบบ้าน รับสร้างบ้าน เชียงใหม่ | ทาวน์โฮมพร้อมอยู่เชียงใหม่ ที่ดินเชียงใหม่")} 
        description={t("Ruethai Construction ให้บริการออกแบบและสร้างบ้านครบวงจรในเชียงใหม่และภาคเหนือ โดยทีมสถาปนิกและวิศวกรมากประสบการณ์ บ้านเดี่ยว ทาวน์โฮม พร้อมอยู่ กู้เต็ม 100% ดูแลจนกู้ผ่าน")}
        keywords={t("รับสร้างบ้าน, รับออกแบบบ้าน, สร้างบ้านเชียงใหม่, สร้างบ้านลำพูน, สร้างบ้านลำปาง, สร้างบ้านเชียงราย, ขายทาวน์เฮ้าส์เชียงใหม่, ห้องแถวราคาถูก, รับสร้างบ้านเชียงใหม่, ทาวน์โฮมเชียงใหม่, บ้านราคาถูกเชียงใหม่, ฤทัยคอนสตรัคชั่น")}
      />

      <section className="relative h-screen min-h-[600px] flex items-center pt-14 sm:pt-16 overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentSlide}
              src={heroSlides[currentSlide]}
              alt="Luxury home showcase"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10 z-10" />
        </div>

        <div className={`relative z-20 ${styles.paddingX} w-full flex flex-col items-center md:items-start justify-center`}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl flex flex-col items-center md:items-start"
          >
            <h1 className="text-4xl font-light tracking-tight text-white sm:text-6xl md:text-7xl leading-tight text-center md:text-left">
              {t('เรา..สร้างบ้าน')}{i18n.language === 'en' && <br />}
              <span className="text-accent font-medium">{t('ด้วยใจ')}</span>
            </h1>
            <p className="mt-6 text-lg xl:text-xl leading-8 md:leading-9 text-slate-200 font-light max-w-[560px] text-center md:text-left">
              <span className="block mb-2 text-[16px] md:text-[18px]">
                <strong className="font-semibold text-white">{t('ฤทัยคอนสตรัคชั่น')}</strong> <strong className="font-semibold text-white">{t('คือ ศูนย์ให้บริการงานออกแบบก่อสร้าง')}</strong> <strong className="font-semibold text-white">{t('รับสร้างบ้าน')}</strong> <strong className="font-semibold text-white">{t('รับสร้างบ้านเชียงใหม่')}</strong> {t('และอสังหาฯ ในจังหวัดเชียงใหม่ และจังหวัดใกล้เคียง')}
              </span>
              <span className="block text-[16px] md:text-[18px]">{t('ด้วยประสบการณ์กว่า 15 ปี เราทำงานอย่างโปร่งใส เน้นคุมงบประมาณให้แม่นยำ สร้างบ้านในฝันของคุณให้เป็นจริงด้วยทีมงานมืออาชีพ มั่นใจได้ในทุกขั้นตอน')}</span>
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-x-6">
              <a href="#services" className="rounded-full bg-accent px-5 py-2 sm:px-8 sm:py-3.5 text-base font-medium text-primary shadow-sm hover:bg-accent/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent animate-pulse-scale">
                {t('ดูบริการของเรา')}
              </a>
              <a href="#portfolio" className="py-2 sm:py-0 text-base font-medium leading-6 text-white flex items-center justify-center gap-2 hover:text-accent transition-all duration-300 group hover:translate-x-1">
                {t('ผลงานที่ผ่านมา')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a href="https://line.me/ti/p/~ruthaiconstr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border border-slate-200 hover:border-[#00B900] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-md group" aria-label="LINE Official">
                <svg className="w-7 h-7 text-slate-400 group-hover:text-[#00B900] transition-colors duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M64 27.487c0-14.32-14.355-25.97-32-25.97S0 13.168 0 27.487c0 12.837 11.384 23.588 26.762 25.62 1.042.225 2.46.688 2.82 1.578.322.81.21 2.076.103 2.894l-.457 2.74c-.14.81-.643 3.164 2.772 1.725s18.428-10.852 25.143-18.58h-.001C61.78 38.38 64 33.218 64 27.487" fill="currentColor"/>
                  <path d="M25.498 20.568h-2.245c-.344 0-.623.28-.623.623v13.943a.62.62 0 0 0 .623.62h2.245a.62.62 0 0 0 .623-.62V21.2c0-.343-.28-.623-.623-.623m15.45-.01h-2.244c-.345 0-.624.28-.624.623v8.284l-6.4-8.63c-.014-.022-.03-.043-.048-.063l-.004-.004a.4.4 0 0 0-.038-.038l-.044-.04c-.006-.004-.01-.008-.016-.012l-.032-.022-.02-.012-.033-.02c-.006-.002-.014-.006-.02-.01-.012-.006-.023-.012-.036-.016s-.014-.006-.02-.006c-.012-.006-.025-.008-.037-.012l-.022-.006c-.012-.002-.023-.006-.035-.008l-.026-.004c-.008-.002-.022-.004-.033-.004l-.032-.002c-.008 0-.014-.001-.022-.001h-2.244c-.344 0-.623.28-.623.623V35.13a.62.62 0 0 0 .623.62h2.244c.344 0 .624-.278.624-.62v-8.28l6.397 8.64a.63.63 0 0 0 .158.154c.018.014.032.022.045.03.006.004.012.008.018.01s.02.01.03.014.02.008.03.014l.06.022a.62.62 0 0 0 .168.022h2.244a.62.62 0 0 0 .623-.62V21.2c0-.343-.28-.623-.623-.623" fill="white"/>
                  <path d="M20.087 32.264h-6.1V21.2c0-.344-.28-.623-.623-.623H11.12c-.344 0-.623.28-.623.623v13.942a.62.62 0 0 0 .174.431c.012.012.014.016.016.018.113.107.264.174.43.174h8.968c.344 0 .623-.28.623-.623v-2.245c0-.344-.278-.623-.623-.623m33.258-8.214c.344 0 .623-.28.623-.623V21.2c0-.344-.278-.623-.623-.623h-8.968c-.168 0-.32.067-.432.176-.012.01-.016.014-.018.018-.107.1-.173.262-.173.43v13.943a.62.62 0 0 0 .174.431l.016.016a.62.62 0 0 0 .431.174h8.968c.344 0 .623-.28.623-.623v-2.246c0-.344-.278-.623-.623-.623h-6.098v-2.357h6.098a.62.62 0 0 0 .623-.623V27.04c0-.344-.278-.624-.623-.624h-6.098V24.06h6.098z" fill="white"/>
                </svg>
              </a>
              <a href="https://web.facebook.com/ruthaiconstr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border border-slate-200 hover:border-[#1877F2] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-md group" aria-label="Facebook">
                <svg className="w-6 h-6 text-slate-400 group-hover:text-[#1877F2] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="tel:0902813051" className="w-12 h-12 rounded-xl bg-white border border-slate-200 hover:border-[#10B981] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-md group" aria-label="Phone">
                <svg className="w-5 h-5 text-slate-400 group-hover:text-[#10B981] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full border border-white/20 transition-all duration-350 ${
                currentSlide === idx 
                  ? "bg-accent w-8" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Video Introduction Section */}
      <section className={`bg-white ${styles.sectionPadding}`}>
        <div className={styles.paddingX}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl lg:max-w-lg w-full"
            >
              <div className="flex justify-center flex-col items-center mb-4">
                <img src="/images/general/Logo.webp" alt="Ruethai Construction Logo" className="h-24 w-auto object-contain mb-3" />
                <h2 className="text-[24px] md:text-[26px] font-medium leading-7 text-primary tracking-[0.1em] text-center" style={{ fontFamily: '"Playfair Display", "Times New Roman", serif', textShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
                  ฤทัยคอนสตรัคชั่น
                </h2>
              </div>
              <p className="mt-2 text-3xl font-light tracking-tight text-slate-900 sm:text-4xl text-center">
                {t('สร้างบ้านด้วยความเข้าใจ')} <br className="hidden sm:block" />{t('สะท้อนตัวตนของคุณ')}
              </p>
              <p className="mt-6 text-[17px] leading-8 text-slate-600 text-center">
                {t('เราขับเคลื่อนด้วยความมุ่งมั่นที่จะเติบยั้ง เพื่อส่งมอบผลงานการสร้างบ้านที่เปี่ยมด้วยคุณภาพสูงสุดให้แก่คุณ ทุกๆ โครงการที่เราสร้างสรรค์ ล้วนสะท้อนถึงวิสัยทัศน์อันกว้างไกล ความเอาใจใส่อย่างพิถีพิถันในทุกรายละเอียดของการดำเนินงาน ตลอดจนความเคร่งครัดในมาตรฐานทางวิศวกรรมที่ทีมงานมืออาชีพของเรายึดถือเป็นหัวใจสำคัญอย่างเคร่งครัด')}
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link to="/portfolio" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  {t('ชมผลงานของเรา')}
                </Link>
                <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-primary bg-primary/10 rounded-xl hover:bg-primary/20 transition-all duration-300">
                  {t('ปรึกษาเรา')}
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[280px] shrink-0 lg:max-w-[320px] aspect-[9/16] drop-shadow-2xl"
              ref={videoRef}
            >
              {/* iPhone Hardware Frame */}
              <div className="absolute inset-0 rounded-[2.5rem] border-[6px] lg:border-[8px] border-zinc-800 bg-transparent z-20 pointer-events-none shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[30%] h-5 bg-black rounded-full z-30 flex items-center justify-end px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 mr-1 shadow-[inset_0_0_1px_rgba(255,255,255,0.2)]" />
                </div>
              </div>
              
              {/* Hardware Buttons */}
              <div className="absolute -left-[3px] lg:-left-[4px] top-20 lg:top-24 w-[3px] lg:w-[4px] h-6 lg:h-8 bg-zinc-700 rounded-l-sm z-[-1] shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]" />
              <div className="absolute -left-[3px] lg:-left-[4px] top-32 lg:top-36 w-[3px] lg:w-[4px] h-10 lg:h-12 bg-zinc-700 rounded-l-sm z-[-1] shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]" />
              <div className="absolute -left-[3px] lg:-left-[4px] top-44 lg:top-52 w-[3px] lg:w-[4px] h-10 lg:h-12 bg-zinc-700 rounded-l-sm z-[-1] shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]" />
              <div className="absolute -right-[3px] lg:-right-[4px] top-36 lg:top-40 w-[3px] lg:w-[4px] h-14 lg:h-16 bg-zinc-700 rounded-r-sm z-[-1] shadow-[inset_-1px_0_1px_rgba(255,255,255,0.1)]" />

              {/* Screen Content */}
              <div className="absolute inset-[6px] lg:inset-[8px] rounded-[2rem] border-[3px] border-black overflow-hidden bg-black z-10 [&>div]:w-full [&>div]:h-full flex items-center justify-center group pointer-events-auto">
                {isVideoPlaying ? (
                  <YouTube
                    videoId="o1nJfQWxoYo"
                    className="w-full h-full"
                    iframeClassName="w-full h-full object-cover border-0 scale-[1.02]"
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: {
                        autoplay: 1,
                        loop: 1,
                        playlist: 'o1nJfQWxoYo',
                        playsinline: 1,
                        controls: 1,
                        rel: 0,
                        disablekb: 0,
                        modestbranding: 1,
                        showinfo: 0
                      }
                    }}
                    onReady={(event) => {
                      setVideoPlayer(event.target);
                      event.target.setVolume(90);
                    }}
                    onStateChange={(event) => {
                      if (event.data === 0) { // YouTube.PlayerState.ENDED
                        event.target.playVideo();
                      }
                    }}
                  />
                ) : (
                  <div 
                    onClick={() => setIsVideoPlaying(true)}
                    className="relative w-full h-full cursor-pointer overflow-hidden group/video flex flex-col justify-between p-6"
                  >
                    {/* Cover image (HQ YouTube cover mockup) */}
                    <img 
                      src="https://img.youtube.com/vi/o1nJfQWxoYo/hqdefault.jpg" 
                      alt="ST Construction VDO Showcase Cover" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105"
                      loading="lazy"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover/video:bg-black/35" />
                    
                    {/* Badge */}
                    <div className="relative z-10 text-center w-full mt-4">
                      <span className="text-white text-[10px] font-mono tracking-widest uppercase bg-black/50 backdrop-blur-md px-3 py-1 rounded-full inline-block border border-white/10">
                        VDO SHOWCASE
                      </span>
                    </div>

                    {/* Elite play button with ripple hover */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover/video:scale-110 group-hover/video:bg-primary group-hover/video:shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]">
                        <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Sub title */}
                    <div className="relative z-10 text-center w-full mb-6">
                      <p className="text-white/95 text-xs font-light tracking-wider drop-shadow-md bg-black/20 backdrop-blur-[2px] py-1 rounded-md">
                        {t('คลิกเพื่อเล่นวิดีโอแนะนำ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="bg-[#3D3A38] py-24 md:py-32 relative overflow-hidden">
        <motion.div
           className="absolute inset-0 z-0 bg-cover bg-center"
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000")' }}
           initial={{ scale: 1 }}
           animate={{ scale: 1.05 }}
           transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </motion.div>
        
        <div className={`${styles.paddingX} relative z-10 max-w-7xl mx-auto`}>
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-center max-w-5xl mx-auto mb-16 md:mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-normal tracking-wide text-white mb-6 font-sans">
              {t('ขั้นตอนการทำงาน')}
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-[17px] leading-relaxed font-light max-w-4xl mx-auto">
              {t('ด้วยประสบการณ์ที่มีมากกว่า 15 ปี จึงทำให้ทางเราเล็งเห็นถึงความสำคัญของการควบคุมงบในการรับสร้างบ้าน ต่อเติม หรือปรับปรุงต่าง ๆ ของลูกค้าเป็นสำคัญ จึงทำให้เรามีความตั้งใจที่จะคุมงบให้ตรงตามที่ลูกค้าต้องการให้ได้มากที่สุด และแม่นยำ เพราะเราเป็นทีมรับสร้างบ้านมืออาชีพ ที่พร้อมสร้างสรรค์บ้านในฝันของคุณให้เป็นจริง ด้วยกระบวนการทำงานที่เข้าใจง่าย มั่นใจได้ในทุกขั้นตอน')}
            </p>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.7, delay: 0.2 }}
             className="bg-white rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] border border-slate-100 p-8 md:p-12 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {workSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center px-2 pt-6 md:pt-0 md:first:pl-0 md:pl-4 first:pt-0"
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110">
                    {step.icon}
                  </div>
                  <h3 className="text-slate-900 text-[19px] md:text-xl font-medium mb-3 font-sans">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-light max-w-[240px] mx-auto md:max-w-none">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* House Categories Section */}
      <section id="house-categories" className={`bg-slate-50 ${styles.sectionPadding}`}>
        <div className={styles.paddingX}>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <HomeIcon className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              {t('หมวดหมู่แบบบ้านตามสไตล์')}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {t('เลือกรับชมแบบบ้านหลากหลายสไตล์ที่คัดสรรและออกแบบโดยสถาปนิกมืออาชีพ ตอบโจทย์ทุกความต้องการของคุณ')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {houseCategoriesData().map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <ImageWithLoader
                    src={category.img}
                    alt={t(category.title)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-1 items-center justify-center text-center">
                  <h3 className="text-xl font-medium text-slate-900 mb-4">{t(category.title)}</h3>
                  <Link
                    to={`/houses/category/${category.id}`}
                    className="mt-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md w-full sm:w-auto"
                  >
                    {t('ดูแบบบ้านสไตล์นี้')} <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/houses"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-pulse-scale"
            >
              {t('ดูแบบบ้านทั้งหมด')} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ready Houses Section */}
      <section id="ready-houses" className={`bg-white ${styles.sectionPadding}`}>
        <div className={styles.paddingX}>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <Key className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              {t('โครงการบ้านพร้อมอยู่')}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {t('สัมผัสความสมบูรณ์แบบกับโครงการบ้านพร้อมอยู่ ทำเลศักยภาพที่ตอบโจทย์คุณ')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {readyHouses.map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <ImageWithLoader src={item.img} alt={t(item.title)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-1 items-center justify-center text-center">
                  <h3 className="text-xl font-medium text-slate-900 mb-2">{t(item.title)}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-4">{t(item.desc)}</p>
                  <Link to={`/ready-house/${item.id}`} className="mt-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md w-full sm:w-auto">
                    {t('ดูรายละเอียด')}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/ready-houses" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-pulse-scale">
              {t('ดูโครงการทั้งหมด')} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lands Section */}
      <section id="lands" className={`bg-slate-50 ${styles.sectionPadding}`}>
        <div className={styles.paddingX}>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <Mountain className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              {t('ที่ดินจังหวัดเชียงใหม่')}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {t('รวมรายการที่ดินเปล่าทำเลทอง สำหรับสร้างบ้านหรือลงทุนเพื่ออนาคต')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {landsData().slice(0, 3).map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <ImageWithLoader src={item.img} alt={t(item.title)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-1 items-center justify-center text-center">
                  <h3 className="text-xl font-medium text-slate-900 mb-2">{t(item.title)}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-4">{t(item.desc)}</p>
                  <Link to={`/land/${item.id}`} className="mt-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md w-full sm:w-auto">
                    {t('ดูรายละเอียด')}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/lands" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-pulse-scale">
              {t('ดูที่ดินทั้งหมด')} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className={`bg-white ${styles.sectionPadding}`}>
        <div className={styles.paddingX}>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              {t('ทำไมต้องเลือกเรา')}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {t('ฤทัยคอนสตรัคชั่น มุ่งมั่นสร้างสรรค์งานคุณภาพและบริการที่ดีที่สุด')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">{t(feature.title)}</h3>
                <p className="text-slate-600 leading-relaxed font-light">{t(feature.desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section id="portfolio" className={`bg-primary text-white ${styles.sectionPadding}`}>
        <div className={styles.paddingX}>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <Trophy className="w-12 h-12 text-white opacity-80" strokeWidth={1} />
            </div>
            <h2 className="text-base font-medium leading-7 text-accent tracking-wide uppercase">Portfolio</h2>
            <p className="mt-2 text-3xl font-medium tracking-tight text-white sm:text-4xl">{t('')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioCategoriesData().map((category, idx) => (
              <Link key={idx} to={`/portfolio/category/${category.id}`} className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300">
                <img src={category.img} alt={category.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-center">
                    <h3 className="text-xl font-medium text-white mb-2">{t(category.title)}</h3>
                    <p className="text-sm text-slate-300 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      {t('ดูผลงานทั้งหมด')} <ArrowRight className="w-4 h-4" />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-primary font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg group"
            >
              {t('รวมผลงานทั้งหมด')}
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className={`bg-white ${styles.sectionPadding}`}>
        <div className={`${styles.paddingX}`}>
          <div className="bg-slate-50 rounded-3xl px-8 py-8 sm:px-16 sm:py-10 lg:px-20 lg:py-10 relative overflow-hidden border border-slate-200">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute border border-slate-200 w-full h-[1px] top-1/2 left-0 opacity-50"></div>
            <div className="absolute border border-slate-200 w-[1px] h-full top-0 left-1/2 opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center gap-16">
              <div className="pt-8 sm:pt-10 flex flex-col items-center text-center">
                <div className="flex justify-center mb-6">
                  <Sparkles className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
                </div>
                <h2 className="text-[27px] sm:text-[27px] font-medium tracking-tight text-slate-900 mb-6">
                  {t('พร้อมจะสร้างบ้าน')}<br/>{t('ในฝันของคุณหรือยัง?')}
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-lg">
                  {t('ปรึกษาเรื่องการสร้างบ้านกับผู้เชี่ยวชาญจาก ฤทัยคอนสตรัคชั่น ฟรี ไม่มีค่าใช้จ่าย พร้อมประเมินราคาเบื้องต้นได้อย่างรวดเร็ว')}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl text-left">
                  <div className="flex items-center text-slate-700 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mr-4 shrink-0 shadow-sm">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-slate-700">{t('')}</p>
                      <p className="text-base font-normal text-primary">090-281-3051 ({t('สถาปนิก')})</p>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-700 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mr-4 shrink-0 shadow-sm">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-slate-700">{t('')}</p>
                      <p className="text-base font-normal text-primary">admin@ruthai.co.th</p>
                    </div>
                  </div>
                  <a href="https://maps.google.com/?q=18.7764025222936,98.99820278766983" target="_blank" rel="noopener noreferrer" className="flex items-center text-white bg-slate-800 hover:bg-slate-700 transition-colors p-6 rounded-2xl shadow-sm border border-slate-700 sm:col-span-2 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-slate-700/50 border border-slate-600 flex items-center justify-center mr-4 shrink-0 shadow-sm group-hover:bg-slate-600/50 transition-colors">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-white mb-1">{t('')}</p>
                      <p className="text-base font-normal text-slate-200">{t('')}</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center text-slate-700 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <a href="https://web.facebook.com/ruthaiconstr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mr-4 shrink-0 shadow-sm hover:border-[#1877F2] group transition-colors">
                      <svg className="w-5 h-5 text-primary group-hover:text-[#1877F2] transition-colors" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <div>
                      <p className="text-base font-medium text-slate-700">Facebook</p>
                      <p className="text-base font-normal text-primary"><a href="https://web.facebook.com/ruthaiconstr" target="_blank" rel="noopener noreferrer" className="hover:text-[#1877F2] transition-colors duration-300">ruthaiconstr</a></p>
                    </div>
                  </div>

                  <div className="flex items-center text-slate-700 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <a href="https://line.me/ti/p/~ruthaiconstr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mr-4 shrink-0 shadow-sm hover:border-[#00B900] group transition-colors">
                      <svg className="w-6 h-6 text-primary group-hover:text-[#00B900] transition-colors" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64 27.487c0-14.32-14.355-25.97-32-25.97S0 13.168 0 27.487c0 12.837 11.384 23.588 26.762 25.62 1.042.225 2.46.688 2.82 1.578.322.81.21 2.076.103 2.894l-.457 2.74c-.14.81-.643 3.164 2.772 1.725s18.428-10.852 25.143-18.58h-.001C61.78 38.38 64 33.218 64 27.487" fill="currentColor"/>
                        <path d="M25.498 20.568h-2.245c-.344 0-.623.28-.623.623v13.943a.62.62 0 0 0 .623.62h2.245a.62.62 0 0 0 .623-.62V21.2c0-.343-.28-.623-.623-.623m15.45-.01h-2.244c-.345 0-.624.28-.624.623v8.284l-6.4-8.63c-.014-.022-.03-.043-.048-.063l-.004-.004a.4.4 0 0 0-.038-.038l-.044-.04c-.006-.004-.01-.008-.016-.012l-.032-.022-.02-.012-.033-.02c-.006-.002-.014-.006-.02-.01-.012-.006-.023-.012-.036-.016s-.014-.006-.02-.006c-.012-.006-.025-.008-.037-.012l-.022-.006c-.012-.002-.023-.006-.035-.008l-.026-.004c-.008-.002-.022-.004-.033-.004l-.032-.002c-.008 0-.014-.001-.022-.001h-2.244c-.344 0-.623.28-.623.623V35.13a.62.62 0 0 0 .623.62h2.244c.344 0 .624-.278.624-.62v-8.28l6.397 8.64a.63.63 0 0 0 .158.154c.018.014.032.022.045.03.006.004.012.008.018.01s.02.01.03.014.02.008.03.014l.06.022a.62.62 0 0 0 .168.022h2.244a.62.62 0 0 0 .623-.62V21.2c0-.343-.28-.623-.623-.623" fill="white"/>
                        <path d="M20.087 32.264h-6.1V21.2c0-.344-.28-.623-.623-.623H11.12c-.344 0-.623.28-.623.623v13.942a.62.62 0 0 0 .174.431c.012.012.014.016.016.018.113.107.264.174.43.174h8.968c.344 0 .623-.28.623-.623v-2.245c0-.344-.278-.623-.623-.623m33.258-8.214c.344 0 .623-.28.623-.623V21.2c0-.344-.278-.623-.623-.623h-8.968c-.168 0-.32.067-.432.176-.012.01-.016.014-.018.018-.107.1-.173.262-.173.43v13.943a.62.62 0 0 0 .174.431l.016.016a.62.62 0 0 0 .431.174h8.968c.344 0 .623-.28.623-.623v-2.246c0-.344-.278-.623-.623-.623h-6.098v-2.357h6.098a.62.62 0 0 0 .623-.623V27.04c0-.344-.278-.624-.623-.624h-6.098V24.06h6.098z" fill="white"/>
                      </svg>
                    </a>
                    <div>
                      <p className="text-base font-medium text-slate-700">Line Official</p>
                      <p className="text-base font-normal text-primary"><a href="https://line.me/ti/p/~ruthaiconstr" target="_blank" rel="noopener noreferrer" className="hover:text-[#00B900] transition-colors duration-300">@ruthaiconstr</a></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center w-full max-w-7xl mt-12 mx-auto">
                <div className="flex justify-center mb-6">
                  <MessageSquare className="w-12 h-12 text-primary opacity-80" strokeWidth={1} />
                </div>
                <h3 className="text-[24px] font-medium text-slate-900 mb-8">{t('')}</h3>
                <form 
                  className="space-y-6 w-full text-left max-w-6xl"
                  onSubmit={(e) => {
                    e.preventDefault();
                    
                    // Validate all fields on submit
                    const isNameValid = validateField('name', formData.name);
                    const isPhoneValid = validateField('phone', formData.phone);
                    const isMessageValid = validateField('message', formData.message);
                    setTouchedFields({ name: true, phone: true, message: true });

                    if (!isNameValid || !isPhoneValid || !isMessageValid) {
                      return;
                    }

                    setIsSubmitting(true);
                    
                    const formElement = e.currentTarget;
                    const formDataObj = new FormData(formElement);
                    formDataObj.append('_captcha', 'false');
                    
                    fetch("https://formsubmit.co/ajax/inasstudio@gmail.com", {
                      method: "POST",
                      headers: { 
                          'Accept': 'application/json'
                      },
                      body: formDataObj
                    })
                    .then(response => {
                       if (!response.ok) {
                         throw new Error(`HTTP error! status: ${response.status}`);
                       }
                       return response.json();
                    })
                    .then(data => {
                      setIsSubmitting(false);
                      setSubmitError(false);
                      setSubmitSuccess(true);
                      setFormData({ name: '', phone: '', message: '' });
                      setTouchedFields({ name: false, phone: false, message: false });
                      formElement.reset();
                      setTimeout(() => setSubmitSuccess(false), 5000);
                    })
                    .catch(error => {
                      console.error('Error submitting form:', error);
                      setIsSubmitting(false);
                      setSubmitError(true);
                      setTimeout(() => setSubmitError(false), 5000);
                    });
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-base font-medium leading-6 text-slate-900">{t('')}</label>
                      <div className="mt-2 relative">
                        <input 
                          type="text" 
                          name="name" 
                          id="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          className={`block w-full rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-colors ${
                            touchedFields.name && formErrors.name 
                              ? 'ring-red-300 text-red-900 placeholder:text-red-300 focus:ring-red-500' 
                              : 'ring-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-primary'
                          }`} 
                          placeholder={t('สายชล ใจดี')} 
                        />
                        {touchedFields.name && formErrors.name && (
                          <p className="mt-2 text-sm text-red-600" id="name-error">
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-base font-medium leading-6 text-slate-900">{t('')}</label>
                      <div className="mt-2 relative">
                        <input 
                          type="tel" 
                          name="phone" 
                          id="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          className={`block w-full rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-colors ${
                            touchedFields.phone && formErrors.phone 
                              ? 'ring-red-300 text-red-900 placeholder:text-red-300 focus:ring-red-500' 
                              : 'ring-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-primary'
                          }`} 
                          placeholder="090-XXX-XXXX" 
                        />
                        {touchedFields.phone && formErrors.phone && (
                          <p className="mt-2 text-sm text-red-600" id="phone-error">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-base font-medium leading-6 text-slate-900">{t('')}</label>
                    <div className="mt-2 relative">
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4} 
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className={`block w-full rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-colors ${
                          touchedFields.message && formErrors.message 
                            ? 'ring-red-300 text-red-900 placeholder:text-red-300 focus:ring-red-500' 
                            : 'ring-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-primary'
                        }`} 
                        placeholder={t('ขนาดที่ดิน, สไตล์บ้านที่ชื่นชอบ, หรืองบประมาณที่ตั้งไว้...')}
                      ></textarea>
                      {touchedFields.message && formErrors.message && (
                        <p className="mt-2 text-sm text-red-600" id="message-error">
                          {formErrors.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="attachment" className="block text-base font-medium leading-6 text-slate-900">{t('')}</label>
                    <div className="mt-2">
                      <input 
                        type="file" 
                        id="attachment" 
                        name="attachment" 
                        accept="image/png, image/jpeg, application/pdf"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
                      />
                    </div>
                  </div>
                  {/* Add a honeypot field for Formsubmit to prevent spam */}
                  <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                  <input type="hidden" name="_subject" value={t("การติดต่อใหม่จากหน้าเว็บไซต์ ฤทัยคอนสตรัคชั่น")} />
                  <input type="hidden" name="_template" value="box" />
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center rounded-full bg-primary px-3.5 py-4 text-center text-lg font-medium text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-pulse-scale disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('กำลังส่งข้อความ...')}
                      </span>
                    ) : (
                      t('ส่งข้อความ')
                    )}
                  </button>
                  {submitSuccess && (
                     <div className="mt-3 p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center">
                       <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                       {t('ส่งข้อความสำเร็จแล้ว เราจะติดต่อกลับโดยเร็วที่สุด')}
                     </div>
                  )}
                  {submitError && (
                     <div className="mt-3 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center">
                       <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                       {t('เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง')}
                     </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⚠️ Promo Popup Advertisement (ขนาด 800 x 597) */}
      <AnimatePresence>
        {showPromoPopup && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop with elegant blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPromoPopup(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-[6px] cursor-pointer"
            />

            {/* Popup Container (800 x 597 on desktop, beautifully responsive scaling preserving aspect ratio on mobile) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
              className="relative w-[92vw] max-w-[800px] aspect-[800/597] md:h-[597px] rounded-3xl overflow-hidden bg-[#0A0F1D] shadow-[0_25px_65px_-12px_rgba(0,0,0,0.9)] border border-white/10 flex flex-col justify-between text-left group select-none"
            >
              {!promoImageError ? (
                /* Pure Image Promotion (displays when the user uploads promo_banner.jpg) */
                <div className="relative w-full h-full">
                  <img
                    src={promoImageUrl}
                    alt="C-HOME Chiangmai Townhome promotion"
                    onError={() => setPromoImageError(true)}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating click overlay */}
                  <Link
                    to="/ready-house/ready-1"
                    onClick={() => {
                      setShowPromoPopup(false);
                    }}
                    className="absolute inset-0 z-10 cursor-pointer"
                  />
                </div>
              ) : (
                /* High-fidelity CSS Mockup resembling the user's uploaded flyer (Displays as fallback) */
                <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 text-white overflow-hidden font-sans">
                  {/* Background of the modern luxury townhouse on the right side */}
                  <div 
                    className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-40 mix-blend-luminosity scale-100 transition-transform duration-10000 ease-out group-hover:scale-105 pointer-events-none"
                    style={{ 
                      backgroundImage: `url('https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&q=80&w=1200')`,
                    }} 
                  />
                  {/* Left-to-right vignette to guarantee outstanding text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D] via-[#0A0F1D]/90 to-transparent z-1 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-[#0A0F1D]/50 z-1 pointer-events-none" />

                  {/* Logo header */}
                  <div className="relative z-10 flex flex-row justify-between items-center w-full">
                    <div className="flex items-center gap-1.5 font-bold tracking-wider text-amber-400" style={{ fontFamily: 'Prompt, sans-serif' }}>
                      <Building2 className="w-5 h-5 text-amber-400" />
                      <span>C-HOME <span className="text-white/70 font-light text-[10px]">CHIANGMAI</span></span>
                    </div>
                  </div>

                  {/* Body: Left-aligned details */}
                  <div className="relative z-10 mt-4 max-w-[480px]">
                    <div className="inline-block px-2.5 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-medium rounded-md mb-2" style={{ fontFamily: 'Prompt, sans-serif' }}>
                      {t('สัญญากับเรา มั่นใจ คุ้มค่าที่สุด')}
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight" style={{ fontFamily: 'Prompt, sans-serif' }}>
                      {t('บ้านทาวน์โฮม')} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 font-bold">
                        {t('เริ่มต้นที่ 2.49 ล้านบาท')}
                      </span>
                    </h3>

                    {/* Badge: เปิดให้จอง */}
                    <div className="mt-3.5 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase shadow-[0_4px_12px_rgba(245,158,11,0.3)] animate-pulse" style={{ fontFamily: 'Prompt, sans-serif' }}>
                      <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                      {t('เปิดให้จอง | แต่งครบพร้อมอยู่')}
                    </div>

                    {/* Property Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 mt-5 sm:max-w-md">
                      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-2.5 text-center">
                        <div className="text-[10px] text-slate-400 block tracking-wider font-light" style={{ fontFamily: 'Prompt, sans-serif' }}>{t('')}</div>
                        <div className="text-sm font-bold text-amber-300 mt-0.5" style={{ fontFamily: 'Prompt, sans-serif' }}>{t('')}</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-2.5 text-center">
                        <div className="text-[10px] text-slate-400 block tracking-wider font-light" style={{ fontFamily: 'Prompt, sans-serif' }}>{t('')}</div>
                        <div className="text-sm font-bold text-amber-300 mt-0.5" style={{ fontFamily: 'Prompt, sans-serif' }}>{t('')}</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-2.5 text-center">
                        <div className="text-[10px] text-slate-400 block tracking-wider font-light" style={{ fontFamily: 'Prompt, sans-serif' }}>{t('')}</div>
                        <div className="text-sm font-bold text-amber-300 mt-0.5" style={{ fontFamily: 'Prompt, sans-serif' }}>{t('')}</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer part: stats, contacts and book button inline */}
                  <div className="relative z-10 grid grid-cols-12 gap-4 items-center border-t border-white/10 pt-4 mt-4 w-full">
                    {/* Brand details / Call-to-action */}
                    <div className="col-span-12 sm:col-span-7 flex flex-col gap-1 text-[11px] text-slate-300" style={{ fontFamily: 'Prompt, sans-serif' }}>
                      <div className="font-semibold text-white tracking-wide text-xs">{t('')}</div>
                      <div>{t('')}</div>
                      
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-amber-400" /> 090-281-3051</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-400" /> {t('สันกลาง สันกำแพง')}</span>
                      </div>
                    </div>

                    {/* Promotion box acting as button linking to registration */}
                    <div className="col-span-12 sm:col-span-5 flex justify-end">
                      <Link
                        to="/ready-house/ready-1"
                        onClick={() => {
                          setShowPromoPopup(false);
                        }}
                        className="w-full text-center py-2.5 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold rounded-xl text-xs flex flex-col items-center justify-center transition-all duration-300 shadow-[0_4px_14px_rgba(245,158,11,0.25)] hover:scale-[1.02] cursor-pointer"
                        style={{ fontFamily: 'Prompt, sans-serif' }}
                      >
                        <span className="text-[9px] text-slate-950/80 font-bold tracking-wider uppercase">{t("TODAY'S PROMOTION")}</span>
                        <span className="text-sm font-extrabold tracking-wide text-red-700 animate-pulse">{t('')}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Close button (X) */}
              <button
                onClick={() => setShowPromoPopup(false)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 text-white hover:text-amber-400 flex items-center justify-center transition-all duration-300 shadow-md group/close cursor-pointer"
                aria-label="Close advertisement"
              >
                <X className="w-5 h-5 group-hover/close:rotate-90 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

function getLargeImage(url: string): string {
  if (!url) return url;
  return url
    .replace("-trumbnall", "")
    .replace("-thumbnail", "")
    .replace("_thumbnail", "")
    .replace("_trumbnall", "");
}

function getThumbnailImage(url: string): string {
  if (!url) return url;
  if (url.includes("-trumbnall") || url.includes("-thumbnail") || url.includes("_thumbnail") || url.includes("_trumbnall")) {
    return url;
  }
  const lastDotIdx = url.lastIndexOf(".");
  if (lastDotIdx !== -1) {
    const basePath = url.substring(0, lastDotIdx);
    const extAndQuery = url.substring(lastDotIdx); // e.g. .jpg?v=10
    const queryIdx = extAndQuery.indexOf("?");
    let ext = extAndQuery;
    let query = "";
    if (queryIdx !== -1) {
      ext = extAndQuery.substring(0, queryIdx);
      query = extAndQuery.substring(queryIdx);
    }
    return `${basePath}-trumbnall${ext}${query}`;
  }
  return url;
}

function ImageWithThumbnailFallback({ 
  src, 
  alt, 
  className,
  loading = "lazy"
}: { 
  src: string; 
  alt: string; 
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [imgSrc, setImgSrc] = useState(getThumbnailImage(src));

  useEffect(() => {
    setImgSrc(getThumbnailImage(src));
  }, [src]);

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      loading={loading}
      decoding="async"
      className={className}
      onError={() => {
        if (imgSrc !== src) {
          setImgSrc(src);
        }
      }}
      referrerPolicy="no-referrer"
    />
  );
}

interface BlueprintVisualizerProps {
  plan: any;
  activeTab: number;
  t: any;
}

function BlueprintVisualizer({ plan, activeTab, t }: BlueprintVisualizerProps) {
  const isSecondFloor = activeTab === 2;
  const isThirdFloor = activeTab === 3;
  
  return (
    <div className="bg-slate-950 font-mono text-[11px] text-slate-300 rounded-3xl border border-slate-800 shadow-inner relative overflow-hidden p-6 md:p-8 select-none">
      {/* CAD technical coordinate borders */}
      <div className="absolute top-3 left-4 text-slate-600/60 tracking-wider text-[9px] uppercase">PROJECT: RUETHAI_SYSTEM_CAD_DRAFT</div>
      <div className="absolute top-3 right-4 text-slate-600/60 text-[9px]">SCALE: 1:100 | UNIT: METRIC (M)</div>
      
      {/* Blueprint Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:28px_28px] opacity-25 pointer-events-none" />

      {/* Main Drafting Canvas */}
      <div className="relative border border-slate-800 bg-slate-900/40 p-5 md:p-6 rounded-2xl min-h-[340px] flex flex-col justify-between mt-4">
        
        {/* Draw Layout Canvas based on tabs */}
        {isSecondFloor ? (
          /* Floor 2 Layout */
          <div className="grid grid-cols-12 gap-3 h-full min-h-[260px]">
            {/* Master Suite */}
            <div className="col-span-12 md:col-span-6 border-2 border-accent bg-[#E2B276]/5 p-4 rounded-xl flex flex-col justify-between relative group hover:bg-[#E2B276]/10 transition-all duration-300">
              <span className="absolute top-2 right-2 text-[9px] text-[#E2B276] font-bold">SUITE A</span>
              <div>
                <h4 className="font-semibold text-[#E2B276] text-xs tracking-wider">MASTER BEDROOM</h4>
                <p className="text-[10px] text-slate-400 mt-1">{t('')}</p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-slate-300 text-[10px]">
                  <Bed className="w-3.5 h-3.5 text-[#E2B276]" />
                  <span>5.2m x 4.6m</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300 text-[10px]">
                  <Bath className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t('')}</span>
                </div>
              </div>
            </div>

            {/* Bedroom 2 & 3 */}
            <div className="col-span-12 md:col-span-6 flex flex-col gap-3">
              <div className="flex-1 border border-slate-700 bg-slate-900/60 p-4 rounded-xl flex flex-col justify-between hover:border-slate-500 transition-all duration-300">
                <h4 className="font-semibold text-slate-200 text-xs">BEDROOM 2</h4>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                  <span>W: 4.0m x L: 4.0m</span>
                  <Bed className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>

              {plan.bed > 2 ? (
                <div className="flex-1 border border-slate-700 bg-slate-900/60 p-4 rounded-xl flex flex-col justify-between hover:border-slate-500 transition-all duration-300">
                  <h4 className="font-semibold text-slate-200 text-xs">BEDROOM 3</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span>W: 3.8m x L: 4.0m</span>
                    <Bed className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </div>
              ) : (
                <div className="flex-1 border border-dashed border-slate-800 bg-slate-950 p-4 rounded-xl flex flex-col justify-between">
                  <h4 className="font-semibold text-slate-500 text-xs">FAMILY CHILL-OUT ZONE</h4>
                  <div className="text-[10px] text-slate-600 mt-1">W: 3.5m x L: 4.0m</div>
                </div>
              )}
            </div>
            <div className="col-span-12 md:col-span-6 border border-dashed border-sky-400/40 bg-sky-950/10 p-4 rounded-xl flex flex-col justify-between">
              <h4 className="font-semibold text-sky-400 text-xs">SKY TERRACE</h4>
              <p className="text-[10px] text-slate-400 mt-1">{t('')}</p>
              <div className="text-[10px] text-sky-500">W: 6.0m x L: 4.5m</div>
            </div>
          </div>
        ) : (
          /* Floor 1 Layout */
          <div className="grid grid-cols-12 gap-3 h-full min-h-[260px]">
            {/* Garage zone */}
            <div className="col-span-12 md:col-span-4 border border-dashed border-sky-400/40 bg-sky-950/10 p-4 rounded-xl flex flex-col justify-between relative group hover:border-sky-400 transition-all duration-300">
              <span className="absolute top-2 right-2 text-[9px] text-sky-500 font-bold font-mono">ENTRY_A</span>
              <div>
                <h4 className="font-semibold text-sky-400 text-xs tracking-wider">GARAGE & ACCESS</h4>
                <p className="text-[10px] text-slate-500 mt-1">{t('ที่จอดรถรองรับ')} {plan.car} {t('คัน')}</p>
              </div>
              <div className="flex items-center gap-2 mt-4 text-sky-400">
                <Car className="w-4 h-4" />
                <span className="text-[9.5px]">W: 5.4m x L: 6.0m</span>
              </div>
            </div>

            {/* Living zone */}
            <div className="col-span-12 md:col-span-5 border border-slate-800 bg-slate-900/80 p-4 rounded-xl flex flex-col justify-between relative group hover:border-accent transition-all duration-300">
              <span className="absolute top-2 right-2 text-[9px] text-accent font-bold">LIVING_B</span>
              <div>
                <h4 className="font-semibold text-slate-200 text-xs tracking-wider">{t('')}</h4>
                <p className="text-[10px] text-slate-500 mt-1">{t('')}</p>
              </div>
              <div className="flex items-center gap-2 mt-4 text-slate-400">
                <Maximize className="w-3.5 h-3.5 text-accent" />
                <span className="text-[9.5px]">W: 4.8m x L: 7.2m</span>
              </div>
            </div>

            {/* Kitchen & Dinning & Bath 1 */}
            <div className="col-span-12 md:col-span-3 flex flex-col gap-3">
              <div className="flex-1 border border-slate-800 bg-slate-900/60 p-3 rounded-xl flex flex-col justify-between hover:border-slate-600 transition-all">
                <h4 className="font-semibold text-slate-200 text-[11px]">{t('')}</h4>
                <div className="text-slate-500 text-[10px]">W: 3.5m x L: 4.5m</div>
              </div>
              <div className="flex-1 border border-dashed border-slate-800 bg-slate-950 p-3 rounded-xl flex flex-col justify-between hover:border-red-400/50 transition-all">
                <h4 className="font-semibold text-red-300 text-[11px]">{t('')}</h4>
                <div className="text-slate-500 text-[10px] flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-red-400/60" />
                  <span>W: 2.2m x L: 2.4m</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blueprint CAD details footer banner */}
        <div className="mt-6 border-t border-slate-800 pt-4 flex flex-col sm:flex-row justify-between items-center text-slate-600 text-[9.5px] gap-2 font-mono">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
             <span>REF_PLAN: {plan.id.toUpperCase()}</span>
             <span>SHEET: ARC-HP-00{activeTab}</span>
             <span>FORMAT: DWG/PDF</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-500/80">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[8.5px] tracking-wider uppercase font-bold">APPROVED CAD DRAWING</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HouseDetailPage() {
  if (IS_HOUSES_DISABLED) {
    return <UnderConstructionPage />;
  }
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const plans = housePlansData();
  const plan = plans.find(p => p.id === id) || plans[0]; // fallback to first plan if not found

  const gallery = (plan.gallery || [plan.img]).map(getLargeImage);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedImage = gallery[activeIndex] || gallery[0] || plan.img;

  useEffect(() => {
    setActiveIndex(0);
  }, [plan.id]);

  // Slideshow auto change every 8 seconds
  useEffect(() => {
    if (gallery.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gallery.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [gallery.length]);

  // Compute realistic architectural dimensions based on area
  const areaNum = parseInt(plan.area) || 220;
  const floorNum = plan.floor || 2;
  const avgFloorArea = areaNum / floorNum;
  const widthValue = Math.round(Math.sqrt(avgFloorArea * 1.35) * 10) / 10;
  const depthValue = Math.round((avgFloorArea / widthValue) * 10) / 10;
  const minLandWidth = Math.round((widthValue + 4.5) * 10) / 10;
  const minLandDepth = Math.round((depthValue + 4.5) * 10) / 10;

  return (
    <div className="pt-24 pb-20 bg-[#FDFCFA]">
      <SEO 
        title={`แบบบ้าน ${plan ? t(plan.title) : ''} - รับสร้างบ้านเชียงใหม่`} 
        description={`แบบบ้าน ${plan ? t(plan.title) : ''} พื้นที่ใช้สอย ${plan?.area || ''} ห้องนอน ${plan?.bed || ''} ห้องน้ำ ${plan?.bath || ''} จอดรถ ${plan?.car || ''} คัน ออกแบบก่อสร้างได้คุณภาพสูงสุด`}
        keywords={`แบบบ้าน ${plan ? t(plan.title) : ''}, แบบบ้านเชียงใหม่, รับสร้างบ้านเชียงใหม่, ขายทาวน์เฮ้าส์เชียงใหม่`}
        image={plan?.img}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back controls */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-slate-500 hover:text-primary font-medium cursor-pointer transition-colors text-xs tracking-wider uppercase font-sans">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> {t('ย้อนกลับ')}
          </button>
          
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
             <span>CODE: {plan.id.toUpperCase()}</span>
             <span className="text-slate-200">|</span>
             <span>STYLE: {t(plan.category)}</span>
          </div>
        </div>

        {/* 1. Mockup Header: Clean Social Icons Align Right */}
        <div className="flex justify-end items-center pb-4 border-b border-slate-900/10 mb-8">
          {/* Circular social connection buttons mirroring the mockup */}
          <div className="flex items-center gap-2.5">
            <a href="tel:0910123456" title={t('โทรติดต่อ')} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary transition-all hover:scale-105 active:scale-95 shadow-sm">
              <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>
            <a href="mailto:milinandnile@gmail.com" title={t('เขียนอีเมล')} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary transition-all hover:scale-105 active:scale-95 shadow-sm">
              <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>
            <a href="https://line.me/R/ti/p/%40plus-builders" target="_blank" rel="noopener noreferrer" title="LINE Official" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary transition-all hover:scale-105 active:scale-95 shadow-sm font-semibold text-xs tracking-tighter">
              LINE
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook Page" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary transition-all hover:scale-105 active:scale-95 shadow-sm font-semibold text-xs">
              FB
            </a>
          </div>
        </div>

        {/* 2. Photo Gallery Slideshow (รูปใหญ่ๆอยู่บนสุด - สัดส่วน 3:2 เต็มเฟรม) */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 p-4 mb-6 max-w-5xl mx-auto">
          
          {/* Slideshow main viewport set to aspect-[3/2] */}
          <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden bg-slate-950 group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                src={selectedImage} 
                alt={t(plan.title)} 
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover absolute inset-0 brightness-100" 
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Micro Countdown bar for 8s intervals */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-10">
              <motion.div 
                key={activeIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
                className="h-full bg-[#0a2342]"
              />
            </div>
            
            {/* Nav Arrows */}
            {gallery.length > 1 && (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setActiveIndex((idx) => (idx === 0 ? gallery.length - 1 : idx - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/75 text-white shadow-xl transition-all ease-out hover:scale-110 opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setActiveIndex((idx) => (idx + 1) % gallery.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/75 text-white shadow-xl transition-all ease-out hover:scale-110 opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Slide Index Badge */}
            <div className="absolute bottom-5 right-5 px-3 py-1.5 bg-black/60 backdrop-blur-md text-white font-mono text-[11px] rounded-lg tracking-wider border border-white/10 z-10">
              {activeIndex + 1} / {gallery.length}
            </div>
          </div>

          {/* 3. Larger Thumbnail Track sitting directly underneath */}
          {gallery.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 p-1.5">
              {gallery.map((img, idx) => {
                const thumbUrl = getThumbnailImage(img);
                return (
                  <button 
                    key={idx} 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }}
                    className={`relative rounded-xl overflow-hidden w-24 sm:w-36 md:w-44 aspect-[3/2] cursor-pointer transition-all duration-305 border-2 ${activeIndex === idx ? 'border-primary ring-4 ring-primary/10 scale-102 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'}`}
                  >
                    <img 
                      src={thumbUrl} 
                      alt={`${t(plan.title)} - ${idx + 1}`} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform"
                      onError={(ev) => {
                        if ((ev.target as HTMLImageElement).src !== img) {
                          (ev.target as HTMLImageElement).src = img;
                        }
                      }}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. Mockup Central Title Segment (ชื่อบ้าน, ราคาเริ่มต้น, และสไตล์คำอธิบายแบบสมดุลกึ่งกลาง) */}
        <div className="text-center py-12 max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col items-center justify-center gap-1.5 mb-2">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#8C1D40] uppercase bg-[#FAF6F0] px-4 py-1.5 rounded-full border border-[#8C1D40]/15 shadow-[0_2px_10px_rgba(140,29,64,0.03)]">
              {t('RUETHAI CONTEMPORARY III')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-sans tracking-widest leading-tight" style={{ fontStyle: 'normal', fontFamily: 'Prompt, sans-serif', fontWeight: 'normal', color: '#484848', width: '896px', maxWidth: '100%', marginBottom: '0px', marginLeft: 'auto', marginRight: 'auto' }}>
            {t(plan.title)}
          </h2>
          
          <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed text-center px-4 max-w-3xl mx-auto pt-4 border-t border-slate-100/80 mt-6 md:leading-loose" style={{ fontFamily: 'Prompt, sans-serif' }}>
            {t('สร้างขึ้นเพื่อรองรับความเรียบง่าย อีกทั้งยังแฝงด้วยความหรูหราสไตล์ Tropical หลังนี้ ที่สามารถตอบรับการ')}
            <br className="hidden md:inline" />
            {t('พักผ่อนได้อย่างสุขสงบ และการจัดวางดีไซน์ที่ผสมผสาน Mood & Tone และวัสดุที่ลงตัวทำให้สุนทรียวิชาสถาปัตยกรรมกลมกลืนเป็นธรรมชาติ เพื่อให้ผู้อยู่อาศัยรู้สึกผ่อนคลาย โล่งสบาย ดั่งพักผ่อนในรีสอร์ทพรีเมียม')}
            <br className="hidden md:inline" />
            {t('ส่วนตัวอันเงียบสงบในทุกๆ วัน')}
          </p>

          <div className="w-screen relative left-1/2 -translate-x-1/2 py-16 my-8 overflow-hidden shadow-[inset_0_4px_24px_rgba(0,0,0,0.3)] bg-slate-900 border-y border-slate-800">
            {/* High-quality modern luxury interior background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105 pointer-events-none"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600')`,
              }} 
            />
            {/* Elegant dark overlay for outstanding readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/95 via-[#0F172A]/90 to-[#1E293B]/95 backdrop-blur-[1px] pointer-events-none" />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center justify-center w-full"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 rounded-full border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.2)]" style={{ fontFamily: 'Prompt, sans-serif' }}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>{t('')}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                </div>

                <div className="flex flex-row items-center justify-center gap-4 whitespace-nowrap flex-wrap md:gap-6">
                  <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span className="text-lg sm:text-xl text-[#FAF6F0]/90 font-medium" style={{ fontFamily: 'Prompt, sans-serif' }}>
                    {t('ราคาก่อสร้างเริ่มต้น')}
                  </span>
                  
                  <motion.span 
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="font-bold text-amber-300 tracking-wide select-all drop-shadow-[0_4px_20px_rgba(245,158,11,0.35)] leading-none" 
                    style={{ fontFamily: 'Prompt, sans-serif', fontSize: '40px', textAlign: 'center', fontStyle: 'italic' }}
                  >
                    {t(plan.price).replace("เริ่มต้น", "").replace("เริ่มต้น ", "")}
                  </motion.span>
                  <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                </div>
                
                <span className="text-[11px] sm:text-xs text-[#FAF6F0]/70 font-medium mt-5 max-w-lg mx-auto flex items-center justify-center gap-2.5 border-t border-white/10 pt-3 w-72" style={{ fontFamily: 'Prompt, sans-serif' }}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping-slow" />
                  {t('ปรับเปลี่ยนแปลนภายในตามทิศลมแดดฟรี')}
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 5. Key Parameters Grid: 3 columns mirroring the mockup with elegant large icons */}
        <div className="border-y border-slate-200 py-12 my-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-slate-200">
            
            {/* Box 1: ขนาดตัวบ้าน */}
            <div className="flex flex-col items-center justify-center text-center p-4 group transition-all">
              <div className="mb-5 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FAF6F0] border border-[#8C1D40]/20 flex items-center justify-center text-[#8C1D40] shadow-sm group-hover:shadow-md group-hover:bg-[#8C1D40] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                <Building2 className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105" strokeWidth={1} />
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-800 mb-2">{t('')}</h3>
              <p className="text-slate-500 font-light text-sm sm:text-base">{t('กว้าง')} {widthValue.toFixed(2)} {t('เมตร')} {t('ลึก')} {depthValue.toFixed(2)} {t('เมตร')}</p>
            </div>

            {/* Box 2: พื้นที่ใช้สอย */}
            <div className="flex flex-col items-center justify-center text-center p-4 group transition-all">
              <div className="mb-5 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FAF6F0] border border-[#8C1D40]/20 flex items-center justify-center text-[#8C1D40] shadow-sm group-hover:shadow-md group-hover:bg-[#8C1D40] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                <LayoutIcon className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105" strokeWidth={1} />
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-800 mb-2">{t('')}</h3>
              <p className="text-slate-500 font-light text-sm sm:text-base">
                {plan.area.replace('ตารางเมตร', 'ตร.ม').replace('ตร.ม.', 'ตร.ม')}
              </p>
            </div>

            {/* Box 3: ขนาดที่ดินขั้นต่ำ */}
            <div className="flex flex-col items-center justify-center text-center p-4 group transition-all">
              <div className="mb-5 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FAF6F0] border border-[#8C1D40]/20 flex items-center justify-center text-[#8C1D40] shadow-sm group-hover:shadow-md group-hover:bg-[#8C1D40] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                <DraftingCompass className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105" strokeWidth={1} />
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-800 mb-2">{t('')}</h3>
              <p className="text-slate-500 font-light text-sm sm:text-base">{t('กว้างไม่น้อยกว่า')} {minLandWidth.toFixed(2)} {t('เมตร')} {t('ลึกไม่น้อยกว่า')} {minLandDepth.toFixed(2)} {t('เมตร')}</p>
            </div>

          </div>
        </div>

        {/* 6. Side-by-Side Blueprint Floor Plans (สวยงามหรูหราแบบดรอฟติ้งพิมพ์เขียว) */}
        <div className="space-y-8 my-16">
          <div className="text-center flex flex-col items-center justify-center">
            <Pencil className="w-10 h-10 text-accent mb-2.5 animate-bounce-slow" />
            <h2 className="text-2xl sm:text-3xl tracking-tight tracking-wide font-normal" style={{ fontFamily: 'Prompt, sans-serif', color: '#3d3d3d' }}>
              {t('รายละเอียดฟังก์ชั่นและแปลนอาคาร')}
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
              {t('Interactive Floor Plan DWG Schemes | Scale 1:100')}
            </p>
            <div className="w-12 h-[2px] bg-slate-200 mx-auto mt-3" />
          </div>

          {/* Blueprint Cards Grid - side by side layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Ground Floor Plan */}
            <div className="space-y-3">
              <BlueprintVisualizer plan={plan} activeTab={1} t={t} />
            </div>

            {/* Second Floor Plan */}
            <div className="space-y-3">
              <BlueprintVisualizer plan={plan} activeTab={floorNum >= 2 ? 2 : 3} t={t} />
            </div>

          </div>
        </div>

        {/* 7. Package Details Grid with clean title and accent underline */}
        <div className="border-t border-slate-200 pt-16 mt-16 max-w-5xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl tracking-tight" style={{ fontFamily: 'Prompt, sans-serif', fontWeight: 'normal', color: '#3b3b3b', width: '1088px', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              {t('รายละเอียดข้อมูลแพ็กเกจ')}
            </h2>
            <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mt-2">{t('')}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 text-left py-4">
            {/* Room item 1: Bedrooms */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all flex items-start gap-3">
              <div className="bg-white p-3 rounded-2xl text-primary shadow-sm border border-slate-100 flex-shrink-0">
                <Bed className="w-6.5 h-6.5" />
              </div>
              <div className="pt-1">
                <p className="text-[#8C1D40] text-xs font-semibold">{plan.bed} {t('ห้องนอน')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('')}</p>
              </div>
            </div>

            {/* Room item 2: Bathrooms */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all flex items-start gap-3">
              <div className="bg-white p-3 rounded-2xl text-primary shadow-sm border border-slate-100 flex-shrink-0">
                <Bath className="w-6.5 h-6.5" />
              </div>
              <div className="pt-1">
                <p className="text-[#8C1D40] text-xs font-semibold">5 {t('ห้องน้ำ')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('')}</p>
              </div>
            </div>

            {/* Room item 3: Parking */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all flex items-start gap-3">
              <div className="bg-white p-3 rounded-2xl text-primary shadow-sm border border-slate-100 flex-shrink-0">
                <Car className="w-6.5 h-6.5" />
              </div>
              <div className="pt-1">
                <p className="text-[#8C1D40] text-xs font-semibold">3 {t('ที่จอดรถยนต์')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('')}</p>
              </div>
            </div>

            {/* Room item 4: Living room */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all flex items-start gap-3">
              <div className="bg-white p-3 rounded-2xl text-primary shadow-sm border border-slate-100 flex-shrink-0">
                <Sofa className="w-6.5 h-6.5" />
              </div>
              <div className="pt-1">
                <p className="text-[#8C1D40] text-xs font-semibold">1 {t('ห้องรับแขก / นั่งเล่น')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('')}</p>
              </div>
            </div>

            {/* Room item 5: Dining Foyer */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all flex items-start gap-3">
              <div className="bg-white p-3 rounded-2xl text-primary shadow-sm border border-slate-100 flex-shrink-0">
                <Utensils className="w-6.5 h-6.5" />
              </div>
              <div className="pt-1">
                <p className="text-[#8C1D40] text-xs font-semibold">1 {t('ส่วนรับประทานอาหาร')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('')}</p>
              </div>
            </div>

            {/* Room item 6: Kitchen */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all flex items-start gap-3">
              <div className="bg-white p-3 rounded-2xl text-primary shadow-sm border border-slate-100 flex-shrink-0">
                <Soup className="w-6.5 h-6.5" />
              </div>
              <div className="pt-1">
                <p className="text-[#8C1D40] text-xs font-semibold">1 {t('ห้องครัวไทยขนาดใหญ่')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('')}</p>
              </div>
            </div>

            {/* Room item 7: Prepared pantry */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all flex items-start gap-3">
              <div className="bg-white p-3 rounded-2xl text-primary shadow-sm border border-slate-100 flex-shrink-0">
                <Layers className="w-6.5 h-6.5" />
              </div>
              <div className="pt-1">
                <p className="text-[#8C1D40] text-xs font-semibold">1 {t('ส่วนจัดเตรียมอาหาร')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('')}</p>
              </div>
            </div>

            {/* Room item 8: Storage inside stairs */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all flex items-start gap-3">
              <div className="bg-white p-3 rounded-2xl text-primary shadow-sm border border-slate-100 flex-shrink-0">
                <FileText className="w-6.5 h-6.5" />
              </div>
              <div className="pt-1">
                <p className="text-[#8C1D40] text-xs font-semibold">1 {t('ห้องเก็บของใต้บันได')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('')}</p>
              </div>
            </div>

            {/* Room item 9: Laundry zone */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all flex items-start gap-3">
              <div className="bg-white p-3 rounded-2xl text-primary shadow-sm border border-slate-100 flex-shrink-0">
                <RefreshCw className="w-6.5 h-6.5" />
              </div>
              <div className="pt-1">
                <p className="text-[#8C1D40] text-xs font-semibold">1 {t('ห้องซักรีดและอบผ้า')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('')}</p>
              </div>
            </div>

            {/* Room item 10: Foyer */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all flex items-start gap-3">
              <div className="bg-white p-3 rounded-2xl text-primary shadow-sm border border-slate-100 flex-shrink-0">
                <HomeIcon className="w-6.5 h-6.5" />
              </div>
              <div className="pt-1">
                <p className="text-[#8C1D40] text-xs font-semibold">1 {t('โถงต้อนรับอย่างหรู')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Call to Action / Consultant Section Book Consulting */}
        <div 
          className="max-w-4xl mx-auto my-16 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1500")' }}
        >
          {/* Overlay filter 50% dark */}
          <div className="absolute inset-0 bg-black/50 z-0" />
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none z-10" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none z-10" />
          
          <h2 className="text-2xl sm:text-3xl text-white tracking-wide mb-4 relative z-20 font-light" style={{ fontFamily: 'Prompt, sans-serif', fontStyle: 'normal' }}>
             {t('สามารถติดต่อขอคำปรึกษาสถาปนิกฟรี')}
          </h2>
          <p className="text-slate-200 max-w-xl mx-auto mb-10 relative z-20 leading-relaxed font-light" style={{ fontSize: '16px' }}>
             {t('ทุกแพ็กเกจการออกแบบเรามีวิศวกรโครงสร้างและสถาปนิกคอยดูแล ให้คำปรึกษาปรับเปลี่ยนแปลนภายในตามแนวทิศแดดลมฮวงจุ้ยแบบไม่มีเงื่อนไข')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
            <a 
              href="/#contact" 
              className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent/90 text-slate-950 font-semibold text-sm rounded-full transition-all duration-300 shadow-lg text-center cursor-pointer transform hover:-translate-y-0.5"
            >
              {t('สนใจสั่งซื้อแบบและปรึกษาก่อสร้าง')}
            </a>
            <a 
              href="tel:0902813051" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm rounded-full transition-all duration-300 text-center cursor-pointer"
            >
              <Phone className="w-4 h-4 inline-block mr-2" />
              {t('โทรด่วน : 090-281-3051')}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

function ReadyHousesPage() {
  const { t } = useTranslation();
  const readyHouses = readyHousesData();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-[calc(100vh-100px)]">
      <SEO 
        title={t("โครงการบ้านพร้อมอยู่ ทาวน์โฮม ทาวน์เฮ้าส์เชียงใหม่ ห้องแถวราคาถูก")} 
        description={t("รวมโครงการบ้านพร้อมอยู่คุณภาพดีในเชียงใหม่ เช่น โครงการ C-Home, P-Place Project บ้านจัดสรร ทาวน์โฮม 2 ชั้น ทาวน์เฮ้าส์ราคาพิเศษ ห้องแถวราคาถูก ทำเลเด่น")}
        keywords={t("โครงการบ้านเชียงใหม่, ขายทาวน์เฮ้าส์เชียงใหม่, ห้องแถวราคาถูก, โครงการ P-Place, โครงการ C-Home, บ้านพร้อมอยู่เชียงใหม่")}
      />
      <div className={styles.paddingX}>
        <Link to="/" className="inline-flex items-center text-primary hover:text-accent font-medium mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> {t('กลับไปหน้าแรก')}
        </Link>
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Key className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
            {t('โครงการบ้านพร้อมอยู่')}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {t('สัมผัสความสมบูรณ์แบบกับโครงการบ้านพร้อมอยู่ ทำเลศักยภาพที่ตอบโจทย์คุณ')}
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full animate-pulse pb-6">
                <div className="relative aspect-[3/2] bg-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                </div>
                <div className="p-6 flex flex-col flex-1 items-center justify-center space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-2/3" />
                  <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-4/5 animate-pulse" />
                  <div className="h-10 bg-slate-200 rounded-full w-2/3 mt-6 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {readyHouses.map((item, idx) => (
               <Link key={idx} to={`/ready-house/${item.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                 <div className="relative aspect-[3/2] overflow-hidden">
                   <ImageWithLoader src={item.img} alt={t(item.title)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                 </div>
                 <div className="p-6 flex flex-col flex-1 items-center justify-center text-center">
                   <h3 className="text-xl font-medium text-slate-900 mb-2">{t(item.title)}</h3>
                   <p className="text-slate-600 mb-6 line-clamp-4">{t(item.desc)}</p>
                   <div className="mt-auto px-6 py-2.5 text-sm font-medium text-primary border-2 border-primary rounded-full group-hover:bg-primary group-hover:text-white transition-colors w-full sm:w-auto">
                     {t('ดูรายละเอียด')}
                   </div>
                 </div>
               </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CHomeDetailPage({ project, navigate, t }: { project: any; navigate: any; t: any }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);

  // Custom vertical video URL state with local storage persistence
  const [videoUrl] = useState(() => {
    const saved = localStorage.getItem("chome_custom_video_url");
    // Automatically migrate old youtube default link to the new facebook default link
    if (!saved || saved === "https://www.youtube.com/shorts/D9oN3K0z2_I") {
      return "https://web.facebook.com/share/v/14dLNj4EEh4/";
    }
    return saved;
  });

  // Helper function to return proper iframe source (YouTube, Facebook plugins, etc.)
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    
    // Facebook URL convert
    if (url.includes("facebook.com") || url.includes("fb.watch") || url.includes("fb.com")) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&t=0&autoplay=1`;
    }
    
    // YouTube Convert
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = "";
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
      } else if (url.includes("v=")) {
        videoId = url.split("v=")[1]?.split("&")[0] || "";
      } else if (url.includes("embed/")) {
        videoId = url.split("embed/")[1]?.split("?")[0] || "";
      } else if (url.includes("shorts/")) {
        videoId = url.split("shorts/")[1]?.split("?")[0] || "";
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0` : url;
    }
    
    return url;
  };

  const heroStrips = [
    {
      img: "/images/ready-houses/c-home/hero/hero-1.jpg",
      fallback: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      title: i18n.t("บรรยากาศดีไซน์ภายนอก"),
      subtitle: i18n.t("ทาวน์โฮม 2 ชั้น ทรงอิสระ ดีไซน์โมเดิร์นทรอปิคอล")
    },
    {
      img: "/images/ready-houses/c-home/hero/hero-2.jpg",
      fallback: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
      title: i18n.t("พื้นที่นั่งเล่นและโถงรับแขก"),
      subtitle: i18n.t("ความโปร่งสบายด้วยการเปิดช่องกระจกรับแสงธรรมชาติจากภายนอกอย่างพอเหมาะ")
    },
    {
      img: "/images/ready-houses/c-home/hero/hero-3.jpg",
      fallback: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1000&q=80",
      title: i18n.t("พื้นที่รับประทานอาหาร"),
      subtitle: i18n.t("โซนจัดแต่งรับประทานอาหารที่เชื่อมกับโถงรวม มอบช่วงเวลาสุขสุขประทับใจ")
    },
    {
      img: "/images/ready-houses/c-home/hero/hero-4.jpg",
      fallback: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80",
      title: i18n.t("ห้องครัวแยกเป็นสัดส่วน"),
      subtitle: i18n.t("ตอบสนองการทำครัวสไตล์ไทยและตะวันตกอย่างโมเดิร์นและเป็นสัดส่วนชัดเจน")
    },
    {
      img: "/images/ready-houses/c-home/hero/hero-5.jpg",
      fallback: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80",
      title: i18n.t("ห้องนอนใหญ่ระดับมาสเตอร์"),
      subtitle: i18n.t("พื้นที่พักผ่อนขนาดครอบคลุมทั้งชั้นเพื่อความผ่อนคลายและเติมพลังชีวิตอย่างแท้จริง")
    },
    {
      img: "/images/ready-houses/c-home/hero/hero-6.jpg",
      fallback: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      title: i18n.t("ห้องน้ำชั้นบนดีไซน์กว้างขวาง"),
      subtitle: i18n.t("โปร่งสบายด้วยระบายอากาศที่ดี สุขภัณฑ์ประหยัดน้ำและแยกพาร์ติชันเปียกแห้งเพื่อความปลอดภัย")
    }
  ];

  const galleryImages = [
    "/images/regenerated_image_1779616667219.jpg",
    "/images/regenerated_image_1779616669338.jpg",
    "/images/regenerated_image_1779616671524.jpg",
    "/images/regenerated_image_1779616673625.jpg",
    "/images/regenerated_image_1779622577489.jpg",
    "/images/ready-houses/c-home/gallery/gallery-6.jpg",
    "/images/regenerated_image_1779634281300.jpg",
    "/images/ready-houses/c-home/gallery/gallery-8.jpg",
    "/images/ready-houses/c-home/gallery/gallery-9.jpg"
  ];

  const galleryFallbacks = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1549294413-26f195afc178?auto=format&fit=crop&w=1200&q=80"
  ];

  const galleryTitles = [
    t("ทัศนียภาพหน้าโครงการและตัวบ้านเด่นสง่า"),
    t("ห้องนั่งเล่นที่ออกแบบร่วมสมัยพร้อมผนังกระจกกว้างขวาง"),
    t("มุมรับประทานอาหารอบอุ่นเชื่อมโยงระหว่างโถงในบ้าน"),
    t("ห้องครัวสไตล์สแกนดิเนเวียน ดีไซน์มินิมอลโมเดิร์นอย่างสวยหรู"),
    t("ห้องนอนใหญ่พร้อมพื้นที่พักผ่อนที่กว้างขวางระดับสูงสุด"),
    t("ห้องน้ำตบแต่งสุดพิเศษพร้อมจัดโซนแห้ง-เปียกลงตัว"),
    t("ห้องนอนสำรองสำหรับการทำงานหรือสมาชิกในครอบครัว"),
    t("โถงบันไดและทางเชื่อมพื้นที่ใช้สอยชั้นสอง"),
    t("สวนขนาดย่อมสีเขียวเย็นตาด้านข้างเพื่อเติมพลังธรรมชาติ")
  ];

  const locationMilestones = [
    { 
      title: i18n.t("ซีพี เฟรชมาร์ท"), 
      desc: i18n.t("ตั้งอยู่บริเวณปากทางเข้าโครงการ จับจ่ายของสด ของแช่แข็ง และเครื่องบริโภคจำเป็นในครัวเรือนได้อย่างสะดวกรวดเร็ว"), 
      time: t("1 นาที"),
      coords: "18.775833,99.060100"
    },
    { 
      title: i18n.t("ถนนสายหัตถกรรมบ่อสร้าง"), 
      desc: i18n.t("ห่างจากโครงการเพียง 2 กม. แหล่งท่องเที่ยวและศูนย์กลางร่มกระดาษบ่อสร้างที่มีชื่อเสียงระดับโลก"), 
      time: t("4 นาที"),
      coords: "18.771694,99.08225"
    },
    { 
      title: i18n.t("แม็คโคร เชียงใหม่"), 
      desc: i18n.t("ศูนย์ค้าส่งสินค้าอุปโภคบริโภคขนาดใหญ่ แหล่งรวมวัตถุดิบอาหารสดและของแห้งคุณภาพดีสำหรับธุรกิจและครัวเรือน"), 
      time: t("9 นาที"),
      coords: "18.796123,99.022352"
    },
    { 
      title: i18n.t("เดินทางเข้าเมืองเชียงใหม่"), 
      desc: i18n.t("เชื่อมต่อเข้าสู่ตัวเมืองอย่างสะดวกสบาย วัดระยะทางถึงสถานีรถไฟเชียงใหม่ เพียง 6.5 กม."), 
      time: t("10 นาที"),
      coords: "18.783611,99.016944"
    },
    { 
      title: i18n.t("ห้างสรรพสินค้าเซ็นทรัลเชียงใหม่เฟสติวัล"), 
      desc: i18n.t("แหล่งรวมความบันเทิงและไลฟ์สไตล์ระดับแถวหน้า"), 
      time: t("12 นาที"),
      coords: "18.808018,99.018204"
    },
    { 
      title: i18n.t("สนามบินนานาชาติเชียงใหม่"), 
      desc: i18n.t("เชื่อมต่อได้ทุกการบินระดับนานาชาติอย่างปลอดภัยหายห่วง"), 
      time: t("18 นาที"),
      coords: "18.769919,98.968600"
    }
  ];

  const handlePrev = (e: any) => {
    e.stopPropagation();
    if (activeGalleryIndex !== null) {
      setActiveGalleryIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
    }
  };

  const handleNext = (e: any) => {
    e.stopPropagation();
    if (activeGalleryIndex !== null) {
      setActiveGalleryIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <SEO 
        title={`โครงการ ${project ? t(project.title) : ''} พร้อมอยู่เชียงใหม่`} 
        description={`${project ? t(project.desc) : ''} ราคาเริ่มต้น ${project?.price || ''} ทาวน์เฮ้าส์ ทาวน์โฮม และบ้านเดี่ยวทำเลทองของเชียงใหม่`}
        keywords={`โครงการ ${project ? t(project.title) : ''}, ทาวน์โฮม ${project ? t(project.title) : ''}, ขายทาวน์เฮ้าส์เชียงใหม่, ห้องแถวราคาถูก, บ้านเชียงใหม่`}
        image={project?.img}
      />
      <div className={styles.paddingX}>
        {/* Navigation & Header */}
        <div className="max-w-7xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center text-primary hover:text-accent font-semibold transition-all group bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100 hover:shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
            <span>{t('')}</span>
          </button>
          
          <div className="flex gap-2.5">
            <span className="bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-primary/10">
              {t('Showcase Page • โครงการนวัตกรรมร่วมสมัย')}
            </span>
          </div>
        </div>

        {/* HERO SECTION DESIGN (Vertical Strips Accordion) */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          {/* Elegant 2-story house luxury icon above the title */}
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="p-3 bg-primary/5 rounded-full border border-primary/10 text-primary mb-3 shadow-sm">
              <Building2 className="w-11 h-11" strokeWidth={1} />
            </div>
            <div className="flex justify-center items-center gap-3">
              <span className="h-[1px] w-6 bg-accent/40" />
              <span className="text-[10px] sm:text-xs font-medium text-accent uppercase tracking-[0.25em]">{t("Exclusive Living Experience")}</span>
              <span className="h-[1px] w-6 bg-accent/40" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-widest text-primary mb-4 italic drop-shadow-sm">
            {project.title}
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg mb-8">
            {project.desc}
          </p>

          <div className="relative w-full h-[450px] sm:h-[550px] md:h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 hidden sm:flex flex-row bg-slate-950">
            {heroStrips.map((strip, idx) => {
              const isActive = hoveredIndex === idx;
              const isAnyActive = hoveredIndex !== null;
              
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative h-full overflow-hidden cursor-pointer transition-all duration-700 ease-in-out"
                  style={{
                    flex: isActive ? 3.2 : (isAnyActive ? 0.75 : 1.2),
                  }}
                >
                  {/* Image overlay */}
                  <div className={`absolute inset-0 bg-black/40 z-15 transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-10' : 'opacity-40 hover:opacity-20'}`} />
                  
                  {/* Subtle edge separator shadow */}
                  <div className="absolute inset-y-0 right-0 w-[1px] bg-white/10 z-10" />
                  
                  <ImageWithLoader
                    src={strip.img}
                    fallback={strip.fallback}
                    alt={strip.title}
                    containerClassName="absolute inset-0 w-full h-full"
                    className={`w-full h-full object-cover transition-transform duration-[1.2s] ease-in-out ${isActive ? 'scale-105' : 'scale-100'}`}
                  />
                  
                  {/* Bottom Text Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 flex flex-col justify-end text-left min-h-[160px] pointer-events-none">
                    <div className="transform transition-transform duration-500 ease-out">
                      <h3 className="text-lg md:text-xl font-medium text-white mb-2 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                        {strip.title}
                      </h3>
                      
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-24 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mt-1">
                          {strip.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fallback View for Small Screens (Simple Mobile Slide Panels) */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex sm:hidden bg-slate-100">
            <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end text-left">
              <span className="text-slate-200 text-xs tracking-wider uppercase mb-1">{t(project.title)}</span>
              <h3 className="text-xl font-medium text-white">{t("ทาวน์โฮมทำเลที่พักอาศัยอย่างแท้จริง")}</h3>
            </div>
          </div>
        </div>

        {/* SECTION 2: PROJECT WALKTHROUGH & FEATURES (Configured as elegant 7/5 grid layout for vertical video) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto mb-20 items-stretch">
          
          {/* Info Side (Left 7 columns to give plenty of room) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-2 text-left">
              <span className="text-sm font-semibold text-primary tracking-widest uppercase flex items-center gap-1.5 justify-start">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {t('ภาพรวมโครงการ')}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight leading-snug">
                {t('ออกแบบมาเพื่อการใช้ชีวิต')} <br />
                <span className="text-primary">{t('')}</span>
              </h2>
            </div>
            
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base text-left">
              {t('โครงการทาวน์โฮมดีไซน์โมเดิร์น สรรสร้างจากความเข้าใจวิถีชีวิตคนเมืองยุคใหม่ พร้อมมอบฟังก์ชันการอยู่อาศัยที่ตอบโจทย์อย่างดีเยี่ยม จอดรถได้สะดวกสบาย พร้อมช่องแสงโปร่งขนาดกว้างช่วยรับลมเย็นและแสงธรรมชาติได้ตลอดวัน')}
            </p>

            <div className="w-full bg-slate-50/40 rounded-[28px] p-4 sm:p-6 border border-slate-100/80 mt-2 flex flex-col gap-5">
              
              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                
                {/* 1. Usable Area */}
                <div className="flex flex-col justify-between items-start bg-white/70 hover:bg-white border border-slate-200/50 hover:border-slate-350/80 rounded-2xl p-3.5 transition-all duration-300 shadow-xs hover:shadow-sm">
                  <div className="w-full flex justify-between items-center mb-3 text-slate-400">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Total Area</span>
                    <Ruler className="w-4 h-4 text-primary/80" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">140 sq.m</h4>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 block font-medium">{t("พื้นที่ใช้สอย")}</span>
                  </div>
                </div>

                {/* 2. Living Room */}
                <div className="flex flex-col justify-between items-start bg-white/70 hover:bg-white border border-slate-200/50 hover:border-slate-350/80 rounded-2xl p-3.5 transition-all duration-300 shadow-xs hover:shadow-sm">
                  <div className="w-full flex justify-between items-center mb-3 text-slate-400">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Living</span>
                    <Sofa className="w-4 h-4 text-primary/80" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">1 Living Room</h4>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 block font-medium">{t("ห้องนั่งเล่นครอบครัว")}</span>
                  </div>
                </div>

                {/* 3. Bedrooms */}
                <div className="flex flex-col justify-between items-start bg-white/70 hover:bg-white border border-slate-200/50 hover:border-slate-350/80 rounded-2xl p-3.5 transition-all duration-300 shadow-xs hover:shadow-sm">
                  <div className="w-full flex justify-between items-center mb-3 text-slate-400">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Bedrooms</span>
                    <Bed className="w-4 h-4 text-primary/80" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">2 Bedrooms</h4>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 block font-medium">{t('')}</span>
                  </div>
                </div>

                {/* 4. Bathrooms */}
                <div className="flex flex-col justify-between items-start bg-white/70 hover:bg-white border border-slate-200/50 hover:border-slate-350/80 rounded-2xl p-3.5 transition-all duration-300 shadow-xs hover:shadow-sm">
                  <div className="w-full flex justify-between items-center mb-3 text-slate-400">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Bathrooms</span>
                    <Bath className="w-4 h-4 text-primary/80" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">3 Bathrooms</h4>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 block font-medium">{t("ห้องน้ำดีไซน์หรู")}</span>
                  </div>
                </div>

                {/* 5. Parking */}
                <div className="flex flex-col justify-between items-start bg-white/70 hover:bg-white border border-slate-200/50 hover:border-slate-350/80 rounded-2xl p-3.5 transition-all duration-300 shadow-xs hover:shadow-sm">
                  <div className="w-full flex justify-between items-center mb-3 text-slate-400">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Parking</span>
                    <Car className="w-4 h-4 text-primary/80" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">2 Parking</h4>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 block font-medium">{t("หน้ากว้างจอดรถสะใจ")}</span>
                  </div>
                </div>

                {/* 6. Floors */}
                <div className="flex flex-col justify-between items-start bg-white/70 hover:bg-white border border-slate-200/50 hover:border-slate-350/80 rounded-2xl p-3.5 transition-all duration-300 shadow-xs hover:shadow-sm">
                  <div className="w-full flex justify-between items-center mb-3 text-slate-400">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Floors</span>
                    <Layers className="w-4 h-4 text-primary/80" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">2 Floors</h4>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 block font-medium">{t("ทาวน์โฮม 2 ชั้น")}</span>
                  </div>
                </div>

                {/* 7. Kitchen */}
                <div className="flex flex-col justify-between items-start bg-white/70 hover:bg-white border border-slate-200/50 hover:border-slate-350/80 rounded-2xl p-3.5 transition-all duration-300 shadow-xs hover:shadow-sm">
                  <div className="w-full flex justify-between items-center mb-3 text-slate-400">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Kitchen</span>
                    <Utensils className="w-4 h-4 text-primary/80" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">1 Kitchen</h4>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 block font-medium">{t("ห้องครัวสัดส่วนกว้าง")}</span>
                  </div>
                </div>

                {/* 8. Balcony */}
                <div className="flex flex-col justify-between items-start bg-white/70 hover:bg-white border border-slate-200/50 hover:border-slate-350/80 rounded-2xl p-3.5 transition-all duration-300 shadow-xs hover:shadow-sm">
                  <div className="w-full flex justify-between items-center mb-3 text-slate-400">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Balcony</span>
                    <svg className="w-4 h-4 text-primary/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M12 3v18" />
                      <path d="M3 15h18" />
                      <path d="M6 15v6" />
                      <path d="M10 15v6" />
                      <path d="M14 15v6" />
                      <path d="M18 15v6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">2 Balconies</h4>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 block font-medium">{t('')}</span>
                  </div>
                </div>

              </div>

              {/* Connected Pricing & Book / Register Row in a nice premium glassmorphism ribbon */}
              <div className="bg-white/95 rounded-2xl p-3 sm:p-4 border border-slate-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 mt-1">
                <div className="text-left pl-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t("ราคาเริ่มต้นพิเศษ")}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">{project.price}</p>
                </div>
                <a 
                  href="/#contact" 
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary/95 shadow-sm active:scale-[0.98] transition-all text-center whitespace-nowrap cursor-pointer"
                >
                  {t('ติดต่อจองสิทธิ์ห้องเปล่า')}
                </a>
              </div>

            </div>
          </div>

          {/* Interactive Playable Walkthrough Video Container (Right 5 columns - smartphone aspect-[9/16] style) */}
          <div className="lg:col-span-5 flex flex-col justify-start items-center">
            <div className="relative w-full max-w-[340px] md:max-w-[360px] aspect-[9/16] rounded-[36px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-slate-900 bg-slate-950 group transition-all duration-300 hover:shadow-primary/10">
              {isPlaying ? (
                <div className="w-full h-full relative bg-slate-950">
                  <iframe 
                    src={getEmbedUrl(videoUrl)} 
                    title="C-Home Project Tour Video Guide"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="w-full h-[82%] absolute top-0 inset-x-0 z-30 border-0"
                  />
                  {/* Floating helper block at the bottom of the active smartphone screen */}
                  <div className="absolute bottom-3 inset-x-3 z-40 bg-black/85 backdrop-blur-md rounded-[20px] p-3 text-center border border-white/10 flex flex-col items-center gap-1.5 shadow-2xl">
                    <span className="text-[9px] text-slate-300 block leading-tight select-none">
                      {t('หากคลิปไม่เล่นในกรอบเนื่องจากนโยบายความปลอดภัย')}
                    </span>
                    <a 
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 py-2 px-3 bg-primary hover:bg-primary/95 text-white rounded-xl text-[11px] font-bold cursor-pointer transition-all active:scale-95 shadow-lg shadow-primary/20"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>{t('')}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 z-10 w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
                  {/* Backdrop Cover of the house */}
                  <ImageWithLoader src={project.img} alt="C-Home Project Video Presentation Backdrop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75" />
                  
                  {/* Subtle blur dark overlay */}
                  <div className="absolute inset-0 bg-neutral-900/35 group-hover:bg-neutral-900/15 transition-colors duration-500" />
                  
                  {/* Top phone camera lens bezel detail */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-28 h-4.5 bg-black rounded-full z-20 flex items-center justify-center border border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900/90 border border-slate-800" />
                  </div>

                  {/* Center glassmorphic Play element */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white z-20 pointer-events-none">
                    <button 
                      className="w-16 h-16 sm:w-18 sm:h-18 bg-white/20 hover:bg-white/35 text-white rounded-full flex items-center justify-center shadow-2xl border border-white/40 pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-primary/25 hover:border-accent relative"
                      aria-label="Play Walkthrough Presentation"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(true);
                      }}
                    >
                      {/* Pulse Ring */}
                      <span className="absolute inset-0 bg-white/10 rounded-full animate-ping pointer-events-none scale-120" />
                      
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" strokeLinejoin="round" />
                      </svg>
                    </button>
                    
                    <h3 className="text-base sm:text-lg font-medium text-white mt-5 drop-shadow-md tracking-wide px-3 select-none">
                      {t('วิดีโอพาชมโครงการแนวตั้ง')}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2.5 drop-shadow shadow-black/30 bg-black/45 backdrop-blur-sm px-4 py-1.5 rounded-full select-none max-w-[240px]">
                      {t('สัมผัสตัวบ้านจริงแบบ Reels')}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Reset prompt or playback helper */}
            <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1 select-none">
              <Info className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span>{t('')}</span>
            </p>
          </div>

        </div>

        {/* SECTION 3: 9-IMAGE PHOTOSHOOT GALLERY */}
        <div className="max-w-7xl mx-auto mb-20 text-center">
          <div className="space-y-3 mb-10 flex flex-col items-center">
            <div className="p-3 bg-primary/5 rounded-full border border-primary/10 text-primary mb-1 shadow-xs flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-semibold text-primary tracking-widest uppercase block">
              {t('แกลเลอรีภาพถ่ายโครงการ')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
              {t('ประมวลภาพโครงการและการตกแต่งภายในที่ครบครัน')}
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base">
              {t('เก็บภาพรายละเอียดความตระการตาและการตบแต่งภายในที่สร้างสรรค์อย่างมีระดับ')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveGalleryIndex(idx)}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-slate-100 hover:border-slate-200 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ImageWithLoader src={img} alt={galleryTitles[idx]} fallback={galleryFallbacks[idx]} className="w-full h-full object-cover transition-transform duration-[0.8s] group-hover:scale-105" />
                  
                  {/* Subtle fade-in shadow cap */}
                  <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/30 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                    <div className="bg-white/95 text-slate-800 p-3 rounded-full shadow-lg border border-slate-100 hover:scale-110 duration-300">
                      <Maximize className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col bg-white">
                  <span className="text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-widest mb-1 font-mono">
                    IMAGE 0{idx + 1}
                  </span>
                  <p className="text-slate-800 font-medium text-sm sm:text-base leading-snug line-clamp-1">
                    {galleryTitles[idx]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: LOCATION CARD & LARGE MAP SECTION */}
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-100 p-8 sm:p-12 md:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Location highlight info (5 columns) */}
            <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-6 text-left">
              <div className="space-y-2 mb-8">
                <span className="text-sm font-semibold text-primary tracking-widest uppercase flex items-center gap-1.5 justify-start">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {t('ทำเลที่ตั้งโครงการ')}
                </span>
                <h2 className="text-[28px] font-semibold text-slate-900 leading-snug tracking-tight">
                  {t('ล้อมรอบด้วยสิ่งอำนวยความสะดวก')} <br />
                  <span className="text-slate-500">{t('')}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-2 font-normal">
                  💡 {t('คลิกเลือกเป้าหมายปลายทางเพื่อแสดงพิกัดและการนำเส้นทางบนแผนที่')}
                </p>
              </div>

              {/* Milestones list with beautiful timeline line */}
              <div className="relative border-l border-slate-100 pl-6 space-y-1.5">
                {locationMilestones.map((milestone, idx) => {
                  const isSelected = selectedMilestone === idx;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedMilestone(isSelected ? null : idx)}
                      className={`relative group text-left cursor-pointer transition-all duration-300 py-2 px-3.5 -mx-3.5 rounded-xl border ${
                        isSelected 
                          ? 'bg-primary/[0.04] border-primary/20 shadow-xs' 
                          : 'bg-transparent border-transparent hover:bg-slate-50'
                      }`}
                    >
                      {/* Circle Bullet Badge */}
                      <div className={`absolute -left-[30px] top-[15px] w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center z-10 ${
                        isSelected 
                          ? 'bg-primary border-2 border-primary ring-4 ring-primary/10 scale-105' 
                          : 'bg-white border-2 border-primary/30 group-hover:border-primary group-hover:bg-primary/5'
                      }`}>
                        <div className={`w-1 h-1 rounded-full transition-colors ${
                          isSelected ? 'bg-white' : 'bg-slate-200 group-hover:bg-primary'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between gap-1.5">
                          <h4 className={`font-semibold text-xs sm:text-sm transition-colors duration-300 ${
                            isSelected ? 'text-primary font-bold' : 'text-slate-800 group-hover:text-primary'
                          }`}>
                            {milestone.title}
                          </h4>
                          <span className={`text-[10px] sm:text-xs font-sans font-semibold px-2 py-0.5 rounded border shrink-0 whitespace-nowrap transition-colors duration-300 ${
                            isSelected 
                              ? 'text-white bg-primary border-primary' 
                              : 'text-primary bg-primary/5 border-primary/5'
                          }`}>
                            {milestone.time}
                          </span>
                        </div>
                        <p className={`text-[11px] sm:text-xs mt-0.5 font-normal leading-relaxed transition-colors duration-300 line-clamp-2 ${
                          isSelected ? 'text-slate-700' : 'text-slate-500'
                        }`}>
                          {milestone.desc}
                        </p>
                        
                        {isSelected && (
                          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-primary font-medium animate-pulse">
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span>{t('กำลังแสดงเส้นทางนำทาง 🚙 โครงการ → ')}{milestone.title}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                <a 
                  href={selectedMilestone !== null 
                    ? `https://www.google.com/maps/dir/?api=1&origin=18.776148,99.063021&destination=${locationMilestones[selectedMilestone].coords}`
                    : "https://maps.google.com/?q=18.776148,99.063021"
                  } 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary font-semibold text-sm hover:text-accent group"
                >
                  <span>{selectedMilestone !== null ? t('เปิดเส้นทางนำทางบน Google Maps') : t('เปิดดูที่ตั้งโครงการบน Google Maps')}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </a>

                {selectedMilestone !== null && (
                  <button 
                    onClick={() => setSelectedMilestone(null)}
                    className="text-xs text-slate-500 hover:text-primary transition-colors hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t('')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Massive formatted Map Container (7 columns) */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-150/60 shadow-lg relative min-h-[400px] md:min-h-[500px] bg-slate-50 flex flex-col">
              
              {/* Floating Top Banner Detail overlay */}
              {selectedMilestone !== null && (
                <div className="absolute top-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100/80 flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Navigation className="w-5 h-5 animate-bounce" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{t('')}</div>
                      <div className="text-sm font-bold text-slate-900 truncate">
                        {locationMilestones[selectedMilestone].title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <span className="font-semibold text-primary">{t('ใช้เวลาเพียง')}: {locationMilestones[selectedMilestone].time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedMilestone(null)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    title={t('กลับสู่พิกัดโครงการ')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Floating Bottom action overlay */}
              {selectedMilestone !== null && (
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-primary hover:bg-accent text-white text-xs font-semibold px-4.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>{t('')}</span>
                </button>
              )}

              <iframe
                key={selectedMilestone !== null ? `route-${selectedMilestone}` : 'default'}
                src={selectedMilestone !== null 
                  ? `https://maps.google.com/maps?saddr=18.776148,99.063021&daddr=${locationMilestones[selectedMilestone].coords}&hl=th&z=13&output=embed` 
                  : "https://maps.google.com/maps?q=18.776148,99.063021&hl=th&z=16&output=embed"
                }
                title="Google Maps Interactive Location for C-Home Project"
                className="w-full h-full absolute inset-0 z-10 border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>

      </div>

      {/* FULL SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeGalleryIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/98 z-[200] flex flex-col justify-between p-4 md:p-8 select-none"
            onClick={() => setActiveGalleryIndex(null)}
          >
            {/* Top Lightbar info */}
            <div className="w-full flex justify-between items-center text-white z-20">
              <div className="text-left">
                <span className="text-xs uppercase tracking-widest font-semibold text-accent">
                  {project.title} • {t('ภาพถ่ายโครงการจริง')}
                </span>
                <p className="text-sm md:text-base font-medium text-slate-100 mt-0.5 max-w-xl line-clamp-1">
                  {galleryTitles[activeGalleryIndex]}
                </p>
              </div>
              <button 
                onClick={() => setActiveGalleryIndex(null)}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Stage Panel Area */}
            <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center h-[70vh] z-10">
              {/* Left back controller */}
              <button 
                onClick={handlePrev}
                className="absolute left-2 sm:-left-12 p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center z-30"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeGalleryIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={galleryImages[activeGalleryIndex]}
                  onError={(e) => {
                    const fallback = galleryFallbacks[activeGalleryIndex];
                    if (fallback && e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                  alt="Full-Scale Active View"
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-white/5 select-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>

              {/* Right forward controller */}
              <button 
                onClick={handleNext}
                className="absolute right-2 sm:-right-12 p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center z-30"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>

            {/* Bottom thumbnail counters */}
            <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-white pb-3 z-10">
              <span className="text-xs text-slate-400 font-mono tracking-widest uppercase mb-3 text-center">
                {activeGalleryIndex + 1} / {galleryImages.length}
              </span>
              <div className="flex gap-1.5 overflow-x-auto p-1.5 max-w-full no-scrollbar">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveGalleryIndex(idx);
                    }}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${activeGalleryIndex === idx ? 'border-accent scale-105' : 'border-white/10 opacity-45 hover:opacity-85'}`}
                  >
                    <img 
                      src={img} 
                      onError={(e) => {
                        const fallback = galleryFallbacks[idx];
                        if (fallback && e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }} 
                      alt="Thumbnail Selector" 
                      className="w-full h-full object-cover pointer-events-none" 
                    />
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReadyHouseDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const readyHouses = readyHousesData();
  const project = readyHouses.find(p => p.id === id) || readyHouses[0];
  const navigate = useNavigate();

  if (project.id === "ready-1") {
    return <CHomeDetailPage project={project} navigate={navigate} t={t} />;
  }
  
  const gallery = (project.gallery || [project.img]).map(getLargeImage);
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(getThumbnailImage(gallery[0]));

  useEffect(() => {
    const list = (project.gallery || [project.img]).map(getLargeImage);
    setSelectedImage(list[0]);
  }, [project.id]);

  useEffect(() => {
    setPreviewSrc(getThumbnailImage(selectedImage));
  }, [selectedImage]);

  return (
    <div className="pt-24 pb-20">
      <SEO 
        title={`โครงการ ${project ? t(project.title) : ''} พร้อมอยู่เชียงใหม่`} 
        description={`${project ? t(project.desc) : ''} ราคาเริ่มต้น ${project?.price || ''} ทาวน์เฮ้าส์ ทาวน์โฮม และบ้านเดี่ยวทำเลทองของเชียงใหม่`}
        keywords={`โครงการ ${project ? t(project.title) : ''}, ทาวน์โฮม ${project ? t(project.title) : ''}, ขายทาวน์เฮ้าส์เชียงใหม่, ห้องแถวราคาถูก, บ้านเชียงใหม่`}
        image={project?.img}
      />
      <div className={styles.paddingX}>
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-primary hover:text-accent font-medium mb-8 cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2" /> {t('ย้อนกลับ')}
        </button>
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            <div className="flex flex-col p-4 lg:p-6 lg:pr-0 gap-4 h-full">
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-sm bg-slate-100 group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={previewSrc} 
                    alt={project.title} 
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover absolute inset-0 transform group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer hover:brightness-95" 
                    onClick={() => setIsModalOpen(true)}
                    onError={() => {
                      if (previewSrc !== selectedImage) {
                        setPreviewSrc(selectedImage);
                      }
                    }}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Central Expand Image Button Cue */}
                <div 
                  onClick={() => setIsModalOpen(true)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/0 hover:bg-black/10 transition-colors duration-300 z-10"
                >
                  <div className="px-5 py-2.5 bg-white/15 backdrop-blur-md hover:bg-white/30 text-slate-950 text-sm font-medium rounded-xl border border-white/15 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 active:scale-95">
                    <Maximize className="w-4 h-4 text-slate-950" />
                    <span>{t('')}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 lg:gap-3 shrink-0">
                {gallery.slice(0, 6).map((img, idx) => (
                  <button 
                    key={idx} 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedImage(img);
                    }}
                    className={`relative rounded-xl overflow-hidden w-full aspect-square cursor-pointer transition-all duration-300 border-2 ${selectedImage === img ? 'border-primary shadow-md scale-[1.02]' : 'border-transparent hover:border-slate-300 hover:opacity-90'}`}
                  >
                    <ImageWithThumbnailFallback src={img} alt={`${project.title} - ${idx + 1}`} className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-center text-center">
              <h1 className="text-3xl lg:text-4xl font-medium text-slate-900 mb-4">{project.title}</h1>
              <p className="text-lg text-slate-600 mb-8">{project.desc}</p>
              
              {project.details && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full max-w-lg">
                  {project.details.map((detail: any, idx: number) => (
                    <div key={idx} className="flex items-center text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 text-left">
                      <div className="text-primary mr-4 bg-white p-2.5 rounded-lg shadow-sm border border-slate-100">
                        {detail.icon}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-medium text-slate-500 mb-0.5">{detail.label}</p>
                        <p className="text-sm font-medium text-slate-900">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap justify-center items-center gap-4">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }} 
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="bg-primary/10 text-primary px-8 py-4 rounded-full text-2xl lg:text-3xl font-medium shadow-sm"
                >
                  {t('ราคา')}{project.price}
                </motion.div>
                <a href="/#contact" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1">
                  {t('ติดต่อสอบถามโครงการ')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imageSrc={selectedImage} title={project.title} />
    </div>
  );
}

function LandsPage() {
  const { t } = useTranslation();
  const lands = landsData();
  
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-[calc(100vh-100px)]">
      <SEO 
        title={t("{t('ขายที่ดิน')}เปล่าทำเลทอง เชียงใหม่ - เหมาะสำหรับสร้างบ้านหรือลงทุน")} 
        description={t("เลือกซื้อที่ดินเชียงใหม่ ที่ดินสันกำแพง ที่ดินต่างจังหวัด ราคาถูก ทำเลสวย น้ำไฟเข้าถึง พร้อมโอนกรรมสิทธิ์สร้างบ้านหรืออาคารพาณิชย์")}
        keywords={t("{t('ขายที่ดิน')}เชียงใหม่, ที่ดินราคาถูกเชียงใหม่, ที่ดินสำหรับสร้างบ้าน, ที่ดินสันกำแพง, ซื้อที่ดินเชียงใหม่")}
      />
      <div className={styles.paddingX}>
        <Link to="/" className="inline-flex items-center text-primary hover:text-accent font-medium mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> {t('กลับไปหน้าแรก')}
        </Link>
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Mountain className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
            {t('ขายที่ดิน')}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {t('รวมรายการที่ดินเปล่าทำเลทอง สำหรับสร้างบ้านหรือลงทุนเพื่ออนาคต')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lands.map((item, idx) => (
             <Link key={idx} to={`/land/${item.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
               <div className="relative aspect-[3/2] overflow-hidden">
                 <ImageWithLoader src={item.img} alt={t(item.title)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
               </div>
               <div className="p-6 flex flex-col flex-1 items-center justify-center text-center">
                 <h3 className="text-xl font-medium text-slate-900 mb-2">{t(item.title)}</h3>
                 <p className="text-slate-600 mb-6 line-clamp-4">{t(item.desc)}</p>
                 <div className="mt-auto px-6 py-2.5 text-sm font-medium text-primary border-2 border-primary rounded-full group-hover:bg-primary group-hover:text-white transition-colors w-full sm:w-auto">
                   {t('ดูรายละเอียด')}
                 </div>
               </div>
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const lands = landsData();
  const land = lands.find(l => l.id === id) || lands[0];

  const gallery = (land.gallery || [land.img]).map(getLargeImage);
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(getThumbnailImage(gallery[0]));

  useEffect(() => {
    const list = (land.gallery || [land.img]).map(getLargeImage);
    setSelectedImage(list[0]);
  }, [land.id]);

  useEffect(() => {
    setPreviewSrc(getThumbnailImage(selectedImage));
  }, [selectedImage]);

  const landDetails = [
    { icon: <Maximize className="w-5 h-5" />, label: i18n.t("เนื้อที่"), value: (land as any).area || "สอบถามเพิ่มเติม" },
    { icon: <MapPin className="w-5 h-5" />, label: i18n.t("ทำเล"), value: (land as any).location || "เชียงใหม่" },
    { icon: <FileText className="w-5 h-5" />, label: i18n.t("เอกสารสิทธิ์"), value: (land as any).type || "โฉนดครุฑแดง" },
  ];

  return (
    <div className="pt-24 pb-20">
      <SEO 
        title={`{t('ขายที่ดิน')} ${land ? t(land.title) : ''} - ที่ดินเปล่าเชียงใหม่ทำเลทอง`} 
        description={`รายละเอียดที่ดิน ${land ? t(land.title) : ''} ${land ? t(land.desc) : ''} ขนาดเนื้อที่ ${land?.area || ''} ราคาเชียงใหม่สุดคุ้ม เหมาะสร้างบ้านหรืออยู่อาศัย`}
        keywords={`ที่ดิน ${land ? t(land.title) : ''}, {t('ขายที่ดิน')}เชียงใหม่, ที่ดินราคาถูกเชียงใหม่, ที่ดินสันกำแพง`}
        image={land?.img}
      />
      <div className={styles.paddingX}>
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-primary hover:text-accent font-medium mb-8 cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2" /> {t('ย้อนกลับ')}
        </button>
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            <div className="flex flex-col p-4 lg:p-6 lg:pr-0 gap-4 h-full">
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-sm bg-slate-100 group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={previewSrc} 
                    alt={t(land.title)} 
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover absolute inset-0 transform group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer hover:brightness-95" 
                    onClick={() => setIsModalOpen(true)}
                    onError={() => {
                      if (previewSrc !== selectedImage) {
                        setPreviewSrc(selectedImage);
                      }
                    }}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Central Expand Image Button Cue */}
                <div 
                  onClick={() => setIsModalOpen(true)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/0 hover:bg-black/10 transition-colors duration-300 z-10"
                >
                  <div className="px-5 py-2.5 bg-white/15 backdrop-blur-md hover:bg-white/30 text-slate-950 text-sm font-medium rounded-xl border border-white/15 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 active:scale-95">
                    <Maximize className="w-4 h-4 text-slate-950" />
                    <span>{t("กดขยายภาพ")}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 lg:gap-3 shrink-0">
                {gallery.slice(0, 6).map((img, idx) => (
                  <button 
                    key={idx} 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedImage(img);
                    }}
                    className={`relative rounded-xl overflow-hidden w-full aspect-square cursor-pointer transition-all duration-300 border-2 ${selectedImage === img ? 'border-primary shadow-md scale-[1.02]' : 'border-transparent hover:border-slate-300 hover:opacity-90'}`}
                  >
                    <ImageWithThumbnailFallback src={img} alt={`${t(land.title)} - ${idx + 1}`} className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-center items-center">
              <h1 className="text-3xl lg:text-4xl font-medium text-slate-900 mb-4">{t(land.title)}</h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">{t(land.desc)}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full max-w-lg mt-8">
                {landDetails.map((detail: any, idx: number) => (
                  <div key={idx} className="flex items-center text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 text-left">
                    <div className="text-primary mr-4 bg-white p-2.5 rounded-lg shadow-sm border border-slate-100 flex-shrink-0">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-0.5">{detail.label}</p>
                      <p className="text-sm font-medium text-slate-900">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-4">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }} 
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="bg-primary/10 text-primary px-8 py-4 rounded-full text-2xl lg:text-3xl font-medium shadow-sm"
                >
                  {t('ราคา')}{t(land.price)}
                </motion.div>
                <a href="/#contact" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1">
                  {t('ติดต่อสอบถามที่ดิน')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imageSrc={selectedImage} title={t(land.title)} />
    </div>
  );
}

function PortfolioPage() {
  const { t } = useTranslation();
  const categories = portfolioCategoriesData();
  
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-[calc(100vh-100px)]">
      <SEO 
        title={t("ผลงานสร้างบ้านคุณภาพ โครงการและบ้านระดับพรีเมียม")} 
        description={t("ชมแกลเลอรีและประวัติโครงการก่อสร้างบ้านพักอาศัย ทาวน์เฮ้าส์ โครงการจัดสรร และอาคารพาณิชย์ โดยทีมงานวิศวกรและสถาปนิก ฤทัยคอนสตรัคชั่น")}
        keywords={t("ผลงานสร้างบ้าน, รีวิวสร้างบ้านเชียงใหม่, ผลงานฤทัยคอนสตรัคชั่น")}
      />
      <div className={styles.paddingX}>
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="inline-flex items-center text-primary hover:text-accent font-medium mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t('กลับไปหน้าแรก')}
          </Link>
        </div>
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Trophy className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 uppercase tracking-widest font-normal">OUR PORTFOLIO</h1>
          <h2 className="text-2xl text-slate-500 mt-2 font-light">— {t('หมวดหมู่ผลงานของเรา')}</h2>
          <p className="mt-4 text-lg text-slate-600">
            {t('เลือกชมผลงานคุณภาพในแต่ละประเภทงานบริการของเรา')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <Link key={idx} to={`/portfolio/category/${category.id}`} className="group relative aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300">
              <ImageWithLoader src={category.img} alt={category.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-2">{category.title}</h3>
                  <p className="text-slate-300">
                    {t('ดูผลงานทั้งหมด')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioCategoryItemsPage() {
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const categories = portfolioCategoriesData();
  const categoryInfo = categories.find(c => c.id === categoryId) || categories[0];
  const allProjects = portfolioData();
  const projects = allProjects.filter(p => p.categoryId === categoryId);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [categoryId]);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-[calc(100vh-100px)]">
      <SEO 
        title={`ผลงานประเภท ${categoryInfo ? t(categoryInfo.title) : ''}`} 
        description={`เข้าชมผลงานการสร้างบ้าน ออกแบบ และตกแต่งภายในในหมวดหมู่ ${categoryInfo ? t(categoryInfo.title) : ''} ล่าสุดจากฤทัยคอนสตรัคชั่น`}
        keywords={`ผลงาน ${categoryInfo ? t(categoryInfo.title) : ''}, รีวิวสร้างบ้าน, ฤทัยคอนสตรัคชั่น`}
      />
      <div className={styles.paddingX}>
        <div className="flex flex-col items-center text-center">
          <Link to="/portfolio" className="inline-flex items-center text-primary hover:text-accent font-medium mb-8 cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t('ย้อนกลับ')}
          </Link>
        </div>
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Trophy className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
            {t(categoryInfo.title)}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {t('รวมผลงานคุณภาพ หมวด')}{t(categoryInfo.title)}{t('จากฤทัยคอนสตรัคชั่น')}
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full animate-pulse pb-6">
                <div className="relative aspect-[16/10] bg-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                </div>
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-1/2" />
                  <div className="h-3 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                  <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end items-center">
                    <div className="flex gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-slate-200" />
                      <div className="w-8 h-8 rounded-full bg-slate-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((item, idx) => (
              <div key={idx} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 flex flex-col h-full border-b-4 border-b-primary/10 hover:border-b-accent">
                <Link to={`/portfolio/project/${item.id}`} className="relative aspect-[16/10] overflow-hidden block">
                  <ImageWithLoader src={item.img} alt={t(item.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-90 group-hover:blur-[2px]" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <ZoomIn className="w-4 h-4" /> {t('คลิกเพื่อดูโปรเจค')}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider">{item.category}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20 group-hover:opacity-0 transition-opacity duration-300">
                    <div className="flex items-center gap-4 text-white text-xs sm:text-sm">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-accent" /> {item.location}</span>
                    </div>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <Link to={`/portfolio/project/${item.id}`}>
                    <h3 className="text-xl font-medium text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-1">{t(item.title)}</h3>
                  </Link>
                  <p className="text-slate-600 mb-6 leading-relaxed text-sm line-clamp-2">{t(item.desc)}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded">
                      <Building2 className="w-3.5 h-3.5 inline mr-1 text-slate-400" /> {t('ปี: ')}{item.year}
                    </span>
                    <div className="flex -space-x-2">
                      {item.gallery.slice(1, 4).map((g, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                          <ImageWithLoader src={g} alt="gallery" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {item.gallery.length > 4 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500">
                          +{item.gallery.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">{t('')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PortfolioDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const projects = portfolioData();
  const project = projects.find(p => p.id === id) || projects[0];

  const gallery = (project.gallery || [project.img]).map(getLargeImage);
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(getThumbnailImage(gallery[0]));

  useEffect(() => {
    window.scrollTo(0, 0);
    const list = (project.gallery || [project.img]).map(getLargeImage);
    setSelectedImage(list[0]);
  }, [id, project]);

  useEffect(() => {
    setPreviewSrc(getThumbnailImage(selectedImage));
  }, [selectedImage]);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <SEO 
        title={`ผลงานโครงการ ${project ? t(project.title) : ''} - ฤทัยคอนสตรัคชั่น`} 
        description={`${project ? t(project.desc) : ''} ผลงานการก่อสร้างคุณภาพสูง ใส่ใจทุกรายละเอียดของงานวิศวกรรมโดยทีมงานมืออาชีพ`}
        keywords={`ผลงาน ${project ? t(project.title) : ''}, สร้างบ้าน ${project ? t(project.title) : ''}, ฤทัยคอนสตรัคชั่น`}
        image={project?.img}
      />
      <div className={styles.paddingX}>
        <div className="flex flex-col items-center text-center">
          <Link to="/portfolio" className="inline-flex items-center text-primary hover:text-accent font-medium mb-8 cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t('ย้อนกลับ')}
          </Link>
        </div>
        
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          <div className="p-8 lg:p-12 border-b border-slate-100 flex flex-col items-center text-center">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider">{project.category}</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-500 text-sm">{project.location}</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-medium text-slate-900 leading-tight max-w-4xl">{project.title}</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={previewSrc} 
                    alt={project.title} 
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover absolute inset-0 transform group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer hover:brightness-95" 
                    onClick={() => setIsModalOpen(true)}
                    onError={() => {
                      if (previewSrc !== selectedImage) {
                        setPreviewSrc(selectedImage);
                      }
                    }}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Central Expand Image Button Cue */}
                <div 
                  onClick={() => setIsModalOpen(true)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/0 hover:bg-black/10 transition-colors duration-300 z-10"
                >
                  <div className="px-5 py-2.5 bg-white/15 backdrop-blur-md hover:bg-white/30 text-slate-950 text-sm font-medium rounded-xl border border-white/15 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 active:scale-95">
                    <Maximize className="w-4 h-4 text-slate-950" />
                    <span>{t('')}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {gallery.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-primary' : 'border-transparent hover:border-slate-200'}`}
                  >
                    <ImageWithThumbnailFallback src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110" />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h2 className="text-xl font-medium text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> {t('รายละเอียดโครงการ')}
                  </h2>
                  <p className="text-slate-600 leading-relaxed">{project.desc}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">{t('')}</span>
                    <span className="font-medium text-slate-900">{project.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">{t('')}</span>
                    <span className="font-medium text-slate-900">{project.category}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">{t('')}</span>
                    <span className="font-medium text-slate-900">{project.year}</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="font-medium text-slate-900 mb-4">{t('')}</h3>
                  <p className="text-sm text-slate-500 mb-6">{t('')}</p>
                  <a href="/#contact" className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                    {t('ติดต่อสอบถาม')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imageSrc={selectedImage} title={project.title} />
    </div>
  );
}

function ArticlesPage() {
  const { t } = useTranslation();
  const articles = [
    {
      id: "rust-in-construction",
      title: i18n.t("รู้จักกับปัญหาสนิมในงานก่อสร้าง"),
      desc: i18n.t("สนิมเป็นปัญหาที่ส่งผลกระทบต่อความแข็งแรงของโครงสร้างเหล็ก เรียนรู้สาเหตุและวิธีการป้องกัน..."),
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
      date: t('')
    },
    {
      id: "types-of-steel",
      title: i18n.t("ประเภทของเหล็กในงานก่อสร้าง"),
      desc: i18n.t("เหล็กเส้น เหล็กรูปพรรณ และการเลือกใช้เหล็กให้เหมาะสมกับโครงสร้างแต่ละประเภทเพื่อความปลอดภัยสูงสุด..."),
      img: "https://images.unsplash.com/photo-1533038590840-1cde6e668a8f?q=80&w=800&auto=format&fit=crop",
      date: t('10 พ.ค. 2026')
    },
    {
      id: "construction-permit-process",
      title: i18n.t("ขั้นตอนการยื่นแบบและขออนุญาตก่อสร้าง"),
      desc: i18n.t("ก่อนเริ่มสร้างบ้าน ต้องเตรียมเอกสารอะไรบ้าง? และมีขั้นตอนการติดต่อหน่วยงานราชการอย่างไร..."),
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
      date: t('5 พ.ค. 2026')
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-[calc(100vh-100px)]">
      <SEO 
        title={t("บทความน่ารู้เรื่องบ้าน บล็อกสร้างบ้านและอสังหาริมทรัพย์")} 
        description={t("คุยเรื่องบ้านกับบทความน่ารู้ การดูแลรักษาบ้าน การเลือกซื้อที่ดิน ตกแต่งบ้าน วิธีรับมือกับปัญหาเรื่องบ้าน และเทคนิคการสร้างบ้านในงวดต่างๆ")}
        keywords={t("บทความสร้างบ้าน, คลินิกบ้าน, จัดแต่งบ้านเชียงใหม่, เทคนิคสร้างบ้าน")}
      />
      <div className={styles.paddingX}>
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <FileText className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 uppercase tracking-widest font-normal">ARTICLES</h1>
          <h2 className="text-2xl text-slate-500 mt-2 font-light">— {t('บทความ')}</h2>
          <p className="mt-4 text-lg text-slate-600">{t('')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={article.img} alt={article.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-medium text-primary mb-2 block">{article.date}</span>
                <h3 className="text-xl font-medium text-slate-900 mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{article.desc}</p>
                <div className="mt-auto">
                   <span className="inline-flex items-center font-medium text-primary group-hover:text-accent transition-all duration-300">
                      {t('อ่านเพิ่มเติม')} <ChevronRight className="w-4 h-4 ml-1" />
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-[calc(100vh-100px)]">
      <SEO 
        title={t("บริการรับสร้างบ้านครบวงจร คุณภาพดีด้วยทีมวิศวกร")} 
        description={t("ฤทัยคอนสตรัคชั่น ให้บริการออกแบบ เขียนแบบ ก่อสร้าง ตกแต่งภายในครบวงจร พร้อมยื่นขอใบอนุญาตก่อสร้างและควบคุมโดยวิศวกรผู้เชี่ยวชาญ")}
        keywords={t("บริการรับสร้างบ้าน, บริการเขียนแบบบ้าน, ออกแบบบ้านเชียงใหม่, รับเหมาก่อสร้างเชียงใหม่")}
      />
      <div className={styles.paddingX}>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Hammer className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 uppercase tracking-widest font-normal">OUR SERVICES</h1>
          <h2 className="text-2xl text-slate-500 mt-2 font-light">— {t('บริการของเรา')}</h2>
          <p className="mt-4 text-lg text-slate-600">{t('')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            { 
              icon: <Building2 className="w-6 h-6" />, 
              title: i18n.t("รับสร้างบ้านมือหนึ่ง"), 
              desc: i18n.t("บริการสร้างบ้านบนที่ดินของคุณ พร้อมแบบบ้านให้เลือกหลากหลาย หรือออกแบบใหม่ตามความต้องการ"),
              img: "/images/services/new-house.jpg"
            },
            { 
              icon: <DraftingCompass className="w-6 h-6" />, 
              title: i18n.t("ออกแบบสถาปัตยกรรม"), 
              desc: i18n.t("ให้คำปรึกษาและออกแบบบ้านโดยสถาปนิกผู้เชี่ยวชาญ คัดสรรฟังก์ชันให้ตอบโจทย์ไลฟ์สไตล์คุณ"),
              img: "/images/services/architecture.jpg"
            },
            { 
              icon: <Hammer className="w-6 h-6" />, 
              title: i18n.t("ต่อเติมและรีโนเวท"), 
              desc: i18n.t("ปรับปรุง ซ่อมแซม หรือต่อเติมบ้านเดิมของคุณให้กลับมาสวยงามและใช้งานได้อย่างเต็มประสิทธิภาพ"),
              img: "/images/services/renovate.jpg"
            },
            { 
              icon: <Sofa className="w-6 h-6" />, 
              title: i18n.t("ตกแต่งภายใน"), 
              desc: i18n.t("บริการออกแบบและตกแต่งภายในครบวงจร สร้างสรรค์พื้นที่ให้สวยงาม สะท้อนตัวตนของคุณ"),
              img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
            },
            { 
              icon: <MapPin className="w-6 h-6" />, 
              title: i18n.t("ฝากขายที่ดิน"), 
              desc: i18n.t("บริการรับฝากขายที่ดินทุกประเภท ด้วยเครือข่ายที่กว้างขวางและทีมงานมืออาชีพ ช่วยให้คุณขายได้เร็วขึ้น"),
              img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
            },
            { 
              icon: <Handshake className="w-6 h-6" />, 
              title: i18n.t("ฝากขายอสังหา"), 
              desc: i18n.t("บริการรับฝากขายบ้าน คอนโด และอสังหาริมทรัพย์ทุกชนิด ฟรีค่าการตลาดและให้คำปรึกษาตลอดการขาย"),
              img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
            }
          ].map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group"
            >
               <div className="relative aspect-[16/10] overflow-hidden">
                <img src={service.img} alt={service.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col items-center text-center gap-4 relative flex-1">
                <div className="w-12 h-12 rounded-full border-4 border-white bg-primary text-accent flex items-center justify-center shrink-0 absolute -top-6 left-1/2 -translate-x-1/2 shadow-md">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium text-slate-900 mt-2">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">{service.desc}</p>
                <div className="mt-auto">
                  <a href="/#contact" className="inline-flex items-center font-medium text-primary hover:text-accent transition-all duration-300 hover:translate-x-1">
                    {t('สนใจบริการ')} <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamMemberCard({ member }: { member: any; key?: any }) {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(member.img);

  useEffect(() => {
    setImgSrc(member.img);
  }, [member.img]);

  return (
    <div className="w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.667rem)] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col text-center pb-8 transition-transform hover:-translate-y-1">
      <div className="aspect-[4/5] overflow-hidden mb-6 relative">
        {!loaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <img 
          src={imgSrc} 
          alt={t(member.name)} 
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (imgSrc !== member.fallbackImg) {
              setImgSrc(member.fallbackImg || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80");
            }
          }}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-top transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${member.imgClass || ''}`} 
        />
      </div>
      <h3 className="text-xl md:text-2xl font-serif font-light text-slate-800 tracking-wide">{t(member.name)}</h3>
      <p className="text-primary font-light mt-2 tracking-wider text-sm uppercase">{t(member.role)}</p>
    </div>
  );
}

function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-24 pb-20 bg-white min-h-[calc(100vh-100px)]">
      <SEO 
        title={t("เกี่ยวกับเรา ฤทัยคอนสตรัคชั่น - ผู้เชี่ยวชาญด้านงานสร้างบ้านเชียงใหม่")} 
        description={t("ทำความรู้จักกับ ฤทัยคอนสตรัคชั่น มุ่งมั่นพัฒนาและดูแลงานก่อสร้างทุกระดับ ด้วยทีมงานสถาปนิกและวิศวกรคุณภาพ มาตรฐานระดับสากล")}
        keywords={t("ทีมสร้างบ้านเชียงใหม่, ฤทัยคอนสตรัคชั่น, ทีมวิศวกรเชียงใหม่")}
      />
      <div className={styles.paddingX}>
        {/* Company History */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="flex justify-center mb-6">
            <Users className="w-12 h-12 text-slate-900 opacity-80" strokeWidth={1} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 uppercase tracking-widest font-normal">ABOUT US</h1>
          <h2 className="text-2xl text-slate-500 mt-2 font-light">— {t('เกี่ยวกับเรา')}</h2>
          <h2 className="text-2xl font-medium text-primary mb-4">{t('')}</h2>
          <p className="text-lg text-slate-600 leading-relaxed text-left md:text-center">
            {t('ฤทัยคอนสตรัคชั่น ก่อตั้งขึ้นเมื่อปี พ.ศ. 2560 ด้วยความมุ่งมั่นที่จะเป็นทีมรับเหมาก่อสร้างที่ได้มาตรฐานสากล เราเริ่มต้นจากการรับงานออกแบบและต่อเติมขนาดเล็ก จนกระทั่งได้รับความไว้วางใจให้ก่อสร้างโครงการบ้านเดี่ยวและอาคารพาณิชย์ ด้วยประสบการณ์กว่าหลายปี เราจึงมีความเชี่ยวชาญทั้งด้านสถาปัตยกรรมและวิศวกรรมที่สามารถตอบสนองทุกความต้องการของลูกค้า ทำให้เราเติบโตอย่างมั่นคงและเป็นที่ยอมรับในแวดวงการก่อสร้าง')}
          </p>
        </div>

        {/* Management Team */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-slate-900">{t('')}</h2>
            <p className="mt-4 text-lg text-slate-600">{t('')}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10">
            {[
              {
                role: i18n.t("ผู้บริหาร (CEO / Managing Director)"),
                name: i18n.t("คุณขวัญฤทัย วุฑฒยากร"),
                img: "/images/general/Managing director.jpg?v=9",
                imgClass: "scale-[1.85] origin-[50%_40%]"
              },
              {
                role: i18n.t("สถาปนิก (Architect) ภ.สถ 11066"),
                name: i18n.t("คุณกฤษฎิ์ วุฑฒยากร"),
                img: "/images/general/Architect.jpg?v=5"
              },
              {
                role: i18n.t("วิศวกรโยธา (Civil Engineer)"),
                name: i18n.t("คุณธนพล สุวรรณวัตต์"),
                img: "/images/general/Engineer2.jpg?v=4"
              },
              {
                role: i18n.t("วิศวกรโยธาภาคีพิเศษ (Special Adjunct Civil Engineer)"),
                name: i18n.t("คุณราชพร สายโกสุม"),
                img: "/images/general/Engineer3.jpg?v=4"
              },
              {
                role: i18n.t("หัวหน้าฝ่ายขาย (Head of Sales)"),
                name: i18n.t("คุณกุลลดา พงศ์พฤกษทล"),
                img: "/images/general/Seller1.jpg?v=9"
              },
              {
                role: i18n.t("หัวหน้าฝ่ายการตลาด (Head of Marketing)"),
                name: i18n.t("คุณปานทิพย์ สังข์ทอง"),
                img: "/images/general/Marketing1.jpg?v=1",
                fallbackImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
              }
            ].map((member, idx) => (
              <TeamMemberCard key={idx} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const architectureSlides = [
  {
    local: "/images/architecture/1.jpg",
    fallback: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
  },
  {
    local: "/images/architecture/2.jpg",
    fallback: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
  },
  {
    local: "/images/architecture/3.jpg",
    fallback: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80"
  },
  {
    local: "/images/architecture/4.jpg",
    fallback: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=80"
  },
  {
    local: "/images/architecture/5.jpg",
    fallback: "https://images.unsplash.com/photo-1600585154526-990dced4ea0d?auto=format&fit=crop&w=2000&q=80"
  },
  {
    local: "/images/architecture/6.jpg",
    fallback: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
  }
];

function ArchitectureSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % architectureSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm group">
      <AnimatePresence initial={false}>
        <motion.img 
          key={currentSlide}
          src={architectureSlides[currentSlide].local}
          onError={(e) => {
            e.currentTarget.src = architectureSlides[currentSlide].fallback;
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
          alt={`Architecture Design ${currentSlide + 1}`}
        />
      </AnimatePresence>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
        {architectureSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full border border-white/40 transition-all duration-300 ${
              currentSlide === idx 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    const handleImageError = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName && target.tagName.toLowerCase() === 'img') {
        const img = target as HTMLImageElement;
        if (!img.src.includes('data:image/svg+xml')) {
          img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmOGZhZmMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzk0YTNiOSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==';
          img.classList.add('object-contain', 'p-4', 'bg-slate-50');
        }
      }
    };
    window.addEventListener('error', handleImageError, true);

    const preventDefault = (e: Event) => e.preventDefault();
    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('dragstart', preventDefault);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S, Ctrl+C, Ctrl+P, Ctrl+U
      if ((e.ctrlKey || e.metaKey) && ['s', 'c', 'p', 'u'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      // Prevent F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('error', handleImageError, true);
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('dragstart', preventDefault);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/houses" element={<HouseCategoriesPage />} />
          <Route path="/houses/category/:categoryId" element={<CategoryHousesPage />} />
          <Route path="/house/:id" element={<HouseDetailPage />} />
          <Route path="/ready-houses" element={<ReadyHousesPage />} />
          <Route path="/ready-house/:id" element={<ReadyHouseDetailPage />} />
          <Route path="/lands" element={<LandsPage />} />
          <Route path="/land/:id" element={<LandDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/category/:categoryId" element={<PortfolioCategoryItemsPage />} />
          <Route path="/portfolio/project/:id" element={<PortfolioDetailPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/materials" element={<MaterialListPage />} />
          <Route path="/service-fees" element={<ServiceFeesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
