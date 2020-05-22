export default class Comment {
  constructor(data) {
    return {
      id: data[`id`],
      emoji: data[`emotion`],
      text: data[`comment`],
      author: data[`author`],
      date: new Date(data[`date`]),
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
