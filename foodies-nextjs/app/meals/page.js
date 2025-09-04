import React, {Suspense} from 'react';
import classes from './page.module.css';
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import {getMeals} from "@/lib/meals";

async function Meals() {
    const meals = await getMeals();
    return <MealsGrid meals={meals}/>
}

export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>Meals</h1>
                <p>Choose a meal to view details</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Share a Meal</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}> Loading...</p>}>
                    <Meals/>
                </Suspense>
            </main>
        </>
    );
}
