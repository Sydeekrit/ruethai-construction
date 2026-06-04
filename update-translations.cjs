const fs = require('fs');

const en = JSON.parse(fs.readFileSync('src/translations.json', 'utf8'));
const zh = JSON.parse(fs.readFileSync('src/translationsZh.json', 'utf8'));

const translations = {
  "รับสร้างบ้าน, รับออกแบบบ้าน, สร้างบ้านเชียงใหม่, สร้างบ้านลำพูน, สร้างบ้านลำปาง, สร้างบ้านเชียงราย, ขายทาวน์เฮ้าส์เชียงใหม่, ห้องแถวราคาถูก, รับสร้างบ้านเชียงใหม่, ทาวน์โฮมเชียงใหม่, บ้านราคาถูกเชียงใหม่, ฤทัยคอนสตรัคชั่น": {
    en: "Home Builder, Architectural Design, Build a House in Chiang Mai, Lamphun, Lampang, Chiang Rai, Townhouse for Sale Chiang Mai, Cheap Row House, Chiang Mai Home Builder, Townhome Chiang Mai, Cheap House Chiang Mai, Ruethai Construction",
    zh: "房屋建筑商，建筑设计，在清迈、南奔、南邦、清莱建房，清迈待售联排别墅，廉价排屋，清迈房屋建筑商，清迈联排别墅，清迈廉价房屋，Ruethai Construction"
  },
  "คือ ศูนย์ให้บริการงานออกแบบก่อสร้าง": {
    en: "is a one-stop service for architectural design and construction",
    zh: "是建筑设计和施工的一站式服务中心"
  },
  "รับสร้างบ้าน": {
    en: "Home Builder",
    zh: "建筑房屋"
  },
  "รับสร้างบ้านเชียงใหม่": {
    en: "Chiang Mai Home Builder",
    zh: "清迈房屋建筑商"
  },
  "และอสังหาฯ ในจังหวัดเชียงใหม่ เราให้บริการครบวงจร": {
    en: "and real estate in Chiang Mai province. We provide comprehensive services.",
    zh: "以及清迈府的房地产。我们提供全方位服务。"
  },
  "ทีมงานมืออาชีพ": {
    en: "Professional Team",
    zh: "专业团队"
  },
  "ควบคุมงานโดยวิศวกรและสถาปนิกที่มีประสบการณ์สูง": {
    en: "Supervised by highly experienced engineers and architects",
    zh: "由经验丰富的工程师和建筑师监督"
  },
  "วัสดุคุณภาพเยี่ยม": {
    en: "Premium Quality Materials",
    zh: "优质材料"
  },
  "เราคัดสรรวัสดุก่อสร้างที่ได้มาตรฐานและมีคุณภาพที่สุดสำหรับบ้านคุณ": {
    en: "We select the highest quality and standard construction materials for your home",
    zh: "我们为您精心挑选符合最高标准和质量的建筑材料"
  },
  "สร้างด้วยใจ": {
    en: "Built with Heart",
    zh: "用心建造"
  },
  "ดูแลทุกขั้นตอนเสมือนสร้างบ้านของเราเอง จริงใจและโปร่งใส": {
    en: "Care in every step as if building our own home. Sincere and transparent.",
    zh: "像建自己的房子一样关注每一步。真诚且透明。"
  },
  "คลิกเพื่อเล่นวิดีโอแนะนำ": {
    en: "Click to play the introductory video",
    zh: "点击播放介绍视频"
  },
  "ทัศนียภาพหน้าโครงการและตัวบ้านเด่นสง่า": {
    en: "Elegant architectural perspective of the project front and the house",
    zh: "项目前端及房屋的优雅建筑透视图"
  },
  "ห้องนั่งเล่นที่ออกแบบร่วมสมัยพร้อมผนังกระจกกว้างขวาง": {
    en: "Contemporary designed living room with spacious glass walls",
    zh: "现代设计的起居室，配有宽敞的玻璃墙"
  },
  "มุมรับประทานอาหารอบอุ่นเชื่อมโยงระหว่างโถงในบ้าน": {
    en: "Warm dining area connecting the indoor hall",
    zh: "温馨的用餐区，连接室内大厅"
  },
  "ห้องครัวสไตล์สแกนดิเนเวียน ดีไซน์มินิมอลโมเดิร์นอย่างสวยหรู": {
    en: "Scandinavian style kitchen with luxurious minimalist modern design",
    zh: "斯堪的纳维亚风格厨房，采用奢华的极简现代设计"
  },
  "ห้องนอนใหญ่พร้อมพื้นที่พักผ่อนที่กว้างขวางระดับสูงสุด": {
    en: "Master bedroom with spacious relaxation area at the highest level",
    zh: "主卧室设有最高标准的宽敞休闲区"
  },
  "ห้องน้ำตบแต่งสุดพิเศษพร้อมจัดโซนแห้ง-เปียกลงตัว": {
    en: "Specially decorated bathroom with perfect dry-wet zoning",
    zh: "特别装饰的浴室，完美的干湿分离分区"
  },
  "ห้องนอนสำรองสำหรับการทำงานหรือสมาชิกในครอบครัว": {
    en: "Spare bedroom for a home office or family members",
    zh: "备用卧室，适用于家庭办公或家庭成员"
  },
  "โถงบันไดและทางเชื่อมพื้นที่ใช้สอยชั้นสอง": {
    en: "Stair hall and connecting pathway to second floor living area",
    zh: "楼梯大厅及二楼生活区的连接通道"
  },
  "สวนขนาดย่อมสีเขียวเย็นตาด้านข้างเพื่อเติมพลังธรรมชาติ": {
    en: "Small, refreshing green side garden for natural energy",
    zh: "小型清新侧边花园，补充自然能量"
  },
  "1 นาที": { en: "1 minute", zh: "1 分钟" },
  "4 นาที": { en: "4 minutes", zh: "4 分钟" },
  "9 นาที": { en: "9 minutes", zh: "9 分钟" },
  "10 นาที": { en: "10 minutes", zh: "10 分钟" },
  "12 นาที": { en: "12 minutes", zh: "12 分钟" },
  "18 นาที": { en: "18 minutes", zh: "18 分钟" },
  "Showcase Page • โครงการนวัตกรรมร่วมสมัย": {
    en: "Showcase Page • Contemporary Innovation Project",
    zh: "展示页面 • 当代创新项目"
  },
  "ห้องนอนกว้างขวาง": {
    en: "Spacious Bedroom",
    zh: "宽敞的卧室"
  },
  "ระเบียงพักผ่อนอุ่นใจ": {
    en: "Comforting Relaxation Balcony",
    zh: "舒适的休闲阳台"
  },
  "กดขยายภาพ": {
    en: "Click to enlarge",
    zh: "点击放大"
  },
  "ขายที่ดิน": {
    en: "Land for Sale",
    zh: "土地出售"
  },
  "การติดต่อใหม่จากหน้าเว็บไซต์ ฤทัยคอนสตรัคชั่น": {
    en: "New Contact from Ruethai Construction Website",
    zh: "来自 Ruethai Construction 网站的新联系"
  },
  "ด้วยประสบการณ์ที่มีมากกว่า 15 ปี จึงทำให้ทางเราเล็งเห็นถึงความสำคัญของการควบคุมงบในการรับสร้างบ้าน ต่อเติม หรือปรับปรุงต่าง ๆ ของลูกค้าเป็นสำคัญ จึงทำให้เรามีความตั้งใจที่จะคุมงบให้ตรงตามที่ลูกค้าต้องการให้ได้มากที่สุด และแม่นยำ เพราะเราเป็นทีมรับสร้างบ้านมืออาชีพ ที่พร้อมสร้างสรรค์บ้านในฝันของคุณให้เป็นจริง ด้วยกระบวนการทำงานที่เข้าใจง่าย มั่นใจได้ในทุกขั้นตอน": {
    en: "With over 15 years of experience, we recognize the importance of budget control for our clients' home construction, extension, or renovation projects. This drives our dedication to managing budgets as accurately and closely to your requirements as possible. As an expert home-building team, we are ready to bring your dream home to life with a transparent working process you can trust at every step.",
    zh: "凭借超过15年的经验，我们深刻认识到控制客户在建房、扩建或翻新项目中的预算的重要性。因此，我们致力于尽可能准确地根据您的需求控制预算。作为专业的建房团队，我们随时准备通过您在每一步都能信任的清晰工作流程，将您的梦想家园变为现实。"
  },
  "ฤทัยคอนสตรัคชั่น ก่อตั้งขึ้นเมื่อปี พ.ศ. 2560 ด้วยความมุ่งมั่นที่จะเป็นทีมรับเหมาก่อสร้างที่ได้มาตรฐานสากล เราเริ่มต้นจากการรับงานออกแบบและต่อเติมขนาดเล็ก จนกระทั่งได้รับความไว้วางใจให้ก่อสร้างโครงการบ้านเดี่ยวและอาคารพาณิชย์ ด้วยประสบการณ์กว่าหลายปี เราจึงมีความเชี่ยวชาญทั้งด้านสถาปัตยกรรมและวิศวกรรมที่สามารถตอบสนองทุกความต้องการของลูกค้า ทำให้เราเติบโตอย่างมั่นคงและเป็นที่ยอมรับในแวดวงการก่อสร้าง": {
    en: "Ruethai Construction was founded in 2017 with a commitment to becoming a general contracting team that meets international standards. We started by handling small design and remodeling projects, eventually earning the trust to construct detached housing projects and commercial buildings. With years of experience, we possess the architectural and engineering expertise to fulfill every client's need, enabling us to grow steadily and earn recognition in the construction industry.",
    zh: "Ruethai Construction成立于2017年，致力于成为符合国际标准的总承包团队。我们从处理小型设计和改建项目开始，最终赢得了建造独立住宅项目和商业建筑的信任。凭借多年的经验，我们在建筑和工程方面都具备满足客户每一个需求的专业知识，这使我们能够稳步发展并获得建筑行业的认可。"
  },
  "อัตราค่าบริการเขียนแบบและงบงานก่อสร้าง - ฤทัยคอนสตรัคชั่น": {
    en: "Design Service Fees and Construction Budget - Ruethai Construction",
    zh: "设计服务费与建筑预算 - Ruethai Construction"
  },
  "รายละเอียดอัตราค่าบริการออกแบบสถาปัตยกรรม เขียนแบบโดยสถาวิชาชีพวิศวกร เริ่มต้น 300 บาท/ตร.ม. หรือ ร้อยละ 3 และค่าบริการก่อสร้างระดับมาตรฐานเริ่มต้น 12,500 บาท/ตร.ม. พร้อมรับประกันโครงสร้างยาวนานถึง 20 ปี": {
    en: "Details of architectural design service fees, drafted by professional engineers starting at 300 Baht/sq.m. or 3%, and standard-level construction services starting at 12,500 Baht/sq.m., complete with a structural warranty of up to 20 years",
    zh: "专业工程师起草的建筑设计服务费详情，起价300泰铢/平方米或3%，以及标准级建筑服务起价12,500泰铢/平方米，并提供长达20年的结构保修"
  },
  "อัตราค่าจ้าง, ราคาออกแบบบ้าน, ค่าก่อสร้าง ตารางเมตร, รับสร้างบ้าน, ฤทัยคอนสตรัคชั่น, ออกแบบบ้านหรู, รับประกันโครงสร้าง 20 ปี": {
    en: "Wage rate, house design price, construction cost per square meter, home builder, Ruethai construction, luxury home design, 20-year structural warranty",
    zh: "工资率，房屋设计价格，每平方米建筑成本，房屋建筑商，Ruethai construction，豪华住宅设计，20年结构保修"
  },
  "แบรนด์วัสดุก่อสร้างพรีเมียมที่เราเลือกใช้ในการสร้างบ้าน": {
    en: "Premium Construction Material Brands We Choose for Your Home",
    zh: "我们为您建房而选择的高端建筑材料品牌"
  },
  "ตรวจสอบรายการวัสดุเกรดพรีเมียมจากแบรนด์ชั้นนำ SCG, COTTO, TOA และอื่นๆ เพื่อให้คุณมั่นใจในความทนทานและความปลอดภัยระยะยาวของโครงสร้างบ้าน": {
    en: "Check out the list of premium grade materials from leading brands like SCG, COTTO, TOA, and more, giving you long-term confidence in the durability and safety of your home's structure",
    zh: "查看顶级品牌的优质建材列表，如SCG、COTTO、TOA等，让您对房屋结构的长期耐用性和安全性充满信心"
  },
  "วัสดุก่อสร้างเกรดพรีเมียม, มาตรฐานสร้างบ้าน, ฤทัยคอนสตรัคชั่น": {
    en: "Premium grade construction materials, home building standards, Ruethai Construction",
    zh: "高级建筑材料，建房标准，Ruethai Construction"
  },
  "ตร.ม.": { "en": "sq.m.", "zh": "平方米" },
  "บาท": { "en": "THB", "zh": "泰铢" },
  "เริ่ม": { "en": "Start", "zh": "开始" },
  "เสร็จสิ้น": { "en": "Finish", "zh": "完成" }
};

for (const [key, val] of Object.entries(translations)) {
  if (!en[key]) en[key] = val.en;
  if (!zh[key]) zh[key] = val.zh;
}

fs.writeFileSync('src/translations.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/translationsZh.json', JSON.stringify(zh, null, 2));

console.log('Translations updated!');
