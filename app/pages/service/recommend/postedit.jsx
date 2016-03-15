/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import moment from 'moment';

import debug from 'debug'
const log = debug('application:Post.jsx')

import PageList from '../../../components/PageList'
import intlStores from '../../../stores/IntlStore'


export default class Post extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
   return (
     <article>
       <hgroup>
         <h2>추천 컨텐츠 등록</h2>
       </hgroup>
       <div id="contents">
         <div id="service_add">
           <table className="writeTable">
             <colgroup><col width="154px" /><col width="*" /></colgroup>
             <tbody>
             <tr>
               <th>추천 컨텐츠</th>
               <td>
                 <a className="btn_file btn_w120">Choose file</a>
               </td>
             </tr>
             <tr>
               <th>추천 컨텐츠</th>
               <td>
                 <ul className="list">
                   <li>
                     <div>
                       <span><img src="http://assets2.moncast.com/channel/713f94bf61bb8b8c.jpeg" alt="" /></span>
                       <b><span>Humor</span></b>
                       <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}></em>
                       <p>
                         <a href=""><img src="img/ct_edit1.png" alt="" title="수정" /></a>
                         <a href=""><img src="img/ct_edit2.png" alt="" title="삭제" /></a>
                       </p>
                     </div>
                     <dl>
                       <dt>다비치 이해리가 아이유의 노래를 불렀다니 이해리가 아이유</dt>
                     </dl>
                   </li>
                 </ul>
               </td>
             </tr>
             <tr>
               <th>시작일</th>
               <td>
                 <input type="text" placeholder="2015-08-08" className="txt t3" /><a href="" className="btn_calendar"></a>
               </td>
             </tr>
             <tr>
               <th>종료일</th>
               <td>
                 <input type="text" placeholder="2015-08-08" className="txt t3" /><a href="" className="btn_calendar"></a>
               </td>
             </tr>
             <tr>
               <th>노출확률</th>
               <td>
                 <input type="text" className="txt t3" />
               </td>
             </tr>
             </tbody>
           </table>
         </div>
         <p className="btn_r btnbox_w960">
           <a href="" className="purple">등록하기</a>
           <a href="" className="gray">취소하기</a>
         </p>
       </div>
     </article>
   )
  }
}
