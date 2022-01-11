const importDynamic = new Function("modulePath", "return import(modulePath)");
export async function fetch(...args: any[]) {
  const module = await importDynamic("node-fetch");
  return module.default(...args);
}

interface IPostJSON {
  url: string;
  body: any;
}
export const apiPostJSON = async ({ url, body }: IPostJSON) =>
  await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
