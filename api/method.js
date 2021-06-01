import service from "./axois";

export const Get = (path, headers = null) => {
  return service.get(path, { ...(headers && { headers }) });
};

export const Post = (path, params, headers = null) =>
  service.post(path, params, { ...(headers && { headers }) });

export const Put = (path, params, headers = null) =>
  service.put(path, params, { ...(headers && { headers }) });

export const Patch = (path, params, headers = null) =>
  service.patch(path, params, { ...(headers && { headers }) });

export const Delete = (path, params, headers = null) =>
  service.delete(path, { data: params }, { ...(headers && { headers }) });
