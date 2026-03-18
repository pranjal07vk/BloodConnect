import { useState, useEffect } from "react";
import "./Welcome.css";

function Welcome({ username, onNext }) {
  const fullText = `Hey ${username}, welcome to BloodConnect. How can we help you?`;
  const [displayText, setDisplayText] = useState("");
  const [done, setDone] = useState(false);
  

  // typing effect
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + fullText[index]);
      index++;

      if (index === fullText.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [fullText]);

return (
 <div className="welcome-page">
    <div className="welcome-card">
        <h2 className="welcome-text">{displayText}</h2>

        <div className="welcome-buttons">
            <button onClick={onNext} disabled={!done}>
                Find a Donor
            </button>

            <button disabled>
                Help Me Donate Blood
            </button>
        </div>
    </div>
 </div>
);
}


export default Welcome;