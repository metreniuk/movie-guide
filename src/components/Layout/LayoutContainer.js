import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import '../Navigation/navigation.css';
import './layout.css';
import { changeLanguage } from './LayoutActions';
import { EN, RU, RO } from '../../constants';
import translations from '../../translations';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.changeLanguage = this.props.onChangeLanguage.bind(this);
  }

  componentWillMount() {
    this.changeLanguage(EN);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lang !== this.props.lang)
      this.lang = this.props.lang
  }

  render() {
    let languageBtns = [EN, RU, RO];
    let lang = this.props.lang;
    if (lang) {
      return (
        <div className="wrapper">
          <nav>
            <div className="nav-list">
              <div className="nav-item"><Link className="nav-link" activeClassName="is-active" to='/discover'>{translations[lang].nav.navLinks.discover}</Link></div>
              <div className="nav-item"><Link className="nav-link" activeClassName="is-active" to='/collections'>{translations[lang].nav.navLinks.collections}</Link></div>
              <div className="lang-bar">
                {languageBtns.map(btn => (
                  <LanguageBtn key={btn} changeLanguage={this.changeLanguage} lang={btn} />
                ))}
              </div>
            </div>
          </nav>
          <main>{this.props.children}</main>
        </div>
      )}
    else return null
  }
}

const LanguageBtn = ({changeLanguage, lang}) => {
  return (
  <button className="btn lang-btn" onClick={() => changeLanguage(lang)}>{lang}</button>
  )
}

export default connect(
  state => ({
    lang: state.language.lang
  }),
  dispatch => ({
    onChangeLanguage: (lang) => {
      dispatch(changeLanguage(lang))
    }
  })
)(Layout);
