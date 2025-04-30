export interface SensorData {
  indoor_temp: number
  indoor_humidity: number
  co2_level: number
  outdoor_temp: number
  outdoor_humidity: number
  time_of_day: number
  user_temp_preference: number
  user_humidity_preference: number
  occupancy: boolean
}

export interface ControlOutput {
  hvac_mode: string
  fan_speed: number
  humidity_control: number
  air_purifier: number
  rule_activations: Record<string, number>
}

export interface UserPreference {
  temp_preference: number
  humidity_preference: number
  eco_mode: boolean
}

export interface HistoricalDataPoint {
  timestamp: string
  indoor_temp: number
  indoor_humidity: number
  co2_level: number
  hvac_mode: string
  fan_speed: number
  energy_consumption: number
}

export interface MembershipFunction {
  type: string
  params: number[]
}

export interface MembershipFunctionSet {
  domain: number[]
  functions: Record<string, MembershipFunction>
}

export interface MembershipFunctions {
  temperature: MembershipFunctionSet
  humidity: MembershipFunctionSet
  co2_level: MembershipFunctionSet
  hvac_power: MembershipFunctionSet
}
