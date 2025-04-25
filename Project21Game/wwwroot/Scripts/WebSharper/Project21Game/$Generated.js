import { LoadLocalTemplates, NamedTemplate } from "../WebSharper.UI/WebSharper.UI.Client.Templates.js"
export function t(h){
  LoadLocalTemplates("main");
  return h?NamedTemplate("main", null, h):void 0;
}
