import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { riskColor, type Region } from "@/data/mockData";

interface Props {
  regions: Region[];
  onSelect: (r: Region) => void;
  selectedId?: string;
}

export default function RiskMap({ regions, onSelect, selectedId }: Props) {
  return (
    <MapContainer center={[16.8, 79.3]} zoom={7} scrollWheelZoom className="h-full w-full" style={{ background: "oklch(0.18 0.02 160)" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {regions.map((r) => (
        <CircleMarker
          key={r.id}
          center={[r.lat, r.lng]}
          radius={6 + r.priorityScore / 6}
          pathOptions={{
            color: riskColor(r.risk),
            fillColor: riskColor(r.risk),
            fillOpacity: selectedId === r.id ? 0.7 : 0.35,
            weight: selectedId === r.id ? 3 : 1.5,
          }}
          eventHandlers={{ click: () => onSelect(r) }}
        >
          <Popup>
            <div style={{ minWidth: 160 }}>
              <div style={{ fontWeight: 700 }}>{r.name}</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{r.state}</div>
              <div style={{ marginTop: 6, fontSize: 12 }}>Priority: <b>{r.priorityScore}</b></div>
              <div style={{ fontSize: 12 }}>Risk: <b style={{ color: riskColor(r.risk) }}>{r.risk}</b></div>
              {r.outbreak && <div style={{ fontSize: 11, marginTop: 4, color: riskColor(r.risk) }}>⚠ {r.outbreak}</div>}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
