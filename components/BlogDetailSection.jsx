"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ShareButtons from "./ShareButtons";
import { Link } from "@/i18n/navigation";
import { useNavbarSection } from "./NavbarContext";

export default function BlogDetailSection({ blog }) {
  const navbarSectionRef = useNavbarSection("blog-detail-section", false);
  const heroSectionRef = useNavbarSection("blog-hero", true);

  // Format date from createdAt
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format read time
  const formatReadTime = (minutes) => {
    if (!minutes) return "";
    return `${minutes} min read`;
  };

  // Get creator info
  const creatorAvatar = blog?.creator?.avatar?.url;
  const creatorNama = blog?.creator?.nama || "Artique Agency";
  const creatorInitials = creatorNama?.charAt(0).toUpperCase() || "A";

  // Get avatar color
  const getAvatarColor = (nama) => {
    const colors = [
      "bg-amber-900",
      "bg-blue-600",
      "bg-green-600",
      "bg-purple-600",
      "bg-red-600",
      "bg-pink-600",
      "bg-indigo-600",
      "bg-teal-600",
      "bg-orange-600",
    ];
    if (!nama) return colors[0];
    const index = nama.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const title = blog?.judulBlog || "";
  const coverImage = blog?.cover?.url || "/bg-blog.webp";
  const content = blog?.description?.html || "";
  const date = formatDate(blog?.createdAt);
  const readTime = formatReadTime(blog?.minuteRead);
  const category = blog?.category || "";

  const breadcrumbItems = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: title, href: null },
    ],
    [title]
  );

  return (
    <div className="min-h-screen bg-background">
      <div
        className="relative w-full mx-auto h-64 sm:h-96 lg:h-[500px] mb-8"
        ref={heroSectionRef}
      >
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 pb-6">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-bold pt-6 pb-2 text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-4xl">
          {title}
        </h1>
      </div>

      {/* Main Content */}
      <article
        className="max-w-4xl mx-auto px-6 sm:px-8 pb-32"
        ref={navbarSectionRef}
      >
        {/* Author and Metadata */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b">
          <div className="flex items-center gap-4">
            {creatorAvatar ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={creatorAvatar}
                  alt={creatorNama}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            ) : (
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg",
                  getAvatarColor(creatorNama)
                )}
              >
                {creatorInitials}
              </div>
            )}
            <div>
              <p className="text-base font-semibold text-foreground">
                {creatorNama}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                {date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{date}</span>
                  </div>
                )}
                {readTime && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{readTime}</span>
                  </div>
                )}
                {category && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mb-8">
          <ShareButtons title={title} />
        </div>

        {/* Blog Content */}
        {content && (
          <div
            className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
            prose-li:mb-2 prose-li:text-foreground/90
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
            prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg
            prose-img:rounded-lg prose-img:shadow-md
          "
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </article>
    </div>
  );
}
