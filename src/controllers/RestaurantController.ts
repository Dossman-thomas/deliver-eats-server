import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisine as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated"; // default sort by last updated
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};
    query["city"] = new RegExp(city, "i"); // case-insensitive search so user's can search for "London" or "london" and  get the same results.
    const cityCheck = await Restaurant.countDocuments(query); // check if any restaurants are available in the city

    if (cityCheck === 0) {
      // if no restaurants are available in the city
      return res.status(404).json({
        data: [],
        pagination: {
            total: 0,
            page: 1,
            pages: 1,
        }
      });
    }

    if (selectedCuisines) {
      // if user has selected cuisines
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i")); // case-insensitive search for cuisines

      query["cuisines"] = { $all: cuisinesArray }; // find restaurants with selected cuisines
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i"); // case-insensitive search for search query
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10; // number of restaurant results per page
    const skip = (page - 1) * pageSize; // calculate the number of restaurants to skip

    const restaurants = await Restaurant.find(query) // find restaurants based on query and return sorted results, to a page of ten restaurants.
      .sort({ [sortOption]: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean(); // convert the results to plain javascript objects

    const total = await Restaurant.countDocuments(query); // count the total number of restaurants based on the query, used to determine how many pages are need for the query.

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize), // calculate the number of pages needed based on the total number of restaurants and the page size. example: 50 results, pageSize = 10 > pages = 5
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { 
    searchRestaurants,
};