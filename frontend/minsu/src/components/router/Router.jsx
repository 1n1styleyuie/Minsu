import {Routes, Route} from 'react-router-dom'

import Home from '../app/Home'
import PostList from '../post/PostList'
import PostWrite from '../post/PostWrite'
import PostDetail from '../post/PostDetail'
import PostUpdate from '../post/PostUpdate'
import PostAnswer from '../post/PostAnswer'
import Register from '../user/Register'
import Login from '../user/Login'
import Logout from '../user/Logout'
import UserUpdate from '../user/UserUpdate'
import CheckPwd from '../user/CheckPwd'

function Router() {

  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/postlist' element={<PostList />}></Route>
      <Route path='/postwrite' element={<PostWrite />}></Route>
      <Route path='/postdetail/:postId' element={<PostDetail />}></Route>
      <Route path='/postupdate' element={<PostUpdate />}></Route>
      <Route path='/postanswer/:parentSeq' element={<PostAnswer />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/logout' element={<Logout />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/checkpwd' element={<CheckPwd />}></Route>
      <Route path='/userupdate' element={<UserUpdate />}></Route>
    </Routes>
  );
}

export default Router;