import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

// GET - отримати всі видимі відгуки
export async function GET() {
  try {
    const result = await sql`
      SELECT id, name, rating, text, created_at 
      FROM testimonials 
      WHERE is_visible = TRUE 
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json(result.rows);
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

    const result = await sql`
      INSERT INTO testimonials (name, rating, text, is_visible) 
      VALUES (${name}, ${rating}, ${text}, FALSE)
      RETURNING id
    `;

    return NextResponse.json({ 
      id: result.rows[0].id,
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

    await sql`
      UPDATE testimonials 
      SET is_visible = ${is_visible} 
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: 'Testimonial updated successfully' });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ 
      error: 'Failed to update testimonial',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE - видалити відгук (для адміна)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 });
    }

    await query(
      `DELETE FROM testimonials WHERE id = ?`,
      [id]
    );

    return NextResponse.json({ 
      success: true,
      message: 'Testimonial deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
