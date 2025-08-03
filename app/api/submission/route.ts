import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {

  const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/2e979232-92fd-4012-97cf-3e9177257d10',
  params: {
    base64_encoded: 'true',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': '2e38c51e6fmsh109867f94783bf3p13dcdejsn5f7b13b816a0',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}