
import { postJSON  } from '@/common/fetch' 



export const addFavorite = (data) => { 
  const apiName = '/api/user/addFavorite'; 
  return postJSON(apiName, data)
}

export const cancelFavorite = (data) => { 
  const apiName = '/api/user/cancelFavorite'; 
  return postJSON(apiName, data)
}



