import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type ActivityLevel =
  | 'high'
  | 'low'
  | 'moderate'
  | 'none';

export type Gender =
  | 'female'
  | 'male';

export type Goal =
  | 'health_improvement'
  | 'muscle_gain'
  | 'weight_loss'
  | 'weight_maintenance';

export type Mutation = {
  __typename?: 'Mutation';
  updateUser: Maybe<User>;
};


export type MutationUpdateUserArgs = {
  input: InputMaybe<UserInput>;
};

export type Plate = {
  __typename?: 'Plate';
  calories: Scalars['Int']['output'];
  carbs: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  date: Scalars['Date']['output'];
  fats: Scalars['Int']['output'];
  food: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  proteins: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
  userId: Scalars['ID']['output'];
};

export type Preset = {
  __typename?: 'Preset';
  id: Scalars['ID']['output'];
  plates: Array<Plate>;
};

export type Query = {
  __typename?: 'Query';
  me: Maybe<User>;
  plates: Array<Maybe<Plate>>;
  presets: Array<Maybe<Preset>>;
};


export type QueryPlatesArgs = {
  date: InputMaybe<Scalars['Date']['input']>;
};

export type User = {
  __typename?: 'User';
  activityLevel: Maybe<ActivityLevel>;
  age: Maybe<Scalars['Int']['output']>;
  dailyCalories: Maybe<Scalars['Int']['output']>;
  dailyCarbs: Maybe<Scalars['Int']['output']>;
  dailyFats: Maybe<Scalars['Int']['output']>;
  dailyProteins: Maybe<Scalars['Int']['output']>;
  dailyWater: Maybe<Scalars['Int']['output']>;
  disabilities: Maybe<Scalars['String']['output']>;
  email: Maybe<Scalars['String']['output']>;
  fullAccess: Maybe<Scalars['Boolean']['output']>;
  gender: Maybe<Gender>;
  goal: Maybe<Goal>;
  height: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isFilled: Maybe<Scalars['Boolean']['output']>;
  metabolicRate: Maybe<Scalars['Int']['output']>;
  nutritionRecommendations: Maybe<Scalars['String']['output']>;
  supplementRecommendations: Maybe<Scalars['String']['output']>;
  weight: Maybe<Scalars['Int']['output']>;
};

export type UserInput = {
  activityLevel: InputMaybe<ActivityLevel>;
  age: InputMaybe<Scalars['Int']['input']>;
  disabilities: InputMaybe<Scalars['String']['input']>;
  gender: InputMaybe<Gender>;
  goal: InputMaybe<Goal>;
  height: InputMaybe<Scalars['Int']['input']>;
  weight: InputMaybe<Scalars['Int']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ActivityLevel: ActivityLevel;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Gender: Gender;
  Goal: Goal;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Plate: ResolverTypeWrapper<Plate>;
  Preset: ResolverTypeWrapper<Preset>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Plate: Plate;
  Preset: Preset;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  UserInput: UserInput;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  updateUser: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, MutationUpdateUserArgs>;
};

export type PlateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Plate'] = ResolversParentTypes['Plate']> = {
  calories: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  carbs: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  date: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  fats: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  food: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  proteins: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  userId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PresetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preset'] = ResolversParentTypes['Preset']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  plates: Resolver<Array<ResolversTypes['Plate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  plates: Resolver<Array<Maybe<ResolversTypes['Plate']>>, ParentType, ContextType, QueryPlatesArgs>;
  presets: Resolver<Array<Maybe<ResolversTypes['Preset']>>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  activityLevel: Resolver<Maybe<ResolversTypes['ActivityLevel']>, ParentType, ContextType>;
  age: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dailyCalories: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dailyCarbs: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dailyFats: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dailyProteins: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dailyWater: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  disabilities: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullAccess: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  gender: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  goal: Resolver<Maybe<ResolversTypes['Goal']>, ParentType, ContextType>;
  height: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isFilled: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  metabolicRate: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nutritionRecommendations: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supplementRecommendations: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date: GraphQLScalarType;
  Mutation: MutationResolvers<ContextType>;
  Plate: PlateResolvers<ContextType>;
  Preset: PresetResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  User: UserResolvers<ContextType>;
};

