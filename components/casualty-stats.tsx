"use client"

import { casualtyData } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"

export default function CasualtyStats() {
  // Calculate totals
  const totals = casualtyData.reduce(
    (acc, incident) => {
      acc[incident.type] = (acc[incident.type] || 0) + incident.count
      return acc
    },
    { killed: 0, injured: 0, missing: 0 },
  )

  return (
    <div className="grid grid-cols-3 gap-2">
      <Card className="bg-red-50 dark:bg-red-950/20">
        <CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{totals.killed}</div>
          <div className="text-xs text-muted-foreground">Fatalities</div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 dark:bg-orange-950/20">
        <CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{totals.injured}</div>
          <div className="text-xs text-muted-foreground">Injured</div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totals.missing}</div>
          <div className="text-xs text-muted-foreground">Missing</div>
        </CardContent>
      </Card>
    </div>
  )
}

