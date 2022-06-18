export enum LifeBarTypes {
  IAM,
  ENEMY,
}

export type LifeBarProps = {
  lifePercent: number,
  lifeType: LifeBarTypes,
  name: string
};
