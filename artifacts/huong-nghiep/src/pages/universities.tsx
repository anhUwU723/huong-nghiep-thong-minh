import { useState } from "react";
import { Link } from "wouter";
import { useListUniversities } from "@workspace/api-client-react";
import { Search, MapPin, Building2, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";

export default function Universities() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [region, setRegion] = useState<string>("all");
  const [type, setType] = useState<string>("all");

  const { data: universities, isLoading } = useListUniversities({
    search: debouncedSearch || undefined,
    region: region !== "all" ? region : undefined,
  });

  const filteredUniversities = universities?.filter(u => {
    if (type !== "all" && u.type !== type) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-4">Danh sách trường đại học</h1>
        <p className="text-muted-foreground text-lg">Tìm hiểu thông tin, học phí và điểm chuẩn của các trường đại học trên cả nước.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm tên trường, mã trường..." 
            className="pl-10 h-12 text-base bg-muted/30 border-none focus-visible:ring-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-full md:w-[200px] h-12 bg-muted/30 border-none">
            <SelectValue placeholder="Khu vực" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả khu vực</SelectItem>
            <SelectItem value="Miền Bắc">Miền Bắc</SelectItem>
            <SelectItem value="Miền Trung">Miền Trung</SelectItem>
            <SelectItem value="Miền Nam">Miền Nam</SelectItem>
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full md:w-[200px] h-12 bg-muted/30 border-none">
            <SelectValue placeholder="Loại trường" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại trường</SelectItem>
            <SelectItem value="công lập">Công lập</SelectItem>
            <SelectItem value="tư thục">Tư thục</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="overflow-hidden border-none shadow-sm">
              <div className="h-32 bg-muted animate-pulse"></div>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredUniversities?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium">Không tìm thấy trường nào</h3>
          <p className="text-muted-foreground mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities?.map((uni) => (
            <Link key={uni.id} href={`/truong/${uni.id}`}>
              <Card className="h-full hover:shadow-md transition-all duration-300 cursor-pointer group border-muted bg-white overflow-hidden flex flex-col">
                <div className="h-2 bg-gradient-to-r from-primary to-secondary opacity-80 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="font-serif font-bold text-xl leading-tight group-hover:text-primary transition-colors">
                      {uni.name}
                    </h3>
                    {uni.logo_url ? (
                      <img src={uni.logo_url} alt={uni.short_name} className="w-12 h-12 object-contain bg-white rounded p-1 border shadow-sm shrink-0" />
                    ) : (
                      <div className="w-12 h-12 shrink-0 bg-muted rounded flex items-center justify-center font-bold text-muted-foreground text-sm border">
                        {uni.short_name}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 mt-auto">
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <MapPin className="w-4 h-4 text-secondary shrink-0" />
                      <span className="truncate">{uni.region}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <Wallet className="w-4 h-4 text-green-600 shrink-0" />
                      <span>
                        {uni.tuition_min && uni.tuition_max 
                          ? `${uni.tuition_min} - ${uni.tuition_max} triệu/năm`
                          : uni.tuition_max ? `Khoảng ${uni.tuition_max} triệu/năm`
                          : 'Đang cập nhật'}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-muted/50">
                      <Badge variant="outline" className="bg-muted/30 font-normal">
                        {uni.short_name}
                      </Badge>
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 font-medium">
                        {uni.type}
                      </Badge>
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
