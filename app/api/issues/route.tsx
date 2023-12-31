import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({}, { status: 401 })

    const response = await request.json();
    const validation = issueSchema.safeParse(response)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const newIssue = await prisma.issue.create({
        data: {
            title: response.title,
            description: response.description
        }
    })
    return NextResponse.json(newIssue, { status: 201 })
}