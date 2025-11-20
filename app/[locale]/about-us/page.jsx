import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import WhyChooseUs from "@/components/WhyChooseUs";
import InnovationHero from "@/components/InnovationHero";

async function fetchAboutUsData(locale) {
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
      headingAboutUs: homeData.headingAboutUs,
      descriptionAboutUs: homeData.descriptionAboutUs,
      whyTitile: homeData.whyTitile,
      whyDescription: homeData.whyDescription,
      ctaTitle: homeData.ctaTitle,
    };
  } catch (error) {
    console.error("Error fetching homes from API:", error);
    return null;
  }
}

export default async function AboutUsPage({ params }) {
  const { locale } = await params;
  const aboutUsData = await fetchAboutUsData(locale);

  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <WhyChooseUs
          title={aboutUsData?.whyTitile}
          description={aboutUsData?.whyDescription}
        />
        <InnovationHero
          title={aboutUsData?.headingAboutUs}
          description={aboutUsData?.descriptionAboutUs}
        />
        <CTASection title={aboutUsData?.ctaTitle} />
        <Footer />
      </div>
    </NavbarProvider>
  );
}
