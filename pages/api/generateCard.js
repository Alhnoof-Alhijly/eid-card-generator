import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { Name, Kind, CheckCard, cardType } = req.body;

    const imagesPath = path.join(process.cwd(), 'public', 'images');
    const uploadPath = path.join(process.cwd(), 'public', 'img', 'Upload');

    let filePath;
    if (cardType === '1') {
        filePath = path.join(imagesPath, CheckCard === 'on' ? 'eid-4-2024.jpg' : 'eid-1-2024.jpg');
    } else if (cardType === '2') {
        filePath = path.join(imagesPath, CheckCard === 'on' ? 'eid-3-2024.jpg' : 'eid-2-2024.jpg');
    }

    const bitmap = await loadImage(filePath);
    const canvas = createCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);

    ctx.font = ' 80px ';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';

    ctx.fillText(Name, bitmap.width / 2, bitmap.height - 500);
    ctx.font = ' 80px ';
    ctx.fillText(Kind, bitmap.width / 2, bitmap.height - 550);

    const uniqueFileName = `${uuidv4()}_${Name}.jpg`;
    const fullPathSaveFile = path.join(uploadPath, uniqueFileName);
    const out = fs.createWriteStream(fullPathSaveFile);
    const stream = canvas.createJPEGStream();
    stream.pipe(out);

    out.on('finish', () => {
        res.status(200).json({ image: uniqueFileName, name: Name });
    });

    out.on('error', (err) => {
        res.status(500).json({ message: 'Image generation failed', error: err });
    });
}