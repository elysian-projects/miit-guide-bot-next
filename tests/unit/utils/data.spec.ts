import { User } from "@/controllers/userController";
import { StorageState } from "@/types/store";
import { removeUserFromList } from "@/utils/data";
import { describe, expect, test } from "@jest/globals";

describe("delete user from the list", () => {
  test("should delete user with given id from the list", () => {
    const user0 = new User(0);
    const user1 = new User(1);

    let userList: StorageState = {
      0: user0,
      1: user1
    };

    userList = removeUserFromList(userList, 0);
    expect(userList).toStrictEqual({1: user1});

    userList = removeUserFromList(userList, 1);
    expect(userList).toStrictEqual({});
  });
});
