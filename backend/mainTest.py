import cv2
from keras.models import load_model
from PIL import Image
import numpy as np
import os

# Load the model
model = load_model('BrainTumor10EpochsCategorical.h5')

# Define the input size
INPUT_SIZE = 64

# Define the folder containing images
input_folder = '/Users/alindan/Desktop/Brain_Tumors_Detection/backend/pred'

# Define the output text file
output_file = 'predictions.txt'

# Open the output file for writing
with open(output_file, 'w') as f:
    # Iterate through all files in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith('.jpg'):
            # Load and preprocess the image
            image_path = os.path.join(input_folder, filename)
            image = cv2.imread(image_path)
            img = Image.fromarray(image)
            img = img.resize((INPUT_SIZE, INPUT_SIZE))
            img = np.array(img)
            input_img = np.expand_dims(img, axis=0)

            # Make predictions
            class_probabilities = model.predict(input_img)
            predicted_class = np.argmax(class_probabilities)

            # Determine the result and write it to the output file
            if predicted_class == 1:
                result = "has brain tumor"
            else:
                result = "does not have brain tumor"

            # Write the filename and result to the output file
            f.write(f"{filename}: {result}\n")

print("Predictions written to", output_file)
