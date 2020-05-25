export default class Comment {
  constructor(comment) {
    this.id = comment[`id`];
    this.emoji = comment[`emotion`];
    this.text = comment[`comment`];
    this.author = comment[`author`];
    this.date = new Date(comment[`date`]);
  }

  toRAW() {
    return {
      "comment": this.text,
      "date": this.date.toISOString(),
      "emotion": this.emoji,
    };
  }

  static parseComment(comment) {
    return new Comment(comment);
  }

  static parseComments(comment) {
    return comment.map(Comment.parseComment);
  }
}
