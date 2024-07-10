import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';
const searchRestaurant = async (req: Request, res: Response) => {
    try {
        const city = req.params.city;
        const searchQuery = (req.query.searchQuery as string) || "";
        const selectedCuisines = (req.query.selectedCuisine as string) || "";
        const sortOption = (req.query.sortOption as string) || "lastUpdated"; // default sort by last updated
        const page = parseInt(req.query.page as string) || 1;

        let query: any = { };
        query["city"] = new RegExp(city, "i"); // case-insensitive search so user's can search for "London" or "london" and  get the same results.
        const cityCheck = await Restaurant.countDocuments(query); // check if any restaurants are available in the city

        if (cityCheck === 0) { // if no restaurants are available in the city
            return res.status(404).json([]);
        }
        
        if(selectedCuisines){ // if user has selected cuisines
            const cuisinesArray = selectedCuisines.split(",").map((cuisine) => new RegExp(cuisine, "i")); // case-insensitive search for cuisines

            query["cuisines"] = { $all: cuisinesArray }; // find restaurants with selected cuisines
        }

        if(searchQuery){
            const searchRegex = new RegExp(searchQuery, "i"); // case-insensitive search for search query
            query["$or"] = [
                { restaurantName: searchRegex },
                { cuisines: { $in: [searchRegex] } },
            ];
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}