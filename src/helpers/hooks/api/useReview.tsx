export interface Review {
    id: number
    imageUrl?: string // image url
    author: string
    title: string
    content: string
    comments?: Comment[]
    gameAvgRating?: number //maybe 0~10
    authorRating?: number // 0~10
    like?: number //the number of likes
}

export interface Comment {
  id: number,
  user: string,
  content: string,
  like?: number
}

