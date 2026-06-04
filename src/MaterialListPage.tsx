import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { materialDataByLanguage } from './data/materialData';
import SEO from './components/SEO';

const styles = {
  sectionPadding: "py-16 sm:py-20",
  paddingX: "px-6 lg:px-8 mx-auto max-w-7xl",
};

export default function MaterialListPage() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'th';
  const data = materialDataByLanguage[currentLanguage] || materialDataByLanguage['th'];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-[calc(100vh-100px)]">
      <SEO 
        title={t("แบรนด์วัสดุก่อสร้างพรีเมียมที่เราเลือกใช้ในการสร้างบ้าน")} 
        description={t("ตรวจสอบรายการวัสดุเกรดพรีเมียมจากแบรนด์ชั้นนำ SCG, COTTO, TOA และอื่นๆ เพื่อให้คุณมั่นใจในความทนทานและความปลอดภัยระยะยาวของโครงสร้างบ้าน")}
        keywords={t("วัสดุก่อสร้างเกรดพรีเมียม, มาตรฐานสร้างบ้าน, ฤทัยคอนสตรัคชั่น")}
      />
      <div className={styles.paddingX}>
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="inline-flex items-center text-primary hover:text-accent font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t('กลับไปหน้าแรก')}
          </Link>
        </div>
        
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <ClipboardList className="w-16 h-16 text-primary opacity-90" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-4 leading-tight">
            {t('รายการวัสดุมาตรฐาน (Standard Serie)')}
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            {t('ที่ใช้ก่อสร้างบ้านพักอาศัย')}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-8">
          {data.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="bg-primary/5 px-6 py-4 border-b border-slate-100">
                <h2 className="text-2xl font-medium text-slate-800 text-center">{section.category}</h2>
                {section.subtitle && (
                  <p className="text-sm text-slate-500 text-center mt-1 font-medium">{section.subtitle}</p>
                )}
              </div>
              <div className="divide-y divide-slate-100">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="w-full flex flex-col md:flex-row hover:bg-slate-50/50 transition-colors">
                    <div className="md:w-1/3 px-6 py-4 bg-slate-50/30 md:border-r border-slate-100 font-medium text-slate-700 md:flex md:items-center">
                      <div className="flex items-start">
                         <span className="md:hidden mr-2 mt-1"><CheckCircle2 className="w-4 h-4 text-accent" /></span>
                         {item.name}
                      </div>
                    </div>
                    <div className="md:w-2/3 px-6 py-4 text-slate-600 text-[15px] leading-relaxed whitespace-pre-line flex items-center">
                      <span className="hidden md:flex mr-4 shrink-0"><CheckCircle2 className="w-5 h-5 text-accent opacity-70" /></span>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
