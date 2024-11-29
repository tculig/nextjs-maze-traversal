import { MazeResponse } from '@/app/api/getMazeGenerator/route';
import { useInfiniteQuery } from '@tanstack/react-query';

interface useGenerateMazeParams {
    readonly seed: string;
    readonly mazesPerRequest: number;
}

const useGenerateMaze = ({ seed, mazesPerRequest }: useGenerateMazeParams) => {
    return useInfiniteQuery({
        queryKey: ['mazeData', seed],
        queryFn: async (): Promise<MazeResponse> => {
            const res = await fetch(`/api/getMazeGenerator?mazesPerRequest=${mazesPerRequest}&seed=${seed}`);
            if (!res.ok) throw new Error('Failed to fetch maze');
            return res.json();
        },
        initialPageParam: seed,
        getNextPageParam: () => seed,
    });
};
export type { useGenerateMazeParams };
export { useGenerateMaze };
