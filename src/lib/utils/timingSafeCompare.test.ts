import { describe, expect, it } from "vitest";
import { timingSafeCompare } from "./timingSafeCompare";

describe("timingSafeCompare", () => {
  it("returns true for matching secrets", () => {
    expect(timingSafeCompare("my-secret-value", "my-secret-value")).toBe(true);
  });

  it("returns false for non-matching secrets of the same length", () => {
    expect(timingSafeCompare("my-secret-value", "my-secret-valuf")).toBe(false);
  });

  it("returns false for secrets of different lengths", () => {
    expect(timingSafeCompare("short", "a-much-longer-secret")).toBe(false);
  });

  it("returns false when provided is null", () => {
    expect(timingSafeCompare(null, "expected-secret")).toBe(false);
  });

  it("returns false when expected is undefined", () => {
    expect(timingSafeCompare("provided-secret", undefined)).toBe(false);
  });

  it("returns false when both are empty", () => {
    expect(timingSafeCompare("", "")).toBe(false);
  });

  it("is case-sensitive", () => {
    expect(timingSafeCompare("Secret", "secret")).toBe(false);
  });
});
