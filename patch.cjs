const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Repair the corrupted filter buttons and loading grid in PlansList (around lines 975 to 1016)
const corruptedPlansListSearch = `                  <button 
                <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
            {category?.title || "{t('รวมแบบบ้าน')}"}
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
                  <h3 className="text-xl font-medium text-slate-900 mb-3">{t(plan.title)}</h3>ame="h-10 bg-slate-200 rounded-xl w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>`;

const restoredPlansListReplacement = `                  <button 
                    onClick={() => setFloorFilter('2')}
                    className={\`w-full text-center px-1 py-2.5 rounded-lg text-sm transition-colors \${floorFilter === '2' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}\`}
                  >
                    {t('2 Floors')}
                  </button>
                  <button 
                    onClick={() => setFloorFilter('3')}
                    className={\`w-full text-center px-1 py-2.5 rounded-lg text-sm transition-colors \${floorFilter === '3' ? 'bg-primary text-white font-medium' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}\`}
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
              </div>`;

if (content.includes(corruptedPlansListSearch)) {
  content = content.replace(corruptedPlansListSearch, restoredPlansListReplacement);
  console.log("Successfully replaced corrupted PlansList block.");
} else {
  console.log("WARNING: Corrupted PlansList search block not found!");
}

// 2. Repair the corrupted Video Introduction Section (around lines 1357 to 1365)
const corruptedVideoSearch = `      {/* Video Introduction Section */}
      <section className={            <p className="text-white/90 text-lg leading-relaxed md:text-xl font-light drop-shadow-md" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.6)'}}>
              {t('ด้วยประสบการณ์ที่มีมากกว่า 15 ปี จึงทำให้ทางเราเล็งเห็นถึงความสำคัญของการควบคุมงบในการรับสร้างบ้าน ต่อเติม หรือปรับปรุงต่าง ๆ ของลูกค้าเป็นสำคัญ จึงทำให้เรามีความตั้งใจที่จะคุมงบให้ตรงตามที่ลูกค้าต้องการให้ได้มากที่สุด และแม่นยำ เพราะเราเป็นบริษัทรับสร้างบ้านมืออาชีพ ที่พร้อมสร้างสรรค์บ้าน in ฝันของคุณให้เป็นจริง ด้วยกระบวนการทำงานที่เข้าใจง่าย มั่นใจได้ในทุกขั้นตอน')}
            </p>b-1">
                <img src="/images/general/logo.jpg" alt="ST Construction Logo" className="h-20 w-auto object-contain mix-blend-multiply" />
              </div>`;

// Since there is a slight variation in exact strings, let's normalize searching for the corrupted section block
const corruptedVideoSearchNormalized = `      {/* Video Introduction Section */}
      <section className={            <p className="text-white/90 text-lg leading-relaxed md:text-xl font-light drop-shadow-md" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.6)'}}>
              {t('ด้วยประสบการณ์ที่มีมากกว่า 15 ปี จึงทำให้ทางเราเล็งเห็นถึงความสำคัญของการควบคุมงบในการรับสร้างบ้าน ต่อเติม หรือปรับปรุงต่าง ๆ ของลูกค้าเป็นสำคัญ จึงทำให้เรามีความตั้งใจที่จะคุมงบให้ตรงตามที่ลูกค้าต้องการให้ได้มากที่สุด และแม่นยำ เพราะเราเป็นบริษัทรับสร้างบ้านมืออาชีพ ที่พร้อมสร้างสรรค์บ้านในฝันของคุณให้เป็นจริง ด้วยกระบวนการทำงานที่เข้าใจง่าย มั่นใจได้ในทุกขั้นตอน')}
            </p>b-1">
                <img src="/images/general/logo.jpg" alt="ST Construction Logo" className="h-20 w-auto object-contain mix-blend-multiply" />
              </div>`;

const restoredVideoReplacement = `      {/* Video Introduction Section */}
      <section className={\`bg-white \${styles.sectionPadding}\`}>
        <div className={styles.paddingX}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl lg:max-w-lg w-full"
            >
              <div className="flex justify-center mb-1">
                <img src="/images/general/logo.jpg" alt="ST Construction Logo" className="h-20 w-auto object-contain mix-blend-multiply" />
              </div>`;

if (content.includes(corruptedVideoSearchNormalized)) {
  content = content.replace(corruptedVideoSearchNormalized, restoredVideoReplacement);
  console.log("Successfully replaced corrupted Video Introduction Section block.");
} else if (content.includes(corruptedVideoSearch)) {
  content = content.replace(corruptedVideoSearch, restoredVideoReplacement);
  console.log("Successfully replaced corrupted Video Introduction Section block (non-normalized).");
} else {
  // Let's use custom regex for the corrupted section classname text
  const videoRegex = /\{\/\* Video Introduction Section \*\/\}\s*<section className=\{.*?<img src="\/images\/general\/logo\.jpg" alt="ST Construction Logo" className="h-20 w-auto object-contain mix-blend-multiply" \/>\s*<\/div>/s;
  if (videoRegex.test(content)) {
    content = content.replace(videoRegex, restoredVideoReplacement);
    console.log("Successfully replaced corrupted Video Introduction Section via regex.");
  } else {
    console.log("WARNING: Corrupted Video search block not found!");
  }
}

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Pristine recovery patch executed!");
