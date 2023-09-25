import style from "@/styles/graph.module.css";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import MenuSection from "@/components/menu/MenuSection";
import { RiMenu2Fill, RiMenu3Fill, RiMoneyEuroBoxFill } from "react-icons/ri";
import Tabs from "@/components/Tabs/tabs";
import AcquistiPerMese from "@/components/Tabs/AcquistiPerMese";
import BarChart from "@/components/charts/BarChart";

export const getServerSideProps = async () => {
    const response = await fetch("http://localhost:3000/api/getMenuData");
    const responseOfCentralLabel = await fetch(
        "http://localhost:3000/api/getCentralLabelHome"
    );
    const menu_data = await response.json();
    const labelhome_data = await responseOfCentralLabel.json();

    const data = {
        menu_data: menu_data,
        labelhome_data: labelhome_data,
    };

    return {
        props: {
            data,
        },
    };
};

export default function testgraph({ data }) {
    const [isOpenLeftMenu, setIsOpenLeftMenu] = useState(false);
    const [isOpenRightMenu, setIsOpenRightMenu] = useState(false);

    const handleLeftMenu = () => {
        setIsOpenLeftMenu(isOpenLeftMenu ? false : true);
    };

    const handleRightMenu = () => {
        setIsOpenRightMenu(isOpenRightMenu ? false : true);
    };

    const tabData = [
        { label: "Tab 1", content: <AcquistiPerMese /> },
        { label: "Tab 2", content: "Contenuto Tab 2" },
        // Aggiungi altri tabs qui se necessario
    ];

    useEffect(() => {}, []);

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
                <h1>
                    <span
                        style={{
                            float: "left",
                            fontSize: "2rem",
                            marginTop: "15px",
                        }}
                        onClick={handleLeftMenu}
                    >
                        <RiMenu2Fill />
                    </span>
                    {/* da cambiare */}
                    <span class="First-Data-Label">FIRST DATA</span>
                    <span
                        style={{
                            float: "right",
                            fontSize: "2rem",
                            marginTop: "15px",
                        }}
                        onClick={handleRightMenu}
                    >
                        <RiMenu3Fill />
                    </span>
                    {/* da cambiare */}
                </h1>

                <div class="bkgEffect"></div>
                <img class="bkgLogo" src="Img/LogoFirstDataTemp.png" />

                {isOpenLeftMenu && (
                    <nav class="HomeNav NavLeft">
                        <ul>
                            {data.menu_data
                                .filter((item) => item.IsLeft)
                                .map((item, index) => (
                                    <MenuSection
                                        verticalOrder={index + 1}
                                        PrevLevel={0}
                                        baseSection={item}
                                    ></MenuSection>
                                ))}
                        </ul>
                    </nav>
                )}

                {isOpenRightMenu && (
                    <nav class="HomeNav NavRight">
                        <ul>
                            {data.menu_data
                                .filter((item) => !item.IsLeft)
                                .map((item, index) => (
                                    <MenuSection
                                        verticalOrder={index + 1}
                                        PrevLevel={0}
                                        baseSection={item}
                                    ></MenuSection>
                                ))}
                        </ul>
                    </nav>
                )}
            </header>
            <main>
                {/* prima sezione */}
                <div className={style.GraphSection}>
                    <div className={style.GraphSectionSubSection}>
                        <label for="Periodo">Periodo</label>
                        <br />
                        <select name="Periodo" id="Periodo">
                            <option value="1">1 mese</option>
                            <option value="2">2 mesi</option>
                            <option value="3">6 mesi</option>
                            <option value="4">1 anno</option>
                        </select>
                    </div>
                    <div className={style.GraphSectionSubSection}>
                        <label for="Periodo">Periodo</label>
                        <br />
                        <select name="Periodo" id="Periodo">
                            <option value="1">1 mese</option>
                            <option value="2">2 mesi</option>
                            <option value="3">6 mesi</option>
                            <option value="4">1 anno</option>
                        </select>
                    </div>

                    <div className={style.GraphSectionSubSection}>
                        <label for="Periodo">Periodo</label>
                        <br />
                        <select name="Periodo" id="Periodo">
                            <option value="1">1 mese</option>
                            <option value="2">2 mesi</option>
                            <option value="3">6 mesi</option>
                            <option value="4">1 anno</option>
                        </select>
                    </div>
                    <div className={style.GraphSectionSubSection}>
                        <label for="Periodo">Periodo</label>
                        <br />
                        <select name="Periodo" id="Periodo">
                            <option value="1">1 mese</option>
                            <option value="2">2 mesi</option>
                            <option value="3">6 mesi</option>
                            <option value="4">1 anno</option>
                        </select>
                    </div>
                </div>
                {/* seconda sezione */}
                <div className={style.GraphSection}>
                    <div className={style.GraphSectionSubSection}>
                        <span>
                            <RiMoneyEuroBoxFill />
                        </span>
                        <div>
                            <p>Fatturato complessivo</p>
                            <b>883.17</b> EUR
                        </div>
                    </div>
                    <div className={style.GraphSectionSubSection}>
                        <span>
                            <RiMoneyEuroBoxFill />
                        </span>
                        <div>
                            <p>Fatturato complessivo</p>
                            <b>883.17</b> EUR
                        </div>
                    </div>
                    <div className={style.GraphSectionSubSection}>
                        <span>
                            <RiMoneyEuroBoxFill />
                        </span>
                        <div>
                            <p>Fatturato complessivo</p>
                            <b>883.17</b> EUR
                        </div>
                    </div>
                </div>
                {/* tab sezione */}
                <div className={style.GraphSection}>
                    <Tabs data={tabData} />
                </div>
                {/* graph sezione */}
                <div></div>
            </main>
        </>
    );
}
