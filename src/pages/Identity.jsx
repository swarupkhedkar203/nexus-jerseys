import { useState } from "react";

const questions = [
  {
    title: "How do you play?",
    subtitle: "Choose the style that best represents you.",
    options: [
      { label: "AGGRESSIVE", value: "aggressive", icon: "⚡" },
      { label: "STRATEGIC", value: "strategic", icon: "♟" },
      { label: "FAST", value: "fast", icon: "➤" },
      { label: "DEFENSIVE", value: "defensive", icon: "◈" },
    ],
  },
  {
    title: "What's your energy?",
    subtitle: "Choose the visual energy you want your jersey to carry.",
    options: [
      { label: "DARK", value: "dark", icon: "◐" },
      { label: "ELECTRIC", value: "electric", icon: "✦" },
      { label: "CLEAN", value: "clean", icon: "○" },
      { label: "BOLD", value: "bold", icon: "◆" },
    ],
  },
  {
    title: "What defines you?",
    subtitle: "Pick the identity that feels closest to your game.",
    options: [
      { label: "COMPETITOR", value: "competitor", icon: "🏆" },
      { label: "CREATOR", value: "creator", icon: "✦" },
      { label: "TACTICIAN", value: "tactician", icon: "♟" },
      { label: "CLUTCH", value: "clutch", icon: "★" },
    ],
  },
];

const identities = {
  aggressive: {
    name: "PHANTOM CORE",
    type: "THE AGGRESSOR",
    description:
      "Built for players who take control, push forward and never wait for the game to come to them.",
    tags: ["AGGRESSIVE", "DARK", "COMPETITIVE"],
  },
  strategic: {
    name: "GHOST PROTOCOL",
    type: "THE TACTICIAN",
    description:
      "Designed for players who read the game, control the pace and make every move with purpose.",
    tags: ["STRATEGIC", "CLEAN", "TACTICAL"],
  },
  fast: {
    name: "VELOCITY X",
    type: "THE SPEEDSTER",
    description:
      "Made for players who rely on speed, reaction and relentless momentum to dominate the game.",
    tags: ["FAST", "ELECTRIC", "HIGH ENERGY"],
  },
  defensive: {
    name: "OVERDRIVE",
    type: "THE GUARDIAN",
    description:
      "For players who stay composed under pressure and turn defense into their biggest advantage.",
    tags: ["DEFENSIVE", "BOLD", "RESILIENT"],
  },
};

function Identity() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const currentQuestion = questions[step];

  const handleSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => {
        setStep(step + 1);
      }, 180);
    } else {
      setTimeout(() => {
        const [playstyle, energy, personality] = newAnswers;

        let identity;

        if (playstyle === "aggressive" && energy === "electric") {
          identity = {
            name: "PHANTOM CORE",
            type: "THE AGGRESSOR",
            description:
              "Built for players who attack every moment with intensity, confidence and electric energy.",
            tags: ["AGGRESSIVE", "ELECTRIC", "COMPETITIVE"],
          };
        } else if (playstyle === "strategic" && energy === "clean") {
          identity = {
            name: "GHOST PROTOCOL",
            type: "THE TACTICIAN",
            description:
              "Designed for players who read the game, control the pace and make every move with purpose.",
            tags: ["STRATEGIC", "CLEAN", "TACTICAL"],
          };
        } else if (playstyle === "fast" && energy === "electric") {
          identity = {
            name: "VELOCITY X",
            type: "THE SPEEDSTER",
            description:
              "Made for players who rely on speed, reaction and relentless momentum to dominate the game.",
            tags: ["FAST", "ELECTRIC", "HIGH ENERGY"],
          };
        } else if (playstyle === "defensive" && personality === "tactician") {
          identity = {
            name: "OVERDRIVE",
            type: "THE GUARDIAN",
            description:
              "For players who stay composed under pressure and turn defense into their biggest advantage.",
            tags: ["DEFENSIVE", "TACTICAL", "RESILIENT"],
          };
        } else {
          identity = {
            name: "NEXUS PRIME",
            type: "THE HYBRID",
            description:
              "A balanced identity built around your unique combination of playstyle, energy and personality.",
            tags: [
              playstyle?.toUpperCase(),
              energy?.toUpperCase(),
              personality?.toUpperCase(),
            ],
          };
        }

        setResult(identity);
      }, 180);
    }
  };

  if (result) {
    return (
      <main style={styles.page}>
        <section style={styles.resultSection}>
          <div style={styles.resultLabel}>YOUR NEXUS IDENTITY</div>

          <div style={styles.resultCard}>
            <div style={styles.jerseyVisual}>
              <div style={styles.jerseyGlow}></div>
              <div style={styles.jerseyShape}>
                <span>NEXUS</span>
                <strong>NX</strong>
              </div>
            </div>

            <div style={styles.resultContent}>
              <div style={styles.smallText}>{result.type}</div>

              <h1 style={styles.resultTitle}>{result.name}</h1>

              <p style={styles.resultDescription}>
                {result.description}
              </p>

              <div style={styles.tags}>
                {result.tags.map((tag) => (
                  <span key={tag} style={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={styles.price}>₹1,999</div>

              <div style={styles.buttonRow}>
                <button
                  style={styles.primaryButton}
                  onClick={() => {
                    window.location.href = "/shop";
                  }}
                >
                  VIEW JERSEY →
                </button>

                <button onClick={() => window.location.reload()}>
                  RETAKE
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.identitySection}>
        <div style={styles.topLabel}>THE NEXUS IDENTITY ENGINE</div>

        <div style={styles.progressRow}>
          <span>IDENTITY / 0{step + 1}</span>
          <span>0{questions.length}</span>
        </div>

        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressBar,
              width: `${((step + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div style={styles.questionArea}>
          <div style={styles.questionNumber}>0{step + 1}</div>

          <h1 style={styles.title}>{currentQuestion.title}</h1>

          <p style={styles.subtitle}>{currentQuestion.subtitle}</p>

          <div style={styles.optionsGrid}>
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                style={{
                  ...styles.option,
                  ...(answers[step] === option.value
                    ? styles.optionActive
                    : {}),
                }}
              >
                <span style={styles.optionIcon}>{option.icon}</span>

                <span style={styles.optionLabel}>{option.label}</span>

                <span style={styles.arrow}>↗</span>
              </button>
            ))}
          </div>
        </div>

        <div style={styles.footerText}>
          NEXUS transforms your playstyle into your visual identity.
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#07070a",
    color: "#ffffff",
    fontFamily: "Arial, Helvetica, sans-serif",
    paddingTop: "110px",
  },

  identitySection: {
    width: "min(1100px, 90%)",
    margin: "0 auto",
    padding: "70px 0 80px",
  },

  topLabel: {
    color: "#8f7cff",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "3px",
    marginBottom: "35px",
  },

  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#777b91",
    fontSize: "12px",
    letterSpacing: "2px",
    marginBottom: "10px",
  },

  progressTrack: {
    width: "100%",
    height: "2px",
    background: "#202027",
    marginBottom: "70px",
  },

  progressBar: {
    height: "100%",
    background: "#846cff",
    transition: "width 0.3s ease",
  },

  questionArea: {
    maxWidth: "950px",
  },

  questionNumber: {
    color: "#846cff",
    fontSize: "15px",
    fontWeight: "700",
    marginBottom: "15px",
  },

  title: {
    fontSize: "clamp(48px, 7vw, 90px)",
    lineHeight: "0.95",
    letterSpacing: "-4px",
    margin: "0 0 25px",
    fontWeight: "900",
    textTransform: "uppercase",
  },

  subtitle: {
    color: "#9699aa",
    fontSize: "18px",
    lineHeight: "1.6",
    maxWidth: "650px",
    marginBottom: "55px",
  },

  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
  },

  option: {
    position: "relative",
    minHeight: "150px",
    padding: "28px",
    background: "#111117",
    border: "1px solid #292932",
    borderRadius: "12px",
    color: "#ffffff",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s ease",
  },

  optionActive: {
    border: "1px solid #846cff",
    background: "#171522",
    transform: "translateY(-3px)",
  },

  optionIcon: {
    display: "block",
    color: "#846cff",
    fontSize: "24px",
    marginBottom: "25px",
  },

  optionLabel: {
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  arrow: {
    position: "absolute",
    right: "25px",
    bottom: "22px",
    color: "#777",
    fontSize: "20px",
  },

  footerText: {
    marginTop: "70px",
    color: "#555866",
    fontSize: "13px",
    letterSpacing: "1px",
  },

  resultSection: {
    width: "min(1100px, 90%)",
    margin: "0 auto",
    padding: "70px 0",
  },

  resultLabel: {
    color: "#8f7cff",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "3px",
    marginBottom: "35px",
  },

  resultCard: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "70px",
    alignItems: "center",
    background: "#101016",
    border: "1px solid #282832",
    borderRadius: "18px",
    padding: "50px",
  },

  jerseyVisual: {
    height: "520px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    background: "#0b0b10",
    borderRadius: "12px",
    overflow: "hidden",
  },

  jerseyGlow: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(124, 95, 255, 0.18)",
    filter: "blur(70px)",
  },

  jerseyShape: {
    width: "240px",
    height: "330px",
    background: "linear-gradient(145deg, #202031, #0e0e15)",
    clipPath:
      "polygon(18% 0, 38% 10%, 62% 10%, 82% 0, 100% 23%, 82% 37%, 82% 100%, 18% 100%, 18% 37%, 0 23%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
  },

  resultContent: {
    padding: "20px 0",
  },

  smallText: {
    color: "#8f7cff",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "3px",
    marginBottom: "15px",
  },

  resultTitle: {
    fontSize: "clamp(48px, 6vw, 78px)",
    lineHeight: "0.95",
    letterSpacing: "-3px",
    margin: "0 0 25px",
    fontWeight: "900",
  },

  resultDescription: {
    color: "#9295a5",
    fontSize: "17px",
    lineHeight: "1.7",
    maxWidth: "480px",
    marginBottom: "30px",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "30px",
  },

  tag: {
    border: "1px solid #30303a",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "11px",
    letterSpacing: "1px",
    color: "#b8b9c5",
  },

  price: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "30px",
  },

  buttonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  primaryButton: {
    border: "none",
    background: "#8068ff",
    color: "#ffffff",
    padding: "16px 25px",
    borderRadius: "7px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    cursor: "pointer",
  },

  secondaryButton: {
    background: "transparent",
    color: "#ffffff",
    border: "1px solid #383842",
    padding: "16px 25px",
    borderRadius: "7px",
    fontWeight: "800",
    cursor: "pointer",
  },
};

export default Identity;