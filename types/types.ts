export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type Comment = {
  id?: string;
  title: string;
  author: string;
  text: string;
  date: string;
}