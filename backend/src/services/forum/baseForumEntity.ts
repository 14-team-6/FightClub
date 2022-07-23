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

// type AddDataProps = {
//   data: string,
//   userId: number,
// } & Record<string, any>;
//
// export type MyModelCtor<M> = { new(): M } & typeof BaseForumModel;
//
// export class BaseForumEntity<T extends BaseForumModel> {
//   protected modelObject: MyModelCtor<T>;
//
//   constructor(modelObject: MyModelCtor<T>) {
//     this.modelObject = modelObject
//   };
//
//   public add(data: AddDataProps): Promise<ForumApiRequestResult> {
//     return this.modelObject.create(data as any)
//       .then(() => ({ result: 'OK', }))
//       .catch((e) => ({ result: `Error: ${e}` }));
//   };
//
//   public edit(id: number, data: any): Promise<ForumApiRequestResult> {
//     const searchOptions = {
//       where: {
//         id
//       }
//     } as FindOptions;
//     return this.modelObject.findOne({ ...searchOptions })
//       .then((item: BaseForumModel | null) => {
//         if (item === null) {
//           return Promise.reject({ result: 'NOT FOUND' });
//         }
//         return item.update(data)
//       }).then(() => ({ result: 'OK' }));
//   };
//
//   public get(id: number): Promise<BaseForumModel | null> {
//     const searchOptions = {
//       where: {
//         id
//       }
//     } as FindOptions;
//     return this.modelObject.findOne({ ...searchOptions });
//   };
//
//   public getAll(): Promise<BaseForumModel[] | null> {
//     const table1 = this.modelObject.tableName;
//     const table2 = this.modelObject.child_class.tableName;
//     const query = `
//     SELECT
//       "t1"."id" as "id",
//       "t1"."data" as "name",
//       COUNT("t2"."id") as "counts"
//     FROM
//       "$table1" as "t1"
//     INNER JOIN "$table2" as "t2" on "t2"."$field" = "t1"."id"
//     GROUP BY
//         "t1"."id",
//         "t1"."data"
//     ;
//     `;
//     let includeOptions = {
//       attributes: {
//         include: [[Sequelize.fn('COUNT', Sequelize.col(`${this.modelObject.child_class.tableName}.id`)), 'counts']]
//       },
//       include: [{
//         model: this.modelObject.child_class,
//         as: this.modelObject.child_class.tableName,
//         attributes: [],
//       }],
//       group: [`${this.modelObject.tableName}.id`, `${this.modelObject.tableName}.data`],
//     }  as FindOptions;
//     return this.modelObject.findAll(includeOptions);
//   };
//
//   public children(id: number): Promise<any> {
//     const searchOptions = {
//       where: {
//         id
//       },
//       include: [this.modelObject.child_class],
//     } as FindOptions;
//     return this.modelObject.findOne({ ...searchOptions })
//       .then((item: BaseForumModel | null) => {
//         if (item === null) {
//           return Promise.reject({ result: 'NOT FOUND' });
//         }
//         return item.children;
//     });
//   };
//
//   public get own_field(): string {
//     return this.modelObject.own_field;
//   }
//
//   public get parent_field(): string {
//     return this.modelObject.parent_field;
//   }
// }
