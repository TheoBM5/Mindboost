import React from "react";
import './Planet.css'

function Planet() {
  return (
    <>
        <div
        className="container-planet"
        style={{
          '--size': '150px',
          '--texture': 'linear-gradient(#ea6043, #c38b80)',
          '--border-width': 'calc(150px * 0.06)',
          left: "10%",
          top: "10%",
        }}
      ></div>
      <div
        className="container-planet"
        style={{
          '--size': '200px',
          '--texture': 'radial-gradient(200% 100% at 50% 105%, #81ADA8 10%, #28B0E2 15% 30%, #25BEF5 35% 75%, #28B0E2 80% 88%, #81ADA8 100%)',
          '--border-width': 'calc(200px * 0.06)',
          left: "80%"
        }}
      ></div>
      <div
        className="container-planet"
        style={{
          '--size': '250px',
          '--texture': 'radial-gradient(210% 100% at 50% 95%, #A4A091 10%, #BBAD96 12% 22%, #CEC3B7 27% 30%, #DDDAD2 32% 33%, #CEC3B7 34% 40%, #DDDAD2 42% 50%, #CEC3B7 52% 58%, #BEB1A1 60% 70%, #C1AE97 72% 82%, #ABA590 84%',
          '--border-width': 'calc(200px * 0.06)',
          left: "15%",
          top: "10%",
        }}
      ></div>
    </>
  )
}

export default Planet