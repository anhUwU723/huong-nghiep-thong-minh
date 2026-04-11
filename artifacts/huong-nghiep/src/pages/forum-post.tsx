import { useState } from "react";
import { useParams, Link } from "wouter";
import { useGetForumPost, useCreateForumReply } from "@workspace/api-client-react";
import { getGetForumPostQueryKey, getListForumPostsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Clock, User, MessageSquare, Send } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const replySchema = z.object({
  content: z.string().min(10, "Bình luận cần ít nhất 10 ký tự"),
  author_name: z.string().min(2, "Vui lòng nhập tên của bạn"),
});

type ReplyFormValues = z.infer<typeof replySchema>;

export default function ForumPost() {
  const params = useParams<{ id: string }>();
  const postId = parseInt(params.id || "0", 10);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: post, isLoading } = useGetForumPost(postId, {
    query: { enabled: !!postId, queryKey: getGetForumPostQueryKey(postId) },
  });

  const createReply = useCreateForumReply();

  const form = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: "",
      author_name: "",
    },
  });

  const onSubmit = (data: ReplyFormValues) => {
    createReply.mutate(
      { id: postId, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetForumPostQueryKey(postId) });
          queryClient.invalidateQueries({ queryKey: getListForumPostsQueryKey() });
          form.reset();
          toast({
            title: "Gửi bình luận thành công",
          });
        },
        onError: () => {
          toast({
            title: "Có lỗi xảy ra",
            description: "Không thể gửi bình luận lúc này. Vui lòng thử lại sau.",
            variant: "destructive",
          });
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        <Skeleton className="h-8 w-24 mb-6" />
        <Card className="border-none shadow-sm">
          <CardContent className="p-8 space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-48" />
            <div className="pt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h2>
        <Link href="/dien-dan">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại diễn đàn
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/dien-dan" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Trở về danh sách diễn đàn
      </Link>

      <div className="space-y-6">
        {/* Original Post */}
        <Card className="border-none shadow-md overflow-hidden bg-white">
          <div className="h-1 w-full bg-primary/20"></div>
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                {post.category}
              </Badge>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-serif font-bold leading-tight mb-6 text-foreground">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground pb-6 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-foreground block">{post.author_name}</span>
                  <span className="text-xs">Người đăng</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 ml-auto md:ml-0">
                <Clock className="w-4 h-4" />
                {format(new Date(post.created_at), "dd/MM/yyyy HH:mm", { locale: vi })}
              </div>
            </div>
            
            <div className="prose prose-slate max-w-none pt-6 prose-p:leading-relaxed whitespace-pre-line text-foreground/90 text-base">
              {post.content}
            </div>
          </CardContent>
        </Card>

        {/* Replies Section */}
        <div className="pt-4">
          <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
            {post.replies?.length || 0} Bình luận
          </h3>

          <div className="space-y-4 mb-10">
            {post.replies && post.replies.length > 0 ? (
              post.replies.map((reply) => (
                <Card key={reply.id} className="border-muted bg-white/50 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground">{reply.author_name}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {format(new Date(reply.created_at), "dd/MM HH:mm", { locale: vi })}
                          </span>
                        </div>
                        <div className="text-foreground/90 whitespace-pre-line text-sm mt-2 leading-relaxed bg-white p-4 rounded-lg border">
                          {reply.content}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-8 bg-muted/30 rounded-xl border border-dashed">
                <p className="text-muted-foreground">Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ ý kiến của bạn!</p>
              </div>
            )}
          </div>

          {/* Reply Form */}
          <Card className="border shadow-sm border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-serif font-bold text-lg mb-4 text-primary">Viết bình luận</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="author_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Tên hiển thị của bạn..." className="bg-white max-w-[300px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Chia sẻ ý kiến, kinh nghiệm của bạn..." 
                            className="bg-white min-h-[100px] resize-y" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={createReply.isPending} className="px-6 rounded-full">
                      <Send className="w-4 h-4 mr-2" />
                      {createReply.isPending ? "Đang gửi..." : "Gửi bình luận"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
