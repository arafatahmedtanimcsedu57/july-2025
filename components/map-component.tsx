"use client"

import React, { useEffect, useRef, useCallback } from "react"
import { MapContainer, useMap, Popup, CircleMarker } from "react-leaflet"
import L from "leaflet"

import { CASUALTY_TYPES } from "@/constant/casualty-types"
import { MARKER_COLORS } from "@/constant/marker-colors"

import { getCasualtyDataByDate } from "@/lib/data"
import { useIncidentStore } from "@/lib/incident-store"
import { useDayStore } from "@/lib/day-store"
import { getUpdatedPersonData } from "@/lib/edit-store"
import bangladeshData from "@/lib/bangladesh.json"
import { useFilterStore } from "@/lib/filter-store"

import { useFilteredData } from "@/hooks/use-filtered-data"

import type { GeoJsonObject } from "geojson"

import "leaflet/dist/leaflet.css"
import "./map.css"

const bangladeshGeoJson = bangladeshData as GeoJsonObject

const getMarkerColor = (type: string | null) => {
  if (!type || !(type in MARKER_COLORS)) {
    return MARKER_COLORS["default"]
  }
  return MARKER_COLORS[type]
}

const bangladeshCenter: [number, number] = [23.8103, 90.4125] // Dhaka coordinates
const MarkerRefsContext = React.createContext<Map<string, L.CircleMarker> | null>(null)

function MapController({
  selectedPersonId,
}: {
  selectedPersonId: string | null
}) {
  const map = useMap()
  const { currentDay } = useDayStore()

  const casualtyData = getCasualtyDataByDate(currentDay)
  const prevDayRef = React.useRef(currentDay)
  const markerRefs = React.useContext(MarkerRefsContext)

  useEffect(() => {
    if (selectedPersonId) {
      const person = casualtyData.find((p) => p.id.toString() === selectedPersonId)
      if (person && person.lat != null && person.lng != null) {
        map.flyTo([person.lat, person.lng], 18, {
          animate: true,
          duration: 2,
        })

        if (markerRefs && markerRefs.has(selectedPersonId)) {
          setTimeout(() => {
            const marker = markerRefs.get(selectedPersonId)
            if (marker) {
              marker.openPopup()
            }
          }, 2100)
        }
      }
    }else{
		map.flyTo(bangladeshCenter, 7, {
			animate: true,
			duration: 2,
		  })
	}

  }, [selectedPersonId, casualtyData, map, markerRefs])


  return null
}

function ThemeTileLayer() {
  const map = useMap()
  const tileLayerRef = useRef<L.TileLayer | null>(null)

  const addTileLayer = useCallback(() => {
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current)
      tileLayerRef.current = null
    }

    tileLayerRef.current = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      className: "grayscale-tiles",
    }).addTo(map)

    L.geoJSON(bangladeshGeoJson, {
      style: (feature) => ({
        color: "#000000", // Stroke (border) color
        weight: 1, // Border thickness
        fillColor: "#fffff", // Fill color
        fillOpacity: 0.0, // Transparency of fill
        shadowColor: "#000", // Shadow color (black)
        shadowBlur: 5, // Shadow blur effect
        shadowOffset: [3, 3], // Shadow offset (X, Y)
        lineJoin: "bevel",
      }),
    }).addTo(map)
  }, [map])

  useEffect(() => {
    addTileLayer()

    return () => {
      if (tileLayerRef.current) map.removeLayer(tileLayerRef.current)
    }
  }, [map, addTileLayer])

  return null
}

export default function MapComponent() {

  const { selectedIncidentId, setSelectedIncident } = useIncidentStore()
  const { currentDay } = useDayStore()

  const filteredData = useFilteredData()
  const {casualtyTypeFilter} = useFilterStore()
  const validCasualtyData = filteredData.filter((person) => person.lat != null && person.lng != null)

  // Create a ref to store all marker references
  const markerRefsMap = useRef<Map<string, L.CircleMarker>>(new Map())

  useEffect(() => {
    setSelectedIncident(null)
  }, [currentDay, setSelectedIncident])

  return (
    <MarkerRefsContext.Provider value={markerRefsMap.current}>
      <MapContainer
        center={bangladeshCenter}
        zoom={7}
        zoomControl={false}
        minZoom={7}
        dragging={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        style={{ height: "calc(100vh - 61px)" }}
      >
        <ThemeTileLayer />

        {validCasualtyData.map((person) => {
          const updatedPerson = getUpdatedPersonData(person)
          const markerColor = getMarkerColor(updatedPerson.type)

          if (updatedPerson.lat === null || updatedPerson.lng === null) return null

          return (
            <CircleMarker
              key={person.id}
              center={[updatedPerson.lat, updatedPerson.lng] as [number, number]}
              radius={casualtyTypeFilter===CASUALTY_TYPES.INDIVIDUAL? 4 : 12}
              pathOptions={{
                color: markerColor.color,
                fillColor: markerColor.fillColor,
                fillOpacity: casualtyTypeFilter===CASUALTY_TYPES.INDIVIDUAL? 1: .35,
                weight: 0,
              }}
              eventHandlers={{
                click: () => {
                  setSelectedIncident(person.id.toString())
                },
                // Store reference to the marker when it's created
                add: (e) => {
                  markerRefsMap.current.set(person.id.toString(), e.target)
                },
                // Remove reference when marker is removed
                remove: () => {
                  markerRefsMap.current.delete(person.id.toString())
                },
              }}
              className="drop-shadow-[0_0_0.1rem_crimson]"
            >
              <Popup closeButton={false} autoPan={false}>
                <div className="p-1 flex items-center gap-2">
                  <span className="font-medium text-sm">{updatedPerson.name || "Unknown"}</span>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}
        <MapController selectedPersonId={selectedIncidentId} />
      </MapContainer>
    </MarkerRefsContext.Provider>
  )
}

