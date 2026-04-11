import { db, universitiesTable, majorsTable, admissionScoresTable, eq } from "@workspace/db";

async function expand() {
  console.log("Expanding database with more universities and exam block coverage...");

  // ---- Check if we already expanded ----
  const existing = await db.select().from(universitiesTable).where(eq(universitiesTable.short_name, "CUL")).limit(1);
  if (existing.length > 0) {
    console.log("Expansion already applied — skipping.");
    process.exit(0);
  }

  // ---- New universities ----
  const newUniversities = await db.insert(universitiesTable).values([
    // Vĩnh Long
    {
      name: "Đại học Cửu Long",
      short_name: "CUL",
      region: "Đồng bằng SCL",
      address: "180 Cao Lãnh, Long Hồ, Vĩnh Long",
      website: "https://mku.edu.vn",
      tuition_min: "14000000", tuition_max: "20000000",
      type: "private",
      description: "Trường đại học tư thục đa ngành tại Vĩnh Long, đào tạo các ngành Kinh tế, Kỹ thuật, CNTT và Sư phạm cho sinh viên vùng ĐBSCL. Học phí hợp lý, môi trường thân thiện.",
    },
    {
      name: "Phân hiệu Đại học Bình Dương tại Vĩnh Long",
      short_name: "BDU-VL",
      region: "Đồng bằng SCL",
      address: "Số 7 Huỳnh Phan Hộ, Phường 2, Vĩnh Long",
      website: "https://bdu.edu.vn",
      tuition_min: "15000000", tuition_max: "22000000",
      type: "private",
      description: "Cơ sở đào tạo của Trường ĐH Bình Dương tại tỉnh Vĩnh Long với các ngành Kinh tế, Kế toán, CNTT và Luật. Phù hợp với học sinh khu vực ĐBSCL.",
    },
    {
      name: "Đại học Cần Thơ",
      short_name: "CTU",
      region: "Đồng bằng SCL",
      address: "Khu II, Đường 3/2, Ninh Kiều, Cần Thơ",
      website: "https://ctu.edu.vn",
      tuition_min: "13000000", tuition_max: "20000000",
      type: "public",
      description: "Đại học trọng điểm quốc gia vùng ĐBSCL, đào tạo đa ngành từ Nông nghiệp, Thủy sản, Y Dược đến Kỹ thuật và Kinh tế. Trung tâm đào tạo và nghiên cứu lớn nhất miền Tây.",
    },
    {
      name: "Đại học Trà Vinh",
      short_name: "TVU",
      region: "Đồng bằng SCL",
      address: "126 Nguyễn Thiện Thành, Trà Vinh",
      website: "https://tvu.edu.vn",
      tuition_min: "11000000", tuition_max: "17000000",
      type: "public",
      description: "Trường đại học công lập tại Trà Vinh phục vụ nhu cầu học tập của sinh viên khu vực ĐBSCL với nhiều ngành đào tạo từ Kỹ thuật, Kinh tế đến Ngôn ngữ Khmer.",
    },
    {
      name: "Đại học Kiến trúc Hà Nội",
      short_name: "HAU",
      region: "Miền Bắc",
      address: "Km 10, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội",
      website: "https://hau.edu.vn",
      tuition_min: "14000000", tuition_max: "20000000",
      type: "public",
      description: "Trường chuyên đào tạo Kiến trúc, Quy hoạch đô thị và Thiết kế nội thất hàng đầu Việt Nam với hơn 60 năm lịch sử. Sinh viên được thi theo khối V00 và H00.",
    },
    {
      name: "Đại học Kiến trúc TP.HCM",
      short_name: "UAH",
      region: "Miền Nam",
      address: "196 Pasteur, Quận 3, TP.HCM",
      website: "https://uah.edu.vn",
      tuition_min: "15000000", tuition_max: "22000000",
      type: "public",
      description: "Trường Kiến trúc hàng đầu phía Nam với các ngành Kiến trúc, Thiết kế nội thất và Quy hoạch vùng & đô thị. Xét tuyển theo khối V00, A00 và A01.",
    },
    {
      name: "Đại học Mỹ thuật Công nghiệp Hà Nội",
      short_name: "IUAD",
      region: "Miền Bắc",
      address: "360 La Thành, Đống Đa, Hà Nội",
      website: "https://mtcn.edu.vn",
      tuition_min: "13000000", tuition_max: "18000000",
      type: "public",
      description: "Chuyên đào tạo Thiết kế đồ họa, Thiết kế thời trang, Mỹ thuật ứng dụng và Thiết kế công nghiệp. Xét tuyển khối H00 và H01 với bài thi năng khiếu.",
    },
    {
      name: "Học viện Báo chí và Tuyên truyền",
      short_name: "AJC",
      region: "Miền Bắc",
      address: "36 Xuân Thủy, Cầu Giấy, Hà Nội",
      website: "https://ajc.edu.vn",
      tuition_min: "12000000", tuition_max: "16000000",
      type: "public",
      description: "Trường đào tạo Báo chí, Truyền thông, Quan hệ quốc tế và Xã hội học hàng đầu. Xét tuyển khối C00, D01 và D14. Điểm chuẩn cao, uy tín trong giới truyền thông.",
    },
    {
      name: "Đại học KHXH&NV Hà Nội (USSH)",
      short_name: "USSH-HN",
      region: "Miền Bắc",
      address: "336 Nguyễn Trãi, Thanh Xuân, Hà Nội",
      website: "https://ussh.vnu.edu.vn",
      tuition_min: "12000000", tuition_max: "16000000",
      type: "public",
      description: "Trường thuộc ĐHQG Hà Nội, chuyên đào tạo các ngành Nhân văn, Xã hội học, Lịch sử, Văn học, Ngôn ngữ học. Xét tuyển nhiều khối C00, D01, D14, D15.",
    },
    {
      name: "Đại học Hà Nội",
      short_name: "HANU",
      region: "Miền Bắc",
      address: "Km 9, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội",
      website: "https://hanu.vn",
      tuition_min: "14000000", tuition_max: "22000000",
      type: "public",
      description: "Chuyên đào tạo ngoại ngữ và dịch thuật (Anh, Pháp, Đức, Nhật, Hàn, Trung) kết hợp với các ngành Luật quốc tế và Quản trị kinh doanh quốc tế. Xét tuyển D01, D14, D15.",
    },
    {
      name: "Đại học KHXH&NV TP.HCM",
      short_name: "USSH-HCM",
      region: "Miền Nam",
      address: "10-12 Đinh Tiên Hoàng, Quận 1, TP.HCM",
      website: "https://hcmussh.edu.vn",
      tuition_min: "12000000", tuition_max: "16000000",
      type: "public",
      description: "Trường thuộc ĐHQG TP.HCM, đào tạo Ngôn ngữ học, Văn học, Lịch sử, Địa lý, Xã hội học. Xét tuyển khối C00, D01, D14, D15 với điểm chuẩn ổn định.",
    },
    {
      name: "Đại học Nông Lâm TP.HCM",
      short_name: "NLU",
      region: "Miền Nam",
      address: "Khu phố 6, Linh Trung, Thủ Đức, TP.HCM",
      website: "https://hcmuaf.edu.vn",
      tuition_min: "13000000", tuition_max: "18000000",
      type: "public",
      description: "Trường hàng đầu về Nông nghiệp, Thú y, Lâm nghiệp, Công nghệ thực phẩm và Môi trường. Xét tuyển nhiều khối: B00, B03, B08, A00, A02.",
    },
    {
      name: "Đại học Y Dược Cần Thơ",
      short_name: "CTU-MED",
      region: "Đồng bằng SCL",
      address: "179 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ",
      website: "https://ctump.edu.vn",
      tuition_min: "13200000", tuition_max: "18000000",
      type: "public",
      description: "Trường Y Dược duy nhất của vùng ĐBSCL, đào tạo bác sĩ, dược sĩ và các chuyên ngành y tế cho khu vực miền Tây Nam Bộ. Xét tuyển B00, B03, B08.",
    },
    {
      name: "Học viện Ngoại giao",
      short_name: "DAV",
      region: "Miền Bắc",
      address: "69 Chùa Láng, Đống Đa, Hà Nội",
      website: "https://dav.edu.vn",
      tuition_min: "15000000", tuition_max: "20000000",
      type: "public",
      description: "Đào tạo chuyên sâu về Quan hệ quốc tế, Ngoại giao, Luật quốc tế và Truyền thông quốc tế. Xét tuyển D01, D07, D14, D15 với điểm chuẩn cao.",
    },
    {
      name: "Đại học Văn Lang",
      short_name: "VLU",
      region: "Miền Nam",
      address: "69/68 Đặng Thùy Trâm, Bình Thạnh, TP.HCM",
      website: "https://vanlanguni.edu.vn",
      tuition_min: "30000000", tuition_max: "50000000",
      type: "private",
      description: "Đại học tư thục uy tín tại TP.HCM đào tạo Kiến trúc, Thiết kế nội thất, Mỹ thuật ứng dụng, Thời trang và CNTT. Xét tuyển V00, H00, A00, D01.",
    },
    {
      name: "Đại học Du lịch - Đại học Đà Nẵng",
      short_name: "UD-DHD",
      region: "Miền Trung",
      address: "Đại học Đà Nẵng, Ngũ Hành Sơn, Đà Nẵng",
      website: "https://duc.udn.vn",
      tuition_min: "13000000", tuition_max: "18000000",
      type: "public",
      description: "Chuyên đào tạo Du lịch, Khách sạn, Quản lý lữ hành và Ẩm thực. Xét tuyển D01, D10, C00 với cơ hội việc làm cao tại vùng du lịch miền Trung.",
    },
  ]).returning();

  console.log(`Added ${newUniversities.length} new universities.`);

  // ---- Get all majors IDs ----
  const allMajors = await db.select().from(majorsTable);
  const majorMap: Record<string, number> = {};
  for (const m of allMajors) {
    majorMap[m.name] = m.id;
  }

  const cntt = majorMap["Công nghệ Thông tin"];
  const kientruc = majorMap["Kiến trúc"];
  const qtkd = majorMap["Quản trị Kinh doanh"];
  const ketoan = majorMap["Kế toán"];
  const taichinhnganhhang = majorMap["Tài chính - Ngân hàng"];
  const logistics = majorMap["Logistics và Quản lý chuỗi cung ứng"];
  const ykhoa = majorMap["Y khoa"];
  const duochoc = majorMap["Dược học"];
  const dieudưỡng = majorMap["Điều dưỡng"];
  const ngonnguanh = majorMap["Ngôn ngữ Anh"];
  const luat = majorMap["Luật"];
  const thietkedohoa = majorMap["Thiết kế Đồ họa"];
  const baochi = majorMap["Báo chí - Truyền thông"];
  const cocKhi = majorMap["Kỹ thuật Cơ khí"];
  const suphamtoan = majorMap["Sư phạm Toán"];
  const xaydung = majorMap["Kỹ thuật Xây dựng"];

  // Map short_name -> id from newly inserted
  const uniMap: Record<string, number> = {};
  for (const u of newUniversities) {
    uniMap[u.short_name] = u.id;
  }

  type ScoreEntry = { university_id: number; major_id: number; exam_block: string; base: number };
  const newScores: ScoreEntry[] = [
    // Vĩnh Long / ĐBSCL - Đại học Cửu Long (CUL)
    ...(cntt ? [{ university_id: uniMap["CUL"], major_id: cntt, exam_block: "A00", base: 18.5 },
      { university_id: uniMap["CUL"], major_id: cntt, exam_block: "A01", base: 18.0 },
      { university_id: uniMap["CUL"], major_id: qtkd, exam_block: "A00", base: 17.5 },
      { university_id: uniMap["CUL"], major_id: qtkd, exam_block: "D01", base: 18.0 },
      { university_id: uniMap["CUL"], major_id: ketoan, exam_block: "A00", base: 17.0 },
      { university_id: uniMap["CUL"], major_id: ketoan, exam_block: "D01", base: 17.5 }] : []),
    // BDU-VL
    ...(cntt ? [{ university_id: uniMap["BDU-VL"], major_id: cntt, exam_block: "A00", base: 18.0 },
      { university_id: uniMap["BDU-VL"], major_id: qtkd, exam_block: "D01", base: 17.5 },
      { university_id: uniMap["BDU-VL"], major_id: ketoan, exam_block: "A00", base: 16.5 },
      { university_id: uniMap["BDU-VL"], major_id: luat, exam_block: "C00", base: 18.0 },
      { university_id: uniMap["BDU-VL"], major_id: luat, exam_block: "D01", base: 18.5 }] : []),
    // Đại học Cần Thơ (CTU)
    ...(cntt ? [
      { university_id: uniMap["CTU"], major_id: cntt, exam_block: "A00", base: 22.0 },
      { university_id: uniMap["CTU"], major_id: cntt, exam_block: "A01", base: 21.5 },
      { university_id: uniMap["CTU"], major_id: qtkd, exam_block: "A00", base: 21.0 },
      { university_id: uniMap["CTU"], major_id: qtkd, exam_block: "D01", base: 22.0 },
      { university_id: uniMap["CTU"], major_id: ketoan, exam_block: "A00", base: 21.5 },
      { university_id: uniMap["CTU"], major_id: dieudưỡng, exam_block: "B00", base: 20.0 },
      { university_id: uniMap["CTU"], major_id: dieudưỡng, exam_block: "B03", base: 19.5 },
      { university_id: uniMap["CTU"], major_id: duochoc, exam_block: "B00", base: 22.5 },
    ] : []),
    // Đại học Trà Vinh (TVU)
    ...(cntt ? [
      { university_id: uniMap["TVU"], major_id: cntt, exam_block: "A00", base: 19.0 },
      { university_id: uniMap["TVU"], major_id: qtkd, exam_block: "D01", base: 19.5 },
      { university_id: uniMap["TVU"], major_id: ngonnguanh, exam_block: "D01", base: 20.0 },
      { university_id: uniMap["TVU"], major_id: ngonnguanh, exam_block: "D15", base: 19.5 },
    ] : []),
    // Kiến trúc - V00, H00
    ...(kientruc ? [
      { university_id: uniMap["HAU"], major_id: kientruc, exam_block: "V00", base: 22.5 },
      { university_id: uniMap["HAU"], major_id: kientruc, exam_block: "H00", base: 22.0 },
      { university_id: uniMap["HAU"], major_id: kientruc, exam_block: "A00", base: 24.0 },
      { university_id: uniMap["UAH"], major_id: kientruc, exam_block: "V00", base: 21.5 },
      { university_id: uniMap["UAH"], major_id: kientruc, exam_block: "A00", base: 23.0 },
      { university_id: uniMap["UAH"], major_id: kientruc, exam_block: "A01", base: 22.5 },
      { university_id: uniMap["VLU"], major_id: kientruc, exam_block: "V00", base: 20.0 },
      { university_id: uniMap["VLU"], major_id: kientruc, exam_block: "H00", base: 20.5 },
    ] : []),
    // Thiết kế đồ họa - H00
    ...(thietkedohoa ? [
      { university_id: uniMap["IUAD"], major_id: thietkedohoa, exam_block: "H00", base: 20.5 },
      { university_id: uniMap["IUAD"], major_id: thietkedohoa, exam_block: "H01", base: 20.0 },
      { university_id: uniMap["VLU"], major_id: thietkedohoa, exam_block: "H00", base: 22.0 },
      { university_id: uniMap["VLU"], major_id: thietkedohoa, exam_block: "V00", base: 21.5 },
      { university_id: uniMap["VLU"], major_id: thietkedohoa, exam_block: "D01", base: 21.0 },
    ] : []),
    // Báo chí - C00, D14
    ...(baochi ? [
      { university_id: uniMap["AJC"], major_id: baochi, exam_block: "C00", base: 24.5 },
      { university_id: uniMap["AJC"], major_id: baochi, exam_block: "D01", base: 25.0 },
      { university_id: uniMap["AJC"], major_id: baochi, exam_block: "D14", base: 24.0 },
      { university_id: uniMap["USSH-HN"], major_id: baochi, exam_block: "C00", base: 23.5 },
      { university_id: uniMap["USSH-HN"], major_id: baochi, exam_block: "D14", base: 23.0 },
      { university_id: uniMap["USSH-HCM"], major_id: baochi, exam_block: "C00", base: 23.0 },
      { university_id: uniMap["USSH-HCM"], major_id: baochi, exam_block: "D14", base: 22.5 },
    ] : []),
    // Luật - C00, C01, D14
    ...(luat ? [
      { university_id: uniMap["USSH-HN"], major_id: luat, exam_block: "C00", base: 24.0 },
      { university_id: uniMap["USSH-HN"], major_id: luat, exam_block: "D14", base: 24.5 },
      { university_id: uniMap["USSH-HCM"], major_id: luat, exam_block: "C00", base: 23.5 },
      { university_id: uniMap["USSH-HCM"], major_id: luat, exam_block: "D01", base: 24.0 },
      { university_id: uniMap["DAV"], major_id: luat, exam_block: "D01", base: 25.5 },
      { university_id: uniMap["DAV"], major_id: luat, exam_block: "D14", base: 25.0 },
      { university_id: uniMap["DAV"], major_id: luat, exam_block: "D15", base: 24.5 },
    ] : []),
    // Ngôn ngữ Anh - D14, D15
    ...(ngonnguanh ? [
      { university_id: uniMap["HANU"], major_id: ngonnguanh, exam_block: "D01", base: 26.0 },
      { university_id: uniMap["HANU"], major_id: ngonnguanh, exam_block: "D14", base: 25.5 },
      { university_id: uniMap["HANU"], major_id: ngonnguanh, exam_block: "D15", base: 25.0 },
      { university_id: uniMap["USSH-HN"], major_id: ngonnguanh, exam_block: "D01", base: 24.0 },
      { university_id: uniMap["USSH-HN"], major_id: ngonnguanh, exam_block: "D14", base: 23.5 },
      { university_id: uniMap["USSH-HCM"], major_id: ngonnguanh, exam_block: "D01", base: 24.5 },
      { university_id: uniMap["USSH-HCM"], major_id: ngonnguanh, exam_block: "D15", base: 23.5 },
      { university_id: uniMap["DAV"], major_id: ngonnguanh, exam_block: "D14", base: 25.5 },
      { university_id: uniMap["DAV"], major_id: ngonnguanh, exam_block: "D15", base: 25.0 },
    ] : []),
    // Điều dưỡng - B03, B08
    ...(dieudưỡng ? [
      { university_id: uniMap["CTU-MED"], major_id: dieudưỡng, exam_block: "B00", base: 21.0 },
      { university_id: uniMap["CTU-MED"], major_id: dieudưỡng, exam_block: "B03", base: 20.0 },
      { university_id: uniMap["CTU-MED"], major_id: dieudưỡng, exam_block: "B08", base: 20.5 },
      { university_id: uniMap["NLU"], major_id: dieudưỡng, exam_block: "B00", base: 19.5 },
      { university_id: uniMap["NLU"], major_id: dieudưỡng, exam_block: "B03", base: 19.0 },
    ] : []),
    // Dược - B03
    ...(duochoc ? [
      { university_id: uniMap["CTU-MED"], major_id: duochoc, exam_block: "B00", base: 23.5 },
      { university_id: uniMap["CTU-MED"], major_id: duochoc, exam_block: "B03", base: 22.5 },
    ] : []),
    // QTKD - C04, D09, D10
    ...(qtkd ? [
      { university_id: uniMap["USSH-HN"], major_id: qtkd, exam_block: "C04", base: 22.0 },
      { university_id: uniMap["DAV"], major_id: qtkd, exam_block: "D09", base: 23.5 },
      { university_id: uniMap["UD-DHD"], major_id: qtkd, exam_block: "D10", base: 21.0 },
      { university_id: uniMap["UD-DHD"], major_id: qtkd, exam_block: "D01", base: 21.5 },
    ] : []),
    // Logistics - D09, D10
    ...(logistics ? [
      { university_id: uniMap["DAV"], major_id: logistics, exam_block: "D07", base: 23.0 },
      { university_id: uniMap["UD-DHD"], major_id: logistics, exam_block: "D10", base: 21.5 },
      { university_id: uniMap["UD-DHD"], major_id: logistics, exam_block: "D01", base: 22.0 },
    ] : []),
    // Y khoa - B03
    ...(ykhoa ? [
      { university_id: uniMap["CTU-MED"], major_id: ykhoa, exam_block: "B00", base: 26.0 },
      { university_id: uniMap["CTU-MED"], major_id: ykhoa, exam_block: "B03", base: 25.0 },
    ] : []),
    // Sư phạm Toán - D01
    ...(suphamtoan ? [
      { university_id: uniMap["CTU"], major_id: suphamtoan, exam_block: "A00", base: 20.5 },
      { university_id: uniMap["CTU"], major_id: suphamtoan, exam_block: "D01", base: 21.0 },
      { university_id: uniMap["TVU"], major_id: suphamtoan, exam_block: "A00", base: 19.0 },
    ] : []),
    // Nông Lâm - B00, B03, A02
    ...(duochoc ? [
      { university_id: uniMap["NLU"], major_id: duochoc, exam_block: "B00", base: 20.5 },
      { university_id: uniMap["NLU"], major_id: duochoc, exam_block: "B03", base: 19.5 },
      { university_id: uniMap["NLU"], major_id: duochoc, exam_block: "A02", base: 19.0 },
    ] : []),
    // Xây dựng - Cần Thơ
    ...(xaydung ? [
      { university_id: uniMap["CTU"], major_id: xaydung, exam_block: "A00", base: 21.0 },
      { university_id: uniMap["CTU"], major_id: xaydung, exam_block: "D07", base: 20.5 },
    ] : []),
    // Cơ khí - CTU
    ...(cocKhi ? [
      { university_id: uniMap["CTU"], major_id: cocKhi, exam_block: "A00", base: 20.5 },
      { university_id: uniMap["CTU"], major_id: cocKhi, exam_block: "A02", base: 20.0 },
    ] : []),
  ];

  // Build all rows with 3 years
  const scoreRows = [];
  for (const s of newScores) {
    if (!s.university_id || !s.major_id) continue;
    for (let year = 2022; year <= 2024; year++) {
      const variation = (year - 2022) * 0.25;
      scoreRows.push({
        university_id: s.university_id,
        major_id: s.major_id,
        exam_block: s.exam_block,
        year,
        score: String(Math.round((s.base + variation) * 100) / 100),
        notes: `Điểm chuẩn năm ${year}`,
      });
    }
  }

  if (scoreRows.length > 0) {
    await db.insert(admissionScoresTable).values(scoreRows);
  }

  console.log(`Added ${scoreRows.length} new admission scores.`);
  console.log("Expansion complete!");
  process.exit(0);
}

expand().catch((err) => {
  console.error("Expand failed:", err);
  process.exit(1);
});
