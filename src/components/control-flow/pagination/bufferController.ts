import { UserId } from "@/types/user";

type UserRecord = {
  id: UserId,
  messageId: number
}

export class PaginationBufferController {
  /** Stores list of user ids for whose the pagination pase message was sent */
  private sentMessagesBuffer: UserRecord[] = [];

  /**
   * Adds a new user to pagination buffer, if it already exists, first removes the previously added record
   * @param {UserId} userId - chat id provided by the Telegram API
   * @param {number} messageId - id of the message to be edited
   */
  public append = (userId: UserId, messageId: number): void => {
    this.removeUser(userId);
    this.sentMessagesBuffer.push({id: userId, messageId: messageId});
  };

  /**
   * Returns user record from the buffer. If no record is found, returns `undefined`
   * @param {UserId} userId - chat id provided by the Telegram API
   * @returns {UserRecord | undefined}
   */
  public getRecord = (userId: UserId): UserRecord | undefined => {
    return this.sentMessagesBuffer.find(record => record.id === userId);
  };

  /**
   * Returns `true` if user with given id already exists, `false` otherwise
   * @param {UserId} userId - chat id provided by the Telegram API
   * @returns {boolean}
   */
  public userExists = (userId: UserId): boolean => {
    return this.sentMessagesBuffer.find(record => record.id === userId) !== undefined;
  };

  /**
   * Removes a user from pagination buffer
   * @param {UserId} userId - chat id provided by the Telegram API
   */
  public removeUser = (userId: UserId): void => {
    for(const userData of this.sentMessagesBuffer) {
      if(userData.id === userId) {
        this.sentMessagesBuffer.splice(this.sentMessagesBuffer.indexOf(userData), 1);
        return;
      }
    }
  };
}