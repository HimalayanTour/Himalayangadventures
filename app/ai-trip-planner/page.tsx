"use client";

import {
  FormEvent,
  ReactNode,
  useState,
} from "react";

type ResearchSource = {
  title: string;
  url: string;
};

function formatInline(text: string): ReactNode[] {
  const pattern =
    /(\*\*.*?\*\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;

  const parts = text.split(pattern);

  return parts.map((part, index) => {
    // Bold Markdown
    if (
      part.startsWith("**") &&
      part.endsWith("**")
    ) {
      return (
        <strong key={index}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Markdown links
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
            textDecoration: "underline",
            textUnderlineOffset: 3,
            fontWeight: 600,
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
  return (
    line.trim().startsWith("|") &&
    line.trim().endsWith("|")
  );
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
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    // Markdown table
    if (isTableLine(line)) {
      const tableLines: string[] = [];

      while (
        index < lines.length &&
        isTableLine(lines[index])
      ) {
        tableLines.push(lines[index]);
        index += 1;
      }

      const rows = tableLines
        .filter(
          (row) => !isSeparatorLine(row)
        )
        .map(parseTableRow);

      if (rows.length > 0) {
        const header = rows[0];
        const body = rows.slice(1);

        elements.push(
          <div
            key={`table-${index}`}
            style={{
              overflowX: "auto",
              marginTop: 18,
              marginBottom: 24,
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 600,
              }}
            >
              <thead>
                <tr>
                  {header.map(
                    (cell, cellIndex) => (
                      <th
                        key={cellIndex}
                        style={{
                          textAlign: "left",
                          padding: "12px 14px",
                          borderBottom:
                            "1px solid rgba(255,255,255,0.18)",
                          fontSize: 14,
                        }}
                      >
                        {formatInline(cell)}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {body.map(
                  (row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map(
                        (
                          cell,
                          cellIndex
                        ) => (
                          <td
                            key={cellIndex}
                            style={{
                              padding:
                                "12px 14px",
                              borderBottom:
                                "1px solid rgba(255,255,255,0.08)",
                              verticalAlign:
                                "top",
                              lineHeight: 1.6,
                            }}
                          >
                            {formatInline(cell)}
                          </td>
                        )
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        );

        continue;
      }
    }

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        <h2
          key={`h1-${index}`}
          style={{
            marginTop: 28,
            marginBottom: 12,
            fontSize: 28,
            lineHeight: 1.25,
          }}
        >
          {formatInline(line.slice(2))}
        </h2>
      );

      index += 1;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h3
          key={`h2-${index}`}
          style={{
            marginTop: 26,
            marginBottom: 10,
            fontSize: 23,
            lineHeight: 1.3,
          }}
        >
          {formatInline(line.slice(3))}
        </h3>
      );

      index += 1;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h4
          key={`h3-${index}`}
          style={{
            marginTop: 22,
            marginBottom: 8,
            fontSize: 18,
            lineHeight: 1.35,
          }}
        >
          {formatInline(line.slice(4))}
        </h4>
      );

      index += 1;
      continue;
    }

    // Bullet lists
    if (
      line.startsWith("- ") ||
      line.startsWith("* ")
    ) {
      const items: string[] = [];

      while (
        index < lines.length &&
        (lines[index]
          .trim()
          .startsWith("- ") ||
          lines[index]
            .trim()
            .startsWith("* "))
      ) {
        items.push(
          lines[index].trim().slice(2)
        );

        index += 1;
      }

      elements.push(
        <ul
          key={`ul-${index}`}
          style={{
            paddingLeft: 24,
            marginTop: 10,
            marginBottom: 20,
            lineHeight: 1.75,
          }}
        >
          {items.map(
            (item, itemIndex) => (
              <li key={itemIndex}>
                {formatInline(item)}
              </li>
            )
          )}
        </ul>
      );

      continue;
    }

    // Numbered lists
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];

      while (
        index < lines.length &&
        /^\d+\.\s/.test(
          lines[index].trim()
        )
      ) {
        items.push(
          lines[index]
            .trim()
            .replace(/^\d+\.\s/, "")
        );

        index += 1;
      }

      elements.push(
        <ol
          key={`ol-${index}`}
          style={{
            paddingLeft: 26,
            marginTop: 10,
            marginBottom: 20,
            lineHeight: 1.75,
          }}
        >
          {items.map(
            (item, itemIndex) => (
              <li key={itemIndex}>
                {formatInline(item)}
              </li>
            )
          )}
        </ol>
      );

      continue;
    }

    // Normal paragraph
    elements.push(
      <p
        key={`p-${index}`}
        style={{
          marginTop: 8,
          marginBottom: 14,
          lineHeight: 1.75,
        }}
      >
        {formatInline(line)}
      </p>
    );

    index += 1;
  }

  return elements;
}

export default function AiTripPlannerPage() {
  const [message, setMessage] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [sources, setSources] =
    useState<ResearchSource[]>([]);

  const [liveResearch, setLiveResearch] =
    useState(true);

  const [
    usedLiveResearch,
    setUsedLiveResearch,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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

    try {
      const response = await fetch(
        "/api/ai",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message: trimmed,
            liveResearch,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        setError(
          result?.error ||
            "The AI Trip Planner could not respond."
        );
        return;
      }

      setAnswer(
        result?.answer ||
          "No response received."
      );

      setSources(
        Array.isArray(result?.sources)
          ? result.sources
          : []
      );

      setUsedLiveResearch(
        result?.liveResearch === true
      );
    } catch (error) {
      console.error(
        "AI planner error:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const examplePrompts = [
    "Plan a 12-day Nepal trip for two people in October with moderate trekking.",
    "I want a luxury Bhutan journey with culture, monasteries and mountain scenery.",
    "Compare Everest Base Camp and Annapurna for a first-time trekker.",
    "Plan a photography-focused Tibet journey with comfortable accommodation.",
  ];

  return (
    <main
      className="container"
      style={{
        paddingTop: 54,
        paddingBottom: 90,
      }}
    >
      {/* HERO */}

      <section
        className="card"
        style={{
          marginBottom: 24,
        }}
      >
        <span className="pill">
          AI TRIP PLANNER
        </span>

        <h1
          style={{
            marginTop: 16,
            fontSize:
              "clamp(40px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 950,
          }}
        >
          Plan your Himalayan journey
          with AI + live research
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 780,
            fontSize: 18,
            lineHeight: 1.7,
            marginTop: 18,
          }}
        >
          Create a personalized Himalayan
          journey and optionally include
          current web research for travel
          rules, permits, conditions and
          recent updates.
        </p>
      </section>

      {/* PLANNER + EXAMPLES */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1.2fr) minmax(300px, 0.8fr)",
          gap: 24,
          alignItems: "start",
        }}
      >
        <section className="card">
          <span className="pill">
            START PLANNING
          </span>

          <h2>
            Tell the AI what you want
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="ai-message">
                Your trip idea
              </label>

              <textarea
                id="ai-message"
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                rows={10}
                placeholder="Example: Plan a 10-day Nepal trip for two travelers in November. We want moderate trekking, local culture and comfortable accommodation. Include current permits, travel updates and conditions."
                disabled={loading}
              />
            </div>

            {/* LIVE RESEARCH CONTROL */}

            <div
              style={{
                marginTop: 18,
                marginBottom: 18,
                padding: 18,
                borderRadius: 16,
                border:
                  "1px solid rgba(255,255,255,0.12)",
                background:
                  "rgba(255,255,255,0.035)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <strong>
                    Live web research
                  </strong>

                  <p
                    className="muted"
                    style={{
                      marginTop: 6,
                      marginBottom: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    Search for current
                    travel information,
                    permits, conditions
                    and recent updates.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setLiveResearch(
                      (current) =>
                        !current
                    )
                  }
                  disabled={loading}
                  aria-pressed={
                    liveResearch
                  }
                  style={{
                    minWidth: 92,
                    padding:
                      "11px 16px",
                    borderRadius: 999,
                    border:
                      liveResearch
                        ? "1px solid rgba(93,229,201,0.7)"
                        : "1px solid rgba(255,255,255,0.16)",
                    background:
                      liveResearch
                        ? "rgba(93,229,201,0.16)"
                        : "rgba(255,255,255,0.04)",
                    color: "inherit",
                    cursor:
                      loading
                        ? "not-allowed"
                        : "pointer",
                    fontWeight: 700,
                  }}
                >
                  {liveResearch
                    ? "ON"
                    : "OFF"}
                </button>
              </div>
            </div>

            <button
              className="btn"
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
              }}
            >
              {loading
                ? liveResearch
                  ? "Researching and planning..."
                  : "Planning your journey..."
                : liveResearch
                  ? "Create plan with live research"
                  : "Create my AI trip plan"}
            </button>
          </form>

          {error && (
            <div
              className="notice"
              style={{
                marginTop: 18,
              }}
            >
              {error}
            </div>
          )}
        </section>

        {/* EXAMPLES */}

        <section className="card">
          <span className="pill">
            IDEAS
          </span>

          <h2>
            Try an example
          </h2>

          <p className="muted">
            Click one to place it into
            the planner.
          </p>

          <div
            style={{
              display: "grid",
              gap: 12,
              marginTop: 18,
            }}
          >
            {examplePrompts.map(
              (prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() =>
                    setMessage(prompt)
                  }
                  disabled={loading}
                  style={{
                    textAlign: "left",
                    padding: 16,
                    borderRadius: 14,
                    border:
                      "1px solid rgba(255,255,255,0.12)",
                    background:
                      "rgba(255,255,255,0.035)",
                    color: "inherit",
                    cursor: "pointer",
                    lineHeight: 1.5,
                  }}
                >
                  {prompt}
                </button>
              )
            )}
          </div>
        </section>
      </div>

      {/* AI RESULT */}

      <section
        className="card"
        style={{
          marginTop: 24,
          minHeight: 260,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span className="pill">
            YOUR AI PLAN
          </span>

          {answer &&
            usedLiveResearch && (
              <span
                style={{
                  padding:
                    "7px 12px",
                  borderRadius: 999,
                  border:
                    "1px solid rgba(93,229,201,0.32)",
                  background:
                    "rgba(93,229,201,0.10)",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                ● Live Research Included
              </span>
            )}
        </div>

        <h2>
          Himalayan26 recommendation
        </h2>

        {!answer &&
          !loading &&
          !error && (
            <p
              className="muted"
              style={{
                lineHeight: 1.7,
                maxWidth: 760,
              }}
            >
              Your personalized trip plan
              will appear here.
            </p>
          )}

        {loading && (
          <div
            className="notice"
            style={{
              marginTop: 18,
            }}
          >
            {liveResearch
              ? "Himalayan26 AI is researching current information and preparing your journey..."
              : "AI is preparing your Himalayan journey..."}
          </div>
        )}

        {answer && (
          <div
            style={{
              marginTop: 20,
              fontSize: 16,
              maxWidth: 1000,
            }}
          >
            {renderAnswer(answer)}
          </div>
        )}

        {/* RESEARCH SOURCES */}

        {sources.length > 0 && (
          <div
            style={{
              marginTop: 34,
              paddingTop: 24,
              borderTop:
                "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <span className="pill">
              LIVE RESEARCH SOURCES
            </span>

            <h3
              style={{
                marginTop: 14,
              }}
            >
              Sources checked
            </h3>

            <p
              className="muted"
              style={{
                lineHeight: 1.6,
              }}
            >
              These sources were used to
              help research current travel
              information for your plan.
            </p>

            <div
              style={{
                display: "grid",
                gap: 10,
                marginTop: 14,
              }}
            >
              {sources.map(
                (source, index) => (
                  <a
                    key={`${source.url}-${index}`}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      padding: 14,
                      borderRadius: 12,
                      border:
                        "1px solid rgba(255,255,255,0.10)",
                      textDecoration:
                        "none",
                      color: "inherit",
                      lineHeight: 1.5,
                      overflowWrap:
                        "anywhere",
                    }}
                  >
                    <strong>
                      {source.title ||
                        "Research source"}
                    </strong>

                    <div
                      className="muted"
                      style={{
                        marginTop: 5,
                        fontSize: 13,
                      }}
                    >
                      {source.url}
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}

        {answer && (
          <div
            style={{
              marginTop: 30,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <a
              href="/tours"
              className="btn"
            >
              Explore tours
            </a>

            <a
              href="/contact-book"
              className="btn"
            >
              Request this journey
            </a>
          </div>
        )}
      </section>

      {/* DISCLAIMER */}

      <section
        className="card"
        style={{
          marginTop: 24,
        }}
      >
        <span className="pill">
          IMPORTANT
        </span>

        <h2>
          Research helps, but conditions
          can still change
        </h2>

        <p
          className="muted"
          style={{
            lineHeight: 1.7,
            maxWidth: 900,
          }}
        >
          Himalayan26 AI can research
          recent information, but final
          permit requirements, border
          rules, weather, trail
          conditions, transportation,
          availability and pricing must
          still be verified before a
          booking is confirmed.
        </p>
      </section>
    </main>
  );
}
