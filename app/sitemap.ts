import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://himalayangadventures.vercel.app";

  const routes = [
    "",
    "/explore",
    "/tours",

    "/nepal",
    "/bhutan",
    "/tibet",
    "/india-himalaya",

    "/everest",
    "/annapurna",
    "/langtang",
    "/manaslu",

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

    "/tours/everest-base-camp",
    "/tours/annapurna-classic",
    "/tours/langtang-valley",
    "/tours/manaslu-circuit",
    "/tours/upper-mustang",
    "/tours/bhutan-mountain-culture",
    "/tours/tibet-high-plateau",
    "/tours/ladakh-high-altitude",
    "/tours/kailash-mansarovar-journey",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/tours" ||
            route === "/explore" ||
            route === "/ai-trip-planner"
          ? 0.9
          : route.startsWith("/tours/")
            ? 0.8
            : 0.7,
  }));
}
