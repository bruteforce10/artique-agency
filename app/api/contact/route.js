import { NextResponse } from "next/server";
import { gql, GraphQLClient } from "graphql-request";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cmguqxtwt008w07w963j4v364/master";
const graphQLClient = new GraphQLClient(HYGRAPH_ENDPOINT);

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, description, linkedln } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const mutation = gql`
      mutation CreateContact(
        $firstName: String!
        $lastName: String!
        $email: String!
        $phone: String!
        $description: String!
        $linkedln: String
      ) {
        createContact(
          data: {
            firstName: $firstName
            lastName: $lastName
            email: $email
            phone: $phone
            description: $description
            linkedln: $linkedln
          }
        ) {
          id
        }
      }
    `;

    const variables = {
      firstName,
      lastName,
      email,
      phone,
      description,
      linkedln: linkedln || null,
    };

    const response = await graphQLClient.request(mutation, variables);

    return NextResponse.json(
      { success: true, data: response.createContact },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    console.error("Error details:", {
      message: error.message,
      response: error.response,
    });
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}

