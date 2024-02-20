import styled from "styled-components";

type PostConfigDropdownProps = {
  isDropdownOpen: boolean;
  onEditPostClick: () => void;
  onDeletePostClick: () => void;
};

const DropdownContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 40px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const DropdownItem = styled.span`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const PostConfigDropdown = ({
  isDropdownOpen,
  onEditPostClick,
  onDeletePostClick,
}: PostConfigDropdownProps) => {
  return (
    <>
      {isDropdownOpen && (
        <DropdownContainer>
          <DropdownItem onClick={() => onEditPostClick()}>
            Изменить
          </DropdownItem>
          <DropdownItem onClick={() => onDeletePostClick()}>Удалить</DropdownItem>
        </DropdownContainer>
      )}
    </>
  );
};
