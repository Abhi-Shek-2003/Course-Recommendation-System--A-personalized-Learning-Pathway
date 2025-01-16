from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict
import random

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load and prepare data
data = pd.read_excel('data/Anon_Data.xlsx')
roll_number_mapping = {roll: idx + 1 for idx, roll in enumerate(data['RollNumber'].unique())}
data['RollNumber'] = data['RollNumber'].map(roll_number_mapping)

# Prepare ratings matrix for collaborative filtering
ratings_matrix = data.pivot_table(
    index='RollNumber', 
    columns='Course Code', 
    values='Marks (200)'
).fillna(0)

# Compute user similarity matrix
user_similarity = cosine_similarity(ratings_matrix)
user_similarity_df = pd.DataFrame(
    user_similarity, 
    index=ratings_matrix.index, 
    columns=ratings_matrix.index
)

# Calculate course statistics for content-based filtering
course_stats = data.groupby('Course Code').agg({
    'Marks (200)': ['mean', 'std', 'count']
}).reset_index()
course_stats.columns = ['Course Code', 'Average Marks', 'Std Dev', 'Student Count']

class MarksInput(BaseModel):
    marks: float

class StudentInput(BaseModel):
    student_id: int

def get_course_difficulty(marks: float) -> str:
    if marks < 70:
        return "basic"
    elif marks < 140:
        return "intermediate"
    else:
        return "advanced"

def content_based_recommend(marks: float) -> Dict:
    if not 0 <= marks <= 200:
        raise HTTPException(status_code=400, detail="Marks must be between 0 and 200")
    
    difficulty = get_course_difficulty(marks)
    
    # Filter courses based on difficulty level
    if difficulty == "basic":
        suitable_courses = course_stats[course_stats['Average Marks'] <= 100]
    elif difficulty == "intermediate":
        suitable_courses = course_stats[
            (course_stats['Average Marks'] > 100) & 
            (course_stats['Average Marks'] <= 160)
        ]
    else:
        suitable_courses = course_stats[course_stats['Average Marks'] > 160]
    
    if suitable_courses.empty:
        suitable_courses = course_stats  # Fallback to all courses
    
    # Calculate confidence based on how close the marks are to course averages
    suitable_courses['Confidence'] = 1 - abs(suitable_courses['Average Marks'] - marks) / 200
    
    # Get top 3 recommendations
    top_recommendations = suitable_courses.nlargest(3, 'Confidence')
    
    # Select one recommendation randomly from top 3 with confidence
    selected = top_recommendations.sample(n=1).iloc[0]
    
    return {
        "course": selected['Course Code'],
        "confidence": round(float(selected['Confidence']), 2)
    }

def collaborative_recommend(student_id: int) -> Dict:
    if student_id not in ratings_matrix.index:
        raise HTTPException(status_code=404, detail="Student ID not found")
    
    similar_students = user_similarity_df[student_id].sort_values(ascending=False)[1:6]  # Get top 5 similar students
    
    if similar_students.sum() == 0:
        raise HTTPException(status_code=404, detail="No similar students found")
    
    # Get courses taken by similar students
    similar_student_courses = ratings_matrix.loc[similar_students.index]
    
    # Calculate weighted average marks for each course
    weighted_scores = similar_student_courses.T.dot(similar_students)
    course_weights = similar_students.sum()
    
    if course_weights == 0:
        raise HTTPException(status_code=404, detail="No recommendations found")
    
    weighted_scores /= course_weights
    
    # Filter out courses the student has already taken
    student_courses = ratings_matrix.loc[student_id]
    new_courses = weighted_scores[student_courses == 0]
    
    if new_courses.empty:
        raise HTTPException(status_code=404, detail="No new courses to recommend")
    
    # Get top 3 recommendations
    top_recommendations = new_courses.nlargest(3)
    
    # Select one recommendation randomly from top 3
    selected_course = random.choice(top_recommendations.index)
    confidence = float(weighted_scores[selected_course] / weighted_scores.max())
    
    return {
        "course": selected_course,
        "confidence": round(confidence, 2)
    }

@app.post("/recommend/collaborative")
async def get_collaborative_recommendation(input: StudentInput):
    try:
        return collaborative_recommend(input.student_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/recommend/content")
async def get_content_recommendation(input: MarksInput):
    try:
        return content_based_recommend(input.marks)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}