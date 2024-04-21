import { gql } from "graphql-tag";

export const schema = gql`
scalar Date

type User {
  id: ID!
  email: String
  age: Int
  gender: Gender
  weight: Int
  height: Int
  activityLevel: ActivityLevel
  goal: Goal
  disabilities: String
  metabolicRate: Int
  dailyWater: Int
  dailyCalories: Int
  dailyProteins: Int
  dailyFats: Int
  dailyCarbs: Int
  nutritionRecommendations: String
  supplementRecommendations: String
  fullAccess: Boolean
  isFilled: Boolean
}

type Plate {
  id: ID!
  food: String!
  calories: Int!
  proteins: Int!
  fats: Int!
  carbs: Int!
  createdAt: Date!
  updatedAt: Date!
  date: Date!
  userId: ID!
}

type Preset {
  id: ID!
  plates: [Plate!]!
}

input UserInput {
  age: Int
  gender: Gender
  weight: Int
  height: Int
  activityLevel: ActivityLevel
  goal: Goal
  disabilities: String
}

type Query {
  me: User
  plates(date: Date): [Plate]!
  presets: [Preset]!
}

type Mutation {
  updateUser(input: UserInput): User
}

enum Gender {
  male
  female
}

enum ActivityLevel {
  none
  low
  moderate
  high
}

enum Goal {
  weight_loss
  muscle_gain
  weight_maintenance
  health_improvement
}
`;
