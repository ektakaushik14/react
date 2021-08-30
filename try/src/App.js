import React, { useEffect } from "react";
import "./App.css";
import Nav from "./Nav";
import Cursor from "./Cursor";
import "./Cursor.css"
export default function App() {
  useEffect(() => {
    let htmlContainer;
    let hlContainer;
    let running = true;
    class HLContainer {
      // Class qui va contenir nos halos lumineux et mettre à jour le style de l'élément HTML
      constructor(p_html) {
        this.container = p_html;
        this.haloLights = [];
        this.direction = 0;
        // On ajoute les halo lumineux au containers
        let nbreOfHalo = random(8, 12);

        // for(let i = 0; i < nbreOfHalo; i++){
        while (this.haloLights.length < nbreOfHalo) {
          this.haloLights.push(new HaloLight());
        }
      }

      update() {
        this.direction += 0.1;

        for (let i = this.haloLights.length - 1; i >= 0; i--) {
          this.haloLights[i].update();
        }
      }
      render() {
        let backgroundStyle = "";

        for (let i = this.haloLights.length - 1; i >= 0; i--) {
          backgroundStyle += this.haloLights[i].gradient;
          backgroundStyle += ", ";
        }
        backgroundStyle +=
          "linear-gradient(" +
          this.direction +
          "deg, rgb(0, 0, 0) 0%, rgb(0, 20, 50) 100%)";

        this.container.style.background = backgroundStyle;
      }
    }

    let random = (min, max, integer = false) => {
      let value = Math.random() * (max - min) + min;
      if (integer) {
        value = Math.round(value);
      }
      return value;
    };
    let radians = (value) => {
      return value * (Math.PI / 180);
    };

    let constrain = (value, min, max) => {
      if (value < min) value = min;
      else if (value > max) value = max;
      return value;
    };
    let update = () => {
      if (running) {
        hlContainer.update();
        hlContainer.render();
      }
    };
    class HaloLight {
      // Class qui représente un halo lumineux
      constructor() {
        this.x = random(0, 100);
        this.y = random(0, 100);

        this.size = random(1, 25);
        // this.speed = random(0.01, 0.1);
        this.speed = (25 - this.size) / 128;

        this.direction = Math.round(Math.random() * 35) + 10;
        this.direction = radians(this.direction);

        this.red = Math.round(Math.random() * 20 + 100);
        this.green = Math.round(Math.random() * 20 + 200);
        this.blue = Math.round(Math.random() * 20 + 235);
        this.alpha = (25 - this.size) / 50;
      }

      update() {
        this.direction += (Math.random() - 0.5) / 10;
        this.direction = constrain(this.direction, radians(12), radians(78));

        this.x += Math.cos(this.direction) * this.speed;
        this.y -= Math.sin(this.direction) * this.speed;

        this.x = this.constrain(this.x);
        this.y = this.constrain(this.y);
      }

      get gradient() {
        // Retourne le 'radial-gradient' (CSS)
        let strGradient = "radial-gradient(";
        strGradient += "circle at " + this.x + "% " + this.y + "%, ";
        strGradient += this.color + " 0%, ";
        strGradient += this.rgba(this.alpha / 2) + " " + this.size / 2 + "%, ";
        strGradient += this.rgba(0) + " " + this.size + "%";
        strGradient += ") ";
        return strGradient;
      }

      get color() {
        // Retourne la couleur en 'rgba' (CSS)
        return (
          "rgba( " +
          this.red +
          ", " +
          this.green +
          ", " +
          this.blue +
          ", " +
          this.alpha +
          ")"
        );
      }

      rgba(p_alpha = 1) {
        // Retourne la couleur en 'rgba' (CSS) avec un alpha différent
        return (
          "rgba( " +
          this.red +
          ", " +
          this.green +
          ", " +
          this.blue +
          ", " +
          p_alpha +
          ")"
        );
      }

      constrain(pos) {
        if (pos > 100 + this.size * 2) {
          pos = -(this.size * 2);
        } else if (pos < -(this.size * 2)) {
          pos = 100 + this.size * 2;
        }
        return pos;
      }
    }
    htmlContainer = document.getElementsByClassName("halo-container")[0];
    hlContainer = new HLContainer(htmlContainer);
    setInterval(update, 30);
    running = true;

    let pause = () => (running = !running);
    let stop = () => (running = false);
    let run = () => (running = true);
  });

  useEffect(() => {
    var cu= document.querySelector(".cursor2");
    document.addEventListener("mouseover", (e)=>{
      var x= e.clientX;
      var y=e.clientY;
      cu.style.left= x+"px";
      cu.style.top= y+"px";
    })
  });

  return (
    <div className="body">
      <main class="halo-container"></main>
      <Nav />
      <Cursor />
    </div>
  );
}
