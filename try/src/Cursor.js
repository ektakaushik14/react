import React, { useEffect } from "react";
import "./Cursor.css";

export default function Cursor() {
  useEffect(() => {
    var cursor1 = document.querySelector(".cursor1");
    var cursor2 = document.querySelector(".cursor2");
    window.addEventListener("mousemove", (e) => {
      cursor1.style.cssText = cursor2.style.cssText =
        "left:" + e.clientX + "px;top:" + e.clientY + "px;";
    });
  });

  return (
    <div>
      <div className="cursor1"></div>
      <div className="cursor2"></div>
    </div>
  );
}
