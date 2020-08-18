const Helper = require("../helper");
const helper = new Helper();
const urlPrefix = "/api/v1/users";

describe("Users enpoint", () => {
    it("Get all users", async () => {
        const { body } = await helper.apiServer.get(urlPrefix)

        expect(body).toEqual({users: [{name: 'Timmy'}]});
    });
});