import React from "react"
import UserService from "../services/UserService"
import Cookies from 'js-cookie';


class ButtonSwitchLanguage extends React.Component {
    constructor(props) {
        super(props)
        this.userService = new UserService(props.session)
        this.state = {
            locales: {
                en: "EN",
                cn: "CN",
            },
            lang: props.session.preferedLanguage,
        }
        this.changeLanguage = this.changeLanguage.bind(this)
    }

    componentDidMount() {
        let preferences = Cookies.get('preferences');
        if (preferences === undefined) {
            Cookies.set('preferences', {language: this.state.lang});
        } else {
            let parse = JSON.parse(preferences);
            this.setState({
                lang: parse.language
            })
        }
    }

    changeLanguage(event) {
        console.log(event.target);
        let lang = event.target.value.toLocaleLowerCase()
        let body = {
            language: lang,
        }
        this.userService.switchLanguage(body).then((res) => {

            if (res.is_success) {
                Cookies.set('preferences', {language: lang});
                window.location.reload()
            }
        })
    }

    render() {
        let lang = this.state.lang
        let img = this.state.locales[lang].toLowerCase()

        return (
            <li>
                <a href="#"
                   className="user-profile dropdown-toggle"
                   data-toggle="dropdown"
                   aria-expanded="false">
                    <img src={`/app/static/images/${img}.png`} alt=""/>{" "}
                    {this.state.locales[lang]}
                </a>
                <ul className="dropdown-menu dropdown-usermenu dropdown-menu-right"
                    style={{left: "100px"}}
                >
                    {Object.values(this.state.locales).map((item) => (
                        <li
                            key={item}
                            className="nav-item dropdown open"
                            style={
                                item.toLocaleLowerCase() === lang.toLocaleLowerCase()
                                    ? {
                                        paddingLeft: "15px",
                                        display: "none",
                                    }
                                    : {
                                        paddingLeft: "15px",
                                    }
                            }
                        >
                            <button
                                className="dropdown-item p-1"
                                onClick={this.changeLanguage}
                                value={item}
                            >
                                <img
                                    src={`/app/static/images/${item.toLocaleLowerCase()}.png`}
                                    alt=""
                                    width="32px"
                                />{" "}
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </li>
        )
    }
}

export default ButtonSwitchLanguage
