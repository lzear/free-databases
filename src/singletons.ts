export class Singletons<
  A extends any[],
  R,
  S extends (...arguments_: A) => string = (...arguments_: A) => string,
> {
  private promises = new Map<string, R>()

  constructor(
    private promise: (...arguments_: A) => R,
    private serializer: S,
  ) {}

  public get(...arguments_: A): R {
    const serialized = this.serializer(...arguments_)
    if (this.promises.has(serialized)) return this.promises.get(serialized)!
    const newPromise = this.promise(...arguments_)
    this.promises.set(serialized, newPromise)
    return newPromise
  }

  public delete(...arguments_: Parameters<S>) {
    this.promises.delete(this.serializer(...arguments_))
  }

  public clear() {
    this.promises.clear()
  }
}

export class SingletonUnique<A extends any[], R> extends Singletons<A, R> {
  constructor(promise: (...arguments_: A) => R) {
    super(promise, () => 'const')
  }

  /**
   * @deprecated Use `clear`
   */
  public override delete() {
    this.clear()
  }
}
