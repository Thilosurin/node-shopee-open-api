export function asyncHandler(fn: Function): any {
  return (req: Request, res: Response, next: () => PromiseLike<never>) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}
