/**
 * @fileoverview Enums for various application constants
 */

/**
 * Represents different levels of workout experience
 */
export enum ExperienceLevel {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
  Expert = "expert",
}

/**
 * Represents the current status of a workout
 */
export enum WorkoutStatus {
  Scheduled = "scheduled",
  Completed = "completed",
  Cancelled = "cancelled",
}

/**
 * Represents the status of a buddy connection
 */
export enum BuddyStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

/**
 * Represents gender options
 */
export enum Gender {
  Male = "male",
  Female = "female",
}

/**
 * Represents days of the week
 */
export enum DayOfWeek {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

/**
 * Represents different times of day for workouts
 */
export enum WorkoutTimes {
  Morning = "Morning",
  Afternoon = "Afternoon",
  Evening = "Evening",
}
