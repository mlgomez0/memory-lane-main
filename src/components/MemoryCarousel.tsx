import { useState } from 'react';
import styled from '@emotion/styled';
import MemoryCard from './MemoryCard';
import { MemoryModalType } from '../utils/types';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const MemoryContainer = styled.div`
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const StyledIconButton = styled(IconButton)`
  background-color: white;
  padding: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:hover {
    background-color: #f3f4f6;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledIcon = styled('svg')`
  height: 24px;
  width: 24px;
  color: #4b5563;
`;

const MemoryCarousel = ({ memories }: { memories: MemoryModalType[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMemories = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 < memories.length ? prevIndex + 1 : prevIndex
    );
  };

  const prevMemories = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const visibleMemories = memories.slice(currentIndex, currentIndex + 3);

  return (
    <div>
      <CarouselContainer>
        {visibleMemories.map((memory) => (
          <MemoryContainer key={memory.id}>
            <MemoryCard memory={memory} />
          </MemoryContainer>
        ))}
      </CarouselContainer>
      <ButtonContainer>
        <StyledIconButton onClick={prevMemories} disabled={currentIndex === 0}>
          <KeyboardArrowUpIcon component={StyledIcon} />
        </StyledIconButton>
        <StyledIconButton
          onClick={nextMemories}
          disabled={currentIndex + 3 >= memories.length}
        >
          <KeyboardArrowDownIcon component={StyledIcon} />
        </StyledIconButton>
      </ButtonContainer>
    </div>
  );
};

export default MemoryCarousel;

