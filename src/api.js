import Cookies from 'js-cookie';

export const HOST_API = process.env.NODE_ENV === 'production' ? './' : 'api/';

function genertor(response) {
  return response
    .then(res => {
      return res.json ? res.json() : res.bob();
    })
    .then(res => {
      if (res.status === 1100) {
        Cookies.remove('SystemToken');
        window.location.href = './login';
      }
      return res;
    })
    .catch(err => {
      return { code: 1, data: {}, message: '数据异常' };
    });
}

export async function Get(url, option = {}) {
  return genertor(
    fetch(
      HOST_API + url,
      Object.assign(option, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
          'Authorization': Cookies.get('SystemToken')
        }
      })
    )
  );
}

export async function Post(url, option = {}) {
  return genertor(
    fetch(HOST_API + url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': Cookies.get('SystemToken')
      },
      body: JSON.stringify(option)
    })
  );
}
export async function Delete(url, option = {}) {
  return genertor(
    fetch(HOST_API + url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': Cookies.get('SystemToken')
      },
      body: JSON.stringify(option)
    })
  );
}
export async function Put(url, option = {}) {
  return genertor(
    fetch(HOST_API + url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': Cookies.get('SystemToken')
      },
      body: JSON.stringify(option)
    })
  );
}
export async function Patch(url, option = {}) {
  return genertor(
    fetch(HOST_API + url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': Cookies.get('SystemToken')
      },
      body: JSON.stringify(option)
    })
  );
}

window.Get = Get;
window.Patch = Patch;
window.Post = Post;
window.Put = Put;
window.Delete = Delete;
window.HOST_API = HOST_API;
