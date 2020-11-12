import Link from 'next/link';

const Header: React.FC = () => (
  <header>
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      |{' '}
      <Link href="/items">
        <a>Items</a>
      </Link>{' '}
    </nav>
  </header>
);

export default Header;
