import type { MetadataRoute } from "next";
import { tours } from "@/lib/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    "https://himalayangadventures.vercel.app";

  const routes = [
    "",
    "/explore",
    "/tibet",
    "/tours",

    "/adventure",
    "/culture-heritage",
    "/photography-tours",
    "/spiritual-journeys",
    "/family-himalaya",
    "/luxury-himalaya",
    "/wellness",

    "/ai-trip-planner",
    "/ai-research",
    "/travel-intent",
    "/compare-trips",
    "/custom-journey",

    "/weather-conditions",
    "/responsible-travel",
    "/himalayan-guide",

    "/blog",
    "/traveler-stories",

    "/about",
    "/contact-book",
  ];

  const staticPages: MetadataRoute.Sitemap =
    routes.map((route) => ({
      url: `${baseUrl}${route}`,

      changeFrequency:
        route === ""
          ? "weekly"
          : "monthly",

      priority:
        route === ""
          ? 1
          : route === "/tibet" ||
              route === "/tours" ||
              route === "/explore" ||
              route === "/ai-trip-planner"
            ? 0.9
            : 0.7,
    }));

  const tourPages: MetadataRoute.Sitemap =
    tours.map((tour) => ({
      url: `${baseUrl}/tours/${tour.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    ...staticPages,
    ...tourPages,
  ];
}
