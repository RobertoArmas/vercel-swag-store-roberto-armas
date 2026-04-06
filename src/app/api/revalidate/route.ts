import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { tags } = (await req.json()) as { tags?: string[] };
    const revalidateTagToken = req.headers.get("X-Revalidate-Token");

    if (
      !revalidateTagToken ||
      process.env.REVALIDATE_TAG_TOKEN !== revalidateTagToken
    ) {
      return NextResponse.json(
        { error: "Invalid tag. Expected non-empty string." },
        { status: 400 }
      );
    }

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { error: "Invalid tag. Expected non-empty string." },
        { status: 400 }
      );
    }

    const normalizedTags = tags.map((tag) => tag.trim());

    for (const tag of normalizedTags) {
      revalidateTag(tag, "max");
    }

    return NextResponse.json({
      ok: true,
      revalidated: true,
      tags: normalizedTags,
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
}
