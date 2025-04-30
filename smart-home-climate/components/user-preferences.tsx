"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Thermometer, Droplets, Leaf } from "lucide-react"
import { updateUserPreferences } from "@/lib/api"
import type { UserPreference } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface UserPreferencesProps {
  currentPreferences: UserPreference
}

export default function UserPreferences({ currentPreferences }: UserPreferencesProps) {
  const [preferences, setPreferences] = useState<UserPreference>(currentPreferences)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      await updateUserPreferences(preferences)
      toast({
        title: "Preferences updated",
        description: "Your climate preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Failed to update",
        description: "There was a problem updating your preferences.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">User Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Temperature</span>
              </div>
              <span className="text-sm">{preferences.temp_preference}°C</span>
            </div>
            <Slider
              value={[preferences.temp_preference]}
              min={18}
              max={26}
              step={0.5}
              onValueChange={(value) => setPreferences({ ...preferences, temp_preference: value[0] })}
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>18°C</span>
              <span>26°C</span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Humidity</span>
              </div>
              <span className="text-sm">{preferences.humidity_preference}%</span>
            </div>
            <Slider
              value={[preferences.humidity_preference]}
              min={30}
              max={70}
              step={1}
              onValueChange={(value) => setPreferences({ ...preferences, humidity_preference: value[0] })}
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>30%</span>
              <span>70%</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Eco Mode</span>
            </div>
            <Switch
              checked={preferences.eco_mode}
              onCheckedChange={(checked) => setPreferences({ ...preferences, eco_mode: checked })}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
