import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { signOut } from '../../../redux/slice/authSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleSignOut = () => {
		sessionStorage.removeItem('authToken');
		localStorage.removeItem('authToken');
		dispatch(signOut());
	};

	const AuthLinks = () => (
		<>
			<Link to='/profile' className='main-nav-item'>
				<FontAwesomeIcon icon={faUserCircle} />
				{user?.firstName || 'User'}
			</Link>
			<Link to='/' onClick={handleSignOut} className='main-nav-item'>
				<FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
			</Link>
		</>
	);

	const UnauthLinks = () => (
		<Link to='/login' className='main-nav-item'>
			<FontAwesomeIcon icon={faUserCircle} />
			Sign In
		</Link>
	);

	return (
		<header>
			<nav className='main-nav'>
				<Link to='/' className='main-nav-logo'>
					<img className='main-nav-logo-image' src={logo} alt='Argent Bank Logo' />
					<h1 className='sr-only'>Argent Bank</h1>
				</Link>
				<div>{!isAuthenticated ? <UnauthLinks /> : <AuthLinks />}</div>
			</nav>
		</header>
	);
};

export default Header;
