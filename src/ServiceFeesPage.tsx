import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CircleDollarSign, ArrowLeft, ClipboardList, CheckCircle2, 
  Sparkles, AlertCircle, ChevronRight, Building2, Paintbrush, 
  ShieldCheck, LayoutGrid, Sofa, Award, TrendingUp, Info, 
  Sliders, ArrowUpRight, Check, Star, BadgeCheck, FileCheck, 
  HelpCircle, Sparkle, ShieldAlert, KeyRound, HardHat, Ruler
} from 'lucide-react';
import SEO from './components/SEO';

const styles = {
  sectionPadding: "py-20 sm:py-28",
  paddingX: "px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl",
};

export default function ServiceFeesPage() {
  const { t } = useTranslation();
  
  // Interactive Calculator State
  const [calculatorTab, setCalculatorTab] = useState<'design' | 'construction'>('design');
  const [customArea, setCustomArea] = useState<number>(180);
  
  // Tiers for Design (เริ่มต้น 300 บาท/ตร.ม. หรือคิดเรตอื่นตามความซับซ้อน)
  const [designTier, setDesignTier] = useState<number>(300); // 300, 450, 600
  // Tiers for Construction (เริ่มต้น 12,500 บาท/ตร.ม.)
  const [constructionTier, setConstructionTier] = useState<number>(12500); // 12500, 15500, 19500

  // 3% percentage calculation demonstration
  const estimatedConstructionValue = customArea * 13000; // estimated construction value at average 13k/sqm
  const designFeeByPercentage = estimatedConstructionValue * 0.03;

  return (
    <div className="pt-24 pb-20 bg-[#FDFDFB] min-h-[calc(100vh-100px)] overflow-x-hidden selection:bg-[#E2D5C3]/80 selection:text-slate-900" style={{ fontFamily: 'Prompt, sans-serif' }}>
      <SEO 
        title={t("อัตราค่าบริการเขียนแบบและงบงานก่อสร้าง - ฤทัยคอนสตรัคชั่น")} 
        description={t("รายละเอียดอัตราค่าบริการออกแบบสถาปัตยกรรม เขียนแบบโดยสถาวิชาชีพวิศวกร เริ่มต้น 300 บาท/ตร.ม. หรือ ร้อยละ 3 และค่าบริการก่อสร้างระดับมาตรฐานเริ่มต้น 12,500 บาท/ตร.ม. พร้อมรับประกันโครงสร้างยาวนานถึง 20 ปี")}
        keywords={t("อัตราค่าจ้าง, ราคาออกแบบบ้าน, ค่าก่อสร้าง ตารางเมตร, รับสร้างบ้าน, ฤทัยคอนสตรัคชั่น, ออกแบบบ้านหรู, รับประกันโครงสร้าง 20 ปี")}
      />

      {/* Decorative luxury background pattern and fine grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5DBCF_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-[300px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/10 to-transparent pointer-events-none" />

      <div className={styles.paddingX}>
        
        {/* Back Button */}
        <div className="flex flex-col items-center mb-10 relative z-10">
          <Link to="/" className="inline-flex items-center text-slate-800 hover:text-[#9A8161] font-semibold text-xs tracking-wider uppercase transition-all duration-300 bg-white shadow-[0_4px_15px_rgba(229,219,207,0.3)] border border-[#E5DBCF] px-5 py-2.5 rounded-full hover:-translate-y-0.5 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform text-[#9A8161]" /> {t('กลับสู่หน้าแรกของฤทัย')}
          </Link>
        </div>

        {/* Hero Banner Section (Clean, Bold, Elegant & Stately) */}
        <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 shadow-[0_15px_40px_rgba(0,0,0,0.5)] mb-16 p-8 sm:p-14 text-center select-none border border-slate-800">
          {/* Beautiful fading luxury interior background overlay */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 transition-opacity duration-500 scale-102"
            style={{ backgroundImage: `url('https://loremflickr.com/1600/900/blueprint,plan,house/all')` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/60 to-slate-950/80 pointer-events-none" />
          
          <div className="absolute left-6 top-6 w-12 h-12 border-l-2 border-t-2 border-amber-400/40 hidden sm:block" />
          <div className="absolute right-6 top-6 w-12 h-12 border-r-2 border-t-2 border-amber-400/40 hidden sm:block" />
          <div className="absolute left-6 bottom-6 w-12 h-12 border-l-2 border-b-2 border-amber-400/40 hidden sm:block" />
          <div className="absolute right-6 bottom-6 w-12 h-12 border-r-2 border-b-2 border-amber-400/40 hidden sm:block" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 text-xs font-bold rounded-full tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('RUETHAI TRANSPARENCY & ASSURANCE')}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
              {t('โปร่งใสทุกตารางเมตร เพื่อบ้านที่สมบูรณ์แบบ')} <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                {t('อัตราค่าบริการและงบก่อสร้างที่ชัดเจน คุ้มค่าและลงตัวกับทุกงบประมาณ')}
              </span>
            </h1>

            <div className="w-20 h-[3px] bg-gradient-to-r from-amber-400 to-amber-200 mx-auto mb-6" />

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              {t('ความฝันในการสร้างบ้านควรเริ่มต้นด้วยรากอันมั่นคงของความซื่อตรง ฤทัยขอนำเสนอรายละเอียดค่าบริการออกแบบสถาปัตยกรรมและการสร้างอาคารที่ละเอียด โปร่งใส ตรวจสอบงบประมาณได้ครบถ้วน ปราศจากค่าใช้จ่ายแอบแฝงใดๆ ทั้งสิ้น')}
            </p>
          </div>
        </div>

        {/* Dynamic Interactive Budget Estimator (Aesthetically elevated, highly interactive dashboard) */}
        <div id="calculator" className="bg-gradient-to-br from-[#FAF8F5] to-[#F5ECE2] rounded-[2.5rem] p-6 sm:p-12 border border-[#E5DBCF] shadow-[0_20px_50px_rgba(229,219,207,0.3)] mb-16 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E2D5C3] text-[#9A8161] text-[11px] font-bold rounded-full tracking-wider uppercase mb-3 shadow-sm">
              <CircleDollarSign className="w-4 h-4 text-[#C5A880]" />
              <span>{t('INTERACTIVE SERVICE COST ESTIMATOR')}</span>
            </span>
            <h2 className="text-3xl sm:text-4.5xl font-extrabold text-slate-950 leading-tight">
              {t('เครื่องมือคำนวณงบประมาณออกแบบและก่อสร้าง')}
            </h2>
            <div className="w-12 h-[2px] bg-[#C5A880] mx-auto mt-2 mb-2" />
            <p className="text-slate-800 text-xs sm:text-sm font-semibold max-w-xl">
              {t('เลือกสลับส่วนงานออกแบบ หรือ ส่วนงานก่อสร้างจริง เพื่อประเมินค่าใช้จ่ายเบื้องต้นตามขนาดตารางเมตร พร้อมคำนวณแบบจำลองที่แม่นยำที่สุด')}
            </p>
          </div>

          {/* Tab Selection */}
          <div className="relative z-10 flex justify-center mb-8">
            <div className="bg-[#EADFCF] p-1.5 rounded-2xl flex max-w-lg w-full border border-[#DCD0C0]">
              <button 
                onClick={() => setCalculatorTab('design')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold tracking-wide rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${calculatorTab === 'design' ? 'bg-white text-slate-900 shadow-md border border-[#E5DBCF]' : 'text-slate-800 hover:text-slate-900'}`}
              >
                <Ruler className="w-4 h-4 text-[#C5A880]" />
                {t('คิดงานออกแบบสถาปัตย์')}
              </button>
              <button 
                onClick={() => setCalculatorTab('construction')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold tracking-wide rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${calculatorTab === 'construction' ? 'bg-white text-slate-900 shadow-md border border-[#E5DBCF]' : 'text-slate-800 hover:text-slate-900'}`}
              >
                <HardHat className="w-4 h-4 text-[#C5A880]" />
                {t('คิดราคางานก่อสร้าง')}
              </button>
            </div>
          </div>

          {/* Calculator Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left side inputs */}
            <div className="lg:col-span-5 bg-white border border-[#EADFCF] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-9 h-9 rounded-full bg-[#FCFBF8] flex items-center justify-center border border-[#E5DBCF]">
                    <Sliders className="w-4.5 h-4.5 text-[#C5A880]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#111827] uppercase tracking-wide">
                    {calculatorTab === 'design' ? t('ปรับแต่งสเกลงานออกแบบ') : t('ปรับแต่งสเกลงานก่อสร้าง')}
                  </h3>
                </div>

                {/* Slider for Area size */}
                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs sm:text-sm text-slate-800 font-bold">{t('ขนาดพื้นที่ใช้สอย')}</span>
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">
                      {customArea} <span className="text-xs text-slate-700 font-medium">{t('ตร.ม.')}</span>
                    </span>
                  </div>
                  
                  <input 
                    type="range" 
                    min="50" 
                    max="1000" 
                    step="10"
                    value={customArea} 
                    onChange={(e) => setCustomArea(Number(e.target.value))}
                    className="w-full accent-[#C5A880] h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  
                  <div className="flex justify-between text-[11px] text-slate-800 font-bold mt-2">
                    <span>50 ตร.ม.</span>
                    <span>250 ตร.ม.</span>
                    <span>500 ตร.ม.</span>
                    <span>750 ตร.ม.</span>
                    <span>1,000 ตร.ม.</span>
                  </div>
                </div>

                {/* Service Quality Tier Selection */}
                {calculatorTab === 'design' ? (
                  <div className="space-y-3">
                    <label className="text-xs sm:text-sm text-slate-800 font-bold block mb-1">{t('เลือกรูปแบบงานเขียนแบบและบริการ')}</label>
                    
                    <button 
                      onClick={() => setDesignTier(300)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-300 flex justify-between items-center ${designTier === 300 ? 'border-[#C5A880] bg-[#FAF8F5] ring-2 ring-[#C5A880]/20' : 'border-slate-200 hover:border-[#C5A880]/50 bg-white'}`}
                    >
                      <div>
                        <p className="font-extrabold text-slate-900">{t('Standard Architect Rate')}</p>
                        <p className="text-[11px] text-slate-800 font-medium mt-0.5">{t('เขียนแบบสถาปัตยกรรมครบเล่มเพื่อยื่นขออนุญาต')}</p>
                      </div>
                      <span className="font-extrabold text-[#9A8161] text-xs sm:text-sm shrink-0">฿300 / {t('ตร.ม.')}</span>
                    </button>

                    <button 
                      onClick={() => setDesignTier(450)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-300 flex justify-between items-center ${designTier === 450 ? 'border-[#C5A880] bg-[#FAF8F5] ring-2 ring-[#C5A880]/20' : 'border-slate-200 hover:border-[#C5A880]/50 bg-white'}`}
                    >
                      <div>
                        <p className="font-extrabold text-slate-900">{t('Premium Custom Villa')}</p>
                        <p className="text-[11px] text-slate-800 font-medium mt-0.5">{t('ออกแบบบ้านปรับแปลนสามมิติเฉพาะสไตล์ ถอดวัสดุละเอียด')}</p>
                      </div>
                      <span className="font-extrabold text-[#9A8161] text-xs sm:text-sm shrink-0">฿450 / {t('ตร.ม.')}</span>
                    </button>

                    <button 
                      onClick={() => setDesignTier(600)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-300 flex justify-between items-center ${designTier === 600 ? 'border-[#C5A880] bg-[#FAF8F5] ring-2 ring-[#C5A880]/20' : 'border-slate-200 hover:border-[#C5A880]/50 bg-white'}`}
                    >
                      <div>
                        <p className="font-extrabold text-slate-900">{t('Ultra Luxury Masterpiece')}</p>
                        <p className="text-[11px] text-slate-800 font-medium mt-0.5">{t('สถาปัตยกรรมระดับซิกเนเจอร์ และที่ปรึกษาควบคุมวัสดุระดับสูง')}</p>
                      </div>
                      <span className="font-extrabold text-[#9A8161] text-xs sm:text-sm shrink-0">฿600 / {t('ตร.ม.')}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="text-xs sm:text-sm text-slate-800 font-bold block mb-1">{t('เลือกเกรดแบรนด์และสไตล์งานก่อสร้าง')}</label>
                    
                    <button 
                      onClick={() => setConstructionTier(12500)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-300 flex justify-between items-center ${constructionTier === 12500 ? 'border-[#C5A880] bg-[#FAF8F5] ring-2 ring-[#C5A880]/20' : 'border-slate-200 hover:border-[#C5A880]/50 bg-white'}`}
                    >
                      <div>
                        <p className="font-extrabold text-slate-900">{t('Standard Quality Grade')}</p>
                        <p className="text-[11px] text-slate-800 font-medium mt-0.5">{t('คอนกรีตเสริมเหล็กมาตรฐานสูง วัสดุแบรนด์ชั้นนำ SCG')}</p>
                      </div>
                      <span className="font-extrabold text-[#9A8161] text-xs sm:text-sm shrink-0">฿12,500 / {t('ตร.ม.')}</span>
                    </button>

                    <button 
                      onClick={() => setConstructionTier(15500)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-300 flex justify-between items-center ${constructionTier === 15500 ? 'border-[#C5A880] bg-[#FAF8F5] ring-2 ring-[#C5A880]/20' : 'border-slate-200 hover:border-[#C5A880]/50 bg-white'}`}
                    >
                      <div>
                        <p className="font-extrabold text-slate-900">{t('Premium Elite Home')}</p>
                        <p className="text-[11px] text-slate-800 font-medium mt-0.5">{t('เพิ่มคุณสมบัติกระจกบานใหญ่พิเศษ ทนความร้อน โคมไฟอัจฉริยะ')}</p>
                      </div>
                      <span className="font-extrabold text-[#9A8161] text-xs sm:text-sm shrink-0">฿15,500 / {t('ตร.ม.')}</span>
                    </button>

                    <button 
                      onClick={() => setConstructionTier(19500)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-300 flex justify-between items-center ${constructionTier === 19500 ? 'border-[#C5A880] bg-[#FAF8F5] ring-2 ring-[#C5A880]/20' : 'border-slate-200 hover:border-[#C5A880]/50 bg-white'}`}
                    >
                      <div>
                        <p className="font-extrabold text-slate-900">{t('Luxury Mansion Scope')}</p>
                        <p className="text-[11px] text-slate-800 font-medium mt-0.5">{t('คัดเกรดสิเบอร์ทองแถมหินธรรมชาติแกรนิต โครงสร้างเสาและท่อไฮเอนด์')}</p>
                      </div>
                      <span className="font-extrabold text-[#9A8161] text-xs sm:text-sm shrink-0">฿19,500 / {t('ตร.ม.')}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Totals Section */}
              <div className="border-t border-[#E5DBCF] pt-5 mt-6">
                {calculatorTab === 'design' ? (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs sm:text-sm text-slate-800 font-bold">{t('ประมาณการงบออกแบบตัวจริง')}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">{t('หักลบคืนเต็มจำนวน')}</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#9A8161] mb-2 flex items-baseline">
                      <span className="text-xl mr-1 font-medium text-slate-600">฿</span>
                      {(customArea * designTier).toLocaleString()}
                    </div>
                    
                    {/* Alternate 3% calculations */}
                    <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EBDCC8] text-[11px] sm:text-xs text-slate-800 mt-2 font-medium">
                      <div className="flex justify-between font-bold text-slate-900 mb-1">
                        <span>{t('หรือเปรียบเทียบจากวิธี 3% ของราคาก่อสร้าง:')}</span>
                        <span className="text-[#9A8161]">฿{designFeeByPercentage.toLocaleString()}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-normal">
                        * {t('คิดร้อยละ 3 จากงบประมาณก่อสร้างประเมินเบื้องต้นเฉลี่ย (ตัวอย่างคำนวณที่ ฿13,000 ต่อ ตร.ม.)')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs sm:text-sm text-slate-800 font-bold">{t('ประมาณการค่าก่อสร้าง')}</span>
                      <span className="text-[10px] bg-[#9A8161] text-white font-bold px-2.5 py-0.5 rounded-full">{t('เรตเริ่มต้น 12,500 ฿')}</span>
                    </div>
                    <div className="text-3.5xl sm:text-4.5xl font-extrabold text-slate-900 mb-2 flex items-baseline">
                      <span className="text-xl mr-1 font-medium text-slate-600">฿</span>
                      {(customArea * constructionTier).toLocaleString()}
                    </div>
                    <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EBDCC8] text-[11px] sm:text-xs text-slate-800 mt-2 font-medium space-y-1">
                      <p className="font-extrabold text-[#C5A880]">{t('สิ่งที่คุณจะได้รับทันที:')}</p>
                      <p className="text-slate-750 font-normal">{t('• ฟรีค่าแบบจำลอง 3D สถาปัตย์ 100% คืนค่ามัดจำหักกับสัญญาสร้างอาคารจริง')}</p>
                      <p className="text-slate-750 font-normal">{t('• รับประกันโครงสร้างอาคารและฐานรากยาวนานที่สุดถึง 20 ปี')}</p>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-start gap-3 bg-gradient-to-br from-[#FFFDF8] to-[#FFF9F0] p-4 rounded-xl border border-[#EEDBBA] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#D4AF37] to-[#C5A880]" />
                  <div className="p-1.5 bg-white shadow-sm rounded-lg border border-[#EEDBBA] flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                  </div>
                  <span className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium pt-0.5">
                    <span className="inline-block bg-[#FDF6E3] border border-[#EEDBBA] text-[#B8860B] font-extrabold px-2 py-0.5 rounded uppercase tracking-wide text-[10px] sm:text-[11px] mb-1.5 shadow-sm">
                      {t('✨ เอกสิทธิ์พิเศษสำหรับคุณ')}
                    </span><br/>
                    {t('หากตกลงรับบริการก่อสร้างในแบบ (Turnkey) กับทางฤทัยคอนสตรัคชั่น')} <br className="hidden sm:block" />
                    <span className="relative inline-block mt-1">
                      <span className="absolute inset-0 bg-[#FFF3D6] transform -skew-x-6 rounded-sm"></span>
                      <strong className="relative z-10 text-[#A67B27] font-extrabold px-1">
                        {t('เรายินดีคืนส่วนลดค่าจ้างออกแบบสถาปัตยกรรมให้เต็ม 100% ทันที!')}
                      </strong>
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right side value presentation cards matching the active calculator choice */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              {calculatorTab === 'design' ? (
                <div className="bg-white border border-[#EADFCF] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-md text-slate-900">
                  <div>
                    <div className="flex items-center gap-2 mb-4 border-b border-[#FAF6F0] pb-3">
                      <Ruler className="w-5 h-5 text-[#C5A880]" />
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-950">{t('ข้อมูลการออกแบบสถาปัตยกรรม (Architectural Design)')}</h3>
                    </div>
                    
                    <p className="text-sm text-slate-800 font-bold mb-4 leading-relaxed">
                      {t('ฤทัย คอนสตรัคชั่น คิดอัตราค่าจ้างเขียนแบบเริ่มที่ 300 บาทต่อตารางเมตร หรือคิดเป็นอัตราร้อยละ 3 ของงบประมาณก่อสร้างโดยสถาปนิกและวิศวกรวิชาชีพ ออกแบบจัดสรรแปลน ทิศทางแดด-ลมธรรมชาติ และฮวงจุ้ยเพื่อความผาสุก')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                      <div className="p-4 bg-[#FAF8F5] border border-[#E5DBCF]/60 rounded-xl">
                        <h4 className="font-extrabold text-[#9A8161] text-xs sm:text-sm mb-1">{t('แบบเป็นเล่มพร้อมลงหน้างาน')}</h4>
                        <p className="text-[11px] sm:text-xs text-slate-800 font-medium leading-relaxed">{t('ได้รับพิมพ์เขียวคมชัดครบถ้วน ยื่นขออนุญาตที่สำนักงานเขต/อบต. ได้ผ่านพิจารณาอย่างง่ายดาย')}</p>
                      </div>
                      <div className="p-4 bg-[#FAF8F5] border border-[#E5DBCF]/60 rounded-xl">
                        <h4 className="font-extrabold text-[#9A8161] text-xs sm:text-sm mb-1">{t('สถาปนิกและวิศวกรเซ็นรับรองแบบ')}</h4>
                        <p className="text-[11px] sm:text-xs text-slate-800 font-medium leading-relaxed">{t('ครอบคลุมทั้งวิชาชีพควบคุมภาคีสถาปนิกและวิศวกรโยธา เพื่อความมั่นคงสูงสุดตามกฎหมายกำหนด')}</p>
                      </div>
                      <div className="p-4 bg-[#FAF8F5] border border-[#E5DBCF]/60 rounded-xl">
                        <h4 className="font-extrabold text-[#9A8161] text-xs sm:text-sm mb-1">{t('จัดทําเล่มประมาณราคา BOQ ตัวจริง')}</h4>
                        <p className="text-[11px] sm:text-xs text-slate-800 font-medium leading-relaxed">{t('รายละเอียดวัสดุและการคำนวณคอนกรีต เสาเหล็ก ปูน โลหะ ชัดแจ้ง ไม่ทิ้งช่องโหว่งบขยาย')}</p>
                      </div>
                      <div className="p-4 bg-[#FAF8F5] border border-[#E5DBCF]/60 rounded-xl">
                        <h4 className="font-extrabold text-[#9A8161] text-xs sm:text-sm mb-1">{t('จำลองภาพ Perspective 3D เหมือนจริง')}</h4>
                        <p className="text-[11px] sm:text-xs text-slate-800 font-medium leading-relaxed">{t('รูปเสมือนจริงให้คุณเห็นโทนมิติแสงสว่าง วัสดุผิวสัมผัส กระจก อลูมิเนียม ก่อนลงมือตอกเสาเข็ม')}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mt-2 flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-extrabold text-amber-900">{t('ทำไมราคาถึงเริ่มต้นที่ 300 บาท/ตร.ม. หรือ ร้อยละ 3')}</p>
                        <p className="text-[11px] sm:text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                          {t('เพื่อให้นักลงทุนและเจ้าของครอบครัวได้สิทธิเข้าถึงสถาปัตยกรรมระดับพรีเมียมในงบที่จับต้องได้ ซึ่งงานเขียนแบบนี้จะมีสถาปนิกและทีมงานร่วมประเมินหน้างานจริงเสมอ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-[#EADFCF] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-md text-slate-900">
                  <div>
                    <div className="flex items-center gap-2 mb-4 border-b border-[#FAF6F0] pb-3">
                      <HardHat className="w-5 h-5 text-[#C5A880]" />
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-950">{t('ข้อมูลและสเปกส่วนงานก่อสร้าง (Construction Specifications)')}</h3>
                    </div>
                    
                    <p className="text-sm text-slate-800 font-bold mb-4 leading-relaxed">
                      {t('ฤทัย คอนสตรัคชั่น บริการก่อสร้างอาคารและบ้านพักอาศัยครบวงจร คิดอัตราค่าจ้างเริ่มต้นที่ 12,500 บาทต่อตารางเมตร ด้วยสัญญานโยบายรับประกันความปลอดภัยของสถาปัตยกรรมขั้นเทพในระยะยาว')}
                    </p>

                    {/* Highly requested structural warranties elements highlighted aggressively */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                        <ShieldCheck className="w-8 h-8 text-emerald-750 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight">{t('รับประกันผลงานโครงสร้าง 20 ปี')}</h4>
                          <p className="text-[11px] text-slate-800 font-medium mt-1 leading-relaxed">
                            {t('ครอบคลุมฐานราก เสาเข็ม ตอม่อ คาน คอนกรีต และโครงเหล็กหลักอาคารสูงสุด ปราศจากการทรุดร้าวที่เป็นอันตราย')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                        <ShieldCheck className="w-8 h-8 text-emerald-750 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight">{t('รับประกันงานทั่วไป 1 ปี')}</h4>
                          <p className="text-[11px] text-slate-800 font-medium mt-1 leading-relaxed">
                            {t('ครอบคลุมรอยแตกร้าวผนัง สีพ่น หลังคารั่วซึม ท่อสุขาภิบาลประปา และระบบวิศวกรรมไฟฟ้าขัดข้อง')}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-[#FAF8F5] border border-[#E5DBCF]/60 rounded-xl">
                        <h4 className="font-extrabold text-[#9A8161] text-xs sm:text-sm mb-1">{t('การันตีมาตรฐานวัสดุแท้')}</h4>
                        <p className="text-[11px] sm:text-xs text-slate-800 font-medium leading-relaxed">{t('วัสดุทุกตระกูลสแตนเลส สปิงเกล ปูน และท่อพลาสติกตรงตามเอกสาร BOQ แบรนด์เครือชั้นนำ ตรวจสอบได้')}</p>
                      </div>

                      <div className="p-4 bg-[#FAF8F5] border border-[#E5DBCF]/60 rounded-xl">
                        <h4 className="font-extrabold text-[#9A8161] text-xs sm:text-sm mb-1">{t('การตรวจสอบหน้างานอย่างเข้มงวด')}</h4>
                        <p className="text-[11px] sm:text-xs text-slate-800 font-medium leading-relaxed">{t('ทีมควบคุมงานวิศวกรและสถาปนิกตรวจสอบขั้นตอนเทปูน ผูกเหล็ก ทากันซึมอย่างใกล้อยู่เสมอ')}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mt-2 flex items-start gap-2.5">
                      <BookmarkCheckIcon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-extrabold text-amber-900">{t('นโยบายไม่มีทิ้งงานและราคาสุทธิ')}</p>
                        <p className="text-[11px] sm:text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                          {t('รับประกันความโปร่งใส ปราศจากการเรียกเก็บค่าแรงเพิ่มหรือหมกเม็ดราคาเบิกจ่ายหน้างาน สัญญาสากลชัดเจน')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>

        {/* Top Section: Architectural Design (งานออกแบบสถาปัตยกรรมของสถาปนิก) rates explainer details */}
        <div className="mb-20">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-[#C5A880] uppercase tracking-widest block mb-2">
              {t('ARCHITECTURAL WORK')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {t('งานออกแบบสถาปัตยกรรม')} <span className="font-semibold text-[#866F53]">{t('ราคาเริ่มต้นที่ 300 บาท/ตร.ม.')}</span>
            </h2>
            <div className="w-12 h-[3px] bg-[#C5A880] mx-auto mt-3 mb-3" />
            <p className="text-slate-850 text-xs sm:text-sm font-semibold max-w-xl mx-auto text-center leading-relaxed">
              {t('สำหรับผู้เริ่มต้นจ้างออกแบบแบบมาตรฐาน ฤทัยคอนสตรัคชั่น อำนวยความประณีตในการรังสรรค์แบบพิมพ์เขียวครบวงจร มั่นคง แข็งแรง และตอบรับประโยชน์ใช้สอย')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[
              {
                title: t('1. ขอบข่ายการออกแบบสถาปัตยกรรม'),
                icon: <Ruler className="w-6 h-6 text-[#9A8161]" />,
                desc: t('วางผังการใช้สอยประโยชน์ (Floor Plan) ทั้งหมด ทิศทางเข้าออก ทิศทางการไหลเวียนของลมธรรมชาติ รวมไปถึงการคำนวณตำแหน่งพื้นที่สีเขียวและความสว่างที่ดีที่สุดของที่อยู่อาศัย')
              },
              {
                title: t('2. โครงสร้างและระบบสุขาภิบาล'),
                icon: <Building2 className="w-6 h-6 text-[#9A8161]" />,
                desc: t('คำนวณความแข็งแรงของเสา คาน เสาเข็ม ฐานพยุงแผ่นดินไหว โดยวิศวกรวิชาชีพควบคุม พร้อมระบบออกแบบท่อน้ำลายน้ำเสีย การเดินท่อร้อยสายไฟอย่างปลอดภัยไร้ตำหนิใดๆ')
              },
              {
                title: t('3. แอนิเมชันและภาพส่องรอบด้าน'),
                icon: <Sparkles className="w-6 h-6 text-[#9A8161]" />,
                desc: t('รวมภาพสามมิติเสมือนจริง Perspective 3D เรนเดอร์แสงเงาตามองศาจริง เพื่อให้คุณสัมผัสอารมณ์ความสุขของการอยู่อาศัยได้อย่างแม่นยำก่อนที่จะเริ่มการเทคอนกรีต')
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-[#EADFCF] rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#E5DBCF] flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: ควรจ่ายเงินงวดไหนแบ่งจ่ายอย่างไร? (Stylized Luxury Timeline steps - 5 Steps Design Stage Progressions) */}
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-[#EADFCF] shadow-md mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#F5EFE6]/30 rounded-full blur-2xl -z-10" />
          
          <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
            <span className="text-xs font-bold text-[#C5A880] uppercase tracking-widest mb-1 block">
              {t('INTERIOR & ARCHITECTURAL STAGES')}
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-900 leading-tight">
              {t('งวดเงินและขั้นตอนส่งงาน')} <span className="font-bold text-[#9A8161]">{t('การออกแบบ 5 งวดเพื่อความมั่นใจ')}</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#C5A880] mx-auto mt-3 mb-3" />
            <p className="text-slate-800 text-xs sm:text-sm font-semibold max-w-xl mx-auto">
              {t('ฤทัย คอนสตรัคชั่น มีขั้นตอนชำระงวดออกแบบเป็นลำดับขั้นที่ปลอดภัย โปร่งใส ผ่านรายงานรับส่งอย่างเป็นทางการในทุกมิติขั้นตอน')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {[
              { percent: '40 %', title: t('งวดที่ 1 - ทำสัญญาจัดวางโครง'), desc: t('วันเซ็นสัญญารับออกแบบ เพื่อเริ่มทีมขอบเขต จัดวางผังพื้นแปลนทิศอาคารอย่างหรูหรา') },
              { percent: '25 %', title: t('งวดที่ 2 - สู่พิมพ์เขียวโครงสร้าง'), desc: t('กำหนดรายละเอียดมิติรากฐาน อุปกรณ์สุขาภิบาล จุดติดตั้งอุปกรณ์ไฟ และสัญจรลม') },
              { percent: '20 %', title: t('งวดที่ 3 - ส่งแบบ Perspective'), desc: t('พรีเซนต์ภาพเสมือนรูป 3D เพื่อตัดสินโทนสี ลายหินแร่ และความสมดุลด้านองค์ประกอบ') },
              { percent: '10 %', title: t('งวดที่ 4 - เล่มยื่นขออนุญาต'), desc: t('ส่งชุดพิมพ์เขียวสมบูรณ์พร้อมสถาปนิกและวิศวกรโยธาลงลายเซ็นรับรองอย่างเป็นทางการ') },
              { percent: '5 %', title: t('งวดที่ 5 - จัดสร้างเล่มราคา BOQ'), desc: t('มอบชุดแบบเล่มและชุดค่าคำนวณประมาณราคากลาง เพื่อเตรียมการจ้างเหมาก่อสร้างจริง') }
            ].map((step, idx) => (
              <div key={idx} className="relative bg-[#FCFBF8] p-5.5 rounded-2xl border border-[#E5DBCF]/80 hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between select-none">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2.5xl font-extrabold text-[#9A8161] leading-none">
                      {step.percent}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#FAF6F0] border border-[#E5DBCF] font-bold text-xs flex items-center justify-center text-[#9A8161]">
                      {idx + 1}
                    </div>
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-extrabold text-slate-900 mb-2 leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-slate-800 font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Construction and Solid Assurances (งานก่อสร้างอย่างมั่นคง) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-stretch relative z-10">
          
          <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 sm:p-10 border border-[#EADFCF] shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold text-[#C5A880] uppercase tracking-widest mb-2 block">
                {t('RUETHAI WARRANTY TERMS')}
              </span>
              <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-900 mb-5 leading-tight">
                {t('รับประกันที่ยาวนาน')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-teal-750 font-extrabold">
                  {t('โครงสร้างหลักยาวนานถึง 20 ปี')}
                </span>
              </h2>
              <div className="w-12 h-[3px] bg-emerald-700 mb-6" />
              
              <p className="text-slate-850 text-xs sm:text-sm font-semibold leading-relaxed mb-4">
                {t('ฤทัย คอนสตรัคชั่น ให้ความสำคัญสูงสุดกับความแข็งแรงมั่นคงของรากฐานและโครงสร้างแผ่นดินไหว อาคารทุกหลังพักพิงยาวนานอย่างปราศจากรอยเลื่อนไหว')}
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-150 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{t('การรับประกันโครงสร้างหลัก (20 ปี)')}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-800 font-medium mt-1 leading-relaxed">
                      {t('โครงข่ายฐานรากหลัก หมวดเข็มตอก คาน คอนกรีตเสริมเหล็ก ตอม่อ เสาสะกดดิน และระบบพื้นโครงเหล็กเพื่อกันการแอ่นทรุด')}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-150 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{t('การรับประกันสถาปัตยกรรมและภายใน (1 ปี)')}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-800 font-medium mt-1 leading-relaxed">
                      {t('งานทาสีภายนอกคุมแดด สิทธิผนังแตกลายงา งานซึมรอยต่อนกระจก ช่องรอยเชื่อม งานปูผิววัสดุกระเบื้อง และวิศวกรวิชาชีพควบคุมระดับประปาไฟฟ้า')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-[#E5DBCF] pt-4 text-xs font-semibold text-slate-800 leading-relaxed">
              * {t('เงื่อนไขการรับประกันมีเอกสารสิทธิแนบท้ายใบรับประกันผลงานอย่างละเอียด เพื่อความเชื่อมั่นสูงสุดในร่มเงาครอบครัวของท่าน')}
            </div>
          </div>

          <div className="lg:col-span-7 relative rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-auto shadow-md border border-[#EADFCF] min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200" 
              alt="High precision premium construction site foundation"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Elegant overlay inside image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 border-4 border-white/10 m-5 rounded-2xl pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white bg-slate-950/85 backdrop-blur-md p-5 rounded-xl border border-white/15 select-none text-left">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-bold rounded shadow mb-2 uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>20-Year structural guarantee</span>
              </div>
              <h4 className="font-extrabold text-sm sm:text-base text-white mb-1.5">{t('วิศวกรรมการปลูกสร้างระดับสากล')}</h4>
              <p className="text-xs font-medium text-slate-300 leading-relaxed">
                {t('เราคัดสรรปูนคุณภาพพอร์ทแลนด์ คอนกรีตกำลังอัดสูง SCG แยกรุ่นเหล็กเต็มเส้นตามสเปกวิศวกรรมสิทธิบัตร มั่นคง ปลอดภัย ยืดถือเพื่อคุณภาพชีวิตที่ไร้มลทิน')}
              </p>
            </div>
          </div>
        </div>

        {/* Section: เจาะลึกเล่ม BOQ และความสำคัญ ของงานออกแบบบ้านจริงๆ */}
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-[#EADFCF] shadow-md mb-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-6 text-left">
              <span className="text-xs font-bold text-[#C5A880] uppercase tracking-widest block mb-1">
                {t('QUANTITATIVE PERFECTION')}
              </span>
              <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-900 leading-tight">
                {t('ทำความรู้จักใบแสดงสเป็ก')} <br />
                <span className="font-extrabold text-[#9A8161]">
                  {t('ระบบสัญญาราคา BOQ บ้านและอาคาร')}
                </span>
              </h2>
              <div className="w-12 h-[3px] bg-[#C5A880] my-4" />
              <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed mb-4">
                {t('BOQ หรือ "Bill of Quantities" คือเอกสารรายงานประเมินความชัดแจ้งของวัสดุก่อสร้าง ตลอดจนตารางแรงงานก่อสร้างและพิกัดเสา ท่อ คิ้ว กระจก ทราย หิน แดนหิน ฤทัย จัดเตรียมเอกสารนี้อย่างซื่อสัตย์ เพื่อป้องกันกลเม็ดบวกราคาเพิ่มในสัญญาก่อสร้างอย่างร้อยเปอร์เซ็นต์')}
              </p>
              
              <div className="space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-normal">
                    <strong>{t('ปลอดค่าใช้จ่ายซ่อนเร้น:')}</strong> {t('รายการวัสดุเกรด และยี่ห้อถูกเขียนแจกแจงอย่างล่ำลือเพื่อสืบค้นเปรียบเทียบราคา')}
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-normal">
                    <strong>{t('สามารถปรับเกรดวัสดุได้:')}</strong> {t('เจ้าของบ้านมีสิทธิร้อยละร้อยในการปรับเปลี่ยนวัสดุขึ้นหรือลง เพื่อควมคุมเพดานงบส่วนแบ่งเงิน')}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#FCFBF8] border border-[#E5DBCF] rounded-2xl p-6 sm:p-8">
              <h4 className="font-extrabold text-slate-950 text-xs sm:text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-[#C5A880]" />
                {t('การแบ่งแจกแบบครอบคลุมในเล่ม BOQ ของฤทัย')}
              </h4>
              
              <ul className="space-y-3">
                {[
                  { title: t('1. หมวดเตรียมงาน-ฐานราก'), desc: t('จัดการปรับหน้าดิน ตอกเสาเข็ม และรังวัดศูนย์รวมทิศทางอาคารตามโครงสิทธิ์') },
                  { title: t('2. หมวดโครงสร้างคอนกรีตวิศวกรรม'), desc: t('เทฐานราก คอนกรีตเสริมเหล็ก คาน เสา แผ่นพื้นอย่างแข็งแรงมั่นคง') },
                  { title: t('3. หมวดสถาปัตยกรรมภายนอก-ผนัง'), desc: t('ผนังอิฐมอญแดงทนความร้อนอย่างดี ผิวปูนฉาบเรียบคมชัดกริบ และมิติวาลเปเปอร์') },
                  { title: t('4. หมวดช่องเปิดประตูและหน้าต่าง'), desc: t('กระจกกรองแสงหนาพิเศษ อลูมิเนียมแบรนด์กั้นเก็บเสียงสูงสุดรับอากาศสบายใจ') },
                  { title: t('5. หมวดระบบท่อไฟท่อประปาสากล'), desc: t('ระบบสายดินนิรภัย ตู้วาล์วควบคุมไฟ และระบบท่อฉุกเฉินสลายกลิ่นส้วมลอยซึม') }
                ].map((item, idx) => (
                  <li key={idx} className="border-b border-dashed border-[#E5DBCF] pb-2 last:border-b-0 text-slate-900">
                    <div className="flex justify-between font-extrabold text-xs sm:text-sm">
                      <span>{item.title}</span>
                      <span className="text-[#C5A880] text-xs font-bold">{t('วิเคราะห์ประเมินถูกต้อง')}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-800 font-medium leading-relaxed mt-0.5">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* FAQ Section with ultra high readability, high contrast text */}
        <div className="bg-[#FAF7F2] rounded-[2rem] p-6 sm:p-12 border border-[#E2D5C3] relative z-10 text-slate-900">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-xs font-bold text-[#C5A880] uppercase tracking-widest block mb-1">
              {t('RUETHAI KNOWLEDGE BASE')}
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-extrabold leading-tight">
              {t('ไขข้อพินิจและคําถามที่พบบ่อย')}
            </h2>
            <div className="w-10 h-[2px] bg-[#C5A880] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-5xl mx-auto">
            <div className="p-5.5 bg-white border border-[#E5DBCF] rounded-xl">
              <h4 className="font-extrabold text-slate-950 text-xs sm:text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4.5 h-4.5 text-[#C5A880]" />
                {t('ค่าเขียนแบบ 300 บาท/ตร.ม. ผลลัพธ์ที่ได้ครอบคลุมอะไรบ้าง?')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {t('ครอบคลุมการออกแบบสถาปัตยกรรม เขียนแบบโดยสถาปนิกและคำนวณโครงสร้างแข็งแรงโดยวิศวกรโยธายุคใหม่ พร้อมแนบท้ายเซ็นรับรองแบบพิมพ์เขียวสมบูรณ์ และมีภาพ Perspective จำลอง 3D เสมือนรูปสีเพื่อให้เจ้าของบ้านเห็นมิติเพื่อความประทับใจพึงพอใจ')}
              </p>
            </div>

            <div className="p-5.5 bg-white border border-[#E5DBCF] rounded-xl">
              <h4 className="font-extrabold text-slate-950 text-xs sm:text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4.5 h-4.5 text-[#C5A880]" />
                {t('ถ้างบก่อสร้างบ้านจำกัด ควบคุมงบอย่างไร?')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {t('ทีมสถาปนิกจะสัมภาษณ์ระดับวงเงินงบประมาณของคุณล่วงหน้า จากนั้นเราจะแปลงมิติวัสดุและขนาด ตร.ม. ให้อยู่ภายใต้กรอบงบประมาณที่ตกลงกันไว้ โดยในกรณีที่สร้างกับเราจะคำนวณหักส่วนลดค่าเขียนแบบคืนให้ครบ 100% (คุ้มค่าดั่งได้ตัวต้นแบบฟรี)')}
              </p>
            </div>

            <div className="p-5.5 bg-white border border-[#E5DBCF] rounded-xl">
              <h4 className="font-extrabold text-slate-950 text-xs sm:text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4.5 h-4.5 text-[#C5A880]" />
                {t('การรับประกันโครงสร้างยาวนานถึง 20 ปี คุ้มครองจริงในกรณีใดบ้าง?')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {t('คุ้มครองฐานรากทั้งหมดของสถาปัตยกรรม เช่น ข้อบกพร่องของเสาหลักแตกร้าว คานรับน้ำหนักคอนกรีต เสียหายจากการทรุดตัวที่มีนัยสำคัญทางโครงสร้าง และชิ้นส่วนเหล็กแกนเสารับแผ่นดินไหว ซึ่งเรามั่นใจในการก่อสร้างของเราอย่างที่สุดเนื่องจากใช้วิศวกรอาวุโสในการเช็กจุดเชื่อมต่อเหล็กและขั้นตอนหล่ออย่างดี')}
              </p>
            </div>

            <div className="p-5.5 bg-white border border-[#E5DBCF] rounded-xl">
              <h4 className="font-extrabold text-slate-950 text-xs sm:text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4.5 h-4.5 text-[#C5A880]" />
                {t('การยื่นขอรับอนุญาตก่อสร้างทางราชการ ใครเป็นคนดำเนินงาน?')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {t('ฤทัย คอนสตรัคชั่น ดำเนินงานจัดเตรียมจัดสเปก และทำเรื่องเดินเอกสารยื่นต่อสำนักงานเขต อบต. หรือหน่วยงานเทศบาลให้ลูกค้าแบบเบ็ดเสร็จ (One-Stop Service) เพื่อลดภาระและสยบปัญหาการติดต่อของท่านให้ราบรื่นไร้ความเครียด')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Auxiliary mini icons or inline badges inside page
function BookmarkCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      <path d="m9 10 2 2 4-4" />
    </svg>
  );
}
