
import React from "react";
import "../assets/styles/hourglass.css"; // suponiendo que ahí pongas los estilos
import { section } from "framer-motion/client";

export default function Hourglass() {
    return (
        <section className="hourglassSection">
            <div className="hourglassBackground">
                <div className="hourglassContainer">
                    <div className="hourglassCurves"></div>
                    <div className="hourglassCapTop"></div>
                    <div className="hourglassGlassTop"></div>
                    <div className="hourglassSand"></div>
                    <div className="hourglassSandStream"></div>
                    <div className="hourglassCapBottom"></div>
                    <div className="hourglassGlass"></div>
                </div>
            </div>

        </section>
    );
}