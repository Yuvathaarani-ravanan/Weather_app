import requests
from django.shortcuts import render

API_KEY = "3215824159bffd1ccd4c298a17af2a72"
BASE_URL = "https://api.openweathermap.org/data/2.5/"
GEO_URL = "http://api.openweathermap.org/geo/1.0/direct"

def home(request):
    return render(request, "weather_app/home.html")

def current_weather(request):
    weather = None
    error = None

    if request.method == "POST":
        city = request.POST.get("city")
        if city:
            geo_params = {"q": city, "appid": API_KEY, "limit": 1}
            geo_response = requests.get(GEO_URL, params=geo_params)
            geo_data = geo_response.json()

            if geo_data:
                lat = geo_data[0]["lat"]
                lon = geo_data[0]["lon"]
                weather_url = f"{BASE_URL}weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric&lang=en"
                response = requests.get(weather_url)

                if response.status_code == 200:
                    weather = response.json()
                else:
                    error = "Weather data not found."
            else:
                error = "Location not found."
        else:
            error = "Please enter a location name."

    return render(request, "weather_app/current.html", {"weather": weather, "error": error})

def daily_weather(request):
    daily = None
    error = None
    city_name = ""

    if request.method == "POST":
        city = request.POST.get("city")
        if city:
            geo_params = {"q": city, "appid": API_KEY, "limit": 1}
            geo_response = requests.get(GEO_URL, params=geo_params)
            geo_data = geo_response.json()

            if geo_data:
                lat = geo_data[0]["lat"]
                lon = geo_data[0]["lon"]
                weather_url = f"{BASE_URL}forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric&lang=en"
                response = requests.get(weather_url)

                if response.status_code == 200:
                    data = response.json()
                    city_name = data["city"]["name"]
                    daily = []
                    for i in range(0, len(data["list"]), 8):
                        entry = data["list"][i]
                        daily.append({
                            "date": entry["dt_txt"].split(" ")[0],
                            "temp": entry["main"]["temp"],
                            "humidity": entry["main"]["humidity"],
                            "description": entry["weather"][0]["description"]
                        })
                else:
                    error = "Weather data not found."
            else:
                error = "Location not found."
        else:
            error = "Please enter a location name."

    return render(request, "weather_app/daily.html", {"daily": daily, "city_name": city_name, "error": error})

def forecast_weather(request):
    forecast_data = []
    city_name = ""
    error = None

    if request.method == "POST":
        typed_city = request.POST.get("city", "").strip()
        city = typed_city if typed_city else "Srivilliputhur"

        # Geolocation API
        geo_params = {"q": city, "appid": API_KEY, "limit": 1}
        geo_response = requests.get(GEO_URL, params=geo_params)
        geo_data = geo_response.json()

        if not geo_data:
            city = "Srivilliputhur"
            geo_params["q"] = city
            geo_response = requests.get(GEO_URL, params=geo_params)
            geo_data = geo_response.json()
            error = f"Location not found. Showing weather for fallback: {city}"

        if geo_data:
            lat, lon = geo_data[0]["lat"], geo_data[0]["lon"]
            city_name = geo_data[0]["name"]
            url = f"{BASE_URL}forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric&lang=en"
            response = requests.get(url)

            if response.status_code == 200:
                data = response.json()
                for i in range(0, len(data["list"]), 8):
                    entry = data["list"][i]
                    forecast_data.append({
                        "date": entry["dt_txt"].split(" ")[0],
                        "temp": entry["main"]["temp"],
                        "humidity": entry["main"]["humidity"],
                        "description": entry["weather"][0]["description"],
                    })
            else:
                error = "Could not fetch forecast data."
        else:
            error = "Unable to retrieve location."

    return render(request, "weather_app/forecast.html", {
        "forecast": forecast_data,
        "city_name": city_name,
        "error": error
    }
    )