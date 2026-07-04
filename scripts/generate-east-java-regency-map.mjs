import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = process.cwd();
const sourcePath = resolve(rootDir, "src/data/geo/east_java_regencies.geojson");
const outputPath = resolve(rootDir, "src/data/eastJavaRegencyMap.ts");
const mapWidth = 1000;
const padding = 28;
const requiredPropertyNames = ["name", "slug", "type", "province"];

function round(value) {
  return Number(value.toFixed(2));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function collectCoordinates(geometry) {
  const points = [];

  if (geometry.type === "Polygon") {
    for (const ring of geometry.coordinates) {
      points.push(...ring);
    }
  }

  if (geometry.type === "MultiPolygon") {
    for (const polygon of geometry.coordinates) {
      for (const ring of polygon) {
        points.push(...ring);
      }
    }
  }

  return points;
}

function getBounds(points) {
  return points.reduce(
    (bounds, [longitude, latitude]) => ({
      minLongitude: Math.min(bounds.minLongitude, longitude),
      maxLongitude: Math.max(bounds.maxLongitude, longitude),
      minLatitude: Math.min(bounds.minLatitude, latitude),
      maxLatitude: Math.max(bounds.maxLatitude, latitude),
    }),
    {
      minLongitude: Number.POSITIVE_INFINITY,
      maxLongitude: Number.NEGATIVE_INFINITY,
      minLatitude: Number.POSITIVE_INFINITY,
      maxLatitude: Number.NEGATIVE_INFINITY,
    },
  );
}

function createProjector(bounds) {
  const usableWidth = mapWidth - padding * 2;
  const longitudeSpan = bounds.maxLongitude - bounds.minLongitude;
  const latitudeSpan = bounds.maxLatitude - bounds.minLatitude;
  const usableHeight = (latitudeSpan / longitudeSpan) * usableWidth;
  const mapHeight = round(usableHeight + padding * 2);

  return {
    viewBox: `0 0 ${mapWidth} ${mapHeight}`,
    width: mapWidth,
    height: mapHeight,
    project([longitude, latitude]) {
      const x = padding + ((longitude - bounds.minLongitude) / longitudeSpan) * usableWidth;
      const y =
        padding + ((bounds.maxLatitude - latitude) / latitudeSpan) * usableHeight;

      return [round(x), round(y)];
    },
  };
}

function ringToPath(ring, project) {
  return ring
    .map((point, index) => {
      const [x, y] = project(point);

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ")
    .concat(" Z");
}

function geometryToPath(geometry, project) {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.map((ring) => ringToPath(ring, project)).join(" ");
  }

  return geometry.coordinates
    .flatMap((polygon) => polygon.map((ring) => ringToPath(ring, project)))
    .join(" ");
}

function getProjectedCenter(points, project) {
  const bounds = getBounds(points);

  const [x, y] = project([
    (bounds.minLongitude + bounds.maxLongitude) / 2,
    (bounds.minLatitude + bounds.maxLatitude) / 2,
  ]);

  return { x, y };
}

function main() {
  const geojson = JSON.parse(readFileSync(sourcePath, "utf8"));

  assert(geojson.type === "FeatureCollection", "GeoJSON must be a FeatureCollection.");
  assert(Array.isArray(geojson.features), "GeoJSON features must be an array.");
  assert(geojson.features.length === 38, "GeoJSON must contain exactly 38 features.");

  const slugs = new Set();
  const allPoints = [];

  for (const feature of geojson.features) {
    assert(feature.geometry, "Every feature must have geometry.");
    assert(
      feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon",
      `Invalid geometry type for ${feature.properties?.name ?? "unknown feature"}.`,
    );

    for (const propertyName of requiredPropertyNames) {
      assert(
        feature.properties?.[propertyName],
        `Missing property "${propertyName}" in one feature.`,
      );
    }

    assert(!slugs.has(feature.properties.slug), `Duplicate slug: ${feature.properties.slug}`);
    slugs.add(feature.properties.slug);
    allPoints.push(...collectCoordinates(feature.geometry));
  }

  const bounds = getBounds(allPoints);
  const projector = createProjector(bounds);
  const features = geojson.features
    .map((feature) => {
      const points = collectCoordinates(feature.geometry);
      const center = getProjectedCenter(points, projector.project);

      return {
        name: feature.properties.name,
        slug: feature.properties.slug,
        type: feature.properties.type,
        province: feature.properties.province,
        path: geometryToPath(feature.geometry, projector.project),
        center,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const output = `export type EastJavaRegencyMapFeature = {
  name: string;
  slug: string;
  type: "kabupaten" | "kota";
  province: "Jawa Timur";
  path: string;
  center: {
    x: number;
    y: number;
  };
};

export const eastJavaRegencyMapViewBox = ${JSON.stringify(projector.viewBox)} as const;

export const eastJavaRegencyMapBounds = ${JSON.stringify(
    {
      ...Object.fromEntries(
        Object.entries(bounds).map(([key, value]) => [key, round(value)]),
      ),
      width: projector.width,
      height: projector.height,
    },
    null,
    2,
  )} as const;

export const eastJavaRegencyMapFeatures = ${JSON.stringify(
    features,
    null,
    2,
  )} as const satisfies readonly EastJavaRegencyMapFeature[];
`;

  writeFileSync(outputPath, output);

  console.log(
    JSON.stringify(
      {
        source: sourcePath,
        output: outputPath,
        features: features.length,
        viewBox: projector.viewBox,
        bounds,
      },
      null,
      2,
    ),
  );
}

main();
