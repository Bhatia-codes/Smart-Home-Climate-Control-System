import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Droplets, Wind, CloudFog } from "lucide-react"
import type { SensorData } from "@/lib/types"

interface CurrentClimateProps {
  sensorData: SensorData
}

export default function CurrentClimate({ sensorData }: CurrentClimateProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Current Climate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <Thermometer className="mb-2 h-6 w-6 text-orange-500" />
            <span className="text-sm text-muted-foreground">Indoor Temp</span>
            <span className="text-2xl font-semibold">{sensorData.indoor_temp}°C</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <Droplets className="mb-2 h-6 w-6 text-blue-500" />
            <span className="text-sm text-muted-foreground">Humidity</span>
            <span className="text-2xl font-semibold">{sensorData.indoor_humidity}%</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <CloudFog className="mb-2 h-6 w-6 text-gray-500" />
            <span className="text-sm text-muted-foreground">CO₂ Level</span>
            <span className="text-2xl font-semibold">{sensorData.co2_level} ppm</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <Wind className="mb-2 h-6 w-6 text-teal-500" />
            <span className="text-sm text-muted-foreground">Outdoor</span>
            <span className="text-2xl font-semibold">{sensorData.outdoor_temp}°C</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Time of Day</span>
            <span className="text-sm">{formatTimeOfDay(sensorData.time_of_day)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-medium">Occupancy</span>
            <span className="text-sm">{sensorData.occupancy ? "Occupied" : "Unoccupied"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function formatTimeOfDay(hour: number): string {
  const date = new Date()
  date.setHours(hour, 0, 0)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
