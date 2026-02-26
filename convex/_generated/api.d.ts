/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as faqs from "../faqs.js";
import type * as files from "../files.js";
import type * as projects from "../projects.js";
import type * as seed from "../seed.js";
import type * as services from "../services.js";
import type * as settings from "../settings.js";
import type * as testimonials from "../testimonials.js";
import type * as upload from "../upload.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  faqs: typeof faqs;
  files: typeof files;
  projects: typeof projects;
  seed: typeof seed;
  services: typeof services;
  settings: typeof settings;
  testimonials: typeof testimonials;
  upload: typeof upload;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
