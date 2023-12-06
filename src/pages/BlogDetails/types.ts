interface Comment {
  text: string;
  blogId: string;
  createdBy: { userId: string; username: string };
  createdAt: string;
}

export type { Comment };
