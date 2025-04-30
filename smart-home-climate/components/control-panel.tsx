import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Thermometer, Fan, Droplets, Wind, Snowflake, Flame } from "lucide-react"
import type { ControlOutput } from "@/lib/types"

interface ControlPanelProps {
  controlOutput: ControlOutput
}

export default function ControlPanel({ controlOutput }: ControlPanelProps) {
  const getHvacIcon = () => {
    switch (controlOutput.hvac_mode) {
      case "cooling":
        return <Snowflake className="h-6 w-6 text-blue-500" />
      case "heating":
        return <Flame className="h-6 w-6 text-orange-500" />
      case "fan":
        return <Fan className="h-6 w-6 text-teal-500" />
      default:
        return <Thermometer className="h-6 w-6 text-gray-500" />
    }
  }

  const getHvacLabel = () => {
    switch (controlOutput.hvac_mode) {
      case "cooling":
        return "Cooling"
      case "heating":
        return "Heating"
      case "fan":
        return "Fan Only"
      default:
        return "Off"
    }
  }

  const getHumidityMode = () => {
    if (controlOutput.humidity_control < -10) return "Dehumidifying"
    if (controlOutput.humidity_control > 10) return "Humidifying"
    return "Maintaining"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">System Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            {getHvacIcon()}
            <div>
              <p className="font-medium">{getHvacLabel()}</p>
              <p className="text-sm text-muted-foreground">HVAC Mode</p>
            </div>
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Active</div>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fan className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Fan Speed</span>
              </div>
              <span className="text-sm">{Math.round(controlOutput.fan_speed)}%</span>
            </div>
            <Progress value={controlOutput.fan_speed} className="h-2" />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Humidity Control</span>
              </div>
              <span className="text-sm">{getHumidityMode()}</span>
            </div>
            <Progress
              value={50 + controlOutput.humidity_control / 2}
              className="h-2"
              indicatorClassName={
                controlOutput.humidity_control < -10
                  ? "bg-amber-500"
                  : controlOutput.humidity_control > 10
                    ? "bg-blue-500"
                    : undefined
              }
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-teal-500" />
                <span className="text-sm font-medium">Air Purifier</span>
              </div>
              <span className="text-sm">{Math.round(controlOutput.air_purifier)}%</span>
            </div>
            <Progress value={controlOutput.air_purifier} className="h-2" />
          </div>
        </div>

        <div className="mt-4">
          <h4 className="mb-2 text-sm font-medium">Rule Activations</h4>
          <div className="space-y-2">
            {Object.entries(controlOutput.rule_activations).map(([rule, value]) => (
              <div key={rule} className="flex items-center justify-between">
                <span className="text-xs capitalize">{rule.replace(/_/g, " ")}</span>
                <Progress value={value} className="h-1.5 w-24" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
