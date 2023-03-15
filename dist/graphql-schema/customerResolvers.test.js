import { customerResolvers } from "./customerResolvers";
import { Customer } from "../models/collections.js";
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
test("Gets all customers", () => {
    expect(customerResolvers.Query.getAllcustomers).not.toThrowError();
});
test("Gets customer by ID number", async () => {
    const customer = new Customer({
        firstName: "John",
        lastName: 'Doe',
        email: 'JohnDoe@email.com',
        phone: "123-456-7890",
        emergency_phone: "123-456-7890",
        passport: "1234567890",
        seat: 1
    });
    const newCustomer = await customer.save();
    ;
    const foundCustomer = await customerResolvers.Query.getCustomerbyId(null, { id: newCustomer._id });
    expect(foundCustomer.firstName).toEqual(newCustomer.firstName);
    expect(foundCustomer.lastName).toEqual(newCustomer.lastName);
    expect(foundCustomer.email).toEqual(newCustomer.email);
    expect(foundCustomer.phone).toEqual(newCustomer.phone);
    expect(foundCustomer.emergency_phone).toEqual(newCustomer.emergency_phone);
    expect(foundCustomer.passport).toEqual(newCustomer.passport);
    expect(foundCustomer.seat).toEqual(newCustomer.seat);
    await Customer.deleteOne({ _id: foundCustomer._id });
});
test("Adds customer to db", async () => {
    const customer = {
        firstName: "John",
        lastName: 'Doe',
        email: 'JohnDoe@email.com',
        phone: "123-456-7890",
        emergency_phone: "123-456-7890",
        passport: "1234567890",
        seat: 1
    };
    const newCustomer = await customerResolvers.Mutation.createCustomer(null, customer);
    expect(newCustomer.firstName).toEqual(customer.firstName);
    expect(newCustomer.lastName).toEqual(customer.lastName);
    expect(newCustomer.email).toEqual(customer.email);
    expect(newCustomer.phone).toEqual(customer.phone);
    expect(newCustomer.emergency_phone).toEqual(customer.emergency_phone);
    expect(newCustomer.passport).toEqual(customer.passport);
    expect(newCustomer.seat.toString()).toEqual(customer.seat);
    await Customer.deleteOne({ _id: newCustomer._id });
});
test("Updates customer in db", async () => {
    const customer = new Customer({
        firstName: "John",
        lastName: 'Doe',
        email: 'JohnDoe@email.com',
        phone: "123-456-7890",
        emergency_phone: "123-456-7890",
        passport: "1234567890",
        seat: 1
    });
    const newCustomer = await customer.save();
    const args = {
        id: newCustomer._id,
        firstName: "John",
        lastName: 'Doe',
        email: 'JohnDoe@email.com',
        phone: "123-456-7890",
        emergency_phone: "123-456-7890",
        passport: "0987654321",
        seat: 1
    };
    const updatedCustomer = await customerResolvers.Mutation.updateCustomer(null, args);
    expect(updatedCustomer.firstName).toEqual(args.firstName);
    expect(updatedCustomer.lastName).toEqual(args.lastName);
    expect(updatedCustomer.email).toEqual(args.email);
    expect(updatedCustomer.phone).toEqual(args.phone);
    expect(updatedCustomer.emergency_phone).toEqual(args.emergency_phone);
    expect(updatedCustomer.passport).toEqual(args.passport);
    expect(updatedCustomer.seat.toString()).toEqual(args.seat);
});
test("Deletes customer from db", async () => {
    const customer = new Customer({
        firstName: "John",
        lastName: 'Doe',
        email: 'JohnDoe@email.com',
        phone: "123-456-7890",
        emergency_phone: "123-456-7890",
        passport: "1234567890",
        seat: 1
    });
    const newCustomer = await customer.save();
    const foundCustomer = await Customer.findOne({ _id: newCustomer._id });
    expect(foundCustomer.firstName).toEqual(customer.firstName);
    expect(foundCustomer.lastName).toEqual(customer.lastName);
    expect(foundCustomer.email).toEqual(customer.email);
    expect(foundCustomer.phone).toEqual(customer.phone);
    expect(foundCustomer.emergency_phone).toEqual(customer.emergency_phone);
    expect(foundCustomer.passport).toEqual(customer.passport);
    expect(foundCustomer.seat).toEqual(customer.seat);
    const deletedCustomer = await customerResolvers.Mutation.deleteCustomer(null, { id: foundCustomer.id });
    expect(deletedCustomer).toBe(deletedCustomer);
});
