import { ChatId } from "@/types/user";
import { UserRecord } from "./types";

export class PaginationBuffer {
  /** Stores list of user ids for whose the pagination pase message was sent */
  private sentMessagesBuffer: UserRecord[] = [];

  /**
   * Adds a new user to pagination buffer, if it already exists, first removes the previously added record
   * @param {ChatId} userId - chat id provided by the Telegram API
   * @param {number} messageId - id of the message to be edited
   */
  public append = (userId: ChatId, messageId: number): void => {
    this.removeUser(userId);
    this.sentMessagesBuffer.push({id: userId, messageId});
  };

  /**
   * Returns user record from the buffer. If no record is found, returns `undefined`
   * @param {ChatId} userId - chat id provided by the Telegram API
   * @returns {UserRecord | undefined}
   */
  public getRecord = (userId: ChatId): UserRecord => {
    const record = this.sentMessagesBuffer.find(record => record.id === userId);

    if(!record) {
      throw new Error(`User record with id ${userId} not found!`);
    }

    return record;
  };

  /**
   * Returns `true` if user with given id already exists, `false` otherwise
   * @param {ChatId} userId - chat id provided by the Telegram API
   * @returns {boolean}
   */
  public userExists = (userId: ChatId): boolean => {
    return this.sentMessagesBuffer.find(record => record.id === userId) !== undefined;
  };

  /**
   * Removes a user from pagination buffer
   * @param {ChatId} userId - chat id provided by the Telegram API
   */
  public removeUser = (userId: ChatId): void => {
    for(const userData of this.sentMessagesBuffer) {
      if(userData.id === userId) {
        this.sentMessagesBuffer.splice(this.sentMessagesBuffer.indexOf(userData), 1);
        return;
      }
    }
  };
}
