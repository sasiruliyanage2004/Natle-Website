import React from "react";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NATLE Technologies",
    alternateName: "NATLE",
    url: "https://natle.com",
    logo: "https://natle.com/icon.svg",
    description: "Enterprise AI infrastructure engineering platform delivering clinical diagnostics, agricultural telemetry, and autonomous intelligence.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Level 4, Access Towers II",
      addressLocality: "Colombo 02",
      addressCountry: "LK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+94-11-234-5678",
      contactType: "customer support",
      email: "enterprise@natle.com",
      areaServed: ["US", "GB", "SG", "LK", "EU"],
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://github.com",
      "https://linkedin.com",
      "https://twitter.com",
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NATLE Enterprise AI Runtime",
    operatingSystem: "Linux, Cloud, On-Premises, NVIDIA CUDA",
    applicationCategory: "BusinessApplication, ArtificialIntelligence",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "42",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
