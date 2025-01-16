export type RecommendationResult = {
  course: string;
  confidence?: number;
};

export type RecommendationError = {
  message: string;
};