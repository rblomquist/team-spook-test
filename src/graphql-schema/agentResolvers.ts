import { sanitize } from "./../utils/sanitize.js";
import { Agent } from "../models/collections.js";
import { ErrorHandling } from "../utils/ErrorHandling/ErrorHandling.js";
import { ManageQueryAnswer } from "../utils/ErrorHandling/typesErrors/NotFoundErrorHandling.js";
export const agentResolvers = {
  Query: {
    getAllAgents: async () => {
      try {
        const agents = await Agent.find();
        return ManageQueryAnswer(agents, "agents");
      } catch (error) {
        ErrorHandling(error);
      }
    },
    getAgentbyId: async (_: void, args) => {
      try {
        const agent = await Agent.findById(args.id);
        return ManageQueryAnswer(agent, "Agent");
      } catch (error) {
        ErrorHandling(error);
      }
    },
  },
  Mutation: {
    createAgent: async (_: void, args) => {
      const sanitizedArgs = sanitize(args);
      const { email, password, firstName, lastName, phone, databaseAccessLevel } = sanitizedArgs;
      const newAgent = new Agent({ email, password, firstName, lastName, phone, databaseAccessLevel });
      await newAgent.save();
      return newAgent;
    },
    updateAgent: async (_: void, args) => {
      const sanitizedArgs = sanitize(args);
      const { id, email, password, firstName, lastName, phone, databaseAccessLevel } = sanitizedArgs;
      return await Agent.findByIdAndUpdate(
        id,
        { $set: { email, password, firstName, lastName, phone, databaseAccessLevel } },
        { new: true }
      );
    },
    deleteAgent: async (_: void, args) => {
      try {
        const agentDeleted = await Agent.findByIdAndDelete(args.id);
        const Answer =
        agentDeleted && `Agent deleted succesfully : ${agentDeleted}`;
        return ManageQueryAnswer(Answer, "Agent");
      } catch (error) {
        ErrorHandling(error);
      }
    },
  },
};
