import { useParams, Link } from "wouter";
import { useGetUniversity } from "@workspace/api-client-react";
import { getGetUniversityQueryKey } from "@workspace/api-client-react";
import { MapPin, Globe, BookOpen, GraduationCap, ArrowLeft, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export default function UniversityDetail() {
  const params = useParams<{ id: string }>();
  const uniId = parseInt(params.id || "0", 10);

  const { data: uni, isLoading } = useGetUniversity(uniId, {
    query: { enabled: !!uniId, queryKey: getGetUniversityQueryKey(uniId) },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Skeleton className="h-8 w-24 mb-6" />
        <div className="bg-white rounded-xl p-8 border shadow-sm mb-8">
          <div className="flex items-start gap-6">
            <Skeleton className="w-24 h-24 rounded-lg" />
            <div className="space-y-4 flex-1">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!uni) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy trường đại học</h2>
        <Link href="/truong">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/truong" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Trở về danh sách trường
      </Link>

      <div className="bg-white rounded-2xl p-6 md:p-10 border shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {uni.logo_url ? (
            <div className="bg-white p-2 rounded-xl border shadow-sm shrink-0">
              <img src={uni.logo_url} alt={uni.name} className="w-24 h-24 md:w-32 md:h-32 object-contain" />
            </div>
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center border shadow-sm">
              <Building2 className="w-12 h-12 text-primary" />
            </div>
          )}
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 font-medium">
                {uni.type}
              </Badge>
              <Badge variant="outline" className="font-medium bg-white">
                Mã: {uni.short_name}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight">
              {uni.name}
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground pt-2">
              {uni.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-secondary shrink-0" />
                  <span>{uni.address}</span>
                </div>
              )}
              {uni.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-secondary shrink-0" />
                  <a href={uni.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline truncate">
                    {uni.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 rounded-lg w-full justify-start overflow-x-auto flex-nowrap h-auto border">
          <TabsTrigger value="overview" className="rounded-md px-6 py-2.5 text-sm font-medium data-[state=active]:shadow-sm">
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="majors" className="rounded-md px-6 py-2.5 text-sm font-medium data-[state=active]:shadow-sm">
            Ngành đào tạo & Điểm chuẩn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 border shadow-sm">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Giới thiệu chung
            </h2>
            <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground">
              {uni.description ? (
                <p className="whitespace-pre-line">{uni.description}</p>
              ) : (
                <p className="italic text-muted-foreground">Chưa có thông tin giới thiệu chi tiết về trường này.</p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="majors">
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 border-b bg-muted/10">
              <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                Các ngành đào tạo & Điểm chuẩn
              </h2>
              <p className="text-muted-foreground mt-2">Danh sách các ngành đào tạo và điểm chuẩn tham khảo các năm gần đây.</p>
            </div>
            
            {(!uni.recent_scores || uni.recent_scores.length === 0) ? (
              <div className="p-12 text-center text-muted-foreground">
                <p>Chưa có dữ liệu điểm chuẩn cho trường này.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="w-[300px] font-semibold text-foreground">Tên ngành</TableHead>
                      <TableHead className="font-semibold text-foreground">Tổ hợp môn</TableHead>
                      <TableHead className="font-semibold text-foreground text-center">Năm</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">Điểm chuẩn</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uni.recent_scores.map((score) => (
                      <TableRow key={score.id} className="hover:bg-muted/10">
                        <TableCell className="font-medium text-primary">
                          <Link href={`/nganh/${score.major_id}`} className="hover:underline">
                            {score.major_name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal bg-white">
                            {score.exam_block}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{score.year}</TableCell>
                        <TableCell className="text-right font-bold text-lg">{score.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
