interface NewBlogFormFields {
  title: string;
  content: string;
  category: string;
}

interface Comments {
  content: string;
  createdAt: string;
  createdBy: string;
}

interface Blog {
  _id: string;
  category: string;
  content: string;
  createdAt: string;
  title: string;
  comments: Comment[];
}

export type { NewBlogFormFields, Blog };
