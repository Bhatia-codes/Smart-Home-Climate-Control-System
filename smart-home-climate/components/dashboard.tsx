"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CurrentClimate from "@/components/current-climate"
import ControlPanel from "@/components/control-panel"
import HistoricalData from "@/components/historical-data"
import SystemRules from "@/components/system-rules"
import UserPreferences from "@/components/user-preferences"
import type { SensorData, ControlOutput } from "@/lib/types"
import { subscribeToCurrentDataStream } from "@/lib/api"

export default function Dashboard() {
  const [currentData, setCurrentData] = useState<{
    sensor_data: SensorData
    control_output: ControlOutput
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    const eventSource = subscribeToCurrentDataStream(
      (data) => {
        setCurrentData(data)
        setError(null)
        setLoading(false)
      },
      (err) => {
        setError("Failed to stream climate data. Please check your connection.")
        console.error(err)
        setLoading(false)
      }
    )
  
    return () => eventSource.close()
  }, [])  

  return (
    <div className="container mx-auto p-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Smart Home Climate Control
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Monitor and control your home environment</p>
      </header>

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20">
          <CardContent className="p-4 text-red-800 dark:text-red-200">{error}</CardContent>
        </Card>
      )}

      {currentData && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CurrentClimate sensorData={currentData.sensor_data} />
          <ControlPanel controlOutput={currentData.control_output} />
          <UserPreferences
            currentPreferences={{
              temp_preference: currentData.sensor_data.user_temp_preference,
              humidity_preference: currentData.sensor_data.user_humidity_preference,
              eco_mode: false,
            }}
          />
        </div>
      )}

      <Tabs defaultValue="historical" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-3">
          <TabsTrigger value="historical">Historical Data</TabsTrigger>
          <TabsTrigger value="rules">System Rules</TabsTrigger>
          <TabsTrigger value="membership">Membership Functions</TabsTrigger>
        </TabsList>
        <TabsContent value="historical" className="mt-4">
          <HistoricalData />
        </TabsContent>
        <TabsContent value="rules" className="mt-4">
          <SystemRules />
        </TabsContent>
        <TabsContent value="membership" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Membership Functions</CardTitle>
              <CardDescription>Visualize how the fuzzy logic system interprets different input values</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Select a variable to view its membership functions</p>
              {/* Membership functions visualization will be implemented here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
