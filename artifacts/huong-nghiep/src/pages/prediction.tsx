import { useState } from "react";
import { Link } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { usePredictAdmission } from "@workspace/api-client-react";
import { Calculator, AlertCircle, CheckCircle2, HelpCircle, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const predictionSchema = z.object({
  score: z.coerce.number().min(0, "Điểm không hợp lệ").max(30, "Điểm tối đa là 30"),
  exam_block: z.string().min(1, "Vui lòng chọn tổ hợp môn"),
  region_bonus: z.coerce.number().min(0).max(2).optional(),
});

type PredictionFormValues = z.infer<typeof predictionSchema>;

export default function Prediction() {
  const predictAdmission = usePredictAdmission();
  const [predictions, setPredictions] = useState<any[]>([]);

  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      score: 0,
      exam_block: "",
      region_bonus: 0,
    },
  });

  function onSubmit(data: PredictionFormValues) {
    predictAdmission.mutate(
      { data },
      {
        onSuccess: (result) => {
          setPredictions(result);
          // Scroll to results slightly
          window.scrollTo({ top: 400, behavior: 'smooth' });
        },
      }
    );
  }

  const getChanceColor = (chance: string) => {
    switch (chance) {
      case "safe": return "bg-[var(--color-safe)] text-[var(--color-safe-foreground)] border-green-200";
      case "borderline": return "bg-[var(--color-borderline)] text-[var(--color-borderline-foreground)] border-yellow-200";
      case "risky": return "bg-[var(--color-risky)] text-[var(--color-risky-foreground)] border-red-200";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getChanceIcon = (chance: string) => {
    switch (chance) {
      case "safe": return <CheckCircle2 className="w-5 h-5 mr-2" />;
      case "borderline": return <HelpCircle className="w-5 h-5 mr-2" />;
      case "risky": return <AlertCircle className="w-5 h-5 mr-2" />;
      default: return null;
    }
  };

  const getChanceText = (chance: string) => {
    switch (chance) {
      case "safe": return "An toàn";
      case "borderline": return "Cơ hội/Cạnh tranh";
      case "risky": return "Nguy cơ cao";
      default: return chance;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Calculator className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4">Dự báo trúng tuyển</h1>
        <p className="text-muted-foreground text-lg">
          Nhập điểm thi dự kiến của bạn để hệ thống tính toán và đưa ra dự báo khả năng đỗ vào các ngành/trường dựa trên dữ liệu các năm trước.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <Card className="border shadow-md">
            <CardHeader className="bg-muted/30 pb-6">
              <CardTitle className="text-xl font-serif">Nhập thông tin</CardTitle>
              <CardDescription>
                Nhập chính xác điểm số để có kết quả tốt nhất
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="score"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-foreground">Điểm thi (Không cộng điểm ưu tiên)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" className="h-12 text-lg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="exam_block"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-foreground">Tổ hợp môn</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Chọn tổ hợp môn" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="A00">A00 — Toán, Lý, Hóa</SelectItem>
                            <SelectItem value="A01">A01 — Toán, Lý, Anh</SelectItem>
                            <SelectItem value="A02">A02 — Toán, Lý, Sinh</SelectItem>
                            <SelectItem value="A05">A05 — Toán, Hóa, Sử</SelectItem>
                            <SelectItem value="A08">A08 — Toán, Sử, Anh</SelectItem>
                            <SelectItem value="A16">A16 — Toán, Khoa học TN, Anh</SelectItem>
                            <SelectItem value="B00">B00 — Toán, Hóa, Sinh</SelectItem>
                            <SelectItem value="B03">B03 — Toán, Sinh, Văn</SelectItem>
                            <SelectItem value="B08">B08 — Toán, Sinh, Anh</SelectItem>
                            <SelectItem value="C00">C00 — Văn, Sử, Địa</SelectItem>
                            <SelectItem value="C01">C01 — Toán, Lý, Sử</SelectItem>
                            <SelectItem value="C02">C02 — Toán, Hóa, Sử</SelectItem>
                            <SelectItem value="C03">C03 — Toán, Sinh, Sử</SelectItem>
                            <SelectItem value="C04">C04 — Toán, Văn, Địa</SelectItem>
                            <SelectItem value="C14">C14 — Toán, Lý, Văn</SelectItem>
                            <SelectItem value="D01">D01 — Toán, Văn, Anh</SelectItem>
                            <SelectItem value="D07">D07 — Toán, Hóa, Anh</SelectItem>
                            <SelectItem value="D08">D08 — Toán, Sinh, Anh</SelectItem>
                            <SelectItem value="D09">D09 — Toán, Sử, Anh</SelectItem>
                            <SelectItem value="D10">D10 — Toán, Địa, Anh</SelectItem>
                            <SelectItem value="D14">D14 — Văn, Sử, Anh</SelectItem>
                            <SelectItem value="D15">D15 — Văn, Địa, Anh</SelectItem>
                            <SelectItem value="D90">D90 — Toán, KHTN, Anh</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="region_bonus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-foreground flex items-center justify-between">
                          Điểm ưu tiên
                          <span className="text-xs font-normal text-muted-foreground px-2 py-1 bg-muted rounded-full">Không bắt buộc</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value?.toString() || "0"}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Chọn điểm ưu tiên" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">Không có (0 điểm)</SelectItem>
                            <SelectItem value="0.25">0.25 điểm</SelectItem>
                            <SelectItem value="0.5">0.5 điểm</SelectItem>
                            <SelectItem value="0.75">0.75 điểm</SelectItem>
                            <SelectItem value="1">1.0 điểm</SelectItem>
                            <SelectItem value="1.5">1.5 điểm</SelectItem>
                            <SelectItem value="2">2.0 điểm</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Bao gồm ưu tiên khu vực và đối tượng</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold shadow-md hover:shadow-lg transition-all rounded-xl"
                    disabled={predictAdmission.isPending}
                  >
                    {predictAdmission.isPending ? "Đang xử lý dữ liệu..." : "Bắt đầu phân tích"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          {!predictAdmission.isSuccess ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-xl border border-dashed border-muted-foreground/30">
              <div className="w-20 h-20 mb-6 bg-muted/50 rounded-full flex items-center justify-center">
                <Calculator className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-serif font-bold text-muted-foreground">Chưa có dữ liệu</h3>
              <p className="text-muted-foreground/80 mt-2 max-w-sm">
                Vui lòng nhập thông tin ở biểu mẫu bên trái để xem dự báo trúng tuyển của bạn.
              </p>
            </div>
          ) : predictions.length === 0 ? (
             <div className="text-center p-12 bg-white rounded-xl border">
               <h3 className="text-xl font-medium">Không tìm thấy kết quả phù hợp</h3>
               <p className="text-muted-foreground mt-2">Điểm của bạn có thể quá thấp so với phổ điểm chung hoặc chưa có dữ liệu cho tổ hợp này.</p>
             </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border shadow-sm">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {predictions.length}
                  </Badge>
                  Kết quả dự báo
                </h3>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[var(--color-safe)]"></div> An toàn</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[var(--color-borderline)]"></div> Cạnh tranh</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[var(--color-risky)]"></div> Nguy cơ</div>
                </div>
              </div>

              <div className="grid gap-4">
                {predictions.map((pred, idx) => (
                  <Card key={`${pred.university_id}-${pred.major_id}-${idx}`} className={`overflow-hidden border-l-4 transition-all hover:shadow-md ${
                    pred.chance === 'safe' ? 'border-l-[var(--color-safe)]' :
                    pred.chance === 'borderline' ? 'border-l-[var(--color-borderline)]' :
                    'border-l-[var(--color-risky)]'
                  }`}>
                    <div className="flex flex-col sm:flex-row">
                      <div className={`p-4 sm:p-6 sm:w-48 flex flex-col justify-center items-center text-center border-b sm:border-b-0 sm:border-r ${getChanceColor(pred.chance)} bg-opacity-20`}>
                        <div className="font-bold flex items-center justify-center">
                          {getChanceIcon(pred.chance)}
                          {getChanceText(pred.chance)}
                        </div>
                        <div className="mt-2 text-sm opacity-90">
                          Độ lệch: {pred.score_gap > 0 ? "+" : ""}{pred.score_gap.toFixed(2)} đ
                        </div>
                      </div>
                      
                      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <Link href={`/truong/${pred.university_id}`} className="font-medium text-muted-foreground hover:text-primary hover:underline text-sm flex items-center gap-1">
                              {pred.university_name}
                            </Link>
                          </div>
                          <Link href={`/nganh/${pred.major_id}`}>
                            <h4 className="text-xl font-serif font-bold text-foreground hover:text-primary transition-colors leading-tight mb-4">
                              {pred.major_name}
                            </h4>
                          </Link>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-muted/50">
                          <div>
                            <p className="text-xs text-muted-foreground">Điểm chuẩn gần nhất</p>
                            <p className="font-bold text-lg">{pred.latest_score.toFixed(2)}</p>
                          </div>
                          <Separator orientation="vertical" className="h-8" />
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Điểm xét tuyển của bạn</p>
                            <p className="font-bold text-lg text-primary">{pred.student_score.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
