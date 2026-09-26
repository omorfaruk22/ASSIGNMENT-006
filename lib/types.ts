export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  description: string;
  instructions: string[];
}

export interface PlanWorkout extends Workout { done: boolean }
export interface StorageData { plan: PlanWorkout[]; saved: Workout[] }
export interface Totals { exercises: number; minutes: number; calories: number }
export type SortType = 'duration' | 'calories' | 'rating';
export type PlanTab = 'plan' | 'saved';
