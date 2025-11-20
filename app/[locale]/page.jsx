import AboutSection from "@/components/AboutSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ContentHero from "@/components/ContentHero";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import ProjectSection from "@/components/ProjectSection";
import PartnerSection from "@/components/PartnerSection";
import WhyChooseUs from "@/components/WhyChooseUs";

// Fetch homes data
async function fetchHomesData(locale) {
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
    return data.homes?.[0] || null;
  } catch (error) {
    console.error("Error fetching homes from API:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const homeData = await fetchHomesData(locale);

  const title = "Artique Agency";
  const description =
    homeData?.descriptionHeader ||
    "At Artique, we believe that creativity has no bounds, and we are committed to helping our clients unlock the full potential of their ideas.";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      siteName: "Artique Agency",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        id: "/id",
      },
    },
  };
}

export default async function Home({ params }) {
  const { locale } = await params;
  const homeData = await fetchHomesData(locale);

  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <Hero
          videoUrl={"/bg-video.webm"}
          classNameContainer={"sm:h-[calc(100vh-1.5rem)] max-sm:h-screen"}
          className={
            "sm:h-[360px] max-sm:h-[255px] max-sm:px-8 max-w-5xl -mt-8 sm:mt-12 mx-auto w-full"
          }
        >
          <ContentHero
            title={homeData?.titleHeader}
            description={homeData?.descriptionHeader}
          />
        </Hero>
        <AboutSection about={homeData?.about} mision={homeData?.mision} />
        <WhyChooseUs
          title={homeData?.whyTitile}
          description={homeData?.whyDescription}
        />
        <ProjectSection clients={homeData?.ourClients} />
        <CaseStudiesSection caseStudies={homeData?.caseStudies} />
        <PartnerSection partners={homeData?.ourPartners} />
        <Footer />
      </div>
    </NavbarProvider>
  );
}
