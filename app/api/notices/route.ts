import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
    const limit = Number(request.nextUrl.searchParams.get("limit") ?? 6);
    const keyword = request.nextUrl.searchParams.get("keyword") ?? "";
    const category = request.nextUrl.searchParams.get("category") ?? "";
    const species = request.nextUrl.searchParams.get("species") ?? "";
    const locationId = request.nextUrl.searchParams.get("locationId") ?? "";
    const sex = request.nextUrl.searchParams.get("sex") ?? "";
    const byPopularity =
      request.nextUrl.searchParams.get("byPopularity") ?? undefined;
    const byPrice = request.nextUrl.searchParams.get("byPrice") ?? undefined;

    const res = await api("/notices", {
      params: {
        page,
        limit,
        ...(keyword !== "" && { keyword }),
        ...(category !== "" && { category }),
        ...(species !== "" && { species }),
        ...(locationId !== "" && { locationId }),
        ...(sex !== "" && { sex }),
        ...(byPopularity !== undefined && { byPopularity }),
        ...(byPrice !== undefined && { byPrice }),
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
