import { useState } from "react";
import { Link } from "wouter";
import { useListMajors } from "@workspace/api-client-react";
import { Search, Briefcase, Wallet, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";

export default function Majors() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [category, setCategory] = useState<string>("all");

  const { data: majors, isLoading } = useListMajors({
    search: debouncedSearch || undefined,
    category: category !== "all" ? category : undefined,
  });

  // Extract unique categories for filter
  const categories = Array.from(new Set(majors?.map(m => m.category) || [])).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-4">Danh sách ngành nghề</h1>
        <p className="text-muted-foreground text-lg">Khám phá các ngành học, mức lương và cơ hội nghề nghiệp trong tương lai.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm tên ngành..." 
            className="pl-10 h-12 text-base bg-muted/30 border-none focus-visible:ring-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[300px] h-12 bg-muted/30 border-none">
            <SelectValue placeholder="Nhóm ngành" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả nhóm ngành</SelectItem>
            {categories.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : majors?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed">
          <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium">Không tìm thấy ngành nào</h3>
          <p className="text-muted-foreground mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {majors?.map((major) => (
            <Link key={major.id} href={`/nganh/${major.id}`}>
              <Card className="h-full hover:shadow-md transition-all duration-300 cursor-pointer group border-muted bg-white flex flex-col hover:border-primary/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                
                <CardHeader className="pb-3">
                  <div className="text-xs font-medium text-secondary mb-2 px-3 py-1 bg-secondary/10 w-fit rounded-full">
                    {major.category}
                  </div>
                  <CardTitle className="text-xl font-serif leading-tight group-hover:text-primary transition-colors pr-8">
                    {major.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  {major.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                      {major.description}
                    </p>
                  )}
                  
                  <div className="space-y-3 mt-auto pt-4 border-t border-muted/50">
                    <div className="flex items-center text-sm text-foreground font-medium gap-2">
                      <Wallet className="w-4 h-4 text-green-600 shrink-0" />
                      <span>
                        {major.salary_range_min && major.salary_range_max 
                          ? `${major.salary_range_min} - ${major.salary_range_max} triệu/tháng`
                          : 'Mức lương: Đang cập nhật'}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5">Tổ hợp xét tuyển phổ biến:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {major.exam_blocks?.slice(0, 4).map(block => (
                          <Badge key={block} variant="outline" className="bg-muted/30 font-normal text-xs py-0 h-5">
                            {block}
                          </Badge>
                        ))}
                        {major.exam_blocks && major.exam_blocks.length > 4 && (
                          <Badge variant="outline" className="bg-muted/30 font-normal text-xs py-0 h-5">
                            +{major.exam_blocks.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
