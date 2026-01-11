import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const dynamic = 'force-dynamic';

// GET - отримати всі видимі відгуки
export async function GET() {
  try {
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_DATABASE:', process.env.DB_DATABASE);
    console.log('DB_PASSWORD exists:', !!process.env.DB_PASSWORD);
    
    const testimonials = await query(
      `SELECT id, name, rating, text, created_at 
       FROM testimonials 
       WHERE is_visible = TRUE 
       ORDER BY created_at DESC`,
      []
    );
    
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json({ 
      error: 'Failed to fetch testimonials',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST - додати новий відгук
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/testimonials - Start');
    const body = await request.json();
    const { name, email, rating, text } = body;
    console.log('Received data:', { name, email, rating, textLength: text?.length });

    if (!name || !rating || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    console.log('Attempting to insert into database...');
    const result: any = await query(
      `INSERT INTO testimonials (name, email, rating, text, is_visible) 
       VALUES (?, ?, ?, ?, TRUE)`,
      [name, email || null, rating, text]
    );
    console.log('Insert successful, ID:', result.insertId);

    return NextResponse.json({ 
      success: true, 
      id: result.insertId,
      message: 'Testimonial added successfully' 
    });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json({ 
      error: 'Failed to add testimonial',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// PUT - оновити видимість відгуку (для адміна)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, is_visible } = body;

    if (!id || is_visible === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await query(
      `UPDATE testimonials SET is_visible = ? WHERE id = ?`,
      [is_visible, id]
    );

    return NextResponse.json({ 
      success: true,
      message: 'Testimonial visibility updated' 
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
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
