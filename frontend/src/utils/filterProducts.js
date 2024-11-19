import * as turf from "@turf/turf";

export const filterProductsByDistance = (products, sellerLocation, radius) => {
  return products.filter((product) => {
    const distance = turf.distance(
      turf.point(sellerLocation),
      turf.point([product.location.lng, product.location.lat]),
      { units: "kilometers" }
    );
    return distance <= radius / 1000; // Convert meters to kilometers
  });
};
