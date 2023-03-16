import { guideResolvers } from "./guideResolvers";
import { Guide } from "../models/collections.js";
import  mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri: string = process.env.MONGO_URI as string;

beforeAll(async () => {
    await mongoose.connect(uri)
        });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
test ("Gets all guides", () => {
    expect(guideResolvers.Query.getAllguides).not.toThrowError();
});

test("Gets guide by ID number", async () => {
    const guide = new Guide({ 
        firstName: 'John',
        lastName: 'Doe',
        email: 'JohnDoe@test.com',
        phone: '123-456-7890',
        languages: 'English',
        bio: "John has lived in New York his entire life.",
        databaseAccessLevel: 1
      });

    const newGuide = await guide.save();
;
    const foundGuide = await guideResolvers.Query.getGuidebyId( null, {id: newGuide._id})

    expect(foundGuide.firstName).toEqual(newGuide.firstName);
    expect(foundGuide.lastName).toEqual(newGuide.lastName);
    expect(foundGuide.email).toEqual(newGuide.email);
    expect(foundGuide.phone).toEqual(newGuide.phone);
    expect(foundGuide.languages).toEqual(newGuide.languages);
    expect(foundGuide.bio).toEqual(newGuide.bio);
    expect(foundGuide.databaseAccessLevel).toEqual(newGuide.databaseAccessLevel);

    await Guide.deleteOne({ _id: foundGuide._id });
});

test("Adds guide to db", async () => {
    const guide = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'JohnDoe@test.com',
        phone: '123-456-7890',
        languages: 'English',
        bio: "John has lived in New York his entire life.",
        databaseAccessLevel: 1
    };

    const newGuide = await guideResolvers.Mutation.createGuide(null, guide);

    expect(newGuide.firstName).toEqual(guide.firstName);
    expect(newGuide.lastName).toEqual(guide.lastName);
    expect(newGuide.email).toEqual(guide.email);
    expect(newGuide.phone).toEqual(guide.phone);
    expect(newGuide.languages).toEqual(guide.languages);
    expect(newGuide.bio).toEqual(guide.bio);
    expect(newGuide.databaseAccessLevel.toString()).toEqual(guide.databaseAccessLevel);

    await Guide.deleteOne({ _id: newGuide._id });
  });

test("Updates guide in db", async () => {
    const guide = new Guide({ 
        firstName: 'John',
        lastName: 'Doe',
        email: 'JohnDoe@test.com',
        phone: '123-456-7890',
        languages: 'English',
        bio: "John has lived in New York his entire life.",
        databaseAccessLevel: 1
      });

    const newGuide = await guide.save();
    
    const args = {
        id: newGuide._id,
        firstName: 'John',
        lastName: 'Doe',
        email: 'JohnDoe@test.com',
        phone: '123-456-7890',
        languages: 'English',
        bio: "John has lived in New York his entire life.",
        databaseAccessLevel: 2
    };

    const updatedGuide = await guideResolvers.Mutation.updateGuide(null, args);

    expect(updatedGuide.firstName).toEqual(args.firstName);
    expect(updatedGuide.lastName).toEqual(args.lastName);
    expect(updatedGuide.email).toEqual(args.email);
    expect(updatedGuide.phone).toEqual(args.phone);
    expect(updatedGuide.languages).toEqual(args.languages);
    expect(updatedGuide.bio).toEqual(args.bio);
    expect(updatedGuide.databaseAccessLevel.toString()).toEqual(args.databaseAccessLevel);

    await Guide.deleteOne({ _id: updatedGuide._id });

});

test("Deletes guide from db", async () => {    
    const guide = new Guide({ 
        firstName: 'John',
        lastName: 'Doe',
        email: 'JohnDoe@test.com',
        phone: '123-456-7890',
        languages: 'English',
        bio: "John has lived in New York his entire life.",
        databaseAccessLevel: 1
      });

    const newGuide = await guide.save();

    const foundGuide= await Guide.findOne({ _id: newGuide._id });

    expect(foundGuide.firstName).toEqual(newGuide.firstName);
    expect(foundGuide.lastName).toEqual(newGuide.lastName);
    expect(foundGuide.email).toEqual(newGuide.email);
    expect(foundGuide.phone).toEqual(newGuide.phone);
    expect(foundGuide.languages).toEqual(newGuide.languages);
    expect(foundGuide.bio).toEqual(newGuide.bio);
    expect(foundGuide.databaseAccessLevel).toEqual(newGuide.databaseAccessLevel);

    const deletedGuide = await guideResolvers.Mutation.deleteGuide(null, { id: foundGuide.id })

    expect(deletedGuide).toBe(deletedGuide);
    });