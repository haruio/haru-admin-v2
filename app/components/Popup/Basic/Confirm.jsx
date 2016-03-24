import React from 'react'


/**
 * prop list
 *   - function onConfirm
 *   - function onCancel
 *   - string title
 *   - string body
 *   - boolean usingInput
 *   - string placeholder
 */
export default class Confirm extends React.Component {

  state = {
    value: ''
  }

  onChange = (e) => {
    this.setState({ value: e.target.value })
  }

  onConfirm = () => {
    this.props.onConfirm(this.state.value)
    this.props.close()
  }

  onCancel = () => {
    this.props.onCancel()
    this.props.close()
  }
  render() {
    let {title, body, placeholder} = this.props
    let usingInput = this.props.usingInput
    return (
			<div className="pop_ct confirm">
				{title ? <h3>{title}</h3> : null}
				<div className="text">{body}</div>

				{ usingInput ?
					(
						<fieldset>
							<p><input type="text" className="txt" value={this.state.value} onChange={this.onChange}
								placeholder={placeholder}/></p>
						</fieldset>
					) : null
				}

				<p className="btn_c">
					<button onClick={this.onConfirm}>확인</button>
					<span> </span>
					<button onClick={this.onCancel} className="gray">취소</button>
				</p>

				<button className="pop_close" onClick={this.onCancel}>닫기</button>
			</div>
		)
  }
}
