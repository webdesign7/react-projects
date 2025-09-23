'use server';

import saveMeal from "@/lib/meals";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function handleSubmit(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator_email: formData.get('email'),
        creator: formData.get('name'),
    }

    console.log(meal.title);

    if (isInvalidText(meal.title)) {
        return {
            status: 400,
            message: 'Title is required'
        }
    }



    await saveMeal(meal);
    revalidatePath('/meals','layout')
    redirect('/meals');
}