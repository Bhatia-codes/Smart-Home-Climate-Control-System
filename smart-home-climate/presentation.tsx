"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Thermometer,
  Droplets,
  CloudFog,
  Cpu,
  LayoutDashboard,
  Zap,
  Gauge,
  Leaf,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 8

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev))
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Smart Home Climate Control System</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">
              Slide {currentSlide + 1} of {totalSlides}
            </span>
            <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentSlide === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentSlide === totalSlides - 1}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto">
          {/* Slide 1: System Overview */}
          {currentSlide === 0 && (
            <div className="space-y-6">
              <h2 className="text-center text-3xl font-bold">Smart Home Climate Control System</h2>
              <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground">
                An intelligent system that uses fuzzy logic to optimize home climate for comfort, air quality, and
                energy efficiency
              </p>

              <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="flex flex-col items-center p-6 text-center">
                  <Cpu className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="text-xl font-medium">Backend</h3>
                  <p className="mt-2 text-muted-foreground">
                    FastAPI-powered fuzzy logic engine that processes sensor data and determines optimal climate control
                    settings
                  </p>
                </Card>

                <Card className="flex flex-col items-center p-6 text-center">
                  <LayoutDashboard className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="text-xl font-medium">Frontend</h3>
                  <p className="mt-2 text-muted-foreground">
                    Next.js dashboard that visualizes climate data, system controls, and allows users to set preferences
                  </p>
                </Card>
              </div>

              <div className="mx-auto mt-8 max-w-4xl rounded-lg bg-primary/10 p-6">
                <h3 className="mb-2 text-lg font-medium">Key System Benefits</h3>
                <ul className="grid gap-2 md:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-primary" />
                    <span>Optimal temperature comfort</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    <span>Balanced humidity control</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CloudFog className="h-5 w-5 text-primary" />
                    <span>Improved air quality</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    <span>Energy efficiency</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Slide 2: Backend Architecture */}
          {currentSlide === 1 && (
            <div className="space-y-6">
              <h2 className="text-center text-3xl font-bold">Backend Architecture</h2>
              <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground">
                FastAPI application with fuzzy logic control system
              </p>

              <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-lg border">
                <div className="bg-primary/10 p-4">
                  <h3 className="font-medium">Core Components</h3>
                </div>
                <div className="grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
                  <div className="p-4">
                    <h4 className="mb-2 font-medium">Data Models</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• SensorData</li>
                      <li>• ControlOutput</li>
                      <li>• UserPreference</li>
                    </ul>
                  </div>
                  <div className="p-4">
                    <h4 className="mb-2 font-medium">Fuzzy Logic System</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Input variables</li>
                      <li>• Output variables</li>
                      <li>• Membership functions</li>
                      <li>• Rule definitions</li>
                    </ul>
                  </div>
                  <div className="p-4">
                    <h4 className="mb-2 font-medium">API Endpoints</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• /climate/control</li>
                      <li>• /climate/current</li>
                      <li>• /user/preferences</li>
                      <li>• /system/rules</li>
                      <li>• /system/historical-data</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-8 max-w-4xl">
                <h3 className="mb-4 text-lg font-medium">Fuzzy Logic Control Flow</h3>
                <div className="rounded-lg border">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="flex w-full max-w-2xl flex-col items-center">
                      <div className="mb-4 rounded-lg bg-blue-100 px-4 py-2 dark:bg-blue-900/30">
                        <p className="font-medium">Sensor Data Input</p>
                        <p className="text-sm text-muted-foreground">Temperature, humidity, CO₂, preferences</p>
                      </div>
                      <div className="h-8 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="mb-4 rounded-lg bg-purple-100 px-4 py-2 dark:bg-purple-900/30">
                        <p className="font-medium">Fuzzy Logic Processing</p>
                        <p className="text-sm text-muted-foreground">
                          Fuzzification → Rule evaluation → Defuzzification
                        </p>
                      </div>
                      <div className="h-8 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="rounded-lg bg-green-100 px-4 py-2 dark:bg-green-900/30">
                        <p className="font-medium">Control Output</p>
                        <p className="text-sm text-muted-foreground">
                          HVAC mode, fan speed, humidity control, air purifier
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 3: Frontend Architecture */}
          {currentSlide === 2 && (
            <div className="space-y-6">
              <h2 className="text-center text-3xl font-bold">Frontend Architecture</h2>
              <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground">
                Next.js dashboard with real-time data visualization
              </p>

              <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-lg border">
                <div className="bg-primary/10 p-4">
                  <h3 className="font-medium">Component Structure</h3>
                </div>
                <div className="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
                  <div className="p-4">
                    <h4 className="mb-2 font-medium">Core Components</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Dashboard (main container)</li>
                      <li>• CurrentClimate (sensor data)</li>
                      <li>• ControlPanel (system controls)</li>
                      <li>• UserPreferences (settings)</li>
                    </ul>
                  </div>
                  <div className="p-4">
                    <h4 className="mb-2 font-medium">Data Visualization</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• HistoricalData (charts)</li>
                      <li>• SystemRules (fuzzy rules)</li>
                      <li>• MembershipFunctions (visualization)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-8 max-w-4xl">
                <h3 className="mb-4 text-lg font-medium">Frontend Data Flow</h3>
                <div className="rounded-lg border">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="flex w-full max-w-2xl flex-col items-center">
                      <div className="mb-4 rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                        <p className="font-medium">API Client Layer</p>
                        <p className="text-sm text-muted-foreground">Fetches data from backend endpoints</p>
                      </div>
                      <div className="h-8 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="mb-4 rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                        <p className="font-medium">State Management</p>
                        <p className="text-sm text-muted-foreground">React state and effect hooks</p>
                      </div>
                      <div className="h-8 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                        <p className="font-medium">UI Components</p>
                        <p className="text-sm text-muted-foreground">Visualize data and provide user interaction</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 4: Key Features */}
          {currentSlide === 3 && (
            <div className="space-y-6">
              <h2 className="text-center text-3xl font-bold">Key Features</h2>
              <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground">
                Comprehensive climate control and monitoring capabilities
              </p>

              <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Thermometer className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">Intelligent Climate Control</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Fuzzy logic decision making based on multiple inputs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Balances temperature, humidity, and air quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Adapts to user preferences and environmental conditions</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <LayoutDashboard className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">Real-time Monitoring</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Live display of temperature, humidity, and CO₂ levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Visualization of system control outputs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Auto-refreshing data every 30 seconds</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Gauge className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">User Preference Management</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Adjustable temperature and humidity preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Eco mode for energy-efficient operation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Immediate application of user settings</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">Data Analysis</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Historical data visualization with interactive charts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>System rule visualization and explanation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Adjustable time ranges for data analysis</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          )}

          {/* Slide 5: Data Flow */}
          {currentSlide === 4 && (
            <div className="space-y-6">
              <h2 className="text-center text-3xl font-bold">System Data Flow</h2>
              <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground">
                How data flows between frontend and backend components
              </p>

              <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-lg border">
                <div className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="text-center font-medium">Frontend (Next.js)</h3>
                        <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                          <p className="text-center text-sm font-medium">User Interface</p>
                        </div>
                        <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                          <p className="text-center text-sm font-medium">API Client</p>
                        </div>
                        <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                          <p className="text-center text-sm font-medium">Data Visualization</p>
                        </div>
                      </div>

                      <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="text-center font-medium">Backend (FastAPI)</h3>
                        <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                          <p className="text-center text-sm font-medium">API Endpoints</p>
                        </div>
                        <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                          <p className="text-center text-sm font-medium">Fuzzy Logic Engine</p>
                        </div>
                        <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                          <p className="text-center text-sm font-medium">Data Models</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 w-full max-w-3xl space-y-4">
                      <h3 className="text-center font-medium">Data Exchange</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="w-5/12 rounded-lg bg-blue-100 p-2 text-center text-sm dark:bg-blue-900/30">
                            User adjusts preferences
                          </div>
                          <div className="flex w-2/12 justify-center">
                            <div className="h-0.5 w-full bg-gray-300 dark:bg-gray-700"></div>
                            <div className="absolute">→</div>
                          </div>
                          <div className="w-5/12 rounded-lg bg-green-100 p-2 text-center text-sm dark:bg-green-900/30">
                            POST /user/preferences
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <div className="w-5/12 rounded-lg bg-blue-100 p-2 text-center text-sm dark:bg-blue-900/30">
                            Dashboard requests data
                          </div>
                          <div className="flex w-2/12 justify-center">
                            <div className="h-0.5 w-full bg-gray-300 dark:bg-gray-700"></div>
                            <div className="absolute">→</div>
                          </div>
                          <div className="w-5/12 rounded-lg bg-green-100 p-2 text-center text-sm dark:bg-green-900/30">
                            GET /climate/current
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <div className="w-5/12 rounded-lg bg-green-100 p-2 text-center text-sm dark:bg-green-900/30">
                            Returns control recommendations
                          </div>
                          <div className="flex w-2/12 justify-center">
                            <div className="h-0.5 w-full bg-gray-300 dark:bg-gray-700"></div>
                            <div className="absolute">←</div>
                          </div>
                          <div className="w-5/12 rounded-lg bg-blue-100 p-2 text-center text-sm dark:bg-blue-900/30">
                            Updates UI with new data
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 6: Technologies Used */}
          {currentSlide === 5 && (
            <div className="space-y-6">
              <h2 className="text-center text-3xl font-bold">Technologies Used</h2>
              <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground">
                Modern tech stack for intelligent climate control
              </p>

              <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="p-6">
                  <h3 className="mb-4 text-xl font-medium">Backend</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md bg-primary/10 p-1">
                        <span className="text-xs font-medium text-primary">PY</span>
                      </div>
                      <div>
                        <p className="font-medium">FastAPI</p>
                        <p className="text-sm text-muted-foreground">High-performance API framework</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md bg-primary/10 p-1">
                        <span className="text-xs font-medium text-primary">PY</span>
                      </div>
                      <div>
                        <p className="font-medium">scikit-fuzzy</p>
                        <p className="text-sm text-muted-foreground">Fuzzy logic toolkit for Python</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md bg-primary/10 p-1">
                        <span className="text-xs font-medium text-primary">PY</span>
                      </div>
                      <div>
                        <p className="font-medium">NumPy</p>
                        <p className="text-sm text-muted-foreground">Numerical computing library</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md bg-primary/10 p-1">
                        <span className="text-xs font-medium text-primary">PY</span>
                      </div>
                      <div>
                        <p className="font-medium">Pydantic</p>
                        <p className="text-sm text-muted-foreground">Data validation and settings management</p>
                      </div>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="mb-4 text-xl font-medium">Frontend</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md bg-primary/10 p-1">
                        <span className="text-xs font-medium text-primary">JS</span>
                      </div>
                      <div>
                        <p className="font-medium">Next.js</p>
                        <p className="text-sm text-muted-foreground">React framework for web applications</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md bg-primary/10 p-1">
                        <span className="text-xs font-medium text-primary">JS</span>
                      </div>
                      <div>
                        <p className="font-medium">React</p>
                        <p className="text-sm text-muted-foreground">UI component library</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md bg-primary/10 p-1">
                        <span className="text-xs font-medium text-primary">CSS</span>
                      </div>
                      <div>
                        <p className="font-medium">Tailwind CSS</p>
                        <p className="text-sm text-muted-foreground">Utility-first CSS framework</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md bg-primary/10 p-1">
                        <span className="text-xs font-medium text-primary">JS</span>
                      </div>
                      <div>
                        <p className="font-medium">Recharts</p>
                        <p className="text-sm text-muted-foreground">Responsive chart library</p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>

              <div className="mx-auto mt-6 max-w-4xl">
                <Card className="p-6">
                  <h3 className="mb-4 text-xl font-medium">Communication</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md bg-primary/10 p-1">
                        <span className="text-xs font-medium text-primary">API</span>
                      </div>
                      <div>
                        <p className="font-medium">RESTful API</p>
                        <p className="text-sm text-muted-foreground">JSON-based data exchange</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md bg-primary/10 p-1">
                        <span className="text-xs font-medium text-primary">HTTP</span>
                      </div>
                      <div>
                        <p className="font-medium">CORS-enabled</p>
                        <p className="text-sm text-muted-foreground">Cross-origin resource sharing</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Slide 7: Fuzzy Logic Visualization */}
          {currentSlide === 6 && (
            <div className="space-y-6">
              <h2 className="text-center text-3xl font-bold">Fuzzy Logic System</h2>
              <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground">
                How the system makes intelligent climate control decisions
              </p>

              <div className="mx-auto mt-8 max-w-4xl">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card className="p-6">
                    <h3 className="mb-4 text-lg font-medium">Input Variables</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <div>
                          <p className="font-medium">Indoor Temperature</p>
                          <p className="text-sm text-muted-foreground">10-35°C (cold, comfortable, warm)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <div>
                          <p className="font-medium">Indoor Humidity</p>
                          <p className="text-sm text-muted-foreground">0-100% (dry, comfortable, humid)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <div>
                          <p className="font-medium">CO₂ Level</p>
                          <p className="text-sm text-muted-foreground">300-2000 ppm (good, moderate, poor)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <div>
                          <p className="font-medium">User Preferences</p>
                          <p className="text-sm text-muted-foreground">Temperature and humidity preferences</p>
                        </div>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-4 text-lg font-medium">Output Variables</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <div>
                          <p className="font-medium">HVAC Power</p>
                          <p className="text-sm text-muted-foreground">-100 to 100 (cooling to heating)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <div>
                          <p className="font-medium">Fan Speed</p>
                          <p className="text-sm text-muted-foreground">0-100% (off, low, medium, high, max)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <div>
                          <p className="font-medium">Humidity Control</p>
                          <p className="text-sm text-muted-foreground">-100 to 100 (dehumidify to humidify)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <div>
                          <p className="font-medium">Air Purifier</p>
                          <p className="text-sm text-muted-foreground">0-100% (off, low, medium, high)</p>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </div>

                <div className="mt-6">
                  <Card className="p-6">
                    <h3 className="mb-4 text-lg font-medium">Fuzzy Rule Examples</h3>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                        <p className="text-sm">
                          <span className="font-medium">IF</span> temperature preference difference is too cold
                          <span className="font-medium"> THEN</span> HVAC power is heat high
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                        <p className="text-sm">
                          <span className="font-medium">IF</span> humidity preference difference is too humid
                          <span className="font-medium"> THEN</span> humidity control is dehumidify high
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                        <p className="text-sm">
                          <span className="font-medium">IF</span> CO₂ level is poor
                          <span className="font-medium"> THEN</span> air purifier is high
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                        <p className="text-sm">
                          <span className="font-medium">IF</span> temperature preference difference is too warm AND CO₂
                          level is poor
                          <span className="font-medium"> THEN</span> HVAC power is cool high AND fan speed is max AND
                          air purifier is high
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Slide 8: Demo Scenarios */}
          {currentSlide === 7 && (
            <div className="space-y-6">
              <h2 className="text-center text-3xl font-bold">Demo Scenarios</h2>
              <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground">
                Example use cases demonstrating system capabilities
              </p>

              <div className="mx-auto mt-8 max-w-4xl space-y-6">
                <Card className="overflow-hidden">
                  <div className="bg-primary/10 p-4">
                    <h3 className="font-medium">Scenario 1: Hot Summer Day</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Input Conditions</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Indoor Temperature: 28°C</li>
                          <li>• Indoor Humidity: 65%</li>
                          <li>• CO₂ Level: 900 ppm</li>
                          <li>• User Preference: 22°C, 50% humidity</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">System Response</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• HVAC Mode: Cooling (high)</li>
                          <li>• Fan Speed: 75%</li>
                          <li>• Humidity Control: Dehumidify (medium)</li>
                          <li>• Air Purifier: 30%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="overflow-hidden">
                  <div className="bg-primary/10 p-4">
                    <h3 className="font-medium">Scenario 2: Winter Evening with Poor Air Quality</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Input Conditions</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Indoor Temperature: 18°C</li>
                          <li>• Indoor Humidity: 30%</li>
                          <li>• CO₂ Level: 1400 ppm</li>
                          <li>• User Preference: 22°C, 45% humidity</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">System Response</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• HVAC Mode: Heating (medium)</li>
                          <li>• Fan Speed: 60%</li>
                          <li>• Humidity Control: Humidify (high)</li>
                          <li>• Air Purifier: 90%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="overflow-hidden">
                  <div className="bg-primary/10 p-4">
                    <h3 className="font-medium">Scenario 3: Mild Spring Day</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Input Conditions</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Indoor Temperature: 22°C</li>
                          <li>• Indoor Humidity: 50%</li>
                          <li>• CO₂ Level: 600 ppm</li>
                          <li>• User Preference: 22°C, 50% humidity</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">System Response</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• HVAC Mode: Off</li>
                          <li>• Fan Speed: 20%</li>
                          <li>• Humidity Control: Off</li>
                          <li>• Air Purifier: 10%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        <div className="container mx-auto">
          <p className="text-center text-sm text-muted-foreground">
            Smart Home Climate Control System — Intelligent comfort through fuzzy logic
          </p>
        </div>
      </footer>
    </div>
  )
}
