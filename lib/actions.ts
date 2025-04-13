'use server';

import {saveMeal} from "@/lib/meals";
import {MealItemType} from "@/utils/Type";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

function isInvalidText(text: string) {
    return !text || text.trim() === '';
}

export async function shareMeal(state: { message: string | null }, formData: FormData): Promise<{ message: string | null }> {

    const meal = {
        title: formData.get('title') as string,
        summary: formData.get('summary') as string,
        instructions: formData.get('instructions') as string,
        image: formData.get('image') as string | File,
        creator: formData.get('name') as string,
        creator_email: formData.get('email') as string,
    }

    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes("@") ||
        !meal.image ||
        (meal.image as File).size === 0
    ) {
        return {
            message: "Invalid input."
        }
    }

    await saveMeal(<MealItemType>meal);

    revalidatePath("/meals");
    // revalidatePath("/meals", "layout");

    redirect("/meals");
}