import { NextResponse } from "next/server";
import { gql, GraphQLClient } from "graphql-request";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cmguqxtwt008w07w963j4v364/master";
const graphQLClient = new GraphQLClient(HYGRAPH_ENDPOINT);

export async function GET(request) {
  // Get locale from query parameters
  const { searchParams } = new URL(request.url);
  let locale = searchParams.get("locale") || "en";
  if (locale === "id") {
    locale = "id_ID";
  }

  try {
    const query = gql`
     query MyQuery {
  homes(locales: ${locale}) {
    titleHeader
    descriptionHeader
    about
    mision(locales: ${locale}) {
      title
      description
      image(locales: en) {
        url
      }
    }
  }
}
    `;

    const response = await graphQLClient.request(query);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching homes:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
