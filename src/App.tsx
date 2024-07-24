import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { CubeIcon } from '@heroicons/react/20/solid';
import MemoryButton from './components/MemoryButton';
import MemoryCarousel from './components/MemoryCarousel';
import SelectSort from './components/SortSelector';
import ShareButton from './components/ShareButton';
import { useMemories } from './hooks/useMemories';
import styled from '@emotion/styled';

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 80rem;
  margin-top: 8rem;

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Card = styled.div`
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  height: 100%;
`;

const CardContent = styled.div`
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
  margin-left: 16px;
`;

const AboutSection = styled.div`
  margin: 20px 0;
  border: 1px solid #d1d5db;
  padding: 16px;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  min-height: 90px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledCubeIcon = styled(CubeIcon)({
  height: '4rem',
  width: '4rem',
  display: 'inline-block'
});

function App() {
  const memories = useSelector((state: RootState) => state.memories.memories);
  const { refreshMemories } = useMemories();

  useEffect(() => {
    const fetchMemories = async () => {
      await refreshMemories();
    };

    fetchMemories();
  }, [refreshMemories]);

  return (
    <Container>
      <Card>
        <CardContent>
          <Header>
            <TitleContainer>
              <StyledCubeIcon />
              <Title>Mary's memory lane</Title>
            </TitleContainer>
            <ShareButton />
          </Header>
          <AboutSection>
            <p>
              I am lucky; I have traveled worldwide, met wonderful people, and tasted incredible food!
              I want to keep all those memories as part of who I am. This memory lane helps me remember
              and live those moments again.
            </p>
          </AboutSection>
          <Controls>
            <SelectSort />
            <MemoryButton />
          </Controls>
          <MemoryCarousel memories={memories} />
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
