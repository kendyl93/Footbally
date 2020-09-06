const Helper = require("../helper");
const helper = new Helper();
const rooms = require("../../routes/staticRooms");
const URL_PREFIX = "/api";

describe("Chats enpoint", () => {
  it("Get all chat rooms", async () => {
    const { body } = await helper.apiServer.get(URL_PREFIX);

    expect(body).toEqual(rooms);
  });

  it("Get Barcelona chat room", async () => {
    const barcelonaRoomId = "room1";
    const barcelonaRoomEndpoint = `${URL_PREFIX}/${barcelonaRoomId}`;
    const { body } = await helper.apiServer.get(barcelonaRoomEndpoint);

    expect(body).toEqual(rooms[barcelonaRoomId]);
  });
});
