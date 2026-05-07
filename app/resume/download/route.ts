import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

async function readFirstAvailable(paths: string[]) {
  for (const p of paths) {
    try {
      const file = await fs.readFile(p);
      return file;
    } catch {
      // Try next candidate path.
    }
  }
  return null;
}

export async function GET() {
  const cwd = process.cwd();
  const file = await readFirstAvailable([
    path.join(cwd, "data", "Dayyan_Resume.pdf"),
    path.join(cwd, "data", "Resume.pdf"),
    path.join(cwd, "public", "resume.pdf"),
  ]);

  if (!file) {
    return NextResponse.json(
      { error: "Resume file not found. Add it to data/Dayyan_Resume.pdf." },
      { status: 404 },
    );
  }

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Dayyan_Resume.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
