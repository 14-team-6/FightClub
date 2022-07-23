export type ForumApiRequestResult = {
  result: string,
};

export type AddDataProps = {
  data: string,
  userId: number,
} & Record<string, any>;

export abstract class BaseForumService {
  abstract get(id: number): Promise<any>;

  abstract getAll(parentId?: number): Promise<any>;

  abstract add(data: AddDataProps): Promise<ForumApiRequestResult>;

  abstract children(id: number): Promise<any>;

  abstract update(id: number, data: AddDataProps): Promise<ForumApiRequestResult>;

  abstract delete(id: number): Promise<ForumApiRequestResult>;
}
