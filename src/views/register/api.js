import { postJSON  } from '@/common/fetch' 


// 登录
export const login = (data) => { 
  const apiName = '/api/user/register'; 
  return postJSON(apiName, data)
}


