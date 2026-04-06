import { useState } from "react";
import { Link } from "wouter";
import { useListForumPosts, useCreateForumPost } from "@workspace/api-client-react";
import { getListForumPostsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Plus, MessagesSquare, Clock, User, Filter } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const postSchema = z.object({
  title: z.string().min(5, "Tiêu đề quá ngắn").max(150, "Tiêu đề quá dài"),
  content: z.string().min(20, "Nội dung cần ít nhất 20 ký tự"),
  author_name: z.string().min(2, "Vui lòng nhập tên của bạn"),
  category: z.string().min(1, "Vui lòng chọn chủ đề"),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function Forum() {
  const [category, setCategory] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useListForumPosts({
    category: category !== "all" ? category : undefined,
  });

  const createPost = useCreateForumPost();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      author_name: "",
      category: "",
    },
  });

  const onSubmit = (data: PostFormValues) => {
    createPost.mutate(
      { data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListForumPostsQueryKey() });
          setIsDialogOpen(false);
          form.reset();
          toast({
            title: "Tạo bài viết thành công",
            description: "Cảm ơn bạn đã tham gia cộng đồng.",
          });
        },
        onError: () => {
          toast({
            title: "Có lỗi xảy ra",
            description: "Không thể tạo bài viết lúc này. Vui lòng thử lại sau.",
            variant: "destructive",
          });
        }
      }
    );
  };

  const categories = [
    "Chọn ngành chọn trường",
    "Kinh nghiệm ôn thi",
    "Góc tâm sự",
    "Hỏi đáp thông tin tuyển sinh"
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-primary text-primary-foreground p-8 rounded-2xl relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10">
          <MessagesSquare className="w-64 h-64 -mt-10 -mr-10" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-serif font-bold mb-2">Diễn đàn trao đổi</h1>
          <p className="text-primary-foreground/80 text-lg">Cộng đồng học sinh 12 chia sẻ kinh nghiệm, hỏi đáp và tâm sự về hành trình chọn ngành, chọn trường.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="shrink-0 bg-white text-primary hover:bg-white/90 z-10 font-bold px-6 rounded-full shadow-md">
              <Plus className="w-5 h-5 mr-2" />
              Tạo bài viết mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">Tạo bài viết mới</DialogTitle>
              <DialogDescription>
                Chia sẻ thắc mắc hoặc kinh nghiệm của bạn với cộng đồng.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề bài viết</FormLabel>
                      <FormControl>
                        <Input placeholder="Ví dụ: Xin review ngành CNTT trường KHTN..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="author_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên/Biệt danh</FormLabel>
                        <FormControl>
                          <Input placeholder="Tên hiển thị..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chủ đề</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn chủ đề" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map(c => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Viết nội dung chi tiết ở đây..." 
                          className="min-h-[150px] resize-y" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={createPost.isPending} className="px-8">
                    {createPost.isPending ? "Đang đăng..." : "Đăng bài"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 items-center bg-white p-2 rounded-lg border shadow-sm inline-flex">
        <Filter className="w-4 h-4 text-muted-foreground ml-2 mr-1" />
        <Button 
          variant={category === "all" ? "secondary" : "ghost"} 
          size="sm" 
          onClick={() => setCategory("all")}
          className="rounded-md"
        >
          Tất cả
        </Button>
        {categories.map(c => (
          <Button 
            key={c}
            variant={category === c ? "secondary" : "ghost"} 
            size="sm"
            onClick={() => setCategory(c)}
            className="rounded-md"
          >
            {c}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium">Chưa có bài viết nào</h3>
          <p className="text-muted-foreground mt-1">Hãy là người đầu tiên đặt câu hỏi hoặc chia sẻ trong chủ đề này.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts?.map((post) => (
            <Link key={post.id} href={`/dien-dan/${post.id}`}>
              <Card className="hover:shadow-md transition-all border-muted hover:border-primary/30 cursor-pointer bg-white group">
                <CardContent className="p-5 md:p-6 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="bg-muted/50 text-xs font-normal">
                        {post.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold font-serif leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {post.content}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
                      <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <User className="w-3 h-3" />
                        </div>
                        {post.author_name}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {format(new Date(post.created_at), "dd/MM/yyyy HH:mm", { locale: vi })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="shrink-0 flex items-center justify-start md:justify-center border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 md:w-32">
                    <div className="text-center flex flex-row md:flex-col items-center gap-2 md:gap-1 text-muted-foreground group-hover:text-primary transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-semibold text-lg">{post.reply_count}</span>
                      <span className="text-xs uppercase tracking-wider hidden md:block">Trả lời</span>
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
