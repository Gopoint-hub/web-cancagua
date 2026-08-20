export const DISCOVERY_SOURCE_OPTIONS = [
  { value: "advertising", label: "Publicidad" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google" },
  { value: "friends_family", label: "Amigos/Familia" },
  { value: "other", label: "Otro" },
] as const;

export const CHILE_REGIONS = [
  "Región de Arica y Parinacota",
  "Región de Tarapacá",
  "Región de Antofagasta",
  "Región de Atacama",
  "Región de Coquimbo",
  "Región de Valparaíso",
  "Región Metropolitana de Santiago",
  "Región del Libertador General Bernardo O'Higgins",
  "Región del Maule",
  "Región de Ñuble",
  "Región del Biobío",
  "Región de La Araucanía",
  "Región de Los Ríos",
  "Región de Los Lagos",
  "Región de Aysén del General Carlos Ibáñez del Campo",
  "Región de Magallanes y de la Antártica Chilena",
] as const;

export type CustomerAcquisitionFormValue = {
  discoverySource: "" | (typeof DISCOVERY_SOURCE_OPTIONS)[number]["value"];
  discoverySourceOther: string;
  originType: "" | "chile" | "foreign";
  country: string;
  region: string;
  city: string;
};

export const EMPTY_CUSTOMER_ACQUISITION: CustomerAcquisitionFormValue = {
  discoverySource: "",
  discoverySourceOther: "",
  originType: "",
  country: "",
  region: "",
  city: "",
};

export function validateCustomerAcquisition(value: CustomerAcquisitionFormValue) {
  if (!value.discoverySource) return "Selecciona cómo nos encontraste.";
  if (value.discoverySource === "other" && !value.discoverySourceOther.trim()) return "Cuéntanos cómo nos encontraste.";
  if (!value.originType) return "Selecciona de dónde vienes.";
  if (value.originType === "foreign" && !value.country.trim()) return "Indica tu país.";
  if (value.originType === "chile" && !value.region) return "Selecciona tu región.";
  if (value.originType === "chile" && !value.city.trim()) return "Indica tu ciudad o comuna.";
  return null;
}

export function normalizeCustomerAcquisition(value: CustomerAcquisitionFormValue) {
  return {
    discoverySource: value.discoverySource as (typeof DISCOVERY_SOURCE_OPTIONS)[number]["value"],
    discoverySourceOther: value.discoverySource === "other" ? value.discoverySourceOther.trim() : undefined,
    originType: value.originType as "chile" | "foreign",
    country: value.originType === "foreign" ? value.country.trim() : undefined,
    region: value.originType === "chile" ? value.region : undefined,
    city: value.originType === "chile" ? value.city.trim() : undefined,
  };
}
