import classes from "./page.module.css"
import Link from "next/link";
import {getMeals} from "@/lib/meals";
import MealGrid from "@/components/meals/meals-grid";
import {MealItemType} from "@/utils/Type";
import {Suspense} from "react";
import MealsLoadingPage from "@/app/meals/loading-out";

export const metadata = {
    title: "All Meals",
    description: "Browse the delicious meals shared by our vibrant community.",
}

async function Meals() {
    const meals: MealItemType[] = await getMeals();

    return <MealGrid meals={meals}/>
}

export default async function MealsPage() {


    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created{' '}
                    <span className={classes.highlight}>
                        by you
                    </span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy and fun!
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share Your Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<MealsLoadingPage/>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}