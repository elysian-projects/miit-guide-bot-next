import { User } from "@/controllers/userController";
import { StorageState } from "@/types/data";
import { removeUserFromList } from "@/utils/data";
import { describe, expect, test } from "@jest/globals";

describe("delete user from the list", () => {
  test("should delete user with given id from the list", () => {
    const userList: StorageState = {
      0: new User(0)
    };

    expect(removeUserFromList(userList, 0)).toStrictEqual({});
  });
});
