"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchSystemRules } from "@/lib/api"
import { Loader2 } from "lucide-react"

interface Rule {
  condition: string
  consequence: string
  weight: number
}

interface RuleSet {
  temperature_rules: Rule[]
  humidity_rules: Rule[]
  air_quality_rules: Rule[]
  combined_rules: Rule[]
}

export default function SystemRules() {
  const [rules, setRules] = useState<RuleSet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRules = async () => {
      try {
        setLoading(true)
        const data = await fetchSystemRules()
        setRules(data)
        setError(null)
      } catch (err) {
        setError("Failed to load system rules")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadRules()
  }, [])

  const formatRuleText = (text: string) => {
    return text
      .replace(/\./g, " ")
      .replace(/_/g, " ")
      .split("&")
      .map((part) => part.trim())
      .join(" AND ")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Rules</CardTitle>
        <CardDescription>Fuzzy logic rules that control the climate system</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center text-red-500">{error}</div>
        ) : rules ? (
          <Tabs defaultValue="temperature">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="humidity">Humidity</TabsTrigger>
              <TabsTrigger value="air">Air Quality</TabsTrigger>
              <TabsTrigger value="combined">Combined</TabsTrigger>
            </TabsList>

            <TabsContent value="temperature" className="pt-4">
              <div className="space-y-3">
                {rules.temperature_rules.map((rule, index) => (
                  <div key={index} className="rounded-lg border p-3">
                    <p className="text-sm font-medium">Rule {index + 1}</p>
                    <p className="mt-1 text-sm">
                      <span className="text-muted-foreground">IF </span>
                      <span className="font-medium">{formatRuleText(rule.condition)}</span>
                      <span className="text-muted-foreground"> THEN </span>
                      <span className="font-medium">{formatRuleText(rule.consequence)}</span>
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="humidity" className="pt-4">
              <div className="space-y-3">
                {rules.humidity_rules.map((rule, index) => (
                  <div key={index} className="rounded-lg border p-3">
                    <p className="text-sm font-medium">Rule {index + 1}</p>
                    <p className="mt-1 text-sm">
                      <span className="text-muted-foreground">IF </span>
                      <span className="font-medium">{formatRuleText(rule.condition)}</span>
                      <span className="text-muted-foreground"> THEN </span>
                      <span className="font-medium">{formatRuleText(rule.consequence)}</span>
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="air" className="pt-4">
              <div className="space-y-3">
                {rules.air_quality_rules.map((rule, index) => (
                  <div key={index} className="rounded-lg border p-3">
                    <p className="text-sm font-medium">Rule {index + 1}</p>
                    <p className="mt-1 text-sm">
                      <span className="text-muted-foreground">IF </span>
                      <span className="font-medium">{formatRuleText(rule.condition)}</span>
                      <span className="text-muted-foreground"> THEN </span>
                      <span className="font-medium">{formatRuleText(rule.consequence)}</span>
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="combined" className="pt-4">
              <div className="space-y-3">
                {rules.combined_rules.map((rule, index) => (
                  <div key={index} className="rounded-lg border p-3">
                    <p className="text-sm font-medium">Rule {index + 1}</p>
                    <p className="mt-1 text-sm">
                      <span className="text-muted-foreground">IF </span>
                      <span className="font-medium">{formatRuleText(rule.condition)}</span>
                      <span className="text-muted-foreground"> THEN </span>
                      <span className="font-medium">{formatRuleText(rule.consequence)}</span>
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : null}
      </CardContent>
    </Card>
  )
}
