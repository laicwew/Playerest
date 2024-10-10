export interface Review {
  id: number;
  imageUrl?: string; // image url
  author: string;
  title: string;
  content: string;
  rate: number;
  like?: number; //the number of likes
}

export interface Comment {
  id: number;
  reviewId: number;
  author: string;
  content: string;
  like?: number;
}
