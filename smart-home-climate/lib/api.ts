import type { UserPreference } from "./types"

// Base URL for the API
const API_BASE_URL = "http://localhost:8000"

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.detail || `API error: ${response.status}`)
  }
  return response.json()
}

// Fetch current climate data
export function subscribeToCurrentDataStream(onMessage: (data: any) => void, onError?: (err: any) => void) {
  const eventSource = new EventSource(`${API_BASE_URL}/climate/current`)

  eventSource.onmessage = (event) => {
    try {
      const parsed = JSON.parse(event.data)
      onMessage(parsed)
    } catch (e) {
      console.error("Failed to parse SSE data", e)
    }
  }

  eventSource.onerror = (err) => {
    console.error("SSE error:", err)
    if (onError) onError(err)
    eventSource.close()
  }

  return eventSource // So caller can `.close()` it when needed
}

// Update user preferences
export async function updateUserPreferences(preferences: UserPreference) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    })
    return handleResponse(response)
  } catch (error) {
    console.error("Error updating preferences:", error)
    throw error
  }
}

// Fetch historical climate data
export async function fetchHistoricalData(days = 7) {
  try {
    const response = await fetch(`${API_BASE_URL}/system/historical-data?days=${days}`)
    return handleResponse(response)
  } catch (error) {
    console.error("Error fetching historical data:", error)
    throw error
  }
}

// Fetch system rules
export async function fetchSystemRules() {
  try {
    const response = await fetch(`${API_BASE_URL}/system/rules`)
    return handleResponse(response)
  } catch (error) {
    console.error("Error fetching system rules:", error)
    throw error
  }
}

// Fetch membership functions
export async function fetchMembershipFunctions() {
  try {
    const response = await fetch(`${API_BASE_URL}/system/membership-functions`)
    return handleResponse(response)
  } catch (error) {
    console.error("Error fetching membership functions:", error)
    throw error
  }
}
