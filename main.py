from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional, Any
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl
import datetime
import json
from enum import Enum
import random  # For demo data only
from fastapi.responses import StreamingResponse
import asyncio

app = FastAPI(title="Smart Home Climate Control System")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------ Data Models ------

class SensorData(BaseModel):
    indoor_temp: float
    indoor_humidity: float
    co2_level: float
    outdoor_temp: float
    outdoor_humidity: float
    time_of_day: int  
    user_temp_preference: float
    user_humidity_preference: float
    occupancy: bool


class ControlOutput(BaseModel):
    hvac_mode: str  
    fan_speed: float  
    humidity_control: float  
    air_purifier: float  
    rule_activations: Dict[str, float]
    

class UserPreference(BaseModel):
    temp_preference: float  
    humidity_preference: float  
    eco_mode: bool = False
    
    
# ------ Fuzzy Logic System ------


fuzzy_system = None

def initialize_fuzzy_system():
    """Initialize the fuzzy logic control system"""
    # Input variables
    indoor_temp = ctrl.Antecedent(np.arange(10, 35, 0.1), 'indoor_temp')
    indoor_humidity = ctrl.Antecedent(np.arange(0, 101, 1), 'indoor_humidity')
    co2_level = ctrl.Antecedent(np.arange(300, 2001, 1), 'co2_level')
    outdoor_temp = ctrl.Antecedent(np.arange(-10, 45, 0.1), 'outdoor_temp')
    time_of_day = ctrl.Antecedent(np.arange(0, 24, 1), 'time_of_day')
    temp_preference_diff = ctrl.Antecedent(np.arange(-10, 10.1, 0.1), 'temp_preference_diff')
    humidity_preference_diff = ctrl.Antecedent(np.arange(-40, 40.1, 0.1), 'humidity_preference_diff')
    
    # Output variables
    hvac_power = ctrl.Consequent(np.arange(-100, 100.1, 1), 'hvac_power')  # negative is cooling, positive is heating
    fan_speed = ctrl.Consequent(np.arange(0, 101, 1), 'fan_speed')
    humidity_control = ctrl.Consequent(np.arange(-100, 100.1, 1), 'humidity_control')  # negative is dehumidify, positive is humidify
    air_purifier = ctrl.Consequent(np.arange(0, 100.1, 1), 'air_purifier')
    
    # Membership functions for indoor temperature
    indoor_temp['cold'] = fuzz.trimf(indoor_temp.universe, [10, 15, 20])
    indoor_temp['comfortable'] = fuzz.trimf(indoor_temp.universe, [18, 22, 25])
    indoor_temp['warm'] = fuzz.trimf(indoor_temp.universe, [23, 28, 35])
    
    # Membership functions for indoor humidity
    indoor_humidity['dry'] = fuzz.trimf(indoor_humidity.universe, [0, 20, 40])
    indoor_humidity['comfortable'] = fuzz.trimf(indoor_humidity.universe, [30, 50, 70])
    indoor_humidity['humid'] = fuzz.trimf(indoor_humidity.universe, [60, 80, 100])
    
    # Membership functions for CO2 level
    co2_level['good'] = fuzz.trimf(co2_level.universe, [300, 500, 800])
    co2_level['moderate'] = fuzz.trimf(co2_level.universe, [700, 1000, 1300])
    co2_level['poor'] = fuzz.trimf(co2_level.universe, [1200, 1600, 2000])
    
    # Membership functions for outdoor temperature
    outdoor_temp['very_cold'] = fuzz.trimf(outdoor_temp.universe, [-10, -5, 5])
    outdoor_temp['cold'] = fuzz.trimf(outdoor_temp.universe, [0, 10, 15])
    outdoor_temp['mild'] = fuzz.trimf(outdoor_temp.universe, [10, 18, 25])
    outdoor_temp['warm'] = fuzz.trimf(outdoor_temp.universe, [20, 28, 35])
    outdoor_temp['hot'] = fuzz.trimf(outdoor_temp.universe, [30, 38, 45])
    
    # Membership functions for time of day
    time_of_day['night'] = fuzz.trimf(time_of_day.universe, [0, 4, 8])
    time_of_day['morning'] = fuzz.trimf(time_of_day.universe, [6, 9, 12])
    time_of_day['afternoon'] = fuzz.trimf(time_of_day.universe, [11, 15, 18])
    time_of_day['evening'] = fuzz.trimf(time_of_day.universe, [17, 20, 23])
    time_of_day['late_night'] = fuzz.trimf(time_of_day.universe, [21, 23, 23.999])
    
    # Membership functions for temperature preference difference (current - preferred)
    temp_preference_diff['too_cold'] = fuzz.trimf(temp_preference_diff.universe, [-10, -5, -2])
    temp_preference_diff['slightly_cold'] = fuzz.trimf(temp_preference_diff.universe, [-4, -2, 0])
    temp_preference_diff['optimal'] = fuzz.trimf(temp_preference_diff.universe, [-1, 0, 1])
    temp_preference_diff['slightly_warm'] = fuzz.trimf(temp_preference_diff.universe, [0, 2, 4])
    temp_preference_diff['too_warm'] = fuzz.trimf(temp_preference_diff.universe, [2, 5, 10])
    
    # Membership functions for humidity preference difference (current - preferred)
    humidity_preference_diff['too_dry'] = fuzz.trimf(humidity_preference_diff.universe, [-40, -25, -10])
    humidity_preference_diff['slightly_dry'] = fuzz.trimf(humidity_preference_diff.universe, [-20, -10, 0])
    humidity_preference_diff['optimal'] = fuzz.trimf(humidity_preference_diff.universe, [-5, 0, 5])
    humidity_preference_diff['slightly_humid'] = fuzz.trimf(humidity_preference_diff.universe, [0, 10, 20])
    humidity_preference_diff['too_humid'] = fuzz.trimf(humidity_preference_diff.universe, [10, 25, 40])
    
    # Membership functions for HVAC power
    hvac_power['cool_high'] = fuzz.trimf(hvac_power.universe, [-100, -80, -60])
    hvac_power['cool_medium'] = fuzz.trimf(hvac_power.universe, [-70, -50, -30])
    hvac_power['cool_low'] = fuzz.trimf(hvac_power.universe, [-40, -20, 0])
    hvac_power['off'] = fuzz.trimf(hvac_power.universe, [-10, 0, 10])
    hvac_power['heat_low'] = fuzz.trimf(hvac_power.universe, [0, 20, 40])
    hvac_power['heat_medium'] = fuzz.trimf(hvac_power.universe, [30, 50, 70])
    hvac_power['heat_high'] = fuzz.trimf(hvac_power.universe, [60, 80, 100])
    
    # Membership functions for fan speed
    fan_speed['off'] = fuzz.trimf(fan_speed.universe, [0, 0, 10])
    fan_speed['low'] = fuzz.trimf(fan_speed.universe, [5, 25, 45])
    fan_speed['medium'] = fuzz.trimf(fan_speed.universe, [35, 50, 65])
    fan_speed['high'] = fuzz.trimf(fan_speed.universe, [55, 75, 95])
    fan_speed['max'] = fuzz.trimf(fan_speed.universe, [85, 100, 100])
    
    # Membership functions for humidity control
    humidity_control['dehumidify_high'] = fuzz.trimf(humidity_control.universe, [-100, -80, -60])
    humidity_control['dehumidify_low'] = fuzz.trimf(humidity_control.universe, [-70, -40, -10])
    humidity_control['off'] = fuzz.trimf(humidity_control.universe, [-20, 0, 20])
    humidity_control['humidify_low'] = fuzz.trimf(humidity_control.universe, [10, 40, 70])
    humidity_control['humidify_high'] = fuzz.trimf(humidity_control.universe, [60, 80, 100])
    
    # Membership functions for air purifier
    air_purifier['off'] = fuzz.trimf(air_purifier.universe, [0, 0, 20])
    air_purifier['low'] = fuzz.trimf(air_purifier.universe, [10, 30, 50])
    air_purifier['medium'] = fuzz.trimf(air_purifier.universe, [40, 60, 80])
    air_purifier['high'] = fuzz.trimf(air_purifier.universe, [70, 100, 100])
    
    # Rules for temperature control
    rules = [
        # Temperature comfort rules
        ctrl.Rule(temp_preference_diff['too_cold'], hvac_power['heat_high']),
        ctrl.Rule(temp_preference_diff['slightly_cold'], hvac_power['heat_low']),
        ctrl.Rule(temp_preference_diff['optimal'], hvac_power['off']),
        ctrl.Rule(temp_preference_diff['slightly_warm'], hvac_power['cool_low']),
        ctrl.Rule(temp_preference_diff['too_warm'], hvac_power['cool_high']),
        
        # Humidity comfort rules
        ctrl.Rule(humidity_preference_diff['too_dry'], humidity_control['humidify_high']),
        ctrl.Rule(humidity_preference_diff['slightly_dry'], humidity_control['humidify_low']),
        ctrl.Rule(humidity_preference_diff['optimal'], humidity_control['off']),
        ctrl.Rule(humidity_preference_diff['slightly_humid'], humidity_control['dehumidify_low']),
        ctrl.Rule(humidity_preference_diff['too_humid'], humidity_control['dehumidify_high']),
        
        # CO2 level rules for air quality
        ctrl.Rule(co2_level['good'], air_purifier['off']),
        ctrl.Rule(co2_level['moderate'], air_purifier['low']),
        ctrl.Rule(co2_level['poor'], air_purifier['high']),
        
        # Time of day rules for fan speed
        ctrl.Rule(time_of_day['night'] & temp_preference_diff['optimal'], fan_speed['low']),
        ctrl.Rule(time_of_day['night'] & temp_preference_diff['slightly_warm'], fan_speed['medium']),
        ctrl.Rule(time_of_day['afternoon'] & temp_preference_diff['too_warm'], fan_speed['high']),
        
        # CO2 level rules for fan speed
        ctrl.Rule(co2_level['poor'], fan_speed['high']),
        ctrl.Rule(co2_level['moderate'] & temp_preference_diff['optimal'], fan_speed['medium']),
        
        # Combined conditions
        ctrl.Rule(temp_preference_diff['too_warm'] & co2_level['poor'], (hvac_power['cool_high'], fan_speed['max'], air_purifier['high'])),
        ctrl.Rule(temp_preference_diff['too_cold'] & humidity_preference_diff['too_dry'], (hvac_power['heat_medium'], humidity_control['humidify_high'])),
    ]
    
    # Create the control system
    climate_ctrl = ctrl.ControlSystem(rules)
    
    return ctrl.ControlSystemSimulation(climate_ctrl)

async def process_climate_control_logic(data: SensorData) -> ControlOutput:

    global fuzzy_system

    try:

        if not fuzzy_system:
            fuzzy_system = initialize_fuzzy_system()

        # Calculate differences between actual and preferred values
        temp_diff = data.indoor_temp - data.user_temp_preference
        humidity_diff = data.indoor_humidity - data.user_humidity_preference

        # Set inputs for fuzzy system
        fuzzy_system.input['co2_level'] = data.co2_level
        fuzzy_system.input['time_of_day'] = data.time_of_day
        fuzzy_system.input['temp_preference_diff'] = temp_diff
        fuzzy_system.input['humidity_preference_diff'] = humidity_diff


        # Compute the fuzzy system output
        fuzzy_system.compute()

        # Get the outputs
        hvac_power_value = fuzzy_system.output['hvac_power']
        fan_speed_value = fuzzy_system.output['fan_speed']
        humidity_control_value = fuzzy_system.output['humidity_control']
        air_purifier_value = fuzzy_system.output['air_purifier']

        # Determine HVAC mode based on hvac_power
        if hvac_power_value < -10:
            hvac_mode = "cooling"
        elif hvac_power_value > 10:
            hvac_mode = "heating"
        elif fan_speed_value > 10:
            hvac_mode = "fan"
        else:
            hvac_mode = "off"

        # Simulate rule activations (example logic)
        rule_activations = {
            "temp_comfort": abs(temp_diff) * 10,
            "humidity_comfort": abs(humidity_diff) * 2,
            "air_quality": data.co2_level / 2000 * 100,
            "energy_efficiency": 100 - abs(hvac_power_value)
        }

        return ControlOutput(
            hvac_mode=hvac_mode,
            fan_speed=fan_speed_value,
            humidity_control=humidity_control_value,
            air_purifier=air_purifier_value,
            rule_activations=rule_activations
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing climate control: {str(e)}")



# ------ API Endpoints ------

@app.on_event("startup")
async def startup_event():
    global fuzzy_system
    fuzzy_system = initialize_fuzzy_system()


@app.get("/")
async def root():
    return {"message": "Smart Home Climate Control System API"}


@app.post("/climate/control", response_model=ControlOutput)
async def get_climate_control(data: SensorData):
    return await process_climate_control_logic(data)



@app.get("/climate/current")
async def stream_climate_data():
    async def event_generator():
        while True:
            try:
                current_hour = datetime.datetime.now().hour

                indoor_temp = round(random.uniform(19, 27), 1)
                indoor_humidity = round(random.uniform(35, 65))
                co2_level = round(random.uniform(400, 1200))
                outdoor_temp = round(random.uniform(10, 32), 1)
                outdoor_humidity = round(random.uniform(30, 80))

                user_temp_preference = 22.0
                user_humidity_preference = 50.0

                sensor_data = SensorData(
                    indoor_temp=indoor_temp,
                    indoor_humidity=indoor_humidity,
                    co2_level=co2_level,
                    outdoor_temp=outdoor_temp,
                    outdoor_humidity=outdoor_humidity,
                    time_of_day=current_hour,
                    user_temp_preference=user_temp_preference,
                    user_humidity_preference=user_humidity_preference,
                    occupancy=True
                )

                control = await process_climate_control_logic(sensor_data)

                data = {
                    "sensor_data": sensor_data.dict(),
                    "control_output": control.dict()
                }

                # Yield the data as an SSE-formatted event
                yield f"data: {json.dumps(data)}\n\n"

                await asyncio.sleep(2)  # Adjust frequency here

            except Exception as e:
                # Skip this iteration if an error occurs, do not send anything
                await asyncio.sleep(2)
                continue

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@app.post("/user/preferences")
async def update_user_preferences(preferences: UserPreference):
    """Update user preferences (simulated)"""
    # In a real system, this would save to a database
    return {
        "message": "User preferences updated successfully",
        "preferences": preferences.dict()
    }


@app.get("/system/rules")
async def get_fuzzy_rules():
    """Return a representation of the fuzzy rules for visualization"""
    # In a real system, this would extract the actual rules from the fuzzy system
    return {
        "temperature_rules": [
            {"condition": "temp_preference_diff.too_cold", "consequence": "hvac_power.heat_high", "weight": 1.0},
            {"condition": "temp_preference_diff.slightly_cold", "consequence": "hvac_power.heat_low", "weight": 1.0},
            {"condition": "temp_preference_diff.optimal", "consequence": "hvac_power.off", "weight": 1.0},
            {"condition": "temp_preference_diff.slightly_warm", "consequence": "hvac_power.cool_low", "weight": 1.0},
            {"condition": "temp_preference_diff.too_warm", "consequence": "hvac_power.cool_high", "weight": 1.0}
        ],
        "humidity_rules": [
            {"condition": "humidity_preference_diff.too_dry", "consequence": "humidity_control.humidify_high", "weight": 1.0},
            {"condition": "humidity_preference_diff.slightly_dry", "consequence": "humidity_control.humidify_low", "weight": 1.0},
            {"condition": "humidity_preference_diff.optimal", "consequence": "humidity_control.off", "weight": 1.0},
            {"condition": "humidity_preference_diff.slightly_humid", "consequence": "humidity_control.dehumidify_low", "weight": 1.0},
            {"condition": "humidity_preference_diff.too_humid", "consequence": "humidity_control.dehumidify_high", "weight": 1.0}
        ],
        "air_quality_rules": [
            {"condition": "co2_level.good", "consequence": "air_purifier.off", "weight": 1.0},
            {"condition": "co2_level.moderate", "consequence": "air_purifier.low", "weight": 1.0},
            {"condition": "co2_level.poor", "consequence": "air_purifier.high", "weight": 1.0}
        ],
        "combined_rules": [
            {"condition": "temp_preference_diff.too_warm & co2_level.poor", "consequence": "hvac_power.cool_high & fan_speed.max & air_purifier.high", "weight": 1.0},
            {"condition": "temp_preference_diff.too_cold & humidity_preference_diff.too_dry", "consequence": "hvac_power.heat_medium & humidity_control.humidify_high", "weight": 1.0}
        ]
    }


@app.get("/system/membership-functions")
async def get_membership_functions():
    """Return membership function definitions for visualization"""
    return {
        "temperature": {
            "domain": list(range(10, 35)),
            "functions": {
                "cold": {"type": "trimf", "params": [10, 15, 20]},
                "comfortable": {"type": "trimf", "params": [18, 22, 25]},
                "warm": {"type": "trimf", "params": [23, 28, 35]}
            }
        },
        "humidity": {
            "domain": list(range(0, 101)),
            "functions": {
                "dry": {"type": "trimf", "params": [0, 20, 40]},
                "comfortable": {"type": "trimf", "params": [30, 50, 70]},
                "humid": {"type": "trimf", "params": [60, 80, 100]}
            }
        },
        "co2_level": {
            "domain": list(range(300, 2001, 50)),
            "functions": {
                "good": {"type": "trimf", "params": [300, 500, 800]},
                "moderate": {"type": "trimf", "params": [700, 1000, 1300]},
                "poor": {"type": "trimf", "params": [1200, 1600, 2000]}
            }
        },
        "hvac_power": {
            "domain": list(range(-100, 101, 5)),
            "functions": {
                "cool_high": {"type": "trimf", "params": [-100, -80, -60]},
                "cool_medium": {"type": "trimf", "params": [-70, -50, -30]},
                "cool_low": {"type": "trimf", "params": [-40, -20, 0]},
                "off": {"type": "trimf", "params": [-10, 0, 10]},
                "heat_low": {"type": "trimf", "params": [0, 20, 40]},
                "heat_medium": {"type": "trimf", "params": [30, 50, 70]},
                "heat_high": {"type": "trimf", "params": [60, 80, 100]}
            }
        }
    }


@app.get("/system/historical-data")
async def get_historical_data(days: int = Query(7, ge=1, le=30)):
    """Generate simulated historical climate data for visualization"""
    now = datetime.datetime.now()
    historical_data = []
    
    for day in range(days):
        for hour in range(0, 24, 3):  # Every 3 hours
            timestamp = now - datetime.timedelta(days=day, hours=now.hour-hour)
            
            # Generate plausible data
            if hour < 6 or hour > 20:  # Night
                indoor_temp = round(random.uniform(19, 22), 1)
            else:  # Day
                indoor_temp = round(random.uniform(21, 25), 1)
                
            if hour < 12:  # Morning
                co2_level = round(random.uniform(400, 700))
            else:  # Afternoon/evening
                co2_level = round(random.uniform(600, 1100))
                
            indoor_humidity = round(random.uniform(40, 60))
            
            historical_data.append({
                "timestamp": timestamp.isoformat(),
                "indoor_temp": indoor_temp,
                "indoor_humidity": indoor_humidity,
                "co2_level": co2_level,
                "hvac_mode": random.choice(["heating", "cooling", "fan", "off"]),
                "fan_speed": round(random.uniform(0, 100)),
                "energy_consumption": round(random.uniform(0.1, 2.5), 2)
            })
    
    return {"historical_data": historical_data}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)