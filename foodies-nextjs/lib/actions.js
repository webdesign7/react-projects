'use server';

import saveMeal from "@/lib/meals";
import {redirect} from "next/navigation";

export async function handleSubmit(formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator_email: formData.get('email'),
        creator: formData.get('name'),
    }

    await saveMeal(meal);
    redirect('/meals');
}