import Head from "next/head";
import fetch from "node-fetch";
import { useState, useEffect } from "react";
import MenuSection from "@/components/menu/MenuSection";
import Link from "next/link";

const Layout = () => {
    const [MenuData, setMenuData] = useState(null);

    useEffect(async () => {
        await fetch("http://localhost:3000/api/getMenuData")
            .then((result) => {
                setMenuData(result);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <Head>
                <title>FIRST DATA</title>
                <meta
                    name="description"
                    content="first data è l'applicazione web per la gestione dei tuoi dati e contenuti online"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <Link href="/">
                    <h1>
                        <span className="First-Data-Label">FIRST DATA</span>
                    </h1>
                </Link>
            </header>
            <main>
                <div className="bkgEffect"></div>
                <img className="bkgLogo" src="Img/LogoFirstDataTemp.png" />

                <nav className="HomeNav NavLeft">
                    <ul>
                        {/* Renderizza i menu di navigazione solo se i dati del menu sono disponibili */}
                        {MenuData &&
                            MenuData.filter((item) => item.IsLeft).map(
                                (item, index) => (
                                    <MenuSection
                                        key={index}
                                        verticalOrder={index + 1}
                                        PrevLevel={0}
                                        baseSection={item}
                                    ></MenuSection>
                                )
                            )}
                    </ul>
                </nav>

                <nav className="HomeNav NavRight">
                    <ul>
                        {/* Renderizza i menu di navigazione solo se i dati del menu sono disponibili */}
                        {MenuData &&
                            MenuData.filter((item) => !item.IsLeft).map(
                                (item, index) => (
                                    <MenuSection
                                        key={index}
                                        verticalOrder={index + 1}
                                        PrevLevel={0}
                                        baseSection={item}
                                    ></MenuSection>
                                )
                            )}
                    </ul>
                </nav>
            </main>
        </>
    );
};

export default Layout;
