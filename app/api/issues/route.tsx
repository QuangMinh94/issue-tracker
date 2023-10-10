import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Desciption is required')
})

export async function POST(request: NextRequest) {
    const response = await request.json();
    const validation = createIssueSchema.safeParse(response)
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