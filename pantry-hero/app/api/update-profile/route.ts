// app/api/update-profile/route.ts
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    
    if (!authData?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { email, allergy } = body;
    
    if (!email || email !== authData.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user = await prisma.user.findFirst({
      where: { email }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const validAllergies = ["gluten", "egg", "milk", "nuts", "shellfish", "soy", "sesame"];
    const sanitizedAllergies = Array.isArray(allergy) 
      ? allergy.filter(item => validAllergies.includes(item)) 
      : [];
    
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { 
        allergy: sanitizedAllergies
      },
    });
    let parsed = JSON.stringify(updated, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    );
    
    return NextResponse.json({ success: true, user: parsed });
  } catch (error) {
    console.error('Error details:', error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      name: error.name
    } : 'Unknown error');
    
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to update user' 
    }, { status: 500 });
  }
}