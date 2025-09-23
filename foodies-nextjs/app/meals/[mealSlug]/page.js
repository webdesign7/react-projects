import React from 'react';
import classes from './page.module.css';
import Image from "next/image";
import {getMeal} from "@/lib/meals";
import {notFound} from "next/navigation";


export async function generateMetadata({params}) {
    const meal =  getMeal(params.mealSlug);

    if (!meal) {
        notFound();
    }

    return {
        title: meal.title,
    }
}

export default async function MealDetailsPage({ params }) {
    params = await params;
    const meal =  getMeal(params.mealSlug);

    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={`https://react-meals-project.s3.eu-west-2.amazonaws.com/${meal.image}`} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>
                        {meal.creator}
                        </a>
                    </p>
                    <p className={classes.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions,
                }}
                >

                </p>
            </main>
        </>
  );
}
