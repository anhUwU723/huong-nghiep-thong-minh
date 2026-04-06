import { Link } from "wouter";
import { useGetStatsSummary, useGetTrendingMajors } from "@workspace/api-client-react";
import { Search, GraduationCap, BookOpen, MessagesSquare, ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";
import { formatVND } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { data: stats } = useGetStatsSummary();
  const { data: trending } = useGetTrendingMajors();

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/40 via-background to-background"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Đồng hành cùng học sinh khối 12</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-foreground mb-6 leading-tight">
            Chọn đúng ngành, <br className="hidden md:block" />
            <span className="text-primary">Sáng tương lai.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Khám phá hàng trăm trường đại học, tìm hiểu chi tiết các ngành nghề và dự báo khả năng trúng tuyển của bạn bằng công cụ thông minh.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/du-bao">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full text-base shadow-lg hover:shadow-xl transition-all">
                <Target className="w-5 h-5 mr-2" />
                Dự báo trúng tuyển ngay
              </Button>
            </Link>
            <Link href="/truong">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full text-base border-2 bg-white hover:bg-muted/50 transition-all">
                Khám phá trường đại học
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto -mt-20 relative z-10">
          <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{stats?.total_universities || "..."}</h3>
              <p className="text-sm font-medium text-muted-foreground">Trường đại học</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{stats?.total_majors || "..."}</h3>
              <p className="text-sm font-medium text-muted-foreground">Ngành học</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-accent text-accent-foreground flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{stats?.total_predictions_made ? (stats.total_predictions_made / 1000).toFixed(1) + "k+" : "..."}</h3>
              <p className="text-sm font-medium text-muted-foreground">Lượt dự báo</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <MessagesSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{stats?.total_forum_posts || "..."}</h3>
              <p className="text-sm font-medium text-muted-foreground">Bài thảo luận</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trending Majors */}
      <section className="container mx-auto px-4 max-w-5xl pt-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold flex items-center gap-3">
              Ngành học xu hướng <TrendingUp className="w-6 h-6 text-primary" />
            </h2>
            <p className="text-muted-foreground mt-2">Các ngành được tìm kiếm nhiều nhất hiện nay</p>
          </div>
          <Link href="/nganh">
            <Button variant="ghost" className="hidden sm:flex group">
              Xem tất cả <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending?.map((major) => (
            <Link key={major.major_id} href={`/nganh/${major.major_id}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-muted">
                <CardHeader>
                  <div className="text-xs font-medium text-secondary mb-2 px-2 py-1 bg-secondary/10 w-fit rounded">
                    {major.category}
                  </div>
                  <CardTitle className="text-lg line-clamp-2 leading-snug">{major.major_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Mức lương trung bình</p>
                      <p className="font-semibold text-foreground">
                        {major.avg_salary ? `${formatVND(major.avg_salary)}/tháng` : "Đang cập nhật"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      <Search className="w-3 h-3" />
                      {major.search_count}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 sm:hidden text-center">
          <Link href="/nganh">
            <Button variant="outline" className="w-full">Xem tất cả ngành nghề</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
