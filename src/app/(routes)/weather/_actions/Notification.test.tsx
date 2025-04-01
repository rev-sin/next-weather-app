import { getClimateNews } from "./Notification";
import { newsSchema } from "./schema";
import { z } from "zod";

global.fetch = jest.fn();

describe("getClimateNews", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return data when API response is successful and valid", async () => {
    const mockData = { articles: [{ title: "Climate News" }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    jest.spyOn(newsSchema, "parse").mockReturnValueOnce(mockData);

    const result = await getClimateNews();

    expect(result).toEqual({ data: mockData });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(newsSchema.parse).toHaveBeenCalledWith(mockData);
  });

  it("should return an error when API response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await getClimateNews();

    expect(result).toEqual({ error: "Failed to fetch news" });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should return an error when data schema is invalid", async () => {
    const invalidData = { invalid: "data" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(invalidData),
    });

    jest.spyOn(newsSchema, "parse").mockImplementationOnce(() => {
      throw new z.ZodError([]);
    });

    const result = await getClimateNews();

    expect(result).toEqual({ error: "Invalid news data received" });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(newsSchema.parse).toHaveBeenCalledWith(invalidData);
  });

  it("should return an error when an unexpected error occurs", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const result = await getClimateNews();

    expect(result).toEqual({ error: "Network error" });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
