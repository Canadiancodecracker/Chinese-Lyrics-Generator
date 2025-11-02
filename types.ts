
export interface LyricsAnalysis {
  genre: string;
  mood: string;
  rhythm: string;
  structure: string;
}

export interface LyricsResponse {
  analysis: LyricsAnalysis;
  title: string;
  lyrics: string;
}
