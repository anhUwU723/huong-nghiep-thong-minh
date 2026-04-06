import { db, universitiesTable, majorsTable, admissionScoresTable, forumPostsTable, forumRepliesTable } from "@workspace/db";

async function seed() {
  console.log("Seeding database...");

  await db.delete(forumRepliesTable);
  await db.delete(forumPostsTable);
  await db.delete(admissionScoresTable);
  await db.delete(majorsTable);
  await db.delete(universitiesTable);

  const universities = await db.insert(universitiesTable).values([
    // Miền Bắc - Công lập
    { name: "Đại học Bách Khoa Hà Nội", short_name: "HUST", region: "Miền Bắc", address: "1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội", website: "https://hust.edu.vn", tuition_min: "17000000", tuition_max: "25000000", type: "public", description: "Trường đại học kỹ thuật hàng đầu Việt Nam với hơn 60 năm đào tạo. Nổi tiếng với các ngành Kỹ thuật, CNTT, Điện tử - Viễn thông và Cơ khí." },
    { name: "Đại học Kinh tế Quốc dân", short_name: "NEU", region: "Miền Bắc", address: "207 Giải Phóng, Đống Đa, Hà Nội", website: "https://neu.edu.vn", tuition_min: "12000000", tuition_max: "18000000", type: "public", description: "Trung tâm đào tạo kinh tế và quản lý hàng đầu Việt Nam với nhiều ngành kinh tế, tài chính, ngân hàng chất lượng cao." },
    { name: "Đại học Ngoại thương", short_name: "FTU", region: "Miền Bắc", address: "91 Chùa Láng, Đống Đa, Hà Nội", website: "https://ftu.edu.vn", tuition_min: "15000000", tuition_max: "20000000", type: "public", description: "Chuyên đào tạo kinh tế đối ngoại, thương mại quốc tế, ngoại ngữ thương mại và quản trị kinh doanh quốc tế." },
    { name: "Đại học Y Hà Nội", short_name: "HMU", region: "Miền Bắc", address: "1 Tôn Thất Tùng, Đống Đa, Hà Nội", website: "https://hmu.edu.vn", tuition_min: "14400000", tuition_max: "14400000", type: "public", description: "Trường y khoa uy tín hàng đầu Việt Nam với hơn 100 năm lịch sử, đào tạo bác sĩ đa khoa, nha sĩ và dược sĩ." },
    { name: "Đại học Quốc gia Hà Nội - KHTN", short_name: "HUS", region: "Miền Bắc", address: "334 Nguyễn Trãi, Thanh Xuân, Hà Nội", website: "https://hus.vnu.edu.vn", tuition_min: "12000000", tuition_max: "17000000", type: "public", description: "Đào tạo các ngành khoa học tự nhiên, CNTT và khoa học môi trường thuộc ĐHQG Hà Nội." },
    { name: "Đại học FPT", short_name: "FPT Uni", region: "Miền Bắc", address: "Khu Công nghệ cao Hòa Lạc, Thạch Thất, Hà Nội", website: "https://fpt.edu.vn", tuition_min: "26000000", tuition_max: "35000000", type: "private", description: "Trường đại học tư thục định hướng công nghệ và doanh nghiệp, chú trọng tiếng Anh và thực tập tại doanh nghiệp toàn cầu." },
    { name: "Đại học Luật Hà Nội", short_name: "HLU", region: "Miền Bắc", address: "87 Nguyễn Chí Thanh, Đống Đa, Hà Nội", website: "https://hlu.edu.vn", tuition_min: "11000000", tuition_max: "14000000", type: "public", description: "Trường đào tạo luật hàng đầu Việt Nam với các chuyên ngành Luật Dân sự, Luật Kinh tế, Luật Quốc tế." },
    { name: "Học viện Tài chính", short_name: "AOF", region: "Miền Bắc", address: "Học viện Tài chính, Đức Thắng, Bắc Từ Liêm, Hà Nội", website: "https://hvtc.edu.vn", tuition_min: "13000000", tuition_max: "17000000", type: "public", description: "Chuyên đào tạo tài chính, ngân hàng, kế toán và kiểm toán chất lượng cao cho nền kinh tế quốc dân." },
    { name: "Đại học Xây dựng Hà Nội", short_name: "NUCE", region: "Miền Bắc", address: "55 Giải Phóng, Đống Đa, Hà Nội", website: "https://nuce.edu.vn", tuition_min: "13000000", tuition_max: "18000000", type: "public", description: "Đào tạo kỹ sư xây dựng, kiến trúc, môi trường và công nghệ thông tin chất lượng cao." },
    { name: "Đại học Giao thông Vận tải", short_name: "UTC", region: "Miền Bắc", address: "3 Cầu Giấy, Đống Đa, Hà Nội", website: "https://utc.edu.vn", tuition_min: "12000000", tuition_max: "16000000", type: "public", description: "Đào tạo kỹ sư trong lĩnh vực giao thông vận tải, xây dựng cầu đường và công nghệ ô tô." },
    // Miền Nam - Công lập
    { name: "Đại học Quốc gia TP.HCM - Bách Khoa", short_name: "HCMUT", region: "Miền Nam", address: "268 Lý Thường Kiệt, Quận 10, TP.HCM", website: "https://hcmut.edu.vn", tuition_min: "15000000", tuition_max: "22000000", type: "public", description: "Trường kỹ thuật hàng đầu phía Nam thuộc ĐHQG TP.HCM, đào tạo kỹ sư chất lượng cao cho thị trường trong nước và quốc tế." },
    { name: "Đại học Khoa học Tự nhiên - ĐHQG HCM", short_name: "HCMUS", region: "Miền Nam", address: "227 Nguyễn Văn Cừ, Quận 5, TP.HCM", website: "https://hcmus.edu.vn", tuition_min: "12000000", tuition_max: "18000000", type: "public", description: "Đào tạo các ngành khoa học tự nhiên, CNTT, toán học và khoa học môi trường thuộc ĐHQG TP.HCM." },
    { name: "Đại học Kinh tế TP.HCM", short_name: "UEH", region: "Miền Nam", address: "59C Nguyễn Đình Chiểu, Quận 3, TP.HCM", website: "https://ueh.edu.vn", tuition_min: "15000000", tuition_max: "22000000", type: "public", description: "Trường kinh tế hàng đầu phía Nam với đa dạng ngành kinh tế, quản trị kinh doanh và luật kinh tế." },
    { name: "Đại học Y Dược TP.HCM", short_name: "UMP", region: "Miền Nam", address: "217 Hồng Bàng, Quận 5, TP.HCM", website: "https://ump.edu.vn", tuition_min: "15600000", tuition_max: "23000000", type: "public", description: "Trường y dược uy tín nhất phía Nam, đào tạo bác sĩ, dược sĩ và kỹ thuật viên y tế chất lượng cao." },
    { name: "Đại học Tôn Đức Thắng", short_name: "TDTU", region: "Miền Nam", address: "19 Nguyễn Hữu Thọ, Quận 7, TP.HCM", website: "https://tdtu.edu.vn", tuition_min: "14000000", tuition_max: "20000000", type: "public", description: "Đại học có chỉ số nghiên cứu khoa học hàng đầu, hướng tới chuẩn đại học quốc tế 5 sao QS Stars." },
    { name: "Đại học RMIT Việt Nam", short_name: "RMIT VN", region: "Miền Nam", address: "702 Nguyễn Văn Linh, Quận 7, TP.HCM", website: "https://rmit.edu.vn", tuition_min: "150000000", tuition_max: "250000000", type: "private", description: "Đại học quốc tế thuộc hệ thống RMIT Úc, đào tạo hoàn toàn bằng tiếng Anh theo chuẩn quốc tế." },
    { name: "Đại học Ngoại thương - Cơ sở 2", short_name: "FTU2", region: "Miền Nam", address: "Linh Tây, Thủ Đức, TP.HCM", website: "https://ftu2.edu.vn", tuition_min: "15000000", tuition_max: "22000000", type: "public", description: "Cơ sở phía Nam của Đại học Ngoại thương, đào tạo kinh tế quốc tế và ngoại ngữ thương mại." },
    { name: "Đại học Sư phạm TP.HCM", short_name: "HCMUE", region: "Miền Nam", address: "280 An Dương Vương, Quận 5, TP.HCM", website: "https://hcmue.edu.vn", tuition_min: "10000000", tuition_max: "14000000", type: "public", description: "Trường đào tạo giáo viên hàng đầu phía Nam với nhiều ngành sư phạm và không sư phạm." },
    // Miền Trung
    { name: "Đại học Đà Nẵng - Bách Khoa", short_name: "UD-DUT", region: "Miền Trung", address: "54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng", website: "https://dut.udn.vn", tuition_min: "13000000", tuition_max: "18000000", type: "public", description: "Trường kỹ thuật hàng đầu miền Trung thuộc Đại học Đà Nẵng, đào tạo kỹ sư các ngành công nghệ hiện đại." },
    { name: "Đại học Huế - Y Dược", short_name: "HUE-MED", region: "Miền Trung", address: "6 Ngô Quyền, Thành phố Huế", website: "https://huemed-univ.edu.vn", tuition_min: "13200000", tuition_max: "19000000", type: "public", description: "Cơ sở đào tạo y dược lâu đời nhất miền Trung với hơn 50 năm lịch sử phát triển." },
    { name: "Đại học Kinh tế Đà Nẵng", short_name: "DUE", region: "Miền Trung", address: "71 Ngũ Hành Sơn, Đà Nẵng", website: "https://due.udn.vn", tuition_min: "12000000", tuition_max: "16000000", type: "public", description: "Đào tạo kinh tế, quản trị kinh doanh và kế toán cho khu vực miền Trung - Tây Nguyên." },
  ]).returning();

  const majors = await db.insert(majorsTable).values([
    // Kỹ thuật - Công nghệ
    {
      name: "Công nghệ Thông tin",
      category: "Kỹ thuật - Công nghệ",
      exam_blocks: ["A00", "A01", "D01", "D90", "A16"],
      salary_range_min: "12000000", salary_range_max: "60000000",
      job_title: "Lập trình viên, Kỹ sư phần mềm, AI/ML Engineer",
      description: "Ngành học về lập trình, phát triển phần mềm, trí tuệ nhân tạo, an toàn thông tin và điện toán đám mây. Đây là một trong những ngành có tốc độ tăng trưởng việc làm nhanh nhất hiện nay.",
      skills_needed: ["Tư duy logic", "Toán học", "Kiên nhẫn", "Học hỏi liên tục", "Làm việc nhóm", "Giải quyết vấn đề"],
      career_paths: ["Lập trình viên Web/Mobile", "Kỹ sư AI/Machine Learning", "DevOps/Cloud Engineer", "Chuyên gia An ninh mạng", "Data Engineer", "Technical Lead", "CTO"],
    },
    {
      name: "Kỹ thuật Điện tử - Viễn thông",
      category: "Kỹ thuật - Công nghệ",
      exam_blocks: ["A00", "A01", "A02"],
      salary_range_min: "10000000", salary_range_max: "40000000",
      job_title: "Kỹ sư điện tử, Kỹ sư viễn thông, Kỹ sư IoT",
      description: "Nghiên cứu và thiết kế các hệ thống điện tử, vi mạch tích hợp, mạng viễn thông và hệ thống IoT. Đặc biệt nhu cầu cao trong thời đại 5G và công nghệ số hóa.",
      skills_needed: ["Toán học", "Vật lý", "Tư duy kỹ thuật", "Lập trình nhúng", "Kiên trì", "Chú ý chi tiết"],
      career_paths: ["Kỹ sư thiết kế vi mạch", "Kỹ sư IoT/Embedded", "Kỹ sư 5G/Viễn thông", "Kỹ sư tự động hóa", "R&D Engineer"],
    },
    {
      name: "Kỹ thuật Cơ khí",
      category: "Kỹ thuật - Công nghệ",
      exam_blocks: ["A00", "A01", "A02", "D07"],
      salary_range_min: "9000000", salary_range_max: "35000000",
      job_title: "Kỹ sư cơ khí, Kỹ sư chế tạo máy, Kỹ sư tự động hóa",
      description: "Thiết kế, chế tạo và vận hành các hệ thống cơ khí, máy móc và thiết bị công nghiệp. Ứng dụng rộng rãi trong sản xuất, ô tô, hàng không và năng lượng.",
      skills_needed: ["Vật lý", "Toán học", "Tư duy không gian 3D", "Vẽ kỹ thuật", "CAD/CAM", "Kỹ năng thực hành"],
      career_paths: ["Kỹ sư thiết kế máy móc", "Kỹ sư sản xuất", "Kỹ sư ô tô", "Kỹ sư năng lượng", "Quản lý nhà máy"],
    },
    {
      name: "Kiến trúc",
      category: "Kỹ thuật - Công nghệ",
      exam_blocks: ["V00", "H00", "A00", "A01"],
      salary_range_min: "8000000", salary_range_max: "35000000",
      job_title: "Kiến trúc sư, Nhà thiết kế nội thất, Nhà quy hoạch đô thị",
      description: "Đào tạo thiết kế công trình dân dụng, quy hoạch đô thị và thiết kế nội thất. Kết hợp giữa nghệ thuật và kỹ thuật xây dựng.",
      skills_needed: ["Tư duy không gian", "Vẽ kỹ thuật", "Sáng tạo", "Phần mềm CAD/3D/Revit", "Giao tiếp", "Tỉ mỉ"],
      career_paths: ["Kiến trúc sư công trình", "Nhà thiết kế nội thất", "Quy hoạch đô thị", "BIM Manager", "Tư vấn thiết kế"],
    },
    {
      name: "Kỹ thuật Xây dựng",
      category: "Kỹ thuật - Công nghệ",
      exam_blocks: ["A00", "A01", "D07"],
      salary_range_min: "9000000", salary_range_max: "35000000",
      job_title: "Kỹ sư xây dựng, Kỹ sư kết cấu, Giám sát công trình",
      description: "Lập kế hoạch, thiết kế và giám sát các công trình xây dựng từ nhà ở đến cầu đường, nhà máy. Một trong những ngành nghề nền tảng cho phát triển đô thị.",
      skills_needed: ["Toán học", "Vật lý", "Tư duy không gian", "Vẽ kỹ thuật", "Phần mềm AutoCAD/SAP", "Làm việc ngoài trời"],
      career_paths: ["Kỹ sư kết cấu", "Kỹ sư cầu đường", "Giám sát thi công", "Tư vấn xây dựng", "Quản lý dự án"],
    },
    // Kinh tế - Quản lý
    {
      name: "Quản trị Kinh doanh",
      category: "Kinh tế - Quản lý",
      exam_blocks: ["A00", "A01", "D01", "D07", "C04"],
      salary_range_min: "8000000", salary_range_max: "40000000",
      job_title: "Quản lý, Chuyên viên Marketing, Giám đốc kinh doanh",
      description: "Đào tạo kỹ năng quản lý doanh nghiệp, marketing, tài chính và chiến lược kinh doanh. Phù hợp cho những ai muốn khởi nghiệp hoặc quản lý doanh nghiệp.",
      skills_needed: ["Giao tiếp", "Lãnh đạo", "Tư duy chiến lược", "Ngoại ngữ", "Phân tích dữ liệu", "Đàm phán"],
      career_paths: ["Trưởng phòng kinh doanh", "Chuyên gia marketing", "Tư vấn quản lý", "Giám đốc điều hành", "Entrepreneur/Startup Founder"],
    },
    {
      name: "Kế toán",
      category: "Kinh tế - Quản lý",
      exam_blocks: ["A00", "A01", "D01", "D07", "C14"],
      salary_range_min: "7000000", salary_range_max: "30000000",
      job_title: "Kế toán viên, Kiểm toán viên, Giám đốc tài chính",
      description: "Đào tạo nghiệp vụ kế toán, kiểm toán, phân tích tài chính doanh nghiệp và báo cáo tài chính theo chuẩn quốc tế.",
      skills_needed: ["Toán học", "Cẩn thận", "Tỉ mỉ", "Trung thực", "Phần mềm kế toán", "Phân tích số liệu"],
      career_paths: ["Kế toán viên", "Kiểm toán viên Big4", "Kế toán trưởng", "Kiểm soát nội bộ", "Giám đốc tài chính (CFO)"],
    },
    {
      name: "Tài chính - Ngân hàng",
      category: "Kinh tế - Quản lý",
      exam_blocks: ["A00", "A01", "D01", "D07"],
      salary_range_min: "9000000", salary_range_max: "45000000",
      job_title: "Chuyên viên ngân hàng, Phân tích tài chính, Trader",
      description: "Đào tạo về các công cụ tài chính, thị trường vốn, ngân hàng thương mại và đầu tư. Ngành học mở ra cơ hội tại các ngân hàng và tổ chức tài chính hàng đầu.",
      skills_needed: ["Toán học", "Phân tích số liệu", "Tư duy nhạy bén", "Ngoại ngữ", "Chịu áp lực cao"],
      career_paths: ["Chuyên viên ngân hàng", "Phân tích tài chính", "Quản lý quỹ đầu tư", "Môi giới chứng khoán", "Giám đốc tài chính"],
    },
    {
      name: "Logistics và Quản lý chuỗi cung ứng",
      category: "Kinh tế - Quản lý",
      exam_blocks: ["A00", "A01", "D01", "D07", "C04"],
      salary_range_min: "9000000", salary_range_max: "35000000",
      job_title: "Chuyên viên logistics, Quản lý chuỗi cung ứng, Xuất nhập khẩu",
      description: "Quản lý toàn bộ chuỗi cung ứng từ nhà sản xuất đến người tiêu dùng. Đặc biệt quan trọng với Việt Nam là trung tâm sản xuất và xuất khẩu lớn của Đông Nam Á.",
      skills_needed: ["Phân tích dữ liệu", "Tổ chức", "Ngoại ngữ", "Đàm phán", "Phần mềm ERP/SAP"],
      career_paths: ["Chuyên viên logistics", "Quản lý kho vận", "Chuyên viên xuất nhập khẩu", "Giám đốc chuỗi cung ứng", "Tư vấn supply chain"],
    },
    // Sức khỏe - Y tế
    {
      name: "Y khoa",
      category: "Sức khỏe - Y tế",
      exam_blocks: ["B00", "B08", "A00"],
      salary_range_min: "10000000", salary_range_max: "50000000",
      job_title: "Bác sĩ đa khoa, Bác sĩ chuyên khoa",
      description: "Đào tạo bác sĩ đa khoa và chuyên khoa trong 6 năm. Nghề y đòi hỏi sự cống hiến cao nhưng mang lại giá trị xã hội và thu nhập tốt sau khi tốt nghiệp.",
      skills_needed: ["Kiên nhẫn", "Cẩn thận", "Chịu áp lực", "Đồng cảm", "Học thuộc", "Kỹ năng giao tiếp"],
      career_paths: ["Bác sĩ đa khoa", "Bác sĩ chuyên khoa (Nội, Ngoại, Sản, Nhi)", "Giảng viên y khoa", "Nghiên cứu y học", "Giám đốc bệnh viện"],
    },
    {
      name: "Dược học",
      category: "Sức khỏe - Y tế",
      exam_blocks: ["B00", "B08", "A00", "D07"],
      salary_range_min: "8000000", salary_range_max: "30000000",
      job_title: "Dược sĩ, Nghiên cứu phát triển thuốc, Kiểm định dược phẩm",
      description: "Nghiên cứu về dược chất, sản xuất thuốc và tư vấn sử dụng thuốc an toàn. Nhu cầu cao trong lĩnh vực y tế và công nghiệp dược phẩm ngày càng phát triển.",
      skills_needed: ["Hóa học", "Sinh học", "Cẩn thận", "Tỉ mỉ", "Kiến thức y học", "Nghiên cứu"],
      career_paths: ["Dược sĩ bệnh viện", "Dược sĩ nhà thuốc", "Nghiên cứu phát triển thuốc", "Kiểm định chất lượng", "Trình dược viên"],
    },
    {
      name: "Điều dưỡng",
      category: "Sức khỏe - Y tế",
      exam_blocks: ["B00", "B03", "B08", "D08"],
      salary_range_min: "7000000", salary_range_max: "20000000",
      job_title: "Điều dưỡng viên, Y tá, Hộ sinh",
      description: "Chăm sóc trực tiếp cho bệnh nhân tại bệnh viện và cơ sở y tế. Nhu cầu nhân lực điều dưỡng rất cao, đặc biệt cơ hội xuất khẩu lao động sang Nhật, Đức, Mỹ.",
      skills_needed: ["Nhẫn nại", "Đồng cảm", "Kỹ năng thực hành", "Chịu áp lực", "Làm việc ca", "Giao tiếp tốt"],
      career_paths: ["Điều dưỡng tại bệnh viện", "Điều dưỡng tại gia", "Hộ sinh", "Xuất khẩu lao động y tế", "Quản lý điều dưỡng"],
    },
    // Ngôn ngữ - Xã hội
    {
      name: "Ngôn ngữ Anh",
      category: "Ngôn ngữ - Xã hội",
      exam_blocks: ["D01", "D14", "D15"],
      salary_range_min: "7000000", salary_range_max: "30000000",
      job_title: "Phiên dịch, Giáo viên tiếng Anh, Chuyên viên truyền thông quốc tế",
      description: "Đào tạo chuyên sâu tiếng Anh học thuật và ứng dụng trong kinh doanh, ngoại giao và truyền thông quốc tế. Mở ra nhiều cơ hội làm việc với doanh nghiệp nước ngoài.",
      skills_needed: ["Ngôn ngữ học", "Văn hóa quốc tế", "Diễn đạt tốt", "Nhạy bén với ngôn từ", "Đọc nhiều", "Tự học"],
      career_paths: ["Phiên dịch/Biên dịch viên", "Chuyên viên truyền thông quốc tế", "Giảng viên tiếng Anh", "Content Creator", "Đại sứ thương hiệu"],
    },
    {
      name: "Luật",
      category: "Ngôn ngữ - Xã hội",
      exam_blocks: ["C00", "C01", "D01", "D14"],
      salary_range_min: "8000000", salary_range_max: "50000000",
      job_title: "Luật sư, Thẩm phán, Công chứng viên, Chuyên viên pháp chế",
      description: "Đào tạo về hệ thống pháp luật Việt Nam và quốc tế. Nghề luật yêu cầu tư duy sắc bén, kỹ năng lập luận và kiến thức pháp luật rộng.",
      skills_needed: ["Đọc hiểu văn bản", "Tư duy logic", "Lập luận", "Diễn đạt", "Trí nhớ tốt", "Kiên nhẫn"],
      career_paths: ["Luật sư", "Thẩm phán", "Công tố viên", "Chuyên viên pháp chế công ty", "Công chứng viên", "Trọng tài thương mại"],
    },
    {
      name: "Sư phạm Toán",
      category: "Ngôn ngữ - Xã hội",
      exam_blocks: ["A00", "A01", "D01", "C14"],
      salary_range_min: "5000000", salary_range_max: "20000000",
      job_title: "Giáo viên Toán, Gia sư, Chuyên viên giáo dục",
      description: "Đào tạo giáo viên dạy Toán cấp THCS và THPT. Nghề giáo mang lại sự ổn định và cơ hội ảnh hưởng tích cực đến thế hệ trẻ.",
      skills_needed: ["Toán học", "Kiên nhẫn", "Diễn đạt rõ ràng", "Yêu trẻ em", "Sáng tạo bài giảng"],
      career_paths: ["Giáo viên THPT", "Giáo viên trung tâm gia sư", "Gia sư", "Chuyên viên phát triển chương trình", "Quản lý giáo dục"],
    },
    // Nghệ thuật - Thiết kế
    {
      name: "Thiết kế Đồ họa",
      category: "Nghệ thuật - Thiết kế",
      exam_blocks: ["H00", "H01", "V00", "D01"],
      salary_range_min: "8000000", salary_range_max: "35000000",
      job_title: "Nhà thiết kế đồ họa, UI/UX Designer, Art Director",
      description: "Sáng tạo hình ảnh, nhận diện thương hiệu và giao diện người dùng. Nhu cầu cao trong kỷ nguyên số hóa khi mọi doanh nghiệp đều cần bộ nhận diện thương hiệu.",
      skills_needed: ["Sáng tạo", "Phần mềm Photoshop/Illustrator/Figma", "Thẩm mỹ", "Tư duy trực quan", "Làm việc dưới áp lực"],
      career_paths: ["Graphic Designer", "UI/UX Designer", "Motion Designer", "Art Director", "Brand Identity Designer", "Freelancer"],
    },
    {
      name: "Báo chí - Truyền thông",
      category: "Nghệ thuật - Thiết kế",
      exam_blocks: ["C00", "D01", "D14"],
      salary_range_min: "7000000", salary_range_max: "25000000",
      job_title: "Phóng viên, Biên tập viên, Chuyên viên PR/Marketing",
      description: "Đào tạo kỹ năng viết báo, sản xuất nội dung truyền thông và quản lý truyền thông số. Cơ hội rộng trong kỷ nguyên mạng xã hội và báo điện tử.",
      skills_needed: ["Viết lách", "Nhạy cảm với thông tin", "Phỏng vấn", "Nhiếp ảnh/quay phim cơ bản", "Mạng xã hội"],
      career_paths: ["Phóng viên", "Biên tập viên", "Content Writer/Creator", "Social Media Manager", "Chuyên gia PR"],
    },
  ]).returning();

  // Admission scores: 3 years (2022, 2023, 2024) for many uni-major pairs
  type ScorePair = { uni: number; major: number; block: string; base: number };
  const scorePairs: ScorePair[] = [
    // HUST
    { uni: 0, major: 0, block: "A00", base: 27.5 }, { uni: 0, major: 0, block: "A01", base: 27.0 },
    { uni: 0, major: 1, block: "A00", base: 25.5 }, { uni: 0, major: 1, block: "A01", base: 25.0 },
    { uni: 0, major: 2, block: "A00", base: 23.5 }, { uni: 0, major: 4, block: "A00", base: 23.0 },
    { uni: 0, major: 3, block: "A00", base: 25.5 }, { uni: 0, major: 3, block: "V00", base: 25.0 },
    // NEU
    { uni: 1, major: 5, block: "A00", base: 24.0 }, { uni: 1, major: 5, block: "D01", base: 25.5 },
    { uni: 1, major: 6, block: "A00", base: 23.5 }, { uni: 1, major: 7, block: "A00", base: 24.5 },
    { uni: 1, major: 8, block: "A00", base: 22.5 }, { uni: 1, major: 8, block: "D01", base: 23.5 },
    // FTU
    { uni: 2, major: 5, block: "D01", base: 25.5 }, { uni: 2, major: 12, block: "D01", base: 26.0 },
    { uni: 2, major: 8, block: "D01", base: 25.0 }, { uni: 2, major: 8, block: "A00", base: 24.5 },
    // HMU
    { uni: 3, major: 9, block: "B00", base: 28.0 }, { uni: 3, major: 10, block: "B00", base: 26.5 },
    { uni: 3, major: 11, block: "B00", base: 22.0 },
    // HUS
    { uni: 4, major: 0, block: "A00", base: 25.0 }, { uni: 4, major: 0, block: "A01", base: 24.5 },
    // FPT
    { uni: 5, major: 0, block: "A00", base: 22.5 }, { uni: 5, major: 0, block: "A01", base: 22.0 },
    // HLU
    { uni: 6, major: 13, block: "C00", base: 24.0 }, { uni: 6, major: 13, block: "D01", base: 25.0 },
    // AOF
    { uni: 7, major: 7, block: "A00", base: 23.5 }, { uni: 7, major: 6, block: "A00", base: 24.0 },
    // NUCE
    { uni: 8, major: 4, block: "A00", base: 23.0 }, { uni: 8, major: 3, block: "A00", base: 24.5 },
    // UTC
    { uni: 9, major: 4, block: "A00", base: 22.0 }, { uni: 9, major: 2, block: "A00", base: 21.5 },
    // HCMUT
    { uni: 10, major: 0, block: "A00", base: 26.5 }, { uni: 10, major: 0, block: "A01", base: 26.0 },
    { uni: 10, major: 1, block: "A00", base: 24.5 }, { uni: 10, major: 2, block: "A00", base: 23.5 },
    // HCMUS
    { uni: 11, major: 0, block: "A00", base: 24.0 }, { uni: 11, major: 0, block: "A01", base: 23.5 },
    // UEH
    { uni: 12, major: 5, block: "A00", base: 25.0 }, { uni: 12, major: 7, block: "A00", base: 24.5 },
    { uni: 12, major: 8, block: "D01", base: 25.0 },
    // UMP
    { uni: 13, major: 9, block: "B00", base: 27.5 }, { uni: 13, major: 10, block: "B00", base: 26.0 },
    // TDTU
    { uni: 14, major: 5, block: "A00", base: 22.5 }, { uni: 14, major: 8, block: "A00", base: 22.0 },
    { uni: 14, major: 0, block: "A00", base: 22.5 },
    // FTU2
    { uni: 16, major: 5, block: "D01", base: 24.5 }, { uni: 16, major: 12, block: "D01", base: 25.0 },
    // HCMUE
    { uni: 17, major: 14, block: "A00", base: 20.5 }, { uni: 17, major: 14, block: "C00", base: 21.5 },
    // UD-DUT
    { uni: 18, major: 0, block: "A00", base: 23.5 }, { uni: 18, major: 2, block: "A00", base: 22.0 },
    // HUE-MED
    { uni: 19, major: 9, block: "B00", base: 26.5 }, { uni: 19, major: 10, block: "B00", base: 24.5 },
    // DUE
    { uni: 20, major: 5, block: "A00", base: 23.0 }, { uni: 20, major: 6, block: "A00", base: 22.5 },
  ];

  const admissionRows = [];
  for (const pair of scorePairs) {
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
      content: "Chào các bạn! Mình đã đỗ vào HUST ngành CNTT năm ngoái với 28.5 điểm khối A00. Muốn chia sẻ kinh nghiệm ôn thi cho các bạn 2k7. Điều quan trọng nhất là luyện đề thi thử, nắm vững kiến thức cơ bản và đặc biệt không học tủ. Chúc các bạn thi tốt!",
      author_name: "Nguyễn Minh Khoa",
      category: "Kinh nghiệm",
      reply_count: 3,
    },
    {
      title: "So sánh ngành Logistics giữa NEU và FTU - nên chọn trường nào?",
      content: "Mình đang phân vân giữa ngành Logistics của Kinh tế Quốc dân và Ngoại thương. Bạn nào đang học hoặc đã tốt nghiệp có thể cho mình biết điểm khác biệt không? Mình đặc biệt quan tâm đến cơ hội việc làm sau khi ra trường.",
      author_name: "Trần Thu Hà",
      category: "Hỏi đáp",
      reply_count: 2,
    },
    {
      title: "Học ngành Y khoa có thực sự khó như mọi người nói không?",
      content: "Mình rất muốn theo ngành Y nhưng nghe nhiều người nói học rất vất vả, 6 năm, sau đó còn nội trú 1-2 năm nữa. Thu nhập giai đoạn đầu cũng không cao. Ai có thể cho mình biết thực tế như thế nào không?",
      author_name: "Lê Thị Bích Ngọc",
      category: "Hỏi đáp",
      reply_count: 2,
    },
    {
      title: "CNTT ở FPT hay HUST - góc nhìn từ người đi làm 3 năm",
      content: "Mình học CNTT tại FPT, hiện đang làm tại một startup công nghệ. Nhiều bạn hỏi nên chọn FPT hay HUST. Thật ra cả hai đều tốt nhưng định hướng rất khác nhau. FPT chú trọng thực hành, tiếng Anh và đi làm sớm. HUST chú trọng lý thuyết, nghiên cứu và cơ sở kỹ thuật vững chắc hơn.",
      author_name: "Phạm Đức Huy",
      category: "Kinh nghiệm",
      reply_count: 0,
    },
    {
      title: "Điểm chuẩn 2024 ngành Quản trị kinh doanh tăng mạnh - nguyên nhân và xu hướng",
      content: "Nhìn vào dữ liệu năm 2024, nhiều trường có điểm chuẩn QTKD tăng đáng kể, đặc biệt ở các trường top. Mình đã phân tích và thấy xu hướng này có liên quan đến việc ngày càng nhiều học sinh muốn học kinh doanh để khởi nghiệp. Mình tổng hợp lại cho các bạn tham khảo.",
      author_name: "Võ Thị Lan",
      category: "Thông tin tuyển sinh",
      reply_count: 1,
    },
    {
      title: "Ngành Dược học ra trường làm gì, thu nhập như thế nào?",
      content: "Mình đang cân nhắc giữa ngành Dược và ngành Điều dưỡng. Ngành Dược học 5 năm, đầu ra có vẻ đa dạng hơn nhưng mình lo về thu nhập và cơ hội việc làm. Có bạn nào đang học hoặc đã ra trường ngành Dược chia sẻ giúp mình được không?",
      author_name: "Bùi Văn Toàn",
      category: "Hỏi đáp",
      reply_count: 1,
    },
    {
      title: "Thiết kế Đồ họa có cần học giỏi mỹ thuật từ nhỏ không?",
      content: "Mình rất thích thiết kế nhưng không học lớp năng khiếu từ nhỏ. Mình tự học Photoshop và Illustrator và đã làm được một số sản phẩm ổn. Liệu mình có cơ hội thi vào ngành Thiết kế đồ họa không? Cần chuẩn bị gì?",
      author_name: "Nguyễn Thị Hoa",
      category: "Hỏi đáp",
      reply_count: 1,
    },
    {
      title: "Review chi tiết môi trường học tập tại Đại học Ngoại thương",
      content: "Mình là sinh viên năm 3 FTU, muốn chia sẻ thực tế về môi trường học. FTU có điểm mạnh là sinh viên rất năng động, nhiều CLB và hoạt động ngoại khóa. Tuy nhiên lịch học dày và áp lực thi cử khá cao. Tiếng Anh là bắt buộc và rất quan trọng tại đây.",
      author_name: "Đoàn Thị Phương",
      category: "Chia sẻ kinh nghiệm",
      reply_count: 2,
    },
    {
      title: "Có nên học ngành Sư phạm Toán không - thực tế thu nhập như thế nào?",
      content: "Bố mẹ mình muốn mình học sư phạm vì ổn định, nhưng mình thấy lương giáo viên khá thấp so với các ngành khác. Tuy nhiên giáo viên được nghỉ hè dài, ít áp lực hơn doanh nghiệp. Ai có kinh nghiệm về nghề giáo chia sẻ với mình nhé?",
      author_name: "Trịnh Văn Đức",
      category: "Hỏi đáp",
      reply_count: 2,
    },
    {
      title: "Học ngành Luật - những điều cần biết trước khi đăng ký",
      content: "Nhiều bạn nghĩ học Luật ra là làm luật sư giàu có nhưng thực tế phức tạp hơn nhiều. Mình đang học Luật năm 4 và muốn chia sẻ: Luật rất rộng, bạn có thể làm pháp chế doanh nghiệp, tư vấn pháp luật, công chứng, hoặc kiểm sát viên. Thu nhập tốt nhưng đòi hỏi thời gian xây dựng uy tín.",
      author_name: "Lý Thị Minh",
      category: "Chia sẻ kinh nghiệm",
      reply_count: 1,
    },
    {
      title: "Tổng hợp điểm chuẩn ngành CNTT 2022-2024 các trường top",
      content: "Mình đã tổng hợp điểm chuẩn ngành Công nghệ thông tin của các trường hàng đầu qua 3 năm gần nhất. HUST luôn dẫn đầu với 27-28 điểm. HCMUT từ 26-27.5 điểm. Các trường tư như FPT thấp hơn, từ 22-23 điểm nhưng đầu ra thực hành rất tốt.",
      author_name: "Cao Minh Tuấn",
      category: "Thông tin tuyển sinh",
      reply_count: 2,
    },
    {
      title: "Kỹ thuật Cơ khí - ngành ít bạn trẻ chọn nhưng cơ hội việc làm cực tốt",
      content: "Mình thấy ngày càng ít bạn chọn ngành Cơ khí dù thực tế cơ hội việc làm rất rộng. Kỹ sư cơ khí làm trong nhà máy sản xuất, ô tô, hàng không, năng lượng tái tạo... Thu nhập từ 10-20 triệu và tăng nhanh sau 3-5 năm kinh nghiệm.",
      author_name: "Nguyễn Hữu Nghĩa",
      category: "Chia sẻ kinh nghiệm",
      reply_count: 0,
    },
    {
      title: "Kinh nghiệm thi khối B vào ngành Y - bí quyết học môn Sinh",
      content: "Mình vừa trúng tuyển Y Hà Nội với 29 điểm khối B00. Môn Sinh là môn mình lo nhất nhưng cuối cùng lại đạt 9.5. Bí quyết là học theo sơ đồ tư duy, hiểu bản chất thay vì học thuộc lòng, và luyện đề THPT QG thật nhiều.",
      author_name: "Phạm Thu Thủy",
      category: "Kinh nghiệm",
      reply_count: 3,
    },
    {
      title: "Ngành Báo chí - Truyền thông ở Hà Nội hay TP.HCM tốt hơn?",
      content: "Mình đang cân nhắc học Báo chí - Truyền thông. Ở Hà Nội có Học viện Báo chí, ở HCM có UEH và RMIT. Ai có kinh nghiệm về hai môi trường này cho mình biết sự khác biệt không? Đặc biệt về cơ hội thực tập và kết nối với ngành truyền thông.",
      author_name: "Hoàng Anh Tú",
      category: "Hỏi đáp",
      reply_count: 1,
    },
    {
      title: "Chia sẻ về học kỳ đầu tại HCMUT - Bách Khoa HCM",
      content: "Vừa kết thúc học kỳ 1 tại HCMUT ngành Kỹ thuật Điện tử. Thực sự rất khác so với cấp 3. Khối lượng bài tập nhiều, các môn kỹ thuật cơ sở như Giải tích, Vật lý, Lập trình rất nặng. Nhưng thầy cô nhiệt tình và bạn bè tuyệt vời. Cần tự học rất nhiều mới theo kịp.",
      author_name: "Vũ Đình Lâm",
      category: "Chia sẻ kinh nghiệm",
      reply_count: 2,
    },
  ]).returning();

  await db.insert(forumRepliesTable).values([
    { post_id: posts[0].id, content: "Cảm ơn bạn đã chia sẻ! Bạn có thể nói thêm về cách ôn môn Toán không? Mình đang yếu phần Giải tích lắm.", author_name: "Đinh Văn An" },
    { post_id: posts[0].id, content: "Mình cũng đỗ HUST năm nay. Thêm một tip nữa là luyện đề thi thử nhiều vào để quen dạng bài. Đặc biệt là phần Giải tích và Đại số.", author_name: "Hoàng Thị Mai" },
    { post_id: posts[0].id, content: "Cho mình hỏi phần Hóa học có cần học sâu không? Mình thấy đề thi HUST thường hỏi những gì ạ?", author_name: "Đặng Thị Thu" },
    { post_id: posts[1].id, content: "Mình đang học Logistics tại NEU năm 3. NEU mạnh hơn về lý thuyết và nghiên cứu, còn FTU mạnh về thực hành quốc tế và cơ hội việc làm xuất nhập khẩu hơn.", author_name: "Ngô Quang Vinh" },
    { post_id: posts[1].id, content: "Theo mình FTU có lợi thế về tiếng Anh và mạng lưới cựu sinh viên trong lĩnh vực ngoại thương. Nếu bạn muốn làm việc với công ty nước ngoài thì FTU hơn.", author_name: "Đinh Thị Loan" },
    { post_id: posts[2].id, content: "Mình đang là sinh viên y năm 4. Thật ra khó nhưng rất đáng. Bạn cần có đam mê thực sự. Chương trình học rất nặng nhưng sau khi ra trường mức lương và sự tôn trọng của xã hội rất cao.", author_name: "Bùi Thị Hương" },
    { post_id: posts[2].id, content: "Bạn ơi, mình nghe nói bác sĩ nội trú lương chỉ vài triệu thôi đúng không? Đó là điểm mình e ngại nhất.", author_name: "Lê Minh Đức" },
    { post_id: posts[4].id, content: "Cảm ơn bạn đã tổng hợp. Mình cũng nhận thấy xu hướng startup ngày càng nhiều khiến ngành kinh doanh hot hơn.", author_name: "Hoàng Gia Bảo" },
    { post_id: posts[5].id, content: "Mình ra trường ngành Dược 2 năm trước. Thu nhập ban đầu khoảng 10-12 triệu, sau 3-4 năm có thể lên 18-25 triệu. Nếu làm trình dược viên có thể cao hơn nếu có hoa hồng.", author_name: "Trần Thị Lan" },
    { post_id: posts[6].id, content: "Bạn hoàn toàn có thể học Thiết kế đồ họa dù không học năng khiếu từ nhỏ. Quan trọng là portfolio của bạn. Hãy xây dựng portfolio đẹp để thi tuyển năng khiếu.", author_name: "Nguyễn Anh Khoa" },
    { post_id: posts[7].id, content: "Mình cũng đang học FTU và đồng ý với bạn. FTU rất năng động nhưng cần bạn chủ động tham gia các CLB và dự án để phát triển kỹ năng mềm.", author_name: "Phan Thị Hằng" },
    { post_id: posts[7].id, content: "Tiếng Anh ở FTU yêu cầu IELTS bao nhiêu để tốt nghiệp vậy bạn?", author_name: "Lê Quốc Bảo" },
    { post_id: posts[8].id, content: "Lương giáo viên hiện nay đã được cải thiện nhiều, đặc biệt từ 2023. Mình dạy THPT lương khoảng 8-10 triệu cộng thêm dạy thêm có thể 15-20 triệu/tháng. Không giàu nhưng đủ sống thoải mái.", author_name: "Thầy Minh Quang" },
    { post_id: posts[8].id, content: "Nghề giáo có hưởng lương hưu ổn định và không lo mất việc. Đây là điểm mạnh mà nhiều ngành khác không có.", author_name: "Cô Nguyễn Hà" },
    { post_id: posts[9].id, content: "Mình đồng ý với bạn. Luật rộng lắm. Mình chọn luật doanh nghiệp và đang làm pháp chế cho một công ty FDI, lương 25 triệu sau 2 năm kinh nghiệm.", author_name: "Nguyễn Thanh Tùng" },
    { post_id: posts[10].id, content: "Cảm ơn bạn đã tổng hợp. Năm nay HUST tăng mạnh do thêm chỉ tiêu nhưng lượng hồ sơ cũng tăng theo.", author_name: "Trần Đình Phong" },
    { post_id: posts[10].id, content: "FPT giờ điểm chuẩn có cao hơn trước không? Mình thấy bạn bè đỗ FPT nhiều mà vẫn có việc làm tốt sau khi ra trường.", author_name: "Đỗ Hải Yến" },
    { post_id: posts[12].id, content: "Mình thi khối B vừa đỗ Y Hà Nội. Môn Sinh mình làm sơ đồ tư duy cho từng bài giống bạn chia sẻ, hiệu quả lắm. Môn Toán mình ôn chắc phần tích phân và xác suất.", author_name: "Nguyễn Hồng Nhung" },
    { post_id: posts[12].id, content: "Bạn ơi cho mình hỏi phần Hóa học có học theo chuyên đề không hay học theo SGK? Mình đang yếu phần Hóa hữu cơ.", author_name: "Vương Thị Nga" },
    { post_id: posts[12].id, content: "Năm trước mình thi khối B được 28.75 nhưng trượt Y Hà Nội. Năm nay quyết tâm lên. Cảm ơn bạn chia sẻ kinh nghiệm rất hữu ích!", author_name: "Hà Văn Kiên" },
    { post_id: posts[13].id, content: "Mình học Báo chí tại ĐH KHXHNV HCM. Môi trường rất năng động, nhiều cơ hội thực tập tại các tòa soạn lớn ở TP.HCM như VnExpress, Tuổi Trẻ.", author_name: "Lê Thu Hà" },
    { post_id: posts[14].id, content: "Mình cũng đang học ở HCMUT ngành CNTT. Đồng ý với bạn, học kỳ đầu rất shock nhưng qua được thì dần quen. Quan trọng là không bỏ lớp và làm bài tập đầy đủ.", author_name: "Hoàng Bảo Nam" },
    { post_id: posts[14].id, content: "Thư viện HCMUT có phòng học nhóm không? Mình sắp vào và muốn biết trước về cơ sở vật chất.", author_name: "Trần Quỳnh Mai" },
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
