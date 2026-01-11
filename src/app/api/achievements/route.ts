import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable';
import { NextApiRequest } from 'next';

export const dynamic = 'force-dynamic';

// Вимикаємо стандартний body parser, оскільки formidable обробляє тіло запиту
export const config = {
  api: {
    bodyParser: false,
  },
};

// GET - Отримання всіх досягнень
export async function GET() {
  try {
    const results = await query('SELECT * FROM achievements ORDER BY created_at DESC', []);
    return NextResponse.json(results);
  } catch (error: any) {
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

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
    const imagePath = path.join(uploadDir, imageName);
    await fs.writeFile(imagePath, imageBuffer);

    const imageUrl = `/uploads/${imageName}`;

    const sql = 'INSERT INTO achievements (title, description, image_url) VALUES (?, ?, ?)';
    const result: any = await query(sql, [title, description, imageUrl]);

    const newAchievement = {
      id: result.insertId,
      title,
      description,
      image_url: imageUrl,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(newAchievement, { status: 201 });

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
      // Видаляємо старе зображення
      if (oldImageUrl) {
        const oldImagePath = path.join(process.cwd(), 'public', oldImageUrl);
        try {
          await fs.unlink(oldImagePath);
        } catch (e) {
          console.error(`Failed to delete old image: ${oldImagePath}`, e);
        }
      }

      // Завантажуємо нове зображення
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const imageName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
      const imagePath = path.join(uploadDir, imageName);
      await fs.writeFile(imagePath, imageBuffer);
      imageUrl = `/uploads/${imageName}`;
    }

    const sql = 'UPDATE achievements SET title = ?, description = ?, image_url = ? WHERE id = ?';
    await query(sql, [title, description, imageUrl, id]);

    const updatedAchievement = {
      id: parseInt(id, 10),
      title,
      description,
      image_url: imageUrl,
    };

    return NextResponse.json(updatedAchievement);
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

    // Видаляємо зображення з сервера
    if (imageUrl) {
      const imagePath = path.join(process.cwd(), 'public', imageUrl);
      try {
        await fs.unlink(imagePath);
      } catch (fsError) {
        console.error(`Failed to delete image file: ${imagePath}`, fsError);
        // Не блокуємо видалення з БД, якщо файл не знайдено
      }
    }

    // Видаляємо запис з бази даних
    const sql = 'DELETE FROM achievements WHERE id = ?';
    await query(sql, [id]);

    return NextResponse.json({ message: 'Achievement deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
