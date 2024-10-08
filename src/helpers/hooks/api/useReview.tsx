export interface Review {
    id: number
    imageUrl?: string // image url
    author: string
    title: string
    content: string
    comments?: Comment[]
    rate?: number //maybe 0~5
    like?: number //the number of likes
}

export interface Comment {
  id: string,
  user: string,
  content: string,
  like?: number
}

