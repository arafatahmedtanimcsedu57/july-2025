"use client"

import { useEffect, useRef } from "react"
import { Marker, Popup } from "react-leaflet"
import L from "leaflet"
import type { CasualtyPerson } from "@/lib/data"

interface CustomPinMarkerProps {
  person: CasualtyPerson
  isSelected: boolean
  onClick: () => void
}

// Create a custom icon for our 3D pin
const createCustomIcon = (type: string, isSelected: boolean) => {
  // Define colors based on type
  const colorMap: Record<string, string> = {
    killed: "#ef4444",
    injured: "#f97316",
    missing: "#3b82f6",
  }

  const color = colorMap[type] || "#ef4444"

  return L.divIcon({
    className: "",
    html: `
      <div class="pin-marker ${type} ${isSelected ? "selected" : ""}" style="--pin-color: ${color}">
        <div class="pin-head"></div>
        <div class="pin-body"></div>
        <div class="pin-shadow"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30], // Bottom center of the icon
  })
}

export default function CustomPinMarker({ person, isSelected, onClick }: CustomPinMarkerProps) {
  const markerRef = useRef<L.Marker>(null)

  // Create a custom icon based on the person's type
  const icon = createCustomIcon(person.type, isSelected)

  // Add a random delay to stagger the animations
  const animationDelay = useRef(Math.random() * 0.5)

  useEffect(() => {
    if (markerRef.current) {
      const markerElement = markerRef.current.getElement()
      if (markerElement) {
        const pinElement = markerElement.querySelector(".pin-marker")
        if (pinElement) {
          pinElement.setAttribute(
            "style",
            `--pin-color: ${person.type === "killed" ? "#ef4444" : person.type === "injured" ? "#f97316" : "#3b82f6"}; animation-delay: ${animationDelay.current}s`,
          )
        }
      }
    }
  }, [person.type])

  return (
    <Marker
      ref={markerRef}
      position={[person.lat, person.lng]}
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup
        className="name-popup"
        offset={[0, -30]} // Offset to position above the pin
        closeButton={false} // Remove close button for cleaner look
      >
        <div className="p-1 flex items-center gap-2">
          <span className="font-medium text-sm">{person.name}</span>
        </div>
      </Popup>
    </Marker>
  )
}

