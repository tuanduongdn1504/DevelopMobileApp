import {
  get, post, put, del,
} from './utils';

export async function getAllApi(resource, data) {
  return get(`/${resource}`, data);
}

export async function getOneApi(resource, id, data) {
  return get(`/${resource}/${id}`, data);
}

export async function delApi(resource, id) {
  console.log('DEBUG DELETE: ', resource);
  console.log('DEBUG DELETE: ', id);
  if (id) {
    return del(`/${resource}/${id}`, { isActive: false });
  }
  return del(`/${resource}`);
}

export async function postApi(resource, data) {
  return post(`/${resource}`, data);
}

export async function putApi(resource, id, data) {
  return put(`/${resource}/${id}`, data);
}
