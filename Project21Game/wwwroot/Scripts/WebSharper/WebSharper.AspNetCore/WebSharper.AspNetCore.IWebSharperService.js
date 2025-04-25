export function isIWebSharperService(x){
  return"WebSharper_AspNetCore_IWebSharperService$GetWebSharperMeta"in x&&"WebSharper_AspNetCore_IWebSharperService$DefaultAssembly"in x;
}
