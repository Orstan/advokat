import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

// GET - Отримання всіх досягнень
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('GET achievements error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Додавання нового досягнення
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;

    if (!title || !description || !imageFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const imageBuffer = await imageFile.arrayBuffer();
    const imageName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;

    const { error: uploadError } = await supabase.storage
      .from('achievements')
      .upload(imageName, imageBuffer, {
        contentType: imageFile.type,
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('achievements')
      .getPublicUrl(imageName);

    const { data, error } = await supabase
      .from('achievements')
      .insert([{ title, description, image_url: publicUrl }])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });

  } catch (error: any) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Оновлення досягнення
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;
    const oldImageUrl = formData.get('oldImageUrl') as string;

    if (!id || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let imageUrl = oldImageUrl;

    if (imageFile) {
      if (oldImageUrl) {
        const oldImageName = oldImageUrl.split('/').pop();
        if (oldImageName) {
          await supabase.storage
            .from('achievements')
            .remove([oldImageName]);
        }
      }

      const imageBuffer = await imageFile.arrayBuffer();
      const imageName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;

      const { error: uploadError } = await supabase.storage
        .from('achievements')
        .upload(imageName, imageBuffer, {
          contentType: imageFile.type,
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('achievements')
        .getPublicUrl(imageName);

      imageUrl = publicUrl;
    }

    const { error } = await supabase
      .from('achievements')
      .update({ title, description, image_url: imageUrl })
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({
      id: parseInt(id, 10),
      title,
      description,
      image_url: imageUrl,
    });
  } catch (error: any) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Видалення досягнення
export async function DELETE(req: Request) {
  try {
    const { id, imageUrl } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing achievement ID' }, { status: 400 });
    }

    if (imageUrl) {
      const imageName = imageUrl.split('/').pop();
      if (imageName) {
        await supabase.storage
          .from('achievements')
          .remove([imageName]);
      }
    }

    const { error } = await supabase
      .from('achievements')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Achievement deleted successfully' });
  } catch (error: any) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
