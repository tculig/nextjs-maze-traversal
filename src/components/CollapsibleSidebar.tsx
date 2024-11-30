// components/CollapsibleSidebar.tsx
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MazePreview from "./MazePreview";
import { MazeWithDetails } from "@/types";

const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? "80px" : "250px")};
  height: 100%;
  background-color: #282c34;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;
  overflow: hidden;
  padding-top: 20px;
  box-sizing: border-box;
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
  font-size: 18px;
  opacity: 0.86;
  &:hover {
    opacity: 1;
  }
`;

const SidebarItemCollapsed = styled.div`
  font-size: 18px;
  padding: 20px;
  cursor: pointer;
  &:hover {
    color: #61dafb;
  }
`;

interface SidebarProps {
    mazeArray: MazeWithDetails[] | undefined,
    selectMaze: (mazeId: string) => void,
}
const CollapsibleSidebar = ({ mazeArray, selectMaze }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState<number>(0);
    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = (entries: ResizeObserverEntry[]) => {
            if (entries[0]) {
                const { width } = entries[0].contentRect;
                setWidth(width);
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);

        if (divRef.current) {
            resizeObserver.observe(divRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <SidebarContainer $collapsed={collapsed} ref={divRef}>
            {(mazeArray && mazeArray[0]) ? (
                mazeArray.map((maze, index) => (width > 150 ? (
                    <SidebarItem key={index} onClick={() => selectMaze(maze.mazeId)}>
                        <MazePreview
                            mazeData={maze}
                        />
                    </SidebarItem>
                ) : (
                    <SidebarItemCollapsed key={index} onClick={() => selectMaze(maze.mazeId)}>{index + 1}</SidebarItemCollapsed>
                )))
            ) : null}
            <ToggleButton onClick={toggleSidebar}>
                {collapsed ? "▶" : "◀"}
            </ToggleButton>
        </SidebarContainer>
    );
};

export default CollapsibleSidebar;
