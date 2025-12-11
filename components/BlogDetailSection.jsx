"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
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
  const content = blog?.description || null;
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
        <img
          src={coverImage}
          alt={title}
          className="object-cover w-full h-full"
          style={{ objectFit: 'cover' }}
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
                <img
                  src={creatorAvatar}
                  alt={creatorNama}
                  className="object-cover w-full h-full"
                  style={{ objectFit: 'cover' }}
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

        {/* Blog Content (Hygraph Rich Text) */}
        {content?.raw?.children && (
          <div className="space-y-4 text-foreground">
            {content.raw.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemindex) =>
                getContentFragment(itemindex, item.text, item)
              );
              return getContentFragment(index, children, typeObj, typeObj.type);
            })}
          </div>
        )}
      </article>
    </div>
  );
}

// Util untuk render Hygraph Rich Text
const getContentFragment = (index, text, obj, type) => {
  let modifiedText = text;

  if (obj) {
    if (obj.bold) {
      modifiedText = <b key={index}>{text}</b>;
    }

    if (obj.italic) {
      modifiedText = <em key={index}>{text}</em>;
    }

    if (obj.underline) {
      modifiedText = <u key={index}>{text}</u>;
    }

    if (obj.code) {
      modifiedText = (
        <code
          className="bg-[#366da0] text-white py-[.5px] px-[5px] rounded-md"
          key={index}
        >
          {text}
        </code>
      );
    }
  }

  switch (type) {
    case "heading-three":
      return (
        <h3 key={index} className="text-2xl text-white font-medium mt-12 mb-4">
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h3>
      );

    case "paragraph":
      return (
        <p key={index} className="mb-8 leading-relaxed">
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </p>
      );

    case "heading-four":
      return (
        <h4 key={index} className="text-xl text-white font-medium mb-4">
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h4>
      );

    case "bulleted-list":
      return (
        <ul key={index} className="list-disc space-y-2 mb-6 ml-4">
          {obj.children?.map((item, i) => (
            <li key={i}>{item.children?.[0]?.children?.[0]?.text}</li>
          ))}
        </ul>
      );

    case "numbered-list":
      return (
        <ol key={index} className="list-decimal space-y-2 mb-6 ml-4">
          {obj.children?.map((item, i) => (
            <li key={i}>{item.children?.[0]?.children?.[0]?.text}</li>
          ))}
        </ol>
      );

    case "image":
      return (
        <img
          key={index}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
          className="mb-4"
        />
      );

    case "code-block":
      return (
        <div className="mockup-code text-white mb-6" key={index}>
          {modifiedText.map((item, i) => {
            const language = item.split("&");
            return (
              <React.Fragment key={i}>
                {language.map((line, j) => (
                  <pre key={j}>
                    <code>{line}</code>
                  </pre>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      );

    default:
      return modifiedText;
  }
};
