import { NextResponse } from "next/server";
import { gql, GraphQLClient } from "graphql-request";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cmguqxtwt008w07w963j4v364/master";
const graphQLClient = new GraphQLClient(HYGRAPH_ENDPOINT);

export async function GET(request, { params }) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  let locale = searchParams.get("locale") || "en";
  if (locale === "id") {
    locale = "id_ID";
  }

  try {
    const cleanSlug = slug.trim();

    // Try direct query first, fallback to fetching all blogs if it fails
    try {
      const query = gql`
        query GetBlog {
          blog(where: {slug: "${cleanSlug}"}, locales: ${locale}) {
            id
            slug
            judulBlog
            createdAt
            minuteRead
            metaDescription
            category
            cover {
              url
            }
            creator {
              avatar {
                url
              }
              nama
            }
            description {
              html
            }
          }
        }
      `;

      const response = await graphQLClient.request(query);

      if (response.blog) {
        return NextResponse.json(response);
      }
    } catch (directQueryError) {
      console.warn(
        "Direct blog query failed, trying alternative approach:",
        directQueryError.message
      );
    }

    // Fallback: Fetch all blogs and filter by slug
    const allBlogsQuery = gql`
      query GetAllBlogs {
        blogs(locales: ${locale}) {
          id
          slug
          judulBlog
          createdAt
          minuteRead
          metaDescription
          category
          cover {
            url
          }
          creator {
            avatar {
              url
            }
            nama
          }
          description {
            html
          }
        }
      }
    `;

    const allBlogsResponse = await graphQLClient.request(allBlogsQuery);
    const blogs = allBlogsResponse.blogs || [];
    const blog = blogs.find((b) => b.slug === cleanSlug);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    console.error("Error details:", {
      message: error.message,
      response: error.response,
      request: error.request,
    });
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
