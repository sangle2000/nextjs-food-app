import classes from "./meals-grid.module.css"
import MealItem from "@/components/meals/meal-item";
import {MealItemType} from "@/utils/Type";

export default function MealGrid({ meals }: { meals: MealItemType[] }) {
    return (
        <ul className={classes.meals}>
            {meals.map(meal => (
                <li key={meal.id}>
                    <MealItem {...meal}/>
                </li>
            ))}
        </ul>
    )
}