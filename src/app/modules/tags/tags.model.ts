export interface ITag {
  id?: string;
  tag_name?: string;
  questions?: ITagQuestion[];
}

export interface ITagQuestion {
  id?: string;
  question_name?: string;
  tag: ITag;
}
