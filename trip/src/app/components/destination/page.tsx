"use client"; 
import Image from "next/image";
import "./destination.css";

export default function Destination() {
  return (
    <div className="destination-container">
      <h2 className="destination-title">Top destinations!</h2>
      <div className="destination-grid">
        <div className="destination-item">
          <Image
            src="/images/jaipur.png"
            alt="Jaipur"
            className="destination-image"
            width={400}  
            height={600}  
          />
          <p className="destination-name">JAIPUR</p>
        </div>
        <div className="destination-item">
          <Image
            src="/images/goa.png"
            alt="Goa"
            className="destination-image"
            width={400}  
            height={600} 
          />
          <p className="destination-name">GOA</p>
        </div>
        <div className="destination-item">
          <Image
            src="/images/delhi.png"
            alt="Delhi"
            className="destination-image"
            width={400} 
            height={600} 
          />
          <p className="destination-name">DELHI</p>
        </div>
      </div>
    </div>
  );
}