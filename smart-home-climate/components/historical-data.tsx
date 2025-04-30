"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchHistoricalData } from "@/lib/api"
import type { HistoricalDataPoint } from "@/lib/types"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Loader2 } from "lucide-react"

export default function HistoricalData() {
  const [data, setData] = useState<HistoricalDataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [days, setDays] = useState("7")

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const result = await fetchHistoricalData(Number.parseInt(days))
        setData(result.historical_data)
        setError(null)
      } catch (err) {
        setError("Failed to load historical data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [days])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`
  }

  const processedData = data.map((point) => ({
    ...point,
    formattedTime: formatDate(point.timestamp),
  }))

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <CardTitle>Historical Data</CardTitle>
            <CardDescription>View your climate data over time</CardDescription>
          </div>
          <Select value={days} onValueChange={setDays}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Last day</SelectItem>
              <SelectItem value="7">Last week</SelectItem>
              <SelectItem value="14">Last 2 weeks</SelectItem>
              <SelectItem value="30">Last month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center text-red-500">{error}</div>
        ) : (
          <Tabs defaultValue="temperature">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="humidity">Humidity</TabsTrigger>
              <TabsTrigger value="co2">CO₂ Levels</TabsTrigger>
            </TabsList>

            <TabsContent value="temperature" className="h-64 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="formattedTime" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                  <YAxis
                    domain={[15, 30]}
                    tick={{ fontSize: 12 }}
                    label={{ value: "°C", angle: -90, position: "insideLeft", fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="indoor_temp"
                    name="Indoor Temperature"
                    stroke="#f97316"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="humidity" className="h-64 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="formattedTime" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                  <YAxis
                    domain={[30, 70]}
                    tick={{ fontSize: 12 }}
                    label={{ value: "%", angle: -90, position: "insideLeft", fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="indoor_humidity"
                    name="Indoor Humidity"
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="co2" className="h-64 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="formattedTime" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                  <YAxis
                    domain={[300, 1500]}
                    tick={{ fontSize: 12 }}
                    label={{ value: "ppm", angle: -90, position: "insideLeft", fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="co2_level" name="CO₂ Level" stroke="#6b7280" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
