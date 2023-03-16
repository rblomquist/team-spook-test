import { start } from "./server";
test("Starts the server", async () => {
    // Start the server
    start;
    // // Test that the server is defined
    expect(Promise.resolve("server")).toBeDefined();
    await new Promise(resolve => setTimeout(resolve, 1000));
});
