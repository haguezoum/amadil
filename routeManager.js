const fs = require("fs");
const { getConfig } = require("./finder.js");
const root = getConfig().paths.project;
let routerpath = root + "/frontend/src/services/routes.js";
let router = require(routerpath);

function routeManager(pageName) {
  let pathArray = router.routes;
  if (!Array.isArray(pathArray)) pathArray = [];
  pageName = pageName.toLowerCase();
  const newPagePath = {
    path: `/${pageName}`,
    view: `async () => {
      await import('../pages/${pageName}.js');
      return '<${pageName}-page></${pageName}-page>';
    },`,
  };
  pathArray.push(newPagePath);
  const routesContent = `
module.exports = {
  routes: [
    ${pathArray
      .map(
        (route) => `{
      path: '${route.path}',
      view: ${route.view}
    }`
      )
      .join(",\n    ")}
  ]
  };
`;
  fs.writeFile(routerpath, routesContent, "utf8", (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
    }
  });
}
delete require.cache[require.resolve(routerpath)];
module.exports = { routeManager };
