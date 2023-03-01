import { sanitize } from "../utils/sanitize.js";
import { Destination } from "../models/collections.js";
import { ErrorHandling } from "../utils/ErrorHandling/ErrorHandling.js";
import { ManageQueryAnswer } from "../utils/ErrorHandling/typesErrors/NotFoundErrorHandling.js";
export const destinationResolvers = {
  Query: {
    getAlldestinations: async () => {
      try {
        const destinations = await Destination.find();
        return ManageQueryAnswer(destinations, "destinations");
      } catch (error) {
        ErrorHandling(error);
      }
    },
    getDestinationbyId: async (_: void, args) => {
      try {
        const destination = await Destination.findById(args.id);
        return ManageQueryAnswer(destination, "Destination");
      } catch (error) {
        ErrorHandling(error);
      }
    },
  },
  Mutation: {
    createDestination: async (_: void, args) => {
      const sanitizedArgs = sanitize(args);
      const { country, city, currency, language, description, meals, lodging, price, Bus_id, image } = sanitizedArgs;
      const newDestination = new Destination({ country, city, currency, language, description, meals, lodging, price, Bus_id, image });
      await newDestination.save();
      return newDestination;
    },
    updateDestination: async (_: void, args) => {
      const sanitizedArgs = sanitize(args);
      const {id, country, city, currency, language, description, meals, lodging, price, Bus_id, image } = sanitizedArgs;
      return await Destination.findByIdAndUpdate(
        id,
        { $set: { id, country, city, currency, language, description, meals, lodging, price, Bus_id, image } },
        { new: true }
      );
    },
    deleteDestination: async (_: void, args) => {
      try {
        const destinationDeleted = await Destination.findByIdAndDelete(args.id);
        const Answer =
          destinationDeleted && `Destination deleted succesfully : ${destinationDeleted}`;
        return ManageQueryAnswer(Answer, "Destination");
      } catch (error) {
        ErrorHandling(error);
      }
    },
  },
};
