import { fetchAqiData } from "./WeatherData";
import { aqiSchema } from "./schema";
import { z } from "zod";

global.fetch = jest.fn();

describe("fetchAqiData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error when latitude or longitude is missing", async () => {
    const result = await fetchAqiData(0, 0);

    expect(result).toEqual({ error: "Latitude and longitude are required" });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("should return data when API response is successful and valid", async () => {
    const mockData = {
      list: [{ main: { aqi: 3 } }],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    jest.spyOn(aqiSchema, "parse").mockReturnValueOnce(mockData);

    const result = await fetchAqiData(12.34, 56.78);

    expect(result).toEqual({ data: 3 });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(aqiSchema.parse).toHaveBeenCalledWith(mockData);
  });

  it("should return an error when API response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = await fetchAqiData(12.34, 56.78);

    expect(result).toEqual({ error: "API request failed with status 404" });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should return an error when data schema is invalid", async () => {
    const invalidData = { invalid: "data" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(invalidData),
    });

    jest.spyOn(aqiSchema, "parse").mockImplementationOnce(() => {
      throw new z.ZodError([]);
    });

    const result = await fetchAqiData(12.34, 56.78);

    expect(result).toEqual({ error: "Invalid AQI data received" });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(aqiSchema.parse).toHaveBeenCalledWith(invalidData);
  });

  it("should return an error when an unexpected error occurs", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const result = await fetchAqiData(12.34, 56.78);

    expect(result).toEqual({ error: "Network error" });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
