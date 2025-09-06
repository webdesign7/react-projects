import sql from 'better-sqlite3';
import xss from 'xss';
import slugify from 'slugify';
import fs from 'node:fs'
import { Buffer } from 'node:buffer'; // Use Node's Buffer
import { S3 } from '@aws-sdk/client-s3'
const db = sql('meals.db');

const s3 = new S3({
    region: 'eu-west-2'
});

export async function getMeals() {
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export default async function saveMeal(meal) {
    meal.slug = slugify(meal.title);
    const extension = meal.image.name.split('.').pop();
    const filename = `${meal.slug}.${extension}`;

    // Ensure the images directory exists
    //await fs.promises.mkdir('public/images', { recursive: true });

    // Convert the web ArrayBuffer to a Node Buffer and write the file
    const arrayBuffer = await meal.image.arrayBuffer();
    //const buffer = Buffer.from(arrayBuffer);
    //await fs.promises.writeFile(`public/images/${filename}`, buffer);


    await s3.putObject({
        Bucket: 'react-meals-project',
        Key: filename,
        Body: Buffer.from(arrayBuffer),
        ContentType: meal.image.type,
    });

    meal.image = filename;

    return db
        .prepare(
            'INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) ' +
            'VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)'
        )
        .run(meal);
}
