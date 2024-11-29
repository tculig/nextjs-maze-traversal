// components/CollapsibleSidebar.tsx
import React, { useState } from "react";
import styled from "styled-components";
import MazePreview from "./MazePreview";

const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? "80px" : "250px")};
  height: 100%;
  background-color: #282c34;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  width: 100%;
  margin-top: auto;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #61dafb;
  }
    padding:24px 0;
`;

const SidebarItem = styled.div`
  margin: 20px 0;
  font-size: 18px;
  &:hover {
    color: #61dafb;
  }
`;

interface SidebarProps {
    mazeArray: string[] | undefined
}
const CollapsibleSidebar = ({ mazeArray }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <SidebarContainer $collapsed={collapsed}>
            {(mazeArray && mazeArray[0]) ? (
                <SidebarItem>
                    <MazePreview
                        mazeData={mazeArray[0]}
                        onClick={() => console.log("GHUEHu")}
                    />
                </SidebarItem>
            ) : null}
            <SidebarItem>About</SidebarItem>
            <SidebarItem>Contact</SidebarItem>
            <ToggleButton onClick={toggleSidebar}>
                {collapsed ? "▶" : "◀"}
            </ToggleButton>
        </SidebarContainer>
    );
};

export default CollapsibleSidebar;
