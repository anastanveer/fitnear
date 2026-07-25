"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import type { Trainer } from "@/lib/types";
import { trainerLatLng, YOU_HERE } from "@/lib/geo";
import { aed } from "@/lib/utils";

function avatarIcon(trainer: Trainer, active: boolean) {
  const cls = ["fn-pin", trainer.featured ? "featured" : "", active ? "active" : ""]
    .filter(Boolean)
    .join(" ");
  return L.divIcon({
    className: "fn-pin-wrap",
    html: `<div class="${cls}">${active ? '<span class="fn-ring"></span>' : ""}<img src="${trainer.avatar}" alt="" /></div>`,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
  });
}

const youIcon = L.divIcon({
  className: "fn-you-wrap",
  html: `<div class="fn-you"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function FitToTrainers({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length) {
      map.fitBounds(points as L.LatLngBoundsLiteral, {
        padding: [48, 48],
        maxZoom: 12.5,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

function FlyToSelected({
  latlng,
}: {
  latlng: [number, number] | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (latlng) map.flyTo(latlng, Math.max(map.getZoom(), 13), { duration: 0.8 });
  }, [latlng, map]);
  return null;
}

export function RealMap({
  trainers,
  selectedId,
  onSelect,
}: {
  trainers: Trainer[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const points = useMemo(
    () =>
      trainers
        .filter((t) => t.city === "Dubai")
        .map((t) => trainerLatLng(t)),
    [trainers],
  );

  const selectedLatLng = useMemo(() => {
    const t = trainers.find((x) => x.id === selectedId);
    return t ? trainerLatLng(t) : null;
  }, [trainers, selectedId]);

  return (
    <MapContainer
      center={YOU_HERE}
      zoom={11}
      scrollWheelZoom
      zoomControl
      className="h-full w-full"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      {/* distance rings from the viewer */}
      {[2000, 5000, 10000].map((r) => (
        <Circle
          key={r}
          center={YOU_HERE}
          radius={r}
          pathOptions={{
            color: "#c2f22a",
            opacity: 0.18,
            weight: 1,
            fill: false,
          }}
        />
      ))}

      <Marker position={YOU_HERE} icon={youIcon} />

      {trainers.map((t) => (
        <Marker
          key={t.id}
          position={trainerLatLng(t)}
          icon={avatarIcon(t, t.id === selectedId)}
          eventHandlers={{ click: () => onSelect(t.id) }}
          zIndexOffset={t.id === selectedId ? 1000 : t.featured ? 200 : 0}
          title={`${t.name} · ${aed(t.hourlyRate)}/hr`}
        />
      ))}

      <FitToTrainers points={points} />
      <FlyToSelected latlng={selectedLatLng} />
    </MapContainer>
  );
}

export default RealMap;
