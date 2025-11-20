import ProjectsSection from "@/components/ProjectsSection";
import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import CTASection from "@/components/CTASection";

async function fetchProjectsData(locale) {
  try {
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      if (process.env.VERCEL_URL) {
        baseUrl = `https://${process.env.VERCEL_URL}`;
      } else {
        baseUrl = "http://localhost:3000";
      }
    }

    const apiLocale = locale || "en";
    const url = `${baseUrl}/api/homes?locale=${apiLocale}`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch homes: ${response.status}`);
    }

    const data = await response.json();
    const homeData = data.homes?.[0];

    if (!homeData) {
      return null;
    }

    return {
      titleHeaderCaseStudies: homeData.titleHeaderCaseStudies,
      ctaTitle: homeData.ctaTitle,
      caseStudies: homeData.caseStudies,
    };
  } catch (error) {
    console.error("Error fetching homes from API:", error);
    return null;
  }
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  const projectsData = await fetchProjectsData(locale);

  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <ProjectsSection title={projectsData?.titleHeaderCaseStudies} />
        <CaseStudiesSection caseStudies={projectsData?.caseStudies} />
        <CTASection title={projectsData?.ctaTitle} />
        <Footer />
      </div>
    </NavbarProvider>
  );
}
