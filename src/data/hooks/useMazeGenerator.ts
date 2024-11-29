import { useInfiniteQuery } from '@tanstack/react-query';

interface useGenerateMazeParams {
    readonly seed: string;
}

type MazeResponse = {
    newRandom: number;
};

const useGenerateMaze = ({ seed }: useGenerateMazeParams) => {
    return useInfiniteQuery({
        queryKey: ['mazeData', seed],
        queryFn: async ({ pageParam = seed }: { pageParam?: string }): Promise<MazeResponse> => {
            const res = await fetch(`/api/getMazeGenerator?&seed=${pageParam}`);
            if (!res.ok) throw new Error('Failed to fetch maze');
            return res.json();
        },
        initialPageParam: seed,
        getNextPageParam: () => seed,
    });
};
export type { useGenerateMazeParams };
export { useGenerateMaze };