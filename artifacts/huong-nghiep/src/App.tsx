import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import Universities from "@/pages/universities";
import UniversityDetail from "@/pages/university-detail";
import Majors from "@/pages/majors";
import MajorDetail from "@/pages/major-detail";
import Prediction from "@/pages/prediction";
import Forum from "@/pages/forum";
import ForumPost from "@/pages/forum-post";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/truong" component={Universities} />
        <Route path="/truong/:id" component={UniversityDetail} />
        <Route path="/nganh" component={Majors} />
        <Route path="/nganh/:id" component={MajorDetail} />
        <Route path="/du-bao" component={Prediction} />
        <Route path="/dien-dan" component={Forum} />
        <Route path="/dien-dan/:id" component={ForumPost} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
