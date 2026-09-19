"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useState } from "react";

type ResearchSource = {
  title: string;
  url: string;
};

function formatInline(text: string): ReactNode[] {
  const pattern =
    /(\*\*.*?\*\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;

  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    const linkMatch = part.match(
      /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/
    );

    if (linkMatch) {
      const [, label, url] = linkMatch;

      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#78e5ca",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            fontWeight: 700,
          }}
        >
          {label}
        </a>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function isTableLine(line: string) {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function isSeparatorLine(line: string) {
  const cleaned = line
    .replace(/\|/g, "")
    .replace(/:/g, "")
    .replace(/-/g, "")
    .trim();

  return cleaned === "";
}

function parseTableRow(line: string) {
  return line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function renderAnswer(text: string) {
  const lines = text.split("\n");
  const elements: ReactNode[] = [];

  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (isTableLine(line)) {
      const tableLines: string[] = [];

      while (index < lines.length && isTableLine(lines[index])) {
        tableLines.push(lines[index]);
        index += 1;
      }

      const rows = tableLines
        .filter((row) => !isSeparatorLine(row))
        .map(parseTableRow);

      if (rows.length > 0) {
        const header = rows[0];
        const body = rows.slice(1);

        elements.push(
          <div
            key={`table-${index}`}
            style={{
              overflowX: "auto",
              marginTop: 22,
              marginBottom: 28,
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 16,
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 620,
              }}
            >
              <thead
                style={{
                  background: "rgba(109,224,194,.08)",
                }}
              >
                <tr>
                  {header.map((cell, cellIndex) => (
                    <th
                      key={cellIndex}
                      style={{
                        textAlign: "left",
                        padding: "14px 16px",
                        borderBottom:
                          "1px solid rgba(255,255,255,.14)",
                        fontSize: 14,
                      }}
                    >
                      {formatInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {body.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        style={{
                          padding: "14px 16px",
                          borderBottom:
                            "1px solid rgba(255,255,255,.07)",
                          verticalAlign: "top",
                          lineHeight: 1.65,
                        }}
                      >
                        {formatInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

        continue;
      }
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h2
          key={`h1-${index}`}
          style={{
            marginTop: 32,
            marginBottom: 14,
            fontSize: "clamp(27px, 4vw, 34px)",
            lineHeight: 1.2,
          }}
        >
          {formatInline(line.slice(2))}
        </h2>
      );

      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h3
          key={`h2-${index}`}
          style={{
            marginTop: 28,
            marginBottom: 12,
            fontSize: 24,
            lineHeight: 1.3,
          }}
        >
          {formatInline(line.slice(3))}
        </h3>
      );

      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h4
          key={`h3-${index}`}
          style={{
            marginTop: 24,
            marginBottom: 9,
            fontSize: 19,
            lineHeight: 1.35,
          }}
        >
          {formatInline(line.slice(4))}
        </h4>
      );

      index += 1;
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];

      while (
        index < lines.length &&
        (lines[index].trim().startsWith("- ") ||
          lines[index].trim().startsWith("* "))
      ) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }

      elements.push(
        <ul
          key={`ul-${index}`}
          style={{
            paddingLeft: 24,
            marginTop: 12,
            marginBottom: 22,
            lineHeight: 1.8,
          }}
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{formatInline(item)}</li>
          ))}
        </ul>
      );

      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];

      while (
        index < lines.length &&
        /^\d+\.\s/.test(lines[index].trim())
      ) {
        items.push(
          lines[index].trim().replace(/^\d+\.\s/, "")
        );

        index += 1;
      }

      elements.push(
        <ol
          key={`ol-${index}`}
          style={{
            paddingLeft: 26,
            marginTop: 12,
            marginBottom: 22,
            lineHeight: 1.8,
          }}
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{formatInline(item)}</li>
          ))}
        </ol>
      );

      continue;
    }

    elements.push(
      <p
        key={`p-${index}`}
        style={{
          marginTop: 9,
          marginBottom: 15,
          lineHeight: 1.8,
          color: "#d9e4e6",
        }}
      >
        {formatInline(line)}
      </p>
    );

    index += 1;
  }

  return elements;
}

const examplePrompts = [
  {
    label: "NEPAL",
    title: "First Himalayan trek",
    prompt:
      "Plan a 12-day Nepal trip for two people in October with moderate trekking, local culture and comfortable accommodation.",
  },
  {
    label: "BHUTAN",
    title: "Culture + comfort",
    prompt:
      "I want a luxury Bhutan journey with culture, monasteries, mountain scenery and comfortable accommodation.",
  },
  {
    label: "COMPARE",
    title: "Everest or Annapurna?",
    prompt:
      "Compare Everest Base Camp and Annapurna for a first-time trekker. Include difficulty, altitude, scenery, crowds and ideal trip length.",
  },
  {
    label: "TIBET",
    title: "Photography journey",
    prompt:
      "Plan a photography-focused Tibet journey with comfortable accommodation, cultural experiences and time for landscapes.",
  },
];

export default function AiTripPlannerPage() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<ResearchSource[]>([]);
  const [liveResearch, setLiveResearch] = useState(true);
  const [usedLiveResearch, setUsedLiveResearch] = useState(false);
  const [researchUnavailable, setResearchUnavailable] =
    useState(false);
  const [researchMessage, setResearchMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmed = message.trim();

    if (!trimmed) {
      setError(
        "Tell us what kind of Himalayan journey you want."
      );
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");
    setSources([]);
    setUsedLiveResearch(false);
    setResearchUnavailable(false);
    setResearchMessage("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          liveResearch,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result?.error ||
            "The AI Trip Planner could not respond."
        );
        return;
      }

      setAnswer(
        result?.answer || "No response received."
      );

      setSources(
        Array.isArray(result?.sources)
          ? result.sources
          : []
      );

      setUsedLiveResearch(
        result?.liveResearch === true
      );

      setResearchUnavailable(
        result?.researchUnavailable === true
      );

      setResearchMessage(
        typeof result?.researchMessage === "string"
          ? result.researchMessage
          : ""
      );
    } catch (requestError) {
      console.error("AI planner error:", requestError);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function usePrompt(prompt: string) {
    setMessage(prompt);
    setError("");

    window.setTimeout(() => {
      document
        .getElementById("planner")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(70px, 10vw, 125px) 0 75px",
          background:
            "radial-gradient(circle at 75% 18%, rgba(109,224,194,.16), transparent 30%), linear-gradient(180deg, rgba(9,35,43,.42), transparent)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 460,
            height: 460,
            right: "-130px",
            top: "-170px",
            borderRadius: "50%",
            border: "1px solid rgba(109,224,194,.12)",
            pointerEvents: "none",
          }}
        />

        <div className="container">
          <div
            className="eyebrow"
            style={{
              marginBottom: 18,
              letterSpacing: ".2em",
            }}
          >
            AI-POWERED HIMALAYAN PLANNING
          </div>

          <h1
            style={{
              maxWidth: 1000,
              margin: 0,
              fontSize: "clamp(50px, 8vw, 94px)",
              lineHeight: 0.92,
              letterSpacing: "-.06em",
            }}
          >
            Your idea.
            <br />
            A smarter journey.
          </h1>

          <p
            className="muted"
            style={{
              maxWidth: 800,
              marginTop: 26,
              marginBottom: 0,
              fontSize: "clamp(17px, 2vw, 20px)",
              lineHeight: 1.8,
            }}
          >
            Tell us how you want to experience the Himalaya.
            Himalayan26 AI can build a personalized journey and,
            when available, research current travel information
            to make the plan more useful.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 30,
            }}
          >
            {[
              "Personalized itinerary",
              "Live research",
              "Route comparison",
              "Human follow-up",
            ].map((item) => (
              <span
                key={item}
                style={{
                  padding: "9px 13px",
                  borderRadius: 999,
                  border:
                    "1px solid rgba(255,255,255,.11)",
                  background: "rgba(255,255,255,.04)",
                  color: "#c5d4d7",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <div>
              <div
                className="eyebrow"
                style={{
                  marginBottom: 12,
                  letterSpacing: ".15em",
                }}
              >
                START WITH AN IDEA
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(34px, 5vw, 52px)",
                }}
              >
                What kind of journey are you imagining?
              </h2>
            </div>

            <p
              className="muted"
              style={{
                maxWidth: 430,
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              Choose an example or describe your own trip in
              the planner below.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 14,
            }}
          >
            {examplePrompts.map((example) => (
              <button
                key={example.title}
                type="button"
                disabled={loading}
                onClick={() => usePrompt(example.prompt)}
                className="card"
                style={{
                  textAlign: "left",
                  minHeight: 190,
                  padding: 22,
                  color: "inherit",
                  cursor: loading
                    ? "not-allowed"
                    : "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background:
                    "linear-gradient(155deg, rgba(255,255,255,.065), rgba(255,255,255,.025))",
                }}
              >
                <span
                  className="eyebrow"
                  style={{
                    fontSize: 10,
                    letterSpacing: ".13em",
                  }}
                >
                  {example.label}
                </span>

                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: 21,
                      marginBottom: 9,
                    }}
                  >
                    {example.title}
                  </strong>

                  <span
                    className="muted"
                    style={{
                      lineHeight: 1.55,
                      fontSize: 14,
                    }}
                  >
                    {example.prompt}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PLANNER */}
      <section
        id="planner"
        className="section"
        style={{
          scrollMarginTop: 90,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(0, 1.35fr) minmax(280px, .65fr)",
              gap: 20,
              alignItems: "start",
            }}
          >
            <div
              className="card"
              style={{
                padding: "clamp(22px, 4vw, 36px)",
                background:
                  "linear-gradient(145deg, rgba(17,48,56,.92), rgba(8,27,34,.96))",
              }}
            >
              <div
                className="eyebrow"
                style={{
                  marginBottom: 12,
                  letterSpacing: ".15em",
                }}
              >
                BUILD YOUR JOURNEY
              </div>

              <h2
                style={{
                  marginTop: 0,
                  fontSize: "clamp(32px, 5vw, 48px)",
                }}
              >
                Tell the planner what matters to you.
              </h2>

              <p
                className="muted"
                style={{
                  lineHeight: 1.75,
                  maxWidth: 740,
                }}
              >
                Include destination ideas, dates or season,
                trip length, travelers, trekking difficulty,
                accommodation style, interests and anything
                you want the journey to prioritize.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="ai-message">
                    Describe your ideal Himalayan trip
                  </label>

                  <textarea
                    id="ai-message"
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }
                    rows={10}
                    disabled={loading}
                    placeholder="Example: Plan a 10-day Nepal trip for two travelers in November. We want moderate trekking, local culture, beautiful mountain views and comfortable accommodation."
                    style={{
                      minHeight: 230,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 18,
                    flexWrap: "wrap",
                    padding: 18,
                    marginTop: 18,
                    marginBottom: 18,
                    borderRadius: 16,
                    border:
                      "1px solid rgba(255,255,255,.1)",
                    background: "rgba(0,0,0,.13)",
                  }}
                >
                  <div style={{ maxWidth: 560 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 9,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <strong>Live web research</strong>

                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: 999,
                          background:
                            liveResearch
                              ? "rgba(109,224,194,.12)"
                              : "rgba(255,255,255,.06)",
                          color:
                            liveResearch
                              ? "#78e5ca"
                              : "#9db0b5",
                          fontSize: 11,
                          fontWeight: 900,
                        }}
                      >
                        {liveResearch ? "ON" : "OFF"}
                      </span>
                    </div>

                    <p
                      className="muted"
                      style={{
                        marginTop: 7,
                        marginBottom: 0,
                        lineHeight: 1.55,
                        fontSize: 14,
                      }}
                    >
                      When available, the planner checks
                      current web information relevant to your
                      request. If live research is temporarily
                      unavailable, the planner can still create
                      a trip plan.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setLiveResearch(
                        (current) => !current
                      )
                    }
                    disabled={loading}
                    aria-pressed={liveResearch}
                    aria-label="Toggle live web research"
                    style={{
                      position: "relative",
                      width: 66,
                      height: 36,
                      flex: "0 0 auto",
                      padding: 0,
                      borderRadius: 999,
                      border: liveResearch
                        ? "1px solid rgba(109,224,194,.65)"
                        : "1px solid rgba(255,255,255,.16)",
                      background: liveResearch
                        ? "rgba(109,224,194,.18)"
                        : "rgba(255,255,255,.06)",
                      cursor: loading
                        ? "not-allowed"
                        : "pointer",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        width: 26,
                        height: 26,
                        top: 4,
                        left: liveResearch ? 34 : 5,
                        borderRadius: "50%",
                        background: liveResearch
                          ? "#6de0c2"
                          : "#9aabad",
                        transition: "left .2s ease",
                      }}
                    />
                  </button>
                </div>

                <button
                  className="btn"
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    minHeight: 54,
                    fontSize: 16,
                  }}
                >
                  {loading
                    ? liveResearch
                      ? "Researching and building your journey..."
                      : "Building your journey..."
                    : liveResearch
                      ? "Create journey with live research"
                      : "Create my AI journey"}
                </button>
              </form>

              {error && (
                <div
                  className="notice"
                  style={{
                    marginTop: 18,
                    lineHeight: 1.6,
                  }}
                >
                  {error}
                </div>
              )}
            </div>

            {/* PLANNER GUIDE */}
            <aside
              className="card"
              style={{
                padding: 24,
              }}
            >
              <div
                className="eyebrow"
                style={{
                  marginBottom: 12,
                  letterSpacing: ".14em",
                }}
              >
                BETTER INPUT · BETTER PLAN
              </div>

              <h3
                style={{
                  fontSize: 25,
                  marginTop: 0,
                }}
              >
                Helpful details to include
              </h3>

              <div
                style={{
                  display: "grid",
                  gap: 15,
                  marginTop: 22,
                }}
              >
                {[
                  ["01", "When", "Month, season or exact dates"],
                  ["02", "How long", "Approximate number of days"],
                  ["03", "Who", "Solo, couple, family or group"],
                  [
                    "04",
                    "Travel style",
                    "Adventure, culture, photography, wellness or comfort",
                  ],
                  [
                    "05",
                    "Difficulty",
                    "Easy, moderate or challenging",
                  ],
                  [
                    "06",
                    "Priorities",
                    "What you most want to experience",
                  ],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "34px 1fr",
                      gap: 12,
                      paddingBottom: 14,
                      borderBottom:
                        "1px solid rgba(255,255,255,.07)",
                    }}
                  >
                    <span
                      style={{
                        color: "#6de0c2",
                        fontSize: 12,
                        fontWeight: 900,
                      }}
                    >
                      {number}
                    </span>

                    <div>
                      <strong>{title}</strong>

                      <div
                        className="muted"
                        style={{
                          marginTop: 4,
                          fontSize: 13,
                          lineHeight: 1.5,
                        }}
                      >
                        {text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/travel-intent"
                className="btn alt"
                style={{
                  width: "100%",
                  marginTop: 20,
                }}
              >
                Not sure? Find my travel style
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* RESULT */}
      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{
              minHeight: 300,
              padding: "clamp(22px, 4vw, 38px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 10,
                    letterSpacing: ".15em",
                  }}
                >
                  YOUR HIMALAYAN26 PLAN
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "clamp(31px, 5vw, 48px)",
                  }}
                >
                  Your journey recommendation
                </h2>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                {answer && usedLiveResearch && (
                  <span
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      border:
                        "1px solid rgba(109,224,194,.3)",
                      background:
                        "rgba(109,224,194,.1)",
                      color: "#83ead1",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    ● Live Research Included
                  </span>
                )}

                {answer && researchUnavailable && (
                  <span
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      border:
                        "1px solid rgba(255,193,7,.35)",
                      background:
                        "rgba(255,193,7,.09)",
                      color: "#f0d989",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    ● Live Research Unavailable
                  </span>
                )}
              </div>
            </div>

            {!answer && !loading && !error && (
              <div
                style={{
                  minHeight: 180,
                  marginTop: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 18,
                  border:
                    "1px dashed rgba(255,255,255,.13)",
                  background: "rgba(255,255,255,.02)",
                  textAlign: "center",
                  padding: 30,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 38,
                      marginBottom: 12,
                      color: "#6de0c2",
                    }}
                  >
                    ◇
                  </div>

                  <strong>
                    Your personalized journey will appear here.
                  </strong>

                  <p
                    className="muted"
                    style={{
                      maxWidth: 520,
                      margin: "8px auto 0",
                      lineHeight: 1.65,
                    }}
                  >
                    Describe your trip above or choose one of
                    the example ideas to begin.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div
                style={{
                  minHeight: 190,
                  marginTop: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 18,
                  background:
                    "linear-gradient(135deg, rgba(109,224,194,.08), rgba(255,255,255,.025))",
                  textAlign: "center",
                  padding: 30,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 38,
                      marginBottom: 14,
                      color: "#6de0c2",
                    }}
                  >
                    ◌
                  </div>

                  <strong
                    style={{
                      fontSize: 19,
                    }}
                  >
                    {liveResearch
                      ? "Researching and designing your journey..."
                      : "Designing your Himalayan journey..."}
                  </strong>

                  <p
                    className="muted"
                    style={{
                      marginBottom: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    This may take a little longer when live
                    research is included.
                  </p>
                </div>
              </div>
            )}

            {answer && researchUnavailable && (
              <div
                className="notice"
                style={{
                  marginTop: 24,
                  marginBottom: 22,
                  lineHeight: 1.7,
                }}
              >
                <strong>
                  Live research was not available for this
                  request.
                </strong>

                <div style={{ marginTop: 6 }}>
                  {researchMessage ||
                    "This plan was created without live verification. Please confirm current permits, entry rules and travel conditions with official sources before booking."}
                </div>
              </div>
            )}

            {answer && (
              <div
                style={{
                  maxWidth: 1000,
                  marginTop: 26,
                  fontSize: 16,
                }}
              >
                {renderAnswer(answer)}
              </div>
            )}

            {/* SOURCES */}
            {sources.length > 0 && (
              <div
                style={{
                  marginTop: 36,
                  paddingTop: 28,
                  borderTop:
                    "1px solid rgba(255,255,255,.1)",
                }}
              >
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 10,
                    letterSpacing: ".14em",
                  }}
                >
                  LIVE RESEARCH SOURCES
                </div>

                <h3
                  style={{
                    marginTop: 0,
                    fontSize: 25,
                  }}
                >
                  Information checked for this plan
                </h3>

                <p
                  className="muted"
                  style={{
                    maxWidth: 720,
                    lineHeight: 1.65,
                  }}
                >
                  These sources were returned by the live
                  research process and helped inform the
                  current-information portion of your plan.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: 10,
                    marginTop: 18,
                  }}
                >
                  {sources.map((source, index) => (
                    <a
                      key={`${source.url}-${index}`}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        padding: 16,
                        borderRadius: 14,
                        border:
                          "1px solid rgba(255,255,255,.1)",
                        background:
                          "rgba(255,255,255,.025)",
                        textDecoration: "none",
                        color: "inherit",
                        overflowWrap: "anywhere",
                      }}
                    >
                      <strong
                        style={{
                          display: "block",
                          lineHeight: 1.45,
                        }}
                      >
                        {source.title ||
                          "Research source"}
                      </strong>

                      <div
                        className="muted"
                        style={{
                          marginTop: 7,
                          fontSize: 12,
                          lineHeight: 1.5,
                        }}
                      >
                        {source.url}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {answer && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 11,
                  marginTop: 34,
                  paddingTop: 26,
                  borderTop:
                    "1px solid rgba(255,255,255,.09)",
                }}
              >
                <Link href="/tours" className="btn alt">
                  Explore matching tours
                </Link>

                <Link
                  href="/compare-trips"
                  className="btn alt"
                >
                  Compare journeys
                </Link>

                <Link
                  href="/custom-journey"
                  className="btn alt"
                >
                  Customize this idea
                </Link>

                <Link
                  href="/contact-book"
                  className="btn"
                >
                  Request this journey
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <div
            className="eyebrow"
            style={{
              marginBottom: 12,
              letterSpacing: ".15em",
            }}
          >
            AI + HUMAN TRAVEL PLANNING
          </div>

          <h2
            style={{
              maxWidth: 760,
              marginTop: 0,
              fontSize: "clamp(36px, 5vw, 54px)",
            }}
          >
            Use AI for ideas.
            <br />
            Verify the details that matter.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
              marginTop: 28,
            }}
          >
            {[
              {
                number: "01",
                title: "Describe the journey",
                text: "Tell the planner where, when and how you want to travel.",
              },
              {
                number: "02",
                title: "Research when available",
                text: "Live research can add current information relevant to your request.",
              },
              {
                number: "03",
                title: "Shape the itinerary",
                text: "Use the recommendation to compare routes and refine your priorities.",
              },
              {
                number: "04",
                title: "Confirm with people",
                text: "Final logistics, permits, conditions, availability and pricing are confirmed before travel.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="card"
                style={{
                  padding: 23,
                }}
              >
                <span
                  style={{
                    color: "#6de0c2",
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: ".12em",
                  }}
                >
                  {item.number}
                </span>

                <h3
                  style={{
                    fontSize: 22,
                    marginBottom: 9,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="muted"
                  style={{
                    margin: 0,
                    lineHeight: 1.7,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{
              padding: "clamp(26px, 5vw, 46px)",
              background:
                "linear-gradient(135deg, rgba(19,51,58,.92), rgba(8,27,34,.97))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 12,
                letterSpacing: ".15em",
              }}
            >
              IMPORTANT
            </div>

            <h2
              style={{
                maxWidth: 760,
                marginTop: 0,
                fontSize: "clamp(32px, 5vw, 48px)",
              }}
            >
              Mountain travel still requires current verification.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 920,
                marginBottom: 0,
                lineHeight: 1.8,
              }}
            >
              Himalayan26 AI can help research and organize
              travel information, but final permit
              requirements, border rules, weather, trail
              conditions, transportation, availability and
              pricing must still be verified with appropriate
              official sources and local professionals before
              a booking is confirmed.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
