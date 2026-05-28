import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import AdminPreview from "@/pages/AdminPreview";
import CaseStudyFlawlessSkin from "@/pages/CaseStudyFlawlessSkin";
import CaseStudyDermadoll from "@/pages/CaseStudyDermadoll";
import CaseStudyStarr from "@/pages/CaseStudyStarr";
import CaseStudyHira from "@/pages/CaseStudyHira";
import Payment from "@/pages/Payment";

const queryClient = new QueryClient();

function Router() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (path === "/privacy-policy") return <PrivacyPolicy />;
  if (path === "/terms-of-service") return <TermsOfService />;
  if (path === "/_admin-preview/starr") return <AdminPreview client="starr" />;
  if (path === "/_admin-preview/dermadoll") return <AdminPreview client="dermadoll" />;
  if (path === "/_admin-preview/flawlessskin") return <AdminPreview client="flawlessskin" />;
  if (path === "/portfolio/flawlessskin") return <CaseStudyFlawlessSkin />;
  if (path === "/portfolio/dermadoll") return <CaseStudyDermadoll />;
  if (path === "/portfolio/starr") return <CaseStudyStarr />;
  if (path === "/portfolio/hiraaesthetics") return <CaseStudyHira />;
  if (path === "/pay") return <Payment />;
  return <Home />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
