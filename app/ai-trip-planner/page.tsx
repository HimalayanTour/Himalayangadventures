"use client";

import {
  FormEvent,
  ReactNode,
  useState,
} from "react";

function formatInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
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

    // Tables
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
                            key={
                              cellIndex
                            }
                            style={{
                              padding:
                                "12px 14px",
                              borderBottom:
                                "1px solid rgba(255,255,255,0.08)",
                              verticalAlign:
                                "top",
                              lineHeight:
                                1.6,
                            }}
                          >
                            {formatInline(
                              cell
                            )}
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
        (
          lines[index]
            .trim()
            .startsWith("- ") ||
          lines[index]
            .trim()
            .startsWith("* ")
        )
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
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>
              {formatInline(item)}
            </li>
          ))}
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
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>
              {formatInline(item)}
            </li>
          ))}
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
            maxWidth: 900,
          }}
        >
          Plan your Himalayan journey
          with AI
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            fontSize: 18,
            lineHeight: 1.7,
            marginTop: 18,
          }}
        >
          Tell us where you want to
          travel, your dates, group
          size, fitness level, budget
          and travel style. Himalayan26
          AI will help you shape the
          journey.
        </p>
      </section>

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
                placeholder="Example: We are two travelers from Japan. We want a 10–14 day Himalayan trip in October 2027 with moderate trekking, local culture, comfortable accommodation and a budget around $2,500 per person."
                disabled={loading}
              />
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
                ? "Planning your journey..."
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

      <section
        className="card"
        style={{
          marginTop: 24,
          minHeight: 260,
        }}
      >
        <span className="pill">
          YOUR AI PLAN
        </span>

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
              Your personalized trip
              plan will appear here.
              Include as much detail as
              you can for a better
              recommendation.
            </p>
          )}

        {loading && (
          <div
            className="notice"
            style={{
              marginTop: 18,
            }}
          >
            AI is preparing your
            Himalayan journey...
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
          AI advice is a starting point
        </h2>

        <p
          className="muted"
          style={{
            lineHeight: 1.7,
            maxWidth: 850,
          }}
        >
          Final trekking conditions,
          permits, border requirements,
          weather, availability,
          altitude suitability and
          pricing should always be
          verified before booking.
          Himalayan26 combines AI
          planning with human review
          before confirming a journey.
        </p>
      </section>
    </main>
  );
}
