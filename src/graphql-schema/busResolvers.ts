import { sanitize } from './../utils/sanitize';
import { Bus } from "../models/collections";
import { ErrorHandling } from "../utils/ErrorHandling/ErrorHandling";
import { ManageQueryAnswer } from "../utils/ErrorHandling/typesErrors/NotFoundErrorHandling";

export const busResolvers = {
  Query: {
    getAllBuses: async () => {
      try{
        const Buses = await Bus.find();
        return ManageQueryAnswer(Buses,"Buses")
      }catch(error){
        ErrorHandling(error)
      }
    },
    getBusesbyId: async (_: void, args) => {
      try{
        const individual_Bus = await Bus.findById(encodeURIComponent(args.id));
        return ManageQueryAnswer(individual_Bus,"Bus")
      }catch(error){
        ErrorHandling(error)
      }
    },
  },
  Mutation: {
    createBus: async (_, args) => {
      const sanitizedArgs = sanitize(args)
      const { Name, Description, Tour_Guide, Total_Seat, Empty_Seat, Full_Seat, Patent } =sanitizedArgs;
      const bus = new Bus({ Name, Description, Tour_Guide, Total_Seat, Empty_Seat, Full_Seat, Patent });
      return await bus.save();
    },
    updateBus: async (
      _: void,
      args
    ) => {
      const sanitizedArgs=sanitize(args)
      const { id, Name, Description, Tour_Guide, Total_Seat, Empty_Seat, Full_Seat, Patent } = sanitizedArgs
      return await Bus.findByIdAndUpdate(
        id,
        { $set: { Name, Description, Tour_Guide, Total_Seat, Empty_Seat, Full_Seat, Patent } },
        { new: true }
      );
    },
    deleteBus: async (_: void, args) => {
      try{
        const BusDeleted = await Bus.findByIdAndDelete(args.id);
        const Answer= BusDeleted && `Bus deleted succesfully : ${BusDeleted}`
        return ManageQueryAnswer(Answer,"Bus")
      }catch(error){
        ErrorHandling(error)
      }
    },
  },
};
