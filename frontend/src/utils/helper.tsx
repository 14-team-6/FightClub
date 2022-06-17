export function getProperty<T>(prop: keyof Omit<T, 'children'>){
    return (props: T) => {
      return props[prop];
    };
};