import React, {useEffect, useState} from "react";
import {createClient} from "pexels";

import {getQuote} from "../api/motivationalQuoteApi";

import "../stylesheets/App.css";

/*
     ^
    /!\
    ---
    WARNING: ONLY FOR LOCAL HOSTING OF THE APP! DO NOT SHARE API KEY WITH THE PUBLIC (GITHUB, ETC.)!
    INSECURE: API KEYS SHOULD NORMALLY BE STORED AS ENV VARIABLES BUT THIS APP WAS MADE FOR LOCAL HOSTING.
*/
const client = createClient("YOUR_API_KEY"); // get api key here: https://www.pexels.com/api/new/

export default function App(): JSX.Element {
    const [quote, setQuote] = useState("");
    const [img, setImg] = useState("");
    const [time, setTime] = useState(0);

    useEffect(() => {
        function setQuoteData(): void {
            getQuote().then((data) => {
                // @ts-ignore
                setQuote(data["quote"]);
                // @ts-ignore
                window.localStorage["motivationalQuote"] = data["quote"];
            });
        }

        function setImgData(): void {
            client.photos.search({
                query: "Nature",
            }).then((data) => {
                // @ts-ignore
                const selection: number = Math.floor(Math.random() * data["photos"].length);
                // @ts-ignore
                setImg(data["photos"][selection]["src"]["large"]);
                // @ts-ignore
                window.localStorage["imgUrl"] = data["photos"][selection]["src"]["large"];
            });
        }

        // only refresh once per day
        if (new Date().getDate() !== Number.parseInt(window.localStorage["day"])) {
            setQuoteData();
            setImgData();
            window.localStorage["day"] = new Date().getDate();
        } else {
            setQuote(window.localStorage["motivationalQuote"]);
            setImg(window.localStorage["imgUrl"]);
        }

        setInterval(() => {
            let d: Date = new Date();
            let h: number = d.getHours();
            let m: number = d.getMinutes();
            let s: number = d.getSeconds();
            let minutesUntilEndOfDay: number = Math.floor(((24*60*60) - (h*60*60) - (m*60) - s) / 60);
            setTime(minutesUntilEndOfDay);
        }, 1000);
    }, []);

    return (
        <>
            <div id={"main"}>
                <h2 id={"quote"}>{quote}.</h2>
                <img id={"img"} alt={"Image"} src={img}/>
                <h3>TIME LEFT UNTIL REFRESH: {time} minutes</h3>
            </div>
        </>
    );
};