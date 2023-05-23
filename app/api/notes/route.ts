import { zUserNote } from "@/app/notes/type"
import { prisma } from "@/globals/db"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET() {
  const notes = await prisma.note.findMany()
  return NextResponse.json(notes)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const parsedData = zUserNote.parse(data)
  const note = await prisma.note.create({
    data: { title: parsedData.title, body: parsedData.body },
  })
  return NextResponse.json(`${note.id}`, { status: 201 })
}
