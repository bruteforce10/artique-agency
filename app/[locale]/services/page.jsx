import ServicesSection from "@/components/ServicesSection";
import ServicesHero from "@/components/ServicesHero";
import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";

// Fetch services data
async function fetchServicesData(locale) {
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
    const url = `${baseUrl}/api/services?locale=${apiLocale}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.status}`);
    }

    const data = await response.json();
    return data.servicesPages?.[0] || null;
  } catch (error) {
    console.error("Error fetching services from API:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const servicesData = await fetchServicesData(locale);

  const title = servicesData?.heading || "Our Services | Artique Agency";
  const description =
    "Discover our diverse range of services including Event Planning, Marketing Consultant, Expansion Consultant, Corporate Event Organising, and more. Tailored solutions for your business needs.";

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
      canonical: `/${locale}/services`,
      languages: {
        en: "/en/services",
        id: "/id/services",
      },
    },
  };
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const servicesData = await fetchServicesData(locale);

  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <ServicesHero heading={servicesData?.heading} />
        <ServicesSection listServices={servicesData?.listServices} />
        <Footer />
      </div>
    </NavbarProvider>
  );
}
