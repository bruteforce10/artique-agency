"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Eye, MessageCircle, Heart, Calendar, Clock } from "lucide-react";
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

export default function BlogDetailSection({ post }) {
  const navbarSectionRef = useNavbarSection("blog-detail-section", false);
  const heroSectionRef = useNavbarSection("blog-hero", true);
  const breadcrumbItems = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: post.title, href: null },
    ],
    [post.title]
  );

  return (
    <div className="min-h-screen bg-background">
      <div
        className="relative w-full h-64 sm:h-96 lg:h-[500px] mb-8"
        ref={heroSectionRef}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
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
          {post.title}
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
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg",
                post.author.avatarColor
              )}
            >
              {post.author.avatar}
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">
                {post.author.name}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {post.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mb-8">
          <ShareButtons title={post.title} />
        </div>

        {/* Blog Content */}
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
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
