import { Link, routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

type HeaderLayoutProps = {
  children?: React.ReactNode;
};

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth();

  return (
    <>
      <header>
        <div className="flex-between">
          <h1>
            <Link to={routes.home()}>Blog</Link>
          </h1>
          {isAuthenticated ? (
            <div>
              <span>Logado com {currentUser.email}</span>{' '}
              <button type="button" onClick={logOut}>
                Sair
              </button>
            </div>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </div>

        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.about()}>Sobre</Link>
            </li>
            <li>
              <Link to={routes.contact()}>Contato</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default HeaderLayout;
