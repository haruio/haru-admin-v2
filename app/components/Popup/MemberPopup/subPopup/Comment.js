/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'

const paging1 = require('image!../../../../assets/img/paging1.png')
const icon_delete = require('image!../../../../assets/img/icon_delete.png')

export default class Comment extends React.Component {
  render() {
    return (
      <div className="tab_ct">
        <div className="table_wrap">
          <table className="listTable modify">
            <colgroup>
              <col width="6%"/>
              <col width="13%"/>
              <col width="32%"/>
              <col width="32%"/>
              <col width="*"/>
              <col width="14%"/>
            </colgroup>
            <thead>
            <tr>
              <th><input type="checkbox"/></th>
              <th>썸네일</th>
              <th>제목</th>
              <th>댓글 내용</th>
              <th></th>
              <th>작성일</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><input type="checkbox"/></td>
              <td><img src="http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg" alt="" className="thumb"/></td>
              <td className="al">[여동] 길 가다가 한국 팬을 만난 일본</td>
              <td className="al">[여동] 길 가다가 한국 팬을 만난 일본</td>
              <td><em className="more"><a href=""><img src={icon_delete} alt="삭제"/></a></em></td>
              <td>2015-09-09</td>
            </tr>
            <tr>
              <td><input type="checkbox"/></td>
              <td><img src="http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg" alt="" className="thumb"/></td>
              <td className="al">[여동] 길 가다가 한국 팬을 만난 일본</td>
              <td className="al">[여동] 길 가다가 한국 팬을 만난 일본</td>
              <td><em className="more"><a href=""><img src={icon_delete} alt="삭제"/></a></em></td>
              <td>2015-09-09</td>
            </tr>
            <tr>
              <td><input type="checkbox"/></td>
              <td><img src="http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg" alt="" className="thumb"/></td>
              <td className="al">[여동] 길 가다가 한국 팬을 만난 일본</td>
              <td className="al">[여동] 길 가다가 한국 팬을 만난 일본</td>
              <td><em className="more"><a href=""><img src={icon_delete} alt="삭제"/></a></em></td>
              <td>2015-09-09</td>
            </tr>
            <tr>
              <td><input type="checkbox"/></td>
              <td><img src="http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg" alt="" className="thumb"/></td>
              <td className="al">[여동] 길 가다가 한국 팬을 만난 일본</td>
              <td className="al">[여동] 길 가다가 한국 팬을 만난 일본</td>
              <td><em className="more"><a href=""><img src={icon_delete} alt="삭제"/></a></em></td>
              <td>2015-09-09</td>
            </tr>
            <tr>
              <td><input type="checkbox"/></td>
              <td><img src="http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg" alt="" className="thumb"/></td>
              <td className="al">[여동] 길 가다가 한국 팬을 만난 일본</td>
              <td className="al">[여동] 길 가다가 한국 팬을 만난 일본</td>
              <td><em className="more"><a href=""><img src={icon_delete} alt="삭제"/></a></em></td>
              <td>2015-09-09</td>
            </tr>
            </tbody>
          </table>
        </div>
        <p className="pagination">
          <a href=""><img src={paging1} alt="이전"/></a>
					<span>
						<a href="" className="on">1</a>
						<a href="">2</a>
						<a href="">3</a>
						<a href="">4</a>
						<a href="">5</a>
						<a href="">6</a>
						<a href="">7</a>
						<a href="">8</a>
						<a href="">9</a>
						<a href="">10</a>
					</span>
          <a href=""><img src={paging1} alt="다음"/></a>
        </p>
      </div>
    )
  }
}

