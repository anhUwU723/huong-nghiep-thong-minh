import { db, universitiesTable, majorsTable, admissionScoresTable, forumPostsTable, forumRepliesTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(forumRepliesTable);
  await db.delete(forumPostsTable);
  await db.delete(admissionScoresTable);
  await db.delete(majorsTable);
  await db.delete(universitiesTable);

  const universities = await db.insert(universitiesTable).values([
    {
      name: "Đại học Bách Khoa Hà Nội",
      short_name: "HUST",
      region: "Miền Bắc",
      address: "1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
      website: "https://hust.edu.vn",
      tuition_min: "17000000",
      tuition_max: "25000000",
      type: "public",
      description: "Trường đại học kỹ thuật hàng đầu Việt Nam với lịch sử hơn 60 năm đào tạo.",
    },
    {
      name: "Đại học Quốc gia TP.HCM - Đại học Bách Khoa",
      short_name: "HCMUT",
      region: "Miền Nam",
      address: "268 Lý Thường Kiệt, Quận 10, TP.HCM",
      website: "https://hcmut.edu.vn",
      tuition_min: "15000000",
      tuition_max: "22000000",
      type: "public",
      description: "Trường kỹ thuật hàng đầu phía Nam, nơi đào tạo kỹ sư công nghệ chất lượng cao.",
    },
    {
      name: "Đại học Kinh tế Quốc dân",
      short_name: "NEU",
      region: "Miền Bắc",
      address: "207 Giải Phóng, Đống Đa, Hà Nội",
      website: "https://neu.edu.vn",
      tuition_min: "12000000",
      tuition_max: "18000000",
      type: "public",
      description: "Trung tâm đào tạo kinh tế và quản lý hàng đầu tại Việt Nam.",
    },
    {
      name: "Đại học Ngoại thương",
      short_name: "FTU",
      region: "Miền Bắc",
      address: "91 Chùa Láng, Đống Đa, Hà Nội",
      website: "https://ftu.edu.vn",
      tuition_min: "15000000",
      tuition_max: "20000000",
      type: "public",
      description: "Chuyên đào tạo về kinh tế đối ngoại, ngoại thương và quan hệ quốc tế.",
    },
    {
      name: "Đại học Y Hà Nội",
      short_name: "HMU",
      region: "Miền Bắc",
      address: "1 Tôn Thất Tùng, Đống Đa, Hà Nội",
      website: "https://hmu.edu.vn",
      tuition_min: "14400000",
      tuition_max: "14400000",
      type: "public",
      description: "Trường y khoa uy tín hàng đầu Việt Nam với hơn 100 năm đào tạo.",
    },
    {
      name: "Đại học FPT",
      short_name: "FPT Uni",
      region: "Miền Bắc",
      address: "Khu Công nghệ cao Hòa Lạc, Hà Nội",
      website: "https://fpt.edu.vn",
      tuition_min: "26000000",
      tuition_max: "35000000",
      type: "private",
      description: "Trường đại học tư thục định hướng công nghệ và doanh nghiệp toàn cầu.",
    },
    {
      name: "Đại học RMIT Việt Nam",
      short_name: "RMIT VN",
      region: "Miền Nam",
      address: "702 Nguyễn Văn Linh, Quận 7, TP.HCM",
      website: "https://rmit.edu.vn",
      tuition_min: "150000000",
      tuition_max: "250000000",
      type: "private",
      description: "Đại học quốc tế uy tín với chương trình đào tạo theo chuẩn Úc.",
    },
    {
      name: "Đại học Khoa học Tự nhiên - ĐHQG HCM",
      short_name: "HCMUS",
      region: "Miền Nam",
      address: "227 Nguyễn Văn Cừ, Quận 5, TP.HCM",
      website: "https://hcmus.edu.vn",
      tuition_min: "12000000",
      tuition_max: "18000000",
      type: "public",
      description: "Đào tạo các ngành khoa học tự nhiên, công nghệ thông tin và môi trường.",
    },
    {
      name: "Đại học Đà Nẵng - Đại học Bách Khoa",
      short_name: "UD-DUT",
      region: "Miền Trung",
      address: "54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng",
      website: "https://dut.udn.vn",
      tuition_min: "13000000",
      tuition_max: "18000000",
      type: "public",
      description: "Trường kỹ thuật hàng đầu miền Trung, trực thuộc Đại học Đà Nẵng.",
    },
    {
      name: "Đại học Tôn Đức Thắng",
      short_name: "TDTU",
      region: "Miền Nam",
      address: "19 Nguyễn Hữu Thọ, Quận 7, TP.HCM",
      website: "https://tdtu.edu.vn",
      tuition_min: "14000000",
      tuition_max: "20000000",
      type: "public",
      description: "Đại học có chỉ số nghiên cứu khoa học cao, hướng tới chuẩn quốc tế.",
    },
  ]).returning();

  const majors = await db.insert(majorsTable).values([
    {
      name: "Công nghệ Thông tin",
      category: "Kỹ thuật - Công nghệ",
      exam_blocks: ["A00", "A01", "D01"],
      salary_range_min: "12000000",
      salary_range_max: "50000000",
      job_title: "Lập trình viên, Kỹ sư phần mềm, Data Scientist",
      description: "Ngành học về lập trình, phát triển phần mềm, trí tuệ nhân tạo và an toàn thông tin.",
      skills_needed: ["Tư duy logic", "Toán học", "Kiên nhẫn", "Học hỏi liên tục", "Làm việc nhóm"],
      career_paths: ["Lập trình viên Web/Mobile", "Kỹ sư AI/ML", "DevOps Engineer", "Chuyên gia An ninh mạng", "CTO"],
    },
    {
      name: "Quản trị Kinh doanh",
      category: "Kinh tế - Quản lý",
      exam_blocks: ["A00", "A01", "D01", "D07"],
      salary_range_min: "8000000",
      salary_range_max: "30000000",
      job_title: "Quản lý, Chuyên viên Marketing, Giám đốc kinh doanh",
      description: "Đào tạo kỹ năng quản lý doanh nghiệp, marketing, tài chính và chiến lược kinh doanh.",
      skills_needed: ["Giao tiếp", "Lãnh đạo", "Tư duy chiến lược", "Ngoại ngữ", "Phân tích dữ liệu"],
      career_paths: ["Trưởng phòng kinh doanh", "Chuyên gia marketing", "Tư vấn quản lý", "Entrepreneur", "CEO"],
    },
    {
      name: "Y khoa",
      category: "Sức khỏe - Y tế",
      exam_blocks: ["B00", "B08"],
      salary_range_min: "10000000",
      salary_range_max: "40000000",
      job_title: "Bác sĩ, Bác sĩ chuyên khoa",
      description: "Đào tạo bác sĩ đa khoa và chuyên khoa, cung cấp kiến thức y học toàn diện.",
      skills_needed: ["Kiên nhẫn", "Cẩn thận", "Chịu áp lực", "Đồng cảm", "Học thuộc"],
      career_paths: ["Bác sĩ đa khoa", "Bác sĩ chuyên khoa", "Giảng viên y khoa", "Nghiên cứu viên", "Giám đốc bệnh viện"],
    },
    {
      name: "Kỹ thuật Điện tử - Viễn thông",
      category: "Kỹ thuật - Công nghệ",
      exam_blocks: ["A00", "A01"],
      salary_range_min: "10000000",
      salary_range_max: "35000000",
      job_title: "Kỹ sư điện tử, Kỹ sư viễn thông",
      description: "Nghiên cứu và thiết kế các hệ thống điện tử, mạch tích hợp và hệ thống truyền thông.",
      skills_needed: ["Toán học", "Vật lý", "Tư duy kỹ thuật", "Lập trình nhúng", "Kiên trì"],
      career_paths: ["Kỹ sư thiết kế vi mạch", "Kỹ sư IoT", "Kỹ sư 5G/Viễn thông", "Kỹ sư tự động hóa"],
    },
    {
      name: "Ngôn ngữ Anh",
      category: "Ngôn ngữ - Xã hội",
      exam_blocks: ["D01", "D14", "D15"],
      salary_range_min: "7000000",
      salary_range_max: "25000000",
      job_title: "Phiên dịch, Giáo viên tiếng Anh, Biên dịch viên",
      description: "Đào tạo chuyên sâu tiếng Anh học thuật và ứng dụng trong kinh doanh, ngoại giao.",
      skills_needed: ["Ngôn ngữ học", "Văn hóa quốc tế", "Diễn đạt", "Nhạy bén với ngôn từ", "Tò mò"],
      career_paths: ["Phiên dịch viên", "Biên dịch viên", "Chuyên viên truyền thông quốc tế", "Giảng viên", "Content Creator"],
    },
    {
      name: "Kế toán",
      category: "Kinh tế - Quản lý",
      exam_blocks: ["A00", "A01", "D01", "D07"],
      salary_range_min: "7000000",
      salary_range_max: "25000000",
      job_title: "Kế toán viên, Kiểm toán viên, Giám đốc tài chính",
      description: "Đào tạo nghiệp vụ kế toán, kiểm toán, phân tích tài chính doanh nghiệp.",
      skills_needed: ["Toán học", "Cẩn thận", "Tỉ mỉ", "Trung thực", "Phần mềm kế toán"],
      career_paths: ["Kế toán viên", "Kiểm toán viên", "Kế toán trưởng", "Giám đốc tài chính (CFO)"],
    },
    {
      name: "Kiến trúc",
      category: "Kỹ thuật - Công nghệ",
      exam_blocks: ["V00", "H00"],
      salary_range_min: "8000000",
      salary_range_max: "30000000",
      job_title: "Kiến trúc sư, Nhà thiết kế nội thất",
      description: "Đào tạo thiết kế công trình dân dụng, quy hoạch đô thị và thiết kế nội thất.",
      skills_needed: ["Tư duy không gian", "Vẽ kỹ thuật", "Sáng tạo", "Phần mềm CAD/3D", "Giao tiếp"],
      career_paths: ["Kiến trúc sư công trình", "Nhà thiết kế nội thất", "Quy hoạch đô thị", "BIM Manager"],
    },
    {
      name: "Logistics và Quản lý chuỗi cung ứng",
      category: "Kinh tế - Quản lý",
      exam_blocks: ["A00", "A01", "D01"],
      salary_range_min: "9000000",
      salary_range_max: "30000000",
      job_title: "Chuyên viên logistics, Quản lý chuỗi cung ứng",
      description: "Quản lý dòng chảy hàng hóa, thông tin và tài chính từ nguồn đến người tiêu dùng.",
      skills_needed: ["Phân tích dữ liệu", "Tổ chức", "Ngoại ngữ", "Đàm phán", "Phần mềm ERP"],
      career_paths: ["Chuyên viên logistics", "Quản lý kho vận", "Giám đốc chuỗi cung ứng", "Tư vấn supply chain"],
    },
  ]).returning();

  const scoreData = [
    { uni: 0, major: 0, block: "A00", base: 27.5 },
    { uni: 0, major: 0, block: "A01", base: 27.0 },
    { uni: 0, major: 3, block: "A00", base: 25.5 },
    { uni: 1, major: 0, block: "A00", base: 26.5 },
    { uni: 1, major: 3, block: "A00", base: 24.5 },
    { uni: 2, major: 1, block: "A00", base: 24.0 },
    { uni: 2, major: 5, block: "A00", base: 23.5 },
    { uni: 2, major: 7, block: "A00", base: 22.5 },
    { uni: 3, major: 1, block: "D01", base: 25.5 },
    { uni: 3, major: 4, block: "D01", base: 26.0 },
    { uni: 3, major: 7, block: "A00", base: 24.0 },
    { uni: 4, major: 2, block: "B00", base: 28.0 },
    { uni: 5, major: 0, block: "A00", base: 23.0 },
    { uni: 5, major: 0, block: "A01", base: 22.5 },
    { uni: 7, major: 0, block: "A00", base: 24.0 },
    { uni: 8, major: 0, block: "A00", base: 23.5 },
    { uni: 8, major: 3, block: "A00", base: 22.0 },
    { uni: 9, major: 1, block: "A00", base: 23.5 },
    { uni: 9, major: 7, block: "A00", base: 22.0 },
  ];

  const admissionRows = [];
  for (const pair of scoreData) {
    for (let year = 2022; year <= 2024; year++) {
      const variation = (year - 2022) * 0.25;
      admissionRows.push({
        university_id: universities[pair.uni].id,
        major_id: majors[pair.major].id,
        exam_block: pair.block,
        year,
        score: String(Math.round((pair.base + variation) * 100) / 100),
        notes: `Điểm chuẩn năm ${year}`,
      });
    }
  }
  await db.insert(admissionScoresTable).values(admissionRows);

  const posts = await db.insert(forumPostsTable).values([
    {
      title: "Kinh nghiệm thi vào Bách Khoa Hà Nội - chia sẻ từ sinh viên năm 2",
      content: "Chào các bạn! Mình đã đỗ vào HUST ngành CNTT năm ngoái với 28.5 điểm khối A00. Muốn chia sẻ một số kinh nghiệm ôn thi và chọn trường cho các bạn 2k7. Quan trọng nhất là phải luyện đề thi thử thường xuyên và nắm vững kiến thức cơ bản.",
      author_name: "Nguyễn Minh Khoa",
      category: "Kinh nghiệm",
      reply_count: 2,
    },
    {
      title: "So sánh ngành Logistics giữa NEU và FTU - nên chọn trường nào?",
      content: "Mình đang phân vân giữa ngành Logistics của Kinh tế Quốc dân và Ngoại thương. Bạn nào đang học hoặc đã tốt nghiệp có thể cho mình biết điểm khác biệt không?",
      author_name: "Trần Thu Hà",
      category: "Hỏi đáp",
      reply_count: 1,
    },
    {
      title: "Học ngành Y khoa có thực sự khó như mọi người nói không?",
      content: "Mình rất muốn theo ngành Y nhưng nghe nhiều người nói học rất vất vả, 6 năm, sau đó còn nội trú... Ai có thể cho mình biết thực tế ra sao không ạ?",
      author_name: "Lê Thị Bích Ngọc",
      category: "Hỏi đáp",
      reply_count: 1,
    },
    {
      title: "CNTT ở FPT hay HUST - góc nhìn từ người đi làm 3 năm",
      content: "Mình học CNTT tại FPT, hiện đang làm việc ở một công ty startup. Nhiều bạn hỏi mình về sự khác biệt. Thật ra, cả hai đều tốt nhưng định hướng khác nhau. FPT chú trọng thực hành và doanh nghiệp, HUST chú trọng lý thuyết và nghiên cứu.",
      author_name: "Phạm Đức Huy",
      category: "Chia sẻ kinh nghiệm",
      reply_count: 0,
    },
    {
      title: "Điểm chuẩn 2024 ngành Quản trị kinh doanh tăng cao bất ngờ!",
      content: "Nhìn vào dữ liệu năm 2024, nhiều trường có điểm chuẩn QTKD tăng đáng kể. Mình đã tổng hợp lại để các bạn tham khảo khi dự báo điểm. Xu hướng ngành kinh doanh ngày càng được quan tâm nhiều hơn.",
      author_name: "Võ Thị Lan",
      category: "Thông tin tuyển sinh",
      reply_count: 0,
    },
  ]).returning();

  await db.insert(forumRepliesTable).values([
    {
      post_id: posts[0].id,
      content: "Cảm ơn bạn đã chia sẻ! Mình đang ôn thi và thấy bài này rất hữu ích. Bạn có thể nói thêm về cách ôn môn Toán không?",
      author_name: "Đinh Văn An",
    },
    {
      post_id: posts[0].id,
      content: "Mình cũng đỗ HUST năm nay. Thêm một tip nữa là các bạn nên luyện đề thi thử nhiều vào để quen dạng bài. Đặc biệt là phần Giải tích và Đại số tuyến tính.",
      author_name: "Hoàng Thị Mai",
    },
    {
      post_id: posts[1].id,
      content: "Mình đang học Logistics tại NEU năm 3. Theo mình thì NEU mạnh hơn về lý thuyết và nghiên cứu, còn FTU mạnh về thực hành quốc tế và cơ hội việc làm xuất nhập khẩu.",
      author_name: "Ngô Quang Vinh",
    },
    {
      post_id: posts[2].id,
      content: "Mình đang là sinh viên y năm 4. Thật ra khó nhưng rất đáng. Bạn cần có đam mê thực sự. Chương trình học rất nặng nhưng sau khi ra trường mức lương và sự tôn trọng xã hội rất cao.",
      author_name: "Bùi Thị Hương",
    },
  ]);

  console.log("Seeding complete!");
  console.log(`- ${universities.length} universities`);
  console.log(`- ${majors.length} majors`);
  console.log(`- ${admissionRows.length} admission scores`);
  console.log(`- ${posts.length} forum posts`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
