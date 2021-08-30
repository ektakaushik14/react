import React, { useEffect } from "react";

export default function Nav() {
  useEffect(() => {
    const a = document.querySelectorAll(".nav div");
    window.addEventListener("mousemove", (e) => {
      a.forEach((nav) => {});
      var x = e.clientX / 2;
      a.forEach((nav) => {
        nav.style.transform = `translateX(-${x}px)`;
      });
    });
  });
  return (
    <div className="nav">
      <div>Home</div>
      <div>About</div>
      <div>Projects</div>
      <div>Contact</div>
    </div>
  );
}
