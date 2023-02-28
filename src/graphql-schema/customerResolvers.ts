import { sanitize } from "./../utils/sanitize.js";
import { Customer } from "../models/collections.js";
import { ErrorHandling } from "../utils/ErrorHandling/ErrorHandling.js";
import { ManageQueryAnswer } from "../utils/ErrorHandling/typesErrors/NotFoundErrorHandling.js";
export const customerResolvers = {
  Query: {
    getAllcustomers: async () => {
      try {
        const customers = await Customer.find();
        return ManageQueryAnswer(customers, "customers");
      } catch (error) {
        ErrorHandling(error);
      }
    },
    getCustomerbyId: async (_: void, args) => {
      try {
        const customer = await Customer.findById(args.id);
        return ManageQueryAnswer(customer, "Bus");
      } catch (error) {
        ErrorHandling(error);
      }
    },
  },
  Mutation: {
    createCustomer: async (_: void, args) => {
      const sanitizedArgs = sanitize(args);
      const { name, email, phone, seat } = sanitizedArgs;
      const newCostumer = new Customer({ name, email, phone, seat });
      await newCostumer.save();
      return newCostumer;
    },
    updateCustomer: async (_: void, args) => {
      const sanitizedArgs = sanitize(args);
      const { id, name, email, phone, seat } = sanitizedArgs;
      return await Customer.findByIdAndUpdate(
        id,
        { $set: { name, email, phone, seat } },
        { new: true }
      );
    },
    deleteCustomer: async (_: void, args) => {
      try {
        const customerDeleted = await Customer.findByIdAndDelete(args.id);
        const Answer =
          customerDeleted && `Bus deleted succesfully : ${customerDeleted}`;
        return ManageQueryAnswer(Answer, "Customer");
      } catch (error) {
        ErrorHandling(error);
      }
    },
  },
};
