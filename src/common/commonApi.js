import { get, post, postJSON } from './fetch.js'
import global from '../../assets/js/global_variable.js'
 
//  const url = process.env.NODE_ENV == "development" ? '/api/dingats-web-117' : '/api/dingats-web'

//登录接口
export const getLogin = (data) => {
	const apiName = '/api/dingtalk-auth-service/login'
	return post(apiName, data)
}




