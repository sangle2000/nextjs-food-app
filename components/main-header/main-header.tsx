import Link from "next/link";

import LogoImage from "@/assets/logo.png"
import Image from "next/image";
import classes from "./main-header.module.css"
import MainHeaderBackground from "@/components/main-header/main-header-background";
import NavLink from "@/components/main-header/nav-link";

export default function MainHeader() {

    return (
        <>
            <MainHeaderBackground/>

            <header className={classes.header}>
                <Link href="/" className={classes.logo}>
                    <Image
                        src={LogoImage}
                        alt="A plate with food on it"
                        priority
                    />
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href={"/meals"}>
                                Browser Meals
                            </NavLink>
                        </li>
                        <li>
                            <NavLink href={"/community"}>
                                Foodies Community
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}