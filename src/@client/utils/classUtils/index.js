// @flow
export function bindMethods(component: Object, ...methodNames: string[]) {
  methodNames.forEach((name) => {
    component[name] = component[name].bind(component);
  });
}
