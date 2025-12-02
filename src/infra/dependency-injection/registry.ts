export class Registry {
  private dependencies: { [name: string]: any } = {};
  static instance: Registry;

  private constructor() {}

  register(name: string, dependency: any) {
    this.dependencies[name] = dependency;
  }

  inject(name: string) {
    const dependency = this.dependencies[name];
    if (!dependency) throw new Error(`Dependency not found: ${name}`);
    return dependency;
  }

  static getInstance() {
    if (!Registry.instance) {
      Registry.instance = new Registry();
    }
    return Registry.instance;
  }
}

export function inject(name: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return Registry.getInstance().inject(name);
      },
      enumerable: true,
      configurable: true,
    });
  };
}
