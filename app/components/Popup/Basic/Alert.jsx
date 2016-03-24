import React from 'react'

export default class Alert extends React.Component {
  close = () => {
		this.props.close()
		this.props.callback()
	}

	render() {
		let {title, body} = this.props
		return (
			<div className="pop pop_ct confirm">
				{title ? <h3>{title}</h3> : null}
				<div className="text">{body}</div>
				<p className="btn_c">
					<button onClick={this.close}>확인</button>
				</p>
				<button className="pop_close" onClick={this.close}>닫기</button>
			</div>
		)
  }
}

