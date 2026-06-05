import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import AdminPreview from "@/pages/AdminPreview";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import CaseStudyFlawlessSkin from "@/pages/CaseStudyFlawlessSkin";
import CaseStudyDermadoll from "@/pages/CaseStudyDermadoll";
import CaseStudyStarr from "@/pages/CaseStudyStarr";
import CaseStudyHira from "@/pages/CaseStudyHira";
import Payment from "@/pages/Payment";
import CityLanding from "@/pages/CityLanding";
import TreatmentLanding from "@/pages/TreatmentLanding";
import BespokeWebsites from "@/pages/services/BespokeWebsites";
import BookingSystems from "@/pages/services/BookingSystems";
import AiAssistant from "@/pages/services/AiAssistant";
import OngoingSupport from "@/pages/services/OngoingSupport";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient();

const CITY_SLUGS = ["london", "manchester", "birmingham", "leeds", "liverpool", "bristol", "edinburgh"];
const TREATMENT_SLUGS = ["botox-clinics", "lip-filler-clinics", "medical-aesthetics-clinics", "beauty-clinics", "skin-clinics"];

function Router() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (path === "/privacy-policy") return <PrivacyPolicy />;
  if (path === "/terms-of-service") return <TermsOfService />;
  if (path === "/terms") return <TermsOfService />;
  if (path === "/_admin-preview/starr") return <AdminPreview client="starr" />;
  if (path === "/_admin-preview/dermadoll") return <AdminPreview client="dermadoll" />;
  if (path === "/_admin-preview/flawlessskin") return <AdminPreview client="flawlessskin" />;
  if (path === "/portfolio/flawlessskin") return <CaseStudyFlawlessSkin />;
  if (path === "/portfolio/dermadoll") return <CaseStudyDermadoll />;
  if (path === "/portfolio/starr") return <CaseStudyStarr />;
  if (path === "/portfolio/hiraaesthetics") return <CaseStudyHira />;
  if (path === "/pay") return <Payment />;

  const cityMatch = path.match(/^\/aesthetics-websites\/([a-z]+)$/);
  if (cityMatch && CITY_SLUGS.includes(cityMatch[1])) {
    return <CityLanding citySlug={cityMatch[1]} />;
  }

  const treatmentMatch = path.match(/^\/aesthetics-websites\/([a-z-]+)$/);
  if (treatmentMatch && TREATMENT_SLUGS.includes(treatmentMatch[1])) {
    return <TreatmentLanding treatmentSlug={treatmentMatch[1]} />;
  }

  if (path === "/services/bespoke-websites") return <BespokeWebsites />;
  if (path === "/services/booking-systems") return <BookingSystems />;
  if (path === "/services/ai-assistant") return <AiAssistant />;
  if (path === "/services/ongoing-support") return <OngoingSupport />;
  if (path === "/admin") return <Admin />;
  if (path === "/blog") return <Blog />;

  const blogPostMatch = path.match(/^\/blog\/([a-z0-9-]+)$/);
  if (blogPostMatch) return <BlogPost slug={blogPostMatch[1]} />;

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
