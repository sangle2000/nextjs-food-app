import fs from 'node:fs';

import sql from "better-sqlite3";
import slugify from 'slugify';
import xss from 'xss';

import {MealItemType} from "@/utils/Type";

const db = sql("meals.db")

export async function getMeals(): Promise<MealItemType[]> {

    // Simulate delay to handle loading
    await new Promise(resolve => setTimeout(resolve, 2000));

    // throw new Error("Meals not found");
    return db.prepare("SELECT * FROM meals").all() as MealItemType[]
}

export function getMeal(slug: string): MealItemType {
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as MealItemType;
}

export async function saveMeal(meal: MealItemType) {
    const imageFile: File = meal.image as File;

    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = imageFile.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await imageFile.arrayBuffer()

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!')
        }
    })

    meal.image = `/images/${fileName}`

    db.prepare(`
        INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal)
}
