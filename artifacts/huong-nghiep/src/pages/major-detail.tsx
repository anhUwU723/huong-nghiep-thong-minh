import { useParams, Link } from "wouter";
import { useGetMajor } from "@workspace/api-client-react";
import { getGetMajorQueryKey } from "@workspace/api-client-react";
import { ArrowLeft, Briefcase, Wallet, Target, Sparkles, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MajorDetail() {
  const params = useParams<{ id: string }>();
  const majorId = parseInt(params.id || "0", 10);

  const { data: major, isLoading } = useGetMajor(majorId, {
    query: { enabled: !!majorId, queryKey: getGetMajorQueryKey(majorId) },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-8 w-24 mb-6" />
        <div className="bg-white rounded-xl p-8 border shadow-sm mb-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-10 w-3/4 mb-6" />
          <Skeleton className="h-4 w-full mt-4" />
          <Skeleton className="h-4 w-full mt-2" />
        </div>
      </div>
    );
  }

  if (!major) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy thông tin ngành</h2>
        <Link href="/nganh">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/nganh" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Trở về danh sách ngành
      </Link>

      <div className="bg-white rounded-2xl p-8 md:p-12 border shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            {major.category}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
            Ngành {major.name}
          </h1>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium border border-green-100">
              <Wallet className="w-5 h-5" />
              <span>
                {major.salary_range_min && major.salary_range_max 
                  ? `${major.salary_range_min} - ${major.salary_range_max} triệu/tháng`
                  : 'Đang cập nhật mức lương'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-lg font-medium border border-primary/10">
              <Briefcase className="w-5 h-5" />
              <span>{major.job_title || 'Nhiều vị trí đa dạng'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl p-6 md:p-8 border shadow-sm">
            <h2 className="text-2xl font-serif font-bold mb-4">Mô tả ngành học</h2>
            <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground text-base">
              {major.description ? (
                <p className="whitespace-pre-line">{major.description}</p>
              ) : (
                <p className="italic text-muted-foreground">Chưa có mô tả chi tiết.</p>
              )}
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 border shadow-sm">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Cơ hội việc làm
            </h2>
            {major.career_paths && major.career_paths.length > 0 ? (
              <ul className="space-y-4">
                {major.career_paths.map((path, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold">{idx + 1}</span>
                    </div>
                    <span className="leading-relaxed">{path}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground italic">Đang cập nhật thông tin.</p>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <Card className="bg-accent/10 border-accent/20 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-serif text-accent-foreground">
                <Sparkles className="w-5 h-5" />
                Kỹ năng cần thiết
              </CardTitle>
            </CardHeader>
            <CardContent>
              {major.skills_needed && major.skills_needed.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {major.skills_needed.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-white hover:bg-white text-foreground border shadow-sm py-1.5 px-3 font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Đang cập nhật</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Tổ hợp xét tuyển</CardTitle>
            </CardHeader>
            <CardContent>
              {major.exam_blocks && major.exam_blocks.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {major.exam_blocks.map(block => (
                    <Badge key={block} variant="outline" className="font-medium text-sm">
                      {block}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Đang cập nhật</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif flex items-center gap-2">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                Trường đào tạo nổi bật
              </CardTitle>
            </CardHeader>
            <CardContent>
              {major.top_universities && major.top_universities.length > 0 ? (
                <div className="space-y-3">
                  {major.top_universities.map(uni => (
                    <Link key={uni.id} href={`/truong/${uni.id}`} className="block group">
                      <div className="p-3 rounded-lg border bg-muted/20 hover:bg-primary/5 hover:border-primary/20 transition-colors">
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">{uni.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{uni.region}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Đang cập nhật danh sách trường.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
