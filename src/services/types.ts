interface SignupForm {
  username: string;
  password: string;
}

interface LoginForm {
  username: string;
  password: string;
}

interface CommentForm {
  text: string;
  blogId: string;
}

export type { SignupForm, LoginForm, CommentForm };
