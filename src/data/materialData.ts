export interface MaterialItem {
  name: string;
  desc: string;
}

export interface MaterialSection {
  category: string;
  subtitle?: string;
  items: MaterialItem[];
}

export const materialDataTh: MaterialSection[] = [
  {
    category: "งานโครงสร้าง",
    items: [
      { name: "คอนกรีตโครงสร้าง", desc: "ใช้คอนกรีต Mix สำหรับงานโครงสร้าง ค่าความแข็งแรง 240 KSC" },
      { name: "โครงสร้างทั่วไป", desc: "คอนกรีตเสริมเหล็ก โดยเหล็กเสริมคำนวณตามหลักวิศวกรรมโยธา" },
      { name: "โครงสร้างพื้นทั่วไป", desc: "ใช้พื้นสำเร็จรูปชนิดวางบนคาน บางส่วนใช้หล่อกับที่ ขึ้นอยู่กับการออกแบบของสถาปนิก" },
      { name: "โครงสร้างพื้นห้องน้ำ", desc: "ใช้คอนกรีตเสริมเหล็กหล่อในที่ ขนาดตามวิศวกรกำหนด" },
      { name: "ระเบียง", desc: "ใช้พื้นสำเร็จรูปชนิดวางบนคาน ขนาดตามวิศวกรกำหนด" },
      { name: "โครงสร้างพื้นหลังคาแหงน", desc: "ใช้คอนกรีตเสริมเหล็กหล่อในที่ ขนาดตามวิศวกรกำหนด" }
    ]
  },
  {
     category: "งานหลังคา",
     items: [
      { name: "อะเส/ดานหลังคา/โครงหลังคา", desc: "โครงเหล็กรูปพรรณตามแบบคำนวณวิศวกรรม พ่นกันสนิม 2 รอบ" },
      { name: "หลังคา", desc: "มุงด้วยกระเบื้องคอนกรีตซีแพคโมเนีย หรือเทียบเท่า สีแดงกุหลาบ, น้ำตาลโกเมน, สีอิฐอำไพ และสีเทานกพิราบ ราคาต่อแผ่นสุทธิไม่เกิน 13.00 บาท (เลือกสีภายหลัง)" },
      { name: "วัสดุป้องกันความร้อน", desc: "ใช้แผ่นฟอยล์สะท้อนความร้อนใต้หลังคาแบบ 6 ชั้น (ไม่รวมที่จอดรถและกันสาด)" },
      { name: "เชิงชาย", desc: "ใช้เชิงชายสำเร็จรูปคอนวูด 2in1 หรือ เทียบเท่า" }
     ]
  },
  {
     category: "งานกรุผนัง",
     items: [
      { name: "ผนังภายนอก - ผนังภายใน", desc: "ผนังภายนอกก่ออิฐมอญก้อนใหญ่ ฉาบเรียบทาสี" },
      { name: "ผนังห้องน้ำทั่วไป", desc: "ผนังก่ออิฐมอญครึ่งแผ่น กระเบื้องผนังปูชนฝ้า" }
     ]
  },
  {
     category: "งานฝ้าเพดาน",
     items: [
       { name: "เพดานภายในทั่วไป", desc: "ใช้แผ่นยิปซั่มบอร์ดหน้า 9 มม. ฉาบเรียบรอยต่อ โครงเคร่าเหล็กชุบสังกะสี (เฉพาะชั้นบนสุด)"},
       { name: "เพดานภายนอก (ชายคา)", desc: "ใช้ฝ้าแบบระบายอากาศ โครงเคร่าเหล็กชุบสังกะสี หรือเทียบเท่า"},
       { name: "ระเบียง/เฉลียง/โรงรถ", desc: "ใช้ฝ้าสมาร์ทบอร์ด โครงเคร่าโลหะชุบสังกะสี เบอร์ 26"},
       { name: "ห้องแม่บ้าน/ห้องเก็บของ", desc: "ตกแต่งเพดานคอนกรีตทาสี"},
       { name: "เพดานทางเดินภายนอก", desc: "ฝ้าคอนกรีตเปลือยเซาะร่องแผ่นพื้น ทาสีขาว"},
       { name: "เพดานภายในห้องน้ำ", desc: "ใช้แผ่นยิปซั่มบอร์ดหน้า 9 มม. (ชนิดกันชื้น) ฉาบเรียบรอยต่อ โครงเคร่าเหล็กชุบสังกะสี"}
     ]
  },
  {
      category: "งานบันได",
      items: [
          { name: "โครงสร้างบันได", desc: "โครงสร้างคอนกรีตเสริมเหล็ก ขนาดตามวิศวกรกำหนด" },
          { name: "ลูกนอน/พื้นชานพัก", desc: "ปูพื้นไม้เทียม หนา 0.35m พร้อมบัวเชิงผนังสำเร็จรูป ขนาด1/2\" x 4\"" },
          { name: "ลูกตั้ง", desc: "ฉาบเรียบทาสี" },
          { name: "ราวบันไดและเสา", desc: "โครงเหล็กทาสี ขนาดตามแบบ" },
          { name: "จมูกบันได", desc: "pvc สีตามกระเบื้องปูพื้น" },
          { name: "มือจับบันได/ระเบียง", desc: "ใช้ไม้เทียมสำเร็จรูป" },
          { name: "ราวระเบียง", desc: "โครงเหล็กทาสี ขนาดตามแบบ" }
      ]
  },
  {
      category: "งานหน้าต่าง",
      items: [
          { name: "หน้าต่างทั่วไป", desc: "หน้าต่างบานเลื่อน กระจกเขียวตัดแสง" },
          { name: "หน้าต่างห้องน้ำ", desc: "หน้าต่างบานกระทุ้ง กระจกฝ้า" },
          { name: "หน้าต่างบานเกร็ด (ถ้ามี)", desc: "กระจกเขียวตัดแสง" }
      ]
  },
  {
      category: "อุปกรณ์ประตู - หน้าต่าง",
      items: [
          { name: "ลูกบิดประตูทั่วไป", desc: "ลูกบิดประตู HAFELE รุ่น 911.64.221 สีทองแดง/รมดำ หรือเทียบเท่า ราคาไม่เกินชุดละ 300 บาท" },
          { name: "บานพับประตู-หน้าต่างทั่วไป", desc: "บานพับ YALE รุ่น H-A443P3 สีทองแดง/รมดำ หรือเทียบเท่า ราคาไม่เกินชุดละ 100 บาท" },
          { name: "บานเกล็ดอลูมิเนียมปรับมุม", desc: "ใช้เกล็ดอลูมิเนียมปรับมุมแบบมือหมุน ติดกระจกเขียวตัดแสง" }
      ]
  },
  {
      category: "งานทาสี",
      items: [
          { name: "สีทาผนังภายนอก", desc: "สี TOA 4 SEASON สำหรับทาภายนอก หรือ เทียบเท่า ทาสีรองพื้น 1 ครั้ง ทาสีจริงทับหน้า 2 ครั้ง" },
          { name: "สีทาผนังภายใน", desc: "สี TOA 4 SEASON สำหรับทาภายใน หรือ เทียบเท่า ทาสีรองพื้น 1 ครั้ง ทาสีจริงทับหน้า 2 ครั้ง" },
          { name: "สีทาบานประตู-หน้าต่างไม้", desc: "สีน้ำมัน TOA ทารองพื้นไม้หรือทาสีกันสนิม (ผิวเหล็ก) 1 ครั้ง ทาทับ 2 ครั้ง" },
          { name: "สีผิววงกบ/เหล็ก ทั่วไป", desc: "สีน้ำมัน TOA ทารองพื้นไม้หรือทาสีกันสนิม (ผิวเหล็ก) 1 ครั้ง ทาทับ 2 ครั้ง" },
          { name: "สีทาบัว", desc: "สีน้ำมัน ตัดขอบตีนผนังสูง 10 cm" },
          { name: "สีทาระแนงโชว์", desc: "สีน้ำของ TOA" }
      ]
  },
  {
      category: "งานสุขภัณฑ์",
      items: [
          { name: "โถส้วมซักโครก", desc: "ใช้ COTTO รุ่น EMMA C-1403 ชักโครกสองชิ้น 6 ลิตร สีขาว หรือเทียบเท่า ราคาไม่เกินชุดละ 3,000 บาท" },
          { name: "อ่างล้างหน้า", desc: "ใช้ COTTO รุ่น C-230 จัสมิน สีขาว หรือเทียบเท่า ชนิดแขวนผนัง ราคาไม่เกินชุดละ 1,000 บาท" },
          { name: "ที่ใส่สบู่", desc: "ใช้ COTTO รุ่น C-805 สีขาว หรือเทียบเท่า ราคาไม่เกินชุดละ 350 บาท" },
          { name: "ที่ใส่กระดาษชำระ", desc: "ใช้ COTTO รุ่น C-814 สีขาว หรือเทียบเท่า ราคาไม่เกินชุดละ 350 บาท" },
          { name: "กระจกเงา", desc: "ใช้ COTTO กระจกกลมเรียด เอ รุ่น MC-112#A ทรงสี่เหลี่ยม หรือเทียบเท่า ราคาไม่เกินชุดละ 1,300 บาท" },
          { name: "โถส้วม (ห้องแม่บ้าน)", desc: "ใช้ KARAT แบบนั่งราดน้ำ รุ่น K-2550 แซนซี่ (Salsi) สีขาว ขนาด 370 x 505 x 346 mm. จุดกึ่งกลางท่อน้ำทิ้งห่างจากผนัง 190 มม. พร้อมผารองนั่ง หรือเทียบเท่า ราคาไม่เกินชุดละ 800 บาท" },
          { name: "กระจกเงา พร้อมถาดวางของ (ห้องแม่บ้าน)", desc: "แบบกลม หรือ เหลี่ยม สีขาว (ราคาไม่เกิน 250 บาท)" },
          { name: "ราวแขวนผ้าเดี่ยว", desc: "ใช้ KARAT รุ่น K-17068X  ขนาด 765 x 115 x 125 mm. หรือเทียบเท่า ราคาไม่เกินชุดละ 400บาท" },
          { name: "ฝักบัวสายอ่อน", desc: "ใช้ KARAT รุ่น BA01-50 โครเมียมฝักบัวมือ,สาย,ขอแขวน หรือเทียบเท่า ราคาไม่เกินชุดละ 500 บาท" },
          { name: "สายฉีดชำระ", desc: "ใช้ KARAT สายฉีดชำระ,สายยาว120ซม.รุ่นBW01-32 สีขาวหรือเทียบเท่าราคาไม่เกินชุดละ 300 บาท" },
          { name: "ก๊อกน้ำ", desc: "AMERICAN STANDARD หรือเทียบเท่า ราคาไม่เกินชุดละ 300 บาท" },
          { name: "ตะแกรงกันกลิ่น", desc: "ใช้ COTTO ตะแกรงกันกลิ่น 3 นิ้ว CT - 640Z2 (HM) สแตนเลส ราคาไม่เกินชุดละ 300 บาท" },
          { name: "เคาน์เตอร์ห้องน้ำ/อ่างอาบน้ำ/ตู้อาบน้ำ", desc: "ไม่รวมราคาในงานก่อสร้าง" }
      ]
  },
  {
      category: "งานประตู",
      items: [
          { name: "ประตูทางเข้า,ประตูเฉลียง", desc: "ประตูบานเลื่อน กระจกเขียวตัดแสง" },
          { name: "ประตูภายใน(ทั่วไป),ประตูห้องนอน,ประตูเก็บของและประตูห้องครัว", desc: "ใช้บานประตูแบบ UPVC" },
          { name: "ประตูห้องแม่บ้านและประตูห้องน้ำแม่บ้าน", desc: "ใช้บานประตูแบบ UPVC" },
          { name: "ประตูห้องเก็บของใต้บันได (ถ้ามี)", desc: "ใช้บานประตูไม้เนื้อแข็ง หรือ เทียบเท่า ใช้สีสำหรับทาไม้โดยเฉพาะ (มีเกล็ดระบายอากาศ)" }
      ]
  },
  {
      category: "งานวงกบประตู - หน้าต่าง",
      items: [
          { name: "วงกบประตู - หน้าต่าง (ทั่วไป)", desc: "วงกบอลูมิเนียมเคลือบขาว" },
          { name: "วงกบประตูห้องน้ำ (ทั่วไป)", desc: "วงกบอลูมิเนียมเคลือบขาว" },
          { name: "วงกบหน้าต่างห้องน้ำ (ทั่วไป)", desc: "วงกบอลูมิเนียมเคลือบขาว" },
          { name: "วงกบประตูห้องน้ำคนใช้", desc: "วงกบอลูมิเนียมเคลือบขาว" }
      ]
  },
  {
      category: "งานพื้น 1",
      items: [
          { name: "พื้นชั้นล่างทั่วไป", desc: "ปูกระเบื้องแกรนิตโต้ หรือเทียบเท่า (ราคาวัสดุไม่เกิน 300 บาท/ตร.ม)พร้อมบัวเชิงผนังสำเร็จรูปขนาด1/2\" x 4\"" },
          { name: "พื้นชั้นบนทั่วไปและพื้นห้องนอนชั้นบน", desc: "ปูพื้นลามิเนตหนา 8 mm หรือกระเบื้องยางลายไม้ พร้อมบัวเชิงผนังสำเร็จรูปขนาด1/2\" x 4\" หรือ ผิวปูด้วยกระเบื้องแกรนิตโต้ หรือ เทียบเท่า สีเรียบ เกรดเอ ผลิตในประเทศ ราคาวัสดุไม่เกิน 300 บาท/ตร.ม" },
          { name: "พื้นห้องน้ำทั่วไปและพื้นห้องครัว", desc: "ปูพื้นด้วยกระเบื้องเคลือบขนาด 12\" x 12\" หรือเทียบเท่า ลายธรรมดา เกรดเอ ผลิตในประเทศ ราคาวัสดุไม่เกิน 250 บาท/ตร.ม" },
          { name: "พื้นระเบียง,เฉลียง", desc: "ปูพื้นด้วยกระเบื้องเคลือบขนาด 16\" x 16\" หรือเทียบเท่า ลายธรรมดา เกรดเอ ผลิตในประเทศ ราคาวัสดุไม่เกิน 250 บาท/ตร.ม" }
      ]
  },
  {
      category: "งานพื้น 2",
      items: [
          { name: "พื้นห้องแม่บ้าน(ถ้ามี),พื้นห้องเก็บของและพื้นห้องซักรีด", desc: "ปูพื้นด้วยกระเบื้องเคลือบขนาด 8\" x 8\" หรือเทียบเท่า สีพื้น เกรดเอ ผลิตในประเทศ ราคาวัสดุไม่เกิน 200 บาท/ตร.ม" },
          { name: "พื้นที่จอดรถ,พื้นโรงรถ", desc: "พื้นคอนกรีตหล่อในที่วางบนดิน ผิวหน้าซีเมนต์ขัดหยาบ" },
          { name: "พื้นซักล้าง", desc: "พื้นคอนกรีตหล่อในที่วางบนคานผิวหน้ากระเบื้องเคลือบขนาด 16\" x 16\" ราคาวัสดุไม่เกิน 200 บาท/ตร.ม" }
      ]
  },
  {
      category: "งานไฟฟ้า",
      subtitle: "ขนาดสายไฟฟ้าตามข้อกำหนดมาตรฐานของการไฟฟ้านครหลวงหรือการไฟฟ้าส่วนภูมิภาค",
      items: [
          { name: "สายเมนภายนอก", desc: "ใช้สายทองแดงหุ้มฉนวน P.V.C ชนิดสายเดี่ยว ต่อห่างจากชายคาถึงมิเตอร์ ให้ระยะความยาวสายไฟฟ้าไม่เกิน 20.00 เมตร" },
          { name: "สายไฟฟ้าภายใน", desc: "ใช้สายทองแดงหุ้มฉนวน P.V.C ชนิดสายเดี่ยว เดินสายร้อยในท่อ P.V.C ฝังในผนังและเดินบนฝ้า สายคู่เดินลอยติดผนังมาตรฐานการไฟฟ้า ปลั๊ก (2 x 2.5/1.5) แสงสว่าง (2 x 1.5) เครื่องปรับอากาศ (2 x 2.5/1.5)" },
          { name: "แผงควบคุมไฟฟ้า", desc: "ใช้ขนาด 15(45) แอมป์ 14 ช่อง ยี่ห้อ Schneider Square D หรือเทียบเท่า" },
          { name: "สวิทซ์แสงสว่าง", desc: "ชนิดฝังเรียบกำหนดให้ห้องละ 1 จุด (เฉพาะห้องนอนใหญ่ 2 จุด) ยี่ห้อ Bticino" },
          { name: "สวิทช์แอร์", desc: "เดินสาย VAF 2 x 2.5/1.5 เตรียมไว้สำหรับงานแอร์ห้องละ 1 จุด ยี่ห้อ Bticino" },
          { name: "ปลั๊กไฟฟ้า", desc: "ชนิดฝังเรียบกำหนดให้ห้องละ 2 จุด (ยกเว้นห้องเก็บของ/ห้องน้ำ/โถงชั้นล่าง-ชั้นบน) ยี่ห้อ Bticino" },
          { name: "ปลั๊กทีวี/โทรศัพท์", desc: "ชนิดฝังเรียบ สำหรับห้องโถงและห้องนอนใหญ่ อย่างละ 1 จุด ยี่ห้อ Bticino" },
          { name: "ดวงโคมไฟฟ้า", desc: "มาตรฐานทั่วไป (ไม่รวมที่เป็นโคมแชนเดอเลียร์)" }
      ]
  },
  {
      category: "งานประปา",
      subtitle: "ขนาดตามข้อกำหนดมาตรฐานของการประปานครหลวงหรือการประปาส่วนภูมิภาค",
      items: [
          { name: "ท่อเมนประปา", desc: "ท่อ PVC มอก. ขนาด 6 หุน ต่อจากอาคารถึงมิเตอร์ประปาระยะไม่เกิน 20.00 เมตร" },
          { name: "ท่อประปาน้ำดี", desc: "ท่อ PVC มอก. ขนาด 4 หุน" },
          { name: "ท่อน้ำทิ้ง", desc: "ท่อน้ำทิ้ง ใช้ท่อ PVC มอก. ขนาด 3 นิ้ว ท่อแยก 2 นิ้ว" },
          { name: "ท่อระบายอากาศ", desc: "ท่อ PVC มอก. ขนาด 1 นิ้ว" },
          { name: "ท่อน้ำทิ้งภายนอก/ท่อระบายน้ำ", desc: "ใช้ท่อซีเมนต์ใยหินขนาดเส้นผ่าศูนย์กลาง 8\" ต่อจากตัวอาคารลงบ่อพักสาธารณะระยะไม่เกิน 20.00 เมตร" },
          { name: "ถังบำบัด", desc: "ใช้ถังบำบัดสำเร็จรูป ขนาดตามแบบ (ฝังในดิน)" },
          { name: "บ่อพัก", desc: "บ่อพักน้ำ สำเร็จรูปขนาด 30 x 40 ซม. ทุกระยะ 6 เมตร และทุกมุมเลี้ยว" },
          { name: "ท่อน้ำเสีย", desc: "ท่อส้วม ใช้ท่อ PVC มอก. ขนาด 4 นิ้ว" }
      ]
  },
  {
      category: "รายการโปรโมชั่น",
      items: [
          { name: "งานออกแบบและเขียนแบบ", desc: "ฟรี 100% คิดจากมูลค่างานออกแบบและเขียนแบบก่อสร้าง (งานออกแบบคิดที่ 250/ตร.ม)(ในกรณีที่ลูกค้าทำการเซ็นสัญญาก่อสร้างบ้านอาคารและจ่ายค่ามัดจำตามที่ตกลงในสัญญาก่อสร้าง)" },
          { name: "งานขออนุญาตก่อสร้าง", desc: "ฟรี ดำเนินการขออนุญาตปลูกสร้าง (ในกรณีที่ลูกค้าทำการเซ็นสัญญาก่อสร้างและจ่ายค่ามัดจำตามที่ตกลงในสัญญาก่อสร้าง)" },
          { name: "งานยื่นขอไฟฟ้าและประปา (ถาวร)", desc: "ฟรี ดำเนินการขอไฟฟ้าและประปา(ถาวร) (ในกรณีที่ลูกค้าทำการเซ็นสัญญาก่อสร้างและจ่ายค่ามัดจำตามที่ตกลงในสัญญาก่อสร้าง) งานไฟฟ้าและงานประปา (ค่ามอเตอร์ไฟฟ้า,ค่าธรรมเนียมขอมิเตอร์ไฟฟ้าถาวร,ค่ามอเตอร์น้ำประปา,ค่าปั้มน้ำ,ถังเก็บน้ำและค่าธรรมเนียมขอมิเตอร์น้ำประปาถาวร ลูกค้าเป็นผู้ชำระ)" },
          { name: "งานเคาน์เตอร์ครัว", desc: "ฟรี (ในกรณีห้องครัวมีพื้นที่ใช้สอยไม่เกิน 12 ตารางเมตร)" },
          { name: "การป้องกันปลวก", desc: "ฟรี เดินท่อน้ำยาในคานใต้พื้นชั้นล่าง พร้อมอัดยาเคมี การรับประกันโดยบริษัทที่กำจัดปลวกโดยตรง" },
          { name: "การป้องกันความร้อน", desc: "ฟรี ฉนวนแบบฟอยล์สะท้อนความร้อนใต้หลังคา" },
          { name: "มุ้งลวดกันแมลง", desc: "ฟรี มุ้งลวดบานหน้าต่างและบานประตูทั้งหลัง" }
      ]
  },
  {
      category: "งานที่ไม่รวมในรายการ",
      items: [
          { name: "งานที่ไม่รวม", desc: "งานรั้ว,งานถนนและงานถมดิน ไม่รวมในงานก่อสร้างและงานระบบที่ไม่ได้อยู่ภายในตัวบ้าน/ตัวอาคาร เช่น งานเดินสายไฟนอกบ้าน เป็นต้น\nเครื่องใช้ไฟฟ้าทั้งหมด,งานเฟอร์นิเจอร์ยึดติดกับที่และลอยตัว" }
      ]
  },
  {
      category: "ขอบเขตของงานและการรับประกันผลงาน",
      items: [
          { name: "การเปลี่ยนแปลงวัสดุ", desc: "บริษัทฯขอสงวนสิทธิ์ในการเปลี่ยนแปลงรายการวัสดุบางรายการตามความเหมาะสม ที่มีคุณภาพและราคาเท่าเทียมกัน" },
          { name: "รับประกันงานออกแบบ", desc: "การรับประกันงานออกแบบ วัสดุอุปกรณ์ (ที่ทางบริษัทฯติดตั้ง) 1 ปี" },
          { name: "รับประกันโครงสร้าง", desc: "การรับประกันงานโครงสร้าง 10 ปี" },
          { name: "การยกเลิกรับประกัน", desc: "งานรับประกัน จะยกเลิกทันที เมื่อผู้ว่าจ้าง มีการต่อเติมหรือซ่อมแซม โดยไม่ได้รับอนุญาตจากทีมงานของผู้รับจ้างก่อน" }
      ]
  }
];

export const materialDataEn: MaterialSection[] = [
  {
    category: "Structural Works",
    items: [
      { name: "Structural Concrete", desc: "Ready-mixed concrete for structures with compressive strength of 240 KSC." },
      { name: "General Structure", desc: "Reinforced concrete designed and calculated by licensed civil engineers." },
      { name: "Standard Slab Structure", desc: "Precast slabs on beams, with specific cast-in-place slabs as designated by the architect." },
      { name: "Bathroom Slab Structure", desc: "Cast-in-place reinforced concrete slab designed by structural engineers for moisture protection." },
      { name: "Balcony", desc: "Precast slab on beams designed by structural engineers." },
      { name: "Lean-to Roof Slab Structure", desc: "Cast-in-place reinforced concrete slab specified by structural engineers." }
    ]
  },
  {
     category: "Roofing Works",
     items: [
      { name: "Roof Trusses & Framing", desc: "Structural steel framing calculated by engineers, protected with 2 coats of anti-rust paint." },
      { name: "Roof Tiles", desc: "Roofing with CPAC Monier concrete tiles or equivalent. Colors: Rose Red, Garnet Brown, Brick Red, or Pigeon Gray. Net budget up to 13.00 Baht per tile (color optional)." },
      { name: "Thermal Insulation", desc: "6-layer reflective thermal foil insulation installed under the roof (excluding parking and awnings)." },
      { name: "Fascia Board", desc: "Conwood 2in1 precast fascia board or equivalent." }
     ]
  },
  {
     category: "Wall Cladding & Masonry",
     items: [
      { name: "Exterior & Interior Walls", desc: "Exterior wall built with robust red bricks, smooth plastering and premium painting." },
      { name: "Bathroom Walls", desc: "Red brick wall construction with elegant ceramic wall tiles laid up to ceiling height." }
     ]
  },
  {
     category: "Ceiling Works",
     items: [
       { name: "General Interior Ceiling", desc: "9 mm gypsum board with seamless joint compound on galvanized steel frame (top floor only)." },
       { name: "Exterior Ceiling (Eaves)", desc: "Vented eave ceiling panels mounted on a galvanized steel framing system or equivalent." },
       { name: "Balcony / Veranda / Garage Ceilings", desc: "Smartboard ceiling on No. 26 galvanized metallic ceiling grid." },
       { name: "Maid's Room & Storage Room Ceilings", desc: "Painted concrete slab ceiling surface." },
       { name: "Exterior Walkway Ceiling", desc: "Exposed grooved concrete joint design ceiling, painted in crisp white." },
       { name: "Bathroom Ceilings", desc: "Moisture-resistant 9 mm gypsum board with seamless finishing on galvanized steel framing." }
     ]
  },
  {
      category: "Staircase Works",
      items: [
          { name: "Staircase Structure", desc: "Reinforced concrete staircase engineered for absolute structural integrity." },
          { name: "Treads & Landing", desc: "Finished with 35 mm synthetic solid wood panels complete with matching 1/2\" x 4\" skirting." },
          { name: "Stair Risers", desc: "Smooth plaster finish with premium coating." },
          { name: "Stair Handrails & Baluster Posts", desc: "Painted structural steel handrail framing per designed drawings." },
          { name: "Stair Nosing", desc: "Premium PVC nosing matching the floor tiles." },
          { name: "Handrail Grips", desc: "Constructed with premium synthetic wood." },
          { name: "Balcony Railings", desc: "Painted structural steel railing as detailed in drawings." }
      ]
  },
  {
      category: "Window Works",
      items: [
          { name: "General Windows", desc: "Sliding windows with premium light-filtering green-tinted glass." },
          { name: "Bathroom Windows", desc: "Awning/transom windows with frosted privacy glass." },
          { name: "Jalousie Windows (If any)", desc: "Green-tinted solar control glass panes." }
      ]
  },
  {
      category: "Door & Window Accessories",
      items: [
          { name: "General Door Knobs", desc: "HAFELE door locksets (Model 911.64.221) in Antique Bronze finish or equivalent. Allocated budget 300 Baht/set." },
          { name: "General Hinges", desc: "YALE hinges (Model H-A443P3) in Antique Bronze or equivalent. Budget 100 Baht/set." },
          { name: "Adjustable Aluminum Louver Handles", desc: "Manual wind-up adjustable aluminum louver handles with green-tinted glass." }
      ]
  },
  {
      category: "Painting Works",
      items: [
          { name: "Exterior Paints", desc: "Premium TOA 4 Seasons exterior paint or equivalent. Process includes 1 coat of primer followed by 2 coats of topcoat paint." },
          { name: "Interior Paints", desc: "TOA 4 Seasons interior coating or equivalent. Includes 1 priming coat and 2 standard topcoats." },
          { name: "Wood Door & Window Sealer", desc: "TOA oil gloss wood stain or metal primer, applying 1 seal undercoat and 2 finishing coats." },
          { name: "Frame & Steel Finishes", desc: "TOA anti-rust base paint with high gloss topcoats, applied 3 times overall." },
          { name: "Skirting Finishes", desc: "Protective border trim painting up to 10 cm height." },
          { name: "Exposed Slat Paint", desc: "Waterproof TOA acrylic color coating." }
      ]
  },
  {
      category: "Sanitary Fixtures",
      items: [
          { name: "Main Toilet Closet", desc: "COTTO (Model Emma C-1403) two-piece dual flush 6L water closet in premium white/equivalent (Budget up to 3000 THB)." },
          { name: "Lavatory Sink", desc: "COTTO (Model Jasmin C-230) wall-mounted porcelain sink in white or equivalent (Budget up to 1000 THB)." },
          { name: "Soap Dish Holder", desc: "COTTO recessed/wall soap holder in matching white ceramic (Budget 350 THB)." },
          { name: "Toilet Paper Holder", desc: "COTTO paper roll holder in matching white ceramic (Budget 350 THB)." },
          { name: "Vanity Mirror", desc: "COTTO (Model MC-112#A) premium grade polished floating mirror or equivalent (Budget 1300 THB)." },
          { name: "Maid's Bathroom Toilet", desc: "KARAT washdown gravity toilet closet (Model Salsi K-2550) or equivalent (Budget 800 THB)." },
          { name: "Maid's Mirror & Vanity Tray", desc: "Standard circular or rectangular bathroom mirror with white display tray (Budget 250 THB)." },
          { name: "Single Towel Bar", desc: "KARAT (Model K-17068X) solid metal towel bar or equivalent (Budget 400 THB)." },
          { name: "Hand Shower Kit", desc: "KARAT chrome finish multi-spray hand shower set (Budget 500 THB)." },
          { name: "Bidet Spray Kit", desc: "KARAT (Model BW01-32) hygienic bidet spray set in white or equivalent (Budget 300 THB)." },
          { name: "Faucets", desc: "AMERICAN STANDARD solid brass core faucet or equivalent (Budget 300 THB)." },
          { name: "Deodorant Floor Drain", desc: "COTTO 3-inch CT-640Z2 premium stainless steel anti-odor floor drain (Budget 300 THB)." },
          { name: "Vanity Counters & Baths", desc: "Excluded from standard construction contract prices." }
      ]
  },
  {
      category: "Door Works",
      items: [
          { name: "Main Entry & Terrace Doors", desc: "Heavy sliding doors featuring green light-reducing insulated safety glass." },
          { name: "Standard Interior Doors", desc: "Finished using water-resistant custom UPVC solid core panel door structures." },
          { name: "Maid room Wood veneer door system", desc: "Waterproof synthetic UPVC door with matching hardware." },
          { name: "Under-stair Storage Door", desc: "Made of solid timber with matching louvered vents for air flow, painted with wood sealers." }
      ]
  },
  {
      category: "Door & Window Frames",
      items: [
          { name: "Standard Metallic Frames", desc: "White powder-coated aluminum track systems." },
          { name: "Bathroom Door Frames", desc: "Powder-coated white aluminum framing." },
          { name: "Bathroom Window Framing", desc: "Powder-coated white aluminum window frames." },
          { name: "Maid's Toilet Frame", desc: "Rust-resistant aluminum framing." }
      ]
  },
  {
      category: "Flooring Works 1",
      items: [
          { name: "General Ground Floor Finish", desc: "Grand format nano-glass porcelain double-loaded Granito tiles (up to 300 Baht/sq.m) finished with 1/2\" x 4\" architectural skirting." },
          { name: "Upper Floors & Master Bedroom Flooring", desc: "High-density 8 mm laminate wood flooring or luxury wood SPC flooring with 1/2\" x 4\" detailing skirting (Budget up to 300 Baht/sq.m)." },
          { name: "Common Bathroom & Kitchen Floors", desc: "12\" x 12\" safe non-slip textured matching tiles. Budget limit 250 Baht/sq.m." },
          { name: "Balcony & Terrace Floors", desc: "Weather-resistant 16\" x 16\" exterior floor tiles (Grade-A locale manufacture). Material allocation up to 250 Baht/sq.m." }
      ]
  },
  {
      category: "Flooring Works 2",
      items: [
          { name: "Maid's Quarter & Laundry Ground Finish", desc: "Fitted with reliable 8\" x 8\" matte ceramic tiles or domestic equivalent. Standard allowance up to 200 Baht/sq.m." },
          { name: "Carports & Garage Ground slabs", desc: "Robust slab-on-ground reinforced concrete flooring with premium split-traction brushed slip finish." },
          { name: "Wet Laundry & Utility Yard Floors", desc: "Reinforced concrete slab-on-beam utility floor topped with premium matching tiles. Budget allowance up to 200 Baht/sq.m." }
      ]
  },
  {
      category: "Electrical Works",
      subtitle: "Wire sizing complies with Metropolitan Electricity Authority or Provincial Electricity Authority standards.",
      items: [
          { name: "Main Service Electrical Feeder Cables", desc: "Flame-retardant single-conductor copper cables with advanced PVC insulation, up to 20.0 meters." },
          { name: "Interior Power Sockets & Circuit Lines", desc: "Copper electrical wire concealed in heavy impact PVC pipes in walls and false ceiling zones conforming to national safety codes." },
          { name: "Circuit Breaker Consumer Unit", desc: "High-tier 15(45)A 14-pole circuit board Consumer Unit from Schneider Electric (Square D) or equivalent." },
          { name: "Ambient Light Controls & Wall Switches", desc: "Flush modern push switches matching the interior decoration by Bticino (1 per room, 2 for master suite)." },
          { name: "Air Conditioning Wall Switches & DPs", desc: "Dedicated lines utilizing certified VAF copper cable prepared with Bticino controls." },
          { name: "Safety Power Sockets", desc: "Bticino flush safety dual outlets. Formulated 2 per room (excluding utility/powder elements)." },
          { name: "TV & Data Connection Ports", desc: "Bticino architectural coaxial wall plates. Provided 1 each inside main parlor and master bedroom." },
          { name: "Lighting Fixtures", desc: "Standard built-in warm LED light points (excluding grand luxury pendant chandeliers)." }
      ]
  },
  {
      category: "Sanitary Plumbing",
      subtitle: "Pipe sizing complies with Metropolitan Waterworks Authority or Provincial Waterworks Authority standards.",
      items: [
          { name: "Main Water Infrastructure Feed Pipe", desc: "Certified high-pressure TIS standard PVC pipe (6-point sizing) linking building to meters up to 20.0m." },
          { name: "Interior Fresh Water Tubes", desc: "Premium TIS standard PVC pipe (4-point sizing)." },
          { name: "Gravity Drainage Pipes", desc: "Drainage networks using TIS standard PVC pipes. 3-inch main lines with 2-inch sub-networks." },
          { name: "Sewer Air Vent Stacks", desc: "1-inch TIS certified PVC venting pipes." },
          { name: "Storm Water Run-Off Culverts", desc: "Industrial grade 8-inch concrete culvert pipe directing storm water to local mains up to 20.0m." },
          { name: "Wastewater Digester Septic Tanks", desc: "Advanced commercial biodigester holding septic tank (concealed subterranean setup)." },
          { name: "Inline Drainage Catch Basins", desc: "Molded 30x40 cm inspection chambers installed every 6.0m and at every directional turn." },
          { name: "Interior Sewer Main Outlet Pipes", desc: "Heavy duty 4-inch TIS standard PVC sanitary sewer pipes." }
      ]
  },
  {
      category: "Promotional Items",
      items: [
          { name: "Exclusive Architectural Blueprints", desc: "100% Complimentary tailored construction drafting package (valued at 250 THB/sq.m) upon signing contract and down payment." },
          { name: "Official Municipal Approvals & Permitting", desc: "Complimentary filing & acquiring of official construction permissions from local authorities." },
          { name: "Permanent Utility Hookups Filing", desc: "Filing and registry service for electrical & clean water meters. (Installation/meter fees from utility companies to be settled by client)." },
          { name: "Premium Kitchen Countertops", desc: "Complimentary built-in kitchen island setups (applicable to kitchens up to 12.0 sq.m)." },
          { name: "Comprehensive Termite Slab Barriers", desc: "Complimentary subterranean chemical pipeline barrier system underneath structural ground beams, with written long-term specialist guarantee." },
          { name: "Anti-Heat Radiant Barriers", desc: "Complimentary multi-barrier heat mirror radiant foils positioned below ceiling framing." },
          { name: "Insect & Mosquito Screens", desc: "Complimentary high-grade insect screens fitted on all outward doors and windows." }
      ]
  },
  {
      category: "Scope Exclusions",
      items: [
          { name: "Scope Exclusions", desc: "Boundary fences, landscaping, road extensions, and off-grid site excavation. All standard electronics, appliances, bespoke custom drop-in joinery, and standalone loose furniture." }
      ]
  },
  {
      category: "Scope & Structural Warranties",
      items: [
          { name: "Custom Component Substitutions", desc: "The company preserves matching substitution options to match item availability from local suppliers at identical pricing level and grade-A quality." },
          { name: "Interior & Device Guarantee", desc: "1-year warranty coverage on general items and design systems implemented by our company." },
          { name: "Core Structural Lifetime Guarantees", desc: "10-year major structural safety and safety-load structural integrity guarantee on columns and beams." },
          { name: "Warranty Revocation T&C", desc: "Warranties on structural components hold void upon illegal or unauthorized alterations/modifications done by third-party teams without prior consent." }
      ]
  }
];

export const materialDataZh: MaterialSection[] = [
  {
    category: "结构工程",
    items: [
      { name: "结构混凝土", desc: "采用抗压强度为 240 KSC 的商品混凝土。" },
      { name: "一般结构", desc: "钢筋混凝土，钢筋由专业土木工程师设计与计算。" },
      { name: "标准楼板结构", desc: "梁上预制楼板，局部按建筑师设计要求采用现浇板。" },
      { name: "浴室楼板结构", desc: "现浇钢筋混凝土楼板，尺寸由结构工程师确定，具备优良防潮性能。" },
      { name: "阳台", desc: "梁上预制楼板，尺寸由结构工程师设计。" },
      { name: "单坡屋顶板结构", desc: "现浇钢筋混凝土屋盖，尺寸由结构工程师确定。" }
    ]
  },
  {
     category: "屋面工程",
     items: [
      { name: "屋面钢架与架梁", desc: "经工程计算的结构钢制框架，涂覆2遍防锈底漆。" },
      { name: "屋顶瓦片", desc: "采用 CPAC Monier 水泥瓦或同等材料，颜色可选：玫瑰红、石榴棕、红砖色或鸽灰色。每瓦净预算不超过13.00泰铢。" },
      { name: "隔热材料", desc: "屋面下加铺6层反光铝箔隔热板（不包括车库及雨蓬）。" },
      { name: "屋檐装饰板", desc: "采用 Conwood 2in1 预制屋檐装饰板或同等材料。" }
     ]
  },
  {
     category: "墙面工程",
     items: [
      { name: "内墙与外墙", desc: "外墙采用大红砖砌筑，平整抹灰并涂刷优质涂料。" },
      { name: "浴室墙面", desc: "红砖半砖墙，高品质墙面瓷砖铺贴至吊顶高度。" }
     ]
  },
  {
     category: "吊顶工程",
     items: [
       { name: "室内常规吊顶", desc: "顶部楼面采用9毫米纸面石膏板，接缝平整，镀锌轻钢龙骨支撑。" },
       { name: "室外吊顶（屋檐）", desc: "通风型屋檐吊顶，配镀锌钢架或同等构件。" },
       { name: "阳台、门廊与车库吊顶", desc: "防潮硅酸钙板，26号镀锌金属龙骨吊架。" },
       { name: "保姆专属房与储藏室吊顶", desc: "混凝土现浇楼面抹灰涂刷高档色漆。" },
       { name: "室外过道走廊天花", desc: "露骨凹槽现浇混凝土天花，粉刷高雅纯白乳胶漆。" },
       { name: "浴室内部吊顶", desc: "防潮型9毫米加厚石膏板，平整填缝处理，配轻钢镀锌龙骨支撑。" }
     ]
  },
  {
      category: "楼梯工程",
      items: [
          { name: "楼梯梁柱结构", desc: "现浇钢筋混凝土承重楼梯，尺寸由工程图纸严格确定。" },
          { name: "楼梯踏步与休息平台", desc: "铺设35毫米人造木质踏步板，配 1/2\" x 4\" 预制装饰踢脚线。" },
          { name: "踏步立板", desc: "平底抹灰粉刷高耐久耐脏油漆。" },
          { name: "楼梯扶手与栏杆柱", desc: "喷漆工艺金属扶手钢架，精细焊接组装。" },
          { name: "防滑楼梯鼻", desc: "防滑PVC阶鼻套，色彩系统与地砖完美呼应。" },
          { name: "扶手握把", desc: "手触面采用优质环保复合木纹材料。" },
          { name: "阳台防护栏杆", desc: "喷漆防锈钢架结构护栏，按深化设计图纸精确制作。" }
      ]
  },
  {
      category: "窗户工程",
      items: [
          { name: "标准住宅窗户", desc: "平开/推拉窗，配进口防辐射吸热淡绿隔热玻璃。" },
          { name: "浴室通风采光窗", desc: "吊挂上悬式排气气窗，配高隐私防透视磨砂玻璃。" },
          { name: "百叶排气通风窗", desc: "配淡绿防眩光吸热玻璃叶片。" }
      ]
  },
  {
      category: "门窗五金配件",
      items: [
          { name: "室内外门锁拉手", desc: "德国海福乐 HAFELE 锁具（型号 911.64.221），青古铜防旧红古铜抛光，预算 300 泰铢/套。" },
          { name: "门窗不锈钢承重合页", desc: "集成耶鲁 YALE 精密轴承合页（型号 H-A443P3），红古铜拉丝防锈，100 泰铢/套。" },
          { name: "可调角度铝合金百叶把手", desc: "高质铝合金旋转机械摇臂把手，配优质绿色吸热玻璃窗。" }
      ]
  },
  {
      category: "油漆图装工程",
      items: [
          { name: "外墙耐久氟碳漆", desc: "采用知名品牌 TOA 四季版（TOA 4 Seasons）专业外墙面漆，工序包含1遍封底防碱漆底漆，2遍面漆涂刷。" },
          { name: "内墙环保净味漆", desc: "采用环保净味 TOA 四季内墙乳胶漆，工序包含1遍抗碱底漆保护层，2遍面漆拉涂。" },
          { name: "木质门窗亮光色磨漆", desc: "采用 TOA 专用亮光调合漆，进行1次防锈封固、2次表面细化防护。" },
          { name: "五金件及管束喷漆", desc: "采用 TOA 改性防锈防腐保护漆，一底两面。" },
          { name: "脚线油漆工艺", desc: "采用耐磨油漆对底部 10 厘米墙脚边线进行精确放线裁切。" },
          { name: "装饰栅栏涂料", desc: "使用高效环保的 TOA 水性户外专用着色涂料。" }
      ]
  },
  {
      category: "卫浴陶瓷与洁具",
      items: [
          { name: "联体冲落式座便器", desc: "高端卫浴品牌 COTTO（型号 EMMA C-1403），时尚白双件冲水，预算 3,000 泰铢。" },
          { name: "挂墙式面盆", desc: "高端卫浴品牌 COTTO（型号 C-230 Jasmin），挂墙设计，预算 1,000 泰铢。" },
          { name: "不锈钢皂液器座", desc: "高端卫浴 COTTO 经典陶瓷壁挂皂盘，预算 350 泰铢。" },
          { name: "卷纸架", desc: "高端卫浴 COTTO 豪华陶瓷防尘防水卷纸盒，预算 350 泰铢。" },
          { name: "艺术卫浴镜", desc: "高端卫浴 COTTO 清晰浮法方型边饰浴室防雾镜，预算 1,300 泰铢。" },
          { name: "蹲坐两用马桶", desc: "高性价比洁具 KARAT 简易冲水便器（型号 K-2550 Salsi），预算 800 泰铢。" },
          { name: "保姆淋浴镜置物架", desc: "壁挂白色边框梳妆浴镜附高分子托盘，预算 250 泰铢。" },
          { name: "单提杆毛巾架", desc: "高质 KARAT 豪华款不锈钢单层毛巾架，预算 400 泰铢。" },
          { name: "软管手持花洒", desc: "优质防漏 KARAT 多功能抛光镀铬手持花洒，预算 500 泰铢。" },
          { name: "带软管冲淋面盆喷头", desc: "高密 KARAT 洁净强力加压洁身喷嘴，预算 300 泰铢。" },
          { name: "高档台盆龙头", desc: "美国著名品牌美标 AMERICAN STANDARD 卫浴冷热水龙头，预算 300 泰铢。" },
          { name: "高阶高水封防臭地漏", desc: "高端卫浴 COTTO 豪华全精铜防返溢、防臭地漏，预算 300 泰铢。" },
          { name: "艺术台面、按摩浴缸及整体浴室", desc: "此定制类洁具属于选配奢华硬装，不包含在基础造价。" }
      ]
  },
  {
      category: "门户系统",
      items: [
          { name: "主进户及观景露台大门", desc: "落地滑动推拉钢化玻璃门，镶嵌绿色高透环保隔热玻璃。" },
          { name: "大容量室内活动门套", desc: "精选隔音高密度复合 UPVC 环保门扇，永不变形抗污易洁。" },
          { name: "保姆房间及配套卫生间单开门", desc: "耐潮湿高性能防虫蛀 UPVC 平开门体。" },
          { name: "楼梯间密闭隐藏式储藏门", desc: "精制实木百叶通风窗框，搭配环保家具专属净味多色覆盖漆。" }
      ]
  },
  {
      category: "龙门大边围合门窗套",
      items: [
          { name: "常规内外合金套门窗边框", desc: "哑白静电粉末涂层、抗震超轻铝合金框体。" },
          { name: "浴室耐蚀平开气密门框", desc: "象牙白静电喷粉电泳加厚框料。" },
          { name: "防干裂抗冷桥窗衬", desc: "多型腔加厚粉体烤漆五金合围框。" },
          { name: "保姆卫浴框料", desc: "标准白色喷涂合金龙形框架。" }
      ]
  },
  {
      category: "主题精装地坪铺装（一）",
      items: [
          { name: "一层全屋及客厅主要地坪", desc: "铺设高硬度抗污微晶大理石瓷砖或等效大面玻化砖（预算单价300泰铢/米²以内），辅以 matching 烤漆踢脚大边套。" },
          { name: "二层起居室及豪华卧室地坪", desc: "铺贴进口 8d 压花 8 毫米隔音强化复合木复合地板或高抗划 SPC 锁扣石塑木纹板，配优雅防潮包边，预算300泰铢/米²。" },
          { name: "标准独立卫浴区及烹饪厨房地面", desc: "防潮速干型防滑炻质 12\" x 12\" 安全地砖（预算250泰铢/米²以内）。" },
          { name: "户外入户休息回廊与二层外悬景阳台", desc: "耐候抗紫外线 16\" x 16\" 户外亚光质感高防滑地砖，防滑等级R10，预算250泰铢/米²以内。" }
      ]
  },
  {
      category: "基础土木整备地坪（二）",
      items: [
          { name: "工作生活区、杂物间及多功能洗衣房", desc: "铺筑国产高等级 8\" x 8\" 耐磨防渗陶瓷地砖，预算200泰铢/米²以内。" },
          { name: "尊享室外宽幅双车位汽车泊座", desc: "现浇耐候级特厚平板防沉地坪，拉丝横扫质感，增加抗轮胎滑轨系数。" },
          { name: "后院采光遮雨半露天洗涤操作区域", desc: "双梁挑空受力硬化现浇平台，装饰 16\" x 16\" 级坚固抗污通体砖，预算200泰铢/米²。" }
      ]
  },
  {
      category: "全屋强电与照明系统",
      subtitle: "电线规格符合都会电力局（MEA）或地方电力局（PEA）的规定标准。",
      items: [
          { name: "室外引入户抗扰超导电力馈线", desc: "高阻燃单芯纯无氧铜芯低压单轨主馈电线，外覆加厚高密度聚氯乙烯绝缘，距离 20 米以内。" },
          { name: "隐蔽工程阻燃暗敷纯铜配线", desc: "高纯度阻燃纯铜电平线暗穿专用抗冲击 PVC 绝缘阻燃套管，隐蔽式走线。规格：插座、空调使用 (2 x 2.5/1.5)，灯具回路使用 (2 x 1.5)。" },
          { name: "智能多回路交流电源浪涌保护配电箱", desc: "采用国际一线品牌施耐德 (Schneider Square D) 15(45) 安培 14 回路高级过载漏电保护总柜。" },
          { name: "轻奢镜面触感一体式墙壁按键开关", desc: "采用意大利尊贵品牌 Bticino 钢琴按键纯平面超薄复位开关（普通居室配置1处，主卧配置2处双控开关）。" },
          { name: "强力大电感空气调节专用独立双极断路器", desc: "敷设专用高荷载 VAF 2 x 2.5/1.5 重型供电网铜缆，配意式 Bticino 阻燃绝缘空开保护罩。" },
          { name: "带安全防电触防护门多功能墙壁插座", desc: "配置意式 Bticino 安全防护插座，内置儿童防触电门，常规房均配置2处。" },
          { name: "超五类弱电网数据同轴网络融合面板", desc: "配置意式 Bticino 广电模拟数码同轴插座及五类网络插座，客厅、主卧备配置1套。" },
          { name: "灯具与氛围暖光点源", desc: "全屋高显指柔光节能埋深下照式 LED 筒灯（不含华丽复古大吊灯）。" }
      ]
  },
  {
      category: "集成多联气密上下给排水管网",
      subtitle: "管道规格符合都会自来水局（MWA）或地方自来水局（PWA）的规定标准。",
      items: [
          { name: "给水主管道", desc: "国家工业标准 TIS 认证高強度 PVC 6分高负压专用饮用水主管，长20米内。" },
          { name: "户内纯净卫浴清洁给水支管", desc: "选用 TIS 级国家防藻杀菌 4分 PVC 高纯冷热水支管。" },
          { name: "高效畅排自流阻力污水落水管道", desc: "国家标准 TIS 极 3英寸大管径抗震防塞 PVC 下水道重力总排管，支线2英寸。" },
          { name: "高空释压防臭返空排气垂直管", desc: "1英寸 TIS 标准防污气体回流排空引气管。" },
          { name: "室外防沉地表道路网落灰沙雨水明沟", desc: "大容量抗压 8 英寸水泥防沉淀主排蓄水管廊，连接城市公共路网接口20米以内。" },
          { name: "高效生化环保型智能化粪池", desc: "采用环保大吨位厌氧微动力生活污水生化玻璃纤维强化智能化粪池。" },
          { name: "全预装模块化高承重清淤溢水沙井汇", desc: "30 x 40 厘米全混凝土预制排水缓冲沉沙沙井，间距每6米及管线拐弯段精准配置。" },
          { name: "重力防粘滞粪便排污干管", desc: "高密加厚 4英寸 TIS 级卫生排污主排水 PVC 管，具有极高的重力自流清洗率。" }
      ]
  },
  {
      category: "奢华定制筑梦大礼包",
      items: [
          { name: "大开间及高净空整套全景深化施工图设计", desc: "首创100%全权设计费全免，价值约250泰铢/米²（在与本司达成最终施合约并落实预付款后生效）。" },
          { name: "政府工务机构报建及工程准建执照批文代办", desc: "为您全权代理政府规划部门、建设局及房管所的工程开工执照获取。" },
          { name: "永久性市政水电专户用表表位搭接", desc: "全免代理政府水电局开户报装手续费。注：（水电局官方收取的用电表卡及水表安装入网、增容费等行政规费由客户自行缴存）。" },
          { name: "典雅饰面大理石中式厨房岛台套件", desc: "免费奢华橱柜硬装柜体平台建设（限厨房有效建筑面积 12 平方米内）。" },
          { name: "建筑底板地基环流化学防白蚁消杀系统", desc: "地基梁槽底部全环绕高压白蚁防霉药剂预埋管网，由白蚁专业机构提供消杀承保文件。" },
          { name: "双面高反光热能反射箔", desc: "全面屋顶架梁底面高级防火超薄铝膜反射保温阻热阻燃片层。" },
          { name: "高密安全多道拉折式防护纱窗", desc: "提供与整体幕墙颜色一致的全套不锈钢防盗防虫纱护门网。" }
      ]
  },
  {
      category: "本基础造价不涵盖项",
      items: [
          { name: "本基础造价不涵盖项", desc: "围墙、专属景观铺装、主路延伸及土方大回填；室外远程供电入地工程等；全屋白色家电、壁挂大宗家电及一切可移动/定制软装家具、全屋高级软装饰。" }
      ]
  },
  {
      category: "施工管理规范与质保卡服务",
      items: [
          { name: "选配级材料等效替换规则", desc: "当源产物料断货时，本司保留依此设计标定，进行等价高密同等级或更高档次建材调整的主动权。" },
          { name: "奢华定制硬装及核心配电装配保修", desc: "由本司采买安装的全屋管线配件提供 1 年完整客户关怀承保。" },
          { name: "核心钢筋混凝土受力结构 10 载坚盾质保", desc: "整套地基、地圈梁、承重框架及楼板等重型剪流建筑钢混原件，享 10 年高阶质保。" },
          { name: "质保失效前置条例", desc: "客户绕过本司自行引进外部施工力量对原始受力面、墙体、屋面进行私改、砸墙扩充的，质保卡即刻失效。" }
      ]
  }
];

export const materialDataByLanguage: Record<string, MaterialSection[]> = {
  th: materialDataTh,
  en: materialDataEn,
  zh: materialDataZh
};
