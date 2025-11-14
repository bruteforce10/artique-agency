/**
 * Generate slug from title
 * @param {string} title - The blog post title
 * @returns {string} - URL-friendly slug
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Find blog post by slug
 * @param {string} slug - The blog post slug
 * @param {Array} posts - Array of blog posts
 * @returns {Object|null} - Blog post object or null
 */
export function findPostBySlug(slug, posts) {
  return posts.find((post) => generateSlug(post.title) === slug) || null;
}
