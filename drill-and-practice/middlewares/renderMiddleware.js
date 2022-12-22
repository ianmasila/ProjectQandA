import { configure, renderFile } from "../deps.js";

configure({
  views: `${Deno.cwd()}/views/`,
}); 

const renderMiddleware = async (context, next) => {
  context.render = async (file, data) => {
    // adding user details directly to Eta view template on render
    if (!data) {
      data = {};
    }
    if (context.user) {
      data.user = context.user;
      data.title = "Project Q&A";
    }
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, data);
  };

  await next();
};

export { renderMiddleware };
