import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

// GET - отримати всі видимі відгуки
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch testimonials',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST - додати новий відгук
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, rating, text } = body;

    if (!name || !rating || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([{ name, rating, text, is_visible: false }])
      .select();

    if (error) throw error;

    return NextResponse.json({ 
      id: data[0].id,
      message: 'Testimonial submitted successfully. It will be visible after moderation.' 
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    return NextResponse.json({ 
      error: 'Failed to add testimonial',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// PUT - оновити відгук (зробити видимим/невидимим)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, is_visible } = body;

    if (!id || typeof is_visible !== 'boolean') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('testimonials')
      .update({ is_visible })
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Testimonial updated successfully' });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ 
      error: 'Failed to update testimonial',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE - видалити відгук
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 });
    }

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ 
      error: 'Failed to delete testimonial',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
