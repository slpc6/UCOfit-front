import { LayoutContainer, MainContainer } from './styles/Layout.styles';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContainer>
        {children}
      </MainContainer>
    </LayoutContainer>
  );
};