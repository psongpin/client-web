// @flow

export function get(name: string) {
  return localStorage.getItem(name);
}

export function set(name: string, value: any) {
  localStorage.setItem(name, value);
}

export function remove(name: string) {
  localStorage.removeItem(name);
}
