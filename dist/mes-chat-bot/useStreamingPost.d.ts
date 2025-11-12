export declare const useStreamingPost: () => {
    data: any[];
    streamText: string;
    isLoading: boolean;
    error: Error | null;
    fetchStream: ({ url, body }: {
        url: string;
        body: any;
    }) => Promise<void>;
    clearData: () => void;
};
