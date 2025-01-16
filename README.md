# Course Recommendation System

A sophisticated recommendation system that helps students choose elective courses based on their academic performance and peer learning patterns. The system employs both content-based and collaborative filtering approaches to provide personalized course recommendations.

![CourseCompass Screenshot](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400)

## Features

- **Dual Recommendation Approaches**
  - Content-Based Filtering: Recommends courses based on student's academic performance
  - Collaborative Filtering: Suggests courses based on similar student profiles

- **Smart Analysis**
  - Analyzes course difficulty levels
  - Considers student performance patterns
  - Provides confidence scores for recommendations

- **Modern User Interface**
  - Responsive design for all devices
  - Intuitive user experience
  - Real-time recommendation results
  - Professional and clean interface

## Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React Icons

### Backend
- FastAPI
- Python 3.x
- Pandas
- NumPy
- Scikit-learn

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- pip (Python package manager)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Place your dataset:
   - Add `Anon_Data.xlsx` in the `backend/data` directory

4. Start the backend server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Frontend Setup
1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:8000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Access the application through your web browser
2. Choose between content-based or collaborative recommendation
3. For content-based:
   - Enter your marks (0-200)
4. For collaborative:
   - Enter your student ID
5. Receive personalized course recommendations with confidence scores

## API Endpoints

- `POST /recommend/content`: Content-based recommendation
  - Request body: `{ "marks": number }`

- `POST /recommend/collaborative`: Collaborative filtering recommendation
  - Request body: `{ "student_id": number }`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Dataset provided by the academic institution
- Built as part of the Final Year Project
- Special thanks to all contributors and advisors

## Contact
- **Author:** Abhishek A  
- **Email:** [abhidhanu619@gmail.com]  
- **LinkedIn:** [linkedin.com/in/myprofile](https://linkedin.com/in/yourprofile)
