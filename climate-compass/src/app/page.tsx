 "use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [place, setPlace]= useState("Delhi");

  const weatherApiKey =process.env.NEXT_PUBLIC_APLI_KEY;

   const getWeatherData= async()=>{
    
    // https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=weatherApiKey

    if (place && place.length>0){
     try{
        let url=` https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${weatherApiKey}`;
        let result= await fetch(url);
        let data= await result.json();
        console.log("Get response",data);
         }
      catch(err){
           console.log(err);
                }}
    else {console.log("Enter a place first")};
              
   }

   useEffect(()=>{
    getWeatherData();
   },[])
  return (
   
    <div>
      <h1>hiiiiii</h1>
    </div>
  );
}
