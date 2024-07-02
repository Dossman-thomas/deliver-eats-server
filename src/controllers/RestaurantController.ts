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
        const cityCheck = await Restaurant.countDocuments(query);

        if (cityCheck === 0) {
            return res.status(404).json({ message: "No restaurants found in this city" });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}