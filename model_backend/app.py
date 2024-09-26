from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import tensorflow as tf
import pandas as pd
from pydantic import BaseModel
import uvicorn
import logging
import joblib

# Initialize the FastAPI app
app = FastAPI()
# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

model = tf.keras.models.load_model('plant_disease_model.h5')
with open('random_forest_model.pkl', 'rb') as file:
    yield_model = joblib.load(file)

CLASS_NAMES = ('Tomato-Bacterial_spot', 'Potato-Barly blight', 'Corn-Common_rust')

x_max = pd.Series({
    'average_rain_fall_mm_per_year	': 1083,  # Example: 'Temperature'
    'pesticides_tonnes	': 75000, # Example: 'Population'
    'avg_temp': 28.85  # Example: 'Rainfall'
})


def preprocess_input(data_dict, x_max): 
    crop_types = ['Cassava', 'Maize', 'Potatoes', 'Rice, paddy', 'Sorghum', 'Soybeans', 'Sweet potatoes', 'Wheat']
    
    columns = [
        'average_rain_fall_mm_per_year', 'pesticides_tonnes', 'avg_temp', 
        'Area_India'
    ] + [f'Item_{crop}' for crop in crop_types]
    
    input_df = pd.DataFrame([[0] * len(columns)], columns=columns)
    
    input_df['Area_India'] = 1
    
    for key, value in data_dict.items():
        if key in input_df.columns:
            input_df[key] = [value]  # Ensure that we're assigning a list to maintain the correct shape
    
    crop_type = data_dict.get('crop')
    for crop in crop_types:
        input_df[f'Item_{crop}'] = int(crop == crop_type)  # Set 1 if it's the specified crop, else 0
    
    input_df[['average_rain_fall_mm_per_year', 'pesticides_tonnes', 'avg_temp']] = \
        input_df[['average_rain_fall_mm_per_year', 'pesticides_tonnes', 'avg_temp']].divide(x_max.values, axis=1)
    
    return input_df



class YieldInput(BaseModel):
    data: dict

@app.get("/")
def root():
    return {"message": "Plant Disease Detection API is running"}

@app.post("/predict_yield")
async def predict_yield(input_data: YieldInput):
    try:
        processed_data = preprocess_input(input_data.data, x_max)
        logger.info(f"The processed data is {processed_data}")
        prediction = yield_model.predict(processed_data)
        
        return {"predicted_yield": prediction.tolist()}
    
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(ve)}")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")



@app.post("/predict_disease")
async def predict_disease(file: UploadFile = File(...)):
    image_bytes = await file.read()
    logger.info("Received image")
    
    nparr = np.frombuffer(image_bytes, np.uint8)
    opencv_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    logger.info("Converted the image")
    
    opencv_image = cv2.resize(opencv_image, (256, 256))
    logger.info("Resized the image")
    
    opencv_image = np.expand_dims(opencv_image, axis=0)
    logger.info("Converted the image to 4D tensor")
    logger.info("Sending to model for prediction")
    
    y_pred = model.predict(opencv_image)
    predicted_class = CLASS_NAMES[np.argmax(y_pred)]
    
    plant_type, disease = predicted_class.split('-')
    result = f"This is a {plant_type} leaf with {disease}."
    
    return {"prediction": result}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
