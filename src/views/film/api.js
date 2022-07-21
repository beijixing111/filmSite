import { get  } from '@/common/fetch' 


export const getFilmList = (data) => {
  const apiName = '/api/page/film';
  // console.log(apiName); 
  return get(apiName, data);
}

export const getFilmDetail = id => {
  let apiName = '/api/page/film/' + id;
  return get(apiName);
}



// 收藏接口
// export const favorite = (data) => { 
//   const apiName = '/api/page/favorite'; 
//   return postJSON(apiName, data)
// }


