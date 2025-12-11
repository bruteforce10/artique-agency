"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Search, MoreVertical } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useNavbarSection } from "./NavbarContext";

export default function BlogListClient({
  blogs,
  categories: initialCategories,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const navbarSectionRef = useNavbarSection("blog-section", false);

  // Extract unique categories from blogs
  const categories = useMemo(() => {
    const cats = [
      "All",
      ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
    ];
    return cats;
  }, [blogs]);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    return blogs.filter((post) => {
      const matchesSearch =
        post.judulBlog?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.metaDescription?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, blogs]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Format read time
  const formatReadTime = (minutes) => {
    if (!minutes) return "";
    return `${minutes} min read`;
  };

  // Get author initials from nama or title or use default
  const getAuthorInitials = (nama, title) => {
    if (nama) {
      // Use first letter of creator name
      return nama.charAt(0).toUpperCase();
    }
    if (title) {
      return title.charAt(0).toUpperCase();
    }
    return "A";
  };

  // Generate avatar color based on nama or title
  const getAvatarColor = (nama, title) => {
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
    const source = nama || title || "";
    if (!source) return colors[0];
    const index = source.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <section
      className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16"
      ref={navbarSectionRef}
    >
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-muted-foreground">
        Showing {currentPosts.length} of {filteredPosts.length} posts
      </div>

      {/* Blog Posts Grid */}
      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentPosts
            .filter((post) => post.slug) // Filter out posts without slug
            .map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                formatDate={formatDate}
                formatReadTime={formatReadTime}
                getAuthorInitials={getAuthorInitials}
                getAvatarColor={getAvatarColor}
              />
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No posts found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      size="icon"
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}

// Blog Card Component
function BlogCard({
  post,
  formatDate,
  formatReadTime,
  getAuthorInitials,
  getAvatarColor,
}) {
  // Ensure slug is valid - it should always come from API
  if (!post.slug || typeof post.slug !== "string" || post.slug.trim() === "") {
    console.error("Blog post missing or invalid slug:", post);
    return null;
  }

  const slug = post.slug.trim();
  const title = post.judulBlog || "";
  const excerpt = post.metaDescription || "";
  const imageUrl = post.cover?.url || "/bg-blog.webp";
  const date = formatDate(post.createdAt);
  const readTime = formatReadTime(post.minuteRead);

  // Get creator info from API
  const creatorAvatar = post.creator?.avatar?.url;
  const creatorNama = post.creator?.nama || "Artique Agency";
  const authorInitials = getAuthorInitials(creatorNama, title);
  const avatarColor = getAvatarColor(creatorNama, title);

  return (
    <Link href={`/blog/${slug}`} prefetch={true}>
      <article className="bg-white rounded-lg max-h-[450px] min-h-[400px] shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        {/* Header Image with Overlay Text */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Card Content */}
        <div className="p-5">
          {/* Author and Metadata */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {creatorAvatar ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={creatorAvatar}
                    alt={creatorNama}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm",
                    avatarColor
                  )}
                >
                  {authorInitials}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-foreground">
                  {creatorNama}
                </p>
                <p className="text-xs text-muted-foreground">
                  {date && readTime
                    ? `${date} • ${readTime}`
                    : date || readTime || ""}
                </p>
              </div>
            </div>
            <button className="text-muted-foreground hover:text-foreground">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
