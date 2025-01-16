const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function getContentRecommendation(marks: string) {
  const response = await fetch(`${API_URL}/recommend/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ marks: Number(marks) }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get recommendation');
  }

  return response.json();
}

export async function getCollaborativeRecommendation(studentId: string) {
  const response = await fetch(`${API_URL}/recommend/collaborative`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ student_id: Number(studentId) }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get recommendation');
  }

  return response.json();
}