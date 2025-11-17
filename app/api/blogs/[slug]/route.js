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

    // Query sederhana: langsung berdasarkan slug dan locale
    const query = gql`
      query MyQuery {
        blog(where: { slug: "${cleanSlug}" }, locales: ${locale}) {
          judulBlog
          id
          slug
          createdAt
          minuteRead
          creator {
            nama
            avatar {
              url
            }
          }
          cover {
            url
          }
          description {
            raw
          }
          metaDescription
          category
        }
      }
    `;

    const response = await graphQLClient.request(query);

    if (!response.blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Kembalikan response sederhana dengan blog langsung
    return NextResponse.json({ blog: response.blog });
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
