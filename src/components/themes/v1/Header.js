import _get from 'lodash/get';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { storeLang } from 'store/actions/lang';
import { setLang } from 'utils/localStorage';

const langOpt = {
  id: 'lang.indonesia',
  en: 'lang.english',
};

const Header = (props) => {
  const lang = useSelector((state) => state.lang);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const onLangChange = (lng) => {
    // i18n.changeLanguage(lng);
    setLang(lng);
  };

  return (
    <Navbar fixed='top' bg='light' expand='lg' className='navbar-custom'>
      <Container fluid>
        <Navbar.Brand className='cursor-pointer' onClick={() => navigate('/')}>
          {t('brand')}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <NavDropdown className='text-uppercase' title={t(langOpt[lang])} id='basic-nav-dropdown' alignRight>
              <NavDropdown.Item className='text-uppercase' onClick={() => onLangChange('id')}>
                {t('lang.indonesia')}
              </NavDropdown.Item>

              <NavDropdown.Item className='text-uppercase' onClick={() => onLangChange('en')}>
                {t('lang.english')}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
