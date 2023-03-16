import { agentResolvers } from "./agentResolvers";
import { Agent } from "../models/collections.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URI;
beforeAll(async () => {
    await mongoose.connect(uri);
});
afterAll(async () => {
    await mongoose.connection.close();
});
test("Gets all agents", () => {
    expect(agentResolvers.Query.getAllAgents).not.toThrowError();
});
test("Gets employee by ID number", async () => {
    const newAgent = new Agent({
        email: 'agent@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        databaseAccessLevel: 1,
    });
    const agent = await newAgent.save();
    ;
    const foundAgent = await agentResolvers.Query.getAgentbyId(null, { id: agent._id });
    expect(foundAgent.email).toEqual(newAgent.email);
    expect(foundAgent.firstName).toEqual(newAgent.firstName);
    expect(foundAgent.lastName).toEqual(newAgent.lastName);
    expect(foundAgent.phone).toEqual(newAgent.phone);
    expect(foundAgent.databaseAccessLevel).toEqual(newAgent.databaseAccessLevel);
    await Agent.deleteOne({ _id: agent._id });
});
test("Adds agent to db", async () => {
    const args = {
        email: 'agent@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        databaseAccessLevel: 1,
    };
    const newAgent = await agentResolvers.Mutation.createAgent(null, args);
    expect(newAgent.email).toEqual(args.email);
    expect(newAgent.firstName).toEqual(args.firstName);
    expect(newAgent.lastName).toEqual(args.lastName);
    await Agent.deleteOne({ _id: newAgent._id });
});
test("Updates agent in db", async () => {
    const args = {
        id: "640bd5e8742837fd3cf47185",
        email: "updateTest@test.com",
        firstName: "Test",
        lastName: "Testerton",
        phone: "123-456-7890",
        databaseAccessLevel: 1
    };
    const updatedAgent = await agentResolvers.Mutation.updateAgent(null, args);
    expect(updatedAgent).toBeDefined();
    expect(updatedAgent.email).toEqual(args.email);
    expect(updatedAgent.firstName).toEqual(args.firstName);
    expect(updatedAgent.lastName).toEqual(args.lastName);
    expect(updatedAgent.phone).toEqual(args.phone);
    expect(updatedAgent.databaseAccessLevel.toString()).toEqual(args.databaseAccessLevel);
});
test("Deletes agent from db", async () => {
    const newAgent = new Agent({
        email: 'agent@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        databaseAccessLevel: 1,
    });
    const agent = await newAgent.save();
    const foundAgent = await Agent.findOne({ _id: agent._id });
    expect(foundAgent.email).toEqual(newAgent.email);
    expect(foundAgent.firstName).toEqual(newAgent.firstName);
    expect(foundAgent.lastName).toEqual(newAgent.lastName);
    const deletedAgent = await agentResolvers.Mutation.deleteAgent(null, { id: foundAgent.id });
    expect(deletedAgent).toBe(deletedAgent);
});
