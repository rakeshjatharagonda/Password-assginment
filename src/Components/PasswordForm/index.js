import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'


class PasswordForm extends Component{
state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordListItems: [],
    searchInput: '',
}

onSubmitForm = (event)=>{
    event.preventDefault()
    const {websiteInput,usernameInput,passwordInput} = this.state
    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== ''){
        const newUserDate = {
            id:v4(),
            website:websiteInput,
            username:usernameInput,
            password : passwordInput,
            showStar:true
        }
        this.setState(prevState =>({
            passwordListItems:[...prevState.passwordListItems,newUserDate],
            websiteInput: '',
            usernameInput: '',
            passwordInput: '',
        }))
    }
}

onChangeCheckbox = event => {
    const {passwordListItems} = this.state
    if (event.target.checked) {
      const newList = passwordListItems.map(eachItem => ({
        ...eachItem,
        showStar: false,
      }))
      this.setState({passwordListItems: newList})
    } else {
      this.setState({
        passwordListItems: passwordListItems.map(eachItem => ({
          ...eachItem,
          showStar: true,
        })),
      })
    }
  }
  

onChangeWebsite = (event)=>{
    this.setState({websiteInput:event.target.value})
    
}

onChangeUsername= (event)=>{
    this.setState({usernameInput:event.target.value})
}

onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderNoPasswordView = () => (
    <div className="no-password-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-img"
      />
      <p className="no-password-title">No Passwords</p>
    </div>
  )


    render(){

        const {
            websiteInput,
            usernameInput,
            passwordInput,
            passwordListItems,
            searchInput,
          } = this.state
          const filterPasswordList = passwordListItems.filter(eachPassword=>(
            eachPassword.website.includes(searchInput)
          ))

        return(
            <div className='app-container'>
                 <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
         <div className="top-responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-img-sm"
          />
          <div className="password-input-container">
            <h1 className="add-password-title">Add New Password</h1>
            <form className="form" onSubmit={this.onSubmitForm}>
              <div className="flex-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logo"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  value={websiteInput}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="flex-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logo"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  value={usernameInput}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="flex-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logo"
                />
                <input
                  type="password"
                  className="input"
                  value={passwordInput}
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="submit-button">
                  Add
                </button>
              </div>
            </form>
          </div>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img-lg"
          />
        </div>
        <div className="bottom-responsive-container">
          <div className="title-and-search-container">
            <div className="title-container">
              <h1 className="your-password-title">Your Passwords</h1>
              <p className="passwords-count">0</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="horizontal-ruler" />
          <div className="show-password-container">
            <input
              type="checkbox"
              id="checkbox"
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor="checkbox" className="checkbox-label">
              Show Passwords
            </label>
          </div>
          
          {filterPasswordList.length === 0 ? (this.renderNoPasswordView()):( 
          <ul className="password-list">
              {filterPasswordList.map(eachList => (
                <PasswordItem
                  key={eachList.id}
                  passwordItems={eachList}
                  onDeletePassword={this.onDeletePassword}
                />
              ))}
            </ul>)}

          
          
        </div>
            </div>
        )
    }
}
export default PasswordForm